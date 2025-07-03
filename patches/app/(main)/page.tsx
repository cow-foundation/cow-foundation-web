"use client"

import { Color, Font, ProductLogo, ProductVariant, Media } from "@cowprotocol/ui"
import IMG_ICON_GOVERNANCE from "@cowprotocol/assets/images/icon-governance.svg"
import IMG_ICON_BULB_COW from "@cowprotocol/assets/images/icon-bulb-cow.svg"
import { Link, LinkType } from "@/components/Link"
import styled from 'styled-components/macro'

import {
  ContainerCard,
  ContainerCardSection,
  CTAButton,
  CTAImage,
  CTASectionWrapper,
  CTASubtitle,
  CTATitle,
  HeroBackground,
  HeroContainer,
  HeroContent,
  HeroTitle,
  PageWrapper,
  SectionTitleDescription,
  SectionTitleIcon,
  SectionTitleText,
  SectionTitleWrapper,
  TopicCard,
  TopicCardInner,
  TopicDescription,
  TopicImage,
  TopicList,
  TopicTitle,
} from "@/styles/styled"

import LazySVG from "@/components/LazySVG"
import IMG_ICON_GRANTS_CARTON from "@cowprotocol/assets/images/icon-grants-carton.svg"
import IMG_BITS from "@cowprotocol/assets/images/image-bits.svg"
import IMG_COINS from "@cowprotocol/assets/images/image-coins.svg"
import IMG_GRANT_COLOR from "@cowprotocol/assets/images/image-grant-color.svg"

import { CHANNEL_LIST, PRODUCT_CONTAINERS } from "@/data/home/const"
import { BinaryCowLogoCanvas } from "@/components/BinaryCowLogoCanvas"

// Dirty patch: Mobile hero container wrapper
const MobileHeroContainer = styled(HeroContainer)`
  ${Media.upToMedium()} {
    min-height: 400px !important;
  }
`

