import { Card, CardHeader } from "@/components/ui/card";

export default function Skeleton() {
  return (
    <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 overflow-hidden animate-pulse">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            {/* Quiz Title Skeleton */}
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-md w-48 mb-2"></div>

            {/* Date and Score Row */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              {/* Date Skeleton */}
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
              </div>

              {/* Score Section Skeleton */}
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-full w-12"></div>
              </div>
            </div>
          </div>

          {/* Chevron Icon Skeleton */}
          <div className="ml-4">
            <div className="h-5 w-5 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
