import {defineQuery} from 'next-sanity'

export const settingsQuery = defineQuery(`*[_type == "settings"][0]{ title, description, ogImage }`)

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{firstName, lastName, picture},
`

const linkReference = /* groq */ `
  _type == "link" => {
    "page": page->slug.current,
    "post": post->slug.current
  }
`

const linkFields = /* groq */ `
  link {
      ...,
      ${linkReference}
      }
`

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ${linkFields},
      },
      _type == "infoSection" => {
        content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference}
          }
        }
      },
    },
  }
`)

export const sitemapData = defineQuery(`
  *[_type == "page" || _type == "post" && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`)

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`)

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`)

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content[]{
    ...,
    markDefs[]{
      ...,
      ${linkReference}
    }
  },
    ${postFields}
  }
`)

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`)

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`)

export const teamMembersQuery = defineQuery(`
  *[_type == "person" && isTeamMember == true] | order(displayOrder asc, firstName asc) {
    _id,
    firstName,
    lastName,
    role,
    picture
  }
`)

// ─── Page singleton queries ───

export const homePageQuery = defineQuery(`
  *[_type == "homePage"][0]{
    heroHeading,
    heroBody,
    heroPrimaryCtaLabel,
    heroPrimaryCtaLink { ..., ${linkReference} },
    heroSecondaryCtaLabel,
    heroSecondaryCtaLink { ..., ${linkReference} },
    heroBackgroundImage,
    trustedByHeading,
    trustedByLogos[]{ logo },
    differentiatorHeadingRegular,
    differentiatorHeadingBold,
    differentiatorBody,
    differentiatorCtaLabel,
    differentiatorCtaLink { ..., ${linkReference} },
    differentiatorImage,
    blastToFinishHeading,
    blastToFinishBody,
    blastToFinishCtaLabel,
    blastToFinishCtaLink { ..., ${linkReference} },
    blastToFinishBackgroundImage,
    quickLinks[]{ label, href, tone }
  }
`)

export const aboutPageQuery = defineQuery(`
  *[_type == "aboutPage"][0]{
    hero {
      label, heading, body, ctaLabel,
      ctaLink { ..., ${linkReference} },
      backgroundImage
    },
    hybridCoatingHeading,
    hybridCoatingBody,
    contentRows[]{ title, description, image, imageSide, learnMoreLabel, learnMoreLink { ..., ${linkReference} } },
    bottomCta {
      heading, body, buttonLabel,
      buttonLink { ..., ${linkReference} }
    }
  }
`)

export const servicesPageQuery = defineQuery(`
  *[_type == "servicesPage"][0]{
    hero {
      label, heading, body, ctaLabel,
      ctaLink { ..., ${linkReference} },
      backgroundImage
    },
    sectionTitle,
    services[]{ title, description, image, imageSide, learnMoreLabel, learnMoreLink { ..., ${linkReference} } },
    bottomCta {
      heading, body, buttonLabel,
      buttonLink { ..., ${linkReference} }
    }
  }
`)

export const contactPageQuery = defineQuery(`
  *[_type == "contactPage"][0]{
    hero {
      label, heading, body,
      backgroundImage
    },
    formHeading,
    formRecipientEmails,
    contactEmailSubject,
    contactEmailHeading,
    contactEmailBody,
    contactHeading,
    address,
    phone,
    email,
    contactImage
  }
`)

export const teamPageQuery = defineQuery(`
  *[_type == "teamPage"][0]{
    hero {
      label, heading, body,
      backgroundImage
    },
    bottomCta {
      heading, body, buttonLabel,
      buttonLink { ..., ${linkReference} }
    }
  }
`)

export const whatMakesUsDifferentPageQuery = defineQuery(`
  *[_type == "whatMakesUsDifferentPage"][0]{
    hero {
      label, heading, body, ctaLabel,
      ctaLink { ..., ${linkReference} },
      backgroundImage
    },
    featuresSectionHeading,
    features[]{ title, kicker, body, icon, showAccentBars },
    bottomCta {
      heading, body, buttonLabel,
      buttonLink { ..., ${linkReference} }
    }
  }
`)

export const navigationQuery = defineQuery(`
  *[_type == "navigation"][0]{
    navLinks[]{ label, href },
    ctaLabel,
    ctaHref
  }
`)

export const footerContentQuery = defineQuery(`
  *[_type == "footerContent"][0]{
    address,
    phone,
    badgeImage,
    copyrightText,
    legalLinks[]{ label, href }
  }
`)

export const schedulePageQuery = defineQuery(`
  *[_type == "schedulePage"][0]{
    heading,
    description,
    confirmationHeading,
    confirmationBody,
    notificationEmails,
    confirmationEmailSubject,
    confirmationEmailHeading,
    confirmationEmailBody,
    notificationEmailSubject,
    notificationEmailHeading,
    notificationEmailBody,
    businessAddress,
    businessPhone
  }
`)
