import {CogIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const settings = defineType({
  name: 'settings',
  title: 'SEO & Metadata',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      description: 'Used in browser tabs and search engine results (e.g., "Oregon Sandblasting").',
      initialValue: 'Oregon Sandblasting',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3,
      description: 'A short description shown in search engine results.',
      initialValue:
        'Industrial-scale blasting, powder coating, liquid coating, and hybrid finishing — all under one roof.',
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Sharing Image',
      type: 'image',
      description: 'Displayed when someone shares your site on Facebook, LinkedIn, etc.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'SEO & Metadata'}
    },
  },
})
