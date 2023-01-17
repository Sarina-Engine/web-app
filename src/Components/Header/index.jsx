import { Header as MantineHeader, createStyles } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import NeuBox from "../NeuBox"

const useStyles = createStyles(theme => ({
  header: {
    padding: theme.spacing.sm,
    position: "sticky",
    top: 0,
    zIndex: 9999
    // paddingRight: theme.spacing.md,
  },
  
  inner: {
    height: 56,
    backgroundColor: theme.colors.dark,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  search: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },
}))

export default function Header() {
  const [opened, { toggle }] = useDisclosure(false)
  const { classes } = useStyles()

  return (
    <div className={classes.header}>
      <NeuBox className={classes.inner}>Sarina Recommender</NeuBox>
    </div>
  )
}
