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
  SITE_NAME,
} from '@/lib/site-config'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = getSiteUrl()
  const path = '/privacy-policy'
  const heroImageUrl = getHeroImageUrl(siteUrl)

  return {
    title: `Privacy Policy - ${SITE_NAME}`,
    description:
      'Privacy Policy for Metro 2039. Learn what limited analytics and preference data this unofficial fan site may process.',
    keywords: ['privacy policy', 'Metro 2039 privacy', 'cookies', 'analytics'],
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
      title: `Privacy Policy - ${SITE_NAME}`,
      description:
        'Read how the Metro 2039 fan site handles analytics, cookies, and contact requests.',
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
      title: `Privacy Policy - ${SITE_NAME}`,
      description:
        'Read how the Metro 2039 fan site handles analytics, cookies, and contact requests.',
      images: [heroImageUrl],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative border-b border-border px-4 py-20">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">Privacy Policy</h1>
          <p className="mb-2 text-lg text-slate-300">
            How this unofficial Metro 2039 fan site handles analytics, cookies, and contact data.
          </p>
          <p className="text-sm text-slate-400">Last Updated: {LEGAL_LAST_UPDATED}</p>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>1. Scope</h2>
            <p>
              This Privacy Policy explains how the unofficial {SITE_NAME} fan site may collect,
              store, and use limited information when you browse the website, switch languages,
              or contact us.
            </p>

            <h2>2. Information We May Process</h2>
            <ul>
              <li>Basic analytics such as page views, referrers, browser type, and device category.</li>
              <li>Preference data such as your selected language or theme stored in your browser.</li>
              <li>Information you voluntarily send to us by email.</li>
            </ul>

            <h2>3. How We Use That Information</h2>
            <ul>
              <li>To keep the website working, fast, and readable across devices.</li>
              <li>To understand which Metro 2039 pages are useful so we can improve coverage.</li>
              <li>To answer direct questions, legal requests, or correction requests sent by email.</li>
            </ul>

            <h2>4. Cookies and Analytics</h2>
            <p>
              We may use privacy-respecting analytics and standard browser storage to remember
              preferences and measure aggregate traffic. You can clear cookies or local storage in
              your browser at any time.
            </p>

            <h2>5. Third-Party Links</h2>
            <p>
              This site links to third-party services such as Deep Silver, 4A Games, Discord,
              Reddit, and YouTube. Those services have their own privacy practices, and we do not
              control how they handle your information once you leave this website.
            </p>

            <h2>6. Retention and Security</h2>
            <p>
              We keep access logs, analytics summaries, or email correspondence only for as long as
              needed to operate the site, investigate abuse, or respond to requests. No website can
              promise perfect security, but we use reasonable safeguards for the limited data we
              process.
            </p>

            <h2>7. Children&apos;s Privacy</h2>
            <p>
              This fan site is intended for a general audience and is not directed to children under
              13. If you believe a child has sent us personal information, contact us and we will
              review the request promptly.
            </p>

            <h2>8. Your Choices</h2>
            <ul>
              <li>You can block cookies or clear local storage in your browser settings.</li>
              <li>You can stop using the site at any time.</li>
              <li>You can request deletion of information you directly emailed to us.</li>
            </ul>

            <h2>9. Contact</h2>
            <p>
              Privacy questions or requests can be sent to{' '}
              <a
                href={`mailto:${LEGAL_EMAILS.privacy}`}
                className="text-[hsl(var(--nav-theme-light))] hover:underline"
              >
                {LEGAL_EMAILS.privacy}
              </a>
              .
            </p>

            <h2>10. Unofficial Fan-Site Notice</h2>
            <p>
              {SITE_NAME} is covered here by an unofficial fan-made resource site. This website is
              not affiliated with, endorsed by, or operated by Deep Silver, 4A Games, or any rights
              holder.
            </p>

            <div className="mt-10 rounded-xl border border-border bg-white/5 p-6">
              <p className="mb-3 text-sm text-muted-foreground">
                Need the rest of the legal pages?
              </p>
              <Link
                href="/terms-of-service"
                className="text-sm font-medium text-[hsl(var(--nav-theme-light))] hover:underline"
              >
                Read the Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
