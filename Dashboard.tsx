import { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser, isLoggedIn } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, User, History, Settings, Clock, FileText } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const [, navigate] = useLocation();
  const user = getCurrentUser();
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
  }, [navigate]);
  
  // Fetch user generations
  const { data: generations, isLoading } = useQuery({
    queryKey: [`/api/generations/${user?.id}`],
    enabled: !!user?.id,
  });
  
  if (!user) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user.username}
          </p>
        </div>
        
        <Button className="mt-4 md:mt-0 gap-2 bg-primary hover:bg-primary/90" onClick={() => navigate("/generate")}>
          <Sparkles className="h-4 w-4" />
          New Generation
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Generations</CardTitle>
            <Sparkles className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                generations?.length || 0
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              AI content pieces generated
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Account Status</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Active</div>
            <p className="text-xs text-muted-foreground">
              Standard account
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Activity</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <Skeleton className="h-8 w-32" />
              ) : (
                generations && generations.length > 0 ? 
                new Date(generations[0].createdAt).toLocaleDateString() :
                "No activity"
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Last generation date
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="history" className="w-full">
        <TabsList>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            Generation History
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="history" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Generation History</CardTitle>
              <CardDescription>
                View all your previous AI content generations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="border border-border rounded-lg p-4">
                      <Skeleton className="h-6 w-1/3 mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-2/3" />
                      <div className="mt-4 flex justify-between">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : !generations || generations.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-border rounded-lg">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No generations yet</h3>
                  <p className="text-muted-foreground mt-2 mb-6">
                    You haven't created any AI content yet
                  </p>
                  <Button onClick={() => navigate("/generate")}>
                    Create Your First Generation
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {generations.map((gen) => (
                    <div key={gen.id} className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium truncate">{gen.prompt.substring(0, 50)}...</h3>
                        <span className="text-xs text-muted-foreground">
                          {new Date(gen.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {gen.result.substring(0, 150)}...
                      </p>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                          {gen.modelUsed}
                        </span>
                        <Button variant="ghost" size="sm" className="text-primary">
                          View Full Result
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account preferences and settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Username</label>
                  <div className="mt-1 p-2 border border-border rounded-md text-sm">
                    {user.username}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <div className="mt-1 p-2 border border-border rounded-md text-sm">
                    {user.email}
                  </div>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Account Type</label>
                <div className="mt-1 p-2 border border-border rounded-md text-sm flex justify-between items-center">
                  <span>Standard Account</span>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    Upgrade
                  </Button>
                </div>
              </div>
              
              <div className="pt-4">
                <Button variant="outline" className="w-full">
                  Change Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
