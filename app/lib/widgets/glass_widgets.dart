import 'package:flutter/cupertino.dart';
import '../config/theme.dart';
import '../core/constants/app_constants.dart';

class GlassProgressBar extends StatelessWidget {
  final double progress; // 0.0 to 1.0
  final Color? color;
  final double height;

  const GlassProgressBar({
    Key? key,
    required this.progress,
    this.color,
    this.height = 4.0,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(height),
      child: Container(
        height: height,
        color: AppTheme.getBorderColor(context),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(height),
          child: LinearProgressIndicator(
            value: progress,
            backgroundColor: CupertinoColors.transparent,
            valueColor: AlwaysStoppedAnimation<Color>(
              color ?? AppTheme.primaryColor,
            ),
          ),
        ),
      ),
    );
  }
}

class AnimatedGlassCounter extends StatefulWidget {
  final int value;
  final Color? textColor;
  final double fontSize;

  const AnimatedGlassCounter({
    Key? key,
    required this.value,
    this.textColor,
    this.fontSize = AppConstants.fontXL,
  }) : super(key: key);

  @override
  State<AnimatedGlassCounter> createState() => _AnimatedGlassCounterState();
}

class _AnimatedGlassCounterState extends State<AnimatedGlassCounter>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: AppConstants.shortAnimationDuration,
      vsync: this,
    );
    _animation =
        Tween<double>(begin: 0, end: 1).animate(_animationController);
  }

  @override
  void didUpdateWidget(AnimatedGlassCounter oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.value != oldWidget.value) {
      _animationController.forward(from: 0);
    }
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return ScaleTransition(
      scale: _animation,
      child: Text(
        '${widget.value}',
        style: TextStyle(
          fontSize: widget.fontSize,
          fontWeight: FontWeight.w600,
          color: widget.textColor ?? AppTheme.primaryColor,
        ),
      ),
    );
  }
}
