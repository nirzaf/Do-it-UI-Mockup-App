/**
 * Profile Screen - Displays and manages user profile data
 * Features energetic design with BMI calculation and profile editing
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, typography, spacing, borderRadius, shadows, commonStyles } from '../styles/theme';
import { calculateBMI, getBMICategory, calculateWaterIntake } from '../data/mockPlans';

/**
 * Profile Screen Component
 * @param {Object} navigation - React Navigation object
 */
const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({
    name: '',
    gender: '',
    weight: '',
    height: '',
    age: '',
  });
  const [userGoal, setUserGoal] = useState('');
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editData, setEditData] = useState({});
  const [bmiData, setBmiData] = useState({ bmi: 0, category: '', color: colors.textSecondary });

  /**
   * Load user data on component mount
   */
  useEffect(() => {
    loadUserData();
  }, []);

  /**
   * Calculate BMI when user data changes
   */
  useEffect(() => {
    if (userData.weight && userData.height) {
      const bmi = calculateBMI(parseFloat(userData.weight), parseFloat(userData.height));
      const category = getBMICategory(bmi);
      const color = getBMIColor(category);
      setBmiData({ bmi, category, color });
    }
  }, [userData]);

  /**
   * Load user data from AsyncStorage
   */
  const loadUserData = async () => {
    try {
      const [name, gender, weight, height, age, goal] = await Promise.all([
        AsyncStorage.getItem('userName'),
        AsyncStorage.getItem('userGender'),
        AsyncStorage.getItem('userWeight'),
        AsyncStorage.getItem('userHeight'),
        AsyncStorage.getItem('userAge'),
        AsyncStorage.getItem('userGoal'),
      ]);

      setUserData({
        name: name || '',
        gender: gender || '',
        weight: weight || '',
        height: height || '',
        age: age || '',
      });
      setUserGoal(goal || '');
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  /**
   * Get BMI category color
   * @param {string} category - BMI category
   */
  const getBMIColor = (category) => {
    const colorMap = {
      'Underweight': colors.secondary,
      'Normal weight': colors.success,
      'Overweight': colors.warning,
      'Obese': colors.error,
    };
    return colorMap[category] || colors.textSecondary;
  };

  /**
   * Open edit modal
   */
  const openEditModal = () => {
    setEditData({ ...userData });
    setIsEditModalVisible(true);
  };

  /**
   * Close edit modal
   */
  const closeEditModal = () => {
    setIsEditModalVisible(false);
    setEditData({});
  };

  /**
   * Save profile changes
   */
  const saveProfileChanges = async () => {
    try {
      // Validate input
      if (!editData.name || !editData.weight || !editData.height || !editData.age) {
        Alert.alert('Error', 'Please fill in all required fields.');
        return;
      }

      // Save to AsyncStorage
      await Promise.all([
        AsyncStorage.setItem('userName', editData.name),
        AsyncStorage.setItem('userGender', editData.gender),
        AsyncStorage.setItem('userWeight', editData.weight),
        AsyncStorage.setItem('userHeight', editData.height),
        AsyncStorage.setItem('userAge', editData.age),
      ]);

      setUserData({ ...editData });
      closeEditModal();
      
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert('Error', 'Failed to save profile changes.');
    }
  };

  /**
   * Reset all data
   */
  const resetAllData = () => {
    Alert.alert(
      'Reset All Data',
      'This will delete all your profile data and progress. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.multiRemove([
                'userName',
                'userGender',
                'userWeight',
                'userHeight',
                'userAge',
                'userGoal',
                'waterIntake',
              ]);
              
              // Navigate back to welcome screen
              navigation.reset({
                index: 0,
                routes: [{ name: 'Welcome' }],
              });
            } catch (error) {
              console.error('Error resetting data:', error);
              Alert.alert('Error', 'Failed to reset data.');
            }
          },
        },
      ]
    );
  };

  /**
   * Get goal color
   * @param {string} goal - User goal
   */
  const getGoalColor = (goal) => {
    return goal === 'Lose Weight' ? colors.secondary : colors.primary;
  };

  /**
   * Get goal icon
   * @param {string} goal - User goal
   */
  const getGoalIcon = (goal) => {
    return goal === 'Lose Weight' ? 'trending-down' : 'trending-up';
  };

  const waterIntake = calculateWaterIntake(parseFloat(userData.weight) || 70);
  const goalColor = getGoalColor(userGoal);
  const goalIcon = getGoalIcon(userGoal);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={[colors.vibrant, colors.neon]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <LinearGradient
                colors={[colors.primary, colors.secondary]}
                style={styles.avatar}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.avatarText}>
                  {userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}
                </Text>
              </LinearGradient>
            </View>
            
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>
                {userData.name || 'User'}
              </Text>
              <Text style={styles.profileDetails}>
                {userData.age ? `${userData.age} years old` : 'Age not set'} • {userData.gender || 'Gender not set'}
              </Text>
            </View>
            
            <TouchableOpacity
              style={styles.editButton}
              onPress={openEditModal}
              activeOpacity={0.8}
            >
              <Icon name="edit" size={20} color={colors.surface} />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          {/* BMI Card */}
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Icon name="monitor-weight" size={24} color={bmiData.color} />
              <Text style={styles.statTitle}>BMI</Text>
            </View>
            <Text style={[styles.statValue, { color: bmiData.color }]}>
              {bmiData.bmi.toFixed(1)}
            </Text>
            <Text style={[styles.statCategory, { color: bmiData.color }]}>
              {bmiData.category}
            </Text>
          </View>
          
          {/* Weight Card */}
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Icon name="fitness-center" size={24} color={colors.primary} />
              <Text style={styles.statTitle}>Weight</Text>
            </View>
            <Text style={styles.statValue}>
              {userData.weight || '0'}
            </Text>
            <Text style={styles.statUnit}>kg</Text>
          </View>
          
          {/* Height Card */}
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Icon name="height" size={24} color={colors.secondary} />
              <Text style={styles.statTitle}>Height</Text>
            </View>
            <Text style={styles.statValue}>
              {userData.height || '0'}
            </Text>
            <Text style={styles.statUnit}>cm</Text>
          </View>
        </View>

        {/* Goal Card */}
        <View style={styles.goalCard}>
          <View style={styles.goalHeader}>
            <View style={[styles.goalIcon, { backgroundColor: goalColor }]}>
              <Icon name={goalIcon} size={24} color={colors.surface} />
            </View>
            <View style={styles.goalInfo}>
              <Text style={styles.goalTitle}>Current Goal</Text>
              <Text style={[styles.goalText, { color: goalColor }]}>
                {userGoal || 'No goal set'}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.changeGoalButton}
              onPress={() => navigation.navigate('GoalSelection')}
              activeOpacity={0.8}
            >
              <Text style={styles.changeGoalText}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Health Metrics */}
        <View style={styles.metricsSection}>
          <Text style={styles.sectionTitle}>Health Metrics</Text>
          
          <View style={styles.metricCard}>
            <View style={styles.metricRow}>
              <View style={styles.metricInfo}>
                <Icon name="water-drop" size={20} color={colors.secondary} />
                <Text style={styles.metricLabel}>Daily Water Goal</Text>
              </View>
              <Text style={styles.metricValue}>{waterIntake.toFixed(1)}L</Text>
            </View>
          </View>
          
          <View style={styles.metricCard}>
            <View style={styles.metricRow}>
              <View style={styles.metricInfo}>
                <Icon name="local-fire-department" size={20} color={colors.warning} />
                <Text style={styles.metricLabel}>Target Calories</Text>
              </View>
              <Text style={styles.metricValue}>
                {userGoal === 'Lose Weight' ? '1800' : '2500'} kcal
              </Text>
            </View>
          </View>
          
          <View style={styles.metricCard}>
            <View style={styles.metricRow}>
              <View style={styles.metricInfo}>
                <Icon name="directions-run" size={20} color={colors.accent} />
                <Text style={styles.metricLabel}>Weekly Workouts</Text>
              </View>
              <Text style={styles.metricValue}>6 days</Text>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <TouchableOpacity
            style={styles.actionCard}
            onPress={openEditModal}
            activeOpacity={0.8}
          >
            <View style={styles.actionInfo}>
              <Icon name="edit" size={20} color={colors.primary} />
              <Text style={styles.actionText}>Edit Profile</Text>
            </View>
            <Icon name="chevron-right" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('GoalSelection')}
            activeOpacity={0.8}
          >
            <View style={styles.actionInfo}>
              <Icon name="flag" size={20} color={colors.secondary} />
              <Text style={styles.actionText}>Change Goal</Text>
            </View>
            <Icon name="chevron-right" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionCard, styles.dangerAction]}
            onPress={resetAllData}
            activeOpacity={0.8}
          >
            <View style={styles.actionInfo}>
              <Icon name="delete-forever" size={20} color={colors.error} />
              <Text style={[styles.actionText, { color: colors.error }]}>Reset All Data</Text>
            </View>
            <Icon name="chevron-right" size={20} color={colors.error} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        visible={isEditModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={closeEditModal}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={closeEditModal}>
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TouchableOpacity onPress={saveProfileChanges}>
              <Text style={styles.modalSaveText}>Save</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Name *</Text>
              <TextInput
                style={styles.input}
                value={editData.name}
                onChangeText={(text) => setEditData({ ...editData, name: text })}
                placeholder="Enter your name"
                placeholderTextColor={colors.textLight}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Gender</Text>
              <View style={styles.genderContainer}>
                {['Male', 'Female', 'Other'].map((gender) => (
                  <TouchableOpacity
                    key={gender}
                    style={[
                      styles.genderButton,
                      editData.gender === gender && styles.genderButtonSelected
                    ]}
                    onPress={() => setEditData({ ...editData, gender })}
                  >
                    <Text style={[
                      styles.genderButtonText,
                      editData.gender === gender && styles.genderButtonTextSelected
                    ]}>
                      {gender}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Weight (kg) *</Text>
              <TextInput
                style={styles.input}
                value={editData.weight}
                onChangeText={(text) => setEditData({ ...editData, weight: text })}
                placeholder="Enter your weight"
                placeholderTextColor={colors.textLight}
                keyboardType="numeric"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Height (cm) *</Text>
              <TextInput
                style={styles.input}
                value={editData.height}
                onChangeText={(text) => setEditData({ ...editData, height: text })}
                placeholder="Enter your height"
                placeholderTextColor={colors.textLight}
                keyboardType="numeric"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Age *</Text>
              <TextInput
                style={styles.input}
                value={editData.age}
                onChangeText={(text) => setEditData({ ...editData, age: text })}
                placeholder="Enter your age"
                placeholderTextColor={colors.textLight}
                keyboardType="numeric"
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
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
    marginTop: spacing.md,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: spacing.lg,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.md,
  },
  avatarText: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.surface,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.surface,
  },
  profileDetails: {
    fontSize: typography.fontSize.sm,
    color: colors.surface,
    opacity: 0.9,
    marginTop: spacing.xs,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
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
    flex: 0.3,
    alignItems: 'center',
    ...shadows.md,
  },
  statHeader: {
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  statTitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  statValue: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.black,
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  statCategory: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    marginTop: spacing.xs,
  },
  statUnit: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  goalCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing['2xl'],
    ...shadows.md,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goalIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  goalInfo: {
    flex: 1,
  },
  goalTitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  goalText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    marginTop: spacing.xs,
  },
  changeGoalButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
  },
  changeGoalText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary,
  },
  metricsSection: {
    marginBottom: spacing['2xl'],
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  metricCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
  },
  metricValue: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
  },
  actionsSection: {
    marginBottom: spacing.xl,
  },
  actionCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...shadows.sm,
  },
  dangerAction: {
    borderWidth: 1,
    borderColor: colors.error,
  },
  actionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: typography.fontSize.base,
    color: colors.textPrimary,
    marginLeft: spacing.sm,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceDark,
  },
  modalTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  modalCancelText: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
  },
  modalSaveText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary,
  },
  modalContent: {
    flex: 1,
    padding: spacing.xl,
  },
  inputGroup: {
    marginBottom: spacing.xl,
  },
  inputLabel: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  input: {
    ...commonStyles.input,
    fontSize: typography.fontSize.base,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderButton: {
    flex: 0.3,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surfaceDark,
    alignItems: 'center',
  },
  genderButtonSelected: {
    backgroundColor: colors.primary,
  },
  genderButtonText: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
  },
  genderButtonTextSelected: {
    color: colors.surface,
    fontWeight: typography.fontWeight.semibold,
  },
});

export default ProfileScreen;