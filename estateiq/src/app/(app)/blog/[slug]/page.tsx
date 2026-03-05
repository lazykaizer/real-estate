"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Clock, ArrowLeft, Share2, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MOCK_BLOG_POSTS } from "@/data/mock";
import Image from "next/image";
import Link from "next/link";

export default function BlogPostPage() {
  const params = useParams();
  const post = MOCK_BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    return (
      <div className="pt-32 min-h-screen text-center">
        <h1 className="text-2xl font-bold text-navy">Article Not Found</h1>
        <p className="text-gray-mid mt-2">
          The article you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button asChild className="mt-4 bg-blue text-white">
          <Link href="/blog">Back to Blog</Link>
        </Button>
      </div>
    );
  }

  const relatedPosts = MOCK_BLOG_POSTS.filter(
    (p) => p.id !== post.id
  ).slice(0, 3);

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-white">
      {/* Header Image */}
      <div className="relative h-72 md:h-96">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="mx-auto max-w-3xl">
            <Badge className="bg-blue text-white mb-3">
              <Tag className="h-3 w-3 mr-1" />
              {post.category}
            </Badge>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              {post.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-white/70">
              <span className="font-semibold text-white">{post.author}</span>
              <span>{post.publishedAt}</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {post.readTime} min read
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="mb-6 text-gray-mid"
        >
          <Link href="/blog">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Blog
          </Link>
        </Button>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-slate max-w-none"
        >
          <p className="text-lg text-gray-mid leading-relaxed">
            {post.excerpt}
          </p>

          <Separator className="my-8" />

          <h2 className="text-xl font-bold text-navy mt-8 mb-4">
            Key Takeaways
          </h2>
          <ul className="space-y-2 text-gray-dark">
            <li className="flex items-start gap-2">
              <span className="h-5 w-5 rounded-full bg-green-light flex items-center justify-center text-green text-xs shrink-0 mt-0.5">
                ✓
              </span>
              <span>
                Understanding the current real estate market dynamics is crucial
                for making informed decisions.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="h-5 w-5 rounded-full bg-green-light flex items-center justify-center text-green text-xs shrink-0 mt-0.5">
                ✓
              </span>
              <span>
                Always factor in additional costs like stamp duty, registration
                fees, and maintenance charges.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="h-5 w-5 rounded-full bg-green-light flex items-center justify-center text-green text-xs shrink-0 mt-0.5">
                ✓
              </span>
              <span>
                Work with verified agents and RERA-registered properties for a
                safe transaction.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="h-5 w-5 rounded-full bg-green-light flex items-center justify-center text-green text-xs shrink-0 mt-0.5">
                ✓
              </span>
              <span>
                Consider future infrastructure developments when evaluating
                property investment potential.
              </span>
            </li>
          </ul>

          <Separator className="my-8" />

          <p className="text-gray-dark leading-relaxed">
            The Indian real estate market continues to evolve rapidly with new
            regulatory frameworks, technological innovations, and changing buyer
            preferences shaping the landscape. Whether you&apos;re a first-time
            buyer or a seasoned investor, staying informed about market trends,
            legal requirements, and financial strategies is essential for making
            sound real estate decisions.
          </p>

          <p className="text-gray-dark leading-relaxed mt-4">
            At EstateIQ, we believe in empowering our users with the knowledge
            and tools they need to navigate the real estate market with
            confidence. From AI-powered valuations to neighbourhood analytics,
            our platform is designed to make your property journey smoother and
            more transparent.
          </p>

          <div className="mt-8 p-6 bg-blue-light rounded-lg">
            <h3 className="font-bold text-navy mb-2">
              Ready to Take the Next Step?
            </h3>
            <p className="text-sm text-gray-mid mb-4">
              Use our advanced search tools to find properties that match your
              criteria and budget.
            </p>
            <Button asChild className="bg-blue hover:bg-blue/90 text-white">
              <Link href="/buy">Start Searching</Link>
            </Button>
          </div>
        </motion.article>

        {/* Share */}
        <div className="flex items-center gap-2 mt-8">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-1" /> Share Article
          </Button>
        </div>

        {/* Related Posts */}
        <Separator className="my-10" />
        <h3 className="text-lg font-bold text-navy mb-6">Related Articles</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {relatedPosts.map((p) => (
            <Link key={p.id} href={`/blog/${p.slug}`}>
              <Card className="h-full group hover:shadow-card-hover transition-shadow overflow-hidden">
                <div className="relative h-32">
                  <Image
                    src={p.coverImage}
                    alt={p.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-3">
                  <h4 className="text-sm font-semibold text-navy line-clamp-2 group-hover:text-blue transition-colors">
                    {p.title}
                  </h4>
                  <p className="text-xs text-gray-mid mt-1 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {p.readTime} min
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
