import { ArrowLeft, ArrowRight, Calendar, Clock, User } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { blogPosts } from "@/data/mockData";
import { useScrollTop } from "@/hooks/useScrollTop";

const BlogPost = () => {
  useScrollTop();
  const { slug } = useParams();
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  const relatedPosts = blogPosts.filter((item) => item.slug !== post.slug && item.category === post.category).slice(0, 2);

  return (
    <div>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover" width={1152} height={768} />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/75 to-slate-900/85" />
        <div className="container-main relative z-10 max-w-4xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft size={16} /> Back to Blog
          </Link>
          <span className="inline-flex px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold mb-5">{post.category}</span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-5 max-w-3xl">{post.title}</h1>
          <div className="flex flex-wrap gap-5 text-sm text-white/80">
            <span className="inline-flex items-center gap-2"><User size={16} /> {post.author}</span>
            <span className="inline-flex items-center gap-2"><Calendar size={16} /> {post.date}</span>
            <span className="inline-flex items-center gap-2"><Clock size={16} /> {post.readTime}</span>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container-main max-w-4xl">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_280px] gap-10 items-start">
            <article className="space-y-8">
              <p className="text-lg text-muted-foreground leading-8">{post.excerpt}</p>

              <div className="rounded-2xl border border-border bg-card p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">Key takeaways</h2>
                <ul className="space-y-3">
                  {post.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-muted-foreground">
                      <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                {post.content.map((paragraph, index) => (
                  <p key={index} className="text-base leading-8 text-muted-foreground">{paragraph}</p>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/book" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
                  Book Consultation <ArrowRight size={16} />
                </Link>
                <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-semibold hover:bg-muted transition-colors">
                  Contact Care Team
                </Link>
              </div>
            </article>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">Need expert guidance?</h3>
                <p className="text-sm text-muted-foreground mb-4">Our specialists can help you understand symptoms, preventive care, and next steps.</p>
                <Link to="/book" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
                  Schedule a visit <ArrowRight size={14} />
                </Link>
              </div>

              {relatedPosts.length > 0 && (
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Related articles</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((item) => (
                      <Link key={item.slug} to={`/blog/${item.slug}`} className="block group">
                        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{item.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{item.readTime}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;