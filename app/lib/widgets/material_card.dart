import 'package:flutter/material.dart';
import '../config/theme.dart';
import '../core/constants/app_constants.dart';

class MaterialCard extends StatelessWidget {
  final Widget child;
  final double? width;
  final double? height;
  final EdgeInsets padding;
  final EdgeInsets margin;
  final Color? backgroundColor;
  final BoxBorder? border;
  final List<BoxShadow>? shadows;
  final double borderRadius;
  final VoidCallback? onTap;

  const MaterialCard({
    Key? key,
    required this.child,
    this.width,
    this.height,
    this.padding = const EdgeInsets.all(16),
    this.margin = const EdgeInsets.all(0),
    this.backgroundColor,
    this.border,
    this.shadows,
    this.borderRadius = AppConstants.radiusL,
    this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final surfaceColor = AppTheme.getSurfaceColor(context);
    final finalBackgroundColor = backgroundColor ?? surfaceColor;

    return Container(
      width: width,
      height: height,
      margin: margin,
      decoration: BoxDecoration(
        color: finalBackgroundColor,
        borderRadius: BorderRadius.circular(borderRadius),
        border: border,
        boxShadow: shadows ??
            [
              BoxShadow(
                color: Colors.black.withOpacity(0.05),
                blurRadius: 8,
                offset: const Offset(0, 2),
              ),
            ],
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: onTap,
          borderRadius: BorderRadius.circular(borderRadius),
          child: Padding(
            padding: padding,
            child: child,
          ),
        ),
      ),
    );
  }
}
