import { argv } from 'bun';
import { Command } from 'commander';
import { config } from 'dotenv';
import { resolve } from 'node:path';
import { exit, stdin, stdout } from 'node:process';
import { createInterface } from 'node:readline';

import build from './build/build.js';
import develop from './develop/develop.js';
import newComponent from './new-component/new-component.js';
import serveBuildFolder from './serve-build-folder/serve-build-folder.js';
import checkFileExistence from './shared/checkFileExistence.js';
import getFunctionParams from './shared/getFunctionParams.js';
import getProjectRoot from './shared/getProjectRoot.js';
import transformStackTrace from './transform-stack-trace/transformStacktrace.js';

config();
await (async () => {
  const projectRoot = await getProjectRoot();
  const uiNamesList = ['smartface-ui']; // TODO: we currently only have one ui and nothing planned in the near future

  function resolvePaths() {
    return {
      adapterPath: resolve(projectRoot, 'src', 'adapters'),
      typePath: resolve(projectRoot, 'src', 'types'),
      uiPath: '@hrworks/sui-core/',
      specificUiPaths: Object.assign(
        ...uiNamesList.map((uiName) => ({ [uiName]: resolve(projectRoot, 'src', 'uis', uiName) })),
      ),
    };
  }

  const program = new Command();

  program.command('setup').action(async () => {
    console.log('This command is deprecated and not needed.');
  });

  program
    .version('0.0.1')
    .command('new <componentName> [applicationName]')
    .action(async (componentName, applicationName) => {
      if (typeof componentName !== 'string' || componentName.length <= 0) {
        console.error('\nERROR: Componentname not allowed. \nExiting.\n');
      } else {
        const componentNamePascalCase = componentName.charAt(0).toUpperCase() + componentName.slice(1);
        if (applicationName && applicationName !== 'core' && applicationName !== 'extension') {
          if (await checkFileExistence(`src/types/application/${applicationName}/SmartFaceComponentsType.ts`)) {
            newComponent(componentNamePascalCase, applicationName);
          } else {
            const lineReader = createInterface({
              input: stdin,
              output: stdout,
            });
            lineReader.question(
              `\nNotice: This operation creates the new application: ${applicationName} \nContinue ? (Y/n)`,
              async function (answer) {
                const continueAnswers = ['', 'yes', 'y'];
                const exitAnswers = ['no', 'n'];
                if (continueAnswers.includes(answer.toLocaleLowerCase())) {
                  await newComponent(componentNamePascalCase, applicationName);
                } else if (exitAnswers.includes(answer.toLocaleLowerCase())) {
                  console.log('\nExiting.\n');
                } else {
                  console.error('\nERROR: Unknown answer. \nExiting.\n');
                }
                await lineReader.removeAllListeners();
                await lineReader.close();
              },
            );
          }
        } else {
          newComponent(componentNamePascalCase, applicationName);
        }
      }
    });

  program
    .command('dev <uiName> [applicationName]')
    .description(`Develop a ui: ${uiNamesList.join(' | ')}`)
    .action(async (uiName, applicationName) => {
      if (!uiNamesList.includes(uiName)) {
        console.error(`ERROR: ${uiName} is not a known member of ${uiNamesList.join(' | ')}`);
        exit(1);
      }
      const { adapterPath, typePath, uiPath, specificUiPaths } = resolvePaths(uiName);
      const params = getFunctionParams({ adapterPath, typePath, uiPath, applicationName, uiName, specificUiPaths });
      develop(params);
    });

  program
    .command('build <uiName> [applicationName]')
    .description(`Create a production build for a ui: ${uiNamesList.join(' | ')}`)
    .action(async (uiName, applicationName) => {
      if (!uiNamesList.includes(uiName)) {
        console.error(`ERROR: ${uiName} is not a known member of ${uiNamesList.join(' | ')}`);
        exit(1);
      }
      const { adapterPath, typePath, uiPath, specificUiPaths } = resolvePaths(uiName);
      const params = getFunctionParams({ adapterPath, typePath, uiPath, applicationName, uiName, specificUiPaths });
      build(params);
    });

  program
    .command('start-test-environment <uiName> [applicationName]')
    .description('Creates a production build and serves the build folder')
    .action(async (uiName, applicationName) => {
      if (!uiNamesList.includes(uiName)) {
        console.error(`ERROR: ${uiName} is not a known member of ${uiNamesList.join(' | ')}`);
        exit(1);
      }
      const { adapterPath, typePath, uiPath, specificUiPaths } = resolvePaths(uiName);
      await build({ adapterPath, typePath, uiPath, applicationName, specificUiPaths });
      serveBuildFolder();
    });

  program
    .command('serve-build-folder')
    .description('Serves the build folder')
    .action(async () => {
      serveBuildFolder();
    });

  program
    .command('workbench')
    .description("Do your stuff here but don't commit here")
    .action(async () => {
      // Do stuff here, don't commit
    });

  program
    .command('transform-stack-trace')
    .description('Transform a stack trace')
    .action(async () => {
      const lineReader = createInterface({
        input: stdin,
        output: stdout,
      });
      let stackTrace = '';
      lineReader.on('line', (line) => {
        if (line.length === 0 || line === '\r' || line === '\n' || line === '\r\n') {
          lineReader.close();

          return;
        }
        stackTrace += line + '\n';
      });
      lineReader.on('close', async () => {
        console.log('Transforming stack trace...\n');
        const transformedStackTrace = await transformStackTrace(stackTrace);
        console.log(transformedStackTrace);
      });
      console.log('Enter a stack trace, confirm with entering an empty newline (double-press enter):');
      lineReader.prompt();
    });

  program.parse(argv);
})();
