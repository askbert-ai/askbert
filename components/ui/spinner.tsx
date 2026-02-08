import { cn } from "@/lib/utils"
import { RefreshCw } from "lucide-react"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <RefreshCw role="status" aria-label="Loading" color="#615C8B" className={cn("size-4 animate-spin", className)} {...props} />
  )
}

export { Spinner }
