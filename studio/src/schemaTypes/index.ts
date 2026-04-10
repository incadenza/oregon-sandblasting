import {person} from './documents/person'
import {page} from './documents/page'
import {post} from './documents/post'
import {callToAction} from './objects/callToAction'
import {ctaSection} from './objects/ctaSection'
import {featureItem} from './objects/featureItem'
import {heroSection} from './objects/heroSection'
import {infoSection} from './objects/infoSection'
import {serviceItem} from './objects/serviceItem'
import {trustedByLogo} from './objects/trustedByLogo'
import {settings} from './singletons/settings'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'
import {homePage} from './singletons/homePage'
import {aboutPage} from './singletons/aboutPage'
import {servicesPage} from './singletons/servicesPage'
import {contactPage} from './singletons/contactPage'
import {teamPage} from './singletons/teamPage'
import {whatMakesUsDifferentPage} from './singletons/whatMakesUsDifferentPage'
import {navigation} from './singletons/navigation'
import {footerContent} from './singletons/footerContent'
import {schedulePage} from './singletons/schedulePage'

export const schemaTypes = [
  // Singletons
  settings,
  homePage,
  aboutPage,
  servicesPage,
  contactPage,
  teamPage,
  whatMakesUsDifferentPage,
  navigation,
  footerContent,
  schedulePage,
  // Documents
  page,
  post,
  person,
  // Objects
  blockContent,
  infoSection,
  callToAction,
  ctaSection,
  featureItem,
  heroSection,
  serviceItem,
  trustedByLogo,
  link,
]
