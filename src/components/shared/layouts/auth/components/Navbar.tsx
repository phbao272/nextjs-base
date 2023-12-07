import {
  Navbar as NavbarMantine,
  createStyles,
  getStylesRef,
} from "@mantine/core";
import {
  IconLicense,
  IconSettings,
  IconUserPlus,
  IconUsers,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
interface Props {
  opened: boolean;
}

const useStyles = createStyles((theme) => ({
  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,

      [`& .${getStylesRef("icon")}`]: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
      [`& .${getStylesRef("icon")}`]: {
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
      },
    },
  },
}));

const data = [
  { link: "/users", label: "ユーザー", icon: IconUsers },
  {
    link: "/users/pending-approval",
    label: "未確認申請",
    icon: IconUserPlus,
  },
  { link: "/licenses", label: "ライセンス", icon: IconLicense },
  { link: "/settings", label: "設定", icon: IconSettings },
];

export const Navbar: React.FC<Props> = ({ opened }) => {
  const pathname = usePathname();
  const { classes, cx } = useStyles();
  const [active, setActive] = useState(pathname);

  const links = data.map((item) => (
    <Link
      className={cx(classes.link, {
        [classes.linkActive]: `${item.link}` === active,
      })}
      href={item.link}
      key={item.label}
      onClick={() => {
        setActive(`${item.link}`);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <NavbarMantine
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      <NavbarMantine.Section grow>{links}</NavbarMantine.Section>
    </NavbarMantine>
  );
};
