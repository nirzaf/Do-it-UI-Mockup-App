/**
 * Workout Plan Screen - Displays weekly workout schedules
 * Features energetic design with day-by-day navigation and exercise details
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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, typography, spacing, borderRadius, shadows, commonStyles } from '../styles/theme';
import { fitnessPlans } from '../data/mockPlans';

const { width } = Dimensions.get('window');
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

/**
 * Workout Plan Screen Component
 * @param {Object} navigation - React Navigation object
 */
const WorkoutPlanScreen = ({ navigation }) => {
  const [userGoal, setUserGoal] = useState('');
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [totalExercises, setTotalExercises] = useState(0);

  /**
   * Load user goal and workout plan on component mount
   */
  useEffect(() => {
    loadUserGoal();
  }, []);

  /**
   * Update total exercises when day changes
   */
  useEffect(() => {
    if (workoutPlan && selectedDay) {
      calculateTotalExercises();
    }
  }, [selectedDay, workoutPlan]);

  /**
   * Load user goal from AsyncStorage
   */
  const loadUserGoal = async () => {
    try {
      const goal = await AsyncStorage.getItem('userGoal');
      if (goal && fitnessPlans[goal]) {
        setUserGoal(goal);
        setWorkoutPlan(fitnessPlans[goal].workoutPlan);
      }
    } catch (error) {
      console.error('Error loading user goal:', error);
    }
  };

  /**
   * Calculate total exercises for selected day
   */
  const calculateTotalExercises = () => {
    if (workoutPlan && workoutPlan[selectedDay]) {
      const dayExercises = workoutPlan[selectedDay].exercises;
      setTotalExercises(dayExercises.length);
    }
  };

  /**
   * Get muscle group color
   * @param {string} muscleGroup - Muscle group name
   */
  const getMuscleGroupColor = (muscleGroup) => {
    const colorMap = {
      'Chest & Triceps': colors.primary,
      'Back & Biceps': colors.secondary,
      'Legs & Glutes': colors.accent,
      'Shoulders & Abs': colors.warning,
      'Arms & Core': colors.vibrant,
      'Full Body': colors.success,
      'Full Body HIIT': colors.neon,
      'Cardio & Core': colors.electric,
      'Active Recovery': colors.textSecondary,
      'Rest Day': colors.textLight,
    };
    return colorMap[muscleGroup] || colors.primary;
  };

  /**
   * Get muscle group icon
   * @param {string} muscleGroup - Muscle group name
   */
  const getMuscleGroupIcon = (muscleGroup) => {
    const iconMap = {
      'Chest & Triceps': 'fitness-center',
      'Back & Biceps': 'fitness-center',
      'Legs & Glutes': 'directions-run',
      'Shoulders & Abs': 'fitness-center',
      'Arms & Core': 'fitness-center',
      'Full Body': 'sports-gymnastics',
      'Full Body HIIT': 'flash-on',
      'Cardio & Core': 'favorite',
      'Active Recovery': 'self-improvement',
      'Rest Day': 'hotel',
    };
    return iconMap[muscleGroup] || 'fitness-center';
  };

  /**
   * Render day selector button
   * @param {string} day - Day name
   */
  const renderDayButton = (day) => {
    const isSelected = selectedDay === day;
    const dayShort = day.substring(0, 3);
    const dayWorkout = workoutPlan?.[day];
    const isRestDay = dayWorkout?.muscleGroup === 'Rest Day';
    
    return (
      <TouchableOpacity
        key={day}
        style={[
          styles.dayButton,
          isSelected && styles.dayButtonSelected,
          isRestDay && styles.dayButtonRest
        ]}
        onPress={() => setSelectedDay(day)}
        activeOpacity={0.8}
      >
        {isSelected ? (
          <LinearGradient
            colors={isRestDay ? [colors.textLight, colors.textSecondary] : [colors.vibrant, colors.neon]}
            style={styles.dayButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={[styles.dayButtonText, styles.dayButtonTextSelected]}>
              {dayShort}
            </Text>
            {isRestDay && (
              <Icon name="hotel" size={12} color={colors.surface} style={styles.dayButtonIcon} />
            )}
          </LinearGradient>
        ) : (
          <View style={styles.dayButtonContent}>
            <Text style={[styles.dayButtonText, isRestDay && styles.dayButtonTextRest]}>
              {dayShort}
            </Text>
            {isRestDay && (
              <Icon name="hotel" size={12} color={colors.textLight} style={styles.dayButtonIcon} />
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  /**
   * Render exercise card component
   * @param {Object} exercise - Exercise object
   * @param {number} index - Exercise index
   */
  const renderExerciseCard = (exercise, index) => {
    const muscleGroup = workoutPlan[selectedDay]?.muscleGroup;
    const exerciseColor = getMuscleGroupColor(muscleGroup);
    
    return (
      <TouchableOpacity
        key={index}
        style={styles.exerciseCard}
        onPress={() => navigation.navigate('ExerciseDetail', { 
          exercise, 
          day: selectedDay,
          muscleGroup,
          goal: userGoal 
        })}
        activeOpacity={0.8}
      >
        <View style={styles.exerciseCardContent}>
          {/* Exercise Header */}
          <View style={styles.exerciseHeader}>
            <View style={[styles.exerciseIconContainer, { backgroundColor: exerciseColor }]}>
              <Text style={styles.exerciseNumber}>{index + 1}</Text>
            </View>
            
            <View style={styles.exerciseInfo}>
              <Text style={styles.exerciseName}>{exercise.name}</Text>
              <Text style={styles.exerciseDetails}>
                {exercise.sets} sets × {exercise.reps} reps
              </Text>
            </View>
            
            <Icon name="play-circle-filled" size={32} color={exerciseColor} />
          </View>
          
          {/* Exercise Stats */}
          <View style={styles.exerciseStats}>
            <View style={styles.exerciseStat}>
              <Icon name="repeat" size={16} color={exerciseColor} />
              <Text style={styles.exerciseStatText}>{exercise.sets} Sets</Text>
            </View>
            
            <View style={styles.exerciseStat}>
              <Icon name="fitness-center" size={16} color={exerciseColor} />
              <Text style={styles.exerciseStatText}>{exercise.reps} Reps</Text>
            </View>
            
            <View style={styles.exerciseStat}>
              <Icon name="timer" size={16} color={exerciseColor} />
              <Text style={styles.exerciseStatText}>2-3 min rest</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (!workoutPlan) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading your workout plan...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const selectedDayWorkout = workoutPlan[selectedDay];
  const muscleGroupColor = getMuscleGroupColor(selectedDayWorkout?.muscleGroup);
  const muscleGroupIcon = getMuscleGroupIcon(selectedDayWorkout?.muscleGroup);
  const isRestDay = selectedDayWorkout?.muscleGroup === 'Rest Day';

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={isRestDay ? [colors.textLight, colors.textSecondary] : [colors.vibrant, colors.neon]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerTitleSection}>
            <Icon name="fitness-center" size={28} color={colors.surface} />
            <Text style={styles.headerTitle}>Training Program</Text>
          </View>
          
          <Text style={styles.headerSubtitle}>
            {userGoal} Program
          </Text>
        </View>
        
        {/* Workout Summary */}
        <View style={styles.workoutSummary}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{totalExercises}</Text>
            <Text style={styles.summaryLabel}>Exercises</Text>
          </View>
          
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>
              {selectedDayWorkout?.exercises?.reduce((total, ex) => total + parseInt(ex.sets), 0) || 0}
            </Text>
            <Text style={styles.summaryLabel}>Total Sets</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Day Selector */}
      <View style={styles.daySelector}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.daySelectorContent}
        >
          {DAYS.map(renderDayButton)}
        </ScrollView>
      </View>

      {/* Workout Content */}
      <ScrollView 
        style={styles.workoutContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.workoutContent}
      >
        {/* Day Header */}
        <View style={styles.dayHeader}>
          <View style={styles.dayTitleSection}>
            <View style={[styles.muscleGroupIcon, { backgroundColor: muscleGroupColor }]}>
              <Icon name={muscleGroupIcon} size={24} color={colors.surface} />
            </View>
            
            <View style={styles.dayInfo}>
              <Text style={styles.dayTitle}>{selectedDay}</Text>
              <Text style={styles.muscleGroupText}>{selectedDayWorkout?.muscleGroup}</Text>
            </View>
          </View>
        </View>
        
        {/* Exercises List */}
        {isRestDay ? (
          <View style={styles.restDayCard}>
            <Icon name="hotel" size={48} color={colors.textSecondary} />
            <Text style={styles.restDayTitle}>Rest Day</Text>
            <Text style={styles.restDayText}>
              Take time to recover and let your muscles rebuild stronger.
            </Text>
            
            {selectedDayWorkout?.exercises?.map((exercise, index) => (
              <TouchableOpacity
                key={index}
                style={styles.restActivityCard}
                onPress={() => navigation.navigate('ExerciseDetail', { 
                  exercise, 
                  day: selectedDay,
                  muscleGroup: selectedDayWorkout.muscleGroup,
                  goal: userGoal 
                })}
              >
                <Icon name="self-improvement" size={20} color={colors.textSecondary} />
                <Text style={styles.restActivityText}>{exercise.name}</Text>
                <Text style={styles.restActivityDuration}>{exercise.reps}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          selectedDayWorkout?.exercises?.map((exercise, index) => 
            renderExerciseCard(exercise, index)
          )
        )}
        
        {/* Workout Tips */}
        <View style={styles.tipsCard}>
          <View style={styles.tipsHeader}>
            <Icon name="tips-and-updates" size={20} color={colors.warning} />
            <Text style={styles.tipsTitle}>Workout Tips</Text>
          </View>
          
          <View style={styles.tipsList}>
            <View style={styles.tipItem}>
              <Icon name="schedule" size={16} color={colors.primary} />
              <Text style={styles.tipText}>Warm up for 5-10 minutes before starting</Text>
            </View>
            
            <View style={styles.tipItem}>
              <Icon name="water-drop" size={16} color={colors.secondary} />
              <Text style={styles.tipText}>Stay hydrated throughout your workout</Text>
            </View>
            
            <View style={styles.tipItem}>
              <Icon name="self-improvement" size={16} color={colors.success} />
              <Text style={styles.tipText}>Focus on proper form over speed</Text>
            </View>
            
            <View style={styles.tipItem}>
              <Icon name="timer" size={16} color={colors.accent} />
              <Text style={styles.tipText}>Rest 2-3 minutes between sets</Text>
            </View>
          </View>
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
  header: {
    paddingTop: spacing.xl,
    paddingBottom: spacing['2xl'],
    paddingHorizontal: spacing.xl,
    borderBottomLeftRadius: borderRadius['2xl'],
    borderBottomRightRadius: borderRadius['2xl'],
  },
  headerContent: {
    marginBottom: spacing.lg,
  },
  headerTitleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  headerTitle: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.black,
    color: colors.surface,
    marginLeft: spacing.md,
  },
  headerSubtitle: {
    fontSize: typography.fontSize.base,
    color: colors.surface,
    opacity: 0.9,
  },
  workoutSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    flex: 0.48,
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.black,
    color: colors.surface,
  },
  summaryLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.surface,
    opacity: 0.9,
    marginTop: spacing.xs,
  },
  daySelector: {
    backgroundColor: colors.surface,
    paddingVertical: spacing.lg,
    ...shadows.sm,
  },
  daySelectorContent: {
    paddingHorizontal: spacing.lg,
  },
  dayButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surfaceDark,
  },
  dayButtonSelected: {
    ...shadows.md,
  },
  dayButtonRest: {
    backgroundColor: colors.background,
  },
  dayButtonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayButtonContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayButtonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textSecondary,
  },
  dayButtonTextSelected: {
    color: colors.surface,
  },
  dayButtonTextRest: {
    color: colors.textLight,
  },
  dayButtonIcon: {
    marginTop: 2,
  },
  workoutContainer: {
    flex: 1,
  },
  workoutContent: {
    padding: spacing.xl,
    paddingBottom: spacing['3xl'],
  },
  dayHeader: {
    marginBottom: spacing.xl,
  },
  dayTitleSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  muscleGroupIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  dayInfo: {
    flex: 1,
  },
  dayTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  muscleGroupText: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  exerciseCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.lg,
    ...shadows.md,
  },
  exerciseCardContent: {
    padding: spacing.lg,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  exerciseIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  exerciseNumber: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.surface,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  exerciseDetails: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  exerciseStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  exerciseStat: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  exerciseStatText: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  restDayCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing['2xl'],
    alignItems: 'center',
    marginBottom: spacing.xl,
    ...shadows.sm,
  },
  restDayTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.textSecondary,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  restDayText: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
    marginBottom: spacing.lg,
  },
  restActivityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginTop: spacing.sm,
    width: '100%',
  },
  restActivityText: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    marginLeft: spacing.md,
    flex: 1,
  },
  restActivityDuration: {
    fontSize: typography.fontSize.sm,
    color: colors.textLight,
  },
  tipsCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginTop: spacing.lg,
    ...shadows.sm,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  tipsTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    marginLeft: spacing.sm,
  },
  tipsList: {
    marginTop: spacing.sm,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  tipText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
    flex: 1,
  },
});

export default WorkoutPlanScreen;