/**
 * Dashboard Screen - Main hub of the application
 * Features energetic design with quick access to diet and workout plans
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, typography, spacing, borderRadius, shadows, commonStyles } from '../styles/theme';
import { calculateWaterIntake, calculateBMI } from '../data/mockPlans';

const { width } = Dimensions.get('window');

/**
 * Dashboard Screen Component
 * @param {Object} navigation - React Navigation object
 */
const DashboardScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [userGoal, setUserGoal] = useState('');
  const [waterIntake, setWaterIntake] = useState(0);
  const [dailyWaterGoal, setDailyWaterGoal] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  /**
   * Load user data and initialize dashboard
   */
  useEffect(() => {
    loadUserData();
    
    // Update time every minute
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timeInterval);
  }, []);

  /**
   * Load user data from AsyncStorage
   */
  const loadUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      const goalString = await AsyncStorage.getItem('userGoal');
      const waterIntakeString = await AsyncStorage.getItem('waterIntake');
      
      if (userDataString) {
        const parsedUserData = JSON.parse(userDataString);
        setUserData(parsedUserData);
        
        // Calculate daily water goal
        const waterGoal = calculateWaterIntake(parseFloat(parsedUserData.weight));
        setDailyWaterGoal(waterGoal);
      }
      
      if (goalString) {
        setUserGoal(goalString);
      }
      
      if (waterIntakeString) {
        setWaterIntake(parseFloat(waterIntakeString));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  /**
   * Add water intake and save to storage
   * @param {number} amount - Amount of water to add in liters
   */
  const addWaterIntake = async (amount) => {
    const newIntake = Math.min(waterIntake + amount, dailyWaterGoal);
    setWaterIntake(newIntake);
    
    try {
      await AsyncStorage.setItem('waterIntake', newIntake.toString());
    } catch (error) {
      console.error('Error saving water intake:', error);
    }
  };

  /**
   * Reset water intake for new day
   */
  const resetWaterIntake = async () => {
    setWaterIntake(0);
    try {
      await AsyncStorage.setItem('waterIntake', '0');
    } catch (error) {
      console.error('Error resetting water intake:', error);
    }
  };

  /**
   * Get greeting based on current time
   */
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  /**
   * Get motivational message based on goal
   */
  const getMotivationalMessage = () => {
    if (userGoal === 'Lose Weight') {
      return 'Every step counts towards your weight loss goal!';
    } else if (userGoal === 'Gain Muscle') {
      return 'Build strength, build confidence!';
    }
    return 'Stay consistent, stay strong!';
  };

  /**
   * Calculate water intake percentage
   */
  const getWaterPercentage = () => {
    return dailyWaterGoal > 0 ? (waterIntake / dailyWaterGoal) * 100 : 0;
  };

  if (!userData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Section */}
        <LinearGradient
          colors={[colors.primary, colors.accent]}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.headerContent}>
            <View style={styles.greetingSection}>
              <Text style={styles.greetingText}>{getGreeting()}</Text>
              <Text style={styles.nameText}>{userData.name}!</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.profileButton}
              onPress={() => navigation.navigate('Profile')}
            >
              <Icon name="person" size={24} color={colors.surface} />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.motivationText}>{getMotivationalMessage()}</Text>
          
          <View style={styles.goalBadge}>
            <Icon 
              name={userGoal === 'Lose Weight' ? 'trending-down' : 'fitness-center'} 
              size={16} 
              color={colors.surface} 
            />
            <Text style={styles.goalBadgeText}>{userGoal}</Text>
          </View>
        </LinearGradient>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Icon name="monitor-weight" size={24} color={colors.primary} />
            <Text style={styles.statValue}>{userData.weight} kg</Text>
            <Text style={styles.statLabel}>Current Weight</Text>
          </View>
          
          <View style={styles.statCard}>
            <Icon name="height" size={24} color={colors.secondary} />
            <Text style={styles.statValue}>{userData.height} cm</Text>
            <Text style={styles.statLabel}>Height</Text>
          </View>
          
          <View style={styles.statCard}>
            <Icon name="calculate" size={24} color={colors.accent} />
            <Text style={styles.statValue}>
              {calculateBMI(parseFloat(userData.height), parseFloat(userData.weight))}
            </Text>
            <Text style={styles.statLabel}>BMI</Text>
          </View>
        </View>

        {/* Water Intake Tracker */}
        <View style={styles.waterSection}>
          <View style={styles.waterHeader}>
            <Icon name="water-drop" size={24} color={colors.secondary} />
            <Text style={styles.waterTitle}>Daily Water Intake</Text>
          </View>
          
          <View style={styles.waterProgress}>
            <View style={styles.waterProgressBar}>
              <View 
                style={[
                  styles.waterProgressFill,
                  { width: `${Math.min(getWaterPercentage(), 100)}%` }
                ]}
              />
            </View>
            <Text style={styles.waterProgressText}>
              {waterIntake.toFixed(1)}L / {dailyWaterGoal.toFixed(1)}L
            </Text>
          </View>
          
          <View style={styles.waterButtons}>
            <TouchableOpacity 
              style={styles.waterButton}
              onPress={() => addWaterIntake(0.25)}
            >
              <Text style={styles.waterButtonText}>+250ml</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.waterButton}
              onPress={() => addWaterIntake(0.5)}
            >
              <Text style={styles.waterButtonText}>+500ml</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.waterButton, styles.resetButton]}
              onPress={resetWaterIntake}
            >
              <Icon name="refresh" size={16} color={colors.surface} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Main Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          {/* Diet Plan Button */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Diet')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[colors.success, colors.electric]}
              style={styles.actionButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.actionButtonIcon}>
                <Icon name="restaurant" size={40} color={colors.surface} />
              </View>
              <Text style={styles.actionButtonTitle}>Diet Plan</Text>
              <Text style={styles.actionButtonSubtitle}>Personalized meal plans</Text>
              <Icon name="arrow-forward" size={20} color={colors.surface} />
            </LinearGradient>
          </TouchableOpacity>

          {/* Workout Plan Button */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Workout')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[colors.vibrant, colors.neon]}
              style={styles.actionButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.actionButtonIcon}>
                <Icon name="fitness-center" size={40} color={colors.surface} />
              </View>
              <Text style={styles.actionButtonTitle}>Training Program</Text>
              <Text style={styles.actionButtonSubtitle}>Custom workout routines</Text>
              <Icon name="arrow-forward" size={20} color={colors.surface} />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Today's Motivation */}
        <View style={styles.motivationCard}>
          <Icon name="format-quote" size={24} color={colors.primary} />
          <Text style={styles.motivationCardText}>
            "Success is the sum of small efforts repeated day in and day out."
          </Text>
          <Text style={styles.motivationCardAuthor}>- Robert Collier</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: typography.fontSize.lg,
    color: colors.textSecondary,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing['2xl'],
  },
  header: {
    paddingTop: spacing.xl,
    paddingBottom: spacing['2xl'],
    paddingHorizontal: spacing.xl,
    borderBottomLeftRadius: borderRadius['2xl'],
    borderBottomRightRadius: borderRadius['2xl'],
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  greetingSection: {
    flex: 1,
  },
  greetingText: {
    fontSize: typography.fontSize.base,
    color: colors.surface,
    opacity: 0.9,
  },
  nameText: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.black,
    color: colors.surface,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  motivationText: {
    fontSize: typography.fontSize.base,
    color: colors.surface,
    opacity: 0.9,
    marginBottom: spacing.lg,
  },
  goalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    alignSelf: 'flex-start',
  },
  goalBadgeText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.surface,
    marginLeft: spacing.sm,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.xl,
    marginTop: -spacing.xl,
    marginBottom: spacing.xl,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    marginHorizontal: spacing.sm,
    ...shadows.md,
  },
  statValue: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  statLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  waterSection: {
    backgroundColor: colors.surface,
    marginHorizontal: spacing.xl,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    ...shadows.md,
  },
  waterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  waterTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    marginLeft: spacing.sm,
  },
  waterProgress: {
    marginBottom: spacing.lg,
  },
  waterProgressBar: {
    height: 8,
    backgroundColor: colors.surfaceDark,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  waterProgressFill: {
    height: '100%',
    backgroundColor: colors.secondary,
    borderRadius: 4,
  },
  waterProgressText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  waterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  waterButton: {
    backgroundColor: colors.secondary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    flex: 0.3,
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: colors.textLight,
    flex: 0.2,
  },
  waterButtonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.surface,
  },
  actionButtonsContainer: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xl,
  },
  actionButton: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    ...shadows.lg,
  },
  actionButtonGradient: {
    padding: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 100,
  },
  actionButtonIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.lg,
  },
  actionButtonTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.surface,
    flex: 1,
  },
  actionButtonSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.surface,
    opacity: 0.9,
    position: 'absolute',
    left: spacing.xl + 60 + spacing.lg,
    bottom: spacing.xl,
  },
  motivationCard: {
    backgroundColor: colors.surface,
    marginHorizontal: spacing.xl,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    ...shadows.md,
  },
  motivationCardText: {
    fontSize: typography.fontSize.base,
    color: colors.textPrimary,
    textAlign: 'center',
    fontStyle: 'italic',
    marginVertical: spacing.md,
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
  },
  motivationCardAuthor: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.semibold,
  },
});

export default DashboardScreen;