import { Menu, Text, rem, ActionIcon } from "@mantine/core";
import {
  IconMenu2,
  IconHome,
  IconPlus,
  IconHeart,
  IconUser,
  IconLogin,
  IconUserPlus,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbarmenu() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Replace with actual login state

  const menuItems = isLoggedIn
    ? [
        { name: "/", icon: IconHome, label: "Home" },
        { name: "/CreateRecipe", icon: IconPlus, label: "Create Recipe" },
        {
          name: "/Favorites",
          icon: IconHeart,
          label: "Favorites",
          color: "red",
        },
        { name: "/Profile", icon: IconUser, label: "Profile" },
      ]
    : [
        { name: "/Login", icon: IconLogin, label: "Login" },
        { name: "/Register", icon: IconUserPlus, label: "Register" },
      ];

  return (
    <Menu offset={22} withArrow shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon
          color="rgba(0, 0, 0, 1)"
          variant="white"
          aria-label="hammenu"
        >
          <IconMenu2 stroke={2} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Navigate</Menu.Label>
        {menuItems.map((item) => (
          <Menu.Item
            key={item.label}
            // onClick={() => navigate(item.name)}
            leftSection={
              <item.icon
                style={{ width: rem(14), height: rem(14) }}
                color={item.name === "/Favorites" ? "red" : undefined}
              />
            }
          >
            {item.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
