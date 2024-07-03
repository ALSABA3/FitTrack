import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import blogs from "@/dummyBlogs.json";
import BlogSideFilter from "@/components/BlogSideFilter";
import { Link } from "react-router-dom";
import { useState } from "react";

const Blogs: React.FC = () => {
  const [filters, setFilters] = useState({
    type: [],
  });

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const filteredBlogs = blogs.filter((blog) => {
    const typeMatch = filters.type.length
      ? filters.type.some((type) => blog.type.includes(type))
      : true;
    return typeMatch;
  });
  return (
    <section id="blogs" className="flex flex-col mt-20">
      <h2 className="text-5xl font-semibold mb-24 text-center">Blogs</h2>
      <div className="flex">
        <BlogSideFilter onFilterChange={handleFilterChange} />
        <div className="blogs-list mx-auto w-3/4 flex">
          {filteredBlogs.map((blog) => (
            <Card key={blog.id} className="max-w-96 m-4">
              <CardHeader>
                <img src={blog.image} alt={blog.title} className="" />
              </CardHeader>
              <CardContent>
                <CardTitle className="mb-2">{blog.title}</CardTitle>
                <CardDescription className="mt-2">
                  {blog.description}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Link to={blog.id}>Read More</Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
