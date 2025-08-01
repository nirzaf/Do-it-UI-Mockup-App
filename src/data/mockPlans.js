/**
 * Mock fitness plans data for the Do IT application
 * Contains comprehensive workout and diet plans for different fitness goals
 */

export const fitnessPlans = {
  'Lose Weight': {
    id: 'lose_weight',
    name: 'Weight Loss Program',
    description: 'A comprehensive plan to help you lose weight effectively',
    dailyCalories: 1800,
    
    // 7-day diet plan
    dietPlan: {
      Monday: {
        meals: [
          {
            name: 'Breakfast',
            foods: ['Oatmeal with berries (1 cup)', 'Greek yogurt (150g)', 'Green tea (1 cup)'],
            calories: 350
          },
          {
            name: 'Lunch',
            foods: ['Grilled chicken breast (150g)', 'Quinoa salad (1 cup)', 'Mixed vegetables (200g)'],
            calories: 450
          },
          {
            name: 'Snack',
            foods: ['Apple (1 medium)', 'Almonds (20g)'],
            calories: 200
          },
          {
            name: 'Dinner',
            foods: ['Baked salmon (120g)', 'Steamed broccoli (150g)', 'Sweet potato (100g)'],
            calories: 400
          }
        ]
      },
      Tuesday: {
        meals: [
          {
            name: 'Breakfast',
            foods: ['Smoothie bowl with spinach (1 cup)', 'Banana (1 medium)', 'Chia seeds (1 tbsp)'],
            calories: 320
          },
          {
            name: 'Lunch',
            foods: ['Turkey wrap (whole wheat)', 'Hummus (2 tbsp)', 'Cucumber slices (100g)'],
            calories: 380
          },
          {
            name: 'Snack',
            foods: ['Carrot sticks (100g)', 'Greek yogurt (100g)'],
            calories: 150
          },
          {
            name: 'Dinner',
            foods: ['Lean beef stir-fry (120g)', 'Brown rice (80g)', 'Bell peppers (100g)'],
            calories: 420
          }
        ]
      },
      Wednesday: {
        meals: [
          {
            name: 'Breakfast',
            foods: ['Egg white omelet (3 eggs)', 'Spinach (50g)', 'Whole grain toast (1 slice)'],
            calories: 280
          },
          {
            name: 'Lunch',
            foods: ['Lentil soup (1 bowl)', 'Mixed green salad (150g)', 'Olive oil dressing (1 tbsp)'],
            calories: 350
          },
          {
            name: 'Snack',
            foods: ['Berries (100g)', 'Cottage cheese (100g)'],
            calories: 180
          },
          {
            name: 'Dinner',
            foods: ['Grilled cod (150g)', 'Asparagus (150g)', 'Quinoa (80g)'],
            calories: 380
          }
        ]
      },
      Thursday: {
        meals: [
          {
            name: 'Breakfast',
            foods: ['Protein smoothie (whey + banana)', 'Spinach (handful)', 'Almond milk (200ml)'],
            calories: 300
          },
          {
            name: 'Lunch',
            foods: ['Chicken salad (150g)', 'Avocado (1/2 medium)', 'Mixed greens (200g)'],
            calories: 420
          },
          {
            name: 'Snack',
            foods: ['Celery sticks (100g)', 'Peanut butter (1 tbsp)'],
            calories: 160
          },
          {
            name: 'Dinner',
            foods: ['Baked chicken thigh (120g)', 'Roasted vegetables (200g)', 'Brown rice (60g)'],
            calories: 400
          }
        ]
      },
      Friday: {
        meals: [
          {
            name: 'Breakfast',
            foods: ['Greek yogurt parfait (200g)', 'Granola (30g)', 'Fresh berries (100g)'],
            calories: 340
          },
          {
            name: 'Lunch',
            foods: ['Tuna salad (150g)', 'Whole grain crackers (10 pieces)', 'Cherry tomatoes (100g)'],
            calories: 380
          },
          {
            name: 'Snack',
            foods: ['Orange (1 medium)', 'Walnuts (15g)'],
            calories: 170
          },
          {
            name: 'Dinner',
            foods: ['Grilled shrimp (150g)', 'Zucchini noodles (200g)', 'Marinara sauce (50g)'],
            calories: 320
          }
        ]
      },
      Saturday: {
        meals: [
          {
            name: 'Breakfast',
            foods: ['Avocado toast (1 slice)', 'Poached egg (1)', 'Cherry tomatoes (50g)'],
            calories: 350
          },
          {
            name: 'Lunch',
            foods: ['Vegetable soup (1 bowl)', 'Grilled chicken (100g)', 'Side salad (100g)'],
            calories: 400
          },
          {
            name: 'Snack',
            foods: ['Protein bar (1)', 'Water (500ml)'],
            calories: 200
          },
          {
            name: 'Dinner',
            foods: ['Baked tofu (120g)', 'Steamed vegetables (200g)', 'Wild rice (70g)'],
            calories: 360
          }
        ]
      },
      Sunday: {
        meals: [
          {
            name: 'Breakfast',
            foods: ['Chia pudding (150g)', 'Coconut flakes (10g)', 'Mango pieces (100g)'],
            calories: 320
          },
          {
            name: 'Lunch',
            foods: ['Grilled portobello (150g)', 'Quinoa salad (120g)', 'Balsamic dressing (1 tbsp)'],
            calories: 350
          },
          {
            name: 'Snack',
            foods: ['Green smoothie (200ml)', 'Protein powder (1 scoop)'],
            calories: 180
          },
          {
            name: 'Dinner',
            foods: ['Lean turkey (120g)', 'Roasted sweet potato (150g)', 'Green beans (100g)'],
            calories: 420
          }
        ]
      }
    },
    
    // 7-day workout plan
    workoutPlan: {
      Monday: {
        muscleGroup: 'Chest & Triceps',
        exercises: [
          {
            name: 'Push-ups',
            sets: 3,
            reps: '12-15',
            image: 'placeholder_pushups.jpg',
            video: 'placeholder_pushups.mp4'
          },
          {
            name: 'Chest Press',
            sets: 3,
            reps: '10-12',
            image: 'placeholder_chestpress.jpg',
            video: 'placeholder_chestpress.mp4'
          },
          {
            name: 'Tricep Dips',
            sets: 3,
            reps: '8-10',
            image: 'placeholder_tricepdips.jpg',
            video: 'placeholder_tricepdips.mp4'
          },
          {
            name: 'Incline Push-ups',
            sets: 2,
            reps: '10-12',
            image: 'placeholder_inclinepushups.jpg',
            video: 'placeholder_inclinepushups.mp4'
          }
        ]
      },
      Tuesday: {
        muscleGroup: 'Cardio & Core',
        exercises: [
          {
            name: 'Jumping Jacks',
            sets: 3,
            reps: '30 seconds',
            image: 'placeholder_jumpingjacks.jpg',
            video: 'placeholder_jumpingjacks.mp4'
          },
          {
            name: 'Mountain Climbers',
            sets: 3,
            reps: '20',
            image: 'placeholder_mountainclimbers.jpg',
            video: 'placeholder_mountainclimbers.mp4'
          },
          {
            name: 'Plank',
            sets: 3,
            reps: '30-45 seconds',
            image: 'placeholder_plank.jpg',
            video: 'placeholder_plank.mp4'
          },
          {
            name: 'Burpees',
            sets: 3,
            reps: '8-10',
            image: 'placeholder_burpees.jpg',
            video: 'placeholder_burpees.mp4'
          },
          {
            name: 'Russian Twists',
            sets: 3,
            reps: '20',
            image: 'placeholder_russiantwists.jpg',
            video: 'placeholder_russiantwists.mp4'
          }
        ]
      },
      Wednesday: {
        muscleGroup: 'Back & Biceps',
        exercises: [
          {
            name: 'Pull-ups',
            sets: 3,
            reps: '5-8',
            image: 'placeholder_pullups.jpg',
            video: 'placeholder_pullups.mp4'
          },
          {
            name: 'Bent-over Rows',
            sets: 3,
            reps: '10-12',
            image: 'placeholder_bentoverrows.jpg',
            video: 'placeholder_bentoverrows.mp4'
          },
          {
            name: 'Bicep Curls',
            sets: 3,
            reps: '12-15',
            image: 'placeholder_bicepcurls.jpg',
            video: 'placeholder_bicepcurls.mp4'
          },
          {
            name: 'Reverse Fly',
            sets: 3,
            reps: '10-12',
            image: 'placeholder_reversefly.jpg',
            video: 'placeholder_reversefly.mp4'
          }
        ]
      },
      Thursday: {
        muscleGroup: 'Legs & Glutes',
        exercises: [
          {
            name: 'Squats',
            sets: 3,
            reps: '15-20',
            image: 'placeholder_squats.jpg',
            video: 'placeholder_squats.mp4'
          },
          {
            name: 'Lunges',
            sets: 3,
            reps: '12 each leg',
            image: 'placeholder_lunges.jpg',
            video: 'placeholder_lunges.mp4'
          },
          {
            name: 'Glute Bridges',
            sets: 3,
            reps: '15-18',
            image: 'placeholder_glutebridges.jpg',
            video: 'placeholder_glutebridges.mp4'
          },
          {
            name: 'Calf Raises',
            sets: 3,
            reps: '20',
            image: 'placeholder_calfraises.jpg',
            video: 'placeholder_calfraises.mp4'
          }
        ]
      },
      Friday: {
        muscleGroup: 'Full Body HIIT',
        exercises: [
          {
            name: 'High Knees',
            sets: 4,
            reps: '30 seconds',
            image: 'placeholder_highknees.jpg',
            video: 'placeholder_highknees.mp4'
          },
          {
            name: 'Jump Squats',
            sets: 4,
            reps: '12-15',
            image: 'placeholder_jumpsquats.jpg',
            video: 'placeholder_jumpsquats.mp4'
          },
          {
            name: 'Push-up to T',
            sets: 3,
            reps: '8-10',
            image: 'placeholder_pushuptoT.jpg',
            video: 'placeholder_pushuptoT.mp4'
          },
          {
            name: 'Plank Jacks',
            sets: 3,
            reps: '15',
            image: 'placeholder_plankjacks.jpg',
            video: 'placeholder_plankjacks.mp4'
          }
        ]
      },
      Saturday: {
        muscleGroup: 'Active Recovery',
        exercises: [
          {
            name: 'Walking',
            sets: 1,
            reps: '30-45 minutes',
            image: 'placeholder_walking.jpg',
            video: 'placeholder_walking.mp4'
          },
          {
            name: 'Yoga Flow',
            sets: 1,
            reps: '20 minutes',
            image: 'placeholder_yoga.jpg',
            video: 'placeholder_yoga.mp4'
          },
          {
            name: 'Stretching',
            sets: 1,
            reps: '15 minutes',
            image: 'placeholder_stretching.jpg',
            video: 'placeholder_stretching.mp4'
          }
        ]
      },
      Sunday: {
        muscleGroup: 'Rest Day',
        exercises: [
          {
            name: 'Light Stretching',
            sets: 1,
            reps: '10-15 minutes',
            image: 'placeholder_lightstretch.jpg',
            video: 'placeholder_lightstretch.mp4'
          },
          {
            name: 'Meditation',
            sets: 1,
            reps: '10 minutes',
            image: 'placeholder_meditation.jpg',
            video: 'placeholder_meditation.mp4'
          }
        ]
      }
    }
  },
  
  'Gain Muscle': {
    id: 'gain_muscle',
    name: 'Muscle Building Program',
    description: 'A comprehensive plan to help you build lean muscle mass',
    dailyCalories: 2800,
    
    // 7-day diet plan
    dietPlan: {
      Monday: {
        meals: [
          {
            name: 'Breakfast',
            foods: ['Scrambled eggs (3 whole)', 'Oatmeal with banana (1 cup)', 'Whole milk (250ml)', 'Almonds (30g)'],
            calories: 650
          },
          {
            name: 'Lunch',
            foods: ['Grilled chicken breast (200g)', 'Brown rice (150g)', 'Avocado (1 whole)', 'Mixed vegetables (150g)'],
            calories: 750
          },
          {
            name: 'Snack',
            foods: ['Protein shake (whey + milk)', 'Banana (1 large)', 'Peanut butter (2 tbsp)'],
            calories: 450
          },
          {
            name: 'Dinner',
            foods: ['Lean beef (180g)', 'Sweet potato (200g)', 'Broccoli (150g)', 'Olive oil (1 tbsp)'],
            calories: 700
          }
        ]
      },
      Tuesday: {
        meals: [
          {
            name: 'Breakfast',
            foods: ['Greek yogurt (300g)', 'Granola (50g)', 'Mixed berries (150g)', 'Honey (2 tbsp)'],
            calories: 600
          },
          {
            name: 'Lunch',
            foods: ['Salmon fillet (200g)', 'Quinoa (120g)', 'Spinach salad (200g)', 'Nuts (30g)'],
            calories: 800
          },
          {
            name: 'Snack',
            foods: ['Cottage cheese (200g)', 'Whole grain crackers (20g)', 'Apple (1 medium)'],
            calories: 400
          },
          {
            name: 'Dinner',
            foods: ['Turkey breast (180g)', 'Pasta (100g dry)', 'Marinara sauce (100g)', 'Parmesan (30g)'],
            calories: 750
          }
        ]
      },
      Wednesday: {
        meals: [
          {
            name: 'Breakfast',
            foods: ['Protein pancakes (3)', 'Maple syrup (2 tbsp)', 'Greek yogurt (150g)', 'Blueberries (100g)'],
            calories: 580
          },
          {
            name: 'Lunch',
            foods: ['Tuna steak (200g)', 'Wild rice (120g)', 'Asparagus (150g)', 'Tahini dressing (2 tbsp)'],
            calories: 720
          },
          {
            name: 'Snack',
            foods: ['Trail mix (50g)', 'Chocolate milk (300ml)'],
            calories: 420
          },
          {
            name: 'Dinner',
            foods: ['Pork tenderloin (180g)', 'Mashed potatoes (200g)', 'Green beans (150g)', 'Butter (1 tbsp)'],
            calories: 680
          }
        ]
      },
      Thursday: {
        meals: [
          {
            name: 'Breakfast',
            foods: ['Smoothie bowl (banana, protein, oats)', 'Coconut flakes (20g)', 'Chia seeds (2 tbsp)', 'Almond butter (2 tbsp)'],
            calories: 620
          },
          {
            name: 'Lunch',
            foods: ['Chicken thighs (200g)', 'Couscous (100g)', 'Roasted vegetables (200g)', 'Hummus (50g)'],
            calories: 780
          },
          {
            name: 'Snack',
            foods: ['Protein bar (1)', 'Whole milk (250ml)', 'Dates (3 pieces)'],
            calories: 450
          },
          {
            name: 'Dinner',
            foods: ['Lamb chops (150g)', 'Quinoa pilaf (150g)', 'Roasted Brussels sprouts (150g)'],
            calories: 720
          }
        ]
      },
      Friday: {
        meals: [
          {
            name: 'Breakfast',
            foods: ['Egg and cheese omelet (4 eggs)', 'Whole grain toast (2 slices)', 'Avocado (1/2)', 'Orange juice (200ml)'],
            calories: 680
          },
          {
            name: 'Lunch',
            foods: ['Beef stir-fry (200g)', 'Jasmine rice (150g)', 'Mixed vegetables (200g)', 'Sesame oil (1 tbsp)'],
            calories: 800
          },
          {
            name: 'Snack',
            foods: ['Casein protein shake', 'Banana (1)', 'Oats (30g)'],
            calories: 400
          },
          {
            name: 'Dinner',
            foods: ['Grilled cod (200g)', 'Sweet potato fries (200g)', 'Coleslaw (150g)'],
            calories: 650
          }
        ]
      },
      Saturday: {
        meals: [
          {
            name: 'Breakfast',
            foods: ['French toast (3 slices)', 'Turkey bacon (3 strips)', 'Maple syrup (3 tbsp)', 'Fresh strawberries (150g)'],
            calories: 720
          },
          {
            name: 'Lunch',
            foods: ['Chicken burrito bowl', 'Brown rice (150g)', 'Black beans (100g)', 'Cheese (50g)', 'Guacamole (50g)'],
            calories: 850
          },
          {
            name: 'Snack',
            foods: ['Greek yogurt (200g)', 'Granola (40g)', 'Honey (1 tbsp)'],
            calories: 380
          },
          {
            name: 'Dinner',
            foods: ['Ribeye steak (180g)', 'Baked potato (250g)', 'Sour cream (30g)', 'Steamed broccoli (150g)'],
            calories: 780
          }
        ]
      },
      Sunday: {
        meals: [
          {
            name: 'Breakfast',
            foods: ['Protein waffles (2)', 'Greek yogurt (200g)', 'Mixed berries (150g)', 'Almond butter (2 tbsp)'],
            calories: 650
          },
          {
            name: 'Lunch',
            foods: ['Pulled pork (200g)', 'Quinoa salad (150g)', 'Coleslaw (100g)', 'Whole grain roll (1)'],
            calories: 800
          },
          {
            name: 'Snack',
            foods: ['Smoothie (protein, banana, oats)', 'Nuts (30g)'],
            calories: 420
          },
          {
            name: 'Dinner',
            foods: ['Grilled chicken (200g)', 'Wild rice (120g)', 'Roasted vegetables (200g)', 'Olive oil (2 tbsp)'],
            calories: 750
          }
        ]
      }
    },
    
    // 7-day workout plan
    workoutPlan: {
      Monday: {
        muscleGroup: 'Chest & Triceps',
        exercises: [
          {
            name: 'Bench Press',
            sets: 4,
            reps: '8-10',
            image: 'placeholder_benchpress.jpg',
            video: 'placeholder_benchpress.mp4'
          },
          {
            name: 'Incline Dumbbell Press',
            sets: 4,
            reps: '10-12',
            image: 'placeholder_inclinepress.jpg',
            video: 'placeholder_inclinepress.mp4'
          },
          {
            name: 'Dips',
            sets: 3,
            reps: '10-12',
            image: 'placeholder_dips.jpg',
            video: 'placeholder_dips.mp4'
          },
          {
            name: 'Tricep Pushdowns',
            sets: 3,
            reps: '12-15',
            image: 'placeholder_triceppushdowns.jpg',
            video: 'placeholder_triceppushdowns.mp4'
          },
          {
            name: 'Close-Grip Push-ups',
            sets: 3,
            reps: '12-15',
            image: 'placeholder_closegrippushups.jpg',
            video: 'placeholder_closegrippushups.mp4'
          }
        ]
      },
      Tuesday: {
        muscleGroup: 'Back & Biceps',
        exercises: [
          {
            name: 'Deadlifts',
            sets: 4,
            reps: '6-8',
            image: 'placeholder_deadlifts.jpg',
            video: 'placeholder_deadlifts.mp4'
          },
          {
            name: 'Pull-ups',
            sets: 4,
            reps: '8-10',
            image: 'placeholder_pullups.jpg',
            video: 'placeholder_pullups.mp4'
          },
          {
            name: 'Barbell Rows',
            sets: 4,
            reps: '10-12',
            image: 'placeholder_barbellrows.jpg',
            video: 'placeholder_barbellrows.mp4'
          },
          {
            name: 'Hammer Curls',
            sets: 3,
            reps: '12-15',
            image: 'placeholder_hammercurls.jpg',
            video: 'placeholder_hammercurls.mp4'
          },
          {
            name: 'Preacher Curls',
            sets: 3,
            reps: '10-12',
            image: 'placeholder_preachercurls.jpg',
            video: 'placeholder_preachercurls.mp4'
          }
        ]
      },
      Wednesday: {
        muscleGroup: 'Legs & Glutes',
        exercises: [
          {
            name: 'Squats',
            sets: 4,
            reps: '8-10',
            image: 'placeholder_squats.jpg',
            video: 'placeholder_squats.mp4'
          },
          {
            name: 'Romanian Deadlifts',
            sets: 4,
            reps: '10-12',
            image: 'placeholder_romaniandeadlifts.jpg',
            video: 'placeholder_romaniandeadlifts.mp4'
          },
          {
            name: 'Bulgarian Split Squats',
            sets: 3,
            reps: '12 each leg',
            image: 'placeholder_bulgariansplitsquats.jpg',
            video: 'placeholder_bulgariansplitsquats.mp4'
          },
          {
            name: 'Hip Thrusts',
            sets: 3,
            reps: '15-18',
            image: 'placeholder_hipthrusts.jpg',
            video: 'placeholder_hipthrusts.mp4'
          },
          {
            name: 'Calf Raises',
            sets: 4,
            reps: '15-20',
            image: 'placeholder_calfraises.jpg',
            video: 'placeholder_calfraises.mp4'
          }
        ]
      },
      Thursday: {
        muscleGroup: 'Shoulders & Abs',
        exercises: [
          {
            name: 'Overhead Press',
            sets: 4,
            reps: '8-10',
            image: 'placeholder_overheadpress.jpg',
            video: 'placeholder_overheadpress.mp4'
          },
          {
            name: 'Lateral Raises',
            sets: 4,
            reps: '12-15',
            image: 'placeholder_lateralraises.jpg',
            video: 'placeholder_lateralraises.mp4'
          },
          {
            name: 'Rear Delt Flyes',
            sets: 3,
            reps: '12-15',
            image: 'placeholder_reardeltflyes.jpg',
            video: 'placeholder_reardeltflyes.mp4'
          },
          {
            name: 'Weighted Crunches',
            sets: 3,
            reps: '15-20',
            image: 'placeholder_weightedcrunches.jpg',
            video: 'placeholder_weightedcrunches.mp4'
          },
          {
            name: 'Russian Twists',
            sets: 3,
            reps: '20 each side',
            image: 'placeholder_russiantwists.jpg',
            video: 'placeholder_russiantwists.mp4'
          }
        ]
      },
      Friday: {
        muscleGroup: 'Arms & Core',
        exercises: [
          {
            name: 'Barbell Curls',
            sets: 4,
            reps: '10-12',
            image: 'placeholder_barbellcurls.jpg',
            video: 'placeholder_barbellcurls.mp4'
          },
          {
            name: 'Overhead Tricep Extension',
            sets: 4,
            reps: '10-12',
            image: 'placeholder_overheadtricepextension.jpg',
            video: 'placeholder_overheadtricepextension.mp4'
          },
          {
            name: 'Cable Hammer Curls',
            sets: 3,
            reps: '12-15',
            image: 'placeholder_cablehammercurls.jpg',
            video: 'placeholder_cablehammercurls.mp4'
          },
          {
            name: 'Diamond Push-ups',
            sets: 3,
            reps: '10-12',
            image: 'placeholder_diamondpushups.jpg',
            video: 'placeholder_diamondpushups.mp4'
          },
          {
            name: 'Plank',
            sets: 3,
            reps: '45-60 seconds',
            image: 'placeholder_plank.jpg',
            video: 'placeholder_plank.mp4'
          }
        ]
      },
      Saturday: {
        muscleGroup: 'Full Body',
        exercises: [
          {
            name: 'Thrusters',
            sets: 4,
            reps: '10-12',
            image: 'placeholder_thrusters.jpg',
            video: 'placeholder_thrusters.mp4'
          },
          {
            name: 'Renegade Rows',
            sets: 3,
            reps: '8-10 each arm',
            image: 'placeholder_renegaderows.jpg',
            video: 'placeholder_renegaderows.mp4'
          },
          {
            name: 'Burpees',
            sets: 3,
            reps: '10-12',
            image: 'placeholder_burpees.jpg',
            video: 'placeholder_burpees.mp4'
          },
          {
            name: 'Turkish Get-ups',
            sets: 2,
            reps: '5 each side',
            image: 'placeholder_turkishgetups.jpg',
            video: 'placeholder_turkishgetups.mp4'
          }
        ]
      },
      Sunday: {
        muscleGroup: 'Active Recovery',
        exercises: [
          {
            name: 'Light Cardio',
            sets: 1,
            reps: '20-30 minutes',
            image: 'placeholder_lightcardio.jpg',
            video: 'placeholder_lightcardio.mp4'
          },
          {
            name: 'Foam Rolling',
            sets: 1,
            reps: '15 minutes',
            image: 'placeholder_foamrolling.jpg',
            video: 'placeholder_foamrolling.mp4'
          },
          {
            name: 'Mobility Work',
            sets: 1,
            reps: '20 minutes',
            image: 'placeholder_mobility.jpg',
            video: 'placeholder_mobility.mp4'
          }
        ]
      }
    }
  }
};

/**
 * Calculate daily water intake based on user weight
 * @param {number} weight - User weight in kg
 * @returns {number} Daily water intake in liters
 */
export const calculateWaterIntake = (weight) => {
  return Math.round((weight * 0.035) * 10) / 10; // 35ml per kg of body weight
};

/**
 * Calculate BMI based on height and weight
 * @param {number} height - Height in cm
 * @param {number} weight - Weight in kg
 * @returns {number} BMI value
 */
export const calculateBMI = (height, weight) => {
  const heightInMeters = height / 100;
  return Math.round((weight / (heightInMeters * heightInMeters)) * 10) / 10;
};