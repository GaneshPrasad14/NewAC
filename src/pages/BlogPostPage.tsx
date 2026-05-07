import { useParams, Navigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Breadcrumb from "@/components/Breadcrumb";
import FAQAccordion from "@/components/FAQAccordion";
import CTASection from "@/components/CTASection";
import blogsData from "@/data/blogs.json";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const blog = blogsData.find((b) => b.slug === slug);

  if (!blog) return <Navigate to="/blog" replace />;

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: blog.title,
      author: { "@type": "Person", name: blog.author },
      datePublished: blog.date,
    },
    ...(blog.faqs.length > 0
      ? [{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: blog.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }]
      : []),
  ];

  return (
    <>
      <SEOHead
        title={`${blog.title} | SwiftCare™ Blog`}
        description={blog.excerpt}
        canonical={`/blog/${blog.slug}`}
        schema={schema}
      />

      <div className="container mx-auto px-4">
        <Breadcrumb items={[{ label: "Blog", href: "/blog" }, { label: blog.title }]} />
      </div>

      <article className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <span className="text-sm text-muted-foreground">{blog.date} · {blog.author}</span>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-8">{blog.title}</h1>

          <div className="prose max-w-none text-muted-foreground leading-relaxed">
            {blog.content.split("\n\n").map((para, i) => {
              if (para.startsWith("## ")) {
                return <h2 key={i} className="font-display text-xl font-bold text-foreground mt-8 mb-3">{para.replace("## ", "")}</h2>;
              }
              if (para.startsWith("### ")) {
                return <h3 key={i} className="font-display text-lg font-bold text-foreground mt-6 mb-2">{para.replace("### ", "")}</h3>;
              }
              return <p key={i} className="mb-4">{para}</p>;
            })}
          </div>

          {blog.faqs.length > 0 && (
            <div className="mt-12">
              <FAQAccordion faqs={blog.faqs} title="Frequently Asked Questions" />
            </div>
          )}
        </div>
      </article>

      <CTASection />
    </>
  );
};

export default BlogPostPage;
