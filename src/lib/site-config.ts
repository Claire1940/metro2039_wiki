export const SITE_NAME = 'Metro 2039'
export const SITE_DOMAIN = 'metro2039.wiki'
export const DEFAULT_SITE_URL = `https://${SITE_DOMAIN}`

export const HERO_IMAGE = {
  path: '/images/hero.webp',
  width: 1920,
  height: 1080,
  alt: 'Metro 2039 reveal artwork',
}

export const HOME_METADATA = {
  title: 'Metro 2039 - Trailer, Release Date & Story',
  description:
    'Track Metro 2039 news, trailer breakdowns, release updates, story clues, factions, characters, and platform info in one fast, spoiler-aware hub.',
  keywords: [
    'Metro 2039',
    'Metro game',
    'release date',
    'trailer',
    'story',
    'factions',
    'characters',
    'platforms',
  ],
}

export const HOME_VIDEO = {
  id: '2GLi240fXzA',
  title: 'Xbox First Look: METRO 2039 | 4A Games + Deep Silver',
}

export const OFFICIAL_LINKS = {
  officialSite: 'https://www.deepsilver.com/games/metro2039',
  developer: 'https://www.4a-games.com.mt/',
  discord: 'https://discord.com/invite/metrovideogame',
  reddit: 'https://www.reddit.com/r/metro/',
  youtube: 'https://www.youtube.com/metrovideogame',
  trailer: 'https://www.youtube.com/watch?v=2GLi240fXzA',
  teaser: 'https://www.youtube.com/watch?v=4VBIDuqjQic',
} as const

export const LEGAL_EMAILS = {
  contact: `contact@${SITE_DOMAIN}`,
  privacy: `privacy@${SITE_DOMAIN}`,
  legal: `legal@${SITE_DOMAIN}`,
  copyright: `copyright@${SITE_DOMAIN}`,
  dmca: `dmca@${SITE_DOMAIN}`,
}

export const LEGAL_LAST_UPDATED = 'April 14, 2026'

export const HOME_EXTERNAL_LINKS = {
  heroPrimary: OFFICIAL_LINKS.trailer,
  heroSecondary: OFFICIAL_LINKS.officialSite,
  ctaCommunity: OFFICIAL_LINKS.discord,
  ctaGame: OFFICIAL_LINKS.officialSite,
  supportPrimary: OFFICIAL_LINKS.discord,
  supportSecondary: OFFICIAL_LINKS.officialSite,
  footer: {
    discord: OFFICIAL_LINKS.discord,
    officialSite: OFFICIAL_LINKS.officialSite,
    reddit: OFFICIAL_LINKS.reddit,
    youtube: OFFICIAL_LINKS.youtube,
  },
} as const

export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, '')
}

export function getHeroImageUrl(siteUrl = getSiteUrl()) {
  return `${siteUrl}${HERO_IMAGE.path}`
}

export function getLocalizedUrl(locale: string, path = '', siteUrl = getSiteUrl()) {
  const normalizedPath = path
    ? path.startsWith('/')
      ? path
      : `/${path}`
    : ''

  if (locale === 'en') {
    return `${siteUrl}${normalizedPath}`
  }

  return `${siteUrl}/${locale}${normalizedPath}`
}

export function toAbsoluteUrl(value: string, siteUrl = getSiteUrl()) {
  if (/^https?:\/\//i.test(value)) {
    return value
  }

  return `${siteUrl}${value.startsWith('/') ? value : `/${value}`}`
}

export function rewriteLegacyThemeText(value?: string | null) {
  return value ? value.trim() : ''
}

export function getContentMetaTitle(title: string) {
  const sanitizedTitle = rewriteLegacyThemeText(title).trim()
  return sanitizedTitle.includes(SITE_NAME) ? sanitizedTitle : `${sanitizedTitle} - ${SITE_NAME}`
}

export function getContentMetaDescription(title: string, contentType: string) {
  const readableType = contentType.replace(/-/g, ' ')
  const sanitizedTitle = rewriteLegacyThemeText(title).trim()
  return `Read ${sanitizedTitle} and explore more Metro 2039 ${readableType} coverage, official links, release tracking, and story analysis.`
}
