import { apiRequest } from "./queryClient";
import { getAuthHeaders } from "./auth";

interface GenerationRequest {
  prompt: string;
  userId: number;
  modelUsed?: string;
}

interface GenerationResult {
  id: number;
  userId: number;
  prompt: string;
  result: string;
  modelUsed: string;
  createdAt: string;
  metadata?: Record<string, any>;
}

// Generate content using the AI API
export async function generateContent(request: GenerationRequest): Promise<GenerationResult> {
  const response = await apiRequest('POST', '/api/generate', request);
  return await response.json();
}

// Get generation history for a user
export async function getUserGenerations(userId: number): Promise<GenerationResult[]> {
  const response = await fetch(`/api/generations/${userId}`, {
    headers: {
      ...getAuthHeaders()
    }
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch generations: ${response.statusText}`);
  }
  
  return await response.json();
}
