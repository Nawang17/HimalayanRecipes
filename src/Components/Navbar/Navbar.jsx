import { useState } from "react";
import { BowlSteam, Heart, House, PlusCircle } from "@phosphor-icons/react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { useViewportSize } from "@mantine/hooks";
import useAuth from "../../Hooks/useAuth";
import { Button } from "@mantine/core";
import ProfileMenu from "./Components/Profilemenu";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { width } = useViewportSize();
  const [activePage, setActivePage] = useState(location.pathname);

  const navItems = [
    { name: "/", icon: House, label: "Home", color: "black" },
    {
      name: "/CreateRecipe",
      icon: PlusCircle,
      label: "Create Recipe",
      color: "black",
    },
    { name: "/Favorites", icon: Heart, label: "Favorites", color: "red" },
  ];

  const authItems = [
    { name: "/login", label: "Login" },
    { name: "/register", label: "Register" },
  ];

  return (
    <div
      style={{
        top: "0",
        left: "0",
        right: "0",
        position: "sticky",
        backgroundColor: "white",
        zIndex: "888",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <div
        style={{
          padding: "20px 10px",
          maxWidth: "960px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <BowlSteam size={32} />
          <p
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "#003366",
            }}
          >
            HimalayaEats
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {isLoggedIn &&
            navItems.map((item) => {
              const isActive = activePage === item.name;
              return (
                <NavLink
                  key={item.label}
                  to={item.name}
                  onClick={() => {
                    navigate(item.name);
                    setActivePage(item.name);
                  }}
                  style={{
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                    cursor: "pointer",
                    padding: "5px 15px",
                    fontWeight: isActive ? "bold" : "500",
                    color: isActive && item.color ? item.color : "black",
                    textDecoration: "none",
                  }}
                >
                  <item.icon
                    size={width > 780 ? 24 : 30}
                    weight={isActive ? "fill" : "regular"}
                    color={
                      item.name === "/Favorites" && isActive ? "red" : undefined
                    }
                  />
                  {width > 780 && (
                    <p
                      style={{
                        fontSize: "17px",
                        fontWeight: isActive ? "bold" : "500",
                      }}
                    >
                      {item.label}
                    </p>
                  )}
                </NavLink>
              );
            })}

          {!isLoggedIn &&
            authItems.map((item, key) => (
              <Button
                onClick={() => navigate(item.name)}
                mr={10}
                color={key === 0 ? "black" : "blue"}
                variant={key === 0 ? "outline" : "filled"}
                key={key}
              >
                {item.label}
              </Button>
            ))}
          {isLoggedIn && <ProfileMenu />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
