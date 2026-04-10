import {UsersIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const teamPage = defineType({
  name: 'teamPage',
  title: 'Team Page',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'heroSection',
    }),
    defineField({
      name: 'bottomCta',
      title: 'Bottom CTA',
      type: 'ctaSection',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Team Page'}
    },
  },
})
