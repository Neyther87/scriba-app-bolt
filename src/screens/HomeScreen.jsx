import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput,
  TouchableOpacity,
  FlatList,
  RefreshControl 
} from 'react-native';
import { colors, typography, shadows } from '../styles/colors';
import Logo from '../components/common/Logo';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import BookCard from '../components/books/BookCard';

// Mock data
const mockBooks = [
  {
    id: 1,
    title: 'Il Mistero della Villa Abbandonata',
    author: 'Maria Rossi',
    description: 'Un thriller avvincente ambientato nella campagna toscana...',
    coverUrl: 'https://picsum.photos/160/240?random=1',
    rating: 4.5,
    duration: '6h 30m',
    isPremium: true,
    progress: 65,
    canDownload: true,
  },
  {
    id: 2,
    title: 'Racconti di Mezzanotte',
    author: 'Giuseppe Verdi',
    description: 'Una collezione di storie brevi che esplorano...',
    coverUrl: 'https://picsum.photos/160/240?random=2',
    rating: 4.2,
    duration: '3h 15m',
    isAiGenerated: true,
    progress: 0,
    canDownload: false,
  },
  {
    id: 3,
    title: 'L\'Arte della Scrittura Moderna',
    author: 'Anna Bianchi',
    description: 'Una guida completa per aspiranti scrittori...',
    coverUrl: 'https://picsum.photos/160/240?random=3',
    rating: 4.8,
    duration: '8h 45m',
    isNew: true,
    progress: 0,
    canDownload: true,
  },
];

const categories = [
  { id: 1, name: 'Romanzi', icon: '📖', color: colors.primaryPurple },
  { id: 2, name: 'Thriller', icon: '🔍', color: colors.deepBlue },
  { id: 3, name: 'Fantasy', icon: '🧙‍♂️', color: colors.accentGold },
  { id: 4, name: 'Saggi', icon: '🎓', color: colors.success },
];

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [featuredBooks, setFeaturedBooks] = useState(mockBooks);
  const [newReleases, setNewReleases] = useState(mockBooks);
  const [continueReading, setContinueReading] = useState(mockBooks.filter(book => book.progress > 0));

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleBookPress = (book) => {
    navigation?.navigate('BookDetail', { bookId: book.id });
  };

  const handleWishlist = (book) => {
    console.log('Add to wishlist:', book.title);
  };

  const handleDownload = (book) => {
    console.log('Download book:', book.title);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <Logo size="medium" />
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Text style={styles.headerButtonText}>🔔</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Text style={styles.headerButtonText}>👤</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <Text style={styles.welcomeText}>
        Buongiorno! 👋
      </Text>
      <Text style={styles.welcomeSubtext}>
        Cosa vuoi leggere oggi?
      </Text>
    </View>
  );

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Cerca libri, autori, generi..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={colors.textTertiary}
        />
        <TouchableOpacity style={styles.voiceButton}>
          <Text style={styles.voiceIcon}>🎤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderQuickActions = () => (
    <View style={styles.quickActions}>
      <Card style={styles.actionCard} onPress={() => navigation?.navigate('Library')}>
        <View style={styles.actionContent}>
          <Text style={styles.actionIcon}>📚</Text>
          <View style={styles.actionText}>
            <Text style={styles.actionTitle}>Continua a Leggere</Text>
            <Text style={styles.actionSubtitle}>3 libri in corso</Text>
          </View>
        </View>
      </Card>
      
      <Card style={styles.actionCard} onPress={() => navigation?.navigate('Discover')}>
        <View style={styles.actionContent}>
          <Text style={styles.actionIcon}>✨</Text>
          <View style={styles.actionText}>
            <Text style={styles.actionTitle}>Scopri Novità</Text>
            <Text style={styles.actionSubtitle}>Nuove uscite</Text>
          </View>
        </View>
      </Card>
    </View>
  );

  const renderCategories = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Esplora per Categoria</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
        {categories.map((category) => (
          <TouchableOpacity key={category.id} style={styles.categoryCard}>
            <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
              <Text style={styles.categoryEmoji}>{category.icon}</Text>
            </View>
            <Text style={styles.categoryName}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderContinueReading = () => {
    if (continueReading.length === 0) return null;
    
    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Continua a Leggere</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>Vedi tutto</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {continueReading.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onPress={handleBookPress}
              onWishlist={handleWishlist}
              onDownload={handleDownload}
            />
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderFeaturedBooks = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>In Evidenza</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>Vedi tutto</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {featuredBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onPress={handleBookPress}
            onWishlist={handleWishlist}
            onDownload={handleDownload}
          />
        ))}
      </ScrollView>
    </View>
  );

  const renderNewReleases = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Nuove Uscite</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>Vedi tutto</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.newReleasesList}>
        {newReleases.slice(0, 3).map((book) => (
          <BookCard
            key={book.id}
            book={book}
            variant="horizontal"
            onPress={handleBookPress}
            onWishlist={handleWishlist}
            onDownload={handleDownload}
          />
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {renderHeader()}
      {renderSearchBar()}
      {renderQuickActions()}
      {renderCategories()}
      {renderContinueReading()}
      {renderFeaturedBooks()}
      {renderNewReleases()}
      
      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightBackground,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: colors.white,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  headerButtonText: {
    fontSize: typography.fontSize.lg,
  },
  welcomeText: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily.ui,
    marginBottom: 4,
  },
  welcomeSubtext: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily.ui,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.white,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightBackground,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    fontSize: typography.fontSize.lg,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: typography.fontSize.base,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily.ui,
  },
  voiceButton: {
    padding: 4,
  },
  voiceIcon: {
    fontSize: typography.fontSize.lg,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  actionCard: {
    flex: 1,
    padding: 16,
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  actionText: {
    flex: 1,
  },
  actionTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily.ui,
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily.ui,
  },
  section: {
    paddingVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily.ui,
  },
  seeAllText: {
    fontSize: typography.fontSize.sm,
    color: colors.primaryPurple,
    fontFamily: typography.fontFamily.ui,
    fontWeight: typography.fontWeight.medium,
  },
  categoriesScroll: {
    paddingLeft: 20,
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: 20,
    width: 80,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryEmoji: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily.ui,
    textAlign: 'center',
  },
  newReleasesList: {
    paddingHorizontal: 20,
  },
  bottomSpacing: {
    height: 100,
  },
});

export default HomeScreen;