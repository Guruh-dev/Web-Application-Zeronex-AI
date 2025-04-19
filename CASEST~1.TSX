import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { 
  ArrowLeft, 
  Calendar, 
  Building, 
  Tag,
  Clock,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CaseStudy() {
  const { slug } = useParams();
  const [, navigate] = useLocation();
  
  const { data: caseStudy, isLoading, error } = useQuery({
    queryKey: [`/api/case-studies/${slug}`],
    enabled: !!slug,
  });
  
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-6" />
          <div className="flex flex-wrap gap-2 mb-8">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
        
        <div className="space-y-6">
          <Skeleton className="h-40 w-full mb-6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-6 w-1/2 mt-6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    );
  }
  
  if (error || !caseStudy) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Case Study Not Found</h1>
        <p className="text-muted-foreground mb-8">
          We couldn't find the case study you're looking for.
        </p>
        <Button onClick={() => navigate('/')}>
          Return to Home
        </Button>
      </div>
    );
  }
  
  // Function to render markdown content
  const renderContent = (content: string) => {
    // Very simple markdown renderer (headers and paragraphs only)
    const lines = content.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('# ')) {
        return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{line.substring(2)}</h2>;
      } else if (line.startsWith('## ')) {
        return <h3 key={index} className="text-xl font-semibold mt-6 mb-3">{line.substring(3)}</h3>;
      } else if (line.trim() === '') {
        return <div key={index} className="h-4"></div>;
      } else {
        return <p key={index} className="mb-4 text-muted-foreground">{line}</p>;
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 h-64 flex items-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col items-start">
              <Button variant="outline" className="mb-6 border-white/20 text-white hover:bg-white/10" onClick={() => navigate('/')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Portfolio
              </Button>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">{caseStudy.title}</h1>
              <p className="text-lg text-white/80 mt-2">{caseStudy.summary}</p>
            </div>
          </div>
          
          {/* Background dots pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:24px_24px] opacity-20"></div>
          
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-30"></div>
        </div>
      </div>
      
      {/* Breadcrumbs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center text-sm text-muted-foreground">
        <a href="/" className="hover:text-primary">Home</a>
        <ChevronRight className="h-4 w-4 mx-2" />
        <a href="/#portfolio" className="hover:text-primary">Portfolio</a>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground">{caseStudy.title}</span>
      </div>
      
      {/* Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="prose dark:prose-invert max-w-none">
              {renderContent(caseStudy.content)}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-4">Project Details</h3>
                
                {caseStudy.clientName && (
                  <div className="flex items-start mb-3">
                    <Building className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Client</p>
                      <p className="font-medium">{caseStudy.clientName}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start mb-3">
                  <Tag className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p className="font-medium">{caseStudy.category}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="font-medium capitalize">{caseStudy.status}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.technologies?.map((tech: string) => (
                    <Badge key={tech} variant="outline" className="bg-primary/5">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-4">Need Something Similar?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Interested in how we can apply similar solutions to your business?
                </p>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Contact Us
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
