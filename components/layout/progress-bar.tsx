import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Processing...</span>
        <span>{progress}%</span>
      </div>
      <Progress value={progress} />
    </div>
  );
}
