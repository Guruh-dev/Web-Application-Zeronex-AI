import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertCaseStudySchema, insertGenerationSchema } from "@shared/schema";
import { z } from "zod";
import { ZodError } from "zod";

// Simple authentication middleware
const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  // This is a simple auth check - in a real app, you'd use sessions, JWT, etc.
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Invalid authentication token' });
  }

  try {
    // In a real app, you'd verify the token
    // For now, we're just checking if there's any token
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // ==== User Auth Routes ====
  
  // Register endpoint
  app.post('/api/auth/register', async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        return res.status(409).json({ message: 'Username already taken' });
      }
      
      const existingEmail = await storage.getUserByEmail(validatedData.email);
      if (existingEmail) {
        return res.status(409).json({ message: 'Email already registered' });
      }
      
      // In a real app, you'd hash the password here
      const newUser = await storage.createUser(validatedData);
      
      // Don't return the password in the response
      const { password, ...userWithoutPassword } = newUser;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: 'Validation error', 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: 'Server error during registration' });
    }
  });
  
  // Login endpoint
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password required' });
      }
      
      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      // In a real app, you'd generate a JWT token here
      const { password: _, ...userWithoutPassword } = user;
      res.json({ 
        user: userWithoutPassword,
        token: 'dummy-token-' + user.id // This is just a placeholder
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error during login' });
    }
  });

  // ==== Case Study Routes ====
  
  // Get all case studies
  app.get('/api/case-studies', async (req, res) => {
    try {
      const caseStudies = await storage.getCaseStudies();
      res.json(caseStudies);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch case studies' });
    }
  });
  
  // Get case study by slug
  app.get('/api/case-studies/:slug', async (req, res) => {
    try {
      const { slug } = req.params;
      const caseStudy = await storage.getCaseStudyBySlug(slug);
      
      if (!caseStudy) {
        return res.status(404).json({ message: 'Case study not found' });
      }
      
      res.json(caseStudy);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch case study' });
    }
  });
  
  // Create case study (protected route)
  app.post('/api/case-studies', authenticate, async (req, res) => {
    try {
      const validatedData = insertCaseStudySchema.parse(req.body);
      const newCaseStudy = await storage.createCaseStudy(validatedData);
      res.status(201).json(newCaseStudy);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: 'Validation error', 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: 'Failed to create case study' });
    }
  });
  
  // Update case study (protected route)
  app.patch('/api/case-studies/:id', authenticate, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
      }
      
      const existingCaseStudy = await storage.getCaseStudyById(id);
      if (!existingCaseStudy) {
        return res.status(404).json({ message: 'Case study not found' });
      }
      
      const updatedCaseStudy = await storage.updateCaseStudy(id, req.body);
      res.json(updatedCaseStudy);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update case study' });
    }
  });
  
  // Delete case study (protected route)
  app.delete('/api/case-studies/:id', authenticate, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
      }
      
      const existingCaseStudy = await storage.getCaseStudyById(id);
      if (!existingCaseStudy) {
        return res.status(404).json({ message: 'Case study not found' });
      }
      
      await storage.deleteCaseStudy(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete case study' });
    }
  });
  
  // ==== AI Generation Routes ====
  
  // Generate AI content (protected route)
  app.post('/api/generate', authenticate, async (req, res) => {
    try {
      const { prompt, userId, modelUsed = 'default-model' } = req.body;
      
      if (!prompt) {
        return res.status(400).json({ message: 'Prompt is required' });
      }
      
      // Simulate AI generation - in a real app, you'd call an external AI API
      const generatedResult = `Generated content based on: "${prompt}".\n\nThis is a simulated response that would normally come from an AI model. In a real application, this would be the output from an AI model like GPT-4 or a custom model trained for specific generation tasks.`;
      
      // Save the generation result
      const generation = await storage.createGeneration({
        userId,
        prompt,
        result: generatedResult,
        modelUsed,
        metadata: { 
          generationTime: new Date().toISOString(),
          promptLength: prompt.length,
          responseLength: generatedResult.length
        }
      });
      
      res.status(201).json(generation);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: 'Validation error', 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: 'Generation failed' });
    }
  });
  
  // Get user's generation history (protected route)
  app.get('/api/generations/:userId', authenticate, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: 'Invalid user ID format' });
      }
      
      const generations = await storage.getGenerations(userId);
      res.json(generations);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch generation history' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
