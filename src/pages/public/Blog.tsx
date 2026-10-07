import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";
import { blogPosts } from "@/data/mockData";
import { Link } from "react-router-dom";
import blogHero from "@/assets/blog-hero-v2.jpg";

const categories = ["All", "Cardiology", "Oncology", "Wellness", "Pediatrics", "Orthopedics", "Women's Health"];

const Blog = () => {
  useScrollTop();
  const [filter, setFilter] = useState("All");
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const filtered = blogPosts.filter((post) => {
    const categoryMatch = filter === "All" || post.category === filter;
    const searchMatch = `${post.title} ${post.excerpt} ${post.author} ${post.category}`.toLowerCase().includes(search.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <div>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <img src={blogHero} alt="" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-teal-900/80 to-slate-900/85" />
        <div className="container-main text-center relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl lg:text-5xl font-bold text-white mb-4">Health & Wellness Blog</motion.h1>
          <p className="text-slate-300 max-w-xl mx-auto">Expert insights and guidance from our medical specialists.</p>
        </div>
      </section>

      <section className="py-6 bg-card border-b border-border sticky top-[60px] z-30">
        <div className="container-main flex flex-wrap gap-2">
          {categories.map((c) => (
            <button key={c} onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === c ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container-main">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filtered.map((post) => (
                  <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <Link to={`/blog/${post.slug}`} className="rounded-xl bg-card border border-border overflow-hidden card-hover block group">
                    <div className="h-40 overflow-hidden">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={1152} height={768} />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">{post.category}</span>
                        <span className="text-xs text-muted-foreground">{post.readTime}</span>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{post.date}</span>
                        <span className="inline-flex items-center text-xs font-medium text-primary gap-1 group-hover:gap-2 transition-all">Read More <ArrowRight size={12} /></span>
                      </div>
                    </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            <aside className="w-full lg:w-72 shrink-0 space-y-6">
              <div className="rounded-xl bg-card border border-border p-5">
                <h3 className="font-semibold text-foreground mb-3">Search</h3>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border">
                  <Search size={16} className="text-muted-foreground" />
                  <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search posts..." className="flex-1 text-sm bg-transparent text-foreground placeholder-muted-foreground focus:outline-none" />
                </div>
              </div>
              <div className="rounded-xl bg-card border border-border p-5">
                <h3 className="font-semibold text-foreground mb-3">Recent Posts</h3>
                <div className="space-y-3">
                  {blogPosts.slice(0, 3).map((post) => (
                    <Link key={post.id} to={`/blog/${post.slug}`} className="block text-sm text-muted-foreground hover:text-primary transition-colors">{post.title}</Link>
                  ))}
                </div>
              </div>
              <div className="rounded-xl bg-primary/5 border border-primary/20 p-5">
                <h3 className="font-semibold text-foreground mb-2">Newsletter</h3>
                <p className="text-xs text-muted-foreground mb-3">Get weekly health tips delivered to your inbox.</p>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-card text-sm text-foreground mb-2 focus:outline-none" />
                <button type="button" onClick={() => email && setSubscribed(true)} className="w-full py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-50" disabled={!email}>Subscribe</button>
                {subscribed && <p className="text-xs text-primary mt-3">Thanks — you're subscribed.</p>}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
