import { Link } from "wouter";
import { Sparkles, Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="ml-2 text-lg font-semibold">AIPortfolio</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Showcasing excellence in generative AI solutions with a premium touch.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/">
                  <a className="text-muted-foreground hover:text-primary">
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/#portfolio">
                  <a className="text-muted-foreground hover:text-primary">
                    Portfolio
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/generate">
                  <a className="text-muted-foreground hover:text-primary">
                    AI Generator
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Case Studies */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Case Studies
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/case-study/ai-powered-smart-shopping-assistant">
                  <a className="text-muted-foreground hover:text-primary">
                    AI Shopping Assistant
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/case-study/generative-design-system-architecture">
                  <a className="text-muted-foreground hover:text-primary">
                    Generative Design System
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/case-study/predictive-maintenance-ai-manufacturing">
                  <a className="text-muted-foreground hover:text-primary">
                    Predictive Maintenance AI
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-2">
              <li className="text-muted-foreground">
                123 AI Boulevard
              </li>
              <li className="text-muted-foreground">
                Tech City, TC 12345
              </li>
              <li>
                <a href="mailto:info@aiportfolio.com" className="text-muted-foreground hover:text-primary">
                  info@aiportfolio.com
                </a>
              </li>
              <li className="text-muted-foreground">
                +1 (555) 123-4567
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AIPortfolio. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link href="/privacy">
              <a className="text-sm text-muted-foreground hover:text-primary">
                Privacy Policy
              </a>
            </Link>
            <Link href="/terms">
              <a className="text-sm text-muted-foreground hover:text-primary">
                Terms of Service
              </a>
            </Link>
            <Link href="/cookies">
              <a className="text-sm text-muted-foreground hover:text-primary">
                Cookie Policy
              </a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
