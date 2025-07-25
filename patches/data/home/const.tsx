import { Color, ProductVariant, UI } from "@cowprotocol/ui"

import IMG_GREEN_WAVES from "@cowprotocol/assets/images/image-green-waves.svg"
import IMG_COINS from "@cowprotocol/assets/images/image-coins.svg"
import IMG_BITS from "@cowprotocol/assets/images/image-bits.svg"
import IMG_TUBE from "@cowprotocol/assets/images/image-tube.svg"

import IMG_DISCORD from "@cowprotocol/assets/images/image-discord.svg"
import IMG_FORUM from "@cowprotocol/assets/images/image-forum.svg"
import IMG_SNAPSHOT from "@cowprotocol/assets/images/image-snapshot.svg"
import {
  ContainerCard,
  ContainerCardSection,
  SectionTitleText,
  SectionTitleWrapper,
  TopicCard,
  TopicCardInner,
  TopicDescription,
  TopicImage,
  TopicList,
  TopicTitle,
} from "@/styles/styled"
import { Link, LinkType } from "@/components/Link"
import SVG from "react-inlinesvg"


export const PRODUCT_LIST = [
  {
    title: "CoW Protocol",
    description: "Open-source, permissionless DEX aggregation protocol",
    linkHref: "https://cow.fi/cow-protocol",
    linkText: "Start building",
    linkEvent: "click-start-building",
    linkExternal: true,
    bgColor: Color.cowfi_purple_dark,
    textColor: Color.cowfi_purple_bright,
    descriptionColor: Color.cowfi_purple_bright,
    linkBgColor: Color.cowfi_purple_bright,
    linkColor: Color.cowfi_purple_dark,
    productVariant: ProductVariant.CowDao,
    iconImage: IMG_BITS,
  },
  {
    title: "CoW Swap",
    description: "The DEX that lets you do what you want",
    linkHref: "https://swap.cow.fi/#/1/swap/USDC/COW",
    linkText: "Start trading",
    linkEvent: "click-trade-on-cow-swap",
    linkExternal: true,
    linkUtmContent: "home-page-trade-on-cow-swap",
    bgColor: `var(${UI.COLOR_BLUE_300_PRIMARY})`,
    textColor: `var(${UI.COLOR_BLUE_900_PRIMARY})`,
    descriptionColor: `var(${UI.COLOR_BLUE_900_PRIMARY})`,
    linkBgColor: `var(${UI.COLOR_BLUE_900_PRIMARY})`,
    linkColor: `var(${UI.COLOR_BLUE_300_PRIMARY})`,
    productVariant: ProductVariant.CowDao,
    iconImage: IMG_COINS,
  },
  {
    title: "CoW AMM",
    description: "The first MEV-capturing AMM",
    linkHref: "https://cow.fi/cow-amm",
    linkText: "Deposit liquidity",
    linkEvent: "click-deploy-liquidity",
    linkExternal: true,
    bgColor: Color.cowamm_dark_green,
    textColor: Color.cowamm_green,
    descriptionColor: Color.cowamm_green,
    linkBgColor: Color.cowamm_green,
    linkColor: Color.cowamm_dark_green,
    productVariant: ProductVariant.CowDao,
    iconImage: IMG_GREEN_WAVES,
  },
  {
    title: "MEV Blocker",
    description: "The best MEV protection RPC under the sun",
    linkHref: "https://cow.fi/mev-blocker",
    linkText: "Get protected",
    linkEvent: "click-get-protected",
    linkExternal: true,
    bgColor: Color.cowfi_orange_pale,
    textColor: Color.cowfi_orange_bright,
    descriptionColor: Color.cowfi_orange_bright,
    linkBgColor: Color.cowfi_orange_bright,
    linkColor: Color.cowfi_orange_pale,
    productVariant: ProductVariant.MevBlocker,
    iconImage: IMG_TUBE,
  },
]

export const CHANNEL_LIST = [
  {
    title: "Discord",
    href: "https://discord.com/invite/cowprotocol?utm_source=cow.fi&utm_medium=web&utm_content=link",
    linkEvent: "click-discord",
    iconColor: Color.cowfi_discord_pink,
    textColor: Color.neutral10,
    iconImage: IMG_DISCORD,
  },
  {
    title: "Forum",
    href: "https://forum.cow.fi/?utm_source=cow.fi&utm_medium=web&utm_content=link",
    linkEvent: "click-forum",
    iconColor: Color.cowamm_dark_green,
    textColor: Color.cowfi_white2,
    iconImage: IMG_FORUM,
  },
  {
    title: "Snapshot",
    href: "https://snapshot.org/#/cow.eth?utm_source=cow.fi&utm_medium=web&utm_content=link",
    linkEvent: "click-snapshot",
    iconColor: Color.cowfi_snapshot_red,
    textColor: Color.cowfi_white2,
    iconImage: IMG_SNAPSHOT,
  },
]

export const PRODUCT_CONTAINERS = (
  <ContainerCard bgColor={Color.neutral100}>
    <ContainerCardSection>
      <SectionTitleWrapper
        color={Color.neutral0}
        maxWidth={1200}
        margin="0 auto 100px"
      >
        <SectionTitleText
          lineHeight={1.6}
          lineHeightMobile={1.8}
          fontSizeMobile={24}
        >
          CoW Foundation{" "}
          <span className="wordtag-orange">powers the governance</span> of CoW
          DAO and its products providing operational support so you can{" "}
          <span className="wordtag-purple">build and innovate</span> with{" "}
          <span className="wordtag-blue">confidence</span>.
        </SectionTitleText>

        <SectionTitleText
          color={Color.neutral30}
          fontSize={26}
          fontSizeMobile={16}
          textAlign="center"
        >
          By aligning every initiative with the CoWmunity's vision and best
          practices, the Foundation creates the conditions for the CoW ecosystem
          to grow and thrive.
        </SectionTitleText>
      </SectionTitleWrapper>

      <TopicList columns={2}>
        {PRODUCT_LIST.map((topic, index) => (
          <TopicCard
            key={index}
            contentAlign={"left"}
            bgColor={topic.bgColor}
            textColor={topic.textColor}
            padding={"32px"}
            asProp="div"
          >
            <TopicCardInner contentAlign="left">
              <TopicTitle fontSize={51}>{topic.title}</TopicTitle>
              <TopicDescription fontSize={28} color={topic.descriptionColor}>
                {topic.description}
              </TopicDescription>
              <Link
                bgColor={topic.linkBgColor}
                color={topic.linkColor}
                href={topic.linkHref}
                linkType={LinkType.TopicButton}
                external={topic.linkExternal}
                utmContent={topic.linkUtmContent}
              >
                {topic.linkText}
              </Link>
            </TopicCardInner>
            <TopicImage
              iconColor="transparent"
              bgColor="transparent"
              margin={"0 0 0 auto"}
              height={"236px"}
              width={"auto"}
            >
              <SVG src={topic.iconImage} title={topic.title} />
            </TopicImage>
          </TopicCard>
        ))}
      </TopicList>
    </ContainerCardSection>
  </ContainerCard>
)
