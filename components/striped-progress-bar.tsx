import { Progress } from "@/components/ui/progress";

export default function StripedProgressBar({value, className, ...props}: {value: number, className: string}) {
  return (
    <Progress
      value={value}
      className={`
        bg-gray-200 
        overflow-hidden
        [&>div]:relative 
        [&>div]:bg-[length:30px_30px]
        [&>div]:bg-[linear-gradient(45deg,_rgba(255,255,255,0.3)_25%,_transparent_25%,_transparent_50%,_rgba(255,255,255,0.3)_50%,_rgba(255,255,255,0.3)_75%,_transparent_75%,_transparent)]
        [&>div]:animate-stripes
        [&>div]:bg-blue-600
        ${className}
      `}
      {...props}
    />
  );
}