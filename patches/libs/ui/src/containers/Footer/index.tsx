import { useState, ReactNode, useRef } from 'react'

import { Category, toGtmEvent } from '@cowprotocol/analytics'
import IMG_ICON_ARROW_RIGHT_CIRCULAR from '@cowprotocol/assets/images/arrow-right-circular.svg'
import IMG_ICON_SOCIAL_DISCORD from '@cowprotocol/assets/images/icon-social-discord.svg'
import IMG_ICON_SOCIAL_FORUM from '@cowprotocol/assets/images/icon-social-forum.svg'
import IMG_ICON_SOCIAL_GITHUB from '@cowprotocol/assets/images/icon-social-github.svg'
import IMG_ICON_SOCIAL_SNAPSHOT from '@cowprotocol/assets/images/icon-social-snapshot.svg'
import IMG_ICON_SOCIAL_X from '@cowprotocol/assets/images/icon-social-x.svg'
import { useTheme } from '@cowprotocol/common-hooks'

import SVG from 'react-inlinesvg'

import { FooterAnimation } from './footerAnimation'
import {
  FooterContainer,
  FooterContent,
  FooterLogo,
  FooterDescriptionSection,
  Description,
  SocialIconsWrapper,
  SocialIconLink,
  SectionTitle,
  LinkListWrapper,
  LinkListGroup,
  LinkList,
  Link,
  FooterBottom,
  BottomText,
  FooterBottomLogos,
  BottomRight,
  ToggleFooterButton,
} from './styled'

import { Color, MenuItem, ProductLogo, ProductVariant } from '@cowprotocol/ui'

export interface FooterProps {
  description?: string
  navItems?: MenuItem[]
  productVariant: ProductVariant
  additionalFooterContent?: ReactNode
  expanded?: boolean
  hasTouchFooter?: boolean
  maxWidth?: number
  host?: string
}

const SOCIAL_LINKS: { href: string; label: string; icon: string; external: boolean; utmContent: string }[] = [
  {
    href: 'https://forum.cow.fi/',
    label: 'Forum',
    icon: IMG_ICON_SOCIAL_FORUM,
    external: true,
    utmContent: 'social-forum',
  },
  {
    href: 'https://snapshot.org/#/cow.eth',
    label: 'Snapshot',
    icon: IMG_ICON_SOCIAL_SNAPSHOT,
    external: true,
    utmContent: 'social-snapshot',
  },
]

const PRODUCT_LOGO_LINKS: {
  href: string
  label: string
  productVariant: ProductVariant
  external: boolean
  utmContent: string
}[] = [
  {
    href: 'https://swap.cow.fi/',
    label: 'CoW Swap',
    productVariant: ProductVariant.CowSwap,
    external: true,
    utmContent: 'product-cow-swap',
  },
  {
    href: 'https://cow.fi/',
    label: 'CoW Protocol',
    productVariant: ProductVariant.CowProtocol,
    external: true,
    utmContent: 'product-cow-protocol',
  },
  {
    href: 'https://cow.fi/mev-blocker',
    label: 'MEV Blocker',
    productVariant: ProductVariant.MevBlocker,
    external: true,
    utmContent: 'product-mev-blocker',
  },
  {
    href: 'https://cow.fi/cow-amm',
    label: 'CoW AMM',
    productVariant: ProductVariant.CowAmm,
    external: true,
    utmContent: 'product-cow-amm',
  },
]

const GLOBAL_FOOTER_DESCRIPTION =
  'CoW Foundation is dedicated to advancing the CoW ecosystem through research, development, and community support.'

const GLOBAL_FOOTER_NAV_ITEMS: MenuItem[] = [
  {
    label: 'About',
    children: [
      {
        href: 'https://docs.cow.fi/governance',
        label: 'Governance',
        external: true,
        utmContent: 'footer-about-governance',
      },
      {
        href: 'https://dune.com/cowprotocol/cow-revenue',
        label: 'Revenue',
        external: true,
        utmContent: 'footer-about-revenue',
      },
      { href: 'https://grants.cow.fi/', label: 'Grants', external: true, utmContent: 'footer-about-grants' },
      { href: 'https://cow.foundation/legal', label: 'Legal', external: true, utmContent: 'footer-about-legal' },
    ],
  },
  {
    label: 'Products',
    children: [
      {
        label: 'CoW Swap',
        href: 'https://cow.fi/cow-swap',
        external: true,
        utmContent: 'footer-products-cow-swap',
      },
      {
        label: 'CoW Protocol',
        href: 'https://cow.fi/cow-protocol',
        external: true,
        utmContent: 'footer-products-cow-protocol',
      },
      { label: 'CoW AMM', href: 'https://cow.fi/cow-amm', external: true, utmContent: 'footer-products-cow-amm' },
      {
        label: 'MEV Blocker',
        href: 'https://cow.fi/mev-blocker',
        external: true,
        utmContent: 'footer-products-mev-blocker',
      },
      {
        label: 'CoW Explorer',
        href: 'https://explorer.cow.fi/',
        external: true,
        utmContent: 'footer-products-cow-explorer',
      },
      { label: 'CoW Widget', href: 'https://cow.fi/widget', external: true, utmContent: 'footer-products-cow-widget' },
    ],
  },
]

interface FooterLinkProps {
  href: string
  external?: boolean
  label?: string
  utmSource?: string
  utmContent?: string
  rootDomain?: string
}

