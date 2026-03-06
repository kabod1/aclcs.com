"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { use } from "react";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Tag,
  ArrowRight,
  MessageCircle,
  Share2,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import {
  getBlogPostBySlug,
  getRelatedPosts,
  BLOG_POSTS,
} from "@/lib/blog-data";
import { WHATSAPP_LINK } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogPostPage({ params }: PageProps) {
  const { slug } = use(params);
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);
  const currentIndex = BLOG_POSTS.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null;
  const nextPost =
    currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : null;

  return (
    <>
      {/* Article Hero */}
      <section className="relative bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="relative container-wide px-4 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors mb-6"
            >
              <ArrowLeft size={16} />
              Back to Blog
            </Link>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-xs font-semibold text-brand-300 bg-brand-500/20 px-3 py-1.5 rounded-full border border-brand-500/30">
                {post.category}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {post.title}
            </h1>
            <p className="mt-5 text-lg text-white/50 leading-relaxed">
              {post.excerpt}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-white/40 text-sm">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {post.publishDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {post.readTime}
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen size={14} />
                ACLCS Editorial Team
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-[1fr_320px] gap-12">
            {/* Article body */}
            <div>
              {/* Article content */}
              <div
                className="prose prose-lg max-w-none
                  prose-headings:font-bold prose-headings:text-navy-900
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-navy-600 prose-p:leading-relaxed prose-p:mb-4
                  prose-ul:my-4 prose-ol:my-4
                  prose-li:text-navy-600 prose-li:mb-1.5
                  prose-strong:text-navy-900 prose-strong:font-bold
                  prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              <div className="mt-10 pt-8 border-t border-navy-100">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="flex items-center gap-1.5 text-sm font-medium text-navy-500">
                    <Tag size={14} />
                    Tags:
                  </span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm text-navy-600 bg-navy-50 border border-navy-100 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Share */}
              <div className="mt-6 flex items-center gap-3">
                <span className="text-sm font-medium text-navy-500 flex items-center gap-1.5">
                  <Share2 size={14} />
                  Share:
                </span>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(post.title + " - " + typeof window !== "undefined" ? window.location.href : "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm px-4 py-2 bg-[#25D366]/10 text-[#1ebe5b] font-medium rounded-lg hover:bg-[#25D366]/20 transition-colors border border-[#25D366]/20"
                >
                  WhatsApp
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm px-4 py-2 bg-[#0A66C2]/10 text-[#0A66C2] font-medium rounded-lg hover:bg-[#0A66C2]/20 transition-colors border border-[#0A66C2]/20"
                >
                  LinkedIn
                </a>
              </div>

              {/* Prev/Next navigation */}
              <div className="mt-10 grid sm:grid-cols-2 gap-4">
                {prevPost && (
                  <Link
                    href={`/blog/${prevPost.slug}`}
                    className="group p-5 rounded-2xl border border-navy-100 hover:border-brand-200 hover:shadow-md transition-all"
                  >
                    <span className="text-xs text-navy-400 flex items-center gap-1 mb-2">
                      <ArrowLeft size={12} />
                      Previous Article
                    </span>
                    <p className="text-sm font-semibold text-navy-800 group-hover:text-brand-600 transition-colors line-clamp-2">
                      {prevPost.title}
                    </p>
                  </Link>
                )}
                {nextPost && (
                  <Link
                    href={`/blog/${nextPost.slug}`}
                    className={`group p-5 rounded-2xl border border-navy-100 hover:border-brand-200 hover:shadow-md transition-all text-right ${!prevPost ? "sm:col-start-2" : ""}`}
                  >
                    <span className="text-xs text-navy-400 flex items-center gap-1 justify-end mb-2">
                      Next Article
                      <ArrowRight size={12} />
                    </span>
                    <p className="text-sm font-semibold text-navy-800 group-hover:text-brand-600 transition-colors line-clamp-2">
                      {nextPost.title}
                    </p>
                  </Link>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* CTA Card */}
              <div className="sticky top-24">
                <div className="bg-gradient-to-br from-navy-900 to-navy-950 rounded-2xl p-6 text-white">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/20 flex items-center justify-center mb-4">
                    <MessageCircle size={20} className="text-brand-400" />
                  </div>
                  <h3 className="font-bold text-lg leading-snug">
                    Ready to Set Up Your Cyprus Company?
                  </h3>
                  <p className="text-white/50 text-sm mt-2 leading-relaxed">
                    Our Mandarin-speaking advisors are available to answer your questions
                    and guide you through the entire process.
                  </p>
                  <ul className="mt-4 space-y-2">
                    {[
                      "Free consultation",
                      "15–20 business days incorporation",
                      "100% remote process",
                      "Mandarin support",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-white/60"
                      >
                        <CheckCircle2 size={14} className="text-brand-400 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="mt-5 w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-brand-500 text-white font-semibold rounded-xl text-sm hover:bg-brand-400 transition-colors"
                  >
                    Get Started Today
                    <ArrowRight size={15} />
                  </Link>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#25D366] text-white font-semibold rounded-xl text-sm hover:bg-[#1ebe5b] transition-colors"
                  >
                    <MessageCircle size={15} />
                    WhatsApp Us
                  </a>
                </div>

                {/* Quick facts */}
                <div className="mt-5 bg-white rounded-2xl border border-navy-100 p-5">
                  <h4 className="font-bold text-navy-900 text-sm mb-4">
                    Key Cyprus Facts
                  </h4>
                  <div className="space-y-3">
                    {[
                      { label: "Corporate Tax", value: "12.5%" },
                      { label: "Incorporation Time", value: "15–20 business days" },
                      { label: "Foreign Ownership", value: "100% allowed" },
                      { label: "EU Member", value: "Since 2004" },
                      { label: "Official Language", value: "Greek & English" },
                      { label: "China Tax Treaty", value: "Active since 1990" },
                    ].map((fact) => (
                      <div
                        key={fact.label}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-navy-500">{fact.label}</span>
                        <span className="font-semibold text-navy-900">{fact.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Related posts */}
                {relatedPosts.length > 0 && (
                  <div className="mt-5 bg-white rounded-2xl border border-navy-100 p-5">
                    <h4 className="font-bold text-navy-900 text-sm mb-4">
                      Related Articles
                    </h4>
                    <div className="space-y-4">
                      {relatedPosts.map((related) => (
                        <Link
                          key={related.slug}
                          href={`/blog/${related.slug}`}
                          className="group block"
                        >
                          <span className="text-xs font-medium text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
                            {related.category}
                          </span>
                          <p className="text-sm font-semibold text-navy-800 group-hover:text-brand-600 transition-colors mt-1.5 leading-snug line-clamp-2">
                            {related.title}
                          </p>
                          <span className="text-xs text-navy-400 mt-1 flex items-center gap-1">
                            <Clock size={11} />
                            {related.readTime}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* More Articles CTA */}
      <section className="py-12 bg-navy-50/40 border-t border-navy-100">
        <div className="container-wide px-4 lg:px-8 text-center">
          <h3 className="text-xl font-bold text-navy-900 mb-2">
            Want More Expert Insights?
          </h3>
          <p className="text-navy-500 text-sm mb-5">
            Browse all 25 articles for Chinese Amazon and Temu sellers expanding to Europe.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-navy-900 text-white font-semibold rounded-xl text-sm hover:bg-navy-800 transition-colors"
          >
            <BookOpen size={16} />
            Browse All Articles
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
