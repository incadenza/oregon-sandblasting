import {HomeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'trustedBy', title: 'Trusted By'},
    {name: 'differentiator', title: 'Differentiator'},
    {name: 'fromBlastToFinish', title: 'From Blast to Finish'},
    {name: 'quickLinks', title: 'Quick Links'},
  ],
  fields: [
    // Hero section
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroBody',
      title: 'Hero Body Text',
      type: 'text',
      rows: 3,
      group: 'hero',
    }),
    defineField({
      name: 'heroPrimaryCtaLabel',
      title: 'Primary CTA Label',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroPrimaryCtaLink',
      title: 'Primary CTA Link',
      type: 'link',
      group: 'hero',
    }),
    defineField({
      name: 'heroSecondaryCtaLabel',
      title: 'Secondary CTA Label',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroSecondaryCtaLink',
      title: 'Secondary CTA Link',
      type: 'link',
      group: 'hero',
    }),
    defineField({
      name: 'heroBackgroundImage',
      title: 'Hero Background Image',
      type: 'image',
      group: 'hero',
      options: {
        hotspot: true,
        aiAssist: {imageDescriptionField: 'alt'},
      },
      fields: [
        defineField({name: 'alt', type: 'string', title: 'Alternative text'}),
      ],
    }),

    // Trusted By section
    defineField({
      name: 'trustedByHeading',
      title: 'Section Heading',
      type: 'string',
      group: 'trustedBy',
    }),
    defineField({
      name: 'trustedByLogos',
      title: 'Logos',
      type: 'array',
      group: 'trustedBy',
      of: [{type: 'trustedByLogo'}],
    }),

    // Differentiator section
    defineField({
      name: 'differentiatorHeadingRegular',
      title: 'Heading (Regular Weight)',
      type: 'string',
      group: 'differentiator',
    }),
    defineField({
      name: 'differentiatorHeadingBold',
      title: 'Heading (Bold Weight)',
      type: 'string',
      group: 'differentiator',
    }),
    defineField({
      name: 'differentiatorBody',
      title: 'Body Text',
      type: 'string',
      group: 'differentiator',
    }),
    defineField({
      name: 'differentiatorCtaLabel',
      title: 'CTA Label',
      type: 'string',
      group: 'differentiator',
    }),
    defineField({
      name: 'differentiatorCtaLink',
      title: 'CTA Link',
      type: 'link',
      group: 'differentiator',
    }),
    defineField({
      name: 'differentiatorImage',
      title: 'Image',
      type: 'image',
      group: 'differentiator',
      options: {
        hotspot: true,
        aiAssist: {imageDescriptionField: 'alt'},
      },
      fields: [
        defineField({name: 'alt', type: 'string', title: 'Alternative text'}),
      ],
    }),

    // From Blast to Finish section
    defineField({
      name: 'blastToFinishHeading',
      title: 'Heading',
      type: 'string',
      group: 'fromBlastToFinish',
    }),
    defineField({
      name: 'blastToFinishBody',
      title: 'Body Text',
      type: 'text',
      rows: 5,
      group: 'fromBlastToFinish',
    }),
    defineField({
      name: 'blastToFinishCtaLabel',
      title: 'CTA Label',
      type: 'string',
      group: 'fromBlastToFinish',
    }),
    defineField({
      name: 'blastToFinishCtaLink',
      title: 'CTA Link',
      type: 'link',
      group: 'fromBlastToFinish',
    }),
    defineField({
      name: 'blastToFinishBackgroundImage',
      title: 'Background Image',
      type: 'image',
      group: 'fromBlastToFinish',
      options: {
        hotspot: true,
        aiAssist: {imageDescriptionField: 'alt'},
      },
      fields: [
        defineField({name: 'alt', type: 'string', title: 'Alternative text'}),
      ],
    }),

    // Quick Links
    defineField({
      name: 'quickLinks',
      title: 'Quick Links',
      type: 'array',
      group: 'quickLinks',
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
              description: 'Internal path, e.g. /services',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'tone',
              title: 'Color Tone',
              type: 'string',
              initialValue: 'secondary',
              options: {
                list: [
                  {title: 'Primary (Bright Blue)', value: 'primary'},
                  {title: 'Secondary (Royal Blue)', value: 'secondary'},
                ],
                layout: 'radio',
                direction: 'horizontal',
              },
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
      return {title: 'Home Page'}
    },
  },
})
