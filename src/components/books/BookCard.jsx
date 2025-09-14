import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, typography, shadows } from '../../styles/colors';
import Card from '../common/Card';

const BookCard = ({ 
  book, 
  onPress, 
  onWishlist, 
  onDownload,
  variant = 'default',
  style 
}) => {
  const renderBadges = () => (
    <View style={styles.badges}>
      {book.isPremium && (
        <View style={[styles.badge, styles.premiumBadge]}>
          <Text style={styles.badgeText}>PRO</Text>
        </View>
      )}
      {book.isAiGenerated && (
        <View style={[styles.badge, styles.aiBadge]}>
          <Text style={styles.badgeText}>AI</Text>
        </View>
      )}
      {book.isNew && (
        <View style={[styles.badge, styles.newBadge]}>
          <Text style={styles.badgeText}>NUOVO</Text>
        </View>
      )}
    </View>
  );

  const renderProgressRing = () => {
    if (!book.progress || book.progress === 0) return null;
    
    return (
      <View style={styles.progressContainer}>
        <View style={styles.progressRing}>
          <View 
            style={[
              styles.progressFill, 
              { transform: [{ rotate: `${book.progress * 3.6}deg` }] }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>{Math.round(book.progress)}%</Text>
      </View>
    );
  };

  const renderActions = () => (
    <View style={styles.actions}>
      <TouchableOpacity 
        style={styles.actionButton}
        onPress={() => onWishlist?.(book)}
      >
        <Text style={styles.actionIcon}>♡</Text>
      </TouchableOpacity>
      
      {book.canDownload && (
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => onDownload?.(book)}
        >
          <Text style={styles.actionIcon}>↓</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderRating = () => (
    <View style={styles.rating}>
      <Text style={styles.stars}>
        {'★'.repeat(Math.floor(book.rating))}
        {'☆'.repeat(5 - Math.floor(book.rating))}
      </Text>
      <Text style={styles.ratingText}>{book.rating.toFixed(1)}</Text>
    </View>
  );

  if (variant === 'horizontal') {
    return (
      <Card style={[styles.horizontalCard, style]} onPress={() => onPress?.(book)}>
        <View style={styles.horizontalContent}>
          <View style={styles.horizontalCover}>
            <Image 
              source={{ uri: book.coverUrl || 'https://via.placeholder.com/80x120' }}
              style={styles.horizontalCoverImage}
              resizeMode="cover"
            />
            {renderProgressRing()}
          </View>
          
          <View style={styles.horizontalInfo}>
            <View style={styles.horizontalHeader}>
              <Text style={styles.horizontalTitle} numberOfLines={2}>
                {book.title}
              </Text>
              {renderBadges()}
            </View>
            
            <Text style={styles.author} numberOfLines={1}>
              di {book.author}
            </Text>
            
            <Text style={styles.description} numberOfLines={2}>
              {book.description}
            </Text>
            
            <View style={styles.horizontalFooter}>
              {renderRating()}
              <Text style={styles.duration}>{book.duration}</Text>
            </View>
          </View>
          
          {renderActions()}
        </View>
      </Card>
    );
  }

  return (
    <Card style={[styles.card, style]} onPress={() => onPress?.(book)}>
      <View style={styles.coverContainer}>
        <Image 
          source={{ uri: book.coverUrl || 'https://via.placeholder.com/160x240' }}
          style={styles.coverImage}
          resizeMode="cover"
        />
        {renderBadges()}
        {renderProgressRing()}
        {renderActions()}
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {book.title}
        </Text>
        
        <Text style={styles.author} numberOfLines={1}>
          di {book.author}
        </Text>
        
        <Text style={styles.description} numberOfLines={3}>
          {book.description}
        </Text>
        
        <View style={styles.footer}>
          {renderRating()}
          <Text style={styles.duration}>{book.duration}</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 180,
    marginRight: 16,
  },
  
  horizontalCard: {
    marginBottom: 16,
    marginRight: 0,
    width: '100%',
  },
  
  horizontalContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  
  coverContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  
  coverImage: {
    width: '100%',
    height: 240,
    borderRadius: 12,
    backgroundColor: colors.lightBackground,
  },
  
  horizontalCover: {
    position: 'relative',
    marginRight: 16,
  },
  
  horizontalCoverImage: {
    width: 80,
    height: 120,
    borderRadius: 8,
    backgroundColor: colors.lightBackground,
  },
  
  badges: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 4,
  },
  
  premiumBadge: {
    backgroundColor: colors.accentGold,
  },
  
  aiBadge: {
    backgroundColor: colors.info,
  },
  
  newBadge: {
    backgroundColor: colors.success,
  },
  
  badgeText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    color: colors.white,
    fontFamily: typography.fontFamily.ui,
  },
  
  progressContainer: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  progressRing: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.textTertiary + '40',
  },
  
  progressFill: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.primaryPurple,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  
  progressText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    color: colors.primaryPurple,
    fontFamily: typography.fontFamily.ui,
  },
  
  actions: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'column',
  },
  
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.white + 'E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    ...shadows.small,
  },
  
  actionIcon: {
    fontSize: typography.fontSize.lg,
    color: colors.primaryPurple,
  },
  
  content: {
    flex: 1,
  },
  
  horizontalInfo: {
    flex: 1,
    paddingRight: 16,
  },
  
  horizontalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  
  title: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily.ui,
    marginBottom: 4,
  },
  
  horizontalTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily.ui,
    flex: 1,
    marginRight: 8,
  },
  
  author: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily.ui,
    marginBottom: 8,
  },
  
  description: {
    fontSize: typography.fontSize.sm,
    color: colors.textTertiary,
    fontFamily: typography.fontFamily.ui,
    lineHeight: 20,
    marginBottom: 12,
  },
  
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  horizontalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  stars: {
    fontSize: typography.fontSize.sm,
    color: colors.accentGold,
    marginRight: 4,
  },
  
  ratingText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily.ui,
  },
  
  duration: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily.ui,
  },
});

export default BookCard;