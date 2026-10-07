import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { blogPosts } from "@/data/mockData";

gsap.registerPlugin(ScrollTrigger);

const BlogSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".blog-card", {
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
        y: 40, duration: 0.5, stagger: 0.12, clearProps: "transform",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-20 bg-muted/50">
      <div className="container-main">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary mb-2">Latest Insights</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Health & Wellness Blog</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.slice(0, 3).map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="blog-card rounded-xl bg-card border border-border overflow-hidden card-hover block group">
              <div className="h-40 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" width={1152} height={768} />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">{post.category}</span>
                  <span className="text-xs text-muted-foreground">{post.readTime}</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                <span className="inline-flex items-center text-sm font-medium text-primary gap-1 group-hover:gap-2 transition-all">
                  Read More <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
