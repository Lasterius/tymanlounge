import type { Struct, Schema } from '@strapi/strapi';

export interface SharedWorkingTime extends Struct.ComponentSchema {
  collectionName: 'components_shared_working_times';
  info: {
    displayName: 'workingTime';
    icon: 'clock';
  };
  attributes: {
    weekdayStart: Schema.Attribute.Time & Schema.Attribute.Required;
    weekdayFinish: Schema.Attribute.Time & Schema.Attribute.Required;
    weekendStart: Schema.Attribute.Time & Schema.Attribute.Required;
    weekendFinish: Schema.Attribute.Time & Schema.Attribute.Required;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    displayName: 'Slider';
    icon: 'address-book';
    description: '';
  };
  attributes: {
    files: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    name: 'Seo';
    icon: 'allergies';
    displayName: 'Seo';
    description: '';
  };
  attributes: {
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    displayName: 'Rich text';
    icon: 'align-justify';
    description: '';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    title: Schema.Attribute.String;
    body: Schema.Attribute.Text;
  };
}

export interface SharedNameAndLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_name_and_links';
  info: {
    displayName: 'NameAndLink';
    icon: 'twitter';
    description: '';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
    link: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'singleMedia';
    icon: 'chartBubble';
    description: '';
  };
  attributes: {};
}

export interface SharedMainItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_main_items';
  info: {
    displayName: 'mainItem';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    title: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    picture: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedAfficheItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_affiche_items';
  info: {
    displayName: 'AfficheItem';
    icon: 'stack';
    description: '';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 140;
      }>;
    date: Schema.Attribute.String & Schema.Attribute.Required;
    picture: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.working-time': SharedWorkingTime;
      'shared.slider': SharedSlider;
      'shared.seo': SharedSeo;
      'shared.rich-text': SharedRichText;
      'shared.quote': SharedQuote;
      'shared.name-and-link': SharedNameAndLink;
      'shared.media': SharedMedia;
      'shared.main-item': SharedMainItem;
      'shared.affiche-item': SharedAfficheItem;
    }
  }
}
