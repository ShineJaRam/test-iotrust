import classNames from "classnames";
import { Icon } from "./icons/Icon";

type LoadingVariant = "spinner" | "skeleton" | "pulse";
type LoadingSize = "sm" | "md" | "lg" | "full";

interface LoadingIndicatorProps {
  variant?: LoadingVariant;
  size?: LoadingSize;
  className?: string;
  message?: string;
  fullScreen?: boolean;
}

const sizeMap = {
  sm: "h-20",
  md: "h-40",
  lg: "h-60",
  full: "h-[200px]",
};

export const LoadingIndicator = ({
  variant = "spinner",
  size = "md",
  className,
  message,
  fullScreen = false,
}: LoadingIndicatorProps) => {
  const containerClasses = classNames(
    "relative w-full flex items-center justify-center",
    {
      "fixed inset-0 bg-white/80 z-50": fullScreen,
      [sizeMap[size]]: !fullScreen,
    },
    className
  );

  if (variant === "skeleton") {
    return (
      <div className={classNames(containerClasses, "bg-gray-200 animate-pulse")}>
        {message && (
          <p className="text-sm text-gray-500 absolute">{message}</p>
        )}
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div className={classNames(containerClasses, "bg-gray-100")}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse" />
          {message && <p className="text-sm text-gray-500">{message}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center gap-3">
        <Icon.Spinner size="lg" color="border-green-600" />
        {message && (
          <p className="text-sm text-gray-600 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
};

export const BannerLoadingIndicator = () => (
  <LoadingIndicator
    variant="skeleton"
    size="full"
    className="bg-gray-200"
  />
);

export const ListLoadingIndicator = ({ message }: { message?: string }) => (
  <div className="text-center py-6">
    <Icon.Spinner size="lg" color="border-green-600" className="mx-auto" />
    {message && <p className="text-sm text-gray-500 mt-2">{message}</p>}
  </div>
);

export const PageLoadingIndicator = ({ message }: { message?: string }) => (
  <LoadingIndicator variant="spinner" fullScreen message={message} />
);

