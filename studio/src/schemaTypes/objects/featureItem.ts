import {defineField, defineType} from 'sanity'
import {StarIcon} from '@sanity/icons'

export const featureItem = defineType({
  name: 'featureItem',
  title: 'Feature',
  type: 'object',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'text',
      rows: 2,
      description: 'Use a line break for multi-line titles.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'kicker',
      title: 'Kicker',
      type: 'text',
      rows: 2,
      description: 'Bold introductory line shown above the body text.',
    }),
    defineField({
      name: 'body',
      title: 'Body Text',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      description: 'SVG or small image used as the feature icon.',
    }),
    defineField({
      name: 'showAccentBars',
      title: 'Show Accent Bars',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {title: 'title', media: 'icon'},
    prepare({title, media}) {
      return {title: title || 'Untitled Feature', subtitle: 'Feature', media}
    },
  },
})
