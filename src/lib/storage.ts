import { 
  type ContactSubmission, 
  type InsertContact,
  type BlogPost,
  type InsertBlogPost,
} from "@shared/schema";
import { randomUUID } from "crypto";
import { getDb } from "./db";
import type { Collection, Filter } from "mongodb";

export interface IStorage {
  createContactSubmission(contact: InsertContact): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  getBlogPosts(publishedOnly?: boolean): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getBlogPostById(id: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<boolean>;
}

export class MongoStorage implements IStorage {
  private inMemoryContacts: Map<string, ContactSubmission>;
  private inMemoryBlogPosts: Map<string, BlogPost>;

  constructor() {
    this.inMemoryContacts = new Map();
    this.inMemoryBlogPosts = new Map();
  }

  private async getBlogPostsCollection(): Promise<Collection<any> | null> {
    const db = await getDb();
    return db ? db.collection("blogPosts") : null;
  }

  private async getContactsCollection(): Promise<Collection<any> | null> {
    const db = await getDb();
    return db ? db.collection("contactSubmissions") : null;
  }

  async createContactSubmission(insertContact: InsertContact): Promise<ContactSubmission> {
    const id = randomUUID();
    const contact: ContactSubmission = {
      id,
      name: insertContact.name,
      email: insertContact.email,
      company: insertContact.company ?? null,
      message: insertContact.message,
      createdAt: new Date(),
    };

    const collection = await this.getContactsCollection();
    if (collection) {
      try {
        await collection.insertOne({
          _id: id,
          ...contact,
        });
        return contact;
      } catch (error) {
        console.error("Error saving contact to MongoDB:", error);
      }
    }

    this.inMemoryContacts.set(id, contact);
    return contact;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    const collection = await this.getContactsCollection();
    if (collection) {
      try {
        const docs = await collection
          .find({})
          .sort({ createdAt: -1 })
          .toArray();
        return docs.map(doc => ({
          id: doc._id,
          name: doc.name,
          email: doc.email,
          company: doc.company,
          message: doc.message,
          createdAt: doc.createdAt,
        }));
      } catch (error) {
        console.error("Error fetching contacts from MongoDB:", error);
      }
    }

    return Array.from(this.inMemoryContacts.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getBlogPosts(publishedOnly: boolean = true): Promise<BlogPost[]> {
    const collection = await this.getBlogPostsCollection();
    if (collection) {
      try {
        const filter: Filter<any> = publishedOnly ? { published: true } : {};
        const docs = await collection
          .find(filter)
          .sort({ createdAt: -1 })
          .toArray();
        return docs.map(doc => ({
          id: doc._id,
          title: doc.title,
          slug: doc.slug,
          excerpt: doc.excerpt,
          content: doc.content,
          coverImage: doc.coverImage,
          category: doc.category,
          author: doc.author,
          published: doc.published,
          createdAt: doc.createdAt,
          updatedAt: doc.updatedAt,
        }));
      } catch (error) {
        console.error("Error fetching blog posts from MongoDB:", error);
      }
    }

    const posts = Array.from(this.inMemoryBlogPosts.values());
    if (publishedOnly) {
      return posts
        .filter(p => p.published)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
    return posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const collection = await this.getBlogPostsCollection();
    if (collection) {
      try {
        const doc = await collection.findOne({ slug });
        if (doc) {
          return {
            id: doc._id,
            title: doc.title,
            slug: doc.slug,
            excerpt: doc.excerpt,
            content: doc.content,
            coverImage: doc.coverImage,
            category: doc.category,
            author: doc.author,
            published: doc.published,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
          };
        }
      } catch (error) {
        console.error("Error fetching blog post by slug from MongoDB:", error);
      }
    }

    return Array.from(this.inMemoryBlogPosts.values()).find(p => p.slug === slug);
  }

  async getBlogPostById(id: string): Promise<BlogPost | undefined> {
    const collection = await this.getBlogPostsCollection();
    if (collection) {
      try {
        const doc = await collection.findOne({ _id: id });
        if (doc) {
          return {
            id: doc._id,
            title: doc.title,
            slug: doc.slug,
            excerpt: doc.excerpt,
            content: doc.content,
            coverImage: doc.coverImage,
            category: doc.category,
            author: doc.author,
            published: doc.published,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
          };
        }
      } catch (error) {
        console.error("Error fetching blog post by ID from MongoDB:", error);
      }
    }

    return this.inMemoryBlogPosts.get(id);
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const now = new Date();
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
      createdAt: now,
      updatedAt: now,
    };

    const collection = await this.getBlogPostsCollection();
    if (collection) {
      try {
        await collection.insertOne({
          _id: id,
          ...post,
        });
        return post;
      } catch (error) {
        console.error("Error creating blog post in MongoDB:", error);
      }
    }

    this.inMemoryBlogPosts.set(id, post);
    return post;
  }

  async updateBlogPost(id: string, updateData: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const collection = await this.getBlogPostsCollection();
    const now = new Date();

    if (collection) {
      try {
        const doc = await collection.findOneAndUpdate(
          { _id: id },
          {
            $set: {
              ...updateData,
              updatedAt: now,
            },
          },
          { returnDocument: "after" }
        );

        if (doc.value) {
          return {
            id: doc.value._id,
            title: doc.value.title,
            slug: doc.value.slug,
            excerpt: doc.value.excerpt,
            content: doc.value.content,
            coverImage: doc.value.coverImage,
            category: doc.value.category,
            author: doc.value.author,
            published: doc.value.published,
            createdAt: doc.value.createdAt,
            updatedAt: doc.value.updatedAt,
          };
        }
      } catch (error) {
        console.error("Error updating blog post in MongoDB:", error);
      }
    }

    const existing = this.inMemoryBlogPosts.get(id);
    if (!existing) return undefined;

    const updated: BlogPost = {
      ...existing,
      ...updateData,
      coverImage: updateData.coverImage ?? existing.coverImage,
      updatedAt: now,
    };
    this.inMemoryBlogPosts.set(id, updated);
    return updated;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    const collection = await this.getBlogPostsCollection();
    if (collection) {
      try {
        const result = await collection.deleteOne({ _id: id });
        return result.deletedCount > 0;
      } catch (error) {
        console.error("Error deleting blog post from MongoDB:", error);
      }
    }

    return this.inMemoryBlogPosts.delete(id);
  }
}

export const storage = new MongoStorage();
