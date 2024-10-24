import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
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
  margin: 60px auto 0; /* Center form and add space at the top */
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
`;

const SummaryInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd; /* Light border */
  border-radius: 5px; /* Rounded corners */
  font-size: 1em; /* Normal font size */
`;

const FileInput = styled.input`
  margin: 10px 0; /* Space above and below */
`;

const UpdateButton = styled.button`
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

  &:hover {
    opacity: 0.9; /* Slightly fade on hover */
  }
`;

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/post/${id}`).then(
      (response) => {
        if (response.ok) {
          response.json().then((postInfo) => {
            setTitle(postInfo.title);
            setContent(postInfo.content);
            setSummary(postInfo.summary);
          });
        } else {
          console.error("Failed to fetch post info");
        }
      }
    );
  }, [id]);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }

    const token = localStorage.getItem("token");
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/post/${id}`,
      {
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      setRedirect(true);
    } else {
      const errorMessage = await response.text();
      console.error("Error updating post:", errorMessage);
    }
  }

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }

  return (
    <FormContainer>
      <form onSubmit={updatePost} style={{ width: "100%" }}>
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
        <FileInput
          type="file"
          accept="image/*"
          onChange={(ev) => setFiles(ev.target.files)}
        />
        <Editor onChange={setContent} value={content} />
        <UpdateButton style={{ marginTop: "20px" }}>Update post</UpdateButton>
      </form>
    </FormContainer>
  );
}
