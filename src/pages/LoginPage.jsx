import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import styled from "styled-components";

const LoginContainer = styled.div`
  background: url("https://plus.unsplash.com/premium_photo-1684581214880-2043e5bc8b8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmxvZyUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D")
    no-repeat center center fixed;
  background-size: cover;
  height: 91.5vh;
  max-height: 100vh; /* Ensure it doesn't exceed the viewport */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px; /* Padding for small screens */

  @media (max-width: 600px) {
    padding: 10px; /* Less padding on smaller screens */
  }
`;

const LoginForm = styled.form`
  background-color: rgba(255, 255, 255, 0.9);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 600px) {
    padding: 20px; /* Smaller padding for mobile */
  }
`;

const Title = styled.h1`
  font-size: 2.5em;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
  background: linear-gradient(90deg, #4e54c8, #8f94fb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 600px) {
    font-size: 2em; /* Smaller font size on mobile */
  }
`;

const Input = styled.input`
  width: 92%;
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 1em;
  color: #333;
  background-color: rgba(255, 255, 255, 0.8);

  &:focus {
    outline: none;
    border-color: #4e54c8;
    box-shadow: 0 0 10px rgba(78, 84, 200, 0.5);
  }

  @media (max-width: 600px) {
    padding: 10px; /* Less padding on smaller screens */
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  background: linear-gradient(90deg, #4e54c8, #8f94fb);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 1.2em;
  cursor: pointer;
  transition: background 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

  &:hover {
    background: linear-gradient(90deg, #3e42a1, #6a7eff);
  }

  &:active {
    transform: translateY(2px);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 600px) {
    padding: 12px; /* Less padding on smaller screens */
    font-size: 1em; /* Smaller font size */
  }
`;

const TextLink = styled.p`
  text-align: center;
  margin-top: 20px;
  color: #555;

  a {
    color: #4e54c8;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 600px) {
    margin-top: 15px; /* Less margin on smaller screens */
  }
`;

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  async function login(ev) {
    ev.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      const userInfo = await response.json();
      localStorage.setItem("token", userInfo.token);
      setUserInfo(userInfo);
      setRedirect(true);
    } else {
      alert("Wrong credentials");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <LoginContainer>
      <LoginForm onSubmit={login}>
        <Title>Welcome Back!</Title>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
          style={{ marginBottom: "30px", marginTop: "20px" }}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          style={{ marginBottom: "30px" }}
        />
        <Button type="submit">Login</Button>
        <TextLink>
          Don&apos;t have an account? <a href="/register">Register</a>
        </TextLink>
      </LoginForm>
    </LoginContainer>
  );
}