// TODO: Add proper return type annotation
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const FooterLink = ({ href, external, label, utmSource, utmContent, rootDomain }: FooterLinkProps) => {
  const finalRootDomain = rootDomain || (typeof window !== 'undefined' ? window.location.host : '')

  const finalHref = external
    ? appendUtmParams(href, utmSource, utmContent, finalRootDomain, external, label)
    : (() => {
        try {
          return `${new URL(href, `https://${finalRootDomain}`).pathname}`
        } catch {
          return href.startsWith('/') ? href : `/${href}`
        }
      })()

  return (
    <Link
      href={finalHref}
      target={external ? '_blank' : '_self'}
      rel={external ? 'noopener noreferrer' : undefined}
      data-click-event={toGtmEvent({
        category: Category.FOOTER,
        action: 'click',
        label: utmContent || label?.toLowerCase().replace(/\s+/g, '-'),
      })}
    >
      {label}
    </Link>
  )
}

const appendUtmParams = (
  href: string,
  utmSource: string | undefined,
  utmContent: string | undefined,
  rootDomain: string,
  isExternal: boolean,
  label: string | undefined,
// TODO: Add proper return type annotation
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
) => {
  const finalRootDomain = rootDomain || (typeof window !== 'undefined' ? window.location.host : '')

  const defaultUtm = {
    utmSource: finalRootDomain,
    utmMedium: 'web',
    utmContent: `footer-nav-button-${label?.toLowerCase().replace(/\s+/g, '-')}`,
  }
  const finalUtmSource = utmSource || defaultUtm.utmSource
  const finalUtmContent = utmContent || defaultUtm.utmContent

  if (isExternal) {
    const url = href.startsWith('http') ? new URL(href) : new URL(href, `https://${finalRootDomain}`)

    const hash = url.hash
    url.hash = '' // Remove the hash temporarily to prevent it from interfering with the search params
    url.searchParams.set('utm_source', finalUtmSource)
    url.searchParams.set('utm_medium', defaultUtm.utmMedium)
    url.searchParams.set('utm_content', finalUtmContent)
    url.hash = hash // Re-attach the hash

    return url.toString()
  }

  return href
}

// TODO: Break down this large function into smaller functions
// eslint-disable-next-line max-lines-per-function
export const Footer = ({
  description = GLOBAL_FOOTER_DESCRIPTION,
  navItems = GLOBAL_FOOTER_NAV_ITEMS,
  additionalFooterContent,
  expanded = false,
  hasTouchFooter = false,
  maxWidth,
  host,
// TODO: Add proper return type annotation
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
}: FooterProps) => {
  const [isFooterExpanded, setIsFooterExpanded] = useState(expanded)
  const footerRef = useRef<HTMLDivElement>(null)
  const theme = useTheme()

  // TODO: Add proper return type annotation
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const toggleFooter = () => {
    setIsFooterExpanded((state) => {
      if (!state && footerRef.current) {
        setTimeout(() => {
          footerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
        }, 300) // Slight delay needed for correct scroll position calculation
      }

      return !state
    })
  }

  return (
    <FooterContainer ref={footerRef} expanded={isFooterExpanded} hasTouchFooter={hasTouchFooter}>
      {isFooterExpanded && (
        <>
          <FooterContent maxWidth={maxWidth}>
            <FooterDescriptionSection>
              <FooterLogo>
                <ProductLogo
                  variant={ProductVariant.CowFoundation}
                  height={32}
                  overrideColor={!theme.darkMode ? Color.neutral100 : Color.neutral90}
                  overrideHoverColor={!theme.darkMode ? Color.neutral98 : Color.neutral95}
                />
              </FooterLogo>
              {description && <Description>{description}</Description>}
              <SocialIconsWrapper>
                {SOCIAL_LINKS.map((social, index) => (
                  <SocialIconLink key={index} href={social.href} target="_blank" rel="noopener noreferrer">
                    <SVG src={social.icon} title={social.label} />
                  </SocialIconLink>
                ))}
              </SocialIconsWrapper>
            </FooterDescriptionSection>

            <LinkListWrapper>
              {navItems.map((item, index) => (
                <LinkListGroup key={index}>
                  <SectionTitle>{item.label}</SectionTitle>
                  <LinkList>
                    {item.children?.map((child, childIndex) => (
                      <li key={childIndex}>
                        <FooterLink
                          href={child.href || '#'}
                          external={child.external}
                          label={child.label}
                          utmSource={child.utmSource}
                          utmContent={child.utmContent}
                          rootDomain={host || window.location.host}
                        />
                      </li>
                    ))}
                  </LinkList>
                </LinkListGroup>
              ))}
            </LinkListWrapper>
          </FooterContent>

          <FooterAnimation />
        </>
      )}
      <FooterBottom maxWidth={maxWidth}>
        <BottomText>&copy; CoW Foundation - {new Date().getFullYear()}</BottomText>
        <FooterBottomLogos>
          {PRODUCT_LOGO_LINKS.map((product, index) => (
            <ProductLogo
              key={index}
              variant={product.productVariant}
              logoIconOnly={false}
              overrideColor={!theme.darkMode ? Color.neutral40 : Color.neutral40}
              overrideHoverColor={Color.neutral98}
              height={24}
              href={product.href}
              external={true}
              aria-label={`Visit the ${product.label} website`}
            />
          ))}
        </FooterBottomLogos>

        <BottomRight>
          {additionalFooterContent && additionalFooterContent}
          <ToggleFooterButton onClick={toggleFooter} expanded={isFooterExpanded}>
            <SVG src={IMG_ICON_ARROW_RIGHT_CIRCULAR} title="Toggle Footer" />
          </ToggleFooterButton>
        </BottomRight>
      </FooterBottom>
    </FooterContainer>
  )
}