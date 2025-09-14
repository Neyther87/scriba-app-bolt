import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Book, Search, User, Home, Compass } from 'lucide-react'

const App = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ScribaVerse</Text>
        <View style={styles.headerIcons}>
          <Search size={24} color="#6366f1" />
          <User size={24} color="#6366f1" />
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Benvenuto in ScribaVerse</Text>
          <Text style={styles.welcomeSubtitle}>
            Scopri, leggi e condividi i tuoi libri preferiti
          </Text>
        </View>

        {/* Featured Books */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Libri in Evidenza</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.bookCard}>
              <View style={styles.bookCover}>
                <Book size={40} color="#6366f1" />
              </View>
              <Text style={styles.bookTitle}>Il Nome della Rosa</Text>
              <Text style={styles.bookAuthor}>Umberto Eco</Text>
            </View>
            <View style={styles.bookCard}>
              <View style={styles.bookCover}>
                <Book size={40} color="#8b5cf6" />
              </View>
              <Text style={styles.bookTitle}>1984</Text>
              <Text style={styles.bookAuthor}>George Orwell</Text>
            </View>
            <View style={styles.bookCard}>
              <View style={styles.bookCover}>
                <Book size={40} color="#06b6d4" />
              </View>
              <Text style={styles.bookTitle}>Cento Anni di Solitudine</Text>
              <Text style={styles.bookAuthor}>Gabriel García Márquez</Text>
            </View>
          </ScrollView>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categorie</Text>
          <View style={styles.categoriesGrid}>
            <View style={styles.categoryCard}>
              <Text style={styles.categoryTitle}>Romanzi</Text>
            </View>
            <View style={styles.categoryCard}>
              <Text style={styles.categoryTitle}>Saggi</Text>
            </View>
            <View style={styles.categoryCard}>
              <Text style={styles.categoryTitle}>Poesia</Text>
            </View>
            <View style={styles.categoryCard}>
              <Text style={styles.categoryTitle}>Storia</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <View style={styles.navItem}>
          <Home size={24} color="#6366f1" />
          <Text style={styles.navText}>Home</Text>
        </View>
        <View style={styles.navItem}>
          <Compass size={24} color="#9ca3af" />
          <Text style={styles.navTextInactive}>Scopri</Text>
        </View>
        <View style={styles.navItem}>
          <Book size={24} color="#9ca3af" />
          <Text style={styles.navTextInactive}>Libreria</Text>
        </View>
        <View style={styles.navItem}>
          <User size={24} color="#9ca3af" />
          <Text style={styles.navTextInactive}>Profilo</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  welcomeSection: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  bookCard: {
    width: 140,
    marginRight: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookCover: {
    height: 80,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 12,
    color: '#64748b',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingVertical: 12,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navText: {
    fontSize: 12,
    color: '#6366f1',
    marginTop: 4,
    fontWeight: '500',
  },
  navTextInactive: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
  },
})

export default App