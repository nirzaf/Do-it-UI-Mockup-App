/**
 * Welcome Screen - First screen users see with energetic branding
 * Features bold design with gradient backgrounds and strong call-to-action
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, typography, spacing, borderRadius, shadows } from '../styles/theme';

const { width, height } = Dimensions.get('window');

/**
 * Welcome Screen Component
 * @param {Object} navigation - React Navigation object
 */
const WelcomeScreen = ({ navigation }) => {
  /**
   * Navigate to registration screen
   */
  const handleGetStarted = () => {
    navigation.navigate('Registration');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      
      {/* Main gradient background */}
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={styles.gradientContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Header section with app branding */}
        <View style={styles.headerSection}>
          <View style={styles.logoContainer}>
            <Icon name="fitness-center" size={80} color={colors.surface} />
          </View>
          
          <Text style={styles.appTitle}>DO IT</Text>
          <Text style={styles.appSubtitle}>FITNESS & NUTRITION</Text>
          
          <View style={styles.taglineContainer}>
            <Text style={styles.tagline}>Transform Your Body</Text>
            <Text style={styles.tagline}>Transform Your Life</Text>
          </View>
        </View>

        {/* Features section */}
        <View style={styles.featuresSection}>
          <View style={styles.featureItem}>
            <Icon name="restaurant" size={32} color={colors.surface} />
            <Text style={styles.featureText}>Personalized Diet Plans</Text>
          </View>
          
          <View style={styles.featureItem}>
            <Icon name="fitness-center" size={32} color={colors.surface} />
            <Text style={styles.featureText}>Custom Workouts</Text>
          </View>
          
          <View style={styles.featureItem}>
            <Icon name="trending-up" size={32} color={colors.surface} />
            <Text style={styles.featureText}>Track Progress</Text>
          </View>
        </View>

        {/* Call to action section */}
        <View style={styles.ctaSection}>
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <Text style={styles.getStartedText}>GET STARTED</Text>
            <Icon name="arrow-forward" size={24} color={colors.primary} />
          </TouchableOpacity>
          
          <Text style={styles.motivationText}>
            "The only bad workout is the one that didn't happen"
          </Text>
        </View>

        {/* Decorative elements */}
        <View style={styles.decorativeElements}>
          <View style={[styles.circle, styles.circle1]} />
          <View style={[styles.circle, styles.circle2]} />
          <View style={[styles.circle, styles.circle3]} />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  gradientContainer: {
    flex: 1,
    paddingHorizontal: spacing.xl,
  },
  headerSection: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: spacing['2xl'],
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
    ...shadows.lg,
  },
  appTitle: {
    fontSize: typography.fontSize['6xl'],
    fontWeight: typography.fontWeight.black,
    color: colors.surface,
    letterSpacing: 4,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  appSubtitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.surface,
    letterSpacing: 2,
    textAlign: 'center',
    opacity: 0.9,
  },
  taglineContainer: {
    marginTop: spacing.xl,
    alignItems: 'center',
  },
  tagline: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    color: colors.surface,
    textAlign: 'center',
    opacity: 0.95,
    lineHeight: typography.lineHeight.normal * typography.fontSize.xl,
  },
  featuresSection: {
    flex: 0.25,
    justifyContent: 'space-around',
    paddingVertical: spacing.xl,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    marginVertical: spacing.sm,
  },
  featureText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.surface,
    marginLeft: spacing.md,
    flex: 1,
  },
  ctaSection: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: spacing['2xl'],
  },
  getStartedButton: {
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing['2xl'],
    borderRadius: borderRadius['2xl'],
    marginBottom: spacing.xl,
    minWidth: width * 0.7,
    ...shadows.xl,
  },
  getStartedText: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.black,
    color: colors.primary,
    marginRight: spacing.md,
    letterSpacing: 1,
  },
  motivationText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.surface,
    textAlign: 'center',
    fontStyle: 'italic',
    opacity: 0.9,
    paddingHorizontal: spacing.lg,
  },
  decorativeElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  circle: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 9999,
  },
  circle1: {
    width: 200,
    height: 200,
    top: -100,
    right: -100,
  },
  circle2: {
    width: 150,
    height: 150,
    bottom: -75,
    left: -75,
  },
  circle3: {
    width: 100,
    height: 100,
    top: height * 0.3,
    left: -50,
  },
});

export default WelcomeScreen;