export default function Page() {
  return (
    <PageWrapper>
      <MobileHeroContainer
        minHeight="700px"
        maxWidth={"100%"}
        margin="0 auto"
        padding="142px 20px 56px"
      >
        <HeroBackground>
          <BinaryCowLogoCanvas />
        </HeroBackground>
        <HeroContent flex={"0 1 0"}>
          <HeroTitle fontSize={120} fontSizeMobile={42} style={{
            textShadow: '0 0 20px white'
          }}>
          Making the CoW Ecosystem Thrive
          </HeroTitle>
        </HeroContent>
      </MobileHeroContainer>

      {PRODUCT_CONTAINERS}

      <ContainerCard bgColor={'transparent'} color={Color.neutral0} id="about">
        <ContainerCardSection>
          <SectionTitleWrapper padding="0" margin="0">
            <ProductLogo variant={ProductVariant.CowFoundation} theme="light" logoIconOnly height={60} />
            <SectionTitleText>About CoW Foundation</SectionTitleText>
            <SectionTitleDescription color={Color.neutral20}>
              CoW Foundation was established by CoW DAO through{" "}
              <a
                href="https://snapshot.box/#/s:cow.eth/proposal/0x7bdf94cd8688a9baed7df2599ede5aaca6d931353d2765bb71519d97e478db80"
                target="_blank"
                rel="noopener noreferrer"
              >
                CIP-64
              </a>{" "}
              as an adjacent legal entity and operational backbone, tasked with
              fostering the growth of the CoW ecosystem. Structured as a Cayman
              Islands Company Foundation—with no shareholders or members—it
              underpins the decentralized governance and expansion of the entire
              CoW ecosystem.
            </SectionTitleDescription>
          </SectionTitleWrapper>

          <SectionTitleWrapper padding="0">
            <SectionTitleText>Core Missions</SectionTitleText>
          </SectionTitleWrapper>
          <TopicList columns={3} columnsTablet={2}>
            <TopicCard
              contentAlign="left"
              bgColor={Color.neutral90}
              textColor={Color.neutral20}
              padding="32px"
              asProp="div"
            >
              <TopicCardInner contentAlign="left">
                <TopicTitle color={Color.neutral0}>CoW Ecosystem Promotion</TopicTitle>
                <TopicDescription fontSize={21} color={Color.neutral20}>
                  To amplify CoW DAO's reach by driving developer outreach, forging
                  strategic partnerships, and showcasing CoW DAO's products to users
                  and institutions alike—building awareness and accelerating
                  adoption across the DeFi landscape.
                </TopicDescription>
              </TopicCardInner>
              <TopicImage
                iconColor="transparent"
                bgColor="transparent"
                margin="auto 0 0 auto"
                height="auto"
                width="100%"
              >
                <LazySVG src={IMG_BITS} />
              </TopicImage>
            </TopicCard>

            <TopicCard
              contentAlign="left"
              bgColor={Color.neutral90}
              textColor={Color.neutral20}
              padding="32px"
              asProp="div"
            >
              <TopicCardInner contentAlign="left">
                <TopicTitle color={Color.neutral0}>Treasury Management</TopicTitle>
                <TopicDescription fontSize={21} color={Color.neutral20}>
                  Working alongside the community-mandated Treasury Committee, the
                  Foundation stewards CoW DAO's on-chain and off-chain assets—
                  optimizing yield, safeguarding reserves, and ensuring transparent,
                  accountable financial operations.
                </TopicDescription>
              </TopicCardInner>
              <TopicImage
                iconColor="transparent"
                bgColor="transparent"
                margin="auto 0 0 auto"
                height="auto"
                width="100%"
              >
                <LazySVG src={IMG_COINS} />
              </TopicImage>
            </TopicCard>

            <TopicCard
              contentAlign="left"
              bgColor={Color.neutral90}
              textColor={Color.neutral20}
              padding="32px"
              asProp="div"
            >
              <TopicCardInner contentAlign="left">
                <TopicTitle color={Color.neutral0}>Grant Distribution</TopicTitle>
                <TopicDescription fontSize={21} color={Color.neutral20}>
                  Through direct allocations or via the dedicated Grants DAO
                  Committee, CoW Foundation channels funding into high-impact
                  projects and initiative, fueling innovation, rewarding
                  contributors, and nurturing the next generation of CoW-powered
                  solutions.
                </TopicDescription>
              </TopicCardInner>
              <TopicImage
                iconColor="transparent"
                bgColor="transparent"
                margin="auto 0 0 auto"
                height="auto"
                width="100%"
              >
                <LazySVG src={IMG_GRANT_COLOR} />
              </TopicImage>
            </TopicCard>
          </TopicList>
 
        </ContainerCardSection>
      </ContainerCard>

      <ContainerCard bgColor={Color.neutral90} color={Color.neutral0}>
        <ContainerCardSection>
          <SectionTitleWrapper padding="0" maxWidth={900}>
            <SectionTitleIcon $size={90}>
              <LazySVG src={IMG_ICON_GOVERNANCE} />
            </SectionTitleIcon>
            <SectionTitleText textAlign="center">Governance</SectionTitleText>
            <SectionTitleDescription
              color={Color.neutral20}
              fontWeight={Font.weight.regular}
              textAlign="center"
            >
              Anyone can join CoW DAO by holding{" "}
              <Link
                href="https://swap.cow.fi/#/1/swap/USDC/COW"
                external
              >
                COW tokens
              </Link>
              . Tokenholders contribute to CoW DAO's mission by participating in
              "CoWmunity" discussions on Discord, by adding proposals to the CoW
              DAO Forum, and by voting on governance actions in Snapshot.
            </SectionTitleDescription>
          </SectionTitleWrapper>

          <TopicList columns={3} columnsTablet={2}>
            {CHANNEL_LIST.map((social, index) => (
              <TopicCard
                key={index}
                textColor={social.textColor}
                bgColor={social.iconColor}
                href={social.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                <TopicImage
                  iconColor="transparent"
                  maxWidth={290}
                  maxHeight={290}
                  height={290}
                  width={290}
                >
                  <LazySVG src={social.iconImage} title={social.title} />
                </TopicImage>
                <TopicTitle fontSize={38}>{social.title}</TopicTitle>
              </TopicCard>
            ))}
          </TopicList>
        </ContainerCardSection>
      </ContainerCard>

      <ContainerCard bgColor={Color.neutral100} padding="0">
        <CTASectionWrapper>
          <CTAImage color={Color.cowfi_blue}>
            <LazySVG src={IMG_ICON_BULB_COW} />
          </CTAImage>
          <CTASubtitle>Explore, learn, integrate</CTASubtitle>
          <CTATitle>CoW Foundation documentation</CTATitle>
          <CTAButton
            href="https://docs.cow.fi/?utm_source=cow.foundation&utm_medium=web&utm_content=cta-read-docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read the docs
          </CTAButton>
        </CTASectionWrapper>
      </ContainerCard>

      <ContainerCard bgColor={Color.neutral90} color={Color.neutral10}>
        <ContainerCardSection>
          <SectionTitleWrapper maxWidth={900}>
            <SectionTitleIcon $size={60}>
              <ProductLogo variant={ProductVariant.CowProtocol} theme="dark" logoIconOnly />
            </SectionTitleIcon>
            <SectionTitleText fontSize={62}>Want to build the future of decentralized trading?</SectionTitleText>
            <SectionTitleDescription fontSize={24} color={Color.neutral40} fontWeight={Font.weight.regular}>
              We are an ambitious, fast-growing and international team working at the forefront of DeFi. We believe that
              we can make markets more fair and more efficient by building the ultimate batch auction settlement layer
              across EVM-compatible blockchains
            </SectionTitleDescription>
            <Link
              external
              linkType={LinkType.SectionTitleButton}
              href="https://cow.fi/careers"
            >
              View careers
            </Link>
          </SectionTitleWrapper>
        </ContainerCardSection>
      </ContainerCard>

      <ContainerCard
        bgColor={Color.neutral90}
        color={Color.neutral0}
      >
        <ContainerCardSection>
          <SectionTitleWrapper maxWidth={900}>
            <SectionTitleIcon $size={90}>
              <LazySVG src={IMG_ICON_GRANTS_CARTON} />
            </SectionTitleIcon>
            <SectionTitleText textAlign="center">Grants</SectionTitleText>
            <SectionTitleDescription
                  color={Color.neutral20}
              fontWeight={Font.weight.regular}
              textAlign="center"
            >
              The CoW DAO Grants Program funds mission-aligned projects and
              people working on MEV protection, trading innovation, and
              ecosystem development.
            </SectionTitleDescription>
            <Link
              external
              linkType={LinkType.SectionTitleButton}
              href="https://grants.cow.fi/"
            >
              Explore grants
            </Link>
          </SectionTitleWrapper>
        </ContainerCardSection>
      </ContainerCard>

      <ContainerCard
        bgColor={Color.neutral100}
        color={Color.neutral0}
        id="contact"
        touchFooter
      >
        <ContainerCardSection>
          <SectionTitleWrapper maxWidth={900}>
            <SectionTitleText textAlign="center">Get in touch</SectionTitleText>
            <SectionTitleDescription
              color={Color.neutral30}
              fontWeight={Font.weight.regular}
              textAlign="center"
            >
              We're always looking for new ways to support the CoW ecosystem.
              CoW Foundation can be contacted at{" "}
              <a
                href="mailto:contact@cow.foundation"
                target="_blank"
                rel="noopener noreferrer"
              >
                contact@cow.foundation
              </a>
            </SectionTitleDescription>
          </SectionTitleWrapper>
        </ContainerCardSection>
      </ContainerCard>
    </PageWrapper>
  )
}
