/**
 * Goal Selection Screen - Users choose their fitness goal
 * Features bold goal cards with energetic design and animations
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Dimensions,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, typography, spacing, borderRadius, shadows, commonStyles } from '../styles/theme';

const { width } = Dimensions.get('window');

/**
 * Goal Selection Screen Component
 * @param {Object} navigation - React Navigation object
 */
const GoalSelectionScreen = ({ navigation }) => {
  const [selectedGoal, setSelectedGoal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(1));

  /**
   * Handle goal selection with animation
   * @param {string} goal - Selected goal ('Lose Weight' or 'Gain Muscle')
   */
  const selectGoal = (goal) => {
    setSelectedGoal(goal);
    
    // Animate selection
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  /**
   * Save goal and complete onboarding
   */
  const handleContinue = async () => {
    if (!selectedGoal) {
      Alert.alert('Please Select a Goal', 'Choose your fitness goal to continue');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Save selected goal to AsyncStorage
      await AsyncStorage.setItem('userGoal', selectedGoal);
      
      // Navigate to main app
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    } catch (error) {
      console.error('Error saving goal:', error);
      Alert.alert('Error', 'Failed to save your goal. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Render goal card component
   * @param {Object} goalData - Goal information object
   */
  const renderGoalCard = (goalData) => {
    const isSelected = selectedGoal === goalData.title;
    
    return (
      <Animated.View
        style={[
          styles.goalCard,
          isSelected && styles.goalCardSelected,
          { transform: [{ scale: isSelected ? scaleAnim : 1 }] }
        ]}
      >
        <TouchableOpacity
          onPress={() => selectGoal(goalData.title)}
          activeOpacity={0.8}
          style={styles.goalCardTouchable}
        >
          <LinearGradient
            colors={isSelected ? goalData.selectedGradient : goalData.gradient}
            style={styles.goalCardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {/* Goal Icon */}
            <View style={styles.goalIconContainer}>
              <Icon 
                name={goalData.icon} 
                size={60} 
                color={colors.surface} 
              />
            </View>
            
            {/* Goal Title */}
            <Text style={styles.goalTitle}>{goalData.title}</Text>
            
            {/* Goal Description */}
            <Text style={styles.goalDescription}>{goalData.description}</Text>
            
            {/* Goal Features */}
            <View style={styles.goalFeatures}>
              {goalData.features.map((feature, index) => (
                <View key={index} style={styles.goalFeature}>
                  <Icon name="check-circle" size={16} color={colors.surface} />
                  <Text style={styles.goalFeatureText}>{feature}</Text>
                </View>
              ))}
            </View>
            
            {/* Selection Indicator */}
            {isSelected && (
              <View style={styles.selectionIndicator}>
                <Icon name="check-circle" size={24} color={colors.surface} />
              </View>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const goals = [
    {
      title: 'Lose Weight',
      icon: 'trending-down',
      description: 'Burn fat and achieve your ideal body weight',
      gradient: [colors.primary, colors.accent],
      selectedGradient: [colors.primaryDark, colors.accentDark],
      features: [
        'Calorie deficit diet plans',
        'Fat-burning workouts',
        'Progress tracking',
        'Healthy meal recipes'
      ]
    },
    {
      title: 'Gain Muscle',
      icon: 'fitness-center',
      description: 'Build lean muscle mass and increase strength',
      gradient: [colors.secondary, colors.vibrant],
      selectedGradient: [colors.secondaryDark, '#4A148C'],
      features: [
        'High-protein meal plans',
        'Strength training routines',
        'Muscle growth tracking',
        'Recovery optimization'
      ]
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Choose Your Goal</Text>
        <Text style={styles.headerSubtitle}>
          Select your primary fitness objective to get personalized plans
        </Text>
      </View>

      {/* Goals Container */}
      <View style={styles.goalsContainer}>
        {goals.map((goal, index) => (
          <View key={index} style={styles.goalWrapper}>
            {renderGoalCard(goal)}
          </View>
        ))}
      </View>

      {/* Continue Button */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedGoal && styles.continueButtonDisabled,
            isLoading && styles.continueButtonDisabled
          ]}
          onPress={handleContinue}
          disabled={!selectedGoal || isLoading}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={selectedGoal ? [colors.success, colors.electric] : [colors.textLight, colors.textLight]}
            style={styles.continueButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.continueButtonText}>
              {isLoading ? 'SETTING UP...' : 'START MY JOURNEY'}
            </Text>
            {!isLoading && <Icon name="rocket-launch" size={20} color={colors.surface} />}
          </LinearGradient>
        </TouchableOpacity>
        
        <Text style={styles.motivationText}>
          "Every expert was once a beginner. Every pro was once an amateur."
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: spacing.sm,
    marginBottom: spacing.md,
  },
  headerTitle: {
    ...commonStyles.heading2,
    marginBottom: spacing.sm,
  },
  headerSubtitle: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
  },
  goalsContainer: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    justifyContent: 'center',
  },
  goalWrapper: {
    marginBottom: spacing.xl,
  },
  goalCard: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.lg,
  },
  goalCardSelected: {
    ...shadows.xl,
  },
  goalCardTouchable: {
    width: '100%',
  },
  goalCardGradient: {
    padding: spacing.xl,
    minHeight: 220,
    position: 'relative',
  },
  goalIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  goalTitle: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.black,
    color: colors.surface,
    marginBottom: spacing.md,
  },
  goalDescription: {
    fontSize: typography.fontSize.base,
    color: colors.surface,
    opacity: 0.9,
    marginBottom: spacing.lg,
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
  },
  goalFeatures: {
    marginTop: spacing.md,
  },
  goalFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  goalFeatureText: {
    fontSize: typography.fontSize.sm,
    color: colors.surface,
    marginLeft: spacing.sm,
    opacity: 0.9,
  },
  selectionIndicator: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: spacing.sm,
  },
  bottomSection: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing['2xl'],
  },
  continueButton: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    ...shadows.lg,
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
  continueButtonText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.surface,
    marginRight: spacing.sm,
    letterSpacing: 1,
  },
  motivationText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
    paddingHorizontal: spacing.lg,
  },
});

export default GoalSelectionScreen;