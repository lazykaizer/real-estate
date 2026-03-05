"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Clock, Search, ArrowRight, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_BLOG_POSTS } from "@/data/mock";
import Image from "next/image";
import Link from "next/link";

const CATEGORIES = [
  "All",
  "Buying Guide",
  "Investment",
  "Market Trends",
  "Legal",
  "Home Decor",
];

export default function BlogPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = MOCK_BLOG_POSTS.filter((post) => {
    const matchesCategory =
      category === "All" || post.category === category;
    const matchesQuery =
      !query ||
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const featured = MOCK_BLOG_POSTS.length > 0 ? MOCK_BLOG_POSTS[0] : null;

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-gray-light">
      {/* Header */}
      <div className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="h-7 w-7" />
              <h1 className="text-2xl md:text-3xl font-bold">
                EstateIQ Blog
              </h1>
            </div>
            <p className="text-white/60 max-w-xl mb-6">
              Expert insights on real estate investment, buying guides, market
              trends, and more.
            </p>
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-mid" />
              <Input
                placeholder="Search articles..."
                className="pl-10 bg-white text-gray-dark"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {CATEGORIES.map((cat) => (
            <Button
              key={cat}
              variant={category === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setCategory(cat)}
              className={
                category === cat ? "bg-blue text-white" : ""
              }
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Featured Post */}
        {featured && category === "All" && !query && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <Link href={`/blog/${featured.slug}`}>
              <Card className="overflow-hidden group hover:shadow-card-hover transition-shadow">
                <div className="grid md:grid-cols-2">
                  <div className="relative h-64 md:h-auto">
                    <Image
                      src={featured.coverImage}
                      alt={featured.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-8 flex flex-col justify-center">
                    <Badge className="w-fit mb-3 bg-blue-light text-blue">
                      {featured.category}
                    </Badge>
                    <h2 className="text-xl font-bold text-navy mb-3 group-hover:text-blue transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-sm text-gray-mid line-clamp-3 mb-4">
                      {featured.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-mid">
                      <span className="font-semibold text-navy">
                        {featured.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {featured.readTime} min read
                      </span>
                      <span>{featured.publishedAt}</span>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </motion.div>
        )}

        {/* Blog Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`}>
                <Card className="overflow-hidden h-full group hover:shadow-card-hover transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant="secondary"
                        className="text-xs bg-blue-light text-blue"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {post.category}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-navy mb-2 group-hover:text-blue transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-mid line-clamp-2 mb-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-mid">
                      <span className="font-medium text-navy">
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime} min
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-3 text-center py-16 text-gray-mid">
              No articles found matching your search.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
