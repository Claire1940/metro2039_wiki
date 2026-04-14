import type { ContentFrontmatter, ContentType } from '@/lib/content'
import {
	getContentMetaDescription,
	getContentMetaTitle,
	getHeroImageUrl,
	getSiteUrl,
	rewriteLegacyThemeText,
	toAbsoluteUrl,
} from '@/lib/site-config'

interface ArticleStructuredDataProps {
	frontmatter: ContentFrontmatter
	contentType: ContentType
	locale: string
	slug: string
}

export function ArticleStructuredData({
	frontmatter,
	contentType,
	locale,
	slug,
}: ArticleStructuredDataProps) {
	const siteUrl = getSiteUrl()
	const articleUrl =
		locale === 'en'
			? `${siteUrl}/${contentType}/${slug}`
			: `${siteUrl}/${locale}/${contentType}/${slug}`
	const articleTitle = getContentMetaTitle(frontmatter.title)
	const articleDescription = getContentMetaDescription(frontmatter.title, contentType)
	const articleImage = frontmatter.image
		? toAbsoluteUrl(frontmatter.image, siteUrl)
		: getHeroImageUrl(siteUrl)

	const breadcrumbData = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				name: 'Home',
				item: siteUrl,
			},
			{
				'@type': 'ListItem',
				position: 2,
				name: contentType.charAt(0).toUpperCase() + contentType.slice(1),
				item: `${siteUrl}/${contentType}`,
			},
			{
				'@type': 'ListItem',
				position: 3,
				name: rewriteLegacyThemeText(frontmatter.title),
				item: articleUrl,
			},
		],
	}

	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: articleTitle,
		description: articleDescription,
		image: articleImage,
		datePublished: frontmatter.date,
		dateModified: ('lastModified' in frontmatter && frontmatter.lastModified) || frontmatter.date,
		author: {
			'@type': 'Organization',
			name: 'Metro 2039 Editorial Team',
		},
		publisher: {
			'@type': 'Organization',
			name: 'Metro 2039',
			logo: {
				'@type': 'ImageObject',
				url: `${siteUrl}/android-chrome-512x512.png`,
			},
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': articleUrl,
		},
		isPartOf: {
			'@type': 'WebSite',
			'@id': `${siteUrl}/#website`,
		},
	}

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
			/>
		</>
	)
}
