import {CalendarIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const schedulePage = defineType({
  name: 'schedulePage',
  title: 'Schedule Page',
  type: 'document',
  icon: CalendarIcon,
  groups: [
    {name: 'content', title: 'Page Content'},
    {name: 'notifications', title: 'Notifications'},
    {name: 'emails', title: 'Email Templates'},
    {name: 'details', title: 'Business Details'},
  ],
  fields: [
    defineField({
      name: 'heading',
      title: 'Page Heading',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Page Description',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'confirmationHeading',
      title: 'Confirmation Heading',
      type: 'string',
      group: 'content',
      description: 'Shown after a successful booking (e.g., "You\'re All Set!")',
    }),
    defineField({
      name: 'confirmationBody',
      title: 'Confirmation Body Text',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'notificationEmails',
      title: 'Notification Emails',
      type: 'array',
      of: [{type: 'string', validation: (Rule) => Rule.email()}],
      group: 'notifications',
      description: 'All new dropoff reservations will be emailed to these addresses.',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'confirmationEmailSubject',
      title: 'Confirmation Email — Subject',
      type: 'string',
      group: 'emails',
      description: 'Subject line for the customer\'s confirmation email. The date and time are appended automatically.',
      initialValue: 'Dropoff Confirmed',
    }),
    defineField({
      name: 'confirmationEmailHeading',
      title: 'Confirmation Email — Heading',
      type: 'string',
      group: 'emails',
      initialValue: 'Dropoff Confirmed',
    }),
    defineField({
      name: 'confirmationEmailBody',
      title: 'Confirmation Email — Body',
      type: 'text',
      rows: 2,
      group: 'emails',
      initialValue: 'Your delivery has been scheduled. Here are your details:',
    }),
    defineField({
      name: 'notificationEmailSubject',
      title: 'Internal Notification — Subject',
      type: 'string',
      group: 'emails',
      description: 'Subject line for the team notification email. Customer name and time are appended automatically.',
      initialValue: 'New Dropoff',
    }),
    defineField({
      name: 'notificationEmailHeading',
      title: 'Internal Notification — Heading',
      type: 'string',
      group: 'emails',
      initialValue: 'New Dropoff Scheduled',
    }),
    defineField({
      name: 'notificationEmailBody',
      title: 'Internal Notification — Body',
      type: 'text',
      rows: 2,
      group: 'emails',
      initialValue: 'A new delivery dropoff has been booked:',
    }),
    defineField({
      name: 'businessAddress',
      title: 'Business Address',
      type: 'text',
      rows: 2,
      group: 'details',
      description: 'Shown in confirmation emails and the confirmation screen.',
    }),
    defineField({
      name: 'businessPhone',
      title: 'Business Phone',
      type: 'string',
      group: 'details',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Schedule Page'}
    },
  },
})
