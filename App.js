/**
 * Do IT Fitness App - Main Application Component
 * A personalized fitness application with energetic and bold design
 */

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Import screens
import WelcomeScreen from './src/screens/WelcomeScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import GoalSelectionScreen from './src/screens/GoalSelectionScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import DietPlanScreen from './src/screens/DietPlanScreen';
import WorkoutPlanScreen from './src/screens/WorkoutPlanScreen';
import ExerciseDetailScreen from './src/screens/ExerciseDetailScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import DietDetailScreen from './src/screens/DietDetailScreen';

// Import theme
import { colors } from './src/styles/theme';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

/**
 * Main tab navigator for the authenticated user experience
 */
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = 'dashboard';
          } else if (route.name === 'Diet') {
            iconName = 'restaurant';
          } else if (route.name === 'Workout') {
            iconName = 'fitness-center';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 0,
          elevation: 10,
          shadowOpacity: 0.1,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: -5 },
          height: 90,
          paddingBottom: 20,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Diet" component={DietPlanScreen} />
      <Tab.Screen name="Workout" component={WorkoutPlanScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

/**
 * Main application component with navigation logic
 */
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(true);

  /**
   * Check if user has completed onboarding on app startup
   */
  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  /**
   * Check AsyncStorage for user data to determine navigation flow
   */
  const checkOnboardingStatus = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      const userGoal = await AsyncStorage.getItem('userGoal');
      
      if (userData && userGoal) {
        setIsFirstTime(false);
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return null; // You could add a loading screen here
  }

  return (
    <>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={colors.primary} 
        translucent={false}
      />
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: colors.background },
          }}
          initialRouteName={isFirstTime ? 'Welcome' : 'Main'}
        >
          {/* Onboarding Flow */}
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
          <Stack.Screen name="GoalSelection" component={GoalSelectionScreen} />
          
          {/* Main App Flow */}
          <Stack.Screen name="Main" component={MainTabNavigator} />
          <Stack.Screen 
            name="ExerciseDetail" 
            component={ExerciseDetailScreen}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: colors.primary,
                elevation: 0,
                shadowOpacity: 0,
              },
              headerTintColor: colors.surface,
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 18,
              },
            }}
          />
          <Stack.Screen 
            name="DietDetail" 
            component={DietDetailScreen}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: colors.primary,
                elevation: 0,
                shadowOpacity: 0,
              },
              headerTintColor: colors.surface,
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 18,
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});