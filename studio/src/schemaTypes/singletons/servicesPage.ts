import {WrenchIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const servicesPage = defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  icon: WrenchIcon,
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'services', title: 'Services'},
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
      name: 'sectionTitle',
      title: 'Services Section Title',
      type: 'string',
      group: 'services',
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      group: 'services',
      of: [{type: 'serviceItem'}],
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
      return {title: 'Services Page'}
    },
  },
})
