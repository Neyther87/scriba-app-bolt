import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, shadows } from '../../styles/colors';

const Card = ({
  children,
  style,
  onPress,
  variant = 'default',
  padding = 'medium',
  ...props
}) => {
  const Component = onPress ? TouchableOpacity : View;
  
  const getCardStyle = () => {
    const baseStyle = [styles.card, styles[padding]];
    
    switch (variant) {
      case 'elevated':
        return [...baseStyle, styles.elevated];
      case 'outlined':
        return [...baseStyle, styles.outlined];
      case 'flat':
        return [...baseStyle, styles.flat];
      default:
        return [...baseStyle, styles.default];
    }
  };

  return (
    <Component
      style={[...getCardStyle(), style]}
      onPress={onPress}
      activeOpacity={onPress ? 0.95 : 1}
      {...props}
    >
      {children}
    </Component>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
  },
  
  // Padding variants
  none: {
    padding: 0,
  },
  small: {
    padding: 12,
  },
  medium: {
    padding: 16,
  },
  large: {
    padding: 24,
  },
  
  // Style variants
  default: {
    ...shadows.card,
  },
  elevated: {
    ...shadows.large,
  },
  outlined: {
    borderWidth: 1,
    borderColor: colors.textTertiary + '30',
    shadowOpacity: 0,
  },
  flat: {
    shadowOpacity: 0,
    elevation: 0,
  },
});

export default Card;