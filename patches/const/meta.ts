const API_BASE_URL = 'https://api.cow.fi'
export const IMAGE_PATH = 'images/'

export const DATA_CACHE_TIME_SECONDS = 60 * 60 // 1 hour

export const CONFIG = {
  title: {
    template: '%s - CoW Foundation',
    default: 'CoW Foundation',
  },
  metatitle_tokenDetail: 'Live Token Price Chart & Metrics',
  description: 'CoW Foundation fosters the growth of the CoW ecosystem through treasury management, ecosystem promotion, and grant distribution.',
  descriptionShort: "Making the CoW Ecosystem Thrive",
  ogImage: 'https://cow.foundation/images/og-foundation.png',
  ogImageCOWAMM: 'https://cow.foundation/images/og-foundation.png',
  ogImageCOWSWAPP: 'https://cow.foundation/images/og-foundation.png',
  ogImageMEVBLOCKER: 'https://cow.foundation/images/og-foundation.png',
  ogImageCOWPROTOCOL: 'https://cow.foundation/images/og-foundation.png',
  url: {
    root: 'https://cow.foundation',
    swap: 'https://swap.cow.fi/#/1/swap/DAI/COW?sellAmount=500',
    docs: 'https://docs.cow.fi',
    api: API_BASE_URL + '/mainnet',
    apiDocs: API_BASE_URL + '/docs',
    daos: '/daos',
    cowamm: '/cow-amm',
    widget: '/widget',
    widgetTnC: '/widget/terms-and-conditions',
    careers: '/careers',
    widgetConfigurator: 'widget.cow.fi',
    analytics: 'https://dune.com/cowprotocol/cowswap',
    explorer: 'https://explorer.cow.fi',
    securityPortal: 'https://app.chainpatrol.io/cow',
    grants: 'https://grants.cow.fi',
    mevBlocker: 'https://mevblocker.io/',
  },
  ashbyHqApi: 'https://jobs.ashbyhq.com/api/non-user-graphql',
  social: {
    twitter: { label: 'Twitter', account: '@CoWSwap', url: 'https://twitter.com/CoWSwap' },
    discord: { label: 'Discord', url: 'https://discord.com/invite/cowprotocol' },
    github: { label: 'GitHub', url: 'https://github.com/cowprotocol/' },
    forum: { label: 'Forum', url: 'https://forum.cow.fi/' },
  },
  utm: {
    utmSource: 'cow.foundation',
    utmMedium: 'web',
  },
  tokenDisclaimer:
    'IMPORTANT DISCLAIMER: The information presented on the Interface, including hyperlinked sites, associated applications, forums, blogs, social media accounts, and other platforms, serves as general information sourced from third-party providers. We want to emphasise that we do not provide any warranties regarding the accuracy or up-to-dateness of the content. None of the content should be interpreted as financial, tax, legal, or any other type of advice. Your use or reliance on the content is entirely at your own discretion and risk. Before making any decisions, it is crucial that you undertake your own research, review, analysis, and verification of our content. Trading carries significant risks and can result in substantial losses, so it is advisable to consult your own legal, financial, tax, or other professional advisors prior to making any decisions. None of the content on the Interface is intended as a solicitation or offer.',
}