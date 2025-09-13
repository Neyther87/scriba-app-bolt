import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:cached_network_image/cached_network_image.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/widgets/loading_widget.dart';
import '../../../core/widgets/error_widget.dart';
import '../../../core/models/book_model.dart';
import '../providers/discover_provider.dart';
import '../widgets/featured_book_card.dart';
import '../widgets/book_category_section.dart';
import '../widgets/recommendation_section.dart';

class DiscoverScreen extends ConsumerStatefulWidget {
  const DiscoverScreen({super.key});

  @override
  ConsumerState<DiscoverScreen> createState() => _DiscoverScreenState();
}

class _DiscoverScreenState extends ConsumerState<DiscoverScreen> {
  final ScrollController _scrollController = ScrollController();

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      ref.read(discoverProvider.notifier).loadDiscoverContent();
    });
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final discoverState = ref.watch(discoverProvider);
    
    return Scaffold(
      body: RefreshIndicator(
        onRefresh: () => ref.read(discoverProvider.notifier).refreshContent(),
        child: discoverState.when(
          loading: () => const LoadingWidget(),
          error: (error, stack) => CustomErrorWidget(
            message: error.toString(),
            onRetry: () => ref.read(discoverProvider.notifier).loadDiscoverContent(),
          ),
          data: (data) => _buildContent(context, data),
        ),
      ),
    );
  }

  Widget _buildContent(BuildContext context, DiscoverContent content) {
    return SingleChildScrollView(
      controller: _scrollController,
      physics: const BouncingScrollPhysics(),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Hero Section
          if (content.featuredBooks.isNotEmpty) ...[
            _buildHeroSection(content.featuredBooks),
            const SizedBox(height: 24),
          ],
          
          // Quick Actions
          _buildQuickActions(context),
          const SizedBox(height: 24),
          
          // Recommendations
          if (content.recommendations.isNotEmpty) ...[
            RecommendationSection(books: content.recommendations),
            const SizedBox(height: 24),
          ],
          
          // New Releases
          if (content.newReleases.isNotEmpty) ...[
            BookCategorySection(
              title: 'Nuove Uscite',
              books: content.newReleases,
              showViewAll: true,
            ),
            const SizedBox(height: 24),
          ],
          
          // Trending
          if (content.trending.isNotEmpty) ...[
            BookCategorySection(
              title: 'Tendenze',
              books: content.trending,
              showViewAll: true,
            ),
            const SizedBox(height: 24),
          ],
          
          // Categories
          if (content.categories.isNotEmpty) ...[
            _buildCategoriesGrid(context, content.categories),
            const SizedBox(height: 24),
          ],
          
          // Editor's Choice
          if (content.editorsChoice.isNotEmpty) ...[
            BookCategorySection(
              title: 'Scelta della Redazione',
              books: content.editorsChoice,
              showViewAll: true,
            ),
            const SizedBox(height: 24),
          ],
          
          const SizedBox(height: 80),
        ],
      ),
    );
  }

  Widget _buildHeroSection(List<Book> featuredBooks) {
    return SizedBox(
      height: 280,
      child: PageView.builder(
        itemCount: featuredBooks.length.clamp(0, 5),
        itemBuilder: (context, index) {
          return Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: FeaturedBookCard(book: featuredBooks[index]),
          );
        },
      ),
    );
  }

  Widget _buildQuickActions(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Cosa vuoi fare oggi?',
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              Expanded(
                child: _buildQuickActionCard(
                  context,
                  icon: Icons.auto_stories,
                  title: 'Continua a Leggere',
                  subtitle: 'Riprendi dove avevi lasciato',
                  color: AppColors.primaryPurple,
                  onTap: () => Navigator.pushNamed(context, '/library'),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _buildQuickActionCard(
                  context,
                  icon: Icons.explore,
                  title: 'Esplora Generi',
                  subtitle: 'Scopri nuove storie',
                  color: AppColors.gold,
                  onTap: () => Navigator.pushNamed(context, '/books'),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildQuickActionCard(
    BuildContext context, {
    required IconData icon,
    required String title,
    required String subtitle,
    required Color color,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(16),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: color.withOpacity(0.1),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: color.withOpacity(0.2)),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: color.withOpacity(0.2),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Icon(icon, color: color, size: 24),
            ),
            const SizedBox(height: 12),
            Text(
              title,
              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.w600,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              subtitle,
              style: Theme.of(context).textTheme.bodySmall,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCategoriesGrid(BuildContext context, List<String> categories) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Esplora per Categoria',
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 16),
          GridView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2,
              childAspectRatio: 3,
              crossAxisSpacing: 12,
              mainAxisSpacing: 12,
            ),
            itemCount: categories.length.clamp(0, 8),
            itemBuilder: (context, index) {
              return _buildCategoryCard(context, categories[index]);
            },
          ),
        ],
      ),
    );
  }

  Widget _buildCategoryCard(BuildContext context, String category) {
    return InkWell(
      onTap: () {
        Navigator.pushNamed(
          context,
          '/books',
          arguments: {'category': category},
        );
      },
      borderRadius: BorderRadius.circular(12),
      child: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              AppColors.primaryPurple.withOpacity(0.8),
              AppColors.deepBlue.withOpacity(0.8),
            ],
          ),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Center(
          child: Text(
            category,
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
              color: Colors.white,
              fontWeight: FontWeight.w600,
            ),
            textAlign: TextAlign.center,
          ),
        ),
      ),
    );
  }
}