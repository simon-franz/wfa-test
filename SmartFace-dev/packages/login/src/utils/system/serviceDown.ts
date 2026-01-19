let isShuttingDown = false;

export const serviceGracefulShutdown = () => {
  const gracefulShutdown = async (signal: string) => {
    if (isShuttingDown) {
      console.log(`\n[INFO] Already shutting down, please wait...`);

      return;
    }

    isShuttingDown = true;
    console.log(`\n[INFO] Received ${signal}, shutting down gracefully...`);

    try {
      const { disconnectRedis } = await import('../storage/redis');
      await disconnectRedis();
      console.log('[SUCCESS] All connections closed successfully');
    } catch (error) {
      console.error('[ERROR] Error during shutdown:', error);
    }

    console.log('[INFO] Server shutdown complete');
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(0);
  };

  // Handle shutdown signals & errors
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

  process.on('uncaughtException', (error) => {
    console.error('[FATAL] Uncaught Exception:', error);
    gracefulShutdown('UNCAUGHT_EXCEPTION');
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.error('[FATAL] Unhandled Rejection at:', promise, 'reason:', reason);
    gracefulShutdown('UNHANDLED_REJECTION');
  });

  console.log('[INFO] Graceful shutdown handlers registered');
};
