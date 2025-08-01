# Do IT - Fitness Mobile App

A high-performance, visually appealing React Native fitness application with an energetic and bold design aesthetic. This is a frontend-only prototype that demonstrates a complete user experience with simulated backend functionality.

## 🚀 Features

### Core Functionality

- **Personalized Fitness Plans**: Two complete fitness programs (Lose Weight & Gain Muscle)
- **7-Day Diet Plans**: Detailed meal plans with calorie tracking
- **7-Day Workout Schedules**: Comprehensive exercise routines with sets/reps
- **Exercise Detail Views**: Interactive exercise tracking with media placeholders
- **Profile Management**: User data storage with BMI calculation
- **Local Data Persistence**: All user data stored locally using AsyncStorage

### Design Features

- **Energetic & Bold UI**: Vibrant color palette with dynamic gradients
- **Modern Typography**: Strong, readable fonts with proper hierarchy
- **Smooth Animations**: Engaging transitions and micro-interactions
- **Responsive Design**: Optimized for both iOS and Android devices
- **Intuitive Navigation**: Clean, user-friendly interface

## 📱 Screens

### Onboarding Flow

1. **Welcome Screen**: Engaging entry point with app branding
2. **Registration Screen**: User data collection (name, gender, weight, height, age)
3. **Goal Selection**: Choose between "Lose Weight" or "Gain Muscle"

### Main Application

1. **Dashboard**: Central hub with quick stats and navigation
2. **Diet Plan Screen**: Weekly meal plans with day-by-day navigation
3. **Workout Plan Screen**: Exercise schedules with muscle group targeting
4. **Exercise Detail Screen**: Detailed exercise information with progress tracking
5. **Profile Screen**: User data management with BMI calculation

## 🛠 Technology Stack

- **Framework**: React Native
- **Navigation**: React Navigation 6
- **Local Storage**: AsyncStorage
- **Gradients**: react-native-linear-gradient
- **Icons**: react-native-vector-icons (MaterialIcons)
- **State Management**: React Hooks (useState, useEffect)

## 📦 Installation

### Prerequisites

- Node.js (v14 or higher)
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Do-it-UI-Mockup-App
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **iOS Setup**

   ```bash
   cd ios
   pod install
   cd ..
   ```

4. **Run the application**

   For iOS:

   ```bash
   npx react-native run-ios
   ```

   For Android:

   ```bash
   npx react-native run-android
   ```

## 📁 Project Structure

```
Do-it-UI-Mockup-App/
├── src/
│   ├── data/
│   │   └── mockPlans.js          # Fitness plans and utility functions
│   ├── screens/
│   │   ├── WelcomeScreen.js       # Onboarding welcome
│   │   ├── RegistrationScreen.js  # User data collection
│   │   ├── GoalSelectionScreen.js # Goal selection
│   │   ├── DashboardScreen.js     # Main dashboard
│   │   ├── DietPlanScreen.js      # Diet plan display
│   │   ├── WorkoutPlanScreen.js   # Workout plan display
│   │   ├── ExerciseDetailScreen.js # Exercise details
│   │   └── ProfileScreen.js       # Profile management
│   └── styles/
│       └── theme.js               # Design system and theme
├── App.js                         # Main app component with navigation
├── package.json                   # Dependencies and scripts
└── README.md                      # Project documentation
```

## 🎨 Design System

The app uses a comprehensive design system defined in `src/styles/theme.js`:

### Color Palette

- **Primary Colors**: Electric blues and vibrant oranges
- **Secondary Colors**: Energetic magentas and neon greens
- **Neutral Colors**: Modern grays and clean whites
- **Status Colors**: Success, warning, and error states

### Typography

- **Font Sizes**: Responsive scale from xs (12px) to 4xl (36px)
- **Font Weights**: Light to black (300-900)
- **Line Heights**: Optimized for readability

### Components

- **Buttons**: Multiple variants with gradients and shadows
- **Cards**: Elevated surfaces with rounded corners
- **Inputs**: Clean, accessible form elements
- **Shadows**: Depth and elevation system

## 📊 Data Structure

### Fitness Plans

Each fitness plan includes:

- **Diet Plan**: 7-day meal schedule with calorie targets
- **Workout Plan**: 7-day exercise routine with muscle group focus
- **Exercise Details**: Sets, reps, and media placeholders

### User Data

Stored locally using AsyncStorage:

- Personal information (name, age, gender)
- Physical metrics (weight, height)
- Fitness goals and preferences
- Progress tracking data

## 🔧 Customization

### Adding New Fitness Plans

1. Edit `src/data/mockPlans.js`
2. Add new plan object with diet and workout data
3. Update goal selection screen to include new options

### Modifying Design

1. Update `src/styles/theme.js` for global changes
2. Modify individual screen styles for specific adjustments
3. Add new color variants or typography scales as needed

### Extending Functionality

1. Add new screens in `src/screens/`
2. Update navigation in `App.js`
3. Implement additional AsyncStorage keys for new data

## 🚀 Future Enhancements

### Potential Features

- **Progress Photos**: Before/after image tracking
- **Workout Timer**: Built-in exercise timing
- **Nutrition Scanner**: Barcode scanning for food items
- **Social Features**: Share progress with friends
- **Wearable Integration**: Sync with fitness trackers
- **Push Notifications**: Workout and meal reminders

### Backend Integration

- Replace AsyncStorage with API calls
- Implement user authentication
- Add cloud data synchronization
- Enable real-time progress tracking

## 📱 Platform Support

- **iOS**: 11.0 and above
- **Android**: API level 21 (Android 5.0) and above

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on both platforms
5. Submit a pull request

## 📄 License

This project is created for demonstration purposes. Feel free to use it as a starting point for your own fitness applications.

## 🎯 Demo Features

### Interactive Elements

- **Set Tracking**: Mark exercise sets as complete
- **Rest Timer**: Automatic rest period countdown
- **Water Intake**: Track daily hydration goals
- **BMI Calculator**: Real-time health metrics
- **Profile Editing**: Update personal information

### Visual Highlights

- **Gradient Backgrounds**: Dynamic color transitions
- **Icon Integration**: Consistent MaterialIcons usage
- **Card-based Layout**: Modern, clean interface
- **Responsive Grid**: Adaptive to different screen sizes
- **Shadow System**: Depth and elevation effects

---

**Built with ❤️ using React Native**

For questions or support, please refer to the React Native documentation or create an issue in the repository.
