export const IMAGE_SIZES = {
  ICON_SM: "48px",
  ICON_MD: "64px",
  ICON_LG: "96px",
  BANNER: "(max-width: 759px) 100vw, 759px",
  FULL_WIDTH: "100vw",
} as const;

export const IMAGE_QUALITY = {
  LOW: 50,
  MEDIUM: 75,
  HIGH: 85,
  MAX: 100,
} as const;

export const DEFAULT_IMAGE_CONFIG = {
  quality: IMAGE_QUALITY.HIGH,
  loading: "lazy" as const,
};
