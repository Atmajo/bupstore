import 'package:flutter/material.dart';
import '../config/theme.dart';
import '../core/constants/app_constants.dart';
import 'material_card.dart';

class MaterialButton extends StatefulWidget {
  final String label;
  final VoidCallback onPressed;
  final bool isLoading;
  final bool isDisabled;
  final IconData? icon;
  final Size? minimumSize;
  final Color? backgroundColor;
  final Color? foregroundColor;
  final double borderRadius;

  const MaterialButton({
    Key? key,
    required this.label,
    required this.onPressed,
    this.isLoading = false,
    this.isDisabled = false,
    this.icon,
    this.minimumSize,
    this.backgroundColor,
    this.foregroundColor,
    this.borderRadius = AppConstants.radiusM,
  }) : super(key: key);

  @override
  State<MaterialButton> createState() => _MaterialButtonState();
}

class _MaterialButtonState extends State<MaterialButton>
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
    return ScaleTransition(
      scale: Tween<double>(begin: 1.0, end: 0.95)
          .animate(_animationController),
      child: ElevatedButton(
        onPressed: widget.isDisabled || widget.isLoading
            ? null
            : () {
                _animationController.forward().then((_) {
                  _animationController.reverse();
                  widget.onPressed();
                });
              },
        style: ElevatedButton.styleFrom(
          backgroundColor:
              widget.backgroundColor ?? AppTheme.primaryColor,
          foregroundColor:
              widget.foregroundColor ?? Colors.white,
          minimumSize: widget.minimumSize ?? const Size(double.infinity, 54),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(widget.borderRadius),
          ),
          opacity: widget.isDisabled ? 0.5 : 1.0,
        ),
        child: widget.isLoading
            ? const SizedBox(
                height: 24,
                width: 24,
                child: CircularProgressIndicator(
                  strokeWidth: 2,
                  valueColor:
                      AlwaysStoppedAnimation<Color>(Colors.white),
                ),
              )
            : Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  if (widget.icon != null) ...[
                    Icon(widget.icon),
                    const SizedBox(width: 8),
                  ],
                  Text(
                    widget.label,
                    style: const TextStyle(
                      fontWeight: FontWeight.w600,
                      fontSize: 16,
                    ),
                  ),
                ],
              ),
      ),
    );
  }
}
