import Head from "next/head"
import Image from "next/image"
import { Inter } from "@next/font/google"
import styles from "@/styles/Home.module.css"
import { Center, createStyles, Grid, Navbar, ScrollArea, Title } from "@mantine/core"
import NeuBox from "@/Components/NeuBox"
import { css } from "@emotion/css"
import LinksGroup from "@/Components/NavbarLinksGroup"
import { useQuery } from "react-query"
import getCategories from "@/apis/queries/getCategories"
import { useEffect, useState } from "react"

// const inter = Inter({ subsets: ["latin"] })

const mockdata = [
  { label: "Dashboard" },
  {
    label: "Market news",
    initiallyOpened: true,
    links: [
      { label: "Overview", link: "/" },
      { label: "Forecasts", link: "/" },
      { label: "Outlook", link: "/" },
      { label: "Real time", link: "/" },
    ],
  },
  {
    label: "Releases",
    links: [
      { label: "Upcoming releases", link: "/" },
      { label: "Previous releases", link: "/" },
      { label: "Releases schedule", link: "/" },
    ],
  },
  { label: "Analytics" },
  { label: "Contracts" },
  { label: "Settings" },
  {
    label: "Security",
    links: [
      { label: "Enable 2FA", link: "/" },
      { label: "Change password", link: "/" },
      { label: "Recovery codes", link: "/" },
    ],
  },
]

const useStyles = createStyles(theme => ({
  navbar: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}))

export default function Home() {
  const { classes } = useStyles()
  const { data } = useQuery("categories", getCategories)
  const [CategoriesData, setCategoriesData] = useState([])
  useEffect(() => {
    if (data?.data?.main_cats) {
      let data_temp = {}
      for (let cat of data.data.main_cats) {
        data_temp[cat.id] = {
          label: cat.title_fa,
          links: [],
        }
      }
      for (let childCat of data.data.side_cats) {
        data_temp[childCat.parent_cat]?.links.push({
          label: childCat.title_fa,
          link: `/${childCat.id}`,
        })
      }
      setCategoriesData(Object.entries(data_temp).map(([key, value]) => value))
    }
  }, [data])
  const [links, setLinks] = useState([])
  useEffect(() => {
    setLinks(CategoriesData.map(item => <LinksGroup {...item} key={item.label} />))
  }, [CategoriesData])
  // const links = mockdata.map(item => <LinksGroup {...item} key={item.label} />)

  return (
    <div style={{ height: "100%", padding: 12 }}>
      <Grid grow gutter="xl" style={{ height: "100%" }}>
        <Grid.Col span={9} sx={{ zIndex: 1, height: "100%", maxHeight: "100%" }}>
          <NeuBox style={{ height: "100%" }}>
            <Center h="100%" sx={{ alignItems: "center", flexDirection: "column" }}>
              <Title order={1} style={{ fontFamily: "Times New Roman", fontSize: 85 }}>
                Sarina
              </Title>
              <Title order={2} style={{ fontFamily: "Times New Roman" }}>
                Recommender for digikala
              </Title>
              <p>Select a category from sidebar to see the recommendation for it&apos;s products</p>
            </Center>
          </NeuBox>
        </Grid.Col>
        <Grid.Col span={3} sx={{height: "100%"}}>
          <NeuBox style={{ height: "100%", maxHeight: "100%" }}>
            <Navbar
              height="100%"
              className={css`
                background-color: transparent !important;
                border: none !important;
              `}
            >
              <Navbar.Section grow className={classes.links} component={ScrollArea}>
                <div className={classes.linksInner}>{links}</div>
              </Navbar.Section>
            </Navbar>
          </NeuBox>
        </Grid.Col>
      </Grid>
    </div>
  )
}
