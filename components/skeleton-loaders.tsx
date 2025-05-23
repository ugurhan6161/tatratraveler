import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function HeroSkeleton() {
  return (
    <div className="relative h-[600px] overflow-hidden">
      <Skeleton className="absolute inset-0" />
      <div className="relative h-full flex flex-col justify-center items-center text-center p-4 z-10">
        <Skeleton className="h-16 w-96 mb-4" />
        <Skeleton className="h-6 w-80 mb-8" />
        <div className="flex gap-4">
          <Skeleton className="h-12 w-32" />
          <Skeleton className="h-12 w-32" />
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="w-3 h-3 rounded-full" />
        ))}
      </div>
    </div>
  )
}

export function BookingFormSkeleton() {
  return (
    <Card className="w-full shadow-lg border-none">
      <CardHeader className="bg-muted rounded-t-lg">
        <Skeleton className="h-8 w-48 mx-auto" />
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-3 gap-2 mb-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-10 rounded-md" />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>

        <Skeleton className="h-12 w-full mt-6" />
      </CardContent>
    </Card>
  )
}

export function DestinationCardSkeleton() {
  return (
    <div className="group relative rounded-lg overflow-hidden shadow-lg">
      <div className="relative h-64 w-full overflow-hidden">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <Skeleton className="h-6 w-32 mb-1 bg-white/20" />
        <Skeleton className="h-4 w-48 mb-3 bg-white/20" />
        <Skeleton className="h-8 w-20 bg-white/20" />
      </div>
    </div>
  )
}

export function DestinationsSkeleton() {
  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <DestinationCardSkeleton key={i} />
        ))}
      </div>
      <div className="flex justify-center mt-8 gap-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    </div>
  )
}

export function NavBarSkeleton() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Skeleton className="h-8 w-32" />

        <nav className="hidden md:flex items-center gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-4 w-16" />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8 md:hidden" />
        </div>
      </div>
    </header>
  )
}

export function FooterSkeleton() {
  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Skeleton className="h-6 w-32 mb-4" />
            <Skeleton className="h-4 w-48 mb-2" />
            <Skeleton className="h-4 w-40" />
          </div>

          <div>
            <Skeleton className="h-6 w-24 mb-4" />
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-40" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>

          <div>
            <Skeleton className="h-6 w-20 mb-4" />
            <div className="flex gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center">
          <Skeleton className="h-4 w-64 mx-auto" />
        </div>
      </div>
    </footer>
  )
}
