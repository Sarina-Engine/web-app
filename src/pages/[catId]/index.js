import Head from "next/head"
import Image from "next/image"
import { Inter } from "@next/font/google"
import styles from "@/styles/Home.module.css"
import {
  Anchor,
  Breadcrumbs,
  Center,
  createStyles,
  Flex,
  Grid,
  Navbar,
  ScrollArea,
  Table,
  Title,
  UnstyledButton,
} from "@mantine/core"
import NeuBox from "@/Components/NeuBox"
import { css } from "@emotion/css"
import LinksGroup from "@/Components/NavbarLinksGroup"
import { useQuery } from "react-query"
import getCategories from "@/apis/queries/getCategories"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import getProducts from "@/apis/queries/getProducts"

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

export default function Category() {
  const { classes } = useStyles()
  const router = useRouter()
  const catId = router.query.catId

  const { data } = useQuery(["category", catId], () => getProducts(catId))
  const [selectedProductIndex, setSelectedProductIndex] = useState()
  const [breadcrumbItems, setBreadcrumbItems] = useState([])

  useQuery("categories", getCategories, {
    onSuccess: catData => {
      let temp = [{ title: "خانه", href: "/" }]
      let childCat = catData.data?.side_cats?.find?.(item => item.id == catId)
      let parentCat = catData.data?.main_cats?.find?.(item => item.id == childCat.parent_cat)
      temp.push({ title: parentCat?.title_fa, href: "#" }, { title: childCat?.title_fa, href: "#" })
      console.log(temp)
      setBreadcrumbItems(temp)
    },
  })

  return (
    <div style={{ height: "100%", padding: 12 }}>
      <Grid grow gutter="xl" style={{ height: "100%" }}>
        <Grid.Col span={9} sx={{ zIndex: 1, height: "100%", maxHeight: "100%" }}>
          <Flex direction="column" style={{ height: "100%" }} gap="xl">
            <NeuBox>
              <Flex h="100%" align="center" justify="end">
                <Breadcrumbs dir="rtl">
                  {breadcrumbItems?.map((item, index) => (
                    <Anchor href={item.href} key={index}>
                      {item.title}
                    </Anchor>
                  ))}
                  {data?.data?.[selectedProductIndex]?.name}
                </Breadcrumbs>
              </Flex>
            </NeuBox>
            <NeuBox style={{ height: "100%", wordWrap: "anywhere" }}>
              {data?.data?.[selectedProductIndex] ? (
                <Table dir="rtl" withColumnBorders>
                  <tbody>
                    {data?.data?.[selectedProductIndex] &&
                      Object.entries(data?.data?.[selectedProductIndex]).map(
                        ([key, value], index) => (
                          <tr key={index}>
                            <td>{key}</td>
                            <td>{value}</td>
                          </tr>
                        )
                      )}
                  </tbody>
                </Table>
              ) : (
                <Center h="100%" sx={{ alignItems: "center", flexDirection: "column" }}>
                  <p>
                    Select a product to see it&apos;s details
                  </p>
                </Center>
              )}
            </NeuBox>
          </Flex>
        </Grid.Col>
        <Grid.Col span={3} sx={{ height: "100%" }}>
          <NeuBox style={{ height: "100%", maxHeight: "100%" }}>
            <Navbar
              height="100%"
              className={css`
                background-color: transparent !important;
                border: none !important;
              `}
            >
              <Navbar.Section grow className={classes.links} component={ScrollArea}>
                <div className={classes.linksInner}>
                  {data?.data?.map?.((item, index) => (
                    <UnstyledButton
                      key={item.id}
                      p="md"
                      onClick={() => setSelectedProductIndex(index)}
                      sx={theme => ({
                        fontWeight: 500,
                        display: "block",
                        width: "100%",
                        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
                        color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
                        fontSize: theme.fontSizes.sm,
                        borderTopRightRadius: "10px",
                        borderBottomRightRadius: "10px",

                        "&:hover": {
                          backgroundColor:
                            theme.colorScheme === "dark"
                              ? theme.colors.dark[7]
                              : theme.colors.gray[0],
                          color: theme.colorScheme === "dark" ? theme.white : theme.black,
                        },
                      })}
                    >
                      {item.name}
                    </UnstyledButton>
                  ))}
                </div>
              </Navbar.Section>
            </Navbar>
          </NeuBox>
        </Grid.Col>
      </Grid>
    </div>
  )
}
