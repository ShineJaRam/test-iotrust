import classNames from "classnames";

export interface IconProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
}

const sizeMap = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-8 h-8",
  xl: "w-16 h-16",
};

export const Icon = {
  Alert: ({ className, size = "xl", color = "text-red-500" }: IconProps) => (
    <svg
      className={classNames(sizeMap[size], color, className)}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  ),

  Search: ({ className, size = "md", color = "text-gray-400" }: IconProps) => (
    <svg
      className={classNames(sizeMap[size], color, className)}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  ),

  Close: ({ className, size = "md", color = "text-gray-400" }: IconProps) => (
    <svg
      className={classNames(sizeMap[size], color, className)}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  ),

  ChevronRight: ({
    className,
    size = "md",
    color = "text-gray-400",
  }: IconProps) => (
    <svg
      className={classNames(sizeMap[size], color, className)}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  ),

  Trash: ({ className, size = "md", color = "text-gray-400" }: IconProps) => (
    <svg
      className={classNames(sizeMap[size], color, className)}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  ),

  Spinner: ({ className, size = "md", color = "border-green-600" }: IconProps) => (
    <div
      className={classNames(
        sizeMap[size],
        "border-2 border-t-transparent rounded-full animate-spin",
        color,
        className
      )}
    />
  ),
};
