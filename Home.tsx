import { useRef } from "react";
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import PortfolioGrid from "@/components/PortfolioGrid";
import ContactForm from "@/components/ContactForm";
import { Sparkles } from "lucide-react";

export default function Home() {
  const portfolioRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Features */}
      <FeatureSection />
      
      {/* Portfolio Section */}
      <div id="portfolio" ref={portfolioRef} className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
            Portfolio
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-foreground sm:text-4xl">
            Case Studies & Success Stories
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
            Explore our selected work and see how we've helped businesses transform with AI
          </p>
        </div>
        
        <PortfolioGrid />
      </div>
      
      {/* AI Innovation */}
      <div className="py-16 bg-card border-y border-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Background glow */}
          <div className="absolute top-1/2 right-10 transform -translate-y-1/2 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
          
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
                  Innovation
                </h2>
              </div>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-foreground sm:text-4xl">
                Generative AI for Every Industry
              </p>
              <div className="mt-6 text-lg text-muted-foreground space-y-4">
                <p>
                  Our AI solutions are designed to solve complex business problems across industries.
                  From content generation to predictive analytics, we've helped businesses leverage the 
                  power of artificial intelligence to gain competitive advantages.
                </p>
                <p>
                  With our deep expertise in machine learning and generative models, we build custom 
                  AI tools that integrate seamlessly with your existing systems while delivering 
                  exceptional results.
                </p>
                <p>
                  Our approach combines technical excellence with user-centric design, ensuring that 
                  our AI solutions are not just powerful, but also intuitive and easy to use.
                </p>
              </div>
            </div>
            
            <div className="mt-12 lg:mt-0 relative">
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <div className="pb-[56.25%] bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="text-center">
                      <Sparkles className="h-16 w-16 text-primary mx-auto mb-6" />
                      <h3 className="text-xl font-medium text-white mb-4">
                        Try Our AI Generator
                      </h3>
                      <p className="text-gray-300">
                        Experience the power of our generative AI models firsthand
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Section */}
      <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
              Contact Us
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-foreground sm:text-4xl">
              Let's Discuss Your Project
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              Have a project in mind or want to learn more about how our AI solutions can help your business?
              Get in touch with our team of experts.
            </p>
            
            <div className="mt-8 space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-primary/10 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                </div>
                <div className="ml-4">
                  <p className="text-base font-medium text-foreground">Phone Support</p>
                  <p className="mt-1 text-sm text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-primary/10 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                </div>
                <div className="ml-4">
                  <p className="text-base font-medium text-foreground">Email</p>
                  <p className="mt-1 text-sm text-muted-foreground">info@aiportfolio.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-primary/10 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                </div>
                <div className="ml-4">
                  <p className="text-base font-medium text-foreground">Office Location</p>
                  <p className="mt-1 text-sm text-muted-foreground">123 AI Boulevard, Tech City, TC 12345</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
