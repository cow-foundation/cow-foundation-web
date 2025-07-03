import { MenuItem, ProductVariant, Color, UI } from "@cowprotocol/ui"

export const PAGE_MAX_WIDTH = 1760
export const THEME_MODE = "light"
export const PRODUCT_VARIANT = ProductVariant.CowFoundation

export const NAV_ITEMS: MenuItem[] = [
  {label: 'About', href: '/#about'},
  {label: 'Governance', href: 'https://docs.cow.fi/governance'},
  {label: 'Grants', href: 'https://grants.cow.fi/'},
  {
    label: "Contact",
    href: "/#contact",
  },
]

export const NAV_ADDITIONAL_BUTTONS = []
