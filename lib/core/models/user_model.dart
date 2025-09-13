import 'package:json_annotation/json_annotation.dart';

part 'user_model.g.dart';

@JsonSerializable()
class User {
  final String id;
  final String email;
  final String? displayName;
  final String? photoUrl;
  final String? phone;
  final UserType userType;
  final SubscriptionPlan? subscriptionPlan;
  final DateTime? subscriptionExpiresAt;
  final UserPreferences preferences;
  final UserStats stats;
  final DateTime createdAt;
  final DateTime updatedAt;
  final bool isEmailVerified;
  final bool isActive;
  final String? referralCode;
  final String? referredBy;
  final double accountBalance;
  final List<String> achievements;
  
  const User({
    required this.id,
    required this.email,
    this.displayName,
    this.photoUrl,
    this.phone,
    required this.userType,
    this.subscriptionPlan,
    this.subscriptionExpiresAt,
    required this.preferences,
    required this.stats,
    required this.createdAt,
    required this.updatedAt,
    required this.isEmailVerified,
    this.isActive = true,
    this.referralCode,
    this.referredBy,
    this.accountBalance = 0.0,
    this.achievements = const [],
  });
  
  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
  Map<String, dynamic> toJson() => _$UserToJson(this);
  
  User copyWith({
    String? id,
    String? email,
    String? displayName,
    String? photoUrl,
    String? phone,
    UserType? userType,
    SubscriptionPlan? subscriptionPlan,
    DateTime? subscriptionExpiresAt,
    UserPreferences? preferences,
    UserStats? stats,
    DateTime? updatedAt,
    bool? isEmailVerified,
    bool? isActive,
    String? referralCode,
    String? referredBy,
    double? accountBalance,
    List<String>? achievements,
  }) {
    return User(
      id: id ?? this.id,
      email: email ?? this.email,
      displayName: displayName ?? this.displayName,
      photoUrl: photoUrl ?? this.photoUrl,
      phone: phone ?? this.phone,
      userType: userType ?? this.userType,
      subscriptionPlan: subscriptionPlan ?? this.subscriptionPlan,
      subscriptionExpiresAt: subscriptionExpiresAt ?? this.subscriptionExpiresAt,
      preferences: preferences ?? this.preferences,
      stats: stats ?? this.stats,
      createdAt: createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
      isEmailVerified: isEmailVerified ?? this.isEmailVerified,
      isActive: isActive ?? this.isActive,
      referralCode: referralCode ?? this.referralCode,
      referredBy: referredBy ?? this.referredBy,
      accountBalance: accountBalance ?? this.accountBalance,
      achievements: achievements ?? this.achievements,
    );
  }
  
  bool get isSubscriptionActive {
    if (subscriptionExpiresAt == null) return false;
    return DateTime.now().isBefore(subscriptionExpiresAt!);
  }
  
  bool get canAccessPremiumContent {
    return userType != UserType.readerFree || isSubscriptionActive;
  }
  
  bool get canCreateContent {
    return userType == UserType.creatorPro && isSubscriptionActive;
  }
}

enum UserType {
  @JsonValue('reader_free')
  readerFree,
  @JsonValue('reader_pro')
  readerPro,
  @JsonValue('creator_pro')
  creatorPro,
  @JsonValue('admin')
  admin,
}

enum SubscriptionPlan {
  @JsonValue('reader_pro_monthly')
  readerProMonthly,
  @JsonValue('reader_pro_yearly')
  readerProYearly,
  @JsonValue('creator_pro_yearly')
  creatorProYearly,
}

@JsonSerializable()
class UserPreferences {
  final String language;
  final bool darkMode;
  final ReadingPreferences reading;
  final NotificationPreferences notifications;
  final PrivacyPreferences privacy;
  
  const UserPreferences({
    this.language = 'it',
    this.darkMode = false,
    required this.reading,
    required this.notifications,
    required this.privacy,
  });
  
