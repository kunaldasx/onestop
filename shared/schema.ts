import { z } from "zod";

export const insertContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional().nullable(),
  message: z.string().min(1, "Message is required"),
});

export type InsertContact = z.infer<typeof insertContactSchema>;

export interface ContactSubmission extends InsertContact {
  id: string;
  createdAt: Date;
}

export const insertBlogPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
  coverImage: z.string().optional().nullable(),
  category: z.string().min(1, "Category is required"),
  author: z.string().min(1, "Author is required"),
  published: z.boolean().default(false).optional(),
});

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;

export interface BlogPost extends InsertBlogPost {
  id: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}
