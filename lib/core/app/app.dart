import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../models/user_model.dart';
import '../services/auth_service.dart';
import '../../features/auth/screens/login_screen.dart';
import '../../features/auth/screens/register_screen.dart';
import '../../features/auth/screens/forgot_password_screen.dart';
import '../../features/onboarding/screens/onboarding_screen.dart';
import '../../features/home/screens/main_screen.dart';
import '../../features/books/screens/book_detail_screen.dart';
import '../../features/books/screens/book_reader_screen.dart';
import '../../features/books/screens/books_list_screen.dart';
import '../../features/profile/screens/profile_screen.dart';
import '../../features/profile/screens/settings_screen.dart';
import '../../features/subscription/screens/subscription_screen.dart';
import '../../features/creator/screens/creator_dashboard_screen.dart';
import '../../features/creator/screens/book_editor_screen.dart';
import '../../features/library/screens/library_screen.dart';
import '../../features/search/screens/search_screen.dart';

// Router Provider
final appRouterProvider = Provider<GoRouter>((ref) {
  final authService = ref.read(authServiceProvider);
  
  return GoRouter(
    initialLocation: '/onboarding',
    debugLogDiagnostics: true,
    
    redirect: (context, state) async {
      final user = await authService.getCurrentUser();
      final isLoggedIn = user != null;
      
      // Percorsi pubblici che non richiedono autenticazione
      final publicPaths = [
        '/onboarding',
        '/login',
        '/register',
        '/forgot-password',
      ];
      
      // Se l'utente non è loggato e sta tentando di accedere a un percorso privato
      if (!isLoggedIn && !publicPaths.contains(state.location)) {
        return '/login';
      }
      
      // Se l'utente è loggato e sta tentando di accedere a percorsi di auth
      if (isLoggedIn && publicPaths.contains(state.location)) {
        return '/home';
      }
      
      return null;
    },
    
    routes: [
      // Onboarding
      GoRoute(
        path: '/onboarding',
        builder: (context, state) => const OnboardingScreen(),
      ),
      
      // Auth Routes
      GoRoute(
        path: '/login',
        builder: (context, state) => const LoginScreen(),
      ),
      GoRoute(
        path: '/register',
        builder: (context, state) => const RegisterScreen(),
      ),
      GoRoute(
        path: '/forgot-password',
        builder: (context, state) => const ForgotPasswordScreen(),
      ),
      
      // Main App Routes
      GoRoute(
        path: '/home',
        builder: (context, state) => const MainScreen(),
      ),
      
      // Books
      GoRoute(
        path: '/books',
        builder: (context, state) => const BooksListScreen(),
      ),
      GoRoute(
        path: '/book/:bookId',
        builder: (context, state) {
          final bookId = state.pathParameters['bookId']!;
          return BookDetailScreen(bookId: bookId);
        },
      ),
      GoRoute(
        path: '/book/:bookId/read',
        builder: (context, state) {
          final bookId = state.pathParameters['bookId']!;
          final chapterId = state.queryParameters['chapter'];
          return BookReaderScreen(
            bookId: bookId,
            chapterId: chapterId,
          );
        },
      ),
      
      // Search
      GoRoute(
        path: '/search',
        builder: (context, state) => const SearchScreen(),
      ),
      
      // Library
      GoRoute(
        path: '/library',
        builder: (context, state) => const LibraryScreen(),
      ),
      
      // Profile
      GoRoute(
        path: '/profile',
        builder: (context, state) => const ProfileScreen(),
      ),
      GoRoute(
        path: '/settings',
        builder: (context, state) => const SettingsScreen(),
      ),
      
      // Subscription
      GoRoute(
        path: '/subscription',
        builder: (context, state) => const SubscriptionScreen(),
      ),
      
      // Creator Routes
      GoRoute(
        path: '/creator',
        builder: (context, state) => const CreatorDashboardScreen(),
      ),
      GoRoute(
        path: '/creator/editor',
        builder: (context, state) {
          final bookId = state.queryParameters['bookId'];
          return BookEditorScreen(bookId: bookId);
        },
      ),
    ],
    
    errorBuilder: (context, state) => const MainScreen(),
  );
});

// Theme Mode Provider
final themeModeProvider = StateNotifierProvider<ThemeModeNotifier, ThemeMode>((ref) {
  return ThemeModeNotifier();
});

class ThemeModeNotifier extends StateNotifier<ThemeMode> {
  ThemeModeNotifier() : super(ThemeMode.system);
  
  void setThemeMode(ThemeMode mode) {
    state = mode;
  }
  
  void toggleTheme() {
    state = state == ThemeMode.light ? ThemeMode.dark : ThemeMode.light;
  }
}