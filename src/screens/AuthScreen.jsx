import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert 
} from 'react-native';
import { colors, typography, shadows } from '../styles/colors';
import Logo from '../components/common/Logo';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const AuthScreen = ({ onLogin, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode); // 'login', 'register', 'forgot'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    userType: 'reader', // 'reader', 'creator'
    acceptTerms: false,
    acceptGDPR: false,
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.email.includes('@')) {
      Alert.alert('Errore', 'Inserisci un indirizzo email valido');
      return false;
    }
    
    if (!formData.password || formData.password.length < 6) {
      Alert.alert('Errore', 'La password deve essere di almeno 6 caratteri');
      return false;
    }
    
    if (mode === 'register') {
      if (!formData.name || formData.name.length < 2) {
        Alert.alert('Errore', 'Inserisci il tuo nome');
        return false;
      }
      
      if (formData.password !== formData.confirmPassword) {
        Alert.alert('Errore', 'Le password non coincidono');
        return false;
      }
      
      if (!formData.acceptTerms) {
        Alert.alert('Errore', 'Devi accettare i Termini di Servizio');
        return false;
      }
      
      if (!formData.acceptGDPR) {
        Alert.alert('Errore', 'Devi accettare il trattamento dei dati personali (GDPR)');
        return false;
      }
    }
    
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (mode === 'login') {
        onLogin?.(formData);
      } else if (mode === 'register') {
        // Show trial offer
        Alert.alert(
          '🎉 Benvenuto in ScribaVerse!',
          'La tua prova gratuita di 7 giorni è iniziata. Accesso completo a tutti i contenuti!',
          [{ text: 'Inizia a Leggere', onPress: () => onLogin?.(formData) }]
        );
      } else if (mode === 'forgot') {
        Alert.alert(
          'Email Inviata',
          'Ti abbiamo inviato le istruzioni per reimpostare la password.',
          [{ text: 'OK', onPress: () => setMode('login') }]
        );
      }
    } catch (error) {
      Alert.alert('Errore', 'Si è verificato un errore. Riprova.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    Alert.alert('Social Login', `Login con ${provider} in sviluppo`);
  };

  const renderUserTypeSelector = () => {
    if (mode !== 'register') return null;
    
    return (
      <View style={styles.userTypeContainer}>
        <Text style={styles.userTypeTitle}>Che tipo di utente sei?</Text>
        
        <View style={styles.userTypeOptions}>
          <TouchableOpacity
            style={[
              styles.userTypeOption,
              formData.userType === 'reader' && styles.userTypeOptionActive
            ]}
            onPress={() => handleInputChange('userType', 'reader')}
          >
            <Text style={styles.userTypeIcon}>📖</Text>
            <Text style={styles.userTypeLabel}>Lettore</Text>
            <Text style={styles.userTypeDescription}>
              Voglio leggere e scoprire nuove storie
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.userTypeOption,
              formData.userType === 'creator' && styles.userTypeOptionActive
            ]}
            onPress={() => handleInputChange('userType', 'creator')}
          >
            <Text style={styles.userTypeIcon}>✍️</Text>
            <Text style={styles.userTypeLabel}>Autore</Text>
            <Text style={styles.userTypeDescription}>
              Voglio pubblicare le mie opere
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderSocialButtons = () => (
    <View style={styles.socialContainer}>
      <Text style={styles.socialTitle}>Oppure continua con</Text>
      
      <View style={styles.socialButtons}>
        <TouchableOpacity 
          style={styles.socialButton}
          onPress={() => handleSocialLogin('Google')}
        >
          <Text style={styles.socialButtonText}>G</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.socialButton}
          onPress={() => handleSocialLogin('Apple')}
        >
          <Text style={styles.socialButtonText}>🍎</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderGDPRConsent = () => {
    if (mode !== 'register') return null;
    
    return (
      <View style={styles.consentContainer}>
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => handleInputChange('acceptTerms', !formData.acceptTerms)}
        >
          <View style={[styles.checkbox, formData.acceptTerms && styles.checkboxChecked]}>
            {formData.acceptTerms && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.checkboxText}>
            Accetto i <Text style={styles.linkText}>Termini di Servizio</Text>
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => handleInputChange('acceptGDPR', !formData.acceptGDPR)}
        >
          <View style={[styles.checkbox, formData.acceptGDPR && styles.checkboxChecked]}>
            {formData.acceptGDPR && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.checkboxText}>
            Accetto il trattamento dei dati personali secondo il{' '}
            <Text style={styles.linkText}>GDPR</Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const getTitle = () => {
    switch (mode) {
      case 'login': return 'Bentornato!';
      case 'register': return 'Crea il tuo Account';
      case 'forgot': return 'Recupera Password';
      default: return 'ScribaVerse';
    }
  };

  const getSubtitle = () => {
    switch (mode) {
      case 'login': return 'Accedi al tuo universo di lettura';
      case 'register': return 'Inizia la tua avventura letteraria';
      case 'forgot': return 'Ti invieremo le istruzioni via email';
      default: return '';
    }
  };

  const getButtonTitle = () => {
    switch (mode) {
      case 'login': return 'Accedi';
      case 'register': return 'Crea Account';
      case 'forgot': return 'Invia Email';
      default: return 'Continua';
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Logo size="large" />
          <Text style={styles.title}>{getTitle()}</Text>
          <Text style={styles.subtitle}>{getSubtitle()}</Text>
        </View>

        {/* Form */}
        <Card style={styles.formCard}>
          {mode === 'register' && (
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nome Completo</Text>
              <TextInput
                style={styles.input}
                placeholder="Il tuo nome"
                value={formData.name}
                onChangeText={(value) => handleInputChange('name', value)}
                autoCapitalize="words"
              />
            </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="la-tua-email@esempio.com"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {mode !== 'forgot' && (
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="La tua password"
                  value={formData.password}
                  onChangeText={(value) => handleInputChange('password', value)}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  style={styles.passwordToggle}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text style={styles.passwordToggleText}>
                    {showPassword ? '🙈' : '👁️'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {mode === 'register' && (
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Conferma Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Ripeti la password"
                value={formData.confirmPassword}
                onChangeText={(value) => handleInputChange('confirmPassword', value)}
                secureTextEntry={!showPassword}
              />
            </View>
          )}

          {renderUserTypeSelector()}
          {renderGDPRConsent()}

          <Button
            title={getButtonTitle()}
            onPress={handleSubmit}
            loading={loading}
            style={styles.submitButton}
          />

          {mode === 'login' && (
            <TouchableOpacity
              style={styles.forgotButton}
              onPress={() => setMode('forgot')}
            >
              <Text style={styles.forgotText}>Password dimenticata?</Text>
            </TouchableOpacity>
          )}
        </Card>

        {mode !== 'forgot' && renderSocialButtons()}

        {/* Footer */}
        <View style={styles.footer}>
          {mode === 'login' ? (
            <TouchableOpacity onPress={() => setMode('register')}>
              <Text style={styles.footerText}>
                Non hai un account?{' '}
                <Text style={styles.footerLink}>Registrati</Text>
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setMode('login')}>
              <Text style={styles.footerText}>
                Hai già un account?{' '}
                <Text style={styles.footerLink}>Accedi</Text>
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {mode === 'register' && (
          <View style={styles.trialBanner}>
            <Text style={styles.trialText}>
              🎉 Prova gratuita di 7 giorni inclusa!
            </Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightBackground,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 32,
  },
  title: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily.brand,
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily.ui,
    textAlign: 'center',
  },
  formCard: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily.ui,
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.textTertiary + '40',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: typography.fontSize.base,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily.ui,
    backgroundColor: colors.white,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.textTertiary + '40',
    borderRadius: 12,
    backgroundColor: colors.white,
  },
  passwordInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 16,
    fontSize: typography.fontSize.base,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily.ui,
  },
  passwordToggle: {
    padding: 12,
  },
  passwordToggleText: {
    fontSize: typography.fontSize.lg,
  },
  userTypeContainer: {
    marginBottom: 20,
  },
  userTypeTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily.ui,
    marginBottom: 12,
  },
  userTypeOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  userTypeOption: {
    flex: 1,
    padding: 16,
    borderWidth: 2,
    borderColor: colors.textTertiary + '40',
    borderRadius: 12,
    alignItems: 'center',
  },
  userTypeOptionActive: {
    borderColor: colors.primaryPurple,
    backgroundColor: colors.primaryPurple + '10',
  },
  userTypeIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  userTypeLabel: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily.ui,
    marginBottom: 4,
  },
  userTypeDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily.ui,
    textAlign: 'center',
  },
  consentContainer: {
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: colors.textTertiary + '60',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: colors.primaryPurple,
    borderColor: colors.primaryPurple,
  },
  checkmark: {
    color: colors.white,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
  },
  checkboxText: {
    flex: 1,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily.ui,
    lineHeight: 20,
  },
  linkText: {
    color: colors.primaryPurple,
    fontWeight: typography.fontWeight.medium,
  },
  submitButton: {
    marginTop: 8,
  },
  forgotButton: {
    alignItems: 'center',
    marginTop: 16,
  },
  forgotText: {
    fontSize: typography.fontSize.sm,
    color: colors.primaryPurple,
    fontFamily: typography.fontFamily.ui,
  },
  socialContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  socialTitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily.ui,
    marginBottom: 16,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.medium,
  },
  socialButtonText: {
    fontSize: typography.fontSize.lg,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  footerText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily.ui,
  },
  footerLink: {
    color: colors.primaryPurple,
    fontWeight: typography.fontWeight.medium,
  },
  trialBanner: {
    backgroundColor: colors.success + '20',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  trialText: {
    fontSize: typography.fontSize.sm,
    color: colors.success,
    fontFamily: typography.fontFamily.ui,
    fontWeight: typography.fontWeight.medium,
  },
});

export default AuthScreen;