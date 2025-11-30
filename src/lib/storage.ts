import { 
  type User, 
  type InsertUser, 
  type ContactSubmission, 
  type InsertContact,
  type BlogPost,
  type InsertBlogPost,
  blogPosts
} from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(contact: InsertContact): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  getBlogPosts(publishedOnly?: boolean): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getBlogPostById(id: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contacts: Map<string, ContactSubmission>;
  private blogPostsMap: Map<string, BlogPost>;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.blogPostsMap = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactSubmission(insertContact: InsertContact): Promise<ContactSubmission> {
    const id = randomUUID();
    const contact: ContactSubmission = { 
      name: insertContact.name,
      email: insertContact.email,
      company: insertContact.company ?? null,
      message: insertContact.message,
      id, 
      createdAt: new Date() 
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contacts.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getBlogPosts(publishedOnly: boolean = true): Promise<BlogPost[]> {
    if (db) {
      try {
        if (publishedOnly) {
          return await db.select().from(blogPosts).where(eq(blogPosts.published, true)).orderBy(desc(blogPosts.createdAt));
        }
        return await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
      } catch (error) {
        console.error("Error fetching blog posts from DB:", error);
      }
    }
    
    const posts = Array.from(this.blogPostsMap.values());
    if (publishedOnly) {
      return posts.filter(p => p.published).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
    return posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    if (db) {
      try {
        const results = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
        return results[0];
      } catch (error) {
        console.error("Error fetching blog post from DB:", error);
      }
    }
    
    return Array.from(this.blogPostsMap.values()).find(p => p.slug === slug);
  }

  async getBlogPostById(id: string): Promise<BlogPost | undefined> {
    if (db) {
      try {
        const results = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
        return results[0];
      } catch (error) {
        console.error("Error fetching blog post from DB:", error);
      }
    }
    
    return this.blogPostsMap.get(id);
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    if (db) {
      try {
        const results = await db.insert(blogPosts).values(insertPost).returning();
        return results[0];
      } catch (error) {
        console.error("Error creating blog post in DB:", error);
      }
    }
    
    const id = randomUUID();
    const post: BlogPost = {
      id,
      title: insertPost.title,
      slug: insertPost.slug,
      excerpt: insertPost.excerpt,
      content: insertPost.content,
      coverImage: insertPost.coverImage ?? null,
      category: insertPost.category,
      author: insertPost.author,
      published: insertPost.published ?? false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.blogPostsMap.set(id, post);
    return post;
  }

  async updateBlogPost(id: string, updateData: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    if (db) {
      try {
        const results = await db
          .update(blogPosts)
          .set({ ...updateData, updatedAt: new Date() })
          .where(eq(blogPosts.id, id))
          .returning();
        return results[0];
      } catch (error) {
        console.error("Error updating blog post in DB:", error);
      }
    }
    
    const existing = this.blogPostsMap.get(id);
    if (!existing) return undefined;
    
    const updated: BlogPost = {
      ...existing,
      ...updateData,
      coverImage: updateData.coverImage ?? existing.coverImage,
      updatedAt: new Date(),
    };
    this.blogPostsMap.set(id, updated);
    return updated;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    if (db) {
      try {
        const result = await db.delete(blogPosts).where(eq(blogPosts.id, id)).returning();
        return result.length > 0;
      } catch (error) {
        console.error("Error deleting blog post from DB:", error);
      }
    }
    
    return this.blogPostsMap.delete(id);
  }
}

export const storage = new MemStorage();
