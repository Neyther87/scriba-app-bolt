import 'package:json_annotation/json_annotation.dart';

part 'book_model.g.dart';

@JsonSerializable()
class Book {
  final String id;
  final String title;
  final String description;
  final String authorId;
  final String authorName;
  final String? coverImageUrl;
  final List<String> genres;
  final List<String> categories;
  final String language;
  final String country;
  final BookType type;
  final BookStatus status;
  final int totalChapters;
  final int estimatedReadingTime; // in minutes
  final double price;
  final bool isFree;
  final bool isPremium;
  final DateTime publishedAt;
  final DateTime createdAt;
  final DateTime updatedAt;
  final BookStats stats;
  final List<String> tags;
  final String? isbn;
  final String? audioUrl;
  final int? audioLength; // in seconds
  final String? narratorName;
  final Map<String, dynamic>? metadata;
  
  const Book({
    required this.id,
    required this.title,
    required this.description,
    required this.authorId,
    required this.authorName,
    this.coverImageUrl,
    required this.genres,
    required this.categories,
    required this.language,
    required this.country,
    required this.type,
    required this.status,
    required this.totalChapters,
    required this.estimatedReadingTime,
    required this.price,
    required this.isFree,
    required this.isPremium,
    required this.publishedAt,
    required this.createdAt,
    required this.updatedAt,
    required this.stats,
    required this.tags,
    this.isbn,
    this.audioUrl,
    this.audioLength,
    this.narratorName,
    this.metadata,
  });
  
  factory Book.fromJson(Map<String, dynamic> json) => _$BookFromJson(json);
  Map<String, dynamic> toJson() => _$BookToJson(this);
  
  Book copyWith({
    String? title,
    String? description,
    String? coverImageUrl,
    List<String>? genres,
    List<String>? categories,
    BookStatus? status,
    int? totalChapters,
    int? estimatedReadingTime,
    double? price,
    bool? isFree,
    bool? isPremium,
    DateTime? updatedAt,
    BookStats? stats,
    List<String>? tags,
    String? audioUrl,
    int? audioLength,
    String? narratorName,
    Map<String, dynamic>? metadata,
  }) {
    return Book(
      id: id,
      title: title ?? this.title,
      description: description ?? this.description,
      authorId: authorId,
      authorName: authorName,
      coverImageUrl: coverImageUrl ?? this.coverImageUrl,
      genres: genres ?? this.genres,
      categories: categories ?? this.categories,
      language: language,
      country: country,
      type: type,
      status: status ?? this.status,
      totalChapters: totalChapters ?? this.totalChapters,
      estimatedReadingTime: estimatedReadingTime ?? this.estimatedReadingTime,
      price: price ?? this.price,
      isFree: isFree ?? this.isFree,
      isPremium: isPremium ?? this.isPremium,
      publishedAt: publishedAt,
      createdAt: createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
      stats: stats ?? this.stats,
      tags: tags ?? this.tags,
      isbn: isbn,
      audioUrl: audioUrl ?? this.audioUrl,
      audioLength: audioLength ?? this.audioLength,
      narratorName: narratorName ?? this.narratorName,
      metadata: metadata ?? this.metadata,
    );
  }
  
  String get formattedPrice {
    if (isFree) return 'Gratuito';
    return '€${price.toStringAsFixed(2)}';
  }
  
  String get formattedReadingTime {
    final hours = estimatedReadingTime ~/ 60;
    final minutes = estimatedReadingTime % 60;
    if (hours > 0) {
      return '${hours}h ${minutes}m';
    }
    return '${minutes}m';
  }
  
  String get formattedAudioLength {
    if (audioLength == null) return '';
    final hours = audioLength! ~/ 3600;
    final minutes = (audioLength! % 3600) ~/ 60;
    if (hours > 0) {
      return '${hours}h ${minutes}m';
    }
    return '${minutes}m';
  }
  
  bool get hasAudio => audioUrl != null && audioUrl!.isNotEmpty;
  
  bool get isPublished => status == BookStatus.published;
  
  bool get isAvailableForUser {
    if (isFree) return true;
    return !isPremium; // Users with premium can access premium content
  }
}

enum BookType {
  @JsonValue('book')
  book,
  @JsonValue('short_story')
  shortStory,
  @JsonValue('audiobook')
  audiobook,
  @JsonValue('series')
  series,
}

enum BookStatus {
  @JsonValue('draft')
  draft,
  @JsonValue('under_review')
  underReview,
  @JsonValue('published')
  published,
  @JsonValue('suspended')
  suspended,
  @JsonValue('rejected')
  rejected,
}

@JsonSerializable()
class BookStats {
  final int views;
  final int downloads;
  final int likes;
  final int dislikes;
  final int favorites;
  final int reviews;
  final double averageRating;
  final int completions;
  final int shares;
  final double revenue;
  
  const BookStats({
    this.views = 0,
    this.downloads = 0,
    this.likes = 0,
    this.dislikes = 0,
    this.favorites = 0,
    this.reviews = 0,
    this.averageRating = 0.0,
    this.completions = 0,
    this.shares = 0,
    this.revenue = 0.0,
  });
  
  factory BookStats.fromJson(Map<String, dynamic> json) => _$BookStatsFromJson(json);
  Map<String, dynamic> toJson() => _$BookStatsToJson(this);
  
  int get totalInteractions => likes + dislikes + favorites + reviews + shares;
  
  double get engagementRate {
    if (views == 0) return 0.0;
    return (totalInteractions / views) * 100;
  }
  
  String get formattedRating {
    return averageRating.toStringAsFixed(1);
  }
}

@JsonSerializable()
class Chapter {
  final String id;
  final String bookId;
  final String title;
  final String content;
  final int chapterNumber;
  final int wordCount;
  final int estimatedReadingTime;
  final bool isFree;
  final DateTime createdAt;
  final DateTime updatedAt;
  final String? audioUrl;
  final int? audioLength;
  
  const Chapter({
    required this.id,
    required this.bookId,
    required this.title,
    required this.content,
    required this.chapterNumber,
    required this.wordCount,
    required this.estimatedReadingTime,
    required this.isFree,
    required this.createdAt,
    required this.updatedAt,
    this.audioUrl,
    this.audioLength,
  });
  
  factory Chapter.fromJson(Map<String, dynamic> json) => _$ChapterFromJson(json);
  Map<String, dynamic> toJson() => _$ChapterToJson(this);
  
  String get formattedReadingTime {
    final minutes = estimatedReadingTime;
    if (minutes > 60) {
      final hours = minutes ~/ 60;
      final remainingMinutes = minutes % 60;
      return '${hours}h ${remainingMinutes}m';
    }
    return '${minutes}m';
  }
  
  bool get hasAudio => audioUrl != null && audioUrl!.isNotEmpty;
}