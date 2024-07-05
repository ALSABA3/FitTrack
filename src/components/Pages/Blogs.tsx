import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BlogSideFilter from "@/components/BlogSideFilter";

interface Blog {
  _id: string;
  title: string;
  description: string;
  img: string;
  category: string[];
}

const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filters, setFilters] = useState<{ category: string[] }>({
    category: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get<Blog[]>("http://localhost:4000/blog");
        setBlogs(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleFilterChange = (newFilters: { category: string[] }) => {
    setFilters(newFilters);
  };

  const filteredBlogs = blogs.filter((blog) => {
    const categoryMatch =
      filters.category.length === 0 ||
      filters.category.some((category) => blog.category.includes(category));
    return categoryMatch;
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading blogs. Please try again later.</div>;
  }

  return (
    <section id="blogs" className="flex flex-col mt-20">
      <h2 className="text-5xl font-semibold mb-24 text-center">Blogs</h2>
      <div className="flex">
        <BlogSideFilter onFilterChange={handleFilterChange} />
        <div className="blogs-list mx-auto w-3/4 flex">
          {filteredBlogs.map((blog) => (
            <Card key={blog._id} className="max-w-96 m-4">
              <CardHeader>
                <img src={blog.img} alt={blog.title} className="" />
              </CardHeader>
              <CardContent>
                <CardTitle className="mb-2">{blog.title}</CardTitle>
                <CardDescription className="mt-2">
                  {blog.description}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Link to={`/blogs/${blog._id}`}>Read More</Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
