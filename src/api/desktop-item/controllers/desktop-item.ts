/**
 * desktop-item controller
 */

import { factories } from '@strapi/strapi';

function getParams(ctx: { query?: Record<string, unknown> }) {
  const {
    locale,
    status,
    // Strapi v4 leftover from the Next.js client — ignore, do not pass to Documents API
    publicationState,
    ...rest
  } = (ctx.query ?? {}) as Record<string, unknown>;

  // Map legacy publicationState → Strapi 5 status if status is missing
  let resolvedStatus = status;
  if (!resolvedStatus && typeof publicationState === 'string') {
    if (publicationState === 'preview') resolvedStatus = 'draft';
    else if (publicationState === 'live') resolvedStatus = 'published';
  }

  return {
    ...rest,
    locale,
    status: resolvedStatus ?? 'published',
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
