"use client";

import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Calendar, ArrowLeft, User, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import type { BlogPost } from "@shared/schema";
import { format } from "date-fns";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: slug ? ["/api/blog", slug] : ["/api/blog"],
    queryFn: async () => {
      const response = await fetch(`/api/blog/${slug}`);
      if (!response.ok) throw new Error("Failed to fetch post");
      return response.json();
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-32 pb-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Skeleton className="h-4 w-24 mb-8" />
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-12 w-3/4 mb-8" />
            <div className="flex gap-4 mb-8">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-32" />
            </div>
            <Skeleton className="h-80 w-full mb-8 rounded-xl" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-32 pb-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Tag className="w-10 h-10 text-muted-foreground" />
              </div>
              <h1 className="font-display text-2xl font-bold text-foreground mb-4">
                Post Not Found
              </h1>
              <p className="text-muted-foreground mb-8">
                The blog post you&apos;re looking for doesn&apos;t exist or has been removed.
              </p>
              <Link href="/blog">
                <Button data-testid="button-back-to-blog">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Button>
              </Link>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-32 pb-20">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/blog">
              <Button
                variant="ghost"
                className="mb-8 -ml-4"
                data-testid="button-back-to-blog"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>

            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Badge variant="secondary">{post.category}</Badge>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(post.createdAt), "MMMM d, yyyy")}
                </span>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
                {post.title}
              </h1>
            </header>

            {post.coverImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-10 rounded-xl overflow-hidden"
              >
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-auto"
                />
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="prose prose-lg dark:prose-invert max-w-none"
            >
              <div
                className="text-foreground leading-relaxed space-y-6"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {post.content.split("\n\n").map((paragraph, index) => {
                  if (paragraph.startsWith("## ")) {
                    return (
                      <h2
                        key={index}
                        className="font-display text-2xl font-bold text-foreground mt-10 mb-4"
                      >
                        {paragraph.replace("## ", "")}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith("### ")) {
                    return (
                      <h3
                        key={index}
                        className="font-display text-xl font-semibold text-foreground mt-8 mb-3"
                      >
                        {paragraph.replace("### ", "")}
                      </h3>
                    );
                  }
                  return (
                    <p key={index} className="text-muted-foreground">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
