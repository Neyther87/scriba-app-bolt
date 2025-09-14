// ScribaVerse Brand Colors
export const colors = {
  // Primary Brand Colors
  primaryPurple: '#5E2D91',
  accentGold: '#C69C6D',
  deepBlue: '#0B3A6F',
  
  // Background & Surface
  lightBackground: '#F4F6F8',
  white: '#FFFFFF',
  surface: '#FAFBFC',
  
  // Text Colors
  textPrimary: '#0D1B2A',
  textSecondary: '#415A77',
  textTertiary: '#778DA9',
  textLight: '#FFFFFF',
  
  // Status Colors
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Gradients
  purpleGradient: 'linear-gradient(135deg, #5E2D91 0%, #8B5FBF 100%)',
  goldGradient: 'linear-gradient(135deg, #C69C6D 0%, #D4B887 100%)',
  blueGradient: 'linear-gradient(135deg, #0B3A6F 0%, #1E3A8A 100%)',
  
  // Opacity variants
  purpleLight: '#5E2D9120',
  goldLight: '#C69C6D20',
  blueLight: '#0B3A6F20',
  
  // Dark theme variants
  dark: {
    background: '#0D1B2A',
    surface: '#1B2937',
    textPrimary: '#E2E8F0',
    textSecondary: '#94A3B8',
  }
};

export const shadows = {
  small: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
  medium: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
  large: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
  card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
};

export const typography = {
  fontFamily: {
    ui: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    brand: "'Merriweather', Georgia, serif",
    reading: "'Merriweather', Georgia, serif",
    dyslexia: "'OpenDyslexic', monospace",
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  }
};