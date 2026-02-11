import 'package:flutter/cupertino.dart';
import '../config/theme.dart';
import '../core/constants/app_constants.dart';
import 'glass_container.dart';

class BottomGlassTabBar extends StatelessWidget {
  final List<BottomTabBarItem> items;
  final int currentIndex;
  final ValueChanged<int> onTap;

  const BottomGlassTabBar({
    Key? key,
    required this.items,
    required this.currentIndex,
    required this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final brightness = CupertinoTheme.of(context).brightness;
    final isDark = brightness == Brightness.dark;

    return Positioned(
      left: AppConstants.spacingM,
      right: AppConstants.spacingM,
      bottom: AppConstants.spacingM,
      child: GlassContainer(
        borderRadius: AppConstants.glassRadius,
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 12),
        opacity: isDark ? 0.2 : 0.1,
        backgroundColor: isDark
            ? CupertinoColors.darkBackgroundGray
            : CupertinoColors.white,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: List.generate(
            items.length,
            (index) => GestureDetector(
              onTap: () => onTap(index),
              child: _TabBarItemWidget(
                item: items[index],
                isActive: index == currentIndex,
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _TabBarItemWidget extends StatelessWidget {
  final BottomTabBarItem item;
  final bool isActive;

  const _TabBarItemWidget({
    required this.item,
    required this.isActive,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(
          item.icon,
          color: isActive
              ? AppTheme.primaryColor
              : AppTheme.textSecondary,
        ),
        const SizedBox(height: 4),
        Text(
          item.label,
          style: TextStyle(
            fontSize: 10,
            color: isActive
                ? AppTheme.primaryColor
                : AppTheme.textSecondary,
            fontWeight: isActive ? FontWeight.w600 : FontWeight.w400,
          ),
        ),
      ],
    );
  }
}

class BottomTabBarItem {
  final IconData icon;
  final String label;

  BottomTabBarItem({
    required this.icon,
    required this.label,
  });
}
