import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/storage";
import { insertBlogPostSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const publishedOnly = searchParams.get("all") !== "true";
    const posts = await storage.getBlogPosts(publishedOnly);
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = insertBlogPostSchema.safeParse(body);
    
    if (!result.success) {
      const validationError = fromZodError(result.error);
      return NextResponse.json(
        { error: validationError.message },
        { status: 400 }
      );
    }

    const post = await storage.createBlogPost(result.data);
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}
