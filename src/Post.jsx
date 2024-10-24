import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Styled components
const PostContainer = styled.div`
  display: flex;
  margin: 20px;
  margin-right: 30px;
  background-color: #fff; /* White background for post */
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  overflow: hidden; /* Ensures the border radius is applied correctly */
  max-width: 1000px;
  transition: transform 0.2s; /* Animation effect on hover */

  &:hover {
    transform: scale(1.02); /* Scale effect on hover */
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  max-width: 150px; /* Maximum width for image */
  padding: 20px; /* Padding around the image */
`;

const PostImage = styled.img`
  width: 100%;
  height: auto; /* Auto height to maintain aspect ratio */
  border-radius: 10px; /* Rounded corners for the image */
  object-fit: cover; /* Cover for image fitting */
`;

const Texts = styled.div`
  flex: 2;
  padding: 20px; /* Padding around text */
`;

const Title = styled.h2`
  margin: 0 0 10px; /* Margin below title */
  font-size: 1.5em; /* Title size */
  color: #333; /* Dark title color */
`;

const Info = styled.p`
  font-size: 0.9em; /* Smaller font size for info */
  color: #777; /* Grey color for info text */
  margin: 0 0 10px; /* Margin below info */
`;

const Summary = styled.p`
  font-size: 1em; /* Summary font size */
  color: #555; /* Dark grey color for summary */
  overflow: hidden; /* Hide overflow */
  text-overflow: ellipsis; /* Ellipsis for overflow text */
  display: -webkit-box; /* For multiline truncation */
  -webkit-line-clamp: 3; /* Limit to 3 lines */
  -webkit-box-orient: vertical; /* Required for multiline truncation */
`;

export default function Post({
  _id,
  title,
  summary,
  cover,
  createdAt,
  author,
}) {
  const imageUrl = `${import.meta.env.VITE_API_BASE_URL}/${cover.replace(
    /\\/g,
    "/"
  )}`;

  return (
    <PostContainer>
      <ImageWrapper>
        <Link to={`/post/${_id}`}>
          <PostImage src={imageUrl} alt={title} />
        </Link>
      </ImageWrapper>

      <Texts>
        <Link to={`/post/${_id}`}>
          <Title>{title}</Title>
        </Link>
        <Info>
          <span className="author">{author.username}</span> -{" "}
          <time>{formatISO9075(new Date(createdAt))}</time>
        </Info>
        <Summary>{summary}</Summary>
      </Texts>
    </PostContainer>
  );
}
