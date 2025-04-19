import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import CaseStudyCard from "./CaseStudyCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function PortfolioGrid() {
  const { data: caseStudies, isLoading, error } = useQuery({
    queryKey: ['/api/case-studies'],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="border border-border rounded-lg overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <div className="p-6">
              <Skeleton className="h-6 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex gap-2 mt-4">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-14" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-destructive text-lg">Failed to load portfolio items.</p>
        <p className="text-muted-foreground">Please try again later.</p>
      </div>
    );
  }

  // No case studies found
  if (!caseStudies || caseStudies.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg font-medium">No case studies found.</p>
        <p className="text-muted-foreground">Check back later for our updated portfolio.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {caseStudies.map((study, index) => (
        <motion.div
          key={study.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <CaseStudyCard {...study} />
        </motion.div>
      ))}
    </div>
  );
}
