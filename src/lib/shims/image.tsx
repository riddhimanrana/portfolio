import * as React from "react";

type ImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  sizes?: string;
};

// Drop-in replacement for next/image: plain <img>. Assets are static files in
// /public, so there is no optimization pipeline — width/height prevent CLS and
// `fill` mimics next/image's absolutely-positioned cover mode.
const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    { src, width, height, fill, priority, quality: _quality, sizes, style, alt = "", loading, ...props },
    ref
  ) => {
    const fillStyle: React.CSSProperties | undefined = fill
      ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", ...style }
      : style;
    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        sizes={sizes}
        loading={loading ?? (priority ? "eager" : "lazy")}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        style={fillStyle}
        {...props}
      />
    );
  }
);
Image.displayName = "Image";

export default Image;
