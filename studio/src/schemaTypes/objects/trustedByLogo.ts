import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export const trustedByLogo = defineType({
  name: 'trustedByLogo',
  title: 'Logo',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo Image',
      type: 'image',
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: true,
        aiAssist: {imageDescriptionField: 'alt'},
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Company or brand name for accessibility.',
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'logo.alt', media: 'logo'},
    prepare({title, media}) {
      return {title: title || 'Logo', media}
    },
  },
})
