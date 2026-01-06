import {Spinner} from "../../components/ui/spinner"

export default function LoadingScreen() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Spinner></Spinner>
        <p className="text-sm font-medium text-muted-foreground animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}