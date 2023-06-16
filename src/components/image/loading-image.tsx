import { Skeleton } from 'antd';
import { FC, HTMLProps, useEffect, useRef, useState } from 'react';

interface ImageProps {
  opacity?: number;
  src: string;
  height: number;
  alt: string;
}

const LoadingImage: FC<HTMLProps<HTMLImageElement> & ImageProps> = ({
  alt,
  height,
  style,
  crossOrigin: _,
  opacity = 1,
  src,
  ...others
}) => {
  const [loaded, setLoaded] = useState(false);
  const [realSrc, setRealSrc] = useState('');

  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handler = () => {
      setLoaded(true);
    };
    const current = imageRef.current;

    current?.addEventListener('load', handler);

    setRealSrc(src);

    return () => current?.removeEventListener('load', handler);
  }, [src]);

  return (
    <div
      className="relative"
      style={{
        height: height,
      }}
    >
      <img
        ref={imageRef}
        style={{
          ...style,
          transition: '0.3s',
          opacity: loaded ? opacity : 0,
        }}
        alt={alt}
        height={height}
        src={realSrc}
        {...others}
      />
      {/* {!loaded && <Skeleton.Avatar active size={200} shape="square" />} */}
      {!loaded && (
        <Skeleton.Avatar
          active
          size={height}
          shape="square"
          className="absolute top-0 left-0"
        />
      )}
    </div>
  );
};

export default LoadingImage;
