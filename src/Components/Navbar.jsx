import { useState } from "react";
import {
  BowlSteam,
  Heart,
  House,
  PlusCircle,
  UserCircle,
} from "@phosphor-icons/react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { useViewportSize } from "@mantine/hooks";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Replace with actual login state
  const { width } = useViewportSize();

  const navItems = [
    { path: "/", icon: House, label: "Home" },
    { path: "/Add Recipe", icon: PlusCircle, label: "Add Recipe" },
    { path: "/Favorites", icon: Heart, label: "Favorites", color: "red" },
    { path: "/Profile", icon: UserCircle, label: "Nawang" },
  ];

  return (
    <div
      style={{
        top: "0",
        left: "0",
        right: "0",
        position: "sticky",
        backgroundColor: "white",
        zIndex: "999",
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
          {!isLoggedIn ? (
            <>
              <div
                style={{
                  cursor: "pointer",
                  padding: "5px 15px",
                  border: "1px solid #e0e0e0",
                  borderRadius: "5px",
                  marginLeft: "5px",
                }}
                onClick={() => navigate("/Login")}
              >
                Login
              </div>
              <div
                style={{
                  cursor: "pointer",
                  padding: "5px 15px",
                  border: "1px solid #e0e0e0",
                  borderRadius: "5px",
                  marginLeft: "5px",
                }}
                onClick={() => navigate("/Register")}
              >
                Register
              </div>
            </>
          ) : (
            <>
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.path}
                  style={({ isActive }) => ({
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                    cursor: "pointer",
                    padding: "5px 15px",
                    fontWeight: isActive ? "bold" : "500",
                    color: isActive && item.color ? item.color : undefined,
                    textDecoration: "none",
                  })}
                  end
                >
                  <item.icon
                    size={22}
                    weight={item.path === location.pathname ? "fill" : "regular"}
                  />
                  {width >= 780 && (
                    <p
                      style={{
                        fontSize: "17px",
                        fontWeight: item.path === location.pathname ? "bold" : "500",
                      }}
                    >
                      {item.label}
                    </p>
                  )}
                </NavLink>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
