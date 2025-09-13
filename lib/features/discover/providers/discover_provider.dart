import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/models/book_model.dart';
import '../../../core/services/books_service.dart';
import '../../../core/services/recommendations_service.dart';

class DiscoverContent {
  final List<Book> featuredBooks;
  final List<Book> newReleases;
  final List<Book> trending;
  final List<Book> editorsChoice;
  final List<Book> recommendations;
  final List<String> categories;
  
  DiscoverContent({
    required this.featuredBooks,
    required this.newReleases,
    required this.trending,
    required this.editorsChoice,
    required this.recommendations,
    required this.categories,
  });
}

class DiscoverNotifier extends StateNotifier<AsyncValue<DiscoverContent>> {
  final BooksService _booksService;
  final RecommendationsService _recommendationsService;
  
  DiscoverNotifier(this._booksService, this._recommendationsService)
      : super(const AsyncValue.loading());

  Future<void> loadDiscoverContent() async {
    try {
      state = const AsyncValue.loading();
      
      // Carica i dati in parallelo
      final results = await Future.wait([
        _booksService.getFeaturedBooks(),
        _booksService.getNewReleases(),
        _booksService.getTrendingBooks(),
        _booksService.getEditorsChoice(),
        _recommendationsService.getPersonalizedRecommendations(),
        _booksService.getAvailableCategories(),
      ]);
      
      final content = DiscoverContent(
        featuredBooks: results[0] as List<Book>,
        newReleases: results[1] as List<Book>,
        trending: results[2] as List<Book>,
        editorsChoice: results[3] as List<Book>,
        recommendations: results[4] as List<Book>,
        categories: results[5] as List<String>,
      );
      
      state = AsyncValue.data(content);
    } catch (error, stackTrace) {
      state = AsyncValue.error(error, stackTrace);
    }
  }
  
  Future<void> refreshContent() async {
    await loadDiscoverContent();
  }
  
  void clearContent() {
    state = const AsyncValue.loading();
  }
}

final discoverProvider = StateNotifierProvider<DiscoverNotifier, AsyncValue<DiscoverContent>>((ref) {
  final booksService = ref.read(booksServiceProvider);
  final recommendationsService = ref.read(recommendationsServiceProvider);
  return DiscoverNotifier(booksService, recommendationsService);
});