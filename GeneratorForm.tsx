import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { generateContent } from "@/lib/ai";
import { getCurrentUser } from "@/lib/auth";
import { Sparkles, AlertCircle, Loader2 } from "lucide-react";
import { queryClient } from "@/lib/queryClient";

const formSchema = z.object({
  prompt: z.string().min(10, "Prompt must be at least 10 characters").max(1000, "Prompt must be less than 1000 characters"),
  modelUsed: z.string().default("default-model"),
});

type FormValues = z.infer<typeof formSchema>;

export default function GeneratorForm() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const { toast } = useToast();
  const user = getCurrentUser();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      modelUsed: "default-model",
    },
  });

  async function onSubmit(values: FormValues) {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to use the AI generator.",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    setGeneratedContent(null);
    
    try {
      const result = await generateContent({
        prompt: values.prompt,
        userId: user.id,
        modelUsed: values.modelUsed,
      });
      
      setGeneratedContent(result.result);
      
      // Invalidate generations cache
      queryClient.invalidateQueries({ queryKey: [`/api/generations/${user.id}`] });
      
      toast({
        title: "Generation Successful",
        description: "Your content has been generated successfully.",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "An error occurred while generating content. Please try again.",
        variant: "destructive",
      });
      console.error("Generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Prompt</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe what you'd like the AI to generate..." 
                    className="min-h-[120px] resize-y"
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Be specific about what you want to generate. The more details you provide, the better the results.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="modelUsed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>AI Model</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an AI model" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="default-model">Standard AI Model</SelectItem>
                    <SelectItem value="creative-model">Creative AI Model</SelectItem>
                    <SelectItem value="business-model">Business AI Model</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Different models are optimized for different types of content generation.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            size="lg"
            className="w-full bg-primary hover:bg-primary/90 gap-2"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate Content
              </>
            )}
          </Button>
        </form>
      </Form>
      
      {generatedContent && (
        <Card className="mt-8 border-primary/20">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Generated Content
            </h3>
            <div className="bg-card-foreground/5 p-4 rounded-md whitespace-pre-wrap">
              {generatedContent.split('\n').map((line, index) => (
                <p key={index} className={line.trim() === '' ? 'h-4' : 'mb-2'}>
                  {line}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {!generatedContent && !isGenerating && (
        <div className="text-center p-12 border border-dashed border-border rounded-lg">
          <Sparkles className="h-12 w-12 text-primary/40 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground">No Content Generated Yet</h3>
          <p className="text-muted-foreground mt-2">
            Use the form above to generate AI content
          </p>
        </div>
      )}
    </div>
  );
}
