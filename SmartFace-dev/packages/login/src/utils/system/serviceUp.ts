#!/usr/bin/env bun
import { delay, getIsShuttingDown, killProcessOnPort, runCommand, setShuttingDown, showProgress } from './helpers';
import { createLogSection, highlightCommand, highlightURL, logDivider } from './logging';

const DEV_PORT = 4242;
const servicesOnly = process.argv.includes('--services-only');
const containerMode = process.argv.includes('--container-mode');
const shutdownOnly = process.argv.includes('--shutdown');
const debugMode = process.argv.includes('--debug') || process.env.DEBUG_COMPOSE === 'true';
const stdioMode = debugMode ? 'inherit' : 'pipe';

const main = async (): Promise<void> => {
  if (shutdownOnly) {
    await gracefulShutdown();

    return;
  }

  try {
    createLogSection('LOGIN - SERVICES START');
    const servicesRunning = await checkServicesRunning();
    if (servicesRunning) {
      console.log('ℹ️  Services already running');
      console.log('   Use: bun run --cwd packages/login dev:services:down to stop services');

      return;
    }

    await startServices();
  } catch (error) {
    console.error(`❌ Startup failed: ${error}`);
    console.log('   Run: bun run --cwd packages/login dev:services:down');
    process.exit(1);
  }
};

const killExistingProcesses = async (): Promise<void> => {
  await killProcessOnPort(DEV_PORT);
};

const startServices = async (): Promise<void> => {
  await killExistingProcesses();

  // START SERVICES
  const stopServicesProgress = showProgress('Starting services...');
  try {
    const composeArgs = ['-f', 'docker-compose.dev.yml', 'up', '-d'];

    if (containerMode) {
      // Container mode:
      // Redis, LocalStack + DevServer in Container
      composeArgs.splice(-2, 0, '--profile', 'container-mode');
    } else if (servicesOnly) {
      // Services-Only mode:
      // Redis, LocalStack
      composeArgs.splice(-2, 0, '--profile', 'services-only');
    } else {
      // Default mode:
      // Redis, LocalStack + DevServer (see below)
      composeArgs.splice(-2, 0, '--profile', 'local-dev');
    }

    // Temporarily change stdio: 'pipe' to 'inherit' to see error output
    // await runCommand('docker-compose', composeArgs, { stdio: 'inherit' });
    await runCommand('docker-compose', composeArgs, { stdio: stdioMode });
  } finally {
    stopServicesProgress();
  }

  // SETUP LOCALSTACK
  const stopLocalstackSetupProgress = showProgress('Setting up Localstack...');
  try {
    await runCommand('bun', ['src/utils/system/setupLocalstack.ts'], { stdio: stdioMode });
  } catch (error) {
    console.error(`❌ LocalStack setup failed: ${error}`);
    throw error;
  } finally {
    stopLocalstackSetupProgress();
  }

  // OUTPUT SERVICE MODE & HEALTHCHECK
  const [redisReady, localstackReady] = await Promise.all([
    checkServiceHealth(healthChecks.redis),
    checkServiceHealth(healthChecks.localstack),
  ]);
  console.log('');
  const mode = containerMode
    ? '🐳 Container Mode'
    : servicesOnly
      ? '⚙️ Services-Only Mode'
      : '🚀 Local Development Mode';
  console.log(`${mode}`);
  console.log(`${redisReady ? '✅' : '⚠️'} Redis health check`);
  console.log(`${localstackReady ? '✅' : '⚠️'} LocalStack health check`);
  console.log('');
  logDivider('-', 50, 'dim');

  // WAIT FOR SERVICES
  await waitForServicesReady();
  await showStartupSummary();

  // START DEV-SEVER (if Default mode / local-dev)
  if (!servicesOnly && !containerMode) {
    createLogSection('LOGIN - DEV SERVER START');
    console.log('   Stop Server & Services via Ctrl+C\n');

    try {
      await runCommand('bun', ['--bun', 'next', 'dev', '-p', DEV_PORT.toString()]);
    } catch (error) {
      if (!getIsShuttingDown()) {
        console.error(`❌ Dev server failed: ${error}`);
        throw error;
      }
    }
  }
};

const checkServiceHealth = async (checkFn: () => Promise<boolean>): Promise<boolean> => {
  try {
    return await checkFn();
  } catch {
    return false;
  }
};

const healthChecks: {
  redis: () => Promise<boolean>;
  localstack: () => Promise<boolean>;
} = {
  redis: () =>
    runCommand('docker', ['exec', 'hrworks-login-redis', 'redis-cli', 'ping'], {
      stdio: stdioMode,
    }).then(() => true),
  localstack: async () => {
    const response = await fetch('http://localhost:4566/_localstack/health');
    if (!response.ok) return false;

    const health = (await response.json()) as {
      services?: {
        ses?: string;
      };
    };
    const sesStatus = health.services?.ses;

    return sesStatus ? ['available', 'running'].includes(sesStatus) : false;
  },
} as const;

const waitForServicesReady = async (): Promise<void> => {
  const maxRetries = 30;
  const retryDelay = 2000;
  const stopProgress = showProgress('Waiting for services to be ready...');

  try {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      const results = await Promise.all([
        checkServiceHealth(healthChecks.redis),
        checkServiceHealth(healthChecks.localstack),
      ]);

      if (results.every(Boolean)) {
        return;
      }

      if (attempt < maxRetries) {
        await delay(retryDelay);
      }
    }

    console.log('\n⚠️  Services may not be fully ready, continuing anyway');
  } finally {
    stopProgress();
  }
};

