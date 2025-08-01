/**
 * Theme configuration for Do IT Fitness App
 * Energetic and bold design with vibrant colors and strong typography
 */

export const colors = {
  // Primary brand colors - Electric and energetic
  primary: '#FF6B35',        // Vibrant orange-red
  primaryDark: '#E55A2B',    // Darker orange for pressed states
  primaryLight: '#FF8A65',   // Lighter orange for backgrounds
  
  // Secondary colors - Electric blue accent
  secondary: '#00BCD4',      // Electric cyan
  secondaryDark: '#0097A7',  // Darker cyan
  secondaryLight: '#4DD0E1', // Lighter cyan
  
  // Accent colors - Bold magenta
  accent: '#E91E63',         // Bold pink/magenta
  accentDark: '#C2185B',     // Darker magenta
  accentLight: '#F48FB1',    // Lighter magenta
  
  // Success and energy colors
  success: '#4CAF50',        // Vibrant green
  warning: '#FF9800',        // Bold orange
  error: '#F44336',          // Bold red
  
  // Neutral colors with high contrast
  background: '#FAFAFA',     // Very light gray
  surface: '#FFFFFF',        // Pure white
  surfaceDark: '#F5F5F5',    // Light gray for cards
  
  // Text colors with strong contrast
  textPrimary: '#212121',    // Almost black
  textSecondary: '#757575',  // Medium gray
  textLight: '#BDBDBD',      // Light gray
  textOnPrimary: '#FFFFFF',  // White text on primary colors
  
  // Gradient colors for energetic backgrounds
  gradientStart: '#FF6B35',  // Primary orange
  gradientEnd: '#E91E63',    // Accent magenta
  
  // Additional energetic colors
  electric: '#00E676',       // Electric green
  neon: '#FF1744',          // Neon red
  vibrant: '#651FFF',       // Vibrant purple
};

export const typography = {
  // Font families - Bold and modern
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
    black: 'System',
  },
  
  // Font sizes with strong hierarchy
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
  },
  
  // Font weights - Emphasizing bold typography
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  
  // Line heights for readability
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
};

// Common component styles
export const commonStyles = {
  // Button styles with energetic design
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.lg,
    ...shadows.md,
  },
  
  secondaryButton: {
    backgroundColor: colors.secondary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.lg,
    ...shadows.md,
  },
  
  // Card styles with bold shadows
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.lg,
  },
  
  // Input styles with strong borders
  input: {
    borderWidth: 2,
    borderColor: colors.textLight,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    fontSize: typography.fontSize.base,
    backgroundColor: colors.surface,
  },
  
  // Text styles with strong hierarchy
  heading1: {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.black,
    color: colors.textPrimary,
    lineHeight: typography.lineHeight.tight,
  },
  
  heading2: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    lineHeight: typography.lineHeight.tight,
  },
  
  heading3: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    lineHeight: typography.lineHeight.normal,
  },
  
  bodyText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.normal,
    color: colors.textPrimary,
    lineHeight: typography.lineHeight.normal,
  },
  
  caption: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.normal,
  },
};

// Animation configurations for energetic feel
export const animations = {
  spring: {
    tension: 300,
    friction: 7,
  },
  timing: {
    duration: 300,
  },
  bounce: {
    tension: 180,
    friction: 12,
  },
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  commonStyles,
  animations,
};