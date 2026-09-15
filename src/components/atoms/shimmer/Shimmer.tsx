import React from 'react';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

interface ShimmerProps {
  width: number | string;
  height: number;
  borderRadius?: number;
}

const Shimmer: React.FC<ShimmerProps> = ({
  width,
  height,
  borderRadius = 10,
}) => {
  return (
    <ShimmerPlaceholder
      width={width}
      height={height}
      shimmerStyle={{
        borderRadius,
      }}
      style={{
        borderRadius,
      }}
    />
  );
};

export default React.memo(Shimmer);
