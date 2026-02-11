import 'package:flutter/cupertino.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../../config/theme.dart';
import '../../../../core/constants/app_constants.dart';
import '../../../../widgets/glass_button.dart';
import '../providers.dart';
import '../widgets/code_card.dart';

class VaultDetailPage extends ConsumerStatefulWidget {
  final String domainId;

  const VaultDetailPage({
    Key? key,
    required this.domainId,
  }) : super(key: key);

  @override
  ConsumerState<VaultDetailPage> createState() => _VaultDetailPageState();
}

class _VaultDetailPageState extends ConsumerState<VaultDetailPage> {
  @override
  Widget build(BuildContext context) {
    final codesAsync = ref.watch(getVaultCodesFuture(widget.domainId));

    return CupertinoPageScaffold(
      backgroundColor: AppTheme.getBackgroundColor(context),
      navigationBar: CupertinoNavigationBar(
        leading: GestureDetector(
          onTap: () => context.go('/vault'),
          child: Icon(
            CupertinoIcons.back,
            color: AppTheme.primaryColor,
          ),
        ),
        middle: Text(
          'Vault Details',
          style: TextStyle(
            color: AppTheme.getTextColor(context),
          ),
        ),
      ),
      child: SafeArea(
        child: CustomScrollView(
          slivers: [
            codesAsync.when(
              data: (codes) {
                if (codes.isEmpty) {
                  return SliverFillRemaining(
                    child: Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(
                            CupertinoIcons.doc,
                            size: 64,
                            color: AppTheme.textSecondary,
                          ),
                          const SizedBox(height: 16),
                          Text(
                            'No codes',
                            style: TextStyle(
                              fontSize: AppConstants.fontL,
                              fontWeight: FontWeight.w600,
                              color: AppTheme
                                  .getTextColor(context),
                            ),
                          ),
                          const SizedBox(height: 8),
                          Text(
                            'No backup codes found',
                            style: TextStyle(
                              fontSize: AppConstants.fontM,
                              color: AppTheme.textSecondary,
                            ),
                          ),
                        ],
                      ),
                    ),
                  );
                }

                return SliverPadding(
                  padding:
                      const EdgeInsets.all(AppConstants.spacingL),
                  sliver: SliverList(
                    delegate: SliverChildBuilderDelegate(
                      (context, index) {
                        final code = codes[index];
                        final codeValue =
                            code['code'] as String? ?? '';
                        final domain =
                            code['domain'] as String? ?? '';
                        final label =
                            code['label'] as String? ?? '';

                        return Padding(
                          padding: const EdgeInsets.only(
                            bottom: AppConstants.spacingM,
                          ),
                          child: CodeCard(
                            code: codeValue,
                            domain: domain,
                            label: label,
                          ),
                        );
                      },
                      childCount: codes.length,
                    ),
                  ),
                );
              },
              loading: () {
                return SliverFillRemaining(
                  child: Center(
                    child: const CupertinoActivityIndicator(),
                  ),
                );
              },
              error: (err, stack) {
                return SliverFillRemaining(
                  child: Center(
                    child: Text(
                      'Failed to load codes',
                      style: TextStyle(
                        color: AppTheme.accentColor,
                      ),
                    ),
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
