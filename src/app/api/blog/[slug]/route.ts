import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/storage";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const post = await storage.getBlogPostBySlug(slug);
    
    if (!post) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug: idOrSlug } = await params;
    const body = await request.json();
    
    let existingPost = await storage.getBlogPostById(idOrSlug);
    if (!existingPost) {
      existingPost = await storage.getBlogPostBySlug(idOrSlug);
    }
    
    if (!existingPost) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    const updatedPost = await storage.updateBlogPost(existingPost.id, body);
    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug: idOrSlug } = await params;
    
    let existingPost = await storage.getBlogPostById(idOrSlug);
    if (!existingPost) {
      existingPost = await storage.getBlogPostBySlug(idOrSlug);
    }
    
    if (!existingPost) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }
    
    const deleted = await storage.deleteBlogPost(existingPost.id);
    
    if (!deleted) {
      return NextResponse.json(
        { error: "Failed to delete blog post" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: "Blog post deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
