/**
 * Exercise Detail Screen - Shows detailed exercise information
 * Features energetic design with exercise stats, media placeholders, and instructions
 */

import React, { useState } from 'react';
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
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, typography, spacing, borderRadius, shadows, commonStyles } from '../styles/theme';

const { width, height } = Dimensions.get('window');

/**
 * Exercise Detail Screen Component
 * @param {Object} route - Route object containing exercise data
 * @param {Object} navigation - React Navigation object
 */
const ExerciseDetailScreen = ({ route, navigation }) => {
  const { exercise, day, muscleGroup, goal } = route.params;
  const [currentSet, setCurrentSet] = useState(1);
  const [completedSets, setCompletedSets] = useState([]);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [restTimer, setRestTimer] = useState(0);

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
   * Handle set completion
   * @param {number} setNumber - Set number to mark as complete
   */
  const handleSetComplete = (setNumber) => {
    if (!completedSets.includes(setNumber)) {
      setCompletedSets([...completedSets, setNumber]);
      
      if (setNumber < parseInt(exercise.sets)) {
        setCurrentSet(setNumber + 1);
        startRestTimer();
      } else {
        Alert.alert(
          'Exercise Complete! 🎉',
          `Great job completing ${exercise.name}!`,
          [
            {
              text: 'Next Exercise',
              onPress: () => navigation.goBack(),
            },
          ]
        );
      }
    }
  };

  /**
   * Start rest timer
   */
  const startRestTimer = () => {
    setIsTimerRunning(true);
    setRestTimer(180); // 3 minutes in seconds
    
    const timer = setInterval(() => {
      setRestTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  /**
   * Format timer display
   * @param {number} seconds - Seconds to format
   */
  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  /**
   * Handle video placeholder press
   */
  const handleVideoPress = () => {
    Alert.alert(
      'Video Tutorial',
      `This would play the instructional video for ${exercise.name}`,
      [{ text: 'OK' }]
    );
  };

  /**
   * Handle image placeholder press
   */
  const handleImagePress = () => {
    Alert.alert(
      'Exercise Image',
      `This would show the detailed form image for ${exercise.name}`,
      [{ text: 'OK' }]
    );
  };

  /**
   * Reset exercise progress
   */
  const resetExercise = () => {
    Alert.alert(
      'Reset Exercise',
      'Are you sure you want to reset your progress?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            setCurrentSet(1);
            setCompletedSets([]);
            setIsTimerRunning(false);
            setRestTimer(0);
          },
        },
      ]
    );
  };

  const exerciseColor = getMuscleGroupColor(muscleGroup);
  const totalSets = parseInt(exercise.sets);
  const progressPercentage = (completedSets.length / totalSets) * 100;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={[exerciseColor, colors.vibrant]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Icon name="arrow-back" size={24} color={colors.surface} />
          </TouchableOpacity>
          
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>{exercise.name}</Text>
            <Text style={styles.headerSubtitle}>{day} • {muscleGroup}</Text>
          </View>
          
          <TouchableOpacity
            style={styles.resetButton}
            onPress={resetExercise}
            activeOpacity={0.8}
          >
            <Icon name="refresh" size={24} color={colors.surface} />
          </TouchableOpacity>
        </View>
        
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${progressPercentage}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {completedSets.length}/{totalSets} sets completed
          </Text>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Exercise Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Icon name="repeat" size={24} color={exerciseColor} />
            <Text style={styles.statValue}>{exercise.sets}</Text>
            <Text style={styles.statLabel}>Sets</Text>
          </View>
          
          <View style={styles.statCard}>
            <Icon name="fitness-center" size={24} color={exerciseColor} />
            <Text style={styles.statValue}>{exercise.reps}</Text>
            <Text style={styles.statLabel}>Reps</Text>
          </View>
          
          <View style={styles.statCard}>
            <Icon name="timer" size={24} color={exerciseColor} />
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Min Rest</Text>
          </View>
        </View>

        {/* Media Section */}
        <View style={styles.mediaSection}>
          <Text style={styles.sectionTitle}>Exercise Media</Text>
          
          <View style={styles.mediaContainer}>
            {/* Video Placeholder */}
            <TouchableOpacity
              style={styles.mediaCard}
              onPress={handleVideoPress}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={[exerciseColor, colors.vibrant]}
                style={styles.mediaGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Icon name="play-circle-filled" size={48} color={colors.surface} />
                <Text style={styles.mediaTitle}>Video Tutorial</Text>
                <Text style={styles.mediaSubtitle}>Watch proper form</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            {/* Image Placeholder */}
            <TouchableOpacity
              style={styles.mediaCard}
              onPress={handleImagePress}
              activeOpacity={0.8}
            >
              <View style={[styles.mediaPlaceholder, { borderColor: exerciseColor }]}>
                <Icon name="image" size={48} color={exerciseColor} />
                <Text style={[styles.mediaTitle, { color: exerciseColor }]}>Form Guide</Text>
                <Text style={styles.mediaSubtitle}>Step-by-step images</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Set Tracker */}
        <View style={styles.setTrackerSection}>
          <Text style={styles.sectionTitle}>Set Progress</Text>
          
          <View style={styles.setsContainer}>
            {Array.from({ length: totalSets }, (_, index) => {
              const setNumber = index + 1;
              const isCompleted = completedSets.includes(setNumber);
              const isCurrent = setNumber === currentSet;
              
              return (
                <TouchableOpacity
                  key={setNumber}
                  style={[
                    styles.setCard,
                    isCompleted && styles.setCardCompleted,
                    isCurrent && styles.setCardCurrent,
                  ]}
                  onPress={() => handleSetComplete(setNumber)}
                  activeOpacity={0.8}
                >
                  {isCompleted ? (
                    <LinearGradient
                      colors={[colors.success, colors.vibrant]}
                      style={styles.setCardGradient}
                    >
                      <Icon name="check" size={20} color={colors.surface} />
                      <Text style={styles.setCardTextCompleted}>Set {setNumber}</Text>
                      <Text style={styles.setCardSubtext}>✓ Done</Text>
                    </LinearGradient>
                  ) : (
                    <View style={styles.setCardContent}>
                      <Text style={[
                        styles.setCardNumber,
                        isCurrent && { color: exerciseColor }
                      ]}>
                        {setNumber}
                      </Text>
                      <Text style={[
                        styles.setCardText,
                        isCurrent && { color: exerciseColor }
                      ]}>
                        Set {setNumber}
                      </Text>
                      <Text style={styles.setCardSubtext}>
                        {exercise.reps} reps
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Rest Timer */}
        {isTimerRunning && (
          <View style={styles.timerSection}>
            <LinearGradient
              colors={[colors.warning, colors.accent]}
              style={styles.timerCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Icon name="timer" size={32} color={colors.surface} />
              <Text style={styles.timerTitle}>Rest Time</Text>
              <Text style={styles.timerValue}>{formatTimer(restTimer)}</Text>
              <Text style={styles.timerSubtitle}>Take a breather!</Text>
            </LinearGradient>
          </View>
        )}

        {/* Exercise Instructions */}
        <View style={styles.instructionsSection}>
          <Text style={styles.sectionTitle}>Exercise Instructions</Text>
          
          <View style={styles.instructionsCard}>
            <View style={styles.instructionItem}>
              <View style={[styles.instructionNumber, { backgroundColor: exerciseColor }]}>
                <Text style={styles.instructionNumberText}>1</Text>
              </View>
              <Text style={styles.instructionText}>
                Start in the proper starting position with good posture
              </Text>
            </View>
            
            <View style={styles.instructionItem}>
              <View style={[styles.instructionNumber, { backgroundColor: exerciseColor }]}>
                <Text style={styles.instructionNumberText}>2</Text>
              </View>
              <Text style={styles.instructionText}>
                Perform the movement with controlled, deliberate motion
              </Text>
            </View>
            
            <View style={styles.instructionItem}>
              <View style={[styles.instructionNumber, { backgroundColor: exerciseColor }]}>
                <Text style={styles.instructionNumberText}>3</Text>
              </View>
              <Text style={styles.instructionText}>
                Focus on the target muscle group throughout the movement
              </Text>
            </View>
            
            <View style={styles.instructionItem}>
              <View style={[styles.instructionNumber, { backgroundColor: exerciseColor }]}>
                <Text style={styles.instructionNumberText}>4</Text>
              </View>
              <Text style={styles.instructionText}>
                Return to starting position with control and repeat
              </Text>
            </View>
          </View>
        </View>

        {/* Safety Tips */}
        <View style={styles.safetySection}>
          <View style={styles.safetyHeader}>
            <Icon name="security" size={20} color={colors.warning} />
            <Text style={styles.sectionTitle}>Safety Tips</Text>
          </View>
          
          <View style={styles.safetyCard}>
            <View style={styles.safetyTip}>
              <Icon name="warning" size={16} color={colors.warning} />
              <Text style={styles.safetyText}>Stop if you feel any pain or discomfort</Text>
            </View>
            
            <View style={styles.safetyTip}>
              <Icon name="speed" size={16} color={colors.primary} />
              <Text style={styles.safetyText}>Maintain proper form over speed</Text>
            </View>
            
            <View style={styles.safetyTip}>
              <Icon name="air" size={16} color={colors.secondary} />
              <Text style={styles.safetyText}>Remember to breathe throughout the exercise</Text>
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
  header: {
    paddingTop: spacing.xl,
    paddingBottom: spacing['2xl'],
    paddingHorizontal: spacing.xl,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  headerTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.surface,
  },
  headerSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.surface,
    opacity: 0.9,
    marginTop: spacing.xs,
  },
  resetButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    marginTop: spacing.md,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.surface,
    borderRadius: 3,
  },
  progressText: {
    fontSize: typography.fontSize.sm,
    color: colors.surface,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.xl,
    paddingBottom: spacing['3xl'],
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing['2xl'],
  },
  statCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    alignItems: 'center',
    flex: 0.3,
    ...shadows.md,
  },
  statValue: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.black,
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  statLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  mediaSection: {
    marginBottom: spacing['2xl'],
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  mediaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mediaCard: {
    flex: 0.48,
    height: 120,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.md,
  },
  mediaGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
  },
  mediaPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderStyle: 'dashed',
    padding: spacing.md,
  },
  mediaTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.surface,
    marginTop: spacing.sm,
  },
  mediaSubtitle: {
    fontSize: typography.fontSize.xs,
    color: colors.surface,
    opacity: 0.8,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  setTrackerSection: {
    marginBottom: spacing['2xl'],
  },
  setsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  setCard: {
    width: '48%',
    height: 80,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    backgroundColor: colors.surface,
    ...shadows.sm,
  },
  setCardCompleted: {
    ...shadows.md,
  },
  setCardCurrent: {
    borderWidth: 2,
    borderColor: colors.vibrant,
  },
  setCardGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius.lg,
  },
  setCardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
  },
  setCardNumber: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.textSecondary,
  },
  setCardText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    marginTop: spacing.xs,
  },
  setCardTextCompleted: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.surface,
    marginTop: spacing.xs,
  },
  setCardSubtext: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  timerSection: {
    marginBottom: spacing['2xl'],
  },
  timerCard: {
    borderRadius: borderRadius.xl,
    padding: spacing['2xl'],
    alignItems: 'center',
    ...shadows.lg,
  },
  timerTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.surface,
    marginTop: spacing.md,
  },
  timerValue: {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.black,
    color: colors.surface,
    marginTop: spacing.sm,
  },
  timerSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.surface,
    opacity: 0.9,
    marginTop: spacing.xs,
  },
  instructionsSection: {
    marginBottom: spacing['2xl'],
  },
  instructionsCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.sm,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  instructionNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
    marginTop: 2,
  },
  instructionNumberText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.surface,
  },
  instructionText: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
    flex: 1,
  },
  safetySection: {
    marginBottom: spacing.xl,
  },
  safetyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  safetyCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.sm,
  },
  safetyTip: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  safetyText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
    flex: 1,
  },
});

export default ExerciseDetailScreen;