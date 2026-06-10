"use client";

import { motion } from "framer-motion";
import { blogPosts } from "@/lib/data/blogPosts";
import { useLanguage } from "@/lib/context/LanguageContext";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowUpRight, Clock, Calendar } from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  const { language } = useLanguage();

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-extrabold mb-1 text-zinc-900 dark:text-white">
          {language === "en" ? "Blog" : "Blog"}
        </h1>
        <p className="text-sm text-zinc-500">
          {language === "en"
            ? "Thoughts on full-stack development, shipping production systems, and building for real users."
            : "Pemikiran tentang full-stack development, mengirim sistem production, dan membangun untuk user nyata."}
        </p>
      </motion.div>

      <div className="space-y-4">
        {blogPosts.map((post, index) => (
          <ScrollReveal key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group block bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h2 className="font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                    <div className="flex gap-1.5">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-zinc-200 dark:bg-zinc-800 rounded-full text-[10px] font-medium text-zinc-600 dark:text-zinc-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-500 transition-colors shrink-0 mt-1" />
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
