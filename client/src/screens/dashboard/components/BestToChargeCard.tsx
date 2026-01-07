import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Zap, Leaf } from "lucide-react"

import { BestWindow } from "@/types";

export default function BestTimeToChargeCard({ bestWindowData }: { bestWindowData: BestWindow | null }) {

  // if task endpoint was different I would map through the data instead of hardcoding
  const sources = ["Biomass", "Nuclear", "Hydro", "Wind", "Solar"]

  const avgPerc = bestWindowData?.averageEcoPercent

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center space-x-4 pb-2">
        <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
          <Leaf className="h-5 w-5 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <p className={"text-2xl font-bold " + (
            avgPerc as number <= 70 ?
              avgPerc as number <= 50 ?
                "text-red-400"
                : "text-orange-400" 
                : "text-green-600"
          )}>{bestWindowData?.averageEcoPercent}% Clean</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-3 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <div className="flex flex-col">
            <span className="font-semibold text-foreground">
              {bestWindowData?.from.substring(11, 16)} — {bestWindowData?.to.substring(11, 16)}
            </span>
            <span className="text-xs text-muted-foreground">{bestWindowData ? bestWindowData?.from.substring(0, 10) : '-'}</span>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Based on
          </p>
          <div className="flex flex-wrap gap-1.5">
            {sources.map((source) => (
              <Badge key={source} variant="outline" className="font-normal bg-green-200 border-0">
                {source}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}