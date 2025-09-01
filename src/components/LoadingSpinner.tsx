
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export default function LoadingSpinner({ 
  size = 'md', 
  text = 'Carregando...',
  className = ''
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6", 
    lg: "h-8 w-8"
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      <div className="relative">
        <div className={`animate-spin rounded-full border-2 border-gray-200 border-t-primary ${sizeClasses[size]}`}></div>
        <div className={`absolute inset-0 animate-ping rounded-full border border-primary opacity-20 ${sizeClasses[size]}`}></div>
      </div>
      <span className={`${textSizeClasses[size]} text-text-secondary font-medium animate-pulse`}>
        {text}
      </span>
    </div>
  );
}
