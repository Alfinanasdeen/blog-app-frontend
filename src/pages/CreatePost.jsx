import "react-quill-new/dist/quill.snow.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";
import styled from "styled-components";

// Styled components
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px; /* Padding inside the container */
  background-color: #f4f4f4; /* Light background */
  max-width: 800px; /* Max width for the form */
  margin: 60px auto; /* Center form and add space at the top */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd; /* Light border */
  border-radius: 5px; /* Rounded corners */
  font-size: 1em; /* Normal font size */
  &:focus {
    border-color: #4e54c8; /* Change border color on focus */
    outline: none; /* Remove outline */
  }
`;

const SummaryInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd; /* Light border */
  border-radius: 5px; /* Rounded corners */
  font-size: 1em; /* Normal font size */
  &:focus {
    border-color: #4e54c8; /* Change border color on focus */
    outline: none; /* Remove outline */
  }
`;

const FileInput = styled.input`
  margin: 10px 0; /* Space above and below */
`;

const CreateButton = styled.button`
  background: linear-gradient(
    90deg,
    #4e54c8,
    #8f94fb
  ); /* Gradient background */
  color: white; /* White text */
  padding: 10px 20px; /* Padding for button */
  border: none; /* No border */
  border-radius: 5px; /* Rounded corners */
  font-size: 1em; /* Normal font size */
  cursor: pointer; /* Pointer cursor on hover */
  transition: background 0.3s; /* Smooth transition for hover effect */
  margin-top: 10px; /* Space above button */

  &:hover {
    opacity: 0.9; /* Slightly fade on hover */
  }
`;

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    if (files[0]) {
      data.set("file", files[0]);
    }

    const token = localStorage.getItem("token");
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/post`, {
      method: "POST",
      body: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <FormContainer>
      <form onSubmit={createNewPost} style={{ width: "100%" }}>
        <TitleInput
          type="text"
          placeholder={"Title"}
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <SummaryInput
          type="text"
          placeholder={"Summary"}
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)}
        />
        <FileInput type="file" onChange={(ev) => setFiles(ev.target.files)} />
        <Editor value={content} onChange={setContent} />
        <CreateButton>Create post</CreateButton>
      </form>
    </FormContainer>
  );
}
