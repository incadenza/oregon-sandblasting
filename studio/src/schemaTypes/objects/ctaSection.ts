import {defineField, defineType} from 'sanity'
import {BulbOutlineIcon} from '@sanity/icons'

export const ctaSection = defineType({
  name: 'ctaSection',
  title: 'CTA Section',
  type: 'object',
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body Text',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Button Label',
      type: 'string',
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button Link',
      type: 'link',
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {title: title || 'CTA Section', subtitle: 'Call to Action'}
    },
  },
})
