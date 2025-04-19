import { useState } from "react";
import { Link, useLocation } from "wouter";
import { 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  Moon,
  User,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { isLoggedIn, getCurrentUser, logout } from "@/lib/auth";

export default function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const loggedIn = isLoggedIn();
  const user = getCurrentUser();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Sparkles className="h-8 w-8 text-primary" />
              <span className="ml-2 text-lg font-semibold">AIPortfolio</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
              <Link href="/">
                <a className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  location === "/" 
                    ? "border-primary text-foreground" 
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}>
                  Home
                </a>
              </Link>
              
              <Link href="/#portfolio">
                <a className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium
                  border-transparent text-muted-foreground hover:text-foreground`}>
                  Portfolio
                </a>
              </Link>
              
              {loggedIn && (
                <Link href="/generate">
                  <a className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    location === "/generate" 
                      ? "border-primary text-foreground" 
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}>
                    AI Generator
                  </a>
                </Link>
              )}
            </div>
          </div>
          
          {/* Auth buttons */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {loggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="ml-2 gap-2">
                    <User className="h-4 w-4" />
                    <span>{user?.username}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link href="/">
              <a 
                className={`block px-3 py-2 text-base font-medium ${
                  location === "/" 
                    ? "bg-secondary text-foreground" 
                    : "text-muted-foreground hover:bg-gray-800 hover:text-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </a>
            </Link>
            
            <Link href="/#portfolio">
              <a 
                className="block px-3 py-2 text-base font-medium text-muted-foreground hover:bg-gray-800 hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Portfolio
              </a>
            </Link>
            
            {loggedIn && (
              <Link href="/generate">
                <a 
                  className={`block px-3 py-2 text-base font-medium ${
                    location === "/generate" 
                      ? "bg-secondary text-foreground" 
                      : "text-muted-foreground hover:bg-gray-800 hover:text-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  AI Generator
                </a>
              </Link>
            )}
            
            {loggedIn ? (
              <>
                <Link href="/dashboard">
                  <a 
                    className="block px-3 py-2 text-base font-medium text-muted-foreground hover:bg-gray-800 hover:text-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </a>
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-destructive hover:bg-gray-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <a 
                    className="block px-3 py-2 text-base font-medium text-muted-foreground hover:bg-gray-800 hover:text-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </a>
                </Link>
                <Link href="/register">
                  <a 
                    className="block px-3 py-2 text-base font-medium text-primary hover:bg-gray-800 hover:text-primary/90"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </a>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
