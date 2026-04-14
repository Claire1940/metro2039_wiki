import Link from 'next/link'
import type { Metadata } from 'next'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { type Locale } from '@/i18n/routing'
import {
  getHeroImageUrl,
  getSiteUrl,
  HERO_IMAGE,
  LEGAL_EMAILS,
  LEGAL_LAST_UPDATED,
  SITE_NAME,
} from '@/lib/site-config'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = getSiteUrl()
  const path = '/terms-of-service'
  const heroImageUrl = getHeroImageUrl(siteUrl)

  return {
    title: `Terms of Service - ${SITE_NAME}`,
    description:
      'Terms of Service for the Metro 2039 fan site, including acceptable use, disclaimers, and third-party link terms.',
    keywords: ['terms of service', 'Metro 2039 terms', 'legal notice'],
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
      title: `Terms of Service - ${SITE_NAME}`,
      description:
        'Read the acceptable-use rules, disclaimers, and legal terms for using the Metro 2039 fan site.',
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
      title: `Terms of Service - ${SITE_NAME}`,
      description:
        'Read the acceptable-use rules, disclaimers, and legal terms for using the Metro 2039 fan site.',
      images: [heroImageUrl],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative border-b border-border px-4 py-20">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">Terms of Service</h1>
          <p className="mb-2 text-lg text-slate-300">
            Terms and conditions for using this unofficial Metro 2039 fan resource.
          </p>
          <p className="text-sm text-slate-400">Last Updated: {LEGAL_LAST_UPDATED}</p>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>1. Acceptance</h2>
            <p>
              By using this website, you agree to these Terms of Service. If you do not agree, do
              not use the site.
            </p>

            <h2>2. What This Site Provides</h2>
            <p>
              This is an unofficial fan-made Metro 2039 information site covering announcement
              news, trailers, story clues, factions, characters, and official community links.
            </p>

            <h2>3. Acceptable Use</h2>
            <ul>
              <li>Do not misuse the site, attack it, or interfere with normal access.</li>
              <li>Do not scrape or republish large portions of the site for commercial use.</li>
              <li>Do not submit unlawful, infringing, or abusive material by email or other channels.</li>
            </ul>

            <h2>4. Intellectual Property</h2>
            <p>
              Original site copy and site-specific branding belong to this fan project unless stated
              otherwise. Metro 2039, related trademarks, logos, screenshots, and other official
              materials belong to their respective rights holders.
            </p>

            <h2>5. Accuracy and Availability</h2>
            <p>
              We try to keep information accurate, but reveal-era game details can change quickly.
              This site is provided on an &quot;as is&quot; basis, without warranties of availability,
              completeness, or fitness for any specific purpose.
            </p>

            <h2>6. Third-Party Links</h2>
            <p>
              The site links to third-party platforms such as Deep Silver, 4A Games, Discord,
              Reddit, and YouTube. We are not responsible for those sites or their content.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, we are not liable for indirect, incidental,
              or consequential damages arising from your use of the site or reliance on its content.
            </p>

            <h2>8. Changes</h2>
            <p>
              We may revise these terms when the site, policies, or legal requirements change.
              Continued use after updates means you accept the revised terms.
            </p>

            <h2>9. Contact</h2>
            <p>
              Legal questions can be sent to{' '}
              <a
                href={`mailto:${LEGAL_EMAILS.legal}`}
                className="text-[hsl(var(--nav-theme-light))] hover:underline"
              >
                {LEGAL_EMAILS.legal}
              </a>
              .
            </p>

            <h2>10. Unofficial Fan-Site Notice</h2>
            <p>
              This website is an unofficial fan resource and is not affiliated with, endorsed by,
              or operated by Deep Silver, 4A Games, or any official Metro rights holder.
            </p>

            <div className="mt-10 rounded-xl border border-border bg-white/5 p-6">
              <p className="mb-3 text-sm text-muted-foreground">
                Looking for privacy details instead?
              </p>
              <Link
                href="/privacy-policy"
                className="text-sm font-medium text-[hsl(var(--nav-theme-light))] hover:underline"
              >
                Read the Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
