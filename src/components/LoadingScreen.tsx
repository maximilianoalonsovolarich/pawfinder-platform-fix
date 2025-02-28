import { Heart } from "lucide-react";

interface LoadingScreenProps {
  message?: string;
}

/**
 * A loading screen component that displays a spinner and optional message
 */
const LoadingScreen = ({ message = "Cargando..." }: LoadingScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-4">
          <Heart className="absolute inset-0 w-full h-full text-primary animate-pulse" />
        </div>
        <p className="text-lg text-foreground">{message}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
