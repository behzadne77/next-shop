// src/components/header-user.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Group,
  Indicator,
  Loader,
  Menu,
  Stack,
  Text,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { ChevronDown, LogOut, Settings, User, LayoutDashboard, Package, User2 } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { useLogout } from "@/queries/use-users";
import { useMediaQuery } from "@mantine/hooks";
import { useRouter } from "next/navigation";

export default function HeaderUser() {
  const { user, status } = useAuthStore();
  const isMobile = useMediaQuery("(max-width: 640px)"); // <sm
  const [opened, setOpened] = useState(false);
  // ----- logout ------
  const router = useRouter()
  const {mutate: logout, isPending} = useLogout()

  if (status === "idle") {
    return (
      <Box w={rem(120)} h={rem(36)} />
    );
  }

  if (!user) {
    return (
        <Button component={Link} href="/login" variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} radius="xl" leftSection={<User2 size={18} />} className="md:block">
            Log in
        </Button>
    );
  }

  const initials =
    user.username?.slice(0, 1)?.toUpperCase() ||
    user.email?.slice(0, 1)?.toUpperCase() ||
    "U";

  async function handleLogout() {
    await logout()
    router.push("/")
  }

  return (
    <Menu
      opened={opened}
      onChange={setOpened}
      position="bottom-end"
      offset={6}
      width={isMobile ? 220 : 280}
      withinPortal
      shadow="md"
      radius="md"
    >
      <Menu.Target>
        <UnstyledButton aria-label="User menu">
          <Group gap="xs">
            <Indicator inline processing color="green" size={10} disabled={!opened}>
              <Avatar
                radius="xl"
                size={36}
                src={user.image}
                alt={user.username}
                variant="filled"
                color="blue"
              >
                {initials}
              </Avatar>
            </Indicator>

            {!isMobile && (
              <>
                <Stack gap={0} align="flex-start">
                  <Text fw={600} size="sm" lh={1.2} truncate="end" maw={rem(140)}>
                    {user.username || "User"}
                  </Text>
                  {user.email && (
                    <Text c="dimmed" size="xs" lh={1.2} truncate="end" maw={rem(160)}>
                      {user.email}
                    </Text>
                  )}
                </Stack>
                <ChevronDown size={16} />
              </>
            )}
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Box px="sm" py="xs">
          <Group wrap="nowrap" gap="sm" align="center">
            <Avatar radius="xl" size={36} src={user.image} alt={user.username} color="blue">
              {initials}
            </Avatar>
            <Stack gap={0} style={{ minWidth: 0 }}>
              <Text fw={600} size="sm" truncate="end">
                {user.username || "User"}
              </Text>
              {user.email && (
                <Text c="dimmed" size="xs" truncate="end">
                  {user.email}
                </Text>
              )}
            </Stack>
          </Group>
        </Box>

        <Divider my="xs" />

        <Menu.Item
          leftSection={<LayoutDashboard size={16} />}
          component={Link}
          href="/panel/dashboard"
        >
          Dashboard
        </Menu.Item>

        <Menu.Item
          leftSection={<User size={16} />}
          component={Link}
          href="/dashboard/profile"
        >
          Profile
        </Menu.Item>

        <Menu.Item
          leftSection={<Settings size={16} />}
          component={Link}
          href="/dashboard/settings"
        >
          Settings
        </Menu.Item>

        <Menu.Item
          leftSection={<Package size={16} />}
          component={Link}
          href="/dashboard/orders"
        >
          Orders
        </Menu.Item>

        <Divider my="xs" />

        <Menu.Item
          color="red"
          leftSection={<LogOut size={16} />}
          onClick={handleLogout}
          disabled={isPending}
        >
          Logout
          {isPending && (
            <Loader size={14} className="ml-2 pt-1" color="red" />
          )}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}