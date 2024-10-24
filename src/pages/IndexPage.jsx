import Post from "../Post";
import { useEffect, useState } from "react";
import styled from "styled-components";

// Styled components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f4f4f4; /* Light background color */
`;

const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(1500px, 1fr)
  ); 
  gap: 20px;
  width: 100%;
  max-width: 1200px; /* Limit the maximum width */
`;

const NoPostsMessage = styled.div`
  font-size: 24px;
  color: #333;
  margin-top: 40px;
  text-align: center;
`;

// Main component
export default function IndexPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/post`)
      .then((response) => response.json())
      .then((posts) => {
        setPosts(posts);
      })
      .catch((err) => {
        console.error("Failed to fetch posts:", err);
      });
  }, []);

  return (
    <PageContainer>
      {posts.length > 0 ? (
        <PostsGrid>
          {posts.map((post) => (
            <Post key={post._id} {...post} />
          ))}
        </PostsGrid>
      ) : (
        <NoPostsMessage>No posts available at the moment.</NoPostsMessage>
      )}
    </PageContainer>
  );
}
