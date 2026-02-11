import 'package:flutter/cupertino.dart';
import '../config/theme.dart';
import '../core/constants/app_constants.dart';
import 'glass_container.dart';

class GlassButton extends StatefulWidget {
  final String label;
  final VoidCallback onPressed;
  final bool isLoading;
  final bool isDisabled;
  final IconData? icon;
  final Size? minimumSize;
  final Color? backgroundColor;
  final Color? foregroundColor;
  final double borderRadius;

  const GlassButton({
    Key? key,
    required this.label,
    required this.onPressed,
    this.isLoading = false,
    this.isDisabled = false,
    this.icon,
    this.minimumSize,
    this.backgroundColor,
    this.foregroundColor,
    this.borderRadius = AppConstants.glassRadius,
  }) : super(key: key);

  @override
  State<GlassButton> createState() => _GlassButtonState();
}

class _GlassButtonState extends State<GlassButton>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: AppConstants.shortAnimationDuration,
      vsync: this,
    );
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: widget.isDisabled || widget.isLoading
          ? null
          : (_) {
              _animationController.forward();
            },
      onTapUp: widget.isDisabled || widget.isLoading
          ? null
          : (_) {
              _animationController.reverse();
              widget.onPressed();
            },
      onTapCancel: widget.isDisabled || widget.isLoading
          ? null
          : () {
              _animationController.reverse();
            },
      child: ScaleTransition(
        scale: Tween<double>(begin: 1.0, end: 0.95)
            .animate(_animationController),
        child: GlassContainer(
          width: widget.minimumSize?.width,
          height: widget.minimumSize?.height ?? 48,
          backgroundColor: widget.backgroundColor ?? AppTheme.primaryColor,
          borderRadius: widget.borderRadius,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
          opacity: widget.isDisabled ? 0.5 : AppConstants.glassOpacity,
          child: Center(
            child: widget.isLoading
                ? const CupertinoActivityIndicator(
                    color: CupertinoColors.white,
                  )
                : Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      if (widget.icon != null) ...[
                        Icon(
                          widget.icon,
                          color: widget.foregroundColor ??
                              CupertinoColors.white,
                        ),
                        const SizedBox(width: 8),
                      ],
                      Text(
                        widget.label,
                        style: TextStyle(
                          color: widget.foregroundColor ??
                              CupertinoColors.white,
                          fontWeight: FontWeight.w600,
                          fontSize: 16,
                        ),
                      ),
                    ],
                  ),
          ),
        ),
      ),
    );
  }
}
