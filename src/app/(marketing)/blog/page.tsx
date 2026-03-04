"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Tag,
  Search,
  TrendingUp,
  Star,
  ChevronRight,
} from "lucide-react";
import {
  BLOG_POSTS,
  BLOG_CATEGORIES,
  getFeaturedPosts,
  getPostsByCategory,
} from "@/lib/blog-data";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredPosts = getFeaturedPosts();

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
        <div className="relative container-wide px-4 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-brand-300 text-sm font-medium border border-white/10 mb-6">
              <BookOpen size={14} />
              Knowledge Hub for Chinese E-Commerce Entrepreneurs
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              European Business{" "}
              <span className="text-brand-400">Insights</span>{" "}
              for Chinese Sellers
            </h1>
            <p className="mt-6 text-lg text-white/50 leading-relaxed max-w-2xl">
              Expert guides on setting up EU companies, tax planning, Amazon and Temu
              marketplace strategies, and everything Chinese online shop owners need to
              build and scale in Europe.
            </p>
            <div className="mt-8 flex items-center gap-4 text-white/40 text-sm">
              <span className="flex items-center gap-1.5">
                <Star size={14} className="text-gold-400" />
                25 expert articles
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <TrendingUp size={14} className="text-brand-400" />
                Updated weekly
              </span>
              <span>·</span>
              <span>Covering Amazon, Temu, Cyprus & EU law</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search + Filter Bar */}
      <section className="sticky top-[72px] z-30 bg-white border-b border-navy-100 shadow-sm">
        <div className="container-wide px-4 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-navy-200 text-sm text-navy-800 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
              />
            </div>
            {/* Category filter */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedCategory === "All"
                    ? "bg-brand-500 text-white shadow-sm"
                    : "bg-navy-50 text-navy-600 hover:bg-navy-100"
                }`}
              >
                All
              </button>
              {BLOG_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-brand-500 text-white shadow-sm"
                      : "bg-navy-50 text-navy-600 hover:bg-navy-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {selectedCategory === "All" && !searchQuery && (
        <section className="section-padding bg-white">
          <div className="container-wide">
            <div className="flex items-center gap-3 mb-8">
              <Star size={18} className="text-gold-500" />
              <h2 className="text-xl font-bold text-navy-900">Featured Articles</h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Large featured post */}
              {featuredPosts[0] && (
                <Link
                  href={`/blog/${featuredPosts[0].slug}`}
                  className="group relative bg-gradient-to-br from-navy-900 to-navy-950 rounded-3xl overflow-hidden hover:-translate-y-1 transition-all duration-300 shadow-xl"
                >
                  <div className="absolute inset-0 dot-pattern opacity-10" />
                  <div className="relative p-8 h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs font-semibold text-brand-300 bg-brand-500/20 px-3 py-1 rounded-full border border-brand-500/30">
                        {featuredPosts[0].category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-white/40">
                        <Clock size={12} />
                        {featuredPosts[0].readTime}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white leading-snug group-hover:text-brand-300 transition-colors">
                      {featuredPosts[0].title}
                    </h3>
                    <p className="text-white/50 text-sm mt-3 leading-relaxed flex-1">
                      {featuredPosts[0].excerpt}
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-brand-400 font-semibold text-sm">
                      Read Article
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              )}
              {/* Smaller featured posts */}
              <div className="space-y-4">
                {featuredPosts.slice(1, 4).map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex gap-5 p-5 rounded-2xl border border-navy-100 hover:border-brand-200 hover:shadow-md transition-all duration-300 bg-white"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs font-medium text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-full">
                          {post.category}
                        </span>
                        <span className="text-xs text-navy-400 flex items-center gap-1">
                          <Clock size={11} />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="font-bold text-navy-900 text-sm leading-snug group-hover:text-brand-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-xs text-navy-500 mt-1.5 line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                    <ChevronRight
                      size={18}
                      className="text-navy-300 group-hover:text-brand-500 shrink-0 self-center group-hover:translate-x-0.5 transition-all"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Articles Grid */}
      <section className="section-padding bg-navy-50/30">
        <div className="container-wide">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-navy-900">
              {selectedCategory === "All" && !searchQuery
                ? "All Articles"
                : searchQuery
                ? `Search Results for "${searchQuery}"`
                : selectedCategory}
              <span className="ml-2 text-base font-normal text-navy-400">
                ({filteredPosts.length} articles)
              </span>
            </h2>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen size={40} className="text-navy-300 mx-auto mb-4" />
              <p className="text-navy-500 text-lg font-medium">No articles found</p>
              <p className="text-navy-400 text-sm mt-1">
                Try adjusting your search or filter
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-4 text-brand-600 font-medium text-sm hover:underline"
              >
                Clear filters →
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl border border-navy-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  {/* Card header strip */}
                  <div className="h-2 bg-gradient-to-r from-brand-500 to-brand-400" />
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
                        {post.category}
                      </span>
                      {post.featured && (
                        <Star size={14} className="text-gold-500 shrink-0" />
                      )}
                    </div>
                    <h3 className="font-bold text-navy-900 text-base leading-snug group-hover:text-brand-600 transition-colors line-clamp-3">
                      {post.title}
                    </h3>
                    <p className="text-sm text-navy-500 mt-3 leading-relaxed line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="mt-5 pt-4 border-t border-navy-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-xs text-navy-400">
                          <Clock size={12} />
                          {post.readTime}
                        </span>
                        <span className="text-xs text-navy-300">·</span>
                        <span className="text-xs text-navy-400">{post.publishDate}</span>
                      </div>
                      <span className="text-xs font-semibold text-brand-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read
                        <ArrowRight size={12} />
                      </span>
                    </div>
                    {/* Tags */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] text-navy-500 bg-navy-50 px-2 py-0.5 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-padding bg-gradient-to-br from-navy-950 to-navy-900">
        <div className="container-wide text-center">
          <div className="max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/20 text-brand-300 text-sm font-medium border border-brand-500/30 mb-6">
              <Tag size={14} />
              Ready to Start?
            </span>
            <h2 className="text-4xl font-bold text-white">
              Register Your Cyprus Company Today
            </h2>
            <p className="text-white/50 mt-4 text-lg">
              Join thousands of Chinese Amazon and Temu sellers who have established their
              European business in Cyprus. Mandarin-speaking advisors available now.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="btn-primary text-base">
                Get Started
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 transition-all"
              >
                View All Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
