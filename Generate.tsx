import React, { useEffect } from "react";
import { useLocation } from "wouter";
import { getCurrentUser, isLoggedIn } from "@/lib/auth";
import GeneratorForm from "@/components/GeneratorForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, TextCursorInput, ImageIcon, Code, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Generate() {
  const [, navigate] = useLocation();
  const user = getCurrentUser();
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
  }, [navigate]);
  
  if (!user) {
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          AI Content Generator
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Create high-quality content using our advanced generative AI models.
          Specify your requirements and let the AI do the work.
        </p>
      </div>
      
      <Card className="mb-8">
        <CardContent className="p-6">
          <Alert className="bg-primary/5 border-primary/20 mb-4">
            <AlertCircle className="h-4 w-4 text-primary" />
            <AlertTitle>Premium Feature</AlertTitle>
            <AlertDescription>
              You're using the AI generator feature which is only available to registered users.
            </AlertDescription>
          </Alert>
          
          <Tabs defaultValue="text" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="text" className="flex-1 flex items-center justify-center gap-2">
                <TextCursorInput className="h-4 w-4" />
                Text Generation
              </TabsTrigger>
              <TabsTrigger value="image" className="flex-1 flex items-center justify-center gap-2" disabled>
                <ImageIcon className="h-4 w-4" />
                Image Generation
              </TabsTrigger>
              <TabsTrigger value="code" className="flex-1 flex items-center justify-center gap-2" disabled>
                <Code className="h-4 w-4" />
                Code Generation
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="text" className="mt-6">
              <GeneratorForm />
            </TabsContent>
            
            <TabsContent value="image">
              <div className="py-20 text-center">
                <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">Image Generation</h3>
                <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                  This feature will be available soon. Stay tuned for updates!
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="code">
              <div className="py-20 text-center">
                <Code className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">Code Generation</h3>
                <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                  This feature will be available soon. Stay tuned for updates!
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Usage Tips</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>• Be specific about what you want to generate</p>
            <p>• Include details like tone, style, and length</p>
            <p>• Use clear instructions for better results</p>
            <p>• Try different AI models for different types of content</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Output Formats</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>• Plain text for general content</p>
            <p>• Structured text with headings and lists</p>
            <p>• Creative writing with narrative flow</p>
            <p>• Technical content with proper terminology</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Our AI Models</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>• Standard Model: Balanced performance</p>
            <p>• Creative Model: Optimized for creative content</p>
            <p>• Business Model: Professional business content</p>
            <p>• More specialized models coming soon!</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
