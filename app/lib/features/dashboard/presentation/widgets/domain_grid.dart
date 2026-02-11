import 'package:flutter/cupertino.dart';
import '../../../../config/theme.dart';
import '../../../../core/constants/app_constants.dart';
import '../../../../widgets/glass_container.dart';

class DomainGrid extends StatelessWidget {
  final List<Map<String, dynamic>> domains;
  final Function(String) onDomainTap;
  final bool isLoading;

  const DomainGrid({
    Key? key,
    required this.domains,
    required this.onDomainTap,
    this.isLoading = false,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    if (isLoading) {
      return const Center(child: CupertinoActivityIndicator());
    }

    if (domains.isEmpty) {
      return Center(
        child: Text(
          'No domains yet',
          style: TextStyle(
            color: AppTheme.textSecondary,
            fontSize: AppConstants.fontM,
          ),
        ),
      );
    }

    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        crossAxisSpacing: AppConstants.spacingM,
        mainAxisSpacing: AppConstants.spacingM,
        childAspectRatio: 1.2,
      ),
      itemCount: domains.length,
      itemBuilder: (context, index) {
        final domain = domains[index];
        final name = domain['name'] as String? ?? 'Unknown';
        final codesCount = domain['codesCount'] as int? ?? 0;
        final id = domain['id'] as String;

        return GestureDetector(
          onTap: () => onDomainTap(id),
          child: GlassContainer(
            borderRadius: AppConstants.radiusL,
            padding: const EdgeInsets.all(AppConstants.spacingM),
            opacity: 0.1,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  name,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                    fontSize: AppConstants.fontM,
                    fontWeight: FontWeight.w600,
                    color: AppTheme.getTextColor(context),
                  ),
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 8,
                        vertical: 4,
                      ),
                      decoration: BoxDecoration(
                        color: AppTheme.primaryColor.withOpacity(0.2),
                        borderRadius: BorderRadius.circular(
                          AppConstants.radiusS,
                        ),
                      ),
                      child: Text(
                        '$codesCount codes',
                        style: const TextStyle(
                          fontSize: AppConstants.fontXS,
                          color: AppTheme.primaryColor,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                    Icon(
                      CupertinoIcons.chevron_right,
                      color: AppTheme.primaryColor,
                      size: 18,
                    ),
                  ],
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
