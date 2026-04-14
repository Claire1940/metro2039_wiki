import { getRequestConfig } from 'next-intl/server'
import { routing, type Locale } from './routing'
import deepMerge from 'deepmerge'

// 静态导入所有翻译文件
import enMessages from '@/locales/en.json'
import deMessages from '@/locales/de.json'
import plMessages from '@/locales/pl.json'
import frMessages from '@/locales/fr.json'

function createEmptyLocaleMessages(_messages: Record<string, unknown>) {
	return {}
}

const messages: Record<Locale, any> = {
	en: enMessages,
	de: createEmptyLocaleMessages(deMessages as Record<string, unknown>),
	pl: createEmptyLocaleMessages(plMessages as Record<string, unknown>),
	fr: createEmptyLocaleMessages(frMessages as Record<string, unknown>),
}

export default getRequestConfig(async ({ requestLocale }) => {
	let locale = await requestLocale

	// 使用 routing.locales 动态验证（无需硬编码类型）
	if (!locale || !routing.locales.includes(locale as Locale)) {
		locale = routing.defaultLocale
	}

	const resolvedLocale = locale as Locale

	if (resolvedLocale === 'en') {
		return { locale: resolvedLocale, messages: enMessages }
	}

	// 加载目标语言的翻译，并与英文深度合并（作为 fallback）
	const localeMessages = messages[resolvedLocale] || enMessages
	const mergedMessages = deepMerge(enMessages, localeMessages, {
		// 数组替换而不是合并（避免重复）
		arrayMerge: (_destinationArray, sourceArray) => sourceArray,
	})

	return { locale: resolvedLocale, messages: mergedMessages }
})
