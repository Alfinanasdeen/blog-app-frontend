import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";
import styled from "styled-components";

// Styled components
const PostPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px; /* Added space to the top */
  background-color: #f4f4f4; /* Light background */
  max-width: 800px; /* Limit the width of the post page */
  margin: auto; /* Center the post page */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  overflow: visible;
`;

const Title = styled.h1`
  font-size: 2.5em; /* Larger title */
  color: #333; /* Dark color */
  margin-bottom: 10px; /* Space below title */
  text-align: center; /* Center text */
`;

const DateAuthorContainer = styled.div`
  font-size: 1em; /* Normal size for date and author */
  color: #777; /* Grey color */
  margin-bottom: 20px; /* Space below author/date */
`;

const EditButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  background: linear-gradient(
    90deg,
    #4e54c8,
    #8f94fb
  ); /* Gradient background */
  color: white; /* White text */
  padding: 8px 12px; /* Adjusted padding for a more compact button */
  border-radius: 5px; /* Rounded corners */
  text-decoration: none; /* No underline */
  margin-bottom: 20px; /* Space below button */
  font-size: 0.9em; /* Slightly smaller font size for the button text */
  transition: background 0.3s; /* Smooth transition for hover effect */

  &:hover {
    opacity: 0.9; /* Slightly fade on hover */
  }

  svg {
    margin-right: 5px; /* Space between icon and text */
    width: 1em; /* Set icon size */
    height: 1em; /* Set icon size */
  }
`;

const ImageContainer = styled.div`
  width: 100%; /* Full width */
  max-height: 400px; /* Limit height to 400px */
  border-radius: 8px; /* Rounded corners */
  overflow: hidden; /* Ensure no overflow */
  margin-bottom: 20px; /* Space below image */
`;

const PostImage = styled.img`
  width: 100%; /* Full width */
  height: auto; /* Maintain aspect ratio */
  display: block; /* Ensure no extra space below image */
`;

const Content = styled.div`
  font-size: 1em; /* Normal font size */
  color: #444; /* Dark grey text */
  line-height: 1.6; /* Line height for readability */
  background-color: #fff; /* White background for content */
  padding: 20px; /* Padding for content */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  /* Removed max-height and overflow-y */
`;

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/post/${id}`).then(
      (response) => {
        response.json().then((postInfo) => {
          setPostInfo(postInfo);
        });
      }
    );
  }, [id]);

  if (!postInfo) return "";

  return (
    <PostPageContainer>
      <Title>{postInfo.title}</Title>
      <DateAuthorContainer>
        <time>{formatISO9075(new Date(postInfo.createdAt))}</time> by @
        {postInfo.author.username}
      </DateAuthorContainer>
      {userInfo.id === postInfo.author._id && (
        <EditButton to={`/edit/${postInfo._id}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
          Edit this post
        </EditButton>
      )}
      <ImageContainer>
        <PostImage
          src={`${import.meta.env.VITE_API_BASE_URL}/${postInfo.cover}`}
          alt={postInfo.title}
        />
      </ImageContainer>
      <Content dangerouslySetInnerHTML={{ __html: postInfo.content }} />
    </PostPageContainer>
  );
}
