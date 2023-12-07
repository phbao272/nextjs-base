import { useAuth } from "@/hooks";
import {
  Avatar,
  Burger,
  Group,
  Header as HeaderMantine,
  MediaQuery,
  Menu,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { useSession } from "next-auth/react";

interface Props {
  opened: boolean;
  setOpened: (o: boolean) => void;
}

export const Header: React.FC<Props> = ({ opened, setOpened }) => {
  const theme = useMantineTheme();
  const { logout } = useAuth();
  const { data: session } = useSession();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <HeaderMantine height={{ base: 50, md: 70 }} p="md">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        <Text
          sx={{
            fontWeight: 700,
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
        >
          ZenSystem
        </Text>
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={() => setOpened(!opened)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>

        <Menu shadow="md" width={150}>
          <Menu.Target>
            <Group
              spacing={12}
              sx={{
                cursor: "pointer",
              }}
            >
              <Avatar
                color="cyan"
                src={
                  "https://ca.slack-edge.com/TDL9MADHC-USLACKBOT-sv41d8cd98f0-48"
                }
              />
              <Text
                sx={{
                  maxWidth: "150px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {session?.user?.name}
              </Text>
            </Group>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item onClick={handleLogout} icon={<IconLogout size={14} />}>
              ログアウト
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </HeaderMantine>
  );
};
