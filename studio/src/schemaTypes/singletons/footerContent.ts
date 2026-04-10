import {EarthGlobeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const footerContent = defineType({
  name: 'footerContent',
  title: 'Footer',
  type: 'document',
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'badgeImage',
      title: 'Certification Badge',
      type: 'image',
      description: 'E.g., AMPP QP3 badge.',
      options: {
        hotspot: true,
        aiAssist: {imageDescriptionField: 'alt'},
      },
      fields: [
        defineField({name: 'alt', type: 'string', title: 'Alternative text'}),
      ],
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      description: 'E.g., "©2025 Oregon Sandblasting. All rights reserved."',
    }),
    defineField({
      name: 'legalLinks',
      title: 'Legal Links',
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
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {title: 'label', subtitle: 'href'},
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Footer'}
    },
  },
})
