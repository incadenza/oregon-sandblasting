#!/usr/bin/env node
/**
 * One-time migration script that populates Sanity singleton documents
 * with the content currently hardcoded in the frontend components.
 *
 * Also uploads all /public/figma-assets/ images to Sanity and creates
 * person documents for team members.
 *
 * Usage:
 *   node scripts/seed-cms-content.mjs            # run the migration
 *   node scripts/seed-cms-content.mjs --dry-run   # preview without writing
 *
 * Requires env vars (reads from .env.local or .env):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_WRITE_TOKEN (or SANITY_API_READ_TOKEN if it has write access)
 */

import {createClient} from '@sanity/client'
import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')
const assetsDir = path.join(projectRoot, 'public', 'figma-assets')

const dryRun = process.argv.includes('--dry-run')

// ── Load env ──
function loadEnv() {
  for (const envFile of ['.env.local', '.env']) {
    const envPath = path.join(projectRoot, envFile)
    if (fs.existsSync(envPath)) {
      const lines = fs.readFileSync(envPath, 'utf8').split('\n')
      for (const line of lines) {
        const match = line.match(/^\s*([A-Z_][A-Z0-9_]*)=["']?([^"'\n]*)["']?\s*$/)
        if (match && !process.env[match[1]]) {
          process.env[match[1]] = match[2]
        }
      }
    }
  }
}
loadEnv()

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN

