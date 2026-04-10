import {defineField, defineType} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Small uppercase text above the heading (e.g., "SERVICES")',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body Text',
      type: 'text',
      rows: 6,
      description: 'Use blank lines to separate paragraphs.',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Button Label',
      type: 'string',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Button Link',
      type: 'link',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
        aiAssist: {imageDescriptionField: 'alt'},
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {
        title: title || 'Hero Section',
        subtitle: 'Hero',
      }
    },
  },
})
