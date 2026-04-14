'use client'

import { useEffect, useState, Suspense, lazy } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  ClipboardCheck,
  Clock,
  Eye,
  ExternalLink,
  Gamepad2,
  Hammer,
  MessageCircle,
  Package,
  Settings,
  Sparkles,
  Star,
  TrendingUp,
} from 'lucide-react'
import Link from 'next/link'
import { useMessages } from 'next-intl'
import { VideoFeature } from '@/components/home/VideoFeature'
import { LatestGuidesAccordion } from '@/components/home/LatestGuidesAccordion'
import { NativeBannerAd, AdBanner } from '@/components/ads'
import { SidebarAd } from '@/components/ads/SidebarAd'
import { scrollToSection } from '@/lib/scrollToSection'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import type { ContentItemWithType } from '@/lib/getLatestArticles'

// Lazy load heavy components
const HeroStats = lazy(() => import('@/components/home/HeroStats'))
const FAQSection = lazy(() => import('@/components/home/FAQSection'))
const CTASection = lazy(() => import('@/components/home/CTASection'))

// Loading placeholder
const LoadingPlaceholder = ({ height = 'h-64' }: { height?: string }) => (
  <div className={`${height} bg-white/5 border border-border rounded-xl animate-pulse`} />
)

interface HomePageClientProps {
  latestArticles: ContentItemWithType[]
  locale: string
  homepageVideo: {
    id: string
    videoId: string
    title: string
  }
  externalLinks: {
    heroPrimary: string
    heroSecondary: string
    ctaCommunity: string
    ctaGame: string
    supportPrimary: string
    supportSecondary: string
    footer: {
      discord: string
      officialSite: string
      reddit: string
      youtube: string
    }
  }
  designTokens: {
    iconLibrary: string
    accentColor: string
  }
}

