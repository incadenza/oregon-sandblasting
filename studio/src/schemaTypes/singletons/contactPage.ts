import {EnvelopeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  icon: EnvelopeIcon,
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'form', title: 'Form'},
    {name: 'formEmail', title: 'Form Email Template'},
    {name: 'contactInfo', title: 'Contact Info'},
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'heroSection',
      group: 'hero',
    }),
    defineField({
      name: 'formHeading',
      title: 'Form Heading',
      type: 'string',
      group: 'form',
    }),
    defineField({
      name: 'formRecipientEmails',
      title: 'Form Recipient Emails',
      type: 'array',
      of: [{type: 'string', validation: (Rule) => Rule.email()}],
      group: 'form',
      description: 'Contact form submissions will be emailed to all of these addresses.',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'contactEmailSubject',
      title: 'Email Subject Prefix',
      type: 'string',
      group: 'formEmail',
      description: 'Subject line prefix for the notification email. Customer name is appended automatically.',
      initialValue: 'Contact Form',
    }),
    defineField({
      name: 'contactEmailHeading',
      title: 'Email Heading',
      type: 'string',
      group: 'formEmail',
      initialValue: 'New Contact Form Submission',
    }),
    defineField({
      name: 'contactEmailBody',
      title: 'Email Body',
      type: 'text',
      rows: 2,
      group: 'formEmail',
      initialValue: 'Someone reached out through the website contact form.',
    }),
    defineField({
      name: 'contactHeading',
      title: 'Contact Info Heading',
      type: 'string',
      group: 'contactInfo',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3,
      group: 'contactInfo',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      group: 'contactInfo',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      group: 'contactInfo',
    }),
    defineField({
      name: 'contactImage',
      title: 'Contact Info Image',
      type: 'image',
      group: 'contactInfo',
      options: {
        hotspot: true,
        aiAssist: {imageDescriptionField: 'alt'},
      },
      fields: [
        defineField({name: 'alt', type: 'string', title: 'Alternative text'}),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Contact Page'}
    },
  },
})
