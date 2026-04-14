import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { getNavPreviewData } from '@/lib/nav-preview'
import type { Language } from '@/lib/content'
import { getWikiLinks } from '@/lib/wiki-links'
import { getSiteUrl, HERO_IMAGE, SITE_NAME } from '@/lib/site-config'
import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import ClientBody from '../ClientBody'
import Analytics from '@/components/Analytics'
import { SocialBarAd } from '@/components/ads'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

type Props = {
	children: React.ReactNode
	params: Promise<{ locale: string }>
}

// 生成静态参数
export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }))
}

// 生成元数据
export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params
	const siteUrl = getSiteUrl()
	const heroImageUrl = new URL('/images/hero.webp', siteUrl).toString()

	return {
		metadataBase: new URL(siteUrl),
		title: SITE_NAME,
		description:
			'Metro 2039 fan hub for announcement news, trailer coverage, release tracking, lore clues, factions, and official links.',
		keywords: ['Metro 2039', 'trailer', 'release date', 'story', 'factions', 'characters'],
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				'max-video-preview': -1,
				'max-image-preview': 'large',
				'max-snippet': -1,
			},
		},
		openGraph: {
			type: 'website',
			locale: locale,
			url: locale === 'en' ? siteUrl : `${siteUrl}/${locale}`,
			siteName: SITE_NAME,
			title: SITE_NAME,
			description:
				'Metro 2039 fan hub for announcement news, trailer coverage, release tracking, lore clues, factions, and official links.',
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
			title: SITE_NAME,
			description:
				'Metro 2039 fan hub for announcement news, trailer coverage, release tracking, lore clues, factions, and official links.',
			images: [heroImageUrl],
		},
		icons: {
			icon: [
				{ url: '/favicon.ico', sizes: 'any' },
				{ url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
				{ url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
			],
			apple: [
				{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
			],
		},
		manifest: '/manifest.json',
		alternates: buildLanguageAlternates('/', locale as Locale, siteUrl),
	}
}

export default async function LocaleLayout({ children, params }: Props) {
	const { locale } = await params

	// 验证 locale
	if (!routing.locales.includes(locale as Locale)) {
		notFound()
	}

	// 获取翻译消息（不需要 setRequestLocale！）
	const messages = await getMessages()
	const navPreviewData = await getNavPreviewData(locale as Language)
	const wikiLinks = getWikiLinks()

	return (
		<html lang={locale} className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
			<head>
				<meta name="google-adsense-account" content="ca-pub-7733402184034568" />
				<Script
					crossOrigin="anonymous"
					src="https://unpkg.com/same-runtime@0.0.1/dist/index.global.js"
					strategy="beforeInteractive"
				/>
				<Script
					async
					src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7733402184034568"
					crossOrigin="anonymous"
					strategy="lazyOnload"
				/>
			</head>
			<body suppressHydrationWarning className="antialiased">
				<Analytics />
				<NextIntlClientProvider messages={messages}>
					<ClientBody navPreviewData={navPreviewData} wikiLinks={wikiLinks}>{children}</ClientBody>
				</NextIntlClientProvider>
				{/* 社交栏广告 */}
				<SocialBarAd adKey={process.env.NEXT_PUBLIC_AD_SOCIAL_BAR || ''} />
			</body>
		</html>
	)
}
