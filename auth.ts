import { apiRequest } from "./queryClient";
import { queryClient } from "./queryClient";

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

export const AUTH_TOKEN_KEY = 'auth_token';
export const USER_DATA_KEY = 'user_data';

// Check if user is logged in
export function isLoggedIn(): boolean {
  return !!localStorage.getItem(AUTH_TOKEN_KEY);
}

// Get current user data
export function getCurrentUser(): User | null {
  const userData = localStorage.getItem(USER_DATA_KEY);
  return userData ? JSON.parse(userData) : null;
}

// Get auth token
export function getAuthToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

// Register new user
export async function register(username: string, email: string, password: string): Promise<User> {
  const response = await apiRequest('POST', '/api/auth/register', { username, email, password });
  const userData = await response.json();
  return userData;
}

// Log in user
export async function login(username: string, password: string): Promise<User> {
  const response = await apiRequest('POST', '/api/auth/login', { username, password });
  const authData: AuthResponse = await response.json();
  
  // Save auth data
  localStorage.setItem(AUTH_TOKEN_KEY, authData.token);
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(authData.user));
  
  // Invalidate any queries that might be affected by login
  queryClient.invalidateQueries({ queryKey: ['/api/generations'] });
  
  return authData.user;
}

// Log out user
export function logout(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(USER_DATA_KEY);
  
  // Invalidate auth-dependent queries
  queryClient.invalidateQueries();
  
  // Redirect to home page
  window.location.href = '/';
}

// Add auth header to fetch requests
export function getAuthHeaders(): HeadersInit {
  const token = getAuthToken();
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}
