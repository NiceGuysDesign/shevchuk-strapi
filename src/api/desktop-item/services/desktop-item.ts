/**
 * desktop-item service
 */

import { factories } from '@strapi/strapi';

const POPULATE_DEEP = {
  image: true,
  presentationSlides: {
    populate: ['desktopImg', 'mobileImg'] as ['desktopImg', 'mobileImg'],
  },
  children: true,
};

type ItemWithChildren = {
  id: number;
  documentId?: string;
  children?: ItemWithChildren[];
};

export default factories.createCoreService(
  'api::desktop-item.desktop-item',
  ({ strapi }) => {
    const documents = () => strapi.documents('api::desktop-item.desktop-item');

    return {
      async findDeep(params: Record<string, unknown> = {}) {
        const roots = await documents().findMany({
          ...params,
          filters: { ...(params.filters as object), parent: { id: { $null: true } } },
          populate: POPULATE_DEEP,
        });

        const populateChildren = async (items: ItemWithChildren[]) => {
          for (const item of items) {
            if (item.children?.length) {
              const children = await documents().findMany({
                ...params,
                filters: { parent: { id: item.id } },
                populate: POPULATE_DEEP,
              });
              item.children = children as ItemWithChildren[];
              await populateChildren(item.children);
            }
          }
        };
        await populateChildren((roots as ItemWithChildren[]) ?? []);
        return roots;
      },

      async findOneDeep(id: number, params: Record<string, unknown> = {}) {
        const item = await documents().findFirst({
          ...params,
          filters: { id },
          populate: POPULATE_DEEP,
        });
        if (!item) return null;

        const doc = item as ItemWithChildren;

        const populateChildren = async (entries: ItemWithChildren[]) => {
          for (const entry of entries) {
            if (entry.children?.length) {
              const children = await documents().findMany({
                ...params,
                filters: { parent: { id: entry.id } },
                populate: POPULATE_DEEP,
              });
              entry.children = children as ItemWithChildren[];
              await populateChildren(entry.children);
            }
          }
        };
        if (doc.children?.length) {
          const children = await documents().findMany({
            ...params,
            filters: { parent: { id: doc.id } },
            populate: POPULATE_DEEP,
          });
          doc.children = children as ItemWithChildren[];
          await populateChildren(doc.children);
        }
        return doc;
      },
    };
  }
);
