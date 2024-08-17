import { Menu, rem, ActionIcon, Avatar } from "@mantine/core";
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
import useAuth from "../../../Hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../../../firebase";
import { SignOut, UserCircle } from "@phosphor-icons/react";
import { notifications } from "@mantine/notifications";

export default function ProfileMenu() {
  const { isLoggedIn, user, loading } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        notifications.show({
          title: "User Logged out",
          message: "You have successfully logged out",
          color: "gray",
          position: "bottom-center",
        });
        navigate("/");
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(error);
        // An error happened.
      });
  };
  return (
    <Menu offset={22} withArrow shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon
          ml={"5px"}
          size={35}
          radius={100}
          variant="white"
          aria-label="hammenu"
        >
          <Avatar
            style={{
              cursor: "pointer",
            }}
            src={user?.photoURL}
            radius="xl"
            size="md"
          />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          // onClick={() => navigate(item.name)}
          leftSection={<UserCircle size={20} />}
        >
          View Profile
        </Menu.Item>

        <Menu.Item
          onClick={() => {
            handleLogout();
          }}
          leftSection={<SignOut size={20} />}
        >
          Log out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
