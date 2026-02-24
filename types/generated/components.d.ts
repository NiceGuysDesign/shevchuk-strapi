import type { Schema, Struct } from '@strapi/strapi';

export interface PresentationSlide extends Struct.ComponentSchema {
  collectionName: 'components_presentation_slides';
  info: {
    description: '\u041E\u0434\u0438\u043D \u0441\u043B\u0430\u0439\u0434 \u043F\u0440\u0435\u0437\u0435\u043D\u0442\u0430\u0446\u0456\u0457: \u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u043D\u044F \u0434\u043B\u044F desktop \u0442\u0430 mobile';
    displayName: 'Presentation Slide';
    icon: 'picture';
  };
  attributes: {
    code: Schema.Attribute.Blocks;
    desktopImg: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    mobileImg: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'presentation.slide': PresentationSlide;
    }
  }
}
