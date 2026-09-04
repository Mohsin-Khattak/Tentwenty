import React, { useState } from 'react';
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Rect, Text as SvgText } from 'react-native-svg';
import styles from './styles';
import BackHeader from '../../components/atoms/back-header';
import { colors } from '../../config/colors';
import Medium from '../../typography/medium-text';
import SemiBold from '../../typography/semi-bold-text';

export interface SelectedSeat {
  id: string;
  row: number;
  col: number;
  price: number;
}

const SeatLayout = () => {
  const insets = useSafeAreaInsets();
  const [scale, setScale] = useState<number>(1);

  // Default selected seat matching Figma design (e.g. 3-4)
  const [selectedSeats, setSelectedSeats] = useState<SelectedSeat[]>([
    { id: '3-4', row: 3, col: 4, price: 50 },
  ]);

  // Unavailable seats list
  const unavailableSeats = [
    '1-1',
    '1-2',
    '1-5',
    '1-6',
    '1-9',
    '1-10',
    '1-13',
    '1-14',
    '2-2',
    '2-4',
    '2-5',
    '2-6',
    '2-9',
    '2-10',
    '2-13',
    '2-14',
    '3-1',
    '3-3',
    '3-7',
    '3-8',
    '3-11',
    '3-12',
    '3-15',
    '3-16',
    '4-1',
    '4-2',
    '4-4',
    '4-5',
    '4-6',
    '4-9',
    '4-10',
    '4-13',
    '4-14',
  ];

  const handleZoomIn = () => {
    if (scale < 1.8) setScale(prev => prev + 0.2);
  };

  const handleZoomOut = () => {
    if (scale > 0.7) setScale(prev => prev - 0.2);
  };

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
    if (isUnavailable(id)) return 'rgba(166, 166, 166, 0.5)'; // Gray (Not Available)
    if (isVIP) return '#564CA3'; // VIP Blue/Purple
    return '#61C3F2'; // Regular Cyan
  };

  // Helper component to render Figma seat rects with click actions
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
        {/* Main Seat Box */}
        <Rect
          x={x}
          y={y}
          width={6.98}
          height={5.23}
          rx={0.98}
          fill={seatColor}
          onPress={() => toggleSeat(id, row, col, isVIP)}
        />
        {/* Seat Cushion/Bottom Bar */}
        <Rect
          x={x + 1}
          y={y + 5.5}
          width={4.88}
          height={1.04}
          rx={0.52}
          fill={seatColor}
          onPress={() => toggleSeat(id, row, col, isVIP)}
        />
      </React.Fragment>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          paddingTop: Platform.OS === 'ios' ? insets.top : 20,
          backgroundColor: colors.white,
        }}
      />

      <BackHeader
        title="The King’s Man"
        subtitle="March 5, 2021 | 12:30 Hall 1"
      />

      {/* Main Seat Canvas */}
      <View style={styles.mappingArea}>
        <ScrollView
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScrollContent}
        >
          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.verticalScrollContent}
          >
            <View style={{ transform: [{ scale }], padding: 20 }}>
              {/* Exact SVG viewBox from Figma Export */}
              <Svg width={329} height={190} viewBox="0 0 329 190">
                {/* Cinema Screen Curve */}
                <Path
                  d="M 20 20 Q 164.5 0 309 20"
                  stroke="#61C3F2"
                  strokeWidth={1.5}
                  fill="none"
                />
                <SvgText
                  x="164.5"
                  y="32"
                  fontSize="7"
                  fill="#8F8996"
                  textAnchor="middle"
                  letterSpacing="2"
                  fontWeight="600"
                >
                  SCREEN
                </SvgText>

                {/* SVG Interactive Seats Mapping */}
                {Array.from({ length: 10 }).map((_, rIdx) => {
                  const rowNum = rIdx + 1;
                  const yPos = 44 + rIdx * 12;
                  const isVIPRow = rowNum === 10;

                  return (
                    <React.Fragment key={`svg-row-${rowNum}`}>
                      {/* Left Block Seats */}
                      {renderInteractiveSVGSeat(
                        `${rowNum}-1`,
                        rowNum,
                        1,
                        38,
                        yPos,
                        isVIPRow,
                      )}
                      {renderInteractiveSVGSeat(
                        `${rowNum}-2`,
                        rowNum,
                        2,
                        51,
                        yPos,
                        isVIPRow,
                      )}

                      {/* Middle Block Seats */}
                      {Array.from({ length: 12 }).map((_, cIdx) => {
                        const colNum = cIdx + 3;
                        const xPos = 77 + cIdx * 13;
                        return renderInteractiveSVGSeat(
                          `${rowNum}-${colNum}`,
                          rowNum,
                          colNum,
                          xPos,
                          yPos,
                          isVIPRow,
                        );
                      })}

                      {/* Right Block Seats */}
                      {renderInteractiveSVGSeat(
                        `${rowNum}-15`,
                        rowNum,
                        15,
                        270,
                        yPos,
                        isVIPRow,
                      )}
                      {renderInteractiveSVGSeat(
                        `${rowNum}-16`,
                        rowNum,
                        16,
                        283,
                        yPos,
                        isVIPRow,
                      )}
                    </React.Fragment>
                  );
                })}
              </Svg>
            </View>
          </ScrollView>
        </ScrollView>

        {/* Zoom Action Buttons */}
        <View style={styles.zoomContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleZoomIn}
            style={styles.zoomButton}
          >
            <Text style={styles.zoomText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleZoomOut}
            style={styles.zoomButton}
          >
            <Text style={styles.zoomText}>−</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.dividerLine} />

      {/* Bottom Sheet Details */}
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
            <View
              style={[
                styles.legendSeat,
                { backgroundColor: 'rgba(166, 166, 166, 0.5)' },
              ]}
            />
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

        {/* Selected Seat Tags Chip */}
        {selectedSeats.length > 0 && (
          <ScrollView
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
          </ScrollView>
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
    </View>
  );
};

export default SeatLayout;
