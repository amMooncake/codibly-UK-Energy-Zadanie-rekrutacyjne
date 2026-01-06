import { LoaderIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function CustomSpinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-10 animate-spin", className)}
      {...props}
    />
  )
}

export function Spinner() {
  return (
    <div className="flex items-center gap-4">
      <CustomSpinner />
    </div>
  )
}
