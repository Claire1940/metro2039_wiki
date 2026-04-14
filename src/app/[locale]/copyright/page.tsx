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
  const path = '/copyright'
  const heroImageUrl = getHeroImageUrl(siteUrl)

  return {
    title: `Copyright Notice - ${SITE_NAME}`,
    description:
      'Copyright and fair-use notice for the Metro 2039 fan site, including attribution and DMCA contact details.',
    keywords: ['copyright notice', 'Metro 2039 copyright', 'DMCA', 'fair use'],
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
      title: `Copyright Notice - ${SITE_NAME}`,
      description:
        'Read the copyright, trademark, attribution, and DMCA policy for the Metro 2039 fan site.',
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
      title: `Copyright Notice - ${SITE_NAME}`,
      description:
        'Read the copyright, trademark, attribution, and DMCA policy for the Metro 2039 fan site.',
      images: [heroImageUrl],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function Copyright() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative border-b border-border px-4 py-20">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">Copyright Notice</h1>
          <p className="mb-2 text-lg text-slate-300">
            Ownership, trademark, fair-use, and takedown information for this unofficial Metro 2039 fan site.
          </p>
          <p className="text-sm text-slate-400">Last Updated: {LEGAL_LAST_UPDATED}</p>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>1. Site Ownership</h2>
            <p>
              Original site copy, site structure, and fan-created editorial materials are owned by
              this project unless another owner is identified.
            </p>

            <h2>2. Official Game Rights</h2>
            <p>
              Metro 2039, Deep Silver, 4A Games, related logos, trailers, screenshots, and other
              official assets remain the property of their respective rights holders.
            </p>

            <h2>3. Fair Use</h2>
            <p>
              This site uses limited official references for commentary, indexing, news coverage,
              and educational fan documentation. That use is intended to be informational and
              non-commercial.
            </p>

            <h2>4. Attribution Rules</h2>
            <ul>
              <li>You may link to our pages freely.</li>
              <li>Short quotations should include clear attribution and a link back to the source page.</li>
              <li>Do not republish full articles, large image sets, or copied page layouts without permission.</li>
            </ul>

            <h2>5. Trademark Notice</h2>
            <p>
              Any Metro-related names, logos, and marks referenced on this site are used for
              identification only and do not imply endorsement.
            </p>

            <h2>6. DMCA Notices</h2>
            <p>
              If you believe material on this site infringes your copyright, email a notice with
              the claimed work, the infringing URL, your contact information, and a statement of
              good-faith belief to{' '}
              <a
                href={`mailto:${LEGAL_EMAILS.dmca}`}
                className="text-[hsl(var(--nav-theme-light))] hover:underline"
              >
                {LEGAL_EMAILS.dmca}
              </a>
              .
            </p>

            <h2>7. Counter Notices</h2>
            <p>
              If you believe material was removed in error, reply with a counter notice containing
              the required legal statements and contact details.
            </p>

            <h2>8. Unofficial Fan-Site Notice</h2>
            <p>
              This website is an unofficial fan resource and is not affiliated with, endorsed by,
              or operated by Deep Silver, 4A Games, or any official Metro rights holder.
            </p>

            <div className="mt-10 rounded-xl border border-border bg-white/5 p-6">
              <p className="mb-3 text-sm text-muted-foreground">
                Need site background and editorial scope?
              </p>
              <Link
                href="/about"
                className="text-sm font-medium text-[hsl(var(--nav-theme-light))] hover:underline"
              >
                Read the About page
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
