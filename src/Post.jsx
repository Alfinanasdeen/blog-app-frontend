import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

export default function Post({
  _id,
  title,
  summary,
  cover,
  content,
  createdAt,
  author,
}) {
  const imageUrl = `${import.meta.env.VITE_API_BASE_URL}/${cover.replace(
    /\\/g,
    "/"
  )}`;

  return (
    <div className="post" style={{ display: "flex", margin: "20px" }}>
      <div
        className="image"
        style={{
          flex: 1,
          maxWidth: "300px",
          paddingLeft: "50px",
          marginBottom: "50px",
        }}
      >
        
        <Link to={`/post/${_id}`}>
          <img
            src={imageUrl}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Link>
      </div>
      
      <div
        className="texts"
        style={{ flex: 2, paddingLeft: "150px", marginTop: "20px" }}
      >
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <a className="author">{author.username}</a>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
      
    </div>
    
  );
}
