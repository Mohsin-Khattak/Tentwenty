import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { mvs } from '../../../../config/metrices';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outlined';
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  icon,
  style,
  textStyle,
}) => {
  const isPrimary = variant === 'primary';

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.container,
        isPrimary ? styles.primaryContainer : styles.outlinedContainer,
        style,
      ]}
    >
      {icon}
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: mvs(14),
    borderRadius: mvs(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: mvs(8),
    marginBottom: mvs(12),
  },
  primaryContainer: {
    backgroundColor: '#61C3F2',
  },
  outlinedContainer: {
    backgroundColor: 'transparent',
    borderWidth: mvs(1.5),
    borderColor: '#61C3F2',
  },
  text: {
    color: '#FFFFFF',
    fontSize: mvs(15),
    fontWeight: '700',
  },
});
