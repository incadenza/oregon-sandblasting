import {
  CalendarIcon,
  CogIcon,
  DocumentIcon,
  EarthGlobeIcon,
  EnvelopeIcon,
  HomeIcon,
  MenuIcon,
  SparklesIcon,
  UsersIcon,
  WrenchIcon,
} from '@sanity/icons'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'
import pluralize from 'pluralize-esm'

const DISABLED_TYPES = [
  'settings',
  'assist.instruction.context',
  'person',
  'homePage',
  'aboutPage',
  'servicesPage',
  'contactPage',
  'teamPage',
  'whatMakesUsDifferentPage',
  'schedulePage',
  'navigation',
  'footerContent',
]

function singletonItem(S: StructureBuilder, typeName: string, title: string, icon: any) {
  return S.listItem()
    .title(title)
    .icon(icon)
    .child(S.document().schemaType(typeName).documentId(typeName))
}

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Website Content')
    .items([
      // Pages group
      S.listItem()
        .title('Pages')
        .icon(DocumentIcon)
        .child(
          S.list()
            .title('Pages')
            .items([
              singletonItem(S, 'homePage', 'Home', HomeIcon),
              singletonItem(S, 'aboutPage', 'About', DocumentIcon),
              singletonItem(S, 'servicesPage', 'Services', WrenchIcon),
              singletonItem(S, 'contactPage', 'Contact', EnvelopeIcon),
              singletonItem(S, 'teamPage', 'Team', UsersIcon),
              singletonItem(S, 'whatMakesUsDifferentPage', 'What Makes Us Different', SparklesIcon),
              singletonItem(S, 'schedulePage', 'Schedule', CalendarIcon),
              S.divider(),
              S.documentTypeListItem('page').title('Other Pages'),
            ]),
        ),
      S.divider(),
      // Team Members
      S.listItem()
        .title('Team Members')
        .icon(UsersIcon)
        .child(S.documentTypeList('person').title('Team Members')),
      // Posts
      S.documentTypeListItem('post').title(pluralize('Post')),
      S.divider(),
      // Global elements
      singletonItem(S, 'navigation', 'Navigation', MenuIcon),
      singletonItem(S, 'footerContent', 'Footer', EarthGlobeIcon),
      singletonItem(S, 'settings', 'Site Settings', CogIcon),
    ])
