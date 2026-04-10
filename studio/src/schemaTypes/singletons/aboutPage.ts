import {DocumentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'whatIsHybridCoating', title: 'What Is Hybrid Coating'},
    {name: 'serviceRows', title: 'Content Rows'},
    {name: 'bottomCta', title: 'Bottom CTA'},
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'heroSection',
      group: 'hero',
    }),

    // What Is Hybrid Coating section
    defineField({
      name: 'hybridCoatingHeading',
      title: 'Section Heading',
      type: 'string',
      group: 'whatIsHybridCoating',
    }),
    defineField({
      name: 'hybridCoatingBody',
      title: 'Body Text',
      type: 'text',
      rows: 8,
      group: 'whatIsHybridCoating',
      description: 'Use blank lines to separate paragraphs.',
    }),

    // Service-style content rows
    defineField({
      name: 'contentRows',
      title: 'Content Rows',
      type: 'array',
      group: 'serviceRows',
      of: [{type: 'serviceItem'}],
    }),

    // Bottom CTA
    defineField({
      name: 'bottomCta',
      title: 'Bottom CTA',
      type: 'ctaSection',
      group: 'bottomCta',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'About Page'}
    },
  },
})
