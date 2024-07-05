import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Blog: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<any>(null); // Update type as per your blog structure

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/blog/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return <p>Loading...</p>; // You can also handle error states here
  }

  const contentElements = blog.content
    .split("\n")
    .map((line: string, index: number) => {
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
      <img src={blog.img} alt={blog.title} />
      <h2 className="text-4xl font-semibold">{blog.title}</h2>
      <p className="text-sm text-gray-500">
        By {blog.author} on {blog.date}
      </p>
      <div className="blog-content mt-4">{contentElements}</div>
    </article>
  );
};

export default Blog;
