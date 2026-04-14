import type { Metadata } from 'next'
import { getLatestArticles } from '@/lib/getLatestArticles'
import type { Language } from '@/lib/content'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { type Locale } from '@/i18n/routing'
import {
  getLocalizedUrl,
  getSiteUrl,
  HERO_IMAGE,
  HOME_METADATA,
  SITE_NAME,
} from '@/lib/site-config'
import HomePageClient from './HomePageClient'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = getSiteUrl()
  const heroImageUrl = new URL('/images/hero.webp', siteUrl).toString()
  const pageUrl = getLocalizedUrl(locale, '', siteUrl)

  return {
    title: HOME_METADATA.title,
    description: HOME_METADATA.description,
    keywords: HOME_METADATA.keywords,
    alternates: buildLanguageAlternates('/', locale as Locale, siteUrl),
    openGraph: {
      type: 'website',
      url: pageUrl,
      siteName: SITE_NAME,
      title: HOME_METADATA.title,
      description: HOME_METADATA.description,
      images: [
        {
          url: heroImageUrl,
          width: HERO_IMAGE.width,
          height: HERO_IMAGE.height,
          alt: HERO_IMAGE.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: HOME_METADATA.title,
      description: HOME_METADATA.description,
      images: [heroImageUrl],
    },
  }
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params
  const siteUrl = getSiteUrl()
  const heroImageUrl = new URL('/images/hero.webp', siteUrl).toString()
  const pageUrl = getLocalizedUrl(locale, '', siteUrl)
  const homepageVideoId = '2GLi240fXzA'
  const homepageVideo = {
    id: homepageVideoId,
    videoId: homepageVideoId,
    title: 'Xbox First Look: METRO 2039 | 4A Games + Deep Silver',
  }
  const externalLinks = {
    heroPrimary: 'https://www.youtube.com/watch?v=2GLi240fXzA',
    heroSecondary: 'https://www.deepsilver.com/games/metro2039',
    ctaCommunity: 'https://discord.com/invite/metrovideogame',
    ctaGame: 'https://www.deepsilver.com/games/metro2039',
    supportPrimary: 'https://discord.com/invite/metrovideogame',
    supportSecondary: 'https://www.deepsilver.com/games/metro2039',
    footer: {
      discord: 'https://discord.com/invite/metrovideogame',
      officialSite: 'https://www.deepsilver.com/games/metro2039',
      reddit: 'https://www.reddit.com/r/metro/',
      youtube: 'https://www.youtube.com/metrovideogame',
    },
  }
  const homepageDesignTokens = {
    iconLibrary: 'lucide-react',
    accentColor: 'hsl(var(--nav-theme))',
  }
  const structuredData = {
    "@context": 'https://schema.org',
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": siteUrl,
        "name": SITE_NAME,
        "description": HOME_METADATA.description,
        "image": {
          "@type": "ImageObject",
          "url": heroImageUrl,
          "width": HERO_IMAGE.width,
          "height": HERO_IMAGE.height,
          "caption": HERO_IMAGE.alt,
        },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        "url": pageUrl,
        "name": HOME_METADATA.title,
        "description": HOME_METADATA.description,
        "isPartOf": {
          "@id": `${siteUrl}/#website`,
        },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": heroImageUrl,
        },
        "inLanguage": locale,
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": SITE_NAME,
        "url": siteUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${siteUrl}/android-chrome-512x512.png`,
          "width": 512,
          "height": 512,
        },
        "image": {
          "@type": "ImageObject",
          "url": heroImageUrl,
          "width": HERO_IMAGE.width,
          "height": HERO_IMAGE.height,
        },
        "sameAs": [
          'https://www.deepsilver.com/games/metro2039',
          'https://www.4a-games.com.mt/',
          'https://discord.com/invite/metrovideogame',
          'https://www.reddit.com/r/metro/',
          'https://www.youtube.com/metrovideogame',
        ],
      },
      {
        "@type": "VideoObject",
        "name": homepageVideo.title,
        "description": 'Official Metro 2039 reveal trailer shown during Xbox First Look.',
        "thumbnailUrl": [heroImageUrl],
        "embedUrl": `https://www.youtube.com/embed/${homepageVideo.videoId}`,
        "contentUrl": `https://www.youtube.com/watch?v=${homepageVideo.videoId}`,
        "uploadDate": '2026-04-16',
      },
    ],
  }

  // 服务器端获取最新文章数据
  const latestArticles = await getLatestArticles(locale as Language, 30)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomePageClient
        latestArticles={latestArticles}
        locale={locale}
        homepageVideo={homepageVideo}
        externalLinks={externalLinks}
        designTokens={homepageDesignTokens}
      />
    </>
  )
}
