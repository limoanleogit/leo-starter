import React from 'react';

// Mock for next/image
const Image = ({
  src,
  alt,
  width,
  height,
  layout,
  objectFit,
  quality,
  priority,
  placeholder,
  blurDataURL,
  ...props
}) => {
  // Handle layout prop
  const styles = {};
  if (layout === 'fill') {
    styles.position = 'absolute';
    styles.inset = '0';
    styles.width = '100%';
    styles.height = '100%';
  } else {
    if (width) styles.width = typeof width === 'number' ? `${width}px` : width;
    if (height) styles.height = typeof height === 'number' ? `${height}px` : height;
  }

  if (objectFit) styles.objectFit = objectFit;

  return <img src={typeof src === 'object' ? src.src : src} alt={alt} style={styles} {...props} />;
};

// Mock for next/link
const Link = ({
  href,
  as,
  replace,
  scroll,
  shallow,
  passHref,
  prefetch,
  locale,
  children,
  ...props
}) => {
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
};

// Set up the object structure for both named exports (ESM) and module.exports (CommonJS)
const mocks = {
  __esModule: true,
  default: Image,
  Link: Link,
};

// Export for ES modules
export const __esModule = true;
export default Image;
export { Link };

// Export for CommonJS
module.exports = mocks;
