import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Breadcrumb from "@/components/Breadcrumb";
import blogsData from "@/data/blogs.json";

const BlogListPage = () => (
  <>
    <SEOHead
      title="Blog | AC Tips, Maintenance Guides & Expert Advice"
      description="Read expert tips on AC maintenance, appliance care, and energy saving. Stay informed with guides from our experienced technicians."
      canonical="/blog"
    />

    <div className="container mx-auto px-4">
      <Breadcrumb items={[{ label: "Blog" }]} />
    </div>

    <section className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-10">Blog</h1>
        <div className="grid md:grid-cols-2 gap-8">
          {blogsData.map((blog) => (
            <Link key={blog.slug} to={`/blog/${blog.slug}`} className="card-service group block">
              <span className="text-xs text-muted-foreground">{blog.date}</span>
              <h2 className="font-display text-xl font-bold text-foreground mt-1 mb-2 group-hover:text-primary transition-colors">{blog.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{blog.excerpt}</p>
              <span className="inline-block mt-3 text-sm font-semibold text-primary">Read More →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default BlogListPage;
