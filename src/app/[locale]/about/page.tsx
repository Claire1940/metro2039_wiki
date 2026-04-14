import { Link } from '@/i18n/navigation'
import type { Metadata } from 'next'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { type Locale } from '@/i18n/routing'
import {
  getHeroImageUrl,
  getSiteUrl,
  HERO_IMAGE,
  LEGAL_EMAILS,
  LEGAL_LAST_UPDATED,
  OFFICIAL_LINKS,
  SITE_NAME,
} from '@/lib/site-config'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = getSiteUrl()
  const path = '/about'
  const heroImageUrl = getHeroImageUrl(siteUrl)

  return {
    title: `About ${SITE_NAME}`,
    description:
      'About the Metro 2039 fan site: editorial scope, source policy, official links, and contact details.',
    keywords: ['about Metro 2039', 'Metro 2039 fan site', 'editorial policy'],
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale,
      url: locale === 'en' ? `${siteUrl}${path}` : `${siteUrl}/${locale}${path}`,
      siteName: SITE_NAME,
      title: `About ${SITE_NAME}`,
      description:
        'Learn what this Metro 2039 fan site covers, how it sources information, and how to contact the editor.',
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
      title: `About ${SITE_NAME}`,
      description:
        'Learn what this Metro 2039 fan site covers, how it sources information, and how to contact the editor.',
      images: [heroImageUrl],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative border-b border-border px-4 py-20">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">About {SITE_NAME}</h1>
          <p className="mb-2 text-lg text-slate-300">
            An unofficial fan-made hub for Metro 2039 trailer coverage, release tracking, story clues, and official links.
          </p>
          <p className="text-sm text-slate-400">Last Updated: {LEGAL_LAST_UPDATED}</p>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>What This Site Covers</h2>
            <p>
              This project focuses on reveal-era Metro 2039 coverage: official announcements,
              trailers, release updates, story clues, factions, characters, books, and community
              resources.
            </p>

            <h2>Editorial Approach</h2>
            <ul>
              <li>We prefer official sources first.</li>
              <li>We separate confirmed information from inference.</li>
              <li>We update pages when official details change.</li>
            </ul>

            <h2>Official Links We Reference</h2>
            <ul>
              <li>
                <a href={OFFICIAL_LINKS.officialSite} target="_blank" rel="noopener noreferrer">
                  Deep Silver official Metro 2039 page
                </a>
              </li>
              <li>
                <a href={OFFICIAL_LINKS.developer} target="_blank" rel="noopener noreferrer">
                  4A Games
                </a>
              </li>
              <li>
                <a href={OFFICIAL_LINKS.discord} target="_blank" rel="noopener noreferrer">
                  Metro Official Community Discord
                </a>
              </li>
              <li>
                <a href={OFFICIAL_LINKS.reddit} target="_blank" rel="noopener noreferrer">
                  r/metro
                </a>
              </li>
              <li>
                <a href={OFFICIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer">
                  metrovideogame YouTube channel
                </a>
              </li>
            </ul>

            <h2>Unofficial Fan-Site Notice</h2>
            <p>
              This website is an unofficial fan resource and is not affiliated with, endorsed by,
              or operated by Deep Silver, 4A Games, or any official Metro rights holder.
            </p>

            <h2>Contact</h2>
            <p>
              General contact:{' '}
              <a
                href={`mailto:${LEGAL_EMAILS.contact}`}
                className="text-[hsl(var(--nav-theme-light))] hover:underline"
              >
                {LEGAL_EMAILS.contact}
              </a>
            </p>
            <p>
              Legal contact:{' '}
              <a
                href={`mailto:${LEGAL_EMAILS.legal}`}
                className="text-[hsl(var(--nav-theme-light))] hover:underline"
              >
                {LEGAL_EMAILS.legal}
              </a>
            </p>

            <div className="mt-10 rounded-xl border border-border bg-white/5 p-6">
              <p className="mb-3 text-sm text-muted-foreground">
                Need copyright or takedown details?
              </p>
              <Link
                href="/copyright"
                className="text-sm font-medium text-[hsl(var(--nav-theme-light))] hover:underline"
              >
                Read the Copyright Notice
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
