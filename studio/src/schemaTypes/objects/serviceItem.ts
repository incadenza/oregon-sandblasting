import {defineField, defineType} from 'sanity'
import {ComponentIcon} from '@sanity/icons'

export const serviceItem = defineType({
  name: 'serviceItem',
  title: 'Service Item',
  type: 'object',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      description: 'Use blank lines to separate paragraphs.',
    }),
    defineField({
      name: 'image',
      title: 'Image',
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
    defineField({
      name: 'imageSide',
      title: 'Image Side',
      type: 'string',
      initialValue: 'left',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Right', value: 'right'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      name: 'learnMoreLabel',
      title: 'Learn More Label',
      type: 'string',
      description: 'Optional link text shown below the description.',
    }),
    defineField({
      name: 'learnMoreLink',
      title: 'Learn More Link',
      type: 'link',
    }),
  ],
  preview: {
    select: {title: 'title', media: 'image'},
    prepare({title, media}) {
      return {title: title || 'Untitled Service', subtitle: 'Service', media}
    },
  },
})
