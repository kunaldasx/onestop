import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertBlogPostSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    try {
      const result = insertContactSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          error: validationError.message 
        });
      }

      const contact = await storage.createContactSubmission(result.data);
      
      return res.status(201).json({ 
        message: "Contact submission received successfully",
        id: contact.id 
      });
    } catch (error) {
      console.error("Error creating contact submission:", error);
      return res.status(500).json({ 
        error: "Failed to submit contact form" 
      });
    }
  });

  app.get("/api/contact", async (_req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      return res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      return res.status(500).json({ 
        error: "Failed to fetch contact submissions" 
      });
    }
  });

  app.get("/api/blog", async (req, res) => {
    try {
      const publishedOnly = req.query.all !== "true";
      const posts = await storage.getBlogPosts(publishedOnly);
      return res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      return res.status(500).json({ 
        error: "Failed to fetch blog posts" 
      });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      return res.json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      return res.status(500).json({ 
        error: "Failed to fetch blog post" 
      });
    }
  });

  app.post("/api/blog", async (req, res) => {
    try {
      const result = insertBlogPostSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          error: validationError.message 
        });
      }

      const post = await storage.createBlogPost(result.data);
      
      return res.status(201).json(post);
    } catch (error) {
      console.error("Error creating blog post:", error);
      return res.status(500).json({ 
        error: "Failed to create blog post" 
      });
    }
  });

  app.patch("/api/blog/:id", async (req, res) => {
    try {
      const existingPost = await storage.getBlogPostById(req.params.id);
      if (!existingPost) {
        return res.status(404).json({ error: "Blog post not found" });
      }

      const updatedPost = await storage.updateBlogPost(req.params.id, req.body);
      
      return res.json(updatedPost);
    } catch (error) {
      console.error("Error updating blog post:", error);
      return res.status(500).json({ 
        error: "Failed to update blog post" 
      });
    }
  });

  app.delete("/api/blog/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteBlogPost(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      return res.json({ message: "Blog post deleted successfully" });
    } catch (error) {
      console.error("Error deleting blog post:", error);
      return res.status(500).json({ 
        error: "Failed to delete blog post" 
      });
    }
  });

  return httpServer;
}
