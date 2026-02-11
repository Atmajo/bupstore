import 'package:flutter/cupertino.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../../config/theme.dart';
import '../../../../core/constants/app_constants.dart';
import '../../../../widgets/glass_button.dart';
import '../../../../widgets/bottom_tab_bar.dart';
import '../providers.dart';
import '../widgets/domain_grid.dart';

class DashboardPage extends ConsumerStatefulWidget {
  const DashboardPage({Key? key}) : super(key: key);

  @override
  ConsumerState<DashboardPage> createState() => _DashboardPageState();
}

class _DashboardPageState extends ConsumerState<DashboardPage> {
  int _selectedTab = 0;

  @override
  Widget build(BuildContext context) {
    final domainsAsync = ref.watch(getDomainsFuture);
    final userAsync = ref.watch(userProfileProvider);

    return CupertinoPageScaffold(
      backgroundColor: AppTheme.getBackgroundColor(context),
      child: Stack(
        children: [
          SafeArea(
            child: CustomScrollView(
              slivers: [
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.all(AppConstants.spacingL),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        userAsync.when(
                          data: (user) {
                            final email =
                                user['email'] as String? ?? 'User';
                            return Text(
                              'Welcome, ${email.split('@').first}',
                              style: TextStyle(
                                fontSize: AppConstants.font2XL,
                                fontWeight: FontWeight.w700,
                                color: AppTheme
                                    .getTextColor(context),
                              ),
                            );
                          },
                          loading: () => Text(
                            'Welcome',
                            style: TextStyle(
                              fontSize: AppConstants.font2XL,
                              fontWeight: FontWeight.w700,
                              color: AppTheme
                                  .getTextColor(context),
                            ),
                          ),
                          error: (err, stack) => Text(
                            'Welcome',
                            style: TextStyle(
                              fontSize: AppConstants.font2XL,
                              fontWeight: FontWeight.w700,
                              color: AppTheme
                                  .getTextColor(context),
                            ),
                          ),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          'Your backup domains',
                          style: TextStyle(
                            fontSize: AppConstants.fontM,
                            color: AppTheme.textSecondary,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                domainsAsync.when(
                  data: (domains) {
                    return SliverPadding(
                      padding: const EdgeInsets.symmetric(
                        horizontal: AppConstants.spacingL,
                      ),
                      sliver: SliverToBoxAdapter(
                        child: DomainGrid(
                          domains: domains,
                          onDomainTap: (domainId) {
                            context.go('/vault/$domainId');
                          },
                        ),
                      ),
                    );
                  },
                  loading: () {
                    return SliverToBoxAdapter(
                      child: Padding(
                        padding: const EdgeInsets.symmetric(
                          vertical: AppConstants.spacingL,
                        ),
                        child: const CupertinoActivityIndicator(),
                      ),
                    );
                  },
                  error: (err, stack) {
                    return SliverToBoxAdapter(
                      child: Padding(
                        padding: const EdgeInsets.symmetric(
                          vertical: AppConstants.spacingL,
                        ),
                        child: Text(
                          'Failed to load domains',
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            color: AppTheme.accentColor,
                          ),
                        ),
                      ),
                    );
                  },
                ),
                SliverPadding(
                  padding: const EdgeInsets.all(AppConstants.spacingL),
                  sliver: SliverToBoxAdapter(
                    child: GlassButton(
                      label: 'Add Domain',
                      onPressed: () {
                        // TODO: Navigate to add domain
                      },
                      minimumSize: const Size(double.infinity, 54),
                    ),
                  ),
                ),
                const SliverPadding(
                  padding: EdgeInsets.only(bottom: 80),
                ),
              ],
            ),
          ),
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: BottomGlassTabBar(
              items: [
                BottomTabBarItem(
                  icon: CupertinoIcons.home,
                  label: 'Home',
                ),
                BottomTabBarItem(
                  icon: CupertinoIcons.lock,
                  label: 'Vault',
                ),
                BottomTabBarItem(
                  icon: CupertinoIcons.gear,
                  label: 'Settings',
                ),
              ],
              currentIndex: _selectedTab,
              onTap: (index) {
                setState(() {
                  _selectedTab = index;
                });
                switch (index) {
                  case 0:
                    context.go('/dashboard');
                    break;
                  case 1:
                    context.go('/vault');
                    break;
                  case 2:
                    // TODO: Navigate to settings
                    break;
                }
              },
            ),
          ),
        ],
      ),
    );
  }
}
