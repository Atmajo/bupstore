import 'package:flutter/cupertino.dart';
import 'dart:ui' as ui;
import '../config/theme.dart';
import '../core/constants/app_constants.dart';

class GlassContainer extends StatelessWidget {
  final Widget child;
  final double? width;
  final double? height;
  final double blur;
  final double opacity;
  final double borderRadius;
  final EdgeInsets padding;
  final EdgeInsets margin;
  final Color? backgroundColor;
  final Border? border;
  final BoxShadow? shadow;
  final Gradient? gradient;

  const GlassContainer({
    Key? key,
    required this.child,
    this.width,
    this.height,
    this.blur = AppConstants.glassBlurSigma,
    this.opacity = AppConstants.glassOpacity,
    this.borderRadius = AppConstants.glassRadius,
    this.padding = const EdgeInsets.all(16),
    this.margin = const EdgeInsets.all(0),
    this.backgroundColor,
    this.border,
    this.shadow,
    this.gradient,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final surfaceColor = AppTheme.getSurfaceColor(context);
    final finalBackgroundColor = backgroundColor ?? surfaceColor.withOpacity(opacity);

    return Container(
      width: width,
      height: height,
      margin: margin,
      decoration: BoxDecoration(
        color: finalBackgroundColor,
        borderRadius: BorderRadius.circular(borderRadius),
        border: border,
        boxShadow: shadow != null ? [shadow!] : null,
        gradient: gradient,
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(borderRadius),
        child: BackdropFilter(
          filter: ui.ImageFilter.blur(sigmaX: blur, sigmaY: blur),
          child: Container(
            padding: padding,
            child: child,
          ),
        ),
      ),
    );
  }
}
