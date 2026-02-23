export default [
  "strapi::logger",
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "https://market-assets.strapi.io",
            "https://res.cloudinary.com",
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "https://market-assets.strapi.io",
            "https://res.cloudinary.com",
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::query",
  {
    name: "strapi::body",
    config: {
      formLimit: "100mb",
      jsonLimit: "100mb",
      formidable: {
        maxFileSize: 100 * 1024 * 1024, // 100 MB (Cloudinary free: video до 100 MB)
      },
    },
  },
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
