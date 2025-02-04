export default ({ env }) => {
  const isProduction = env('NODE_ENV') === 'production';

  return {
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    url: env('PUBLIC_URL'),
    app: {
      keys: env.array('APP_KEYS'),
    },
    dirs: {
      public: isProduction ? '/data/public' : './public',
    },
  };
};
