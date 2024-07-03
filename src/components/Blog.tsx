import blogs from "@/dummyBlogs.json";
import { useParams } from "react-router-dom";

const Blog: React.FC = () => {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === id);
  if (!blog) {
    return <p>Blog post not found.</p>;
  }

  const contentElements = blog.content.split("\n").map((line, index) => {
    if (line.startsWith("# ")) {
      return (
        <h3 key={index} className="text-3xl font-semibold my-4">
          {line.substring(2)}
        </h3>
      );
    }
    return (
      <p key={index} className="mt-2 text-xl">
        {line}
      </p>
    );
  });

  return (
    <article className="blog-post mx-96 mt-16 flex flex-col">
      <img src={blog?.image} alt={blog?.title} />
      <h2 className="text-4xl font-semibold">{blog?.title}</h2>
      <p className="text-sm text-gray-500">
        By {blog?.author} on {blog?.date}
      </p>
      <div className="blog-content mt-4">{contentElements}</div>
    </article>
  );
};

export default Blog;