if (!projectId || !token) {
  console.error('Missing required env vars: NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN (or SANITY_API_READ_TOKEN)')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// ── Image upload cache ──
const imageCache = new Map() // filePath -> { _type: 'image', asset: { _type: 'reference', _ref } }

async function uploadImage(relativePath, altText) {
  if (!relativePath) return undefined
  const filePath = path.join(assetsDir, relativePath)
  if (!fs.existsSync(filePath)) {
    console.warn(`  ⚠ Image not found: ${filePath}`)
    return undefined
  }

  if (imageCache.has(filePath)) {
    const cached = imageCache.get(filePath)
    return altText ? {...cached, alt: altText} : cached
  }

  if (dryRun) {
    console.log(`  [dry-run] Would upload: ${relativePath}`)
    return {_type: 'image', alt: altText || undefined}
  }

  const ext = path.extname(filePath).slice(1)
  const contentType = ext === 'svg' ? 'image/svg+xml' : `image/${ext === 'jpg' ? 'jpeg' : ext}`
  const imageBuffer = fs.readFileSync(filePath)

  console.log(`  Uploading: ${relativePath} (${(imageBuffer.length / 1024).toFixed(0)} KB)`)

  const asset = await client.assets.upload('image', imageBuffer, {
    filename: path.basename(filePath),
    contentType,
  })

  const ref = {
    _type: 'image',
    asset: {_type: 'reference', _ref: asset._id},
  }
  imageCache.set(filePath, ref)
  return altText ? {...ref, alt: altText} : ref
}

// Helper to strip the /figma-assets/ prefix
function assetName(figmaPath) {
  return figmaPath.replace(/^\/figma-assets\//, '')
}

async function createOrReplace(doc) {
  const label = doc._id || doc._type
  if (dryRun) {
    console.log(`[dry-run] Would create: ${label}`)
    return
  }
  console.log(`Creating: ${label}`)
  await client.createOrReplace(doc)
}

// ── Link helper ──
function internalLink(href) {
  return {
    _type: 'link',
    linkType: 'href',
    href,
    openInNewTab: false,
  }
}

// ── Main ──
async function main() {
  console.log(`\nSanity CMS Content Seed`)
  console.log(`Project: ${projectId} / ${dataset}`)
  if (dryRun) console.log('DRY RUN — no changes will be made\n')
  else console.log('')

  // ═══════════════════════════════════════
  // 1. HOME PAGE
  // ═══════════════════════════════════════
  console.log('── Home Page ──')
  const homeHeroBg = await uploadImage(assetName('/figma-assets/home_hero.png'))
  const differentiatorImg = await uploadImage(
    assetName('/figma-assets/7d10106fc4277aec6c786dffe49487add3531d80.png'),
    'Blue steel structure',
  )
  const blastBg = await uploadImage(
    assetName('/figma-assets/f16181ac8df6f6ba9445c9839ec6c317f02fbffa.png'),
    'Industrial coating facility with hanging metal parts',
  )

  const trustedLogos = []
  const logoFiles = [
    {file: 'ea6e283cdbdf592c8baa68ced797fe2bf6aaac2a.png', alt: 'Customer logo 1'},
    {file: '2e6e1a2dad88247b5ce5f9534ad7f8190969ada6.png', alt: 'Advanced Welding & Steel'},
    {file: 'f397ffd51dc118a82c7637f45c36233a6c7b01a1.png', alt: 'Alpha Iron'},
    {file: '8692c649af45b9172bf620725b653dced050d011.png', alt: 'SteelFab'},
    {file: '708e9a1b990bc41c48a76ca0cc11faf523cf96e3.png', alt: 'AIG'},
    {file: '1a33e3c4dfc86d3af62275606a79edf9384ded24.png', alt: 'Customer logo 2'},
  ]
  for (const logo of logoFiles) {
    const img = await uploadImage(logo.file, logo.alt)
    if (img) trustedLogos.push({_type: 'trustedByLogo', _key: logo.file.slice(0, 8), logo: img})
  }

  await createOrReplace({
    _type: 'homePage',
    _id: 'homePage',
    heroHeading: "The West Coast's Fastest Path to Finished Steel",
    heroBody:
      'From blast to finish, one shop with zero friction. We compress timelines, eliminate rework, and deliver spec-perfect results at industrial scale.',
    heroPrimaryCtaLabel: 'Request a Quote',
    heroPrimaryCtaLink: internalLink('/contact'),
    heroSecondaryCtaLabel: 'Learn What Makes Us Different',
    heroSecondaryCtaLink: internalLink('/what-makes-us-different'),
    heroBackgroundImage: homeHeroBg,
    trustedByHeading: 'Trusted By Leaders Big and Small',
    trustedByLogos: trustedLogos,
    differentiatorHeadingRegular: 'Anyone can apply a coating.',
    differentiatorHeadingBold:
      'We engineer the finish, compress the schedule, and simplify the entire job.',
    differentiatorBody: 'Discover what makes us different.',
    differentiatorCtaLabel: 'Learn More',
    differentiatorCtaLink: internalLink('/what-makes-us-different'),
    differentiatorImage: differentiatorImg,
    blastToFinishHeading: 'From Blast to Finish',
    blastToFinishBody:
      "We handle every step of the industrial coating process — blasting, liquid, powder, and specialty finishes — all under one roof. Whether you're fabricating a small assembly or managing a complex build, we keep your job moving without change orders, vendor delays, or coating conflicts.",
    blastToFinishCtaLabel: 'Explore Our Services',
    blastToFinishCtaLink: internalLink('/services'),
    blastToFinishBackgroundImage: blastBg,
    quickLinks: [
      {_type: 'object', _key: 'ql-team', label: 'Team', href: '/team', tone: 'primary'},
      {_type: 'object', _key: 'ql-services', label: 'Services', href: '/services', tone: 'secondary'},
      {_type: 'object', _key: 'ql-contact', label: 'Contact Us', href: '/contact', tone: 'secondary'},
    ],
  })

  // ═══════════════════════════════════════
  // 2. ABOUT PAGE
  // ═══════════════════════════════════════
  console.log('\n── About Page ──')
  const aboutHeroBg = await uploadImage(assetName('/figma-assets/about-hero.png'))
  const aboutWhyWorks = await uploadImage('about-why-works.png')
  const aboutInShop = await uploadImage('about-in-shop.png')

  await createOrReplace({
    _type: 'aboutPage',
    _id: 'aboutPage',
    hero: {
      _type: 'heroSection',
      label: 'ABOUT HYBRID COATINGS',
      heading: "Faster Finishes for Jobs That Can't Afford Delays",
      body: "Every extra day in the field costs time, money, and coordination effort.\n\nHybrid coating helps you get ahead of the schedule by combining powder and liquid systems in one controlled workflow, inside one facility.\n\nWhether you're managing a multi-phase project or trying to avoid rework and site delays, hybrid coating gives you the flexibility to finish faster without compromising finish quality or performance.\n\nHere's how it works.",
      ctaLabel: 'Request a Quote',
      ctaLink: internalLink('/contact'),
      backgroundImage: aboutHeroBg,
    },
    hybridCoatingHeading: 'What Is Hybrid Coating?',
    hybridCoatingBody:
      "Hybrid coating uses both powder and liquid finishes on a single job, often on different parts of the same assembly. For example, powder on grating and handrail, liquid on large structural steel. The result is faster throughput, better material compatibility, and a matched final appearance.\n\nOur team coordinates the entire process under one roof, so you avoid back-and-forth handoffs, mismatched finishes, and lost time waiting on third-party vendors.",
    contentRows: [
      {
        _type: 'serviceItem',
        _key: 'why-works',
        title: 'Why It Works So Well',
        description:
          "Traditional coating workflows involve multiple vendors, scattered timelines, and field coordination. That leads to bottlenecks, inconsistent finishes, and more opportunity for error.\n\nHybrid coating removes the friction. We apply the right coating to the right part, in the right sequence, without leaving the facility. That means tighter timelines, fewer change orders, and no guesswork.",
        image: aboutWhyWorks,
        imageSide: 'left',
      },
      {
        _type: 'serviceItem',
        _key: 'in-shop',
        title: 'Why In-Shop Beats In-Field',
        description:
          "Field coating is slower, less predictable, and more expensive. It puts pressure on your install crew, increases labor costs, and introduces finish risk due to weather, surface prep, or coordination delays.\n\nBy completing the entire coating process in a controlled environment, we give your team a cleaner, more consistent finish with fewer surprises on site.",
        image: aboutInShop,
        imageSide: 'right',
      },
    ],
    bottomCta: {
      _type: 'ctaSection',
      heading: 'The Bottom Line',
      body: "Hybrid coating is built for the realities of fast-moving jobs.\n\nIt saves time, cuts cost, and delivers consistent results — all with one point of contact.\n\nWant to see how it fits into your next spec?",
      buttonLabel: 'Talk to Our Team',
      buttonLink: internalLink('/contact'),
    },
  })

  // ═══════════════════════════════════════
  // 3. SERVICES PAGE
  // ═══════════════════════════════════════
  console.log('\n── Services Page ──')
  const servicesHeroBg = await uploadImage('services-hero.png')

  const serviceImages = {
    blasting: await uploadImage('blasting.png'),
    powder: await uploadImage('powder-coating.png'),
    liquid: await uploadImage('liquid-coating.png'),
    hybrid: await uploadImage('hybrid-coating.png'),
    specialty: await uploadImage('specialty-coatings.png'),
    finish: await uploadImage('finish-matching.png'),
  }

  await createOrReplace({
    _type: 'servicesPage',
    _id: 'servicesPage',
    hero: {
      _type: 'heroSection',
      label: 'SERVICES',
      heading: "The West Coast's Fastest Path to Finished Steel, for Builders Big and Small",
      body: "We handle every stage of industrial finishing, from blast to final coat, all in one QP-3 Certified shop. Our process control, equipment scale, and facility layout make us a fit for complex assemblies, oversized steel, and projects that demand visual precision and schedule reliability.\n\nLocated in the heart of the Coater's Loop, we're just steps from galvanizing partners, giving you a complete finishing solution with less freight, fewer handoffs, and faster turnarounds.",
      ctaLabel: 'Request a Quote',
      ctaLink: internalLink('/contact'),
      backgroundImage: servicesHeroBg,
    },
    sectionTitle: 'Services',
    services: [
      {
        _type: 'serviceItem',
        _key: 'blasting',
        title: 'Blasting',
        description:
          'One of the largest wheelabrators on the West Coast, plus 2 large blast rooms. Ideal for prepping large structural steel, skid systems, and architectural builds in minutes rather than hours.',
        image: serviceImages.blasting,
        imageSide: 'left',
      },
      {
        _type: 'serviceItem',
        _key: 'powder',
        title: 'Powder Coating',
        description:
          'Precision powder coating for both oversized assemblies and small-to-medium parts. Our large-format ovens handle complex fabrications, while our batch line supports high-speed, repeat part runs with flexible sizing and consistent control. We also have foam capabilities.',
        image: serviceImages.powder,
        imageSide: 'right',
      },
      {
        _type: 'serviceItem',
        _key: 'liquid',
        title: 'Liquid Coating',
        description:
          'Industrial-grade wet-applied systems, including zinc, epoxy and urethane coatings, applied by experienced technicians. A go-to solution for infrastructure, transportation, energy, and other spec-driven work.',
        image: serviceImages.liquid,
        imageSide: 'left',
      },
      {
        _type: 'serviceItem',
        _key: 'hybrid',
        title: 'Hybrid Coating',
        description:
          'We combine powder and liquid finishes to accelerate schedules without compromising quality. Hybrid jobs are engineered for visual consistency across systems and executed entirely in-house.',
        image: serviceImages.hybrid,
        imageSide: 'right',
        learnMoreLabel: 'Learn more about hybrid coating',
        learnMoreLink: internalLink('/about'),
      },
      {
        _type: 'serviceItem',
        _key: 'specialty',
        title: 'Specialty Coatings',
        description:
          'Support for a wide range of performance-based requirements, including marine-grade protection, zinc-rich primers, high-temp finishes, and thermal spray applications.',
        image: serviceImages.specialty,
        imageSide: 'left',
      },
      {
        _type: 'serviceItem',
        _key: 'finish',
        title: 'Finish Matching',
        description:
          'Powder and liquid finishes delivered with visual consistency across systems. Multi-spec jobs finish clean with no color mismatch or sheen variation.',
        image: serviceImages.finish,
        imageSide: 'right',
      },
    ],
    bottomCta: {
      _type: 'ctaSection',
      heading: 'Get Help Scoping Your Project',
      body: "Whether you're managing a tight deadline, navigating a complex spec, or just need a quote, we're ready to help you keep the job moving.",
      buttonLabel: 'Talk to Our Team',
      buttonLink: internalLink('/contact'),
    },
  })

  // ═══════════════════════════════════════
  // 4. CONTACT PAGE
  // ═══════════════════════════════════════
  console.log('\n── Contact Page ──')
  const contactHeroBg = await uploadImage('contact-hero.png')
  const contactInfoImg = await uploadImage('contact-info.png')

  await createOrReplace({
    _type: 'contactPage',
    _id: 'contactPage',
    hero: {
      _type: 'heroSection',
      label: 'TALK TO THE TEAM',
      heading: 'Have a Spec? A Question? A Challenge?',
      body: "Whether you're managing a complex spec, racing a deadline, or done chasing multiple vendors, we're here to make coatings easier. Tell us about your project and we'll show you a faster, cleaner way to get it done with no friction.",
      backgroundImage: contactHeroBg,
    },
    formHeading: "Let's Talk.",
    contactHeading: 'Contact Us',
    address: '10000 SW Herman Rd,\nTualatin, Oregon 97062',
    phone: '(503) 692-3575',
    email: 'info@oregonsandblasting.com',
    contactImage: contactInfoImg,
  })

  // ═══════════════════════════════════════
  // 5. TEAM PAGE
  // ═══════════════════════════════════════
  console.log('\n── Team Page ──')
  const teamHeroBg = await uploadImage('team-hero.png')

  await createOrReplace({
    _type: 'teamPage',
    _id: 'teamPage',
    hero: {
      _type: 'heroSection',
      label: 'The Team',
      heading: 'Trusted by the Team Behind the Build',
      body: "We're not just coating parts. We're solving production challenges for the fabricators, engineers, and contractors who build the world.",
      backgroundImage: teamHeroBg,
    },
    bottomCta: {
      _type: 'ctaSection',
      heading: 'The Bottom Line',
      body: "Hybrid coating is built for the realities of fast-moving jobs.\n\nIt saves time, cuts cost, and delivers consistent results — all with one point of contact.\n\nWant to see how it fits into your next spec?",
      buttonLabel: 'Talk to Our Team',
      buttonLink: internalLink('/contact'),
    },
  })

  // ═══════════════════════════════════════
  // 6. WHAT MAKES US DIFFERENT PAGE
  // ═══════════════════════════════════════
  console.log('\n── What Makes Us Different Page ──')
  const wmudHeroBg = await uploadImage('wmud-hero.png')

  const featureIcons = {
    finishes: await uploadImage('icon-futuro-finishes.svg'),
    scale: await uploadImage('icon-futuro-scale.svg'),
    schedule: await uploadImage('icon-futuro-schedule.svg'),
    layer: await uploadImage('icon-layer.svg'),
    iterations: await uploadImage('icon-iteration-cycles.svg'),
  }

  await createOrReplace({
    _type: 'whatMakesUsDifferentPage',
    _id: 'whatMakesUsDifferentPage',
    hero: {
      _type: 'heroSection',
      label: 'WHAT MAKES US DIFFERENT',
      heading: 'More than a Coater.\nA Critical Project Partner.',
      body: "The final stop for structural steel that will help you meet the schedule, not break the schedule.\n\nWe built Oregon Sandblasting & Coating to eliminate the coordination issues, delays, and visual inconsistencies that slow down complex jobs. Whether you're fabricating infrastructure, industrial systems, or high-value architectural steel, we deliver more than a finished part. We deliver reliability, speed, and control where it matters most.",
      ctaLabel: 'Request a Quote',
      ctaLink: internalLink('/contact'),
      backgroundImage: wmudHeroBg,
    },
    featuresSectionHeading: 'This is how we do it:',
    features: [
      {
        _type: 'featureItem',
        _key: 'all-finishes',
        title: 'All Finishes, One Roof',
        kicker: 'No handoffs. No disconnects. Just one seamless workflow.',
        body: "We handle powder, liquid, and specialty coatings in-house, all under one roof with one team. That means no more juggling multiple vendors or dealing with schedule drift because a coating partner wasn't ready. Whether you're coating a single spec or managing a multi-process assembly, we simplify the job from start to finish.",
        icon: featureIcons.finishes,
        showAccentBars: true,
      },
      {
        _type: 'featureItem',
        _key: 'built-for-scale',
        title: 'Built for\nScale',
        kicker: 'We move big steel. Fast.',
        body: "From oversized structural pieces to high-volume runs, we're equipped to handle serious throughput. Our facility houses one of the largest wheelabrators on the West Coast and a suite of massive powder ovens built for industrial scale. What takes most shops six hours to blast, we can do in fifteen minutes without sacrificing quality.",
        icon: featureIcons.scale,
        showAccentBars: true,
      },
      {
        _type: 'featureItem',
        _key: 'schedule-compression',
        title: 'Schedule Compression',
        kicker: 'We help you win back time across days, weeks, or even months.',
        body: "By consolidating processes, reducing friction, and eliminating rework, we help our partners meet tight project timelines with less stress. If your coating partner is holding up your schedule, it's time to make a change.",
        icon: featureIcons.schedule,
        showAccentBars: true,
      },
      {
        _type: 'featureItem',
        _key: 'spec-driven',
        title: 'Spec-Driven Precision',
        kicker: 'No mismatches. No rework. No headaches.',
        body: 'Our team delivers powder and liquid finishes with proven visual consistency across systems, across assemblies, and across timelines. That means no surprises for your client, no field rework, and no excuses when it comes time to ship.',
        icon: featureIcons.layer,
        showAccentBars: false,
      },
      {
        _type: 'featureItem',
        _key: 'coaters-loop',
        title: "The Coater's\nLoop",
        kicker: 'Finishing ecosystem. One block. Zero friction.',
        body: "We're located in the heart of the Coater's Loop, within steps of galvanizing and other finishing partners. That proximity reduces freight, shortens timelines, and makes it easier to deliver finished steel that's truly ready to go.",
        icon: featureIcons.iterations,
        showAccentBars: false,
      },
    ],
    bottomCta: {
      _type: 'ctaSection',
      heading: "We Don't Just Finish Parts.\nWe Help You Finish the Job.",
      body: "Let's talk through your next project. We'll help you scope the best approach and show you how much time, cost, and complexity you can save.",
      buttonLabel: 'Talk to Our Team',
      buttonLink: internalLink('/contact'),
    },
  })

  // ═══════════════════════════════════════
  // 7. NAVIGATION
  // ═══════════════════════════════════════
  console.log('\n── Navigation ──')
  await createOrReplace({
    _type: 'navigation',
    _id: 'navigation',
    navLinks: [
      {_type: 'object', _key: 'nav-team', label: 'The Team', href: '/team'},
      {_type: 'object', _key: 'nav-services', label: 'Services', href: '/services'},
      {_type: 'object', _key: 'nav-wmud', label: 'What Makes Us Different', href: '/what-makes-us-different'},
      {_type: 'object', _key: 'nav-about', label: 'About Hybrid Coatings', href: '/about'},
      {_type: 'object', _key: 'nav-schedule', label: 'Schedule Your Dropoff', href: '/schedule'},
    ],
    ctaLabel: 'Talk to the Team',
    ctaHref: '/contact',
  })

  // ═══════════════════════════════════════
  // 8. FOOTER
  // ═══════════════════════════════════════
  console.log('\n── Footer ──')
  const qp3Badge = await uploadImage(
    '719d8110f5abd8944527caa8c88e1a9a4214f72a.png',
    'AMPP QP3 Certified',
  )

  await createOrReplace({
    _type: 'footerContent',
    _id: 'footerContent',
    address: '10000 SW Herman Rd,\nTualatin, Oregon 97062',
    phone: '(503) 692-3575',
    badgeImage: qp3Badge,
    copyrightText: '©2025 Oregon Sandblasting. All rights reserved.',
    legalLinks: [
      {_type: 'object', _key: 'legal-privacy', label: 'Privacy Policy', href: '/privacy'},
      {_type: 'object', _key: 'legal-terms', label: 'Terms of Use', href: '/terms'},
    ],
  })

  // ═══════════════════════════════════════
  // 9. TEAM MEMBERS (person documents)
  // ═══════════════════════════════════════
  console.log('\n── Team Members ──')
  const teamMembers = [
    {id: 'person-jason', firstName: 'Jason', lastName: 'Crawford', role: 'Owner', picture: 'team/jason-osb-3886 1.png', order: 1},
    {id: 'person-mike', firstName: 'Mike', lastName: 'Ward', role: 'General Manager', picture: 'team/mike-osb-3836 1.png', order: 2},
    {id: 'person-andrew', firstName: 'Andrew', lastName: 'Toth', role: 'Sales Manager', picture: 'team/andy-osb-3606 1.png', order: 3},
    {id: 'person-earlene', firstName: 'Earlene', lastName: 'Hoskins', role: 'HR and Accounting', picture: null, order: 4},
    {id: 'person-alan', firstName: 'Alan', lastName: 'Squires', role: 'Quality Control Manager', picture: 'team/alan-osb-3634 1.png', order: 5},
    {id: 'person-kelsey', firstName: 'Kelsey', lastName: 'Burns', role: 'Scheduling Coordinator', picture: null, order: 6},
    {id: 'person-dave', firstName: 'Dave', lastName: 'Finzer', role: 'Powder Expert', picture: 'team/dave-osb-3800 1.png', order: 7},
    {id: 'person-chip', firstName: 'Chip', lastName: 'Schaber', role: 'Shipping and Project Manager', picture: 'team/chip-osb-3773 1.png', order: 8},
    {id: 'person-stephen', firstName: 'Stephen', lastName: 'Toth', role: 'Project Manager', picture: 'team/stephen-osb-3547 1.png', order: 9},
    {id: 'person-carson', firstName: 'Carson', lastName: 'Warner', role: 'Estimator', picture: 'team/carson-osb-3467 1.png', order: 10},
    {id: 'person-austin', firstName: 'Austin', lastName: 'Shadbolt', role: 'Estimator', picture: 'team/austin-osb-3707 1.png', order: 11},
  ]

  for (const member of teamMembers) {
    const fullName = `${member.firstName} ${member.lastName}`
    const picture = member.picture
      ? await uploadImage(member.picture, fullName)
      : undefined

    const doc = {
      _type: 'person',
      _id: member.id,
      firstName: member.firstName,
      lastName: member.lastName,
      role: member.role,
      isTeamMember: true,
      displayOrder: member.order,
    }
    if (picture) doc.picture = picture

    await createOrReplace(doc)
  }

  // ═══════════════════════════════════════
  console.log('\n✓ Done! All content has been seeded.')
  console.log(`  Uploaded ${imageCache.size} unique images to Sanity.`)
  if (dryRun) console.log('  (Dry run — no actual changes were made)')
}

main().catch((err) => {
  console.error('\n✗ Migration failed:', err.message || err)
  process.exit(1)
})
