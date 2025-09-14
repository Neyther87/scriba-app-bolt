import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../../styles/colors';

const Logo = ({ 
  size = 'medium', 
  showText = true, 
  variant = 'default',
  style 
}) => {
  const logoSizes = {
    small: { width: 32, height: 32 },
    medium: { width: 48, height: 48 },
    large: { width: 64, height: 64 },
    xlarge: { width: 96, height: 96 }
  };

  const textSizes = {
    small: typography.fontSize.lg,
    medium: typography.fontSize.xl,
    large: typography.fontSize['2xl'],
    xlarge: typography.fontSize['3xl']
  };

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.logoContainer, logoSizes[size]]}>
        {/* SVG Logo Recreation */}
        <View style={styles.logoSvg}>
          <View style={[styles.circle, logoSizes[size]]} />
          <View style={styles.feather} />
          <View style={styles.pages} />
        </View>
      </View>
      
      {showText && (
        <Text style={[
          styles.brandText, 
          { fontSize: textSizes[size] },
          variant === 'light' && styles.lightText
        ]}>
          ScribaVerse
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoSvg: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  circle: {
    position: 'absolute',
    borderWidth: 3,
    borderColor: colors.primaryPurple,
    borderRadius: 1000,
    backgroundColor: 'transparent',
  },
  feather: {
    position: 'absolute',
    top: '20%',
    right: '25%',
    width: '30%',
    height: '60%',
    backgroundColor: colors.primaryPurple,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 5,
    transform: [{ rotate: '15deg' }],
  },
  pages: {
    position: 'absolute',
    bottom: '25%',
    left: '25%',
    width: '40%',
    height: '30%',
  },
  brandText: {
    fontFamily: typography.fontFamily.brand,
    fontWeight: typography.fontWeight.bold,
    color: colors.primaryPurple,
    marginLeft: 12,
    letterSpacing: -0.5,
  },
  lightText: {
    color: colors.white,
  },
});

export default Logo;