export default function HomePageClient({
  latestArticles,
  locale,
  homepageVideo,
  externalLinks,
  designTokens,
}: HomePageClientProps) {
  const t = useMessages() as any
  const sectionIds = [
    'release-date',
    'trailer',
    'story',
    'gameplay',
    'news',
    'livestream',
    'platforms',
    'characters',
    'story-recap',
    'series-timeline',
    'game-order',
    'books-order',
    'factions',
    'setting-explained',
    'endings-explained',
    'developer-explained',
  ]

  // Accordion and deck states
  const [storyRecapExpanded, setStoryRecapExpanded] = useState(0)
  const [deckExpanded, setDeckExpanded] = useState<number | null>(null)
  const newsModule = t.modules.lucidBlocksQualiaAndBaseBuilding
  const livestreamModule = t.modules.lucidBlocksWorldRegions
  const platformsModule = t.modules.lucidBlocksCreaturesAndEnemies
  const charactersModule = t.modules.lucidBlocksMobilityGear
  const storyRecapModule = t.modules.lucidBlocksFarmingAndGrowth
  const timelineModule = t.modules.lucidBlocksBestEarlyUnlocks
  const gameOrderModule = t.modules.lucidBlocksAchievementTracker
  const booksOrderModule = t.modules.lucidBlocksSingleplayerAndPlatformFAQ
  const activeStoryRecapItem = storyRecapModule.items?.[storyRecapExpanded] ?? storyRecapModule.items?.[0]

  // Scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-reveal-visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      data-icon-library={designTokens.iconLibrary}
      data-accent-token={designTokens.accentColor}
    >
      {/* 左侧广告容器 - Fixed 定位 */}
      <aside
        className="hidden xl:block fixed top-20 w-40 z-10"
        style={{ left: 'calc((100vw - 896px) / 2 - 180px)' }}
      >
        <SidebarAd type="sidebar-160x300" adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X300} />
      </aside>

      {/* 右侧广告容器 - Fixed 定位 */}
      <aside
        className="hidden xl:block fixed top-20 w-40 z-10"
        style={{ right: 'calc((100vw - 896px) / 2 - 180px)' }}
      >
        <SidebarAd type="sidebar-160x600" adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X600} />
      </aside>

      {/* 广告位 1: 移动端横幅 Sticky */}
      {/* <div className="sticky top-20 z-20 border-b border-border py-2">
        <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />
      </div> */}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 scroll-reveal">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                            bg-[hsl(var(--nav-theme)/0.1)]
                            border border-[hsl(var(--nav-theme)/0.3)] mb-6">
              <Sparkles className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-sm font-medium">{t.hero.badge}</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {t.hero.title}
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              {t.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a
                href={externalLinks.heroPrimary}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4
                           bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)]
                           text-white rounded-lg font-semibold text-lg transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                {t.hero.getFreeCodesCTA}
              </a>
              <a
                href={externalLinks.heroSecondary}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4
                           border border-border hover:bg-white/10 rounded-lg
                           font-semibold text-lg transition-colors"
              >
                {t.hero.playOnSteamCTA}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      {/* 广告位 2: 原生横幅 */}
      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ''} />

      {/* Video Section */}
      <section className="px-4 py-12">
        <div className="scroll-reveal container mx-auto max-w-4xl">
          <div className="relative rounded-2xl overflow-hidden">
            <VideoFeature
              videoId={homepageVideo.id}
              title={homepageVideo.title}
              posterImage="/images/hero.webp"
            />
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <LatestGuidesAccordion articles={latestArticles} locale={locale} max={30} />

      {/* 广告位 3: 标准横幅 728×90 */}
      <AdBanner type="banner-728x90" adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90} />

      {/* Tools Grid - 16 Navigation Cards */}
      <section className="px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.tools.title}{' '}
              <span className="text-[hsl(var(--nav-theme-light))]">
                {t.tools.titleHighlight}
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              {t.tools.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {t.tools.cards.map((card: any, index: number) => {
              const sectionId = sectionIds[index]

              return (
                <a
                  key={index}
                  href={`#${sectionId}`}
                  onClick={(event) => {
                    event.preventDefault()
                    scrollToSection(sectionId)
                  }}
                  className="scroll-reveal group p-6 rounded-xl border border-border
                             bg-card hover:border-[hsl(var(--nav-theme)/0.5)]
                             transition-all duration-300 cursor-pointer text-left
                             hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)] block"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="w-12 h-12 rounded-lg mb-4
                                  bg-[hsl(var(--nav-theme)/0.1)]
                                  flex items-center justify-center
                                  group-hover:bg-[hsl(var(--nav-theme)/0.2)]
                                  transition-colors">
                    <DynamicIcon
                      name={card.icon}
                      className="w-6 h-6 text-[hsl(var(--nav-theme-light))]"
                    />
                  </div>
                  <h3 className="font-semibold mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">{card.description}</p>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* 广告位 4: 方形广告 300×250 */}
      <AdBanner type="banner-300x250" adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250} />

      {/* Module 1: Release Date */}
      <section id="release-date" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.lucidBlocksBeginnerGuide.title}</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.lucidBlocksBeginnerGuide.intro}
            </p>
          </div>

          {/* Steps */}
          <div className="scroll-reveal space-y-4 mb-10">
            {t.modules.lucidBlocksBeginnerGuide.steps.map((step: any, index: number) => (
              <div key={index} className="flex gap-4 p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[hsl(var(--nav-theme)/0.2)] border-2 border-[hsl(var(--nav-theme)/0.5)] flex items-center justify-center">
                  <span className="text-xl font-bold text-[hsl(var(--nav-theme-light))]">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Tips */}
          <div className="scroll-reveal p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
              <h3 className="font-bold text-lg">{t.modules.lucidBlocksBeginnerGuide.quickTipsHeading}</h3>
            </div>
            <ul className="space-y-2">
              {t.modules.lucidBlocksBeginnerGuide.quickTips.map((tip: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 广告位 5: 中型横幅 468×60 */}
      <AdBanner type="banner-468x60" adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60} />

      {/* Module 2: Trailer */}
      <section id="trailer" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.lucidBlocksApotheosisCrafting.title}</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.lucidBlocksApotheosisCrafting.intro}</p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {t.modules.lucidBlocksApotheosisCrafting.cards.map((card: any, index: number) => (
              <div key={index} className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <h3 className="font-bold text-lg mb-2 text-[hsl(var(--nav-theme-light))]">{card.name}</h3>
                <p className="text-muted-foreground text-sm">{card.description}</p>
              </div>
            ))}
          </div>
          <div className="scroll-reveal flex flex-wrap gap-3 justify-center">
            {t.modules.lucidBlocksApotheosisCrafting.milestones.map((m: string, i: number) => (
              <span key={i} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-sm">
                <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />{m}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Module 3: Story */}
      <section id="story" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.lucidBlocksToolsAndWeapons.title}</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.lucidBlocksToolsAndWeapons.intro}</p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.modules.lucidBlocksToolsAndWeapons.items.map((item: any, index: number) => (
              <div key={index} className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <Hammer className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                  <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">{item.type}</span>
                </div>
                <h3 className="font-bold mb-2">{item.name}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 4: Gameplay */}
      <section id="gameplay" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.lucidBlocksStorageAndInventory.title}</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.lucidBlocksStorageAndInventory.intro}</p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {t.modules.lucidBlocksStorageAndInventory.solutions.map((s: any, index: number) => (
              <div key={index} className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="font-bold">{s.name}</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">{s.role}</span>
                </div>
                <p className="text-muted-foreground text-sm">{s.description}</p>
              </div>
            ))}
          </div>
          <div className="scroll-reveal p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
              <h3 className="font-bold">{t.modules.lucidBlocksStorageAndInventory.managementTipsHeading}</h3>
            </div>
            <ul className="space-y-2">
              {t.modules.lucidBlocksStorageAndInventory.managementTips.map((tip: string, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Module 5: News */}
      <section id="news" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] mb-6">
              <TrendingUp className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-sm font-medium">{newsModule.eyebrow}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{newsModule.title}</h2>
            <p className="text-lg md:text-xl text-[hsl(var(--nav-theme-light))] max-w-3xl mx-auto mb-4">
              {newsModule.subtitle}
            </p>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.lucidBlocksQualiaAndBaseBuilding.intro}</p>
          </div>
          <div className="scroll-reveal flex items-center gap-2 mb-6 text-sm uppercase tracking-[0.18em] text-[hsl(var(--nav-theme-light))]">
            <Clock className="w-4 h-4" />
            <span>{newsModule.timelineLabel}</span>
          </div>
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4">
            {newsModule.items.map((item: any, index: number) => (
              <article
                key={index}
                className={`group rounded-2xl border border-border p-6 transition-all duration-300 hover:border-[hsl(var(--nav-theme)/0.5)] hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.08)] ${
                  index === 0 ? 'md:col-span-2 bg-[hsl(var(--nav-theme)/0.08)]' : 'bg-white/5'
                }`}
              >
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="inline-flex items-center rounded-full border border-[hsl(var(--nav-theme)/0.3)] bg-[hsl(var(--nav-theme)/0.1)] px-3 py-1 text-xs font-medium text-[hsl(var(--nav-theme-light))]">
                    {item.date}
                  </span>
                  <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {item.source}
                  </span>
                </div>
                <h3 className={`font-bold mb-3 ${index === 0 ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
                  {item.headline}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground">{item.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Module 6: Livestream */}
      <section id="livestream" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] mb-6">
              <MessageCircle className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-sm font-medium">{livestreamModule.eyebrow}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{livestreamModule.title}</h2>
            <p className="text-lg md:text-xl text-[hsl(var(--nav-theme-light))] max-w-4xl mx-auto mb-4">
              {livestreamModule.subtitle}
            </p>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{livestreamModule.intro}</p>
          </div>
          <div className="scroll-reveal space-y-4">
            {livestreamModule.steps.map((step: any, index: number) => (
              <article
                key={index}
                className="flex gap-4 rounded-2xl border border-border bg-white/5 p-6 transition-colors hover:border-[hsl(var(--nav-theme)/0.5)]"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.45)] bg-[hsl(var(--nav-theme)/0.18)]">
                  <span className="text-lg font-bold text-[hsl(var(--nav-theme-light))]">
                    {step.step}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Metro 2039 Watch Step</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Module 7: Platforms */}
      <section id="platforms" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] mb-6">
              <Gamepad2 className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-sm font-medium">{platformsModule.eyebrow}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{platformsModule.title}</h2>
            <p className="text-lg md:text-xl text-[hsl(var(--nav-theme-light))] max-w-4xl mx-auto mb-4">
              {platformsModule.subtitle}
            </p>
            <p className="text-muted-foreground text-lg max-w-4xl mx-auto">{platformsModule.intro}</p>
          </div>
          <div className="scroll-reveal md:hidden space-y-4">
            {platformsModule.rows.map((row: any, index: number) => (
              <article
                key={index}
                className="rounded-2xl border border-border bg-white/5 p-6 transition-colors hover:border-[hsl(var(--nav-theme)/0.5)]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Gamepad2 className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                  <h3 className="text-xl font-bold">{row.platform}</h3>
                </div>
                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {platformsModule.columns.currentStatus}
                    </dt>
                    <dd className="mt-1 text-foreground">{row.currentStatus}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {platformsModule.columns.publicStorefront}
                    </dt>
                    <dd className="mt-1 text-muted-foreground">{row.publicStorefront}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {platformsModule.columns.editionStatus}
                    </dt>
                    <dd className="mt-1 text-muted-foreground">{row.editionStatus}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {platformsModule.columns.notes}
                    </dt>
                    <dd className="mt-1 text-muted-foreground">{row.notes}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
          <div className="hidden md:block scroll-reveal overflow-hidden rounded-2xl border border-border bg-card/70">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[980px] text-left">
                <thead className="bg-[hsl(var(--nav-theme)/0.08)]">
                  <tr>
                    <th className="px-5 py-4 text-xs uppercase tracking-[0.18em] text-[hsl(var(--nav-theme-light))]">
                      {platformsModule.columns.platform}
                    </th>
                    <th className="px-5 py-4 text-xs uppercase tracking-[0.18em] text-[hsl(var(--nav-theme-light))]">
                      {platformsModule.columns.currentStatus}
                    </th>
                    <th className="px-5 py-4 text-xs uppercase tracking-[0.18em] text-[hsl(var(--nav-theme-light))]">
                      {platformsModule.columns.publicStorefront}
                    </th>
                    <th className="px-5 py-4 text-xs uppercase tracking-[0.18em] text-[hsl(var(--nav-theme-light))]">
                      {platformsModule.columns.editionStatus}
                    </th>
                    <th className="px-5 py-4 text-xs uppercase tracking-[0.18em] text-[hsl(var(--nav-theme-light))]">
                      {platformsModule.columns.notes}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {platformsModule.rows.map((row: any, index: number) => (
                    <tr
                      key={index}
                      className={`border-t border-border align-top ${
                        index % 2 === 0 ? 'bg-white/[0.02]' : 'bg-transparent'
                      }`}
                    >
                      <td className="px-5 py-5 font-semibold text-[hsl(var(--nav-theme-light))]">
                        {row.platform}
                      </td>
                      <td className="px-5 py-5 text-sm text-foreground">{row.currentStatus}</td>
                      <td className="px-5 py-5 text-sm text-muted-foreground">{row.publicStorefront}</td>
                      <td className="px-5 py-5 text-sm text-muted-foreground">{row.editionStatus}</td>
                      <td className="px-5 py-5 text-sm text-muted-foreground">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Module 8: Characters */}
      <section id="characters" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] mb-6">
              <ArrowRight className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-sm font-medium">{charactersModule.eyebrow}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{charactersModule.title}</h2>
            <p className="text-lg md:text-xl text-[hsl(var(--nav-theme-light))] max-w-4xl mx-auto mb-4">
              {charactersModule.subtitle}
            </p>
            <p className="text-muted-foreground text-lg max-w-4xl mx-auto">{charactersModule.intro}</p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {charactersModule.items.map((item: any, index: number) => (
              <article
                key={index}
                className={`rounded-2xl border border-border p-6 transition-colors hover:border-[hsl(var(--nav-theme)/0.5)] ${
                  index === 0 ? 'bg-[hsl(var(--nav-theme)/0.08)]' : 'bg-white/5'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {item.role}
                    </p>
                    <h3 className="text-xl font-bold mt-2">{item.name}</h3>
                  </div>
                  <span className="inline-flex rounded-full border border-[hsl(var(--nav-theme)/0.3)] bg-[hsl(var(--nav-theme)/0.12)] px-3 py-1 text-xs font-medium text-[hsl(var(--nav-theme-light))]">
                    {item.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{item.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 广告位 6: 移动端横幅 320×50 */}
      <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />

      {/* Module 9: Story Recap */}
      <section id="story-recap" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] mb-6">
              <ClipboardCheck className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-sm font-medium">{storyRecapModule.eyebrow}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{storyRecapModule.title}</h2>
            <p className="text-lg md:text-xl text-[hsl(var(--nav-theme-light))] max-w-4xl mx-auto mb-4">
              {storyRecapModule.subtitle}
            </p>
            <p className="text-muted-foreground text-lg max-w-4xl mx-auto">{storyRecapModule.intro}</p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)] gap-5">
            <div className="space-y-3">
              {storyRecapModule.items.map((item: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setStoryRecapExpanded(index)}
                  className={`w-full rounded-2xl border p-5 text-left transition-colors ${
                    storyRecapExpanded === index
                      ? 'border-[hsl(var(--nav-theme)/0.45)] bg-[hsl(var(--nav-theme)/0.1)]'
                      : 'border-border bg-white/5 hover:border-[hsl(var(--nav-theme)/0.35)]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-lg font-bold">{item.title}</h3>
                      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground mt-1">
                        {item.meta}
                      </p>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        storyRecapExpanded === index
                          ? 'rotate-180 text-[hsl(var(--nav-theme-light))]'
                          : 'text-muted-foreground'
                      }`}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">{item.summary}</p>
                </button>
              ))}
            </div>

            {activeStoryRecapItem && (
              <article className="rounded-2xl border border-[hsl(var(--nav-theme)/0.35)] bg-[hsl(var(--nav-theme)/0.06)] p-6 md:p-7">
                <p className="text-xs uppercase tracking-[0.18em] text-[hsl(var(--nav-theme-light))] mb-2">
                  {activeStoryRecapItem.meta}
                </p>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">{activeStoryRecapItem.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground mb-6">
                  {activeStoryRecapItem.summary}
                </p>

                <div className="rounded-xl border border-[hsl(var(--nav-theme)/0.3)] bg-white/5 p-5 mb-5">
                  <h4 className="font-semibold text-[hsl(var(--nav-theme-light))] mb-3">
                    Metro 2039 Key Points
                  </h4>
                  <ul className="space-y-2">
                    {activeStoryRecapItem.keyPoints.map((point: string, pointIndex: number) => (
                      <li key={pointIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-[hsl(var(--nav-theme-light))]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-sm md:text-base text-muted-foreground">{activeStoryRecapItem.bridge}</p>
              </article>
            )}
          </div>
        </div>
      </section>

      {/* Module 10: Series Timeline */}
      <section id="series-timeline" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] mb-6">
              <Eye className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-sm font-medium">{timelineModule.eyebrow}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{timelineModule.title}</h2>
            <p className="text-lg md:text-xl text-[hsl(var(--nav-theme-light))] max-w-4xl mx-auto mb-4">
              {timelineModule.subtitle}
            </p>
            <p className="text-muted-foreground text-lg max-w-4xl mx-auto">{timelineModule.intro}</p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {timelineModule.items.map((item: any, index: number) => (
              <article
                key={index}
                className="rounded-2xl border border-border bg-white/5 p-6 transition-colors hover:border-[hsl(var(--nav-theme)/0.45)]"
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="inline-flex items-center rounded-full border border-[hsl(var(--nav-theme)/0.35)] bg-[hsl(var(--nav-theme)/0.1)] px-3 py-1 text-sm font-semibold text-[hsl(var(--nav-theme-light))]">
                    {item.year}
                  </span>
                  <span className="inline-flex items-center rounded-full border border-[hsl(var(--nav-theme)/0.28)] bg-[hsl(var(--nav-theme)/0.08)] px-3 py-1 text-xs uppercase tracking-[0.13em] text-muted-foreground">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Module 11: Game Order */}
      <section id="game-order" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] mb-6">
              <Star className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-sm font-medium">{gameOrderModule.eyebrow}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{gameOrderModule.title}</h2>
            <p className="text-lg md:text-xl text-[hsl(var(--nav-theme-light))] max-w-4xl mx-auto mb-4">
              {gameOrderModule.subtitle}
            </p>
            <p className="text-muted-foreground text-lg max-w-4xl mx-auto">{gameOrderModule.intro}</p>
          </div>
          <div className="scroll-reveal space-y-6">
            {gameOrderModule.items.map((item: any, index: number) => (
              <article
                key={index}
                className="rounded-2xl border border-border bg-white/5 p-6 transition-colors hover:border-[hsl(var(--nav-theme)/0.45)]"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-5">
                  <div className="w-12 h-12 rounded-full border-2 border-[hsl(var(--nav-theme)/0.5)] bg-[hsl(var(--nav-theme)/0.2)] flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-[hsl(var(--nav-theme-light))]">{item.step}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <span className="inline-flex rounded-full border border-[hsl(var(--nav-theme)/0.3)] bg-[hsl(var(--nav-theme)/0.12)] px-3 py-1 text-xs font-medium text-[hsl(var(--nav-theme-light))]">
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{item.description}</p>
                    <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                      {item.details.map((detail: string, detailIndex: number) => (
                        <li
                          key={detailIndex}
                          className="flex items-start gap-2 rounded-lg border border-[hsl(var(--nav-theme)/0.22)] bg-[hsl(var(--nav-theme)/0.06)] px-3 py-2 text-sm text-muted-foreground"
                        >
                          <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-[hsl(var(--nav-theme-light))]" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Module 12: Books Order */}
      <section id="books-order" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] mb-6">
              <Package className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-sm font-medium">{booksOrderModule.eyebrow}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{booksOrderModule.title}</h2>
            <p className="text-lg md:text-xl text-[hsl(var(--nav-theme-light))] max-w-4xl mx-auto mb-4">
              {booksOrderModule.subtitle}
            </p>
            <p className="text-muted-foreground text-lg max-w-4xl mx-auto">{booksOrderModule.intro}</p>
          </div>
          <div className="scroll-reveal space-y-5">
            {booksOrderModule.items.map((item: any, index: number) => (
              <article
                key={index}
                className="rounded-2xl border border-border bg-white/5 p-6 transition-colors hover:border-[hsl(var(--nav-theme)/0.45)]"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-5">
                  <div className="w-12 h-12 rounded-full border-2 border-[hsl(var(--nav-theme)/0.5)] bg-[hsl(var(--nav-theme)/0.2)] flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-[hsl(var(--nav-theme-light))]">{item.step}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <span className="inline-flex rounded-full border border-[hsl(var(--nav-theme)/0.3)] bg-[hsl(var(--nav-theme)/0.12)] px-3 py-1 text-xs font-medium text-[hsl(var(--nav-theme-light))]">
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{item.description}</p>
                    <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                      {item.details.map((detail: string, detailIndex: number) => (
                        <li key={detailIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-[hsl(var(--nav-theme-light))]" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Module 13: Factions */}
      <section id="factions" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Gamepad2 className="w-8 h-8 text-[hsl(var(--nav-theme-light))]" />
              <h2 className="text-4xl md:text-5xl font-bold">{t.modules.lucidBlocksSteamDeckAndController.title}</h2>
            </div>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.lucidBlocksSteamDeckAndController.intro}</p>
          </div>
          <div className="scroll-reveal space-y-2">
            {t.modules.lucidBlocksSteamDeckAndController.faqs.map((faq: any, index: number) => (
              <div key={index} className="border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setDeckExpanded(deckExpanded === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-semibold">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${deckExpanded === index ? "rotate-180" : ""}`} />
                </button>
                {deckExpanded === index && (
                  <div className="px-5 pb-5 text-muted-foreground text-sm">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 14: Setting Explained */}
      <section id="setting-explained" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.lucidBlocksSettingsAndAccessibility.title}</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.lucidBlocksSettingsAndAccessibility.intro}</p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.lucidBlocksSettingsAndAccessibility.settings.map((s: any, index: number) => (
              <div key={index} className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <Settings className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                  <h3 className="font-bold">{s.name}</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">{s.type}</span>
                </div>
                <p className="text-muted-foreground text-sm">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 15: Endings Explained */}
      <section id="endings-explained" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.lucidBlocksUpdatesAndPatchNotes.title}</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.lucidBlocksUpdatesAndPatchNotes.intro}</p>
          </div>
          <div className="scroll-reveal relative pl-6 border-l-2 border-[hsl(var(--nav-theme)/0.3)] space-y-8">
            {t.modules.lucidBlocksUpdatesAndPatchNotes.entries.map((entry: any, index: number) => (
              <div key={index} className="relative">
                <div className="absolute -left-[1.4rem] w-4 h-4 rounded-full bg-[hsl(var(--nav-theme))] border-2 border-background" />
                <div className="p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">{entry.type}</span>
                    <Clock className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <h3 className="font-bold mb-1">{entry.title}</h3>
                  <p className="text-muted-foreground text-sm">{entry.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 16: Developer Explained */}
      <section id="developer-explained" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.lucidBlocksCrashFixAndTroubleshooting.title}</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.lucidBlocksCrashFixAndTroubleshooting.intro}</p>
          </div>
          <div className="scroll-reveal space-y-4 mb-8">
            {t.modules.lucidBlocksCrashFixAndTroubleshooting.steps.map((step: any, index: number) => (
              <div key={index} className="flex gap-4 p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[hsl(var(--nav-theme)/0.2)] border-2 border-[hsl(var(--nav-theme)/0.5)] flex items-center justify-center">
                  <span className="text-xl font-bold text-[hsl(var(--nav-theme-light))]">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="scroll-reveal p-6 bg-[hsl(var(--nav-theme)/0.08)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-[hsl(var(--nav-theme-light))] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-[hsl(var(--nav-theme-light))] mb-2">
                  {t.modules.lucidBlocksCrashFixAndTroubleshooting.supportTitle}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {t.modules.lucidBlocksCrashFixAndTroubleshooting.supportDescription}
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={externalLinks.supportPrimary}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-sm hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                    <MessageCircle className="w-4 h-4" /> {t.modules.lucidBlocksCrashFixAndTroubleshooting.supportPrimaryLabel} <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={externalLinks.supportSecondary}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-sm hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                    {t.modules.lucidBlocksCrashFixAndTroubleshooting.supportSecondaryLabel} <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      {/* CTA Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
          communityHref={externalLinks.ctaCommunity}
          gameHref={externalLinks.ctaGame}
        />
      </Suspense>

      {/* Ad Banner 3 */}
      <AdBanner type="banner-728x90" adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90} />

      {/* Footer */}
      <footer className="bg-white/[0.02] border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">
                {t.footer.title}
              </h3>
              <p className="text-sm text-muted-foreground">{t.footer.description}</p>
            </div>

            {/* Community - External Links Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href={externalLinks.footer.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.discord}
                  </a>
                </li>
                <li>
                  <a
                    href={externalLinks.footer.officialSite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.twitter}
                  </a>
                </li>
                <li>
                  <a
                    href={externalLinks.footer.reddit}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.steamCommunity}
                  </a>
                </li>
                <li>
                  <a
                    href={externalLinks.footer.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.steamStore}
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal - Internal Routes Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/copyright"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.copyrightNotice}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Copyright */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">{t.footer.copyright}</p>
              <p className="text-xs text-muted-foreground">{t.footer.disclaimer}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
