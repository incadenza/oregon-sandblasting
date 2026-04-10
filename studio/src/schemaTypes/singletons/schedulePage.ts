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
      name: 'notificationEmail',
      title: 'Notification Email',
      type: 'string',
      group: 'notifications',
      description: 'Email address that receives booking notifications. All new dropoff reservations will be sent here.',
      validation: (Rule) => Rule.required().email(),
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
