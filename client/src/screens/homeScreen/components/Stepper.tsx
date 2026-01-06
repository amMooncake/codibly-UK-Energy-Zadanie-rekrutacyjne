import * as React from "react"
import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"


export default function Stepper({ hours, setHours }: {hours: number, setHours: React.Dispatch<React.SetStateAction<number>>}) {
    function handleValueChange(newValue: number) {
        if (newValue >= 1 && newValue <= 6) {
            setHours(newValue)
        }
    }

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center border rounded-lg overflow-hidden bg-background">
                <div className="px-4 py-2 text-sm font-medium min-w-12 text-center">
                    {hours}
                </div>

                <div className="flex border-l">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-none border-r"
                        onClick={() => handleValueChange(hours - 1)}
                    >
                        <Minus className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-none"
                        onClick={() => handleValueChange(hours + 1)}
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}