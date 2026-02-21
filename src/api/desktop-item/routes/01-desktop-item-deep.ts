/**
 * Custom routes for desktop-item (deep populate).
 * File name prefixed with 01- so it loads before core routes.
 */

export default {
  routes: [
    {
      method: 'GET',
      path: '/desktop-items/deep',
      handler: 'desktop-item.deep',
      config: { auth: false },
    },
    {
      method: 'GET',
      path: '/desktop-items/deep/:id',
      handler: 'desktop-item.findOneDeep',
      config: { auth: false },
    },
  ],
};
