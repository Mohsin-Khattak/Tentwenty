import { Dimensions, PixelRatio } from 'react-native';

const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

const calculateXdHeight = (targetHeight: number) => {
  const heightPercent = Math.round((targetHeight / 812) * 100);
  return PixelRatio.roundToNearestPixel((height * heightPercent) / 100);
};

const calculateXdWidth = (targetWidth: number) => {
  const widthPercent = Math.round((targetWidth / 375) * 100);
  return PixelRatio.roundToNearestPixel((width * widthPercent) / 100);
};

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const scale = (size: number) => (width / guidelineBaseWidth) * size;
const vs = (size: number) => (height / guidelineBaseHeight) * size;
const ms = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;
const mvs = (size: number, factor = 0.5) => size + (vs(size) - size) * factor;

export {
  scale,
  vs,
  ms,
  mvs,
  height,
  width,
  calculateXdHeight as xdHeight,
  calculateXdWidth as xdWith,
};
