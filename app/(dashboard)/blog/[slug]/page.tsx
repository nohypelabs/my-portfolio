"use client";

import { useParams } from "next/navigation";
import { blogPosts } from "@/lib/data/blogPosts";
import { useLanguage } from "@/lib/context/LanguageContext";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

function renderMarkdown(content: string) {
  return content
    .split("\n\n")
    .map((block, i) => {
      // Headers
      if (block.startsWith("### ")) {
        return `<h3 class="text-lg font-bold text-neutral-900 mt-6 mb-2">${block.slice(4)}</h3>`;
      }
      if (block.startsWith("## ")) {
        return `<h2 class="text-xl font-bold text-neutral-900 mt-8 mb-3">${block.slice(3)}</h2>`;
      }
      // Table
      if (block.includes("|")) {
        const rows = block.split("\n").filter((r) => !r.match(/^\|[\s-|]+\|$/));
        if (rows.length > 0) {
          const headerCells = rows[0].split("|").filter(Boolean).map((c) => c.trim());
          const bodyRows = rows.slice(1).map((r) => r.split("|").filter(Boolean).map((c) => c.trim()));
          return `<div class="overflow-x-auto my-4"><table class="w-full text-sm border-collapse">
            <thead><tr>${headerCells.map((c) => `<th class="text-left p-2 border-b-2 border-neutral-400 font-semibold">${c}</th>`).join("")}</tr></thead>
            <tbody>${bodyRows.map((r) => `<tr>${r.map((c) => `<td class="p-2 border-b border-neutral-400">${c}</td>`).join("")}</tr>`).join("")}</tbody>
          </table></div>`;
        }
      }
      // Ordered list
      if (block.match(/^\d+\./m)) {
        const items = block.split("\n").map((line) => {
          const text = line.replace(/^\d+\.\s*/, "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
          return `<li class="mb-1">${text}</li>`;
        });
        return `<ol class="list-decimal list-inside space-y-1 text-neutral-900 my-3">${items.join("")}</ol>`;
      }
      // Unordered list
      if (block.match(/^[-*]/m)) {
        const items = block.split("\n").map((line) => {
          const text = line.replace(/^[-*]\s*/, "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
          return `<li class="mb-1">${text}</li>`;
        });
        return `<ul class="list-disc list-inside space-y-1 text-neutral-900 my-3">${items.join("")}</ul>`;
      }
      // Regular paragraph
      const formatted = block
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 bg-[#FAFAFA] rounded text-sm font-mono text-[#c4956a]">$1</code>');
      return `<p class="text-neutral-900 leading-relaxed my-3">${formatted}</p>`;
    })
    .join("");
}

export default function BlogPostPage() {
  const params = useParams();
  const { language } = useLanguage();
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <h1 className="text-2xl font-bold text-neutral-900 mb-4">
          {language === "en" ? "Post not found" : "Artikel tidak ditemukan"}
        </h1>
        <Link href="/blog" className="text-[#c4956a] hover:underline">
          ← {language === "en" ? "Back to blog" : "Kembali ke blog"}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-[#c4956a] transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {language === "en" ? "Back to blog" : "Kembali ke blog"}
        </Link>

        <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900 mb-4">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-500 mb-8 pb-6 border-b border-neutral-400">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime}
          </span>
          <div className="flex gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-[#FAFAFA] border border-neutral-400 rounded-full text-xs font-medium text-neutral-900"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <article
        className="prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
      />
    </div>
  );
}
