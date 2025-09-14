import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { colors } from './styles/colors';

// Screens
import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    // This would typically check AsyncStorage or similar
    const checkAuthStatus = async () => {
      // Simulate checking stored auth
      setTimeout(() => {
        // For demo, we'll show onboarding
        // In real app, check if user has seen onboarding
        setCurrentScreen('onboarding');
      }, 100);
    };

    if (currentScreen === 'splash') {
      checkAuthStatus();
    }
  }, [currentScreen]);

  const handleSplashComplete = () => {
    setCurrentScreen('onboarding');
  };

  const handleOnboardingComplete = () => {
    setCurrentScreen('auth');
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentScreen('home');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('auth');
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onComplete={handleSplashComplete} />;
      
      case 'onboarding':
        return <OnboardingScreen onComplete={handleOnboardingComplete} />;
      
      case 'auth':
        return <AuthScreen onLogin={handleLogin} />;
      
      case 'home':
        return (
          <HomeScreen 
            user={user}
            onLogout={handleLogout}
            navigation={{
              navigate: (screen, params) => {
                console.log('Navigate to:', screen, params);
                // In a real app, this would handle navigation
              }
            }}
          />
        );
      
      default:
        return <SplashScreen onComplete={handleSplashComplete} />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor={colors.lightBackground}
        translucent={false}
      />
      {renderCurrentScreen()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightBackground,
  },
});

export default App;