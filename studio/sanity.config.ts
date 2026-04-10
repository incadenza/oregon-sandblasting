/**
 * This config is used to configure your Sanity Studio.
 * Learn more: https://www.sanity.io/docs/configuration
 */

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './src/schemaTypes'
import {structure} from './src/structure'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
import {
  presentationTool,
  defineDocuments,
  defineLocations,
  type DocumentLocation,
} from 'sanity/presentation'
import {assist} from '@sanity/assist'

// Environment variables for project configuration
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-projectID'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

// URL for preview functionality, defaults to localhost:3000 if not set
const SANITY_STUDIO_PREVIEW_URL = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'

// Define the home location for the presentation tool
const homeLocation = {
  title: 'Home',
  href: '/',
} satisfies DocumentLocation

// resolveHref() is a convenience function that resolves the URL
// path for different document types and used in the presentation tool.
function resolveHref(documentType?: string, slug?: string): string | undefined {
  switch (documentType) {
    case 'post':
      return slug ? `/posts/${slug}` : undefined
    case 'page':
      return slug ? `/${slug}` : undefined
    case 'homePage':
      return '/'
    case 'aboutPage':
      return '/about'
    case 'servicesPage':
      return '/services'
    case 'contactPage':
      return '/contact'
    case 'teamPage':
      return '/team'
    case 'whatMakesUsDifferentPage':
      return '/what-makes-us-different'
    default:
      console.warn('Invalid document type:', documentType)
      return undefined
  }
}

// Main Sanity configuration
export default defineConfig({
  name: 'default',
  title: 'Oregon Sandblasting & Coating',

  projectId,
  dataset,

  plugins: [
    // Presentation tool configuration for Visual Editing
    presentationTool({
      previewUrl: {
        origin: SANITY_STUDIO_PREVIEW_URL,
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
      resolve: {
        // The Main Document Resolver API provides a method of resolving a main document from a given route or route pattern. https://www.sanity.io/docs/presentation-resolver-api#57720a5678d9
        mainDocuments: defineDocuments([
          {
            route: '/',
            filter: `_type == "homePage"`,
          },
          {
            route: '/about',
            filter: `_type == "aboutPage"`,
          },
          {
            route: '/services',
            filter: `_type == "servicesPage"`,
          },
          {
            route: '/contact',
            filter: `_type == "contactPage"`,
          },
          {
            route: '/team',
            filter: `_type == "teamPage"`,
          },
          {
            route: '/what-makes-us-different',
            filter: `_type == "whatMakesUsDifferentPage"`,
          },
          {
            route: '/:slug',
            filter: `_type == "page" && slug.current == $slug || _id == $slug`,
          },
          {
            route: '/posts/:slug',
            filter: `_type == "post" && slug.current == $slug || _id == $slug`,
          },
        ]),
        locations: {
          settings: defineLocations({
            locations: [homeLocation],
            message: 'This document is used on all pages',
            tone: 'positive',
          }),
          navigation: defineLocations({
            locations: [homeLocation],
            message: 'Navigation is used on all pages',
            tone: 'positive',
          }),
          footerContent: defineLocations({
            locations: [homeLocation],
            message: 'Footer is used on all pages',
            tone: 'positive',
          }),
          homePage: defineLocations({
            locations: [{title: 'Home', href: '/'}],
          }),
          aboutPage: defineLocations({
            locations: [{title: 'About', href: '/about'}],
          }),
          servicesPage: defineLocations({
            locations: [{title: 'Services', href: '/services'}],
          }),
          contactPage: defineLocations({
            locations: [{title: 'Contact', href: '/contact'}],
          }),
          teamPage: defineLocations({
            locations: [{title: 'Team', href: '/team'}],
          }),
          whatMakesUsDifferentPage: defineLocations({
            locations: [{title: 'What Makes Us Different', href: '/what-makes-us-different'}],
          }),
          schedulePage: defineLocations({
            locations: [{title: 'Schedule', href: '/schedule'}],
          }),
          page: defineLocations({
            select: {
              name: 'name',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.name || 'Untitled',
                  href: resolveHref('page', doc?.slug)!,
                },
              ],
            }),
          }),
          post: defineLocations({
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || 'Untitled',
                  href: resolveHref('post', doc?.slug)!,
                },
                {
                  title: 'Home',
                  href: '/',
                } satisfies DocumentLocation,
              ].filter(Boolean) as DocumentLocation[],
            }),
          }),
        },
      },
    }),
    structureTool({
      structure, // Custom studio structure configuration, imported from ./src/structure.ts
    }),
    // Additional plugins for enhanced functionality
    unsplashImageAsset(),
    assist(),
    visionTool(),
  ],

  // Schema configuration, imported from ./src/schemaTypes/index.ts
  schema: {
    types: schemaTypes,
  },
})
