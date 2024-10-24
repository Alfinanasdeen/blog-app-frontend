import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import styled from "styled-components";
import {
  FaPlusCircle,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
} from "react-icons/fa";

// Styled components
const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  background: linear-gradient(90deg, #4e54c8, #8f94fb);
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }
`;

const Logo = styled(Link)`
  font-size: 28px;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #ffeb3b; /* Highlight color */
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  font-size: 16px;
  border: 2px solid transparent;
  border-radius: 5px;
  padding: 8px 12px;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1); /* Light background on hover */
    border-color: #ffeb3b; /* Highlight border color */
  }
`;

const LogoutLink = styled.a`
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 2px solid transparent;
  border-radius: 5px;
  padding: 8px 12px;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-color: #ffeb3b; /* Highlight border color */
  }
`;

// Icon styles
const Icon = styled.span`
  margin-right: 5px;
`;

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((userInfo) => {
          setUserInfo(userInfo);
        })
        .catch((err) => {
          console.error("Failed to fetch user profile:", err);
          setUserInfo(null);
        });
    }
  }, [setUserInfo]);

  function logout() {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => {
          localStorage.removeItem("token");
          setUserInfo(null);
        })
        .catch((err) => {
          console.error("Logout failed:", err);
        });
    }
  }

  const username = userInfo?.username;

  return (
    <HeaderContainer>
      <Logo to="/">StoryHub</Logo>
      <Nav>
        {username ? (
          <>
            <NavLink to="/create">
              <Icon>
                <FaPlusCircle />
              </Icon>
              Create new post
            </NavLink>
            <LogoutLink onClick={logout}>
              <Icon>
                <FaSignOutAlt />
              </Icon>
              Logout ({username})
            </LogoutLink>
          </>
        ) : (
          <>
            <NavLink to="/login">
              <Icon>
                <FaSignInAlt />
              </Icon>
              Login
            </NavLink>
            <NavLink to="/register">
              <Icon>
                <FaUserPlus />
              </Icon>
              Register
            </NavLink>
          </>
        )}
      </Nav>
    </HeaderContainer>
  );
}
