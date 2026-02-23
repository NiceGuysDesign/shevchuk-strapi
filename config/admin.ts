export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
    // Замість deprecated auth.options.expiresIn (Strapi 6)
    sessions: {
      maxRefreshTokenLifespan: 30 * 24 * 60 * 60, // 30 днів (секунди)
      maxSessionLifespan: 30 * 24 * 60 * 60,     // 30 днів
    },
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
