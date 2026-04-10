import {MenuIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'navLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'URL Path',
              type: 'string',
              description: 'Internal path, e.g. /services, /about',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {title: 'label', subtitle: 'href'},
          },
        },
      ],
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Button Label',
      type: 'string',
      description: 'The call-to-action button in the header (e.g., "Talk to the Team").',
    }),
    defineField({
      name: 'ctaHref',
      title: 'CTA Button URL Path',
      type: 'string',
      description: 'Internal path for the CTA button, e.g. /contact',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Navigation'}
    },
  },
})
