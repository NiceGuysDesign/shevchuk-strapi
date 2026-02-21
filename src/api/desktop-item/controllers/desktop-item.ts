/**
 * desktop-item controller
 */

import { factories } from '@strapi/strapi';

function getParams(ctx: { query?: Record<string, unknown> }) {
  const { locale, status, ...rest } = (ctx.query ?? {}) as Record<string, unknown>;
  return {
    ...rest,
    locale,
    status: status ?? 'published',
  };
}

export default factories.createCoreController(
  'api::desktop-item.desktop-item',
  ({ strapi }) => ({
    async deep(ctx) {
      const params = getParams(ctx);
      const data = await strapi
        .service('api::desktop-item.desktop-item')
        .findDeep(params);
      return { data };
    },

    async findOneDeep(ctx) {
      const { id } = ctx.params;
      const params = getParams(ctx);
      const data = await strapi
        .service('api::desktop-item.desktop-item')
        .findOneDeep(Number(id), params);
      if (!data) return ctx.notFound();
      return { data };
    },
  })
);
