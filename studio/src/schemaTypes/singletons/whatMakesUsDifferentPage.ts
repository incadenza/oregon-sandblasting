import {SparklesIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const whatMakesUsDifferentPage = defineType({
  name: 'whatMakesUsDifferentPage',
  title: 'What Makes Us Different',
  type: 'document',
  icon: SparklesIcon,
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'features', title: 'Features'},
    {name: 'bottomCta', title: 'Bottom CTA'},
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'heroSection',
      group: 'hero',
    }),
    defineField({
      name: 'featuresSectionHeading',
      title: 'Features Section Heading',
      type: 'string',
      group: 'features',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      group: 'features',
      of: [{type: 'featureItem'}],
    }),
    defineField({
      name: 'bottomCta',
      title: 'Bottom CTA',
      type: 'ctaSection',
      group: 'bottomCta',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'What Makes Us Different'}
    },
  },
})