  factory UserPreferences.fromJson(Map<String, dynamic> json) => _$UserPreferencesFromJson(json);
  Map<String, dynamic> toJson() => _$UserPreferencesToJson(this);
  
  factory UserPreferences.defaultPreferences() {
    return UserPreferences(
      reading: ReadingPreferences.defaultPreferences(),
      notifications: NotificationPreferences.defaultPreferences(),
      privacy: PrivacyPreferences.defaultPreferences(),
    );
  }
}

@JsonSerializable()
class ReadingPreferences {
  final String fontFamily;
  final double fontSize;
  final double lineHeight;
  final String theme;
  final bool ttsEnabled;
  final String ttsVoice;
  final double ttsSpeed;
  final bool autoSaveProgress;
  final bool downloadOnWifi;
  
  const ReadingPreferences({
    this.fontFamily = 'Inter',
    this.fontSize = 16.0,
    this.lineHeight = 1.5,
    this.theme = 'light',
    this.ttsEnabled = false,
    this.ttsVoice = 'female',
    this.ttsSpeed = 1.0,
    this.autoSaveProgress = true,
    this.downloadOnWifi = true,
  });
  
  factory ReadingPreferences.fromJson(Map<String, dynamic> json) => _$ReadingPreferencesFromJson(json);
  Map<String, dynamic> toJson() => _$ReadingPreferencesToJson(this);
  
  factory ReadingPreferences.defaultPreferences() {
    return const ReadingPreferences();
  }
}

@JsonSerializable()
class NotificationPreferences {
  final bool pushNotifications;
  final bool emailNotifications;
  final bool newContentNotifications;
  final bool promotionsNotifications;
  final bool socialNotifications;
  final bool systemNotifications;
  
  const NotificationPreferences({
    this.pushNotifications = true,
    this.emailNotifications = true,
    this.newContentNotifications = true,
    this.promotionsNotifications = false,
    this.socialNotifications = true,
    this.systemNotifications = true,
  });
  
  factory NotificationPreferences.fromJson(Map<String, dynamic> json) => _$NotificationPreferencesFromJson(json);
  Map<String, dynamic> toJson() => _$NotificationPreferencesToJson(this);
  
  factory NotificationPreferences.defaultPreferences() {
    return const NotificationPreferences();
  }
}

@JsonSerializable()
class PrivacyPreferences {
  final bool profilePublic;
  final bool showReadingProgress;
  final bool showReadingStats;
  final bool allowRecommendations;
  final bool dataCollection;
  
  const PrivacyPreferences({
    this.profilePublic = false,
    this.showReadingProgress = true,
    this.showReadingStats = true,
    this.allowRecommendations = true,
    this.dataCollection = true,
  });
  
  factory PrivacyPreferences.fromJson(Map<String, dynamic> json) => _$PrivacyPreferencesFromJson(json);
  Map<String, dynamic> toJson() => _$PrivacyPreferencesToJson(this);
  
  factory PrivacyPreferences.defaultPreferences() {
    return const PrivacyPreferences();
  }
}

@JsonSerializable()
class UserStats {
  final int totalBooksRead;
  final int totalReadingTime; // in minutes
  final int currentStreak;
  final int longestStreak;
  final int totalReviews;
  final int totalLikes;
  final int booksPublished;
  final double totalEarnings;
  final int referralsCount;
  
  const UserStats({
    this.totalBooksRead = 0,
    this.totalReadingTime = 0,
    this.currentStreak = 0,
    this.longestStreak = 0,
    this.totalReviews = 0,
    this.totalLikes = 0,
    this.booksPublished = 0,
    this.totalEarnings = 0.0,
    this.referralsCount = 0,
  });
  
  factory UserStats.fromJson(Map<String, dynamic> json) => _$UserStatsFromJson(json);
  Map<String, dynamic> toJson() => _$UserStatsToJson(this);
  
  String get formattedReadingTime {
    final hours = totalReadingTime ~/ 60;
    if (hours < 1) return '${totalReadingTime}m';
    return '${hours}h ${totalReadingTime % 60}m';
  }
}