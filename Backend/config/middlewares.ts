export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  {
    name: 'koa-static',
    config: {
      dir: '/data/public/uploads',
      maxage: 2592000, // Кэширование на 1 месяц
    },
  },
];
