import React, { useState } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Rect, Text as SvgText } from 'react-native-svg';
import styles from './styles';
import BackHeader from '../../components/atoms/back-header';
import { colors } from '../../config/colors';
import Medium from '../../typography/medium-text';
import SemiBold from '../../typography/semi-bold-text';
import { unavailableSeats } from '../../config/constant';
import { MinusIcon, PlusIcon } from '../../assets/icons';

export interface SelectedSeat {
  id: string;
  row: number;
  col: number;
  price: number;
}

const SeatLayoutScreen = () => {
  const insets = useSafeAreaInsets();

  // Shared values for Google Maps style Zooming & Dragging
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  // Default selected seat matching Screenshot (Gold seat at Row 3, Col 9)
  const [selectedSeats, setSelectedSeats] = useState<SelectedSeat[]>([
    { id: '3-9', row: 3, col: 9, price: 50 },
  ]);

  // Exact unavailable (grey) seats mapped from the provided screenshot image

  const pinchGesture = Gesture.Pinch()
    .onUpdate(e => {
      const targetScale = savedScale.value * e.scale;
      if (targetScale >= 0.8 && targetScale <= 3) {
        scale.value = targetScale;
      }
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      translateX.value = savedTranslateX.value + e.translationX;
      translateY.value = savedTranslateY.value + e.translationY;
    })
    .onEnd(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    });

  const composedGesture = Gesture.Simultaneous(pinchGesture, panGesture);

  const handleZoomIn = () => {
    if (scale.value < 2.5) {
      scale.value = withTiming(scale.value + 0.3);
      savedScale.value += 0.3;
    }
  };

  const handleZoomOut = () => {
    if (scale.value > 0.8) {
      scale.value = withTiming(scale.value - 0.3);
      savedScale.value -= 0.3;
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  const isSelected = (id: string) => selectedSeats.some(s => s.id === id);
  const isUnavailable = (id: string) => unavailableSeats.includes(id);

  const toggleSeat = (id: string, row: number, col: number, isVIP = false) => {
    if (isUnavailable(id)) return;

    if (isSelected(id)) {
      setSelectedSeats(prev => prev.filter(item => item.id !== id));
    } else {
      const price = isVIP ? 150 : 50;
      setSelectedSeats(prev => [...prev, { id, row, col, price }]);
    }
  };

  const removeSeat = (id: string) => {
    setSelectedSeats(prev => prev.filter(item => item.id !== id));
  };

  const totalPrice = selectedSeats.reduce((sum, item) => sum + item.price, 0);

  const getSeatColor = (id: string, isVIP = false) => {
    if (isSelected(id)) return '#CD9D0F'; // Gold (Selected)
    if (isUnavailable(id)) return '#D8D8D8'; // Gray (Unavailable)
    if (isVIP) return '#564CA3'; // VIP Dark Blue/Purple
    return '#61C3F2'; // Regular Blue
  };

  const renderInteractiveSVGSeat = (
    id: string,
    row: number,
    col: number,
    x: number,
    y: number,
    isVIP = false,
  ) => {
    const seatColor = getSeatColor(id, isVIP);

    return (
      <React.Fragment key={`seat-${id}`}>
        <Rect
          x={x}
          y={y}
          width={7.5}
          height={5.5}
          rx={1.2}
          fill={seatColor}
          onPress={() => toggleSeat(id, row, col, isVIP)}
        />
        <Rect
          x={x + 0.8}
          y={y + 6}
          width={5.9}
          height={1.3}
          rx={0.6}
          fill={seatColor}
          onPress={() => toggleSeat(id, row, col, isVIP)}
        />
      </React.Fragment>
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View
        style={{
          paddingTop: insets?.top ? insets.top + 5 : 25,
          backgroundColor: '#FFFFFF',
        }}
      />

      <BackHeader
        title="The King’s Man"
        subtitle="March 5, 2021 | 12:30 Hall 1"
      />

      <View style={styles.mappingArea}>
        <GestureDetector gesture={composedGesture}>
          <Animated.View
            style={[
              { flex: 1, alignItems: 'center', justifyContent: 'center' },
              animatedStyle,
            ]}
          >
            {/* ViewBox adjusted slightly for perfect center alignment */}
            <Svg width={380} height={230} viewBox="0 0 380 230">
              <Path
                d="M 40 25 Q 190 0 340 25"
                stroke="#61C3F2"
                strokeWidth={1.8}
                fill="none"
              />
              <SvgText
                x="190"
                y="38"
                fontSize="8"
                fill="#8F8996"
                textAnchor="middle"
                letterSpacing="2.5"
                fontWeight="bold"
              >
                SCREEN
              </SvgText>

              {/* Rows and Seats Rendering */}
              {Array.from({ length: 10 }).map((_, rIdx) => {
                const rowNum = rIdx + 1;
                const yPos = 52 + rIdx * 16;
                const isVIPRow = rowNum === 10;

                return (
                  <React.Fragment key={`svg-row-${rowNum}`}>
                    <SvgText
                      x="20"
                      y={yPos + 5.5}
                      fontSize="8"
                      fill="#202C43"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {rowNum}
                    </SvgText>

                    {/* 24 Total Columns across 3 Blocks (5 Left, 14 Middle, 5 Right) */}
                    {Array.from({ length: 24 }).map((_, cIdx) => {
                      const colNum = cIdx + 1;

                      // Handle missing seats in top rows (Empty spaces matching screenshot)
                      let shouldRender = true;
                      if (rowNum === 1 && (colNum <= 3 || colNum >= 22))
                        shouldRender = false;
                      if (
                        (rowNum === 2 || rowNum === 3 || rowNum === 4) &&
                        (colNum === 1 || colNum === 24)
                      )
                        shouldRender = false;

                      if (!shouldRender) return null;

                      // Block X Pos Calculation with 15px gap between blocks
                      let xPos = 40;
                      if (colNum <= 5) {
                        xPos += (colNum - 1) * 11;
                      } else if (colNum <= 19) {
                        xPos += 5 * 11 + 15 + (colNum - 6) * 11;
                      } else {
                        xPos += 5 * 11 + 15 + 14 * 11 + 15 + (colNum - 20) * 11;
                      }

                      return renderInteractiveSVGSeat(
                        `${rowNum}-${colNum}`,
                        rowNum,
                        colNum,
                        xPos,
                        yPos,
                        isVIPRow,
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </Svg>
          </Animated.View>
        </GestureDetector>

        <View style={styles.zoomContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleZoomIn}
            style={styles.zoomButton}
          >
            <PlusIcon />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleZoomOut}
            style={styles.zoomButton}
          >
            <MinusIcon />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.dividerLine} />

      <View
        style={[
          styles.bottomSheet,
          { paddingBottom: (insets.bottom || 10) + 10 },
        ]}
      >
        <View style={styles.legendGrid}>
          <View style={styles.legendItem}>
            <View style={[styles.legendSeat, { backgroundColor: '#CD9D0F' }]} />
            <Medium style={styles.legendLabel}>Selected</Medium>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendSeat, { backgroundColor: '#D8D8D8' }]} />
            <Medium style={styles.legendLabel}>Not available</Medium>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendSeat, { backgroundColor: '#564CA3' }]} />
            <Medium style={styles.legendLabel}>VIP (150$)</Medium>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendSeat, { backgroundColor: '#61C3F2' }]} />
            <Medium style={styles.legendLabel}>Regular (50 $)</Medium>
          </View>
        </View>

        {selectedSeats.length > 0 && (
          <Animated.ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tagsScrollView}
          >
            {selectedSeats.map(seat => (
              <View key={`tag-${seat.id}`} style={styles.tagChip}>
                <SemiBold style={styles.tagText}>
                  {seat.col} / {seat.row} row
                </SemiBold>
                <TouchableOpacity onPress={() => removeSeat(seat.id)}>
                  <Text style={styles.tagClose}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
          </Animated.ScrollView>
        )}

        <View style={styles.footerRow}>
          <View style={styles.priceContainer}>
            <Medium style={styles.priceLabel}>Total Price</Medium>
            <SemiBold style={styles.priceValue}>$ {totalPrice}</SemiBold>
          </View>

          <TouchableOpacity activeOpacity={0.8} style={styles.payButton}>
            <SemiBold style={styles.payButtonText}>Proceed to pay</SemiBold>
          </TouchableOpacity>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default SeatLayoutScreen;