const showStartupSummary = async (): Promise<void> => {
  const padLength = 24;

  const appLine = containerMode
    ? `   • Login App (Container): ${highlightURL(`http://localhost:${DEV_PORT}`)}`
    : servicesOnly
      ? `   • Login App (⚠️ Services-only mode): Start with ${highlightCommand('bun run --bun --cwd packages/login dev')}`
      : `   • Login App (Dev Server): http://localhost:${DEV_PORT}`;

  console.log(`
🌐 Available services:
${appLine}
   • LocalStack: http://localhost:4566
   • Redis: localhost:6379

🛠️ Commands:
   • ${'Default mode:'.padEnd(padLength)} ${highlightCommand('bun run --cwd packages/login dev:services:up')}
   • ${'Container mode:'.padEnd(padLength)} ${highlightCommand('bun run --cwd packages/login dev:services:up --container-mode')}
   • ${'Services-Only mode:'.padEnd(padLength)} ${highlightCommand('bun run --cwd packages/login dev:services:up --services-only')}
   • ${'Stop services:'.padEnd(padLength)} ${highlightCommand('bun run --cwd packages/login dev:services:down')}
   • ${'View logs:'.padEnd(padLength)} ${highlightCommand('docker-compose -f docker-compose.dev.yml logs -f')}
   • ${'Test email:'.padEnd(padLength)} ${highlightCommand('bun run --cwd packages/login test:email [email]')}

🔧 App Debugging:
   • ${'Debug mode:'.padEnd(padLength)} ${highlightCommand('bun run --cwd packages/login dev:services:up --debug')}
   • ${'Debug container mode:'.padEnd(padLength)} ${highlightCommand('bun run --cwd packages/login dev:services:up --container-mode --debug')}
   • ${'Debug shutdown:'.padEnd(padLength)} ${highlightCommand('bun run --cwd packages/login dev:services:down --debug')}
   • ${'Container logs:'.padEnd(padLength)} ${highlightCommand('docker logs hrworks-login-app -f')}
   • ${'Health check status:'.padEnd(padLength)} ${highlightCommand('docker inspect hrworks-login-app --format="{{json .State.Health}}"')}

🔨 Redis & Email Debugging:
   • ${'Redis entries:'.padEnd(padLength)} ${highlightCommand('docker exec hrworks-login-redis redis-cli KEYS "*"')}
   • ${'Redis inspect:'.padEnd(padLength)} ${highlightCommand('docker exec hrworks-login-redis redis-cli GET [key]')}
   • ${'Check emails:'.padEnd(padLength)} ${highlightCommand('bun run --cwd packages/login check:emails')}
`);
};

const checkServicesRunning = async (): Promise<boolean> => {
  try {
    const result = (await runCommand('docker-compose', ['-f', 'docker-compose.dev.yml', 'ps', '-q'], {
      captureOutput: true,
    })) as {
      code: number;
      stdout: string;
      stderr: string;
    };

    return result.code === 0 && result.stdout.trim().length > 0;
  } catch {
    return false;
  }
};

const gracefulShutdown = async (): Promise<void> => {
  if (getIsShuttingDown()) {
    return;
  }

  setShuttingDown(true);

  if (shutdownOnly) {
    createLogSection('LOGIN - SERVICES SHUTDOWN');

    const servicesRunning = await checkServicesRunning();
    if (!servicesRunning) {
      console.log('ℹ️  No services currently running');
      process.exit(0);
    }
  } else {
    console.log('');
    logDivider('-', 50, 'dim');
  }

  await delay(100);
  const stopProgress = showProgress('Stopping Services', true);

  try {
    await runCommand('docker-compose', ['-f', 'docker-compose.dev.yml', 'down'], { stdio: stdioMode });

    try {
      const result = (await runCommand('docker', ['ps', '-q', '--filter', 'name=hrworks-login-app'], {
        stdio: 'pipe',

        captureOutput: true,
      })) as { stdout: string };

      if (result.stdout.trim()) {
        console.log('\nForce stopping hrworks-login-app container...');
        await runCommand('docker', ['stop', 'hrworks-login-app'], { stdio: stdioMode });
        await runCommand('docker', ['rm', 'hrworks-login-app'], { stdio: stdioMode });
      }
    } catch (error) {
      console.log(`Could not force stop hrworks-login-app: ${error}`);
    }

    try {
      await runCommand(
        'docker-compose',
        ['-f', 'docker-compose.dev.yml', 'down', '--remove-orphans', '--volumes', '--timeout', '10'],
        { stdio: stdioMode },
      );
    } catch (error) {
      console.log(`Aggressive cleanup had issues: ${error}`);
    }

    try {
      await runCommand('fuser', ['-k', `${DEV_PORT}/tcp`], { stdio: stdioMode });
    } catch {
      // Empty-Catch
    }
    try {
      await delay(2000); // Give Docker more time
      await runCommand('docker', ['network', 'rm', 'hrworks-login-dev'], { stdio: stdioMode });
    } catch {
      // Empty-Catch
    }

    stopProgress();

    console.log('✅ Services stopped successfully');
  } catch (error) {
    stopProgress();
    console.log('❌ Failed to stop services');
    console.error(`   Error: ${error}`);
    console.log('   Try manual cleanup:');

    console.log(`   ${highlightCommand('docker stop hrworks-login-app && docker rm hrworks-login-app')}`);
    console.log(`   ${highlightCommand('docker-compose -f docker-compose.dev.yml down --remove-orphans --volumes')}`);
    console.log(`   ${highlightCommand('docker network rm hrworks-login-dev')}`);
    process.exit(1);
  }
  process.exit(0);
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

await main();
