/**
 * Diet Plan Screen - Displays weekly meal plans
 * Features energetic design with day-by-day navigation and meal details
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
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
 * Diet Plan Screen Component
 * @param {Object} navigation - React Navigation object
 */
const DietPlanScreen = ({ navigation }) => {
  const [userGoal, setUserGoal] = useState('');
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [dietPlan, setDietPlan] = useState(null);
  const [totalCalories, setTotalCalories] = useState(0);

  /**
   * Load user goal and diet plan on component mount
   */
  useEffect(() => {
    loadUserGoal();
  }, []);

  /**
   * Update total calories when day changes
   */
  useEffect(() => {
    if (dietPlan && selectedDay) {
      calculateTotalCalories();
    }
  }, [selectedDay, dietPlan]);

  /**
   * Load user goal from AsyncStorage
   */
  const loadUserGoal = async () => {
    try {
      const goal = await AsyncStorage.getItem('userGoal');
      if (goal && fitnessPlans[goal]) {
        setUserGoal(goal);
        setDietPlan(fitnessPlans[goal].dietPlan);
      }
    } catch (error) {
      console.error('Error loading user goal:', error);
    }
  };

  /**
   * Calculate total calories for selected day
   */
  const calculateTotalCalories = () => {
    if (dietPlan && dietPlan[selectedDay]) {
      const dayMeals = dietPlan[selectedDay].meals;
      const total = dayMeals.reduce((sum, meal) => sum + meal.calories, 0);
      setTotalCalories(total);
    }
  };

  /**
   * Get meal icon based on meal name
   * @param {string} mealName - Name of the meal
   */
  const getMealIcon = (mealName) => {
    switch (mealName.toLowerCase()) {
      case 'breakfast':
        return 'free-breakfast';
      case 'lunch':
        return 'lunch-dining';
      case 'dinner':
        return 'dinner-dining';
      case 'snack':
        return 'cookie';
      default:
        return 'restaurant';
    }
  };

  /**
   * Get meal color based on meal name
   * @param {string} mealName - Name of the meal
   */
  const getMealColor = (mealName) => {
    switch (mealName.toLowerCase()) {
      case 'breakfast':
        return colors.warning;
      case 'lunch':
        return colors.success;
      case 'dinner':
        return colors.accent;
      case 'snack':
        return colors.secondary;
      default:
        return colors.primary;
    }
  };

  /**
   * Render day selector button
   * @param {string} day - Day name
   */
  const renderDayButton = (day) => {
    const isSelected = selectedDay === day;
    const dayShort = day.substring(0, 3);
    
    return (
      <TouchableOpacity
        key={day}
        style={[
          styles.dayButton,
          isSelected && styles.dayButtonSelected
        ]}
        onPress={() => setSelectedDay(day)}
        activeOpacity={0.8}
      >
        {isSelected ? (
          <LinearGradient
            colors={[colors.primary, colors.accent]}
            style={styles.dayButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={[styles.dayButtonText, styles.dayButtonTextSelected]}>
              {dayShort}
            </Text>
          </LinearGradient>
        ) : (
          <Text style={styles.dayButtonText}>{dayShort}</Text>
        )}
      </TouchableOpacity>
    );
  };

  /**
   * Render meal card component
   * @param {Object} meal - Meal object
   * @param {number} index - Meal index
   */
  const renderMealCard = (meal, index) => {
    const mealColor = getMealColor(meal.name);
    
    return (
      <TouchableOpacity
        key={index}
        style={styles.mealCard}
        onPress={() => navigation.navigate('DietDetail', { 
          meal, 
          day: selectedDay,
          goal: userGoal 
        })}
        activeOpacity={0.8}
      >
        <View style={styles.mealCardContent}>
          {/* Meal Header */}
          <View style={styles.mealHeader}>
            <View style={[styles.mealIconContainer, { backgroundColor: mealColor }]}>
              <Icon 
                name={getMealIcon(meal.name)} 
                size={24} 
                color={colors.surface} 
              />
            </View>
            
            <View style={styles.mealInfo}>
              <Text style={styles.mealName}>{meal.name}</Text>
              <Text style={styles.mealCalories}>{meal.calories} calories</Text>
            </View>
            
            <Icon name="chevron-right" size={24} color={colors.textLight} />
          </View>
          
          {/* Food Items Preview */}
          <View style={styles.foodItemsContainer}>
            {meal.foods.slice(0, 2).map((food, foodIndex) => (
              <View key={foodIndex} style={styles.foodItem}>
                <Icon name="fiber-manual-record" size={6} color={mealColor} />
                <Text style={styles.foodItemText}>{food}</Text>
              </View>
            ))}
            {meal.foods.length > 2 && (
              <Text style={styles.moreFoodsText}>
                +{meal.foods.length - 2} more items
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (!dietPlan) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading your diet plan...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const selectedDayMeals = dietPlan[selectedDay]?.meals || [];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={[colors.success, colors.electric]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerTitleSection}>
            <Icon name="restaurant" size={28} color={colors.surface} />
            <Text style={styles.headerTitle}>Diet Plan</Text>
          </View>
          
          <Text style={styles.headerSubtitle}>
            {userGoal} Program
          </Text>
        </View>
        
        {/* Daily Calories Summary */}
        <View style={styles.caloriesSummary}>
          <View style={styles.caloriesCard}>
            <Text style={styles.caloriesValue}>{totalCalories}</Text>
            <Text style={styles.caloriesLabel}>Today's Calories</Text>
          </View>
          
          <View style={styles.caloriesCard}>
            <Text style={styles.caloriesValue}>
              {fitnessPlans[userGoal]?.dailyCalories || 0}
            </Text>
            <Text style={styles.caloriesLabel}>Daily Goal</Text>
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

      {/* Meals List */}
      <ScrollView 
        style={styles.mealsContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.mealsContent}
      >
        <View style={styles.dayHeader}>
          <Text style={styles.dayTitle}>{selectedDay}</Text>
          <Text style={styles.daySubtitle}>
            {selectedDayMeals.length} meals planned
          </Text>
        </View>
        
        {selectedDayMeals.map((meal, index) => renderMealCard(meal, index))}
        
        {/* Nutrition Tips */}
        <View style={styles.tipsCard}>
          <View style={styles.tipsHeader}>
            <Icon name="lightbulb" size={20} color={colors.warning} />
            <Text style={styles.tipsTitle}>Nutrition Tips</Text>
          </View>
          
          <View style={styles.tipsList}>
            <View style={styles.tipItem}>
              <Icon name="water-drop" size={16} color={colors.secondary} />
              <Text style={styles.tipText}>Drink water before each meal</Text>
            </View>
            
            <View style={styles.tipItem}>
              <Icon name="schedule" size={16} color={colors.primary} />
              <Text style={styles.tipText}>Eat at regular intervals</Text>
            </View>
            
            <View style={styles.tipItem}>
              <Icon name="eco" size={16} color={colors.success} />
              <Text style={styles.tipText}>Include variety in your diet</Text>
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
  caloriesSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  caloriesCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    flex: 0.48,
    alignItems: 'center',
  },
  caloriesValue: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.black,
    color: colors.surface,
  },
  caloriesLabel: {
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
  dayButtonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
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
  mealsContainer: {
    flex: 1,
  },
  mealsContent: {
    padding: spacing.xl,
    paddingBottom: spacing['3xl'],
  },
  dayHeader: {
    marginBottom: spacing.xl,
  },
  dayTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  daySubtitle: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  mealCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.lg,
    ...shadows.md,
  },
  mealCardContent: {
    padding: spacing.lg,
  },
  mealHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  mealIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  mealInfo: {
    flex: 1,
  },
  mealName: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  mealCalories: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  foodItemsContainer: {
    marginTop: spacing.sm,
  },
  foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  foodItemText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
    flex: 1,
  },
  moreFoodsText: {
    fontSize: typography.fontSize.xs,
    color: colors.textLight,
    fontStyle: 'italic',
    marginTop: spacing.xs,
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

export default DietPlanScreen;