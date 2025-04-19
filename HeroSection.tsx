import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden py-16 sm:py-24">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:24px_24px] opacity-10"></div>
      
      {/* Glowing orb */}
      <div className="absolute -top-20 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1>
                <span className="flex items-center justify-center lg:justify-start">
                  <span className="text-primary mb-4 text-sm font-semibold tracking-wide uppercase">
                    Crafting Premium Experiences
                  </span>
                </span>
                <span className="block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                  <span className="block">Generative AI</span>
                  <span className="block text-primary">Solutions & Showcase</span>
                </span>
              </h1>
              <p className="mt-3 text-base text-muted-foreground sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Explore our portfolio of cutting-edge AI solutions that are transforming industries. 
                From predictive analytics to generative design, see how our custom AI implementations 
                deliver real business value.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Button size="lg" asChild className="bg-primary hover:bg-primary/90 gap-2">
                      <Link href="/#portfolio">
                        View Portfolio 
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Button size="lg" variant="outline" asChild className="gap-2">
                      <Link href="/generate">
                        <Sparkles className="h-4 w-4" />
                        Try AI Generator
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <motion.div 
              className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="relative block w-full bg-background rounded-lg overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-8">
                  <div className="relative z-10">
                    <Sparkles className="mx-auto h-20 w-20 text-primary animate-pulse" />
                    <p className="mt-6 text-xl text-center font-medium text-white">
                      Intelligent solutions for tomorrow's challenges
                    </p>
                  </div>
                  
                  {/* Abstract shapes */}
                  <div className="absolute top-10 right-10 w-16 h-16 border-4 border-primary/40 rounded-full"></div>
                  <div className="absolute bottom-10 left-10 w-24 h-24 border-4 border-primary/20 rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
