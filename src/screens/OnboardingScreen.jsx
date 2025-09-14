import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Dimensions,
  Animated,
  PanResponder 
} from 'react-native';
import { colors, typography, shadows } from '../styles/colors';
import Logo from '../components/common/Logo';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const { width: screenWidth } = Dimensions.get('window');

const onboardingData = [
  {
    id: 1,
    title: 'Scopri Migliaia di Storie',
    subtitle: 'Libri, racconti e audiolibri esclusivi da autori italiani e internazionali',
    icon: '📚',
    features: [
      'Catalogo sempre aggiornato',
      'Contenuti esclusivi',
      'Tutti i generi letterari'
    ]
  },
  {
    id: 2,
    title: 'Leggi Ovunque, Sempre',
    subtitle: 'Sincronizza i tuoi progressi su tutti i dispositivi e leggi anche offline',
    icon: '📱',
    features: [
      'Sincronizzazione automatica',
      'Lettura offline',
      'Personalizza la tua esperienza'
    ]
  },
  {
    id: 3,
    title: 'Pubblica le Tue Opere',
    subtitle: 'Diventa un autore e condividi le tue storie con migliaia di lettori',
    icon: '✍️',
    features: [
      'Strumenti di editing avanzati',
      'Supporto AI per la scrittura',
      'Monetizza i tuoi contenuti'
    ]
  }
];

const OnboardingScreen = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
    },
    onPanResponderMove: (evt, gestureState) => {
      scrollX.setValue(-gestureState.dx);
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (Math.abs(gestureState.dx) > 50) {
        if (gestureState.dx > 0 && currentIndex > 0) {
          goToSlide(currentIndex - 1);
        } else if (gestureState.dx < 0 && currentIndex < onboardingData.length - 1) {
          goToSlide(currentIndex + 1);
        }
      }
      Animated.spring(scrollX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    },
  });

  const goToSlide = (index) => {
    setCurrentIndex(index);
    scrollViewRef.current?.scrollTo({
      x: index * screenWidth,
      animated: true,
    });
  };

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      goToSlide(currentIndex + 1);
    } else {
      onComplete?.();
    }
  };

  const handleSkip = () => {
    onComplete?.();
  };

  const renderSlide = (item, index) => (
    <View key={item.id} style={styles.slide}>
      <View style={styles.slideContent}>
        <Text style={styles.slideIcon}>{item.icon}</Text>
        
        <Text style={styles.slideTitle}>{item.title}</Text>
        <Text style={styles.slideSubtitle}>{item.subtitle}</Text>
        
        <View style={styles.featuresContainer}>
          {item.features.map((feature, idx) => (
            <View key={idx} style={styles.featureItem}>
              <View style={styles.featureBullet} />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderPagination = () => (
    <View style={styles.pagination}>
      {onboardingData.map((_, index) => (
        <View
          key={index}
          style={[
            styles.paginationDot,
            index === currentIndex && styles.paginationDotActive,
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Logo size="medium" />
        <Button
          title="Salta"
          variant="ghost"
          size="small"
          onPress={handleSkip}
        />
      </View>

      {/* Content */}
      <View style={styles.content} {...panResponder.panHandlers}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
            setCurrentIndex(index);
          }}
          scrollEventThrottle={16}
        >
          {onboardingData.map(renderSlide)}
        </ScrollView>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        {renderPagination()}
        
        <View style={styles.actions}>
          <Button
            title={currentIndex === onboardingData.length - 1 ? 'Inizia' : 'Avanti'}
            variant="primary"
            size="large"
            onPress={handleNext}
            style={styles.nextButton}
          />
          
          <Text style={styles.trialText}>
            🎉 Prova gratuita di 7 giorni inclusa
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightBackground,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  content: {
    flex: 1,
  },
  slide: {
    width: screenWidth,
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  slideContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  slideIcon: {
    fontSize: 80,
    marginBottom: 32,
  },
  slideTitle: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily.brand,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 40,
  },
  slideSubtitle: {
    fontSize: typography.fontSize.lg,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily.ui,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 28,
  },
  featuresContainer: {
    alignSelf: 'stretch',
    maxWidth: 300,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primaryPurple,
    marginRight: 16,
  },
  featureText: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily.ui,
    flex: 1,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.textTertiary + '40',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: colors.primaryPurple,
    width: 24,
  },
  actions: {
    alignItems: 'center',
  },
  nextButton: {
    width: '100%',
    marginBottom: 16,
  },
  trialText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily.ui,
    textAlign: 'center',
  },
});

export default OnboardingScreen;