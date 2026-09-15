import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { colors } from '../../../config/colors';

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width - 32;
const BANNER_HEIGHT = 240;

interface BannerItem {
  id: string;
  title: string;
  backdropPath: string;
  genre?: string;
}

interface BannerProps {
  data: BannerItem[];
  onPressPlay?: (item: BannerItem) => void;
}

export default function BannerCarousel({ data, onPressPlay }: BannerProps) {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play sliding effect
  useEffect(() => {
    if (!data || data.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = prevIndex < data.length - 1 ? prevIndex + 1 : 0;
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        return nextIndex;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [data]);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    if (index >= 0 && index < data.length) {
      setCurrentIndex(index);
    }
  };

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <View style={styles.outerContainer}>
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={width}
        decelerationRate="fast"
        keyExtractor={item => item.id}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => {
          const imageUri = item.backdropPath?.startsWith('http')
            ? item.backdropPath
            : `https://image.tmdb.org/t/p/w500${item.backdropPath}`;

          return (
            <View style={styles.slideWrapper}>
              <TouchableOpacity activeOpacity={0.95} style={styles.bannerItem}>
                {/* Background Image */}
                <FastImage
                  source={{
                    uri: imageUri,
                    priority: FastImage.priority.high,
                  }}
                  style={[styles.bannerImage as any]}
                  resizeMode={FastImage.resizeMode.cover}
                />

                {/* Overlay covering 100% of the image, pushing content to the bottom */}
                <View style={styles.overlay}>
                  <View style={styles.contentContainer}>
                    <Text style={styles.movieTitle} numberOfLines={2}>
                      {item.title}
                    </Text>

                    <TouchableOpacity
                      style={styles.watchNowButton}
                      onPress={() => (onPressPlay ? onPressPlay(item) : '')}
                    >
                      <Text style={styles.watchNowText}>Watch Now</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />

      {/* Smooth Pagination Dots */}
      <View style={styles.paginationContainer}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    marginVertical: 10,
    backgroundColor: colors.white,
  },
  slideWrapper: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerItem: {
    width: BANNER_WIDTH,
    height: BANNER_HEIGHT,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Cinematic dim effect
    justifyContent: 'flex-end', // Content ko bilkul neechay (bottom) le ayega
    padding: 16,
    zIndex: 2,
  },
  contentContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'flex-start', // Right side alignment for text and button
  },
  movieTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
    position: 'absolute',
    zIndex: 1,
    bottom: 30,
  },
  watchNowButton: {
    backgroundColor: colors.darkpurple,
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
  },
  watchNowText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    height: 5,
    borderRadius: 3,
    marginHorizontal: 3,
  },
  activeDot: {
    width: 18,
    backgroundColor: colors.darkpurple,
  },
  inactiveDot: {
    width: 5,
    backgroundColor: colors.oldlavender,
  },
});
