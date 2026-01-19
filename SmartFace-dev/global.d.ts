declare global {
  namespace NodeJS {
    interface Process {
      env: {
        NODE_ENV: 'development' | 'production';
      };
    }
  }
}

export {};
