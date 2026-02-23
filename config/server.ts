export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  // Потрібно для Heroku: публічний URL додатку (без trailing slash)
  ...(env('PUBLIC_URL') && { url: env('PUBLIC_URL') }),
  app: {
    keys: env.array('APP_KEYS'),
  },
});
