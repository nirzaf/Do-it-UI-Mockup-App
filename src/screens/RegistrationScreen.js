/**
 * Registration Screen - Collects user personal information
 * Features energetic form design with validation and local storage
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, typography, spacing, borderRadius, shadows, commonStyles } from '../styles/theme';

/**
 * Registration Screen Component
 * @param {Object} navigation - React Navigation object
 */
const RegistrationScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    weight: '',
    height: '',
    age: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Update form field value
   * @param {string} field - Field name to update
   * @param {string} value - New value for the field
   */
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  /**
   * Select gender with visual feedback
   * @param {string} gender - Selected gender
   */
  const selectGender = (gender) => {
    updateField('gender', gender);
  };

  /**
   * Validate form data before submission
   * @returns {boolean} - True if form is valid
   */
  const validateForm = () => {
    const { name, gender, weight, height, age } = formData;
    
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return false;
    }
    
    if (!gender) {
      Alert.alert('Error', 'Please select your gender');
      return false;
    }
    
    if (!weight || isNaN(weight) || parseFloat(weight) <= 0) {
      Alert.alert('Error', 'Please enter a valid weight');
      return false;
    }
    
    if (!height || isNaN(height) || parseFloat(height) <= 0) {
      Alert.alert('Error', 'Please enter a valid height');
      return false;
    }
    
    if (!age || isNaN(age) || parseInt(age) <= 0 || parseInt(age) > 120) {
      Alert.alert('Error', 'Please enter a valid age');
      return false;
    }
    
    return true;
  };

  /**
   * Save user data and navigate to goal selection
   */
  const handleContinue = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Save user data to AsyncStorage
      await AsyncStorage.setItem('userData', JSON.stringify(formData));
      
      // Navigate to goal selection
      navigation.navigate('GoalSelection');
    } catch (error) {
      console.error('Error saving user data:', error);
      Alert.alert('Error', 'Failed to save your information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header with gradient */}
        <LinearGradient
          colors={[colors.primary, colors.accent]}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color={colors.surface} />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Tell Us About You</Text>
          <Text style={styles.headerSubtitle}>Let's personalize your fitness journey</Text>
        </LinearGradient>

        <ScrollView 
          style={styles.formContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.formContent}
        >
          {/* Name Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <View style={styles.inputContainer}>
              <Icon name="person" size={20} color={colors.primary} style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter your full name"
                placeholderTextColor={colors.textLight}
                value={formData.name}
                onChangeText={(value) => updateField('name', value)}
                autoCapitalize="words"
              />
            </View>
          </View>

          {/* Gender Selection */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Gender</Text>
            <View style={styles.genderContainer}>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  formData.gender === 'male' && styles.genderButtonActive
                ]}
                onPress={() => selectGender('male')}
              >
                <Icon 
                  name="male" 
                  size={24} 
                  color={formData.gender === 'male' ? colors.surface : colors.primary} 
                />
                <Text style={[
                  styles.genderText,
                  formData.gender === 'male' && styles.genderTextActive
                ]}>Male</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  formData.gender === 'female' && styles.genderButtonActive
                ]}
                onPress={() => selectGender('female')}
              >
                <Icon 
                  name="female" 
                  size={24} 
                  color={formData.gender === 'female' ? colors.surface : colors.primary} 
                />
                <Text style={[
                  styles.genderText,
                  formData.gender === 'female' && styles.genderTextActive
                ]}>Female</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Weight Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Weight (kg)</Text>
            <View style={styles.inputContainer}>
              <Icon name="monitor-weight" size={20} color={colors.primary} style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter your weight"
                placeholderTextColor={colors.textLight}
                value={formData.weight}
                onChangeText={(value) => updateField('weight', value)}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Height Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Height (cm)</Text>
            <View style={styles.inputContainer}>
              <Icon name="height" size={20} color={colors.primary} style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter your height"
                placeholderTextColor={colors.textLight}
                value={formData.height}
                onChangeText={(value) => updateField('height', value)}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Age Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Age</Text>
            <View style={styles.inputContainer}>
              <Icon name="cake" size={20} color={colors.primary} style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter your age"
                placeholderTextColor={colors.textLight}
                value={formData.age}
                onChangeText={(value) => updateField('age', value)}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            style={[
              styles.continueButton,
              isLoading && styles.continueButtonDisabled
            ]}
            onPress={handleContinue}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[colors.primary, colors.accent]}
              style={styles.continueButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.continueButtonText}>
                {isLoading ? 'SAVING...' : 'CONTINUE'}
              </Text>
              {!isLoading && <Icon name="arrow-forward" size={20} color={colors.surface} />}
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardContainer: {
    flex: 1,
  },
  header: {
    paddingTop: spacing.xl,
    paddingBottom: spacing['2xl'],
    paddingHorizontal: spacing.xl,
    borderBottomLeftRadius: borderRadius['2xl'],
    borderBottomRightRadius: borderRadius['2xl'],
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: spacing.sm,
    marginBottom: spacing.md,
  },
  headerTitle: {
    ...commonStyles.heading2,
    color: colors.surface,
    marginBottom: spacing.sm,
  },
  headerSubtitle: {
    fontSize: typography.fontSize.base,
    color: colors.surface,
    opacity: 0.9,
  },
  formContainer: {
    flex: 1,
  },
  formContent: {
    padding: spacing.xl,
    paddingBottom: spacing['3xl'],
  },
  inputGroup: {
    marginBottom: spacing.xl,
  },
  inputLabel: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: colors.surfaceDark,
    paddingHorizontal: spacing.lg,
    ...shadows.sm,
  },
  inputIcon: {
    marginRight: spacing.md,
  },
  textInput: {
    flex: 1,
    paddingVertical: spacing.lg,
    fontSize: typography.fontSize.base,
    color: colors.textPrimary,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderButton: {
    flex: 0.48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.lg,
    ...shadows.sm,
  },
  genderButtonActive: {
    backgroundColor: colors.primary,
  },
  genderText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary,
    marginLeft: spacing.sm,
  },
  genderTextActive: {
    color: colors.surface,
  },
  continueButton: {
    marginTop: spacing.xl,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.lg,
  },
  continueButtonDisabled: {
    opacity: 0.7,
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
});

export default RegistrationScreen;