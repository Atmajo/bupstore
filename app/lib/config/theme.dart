import 'package:flutter/cupertino.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final themeModeProvider = StateProvider<Brightness>((ref) {
  return Brightness.light;
});

class AppTheme {
  static const Color primaryColor = Color(0xFF007AFF);
  static const Color secondaryColor = Color(0xFF5AC8FA);
  static const Color accentColor = Color(0xFFFF2D55);
  
  static const Color lightBg = Color(0xFFF9F9F9);
  static const Color lightSurface = Color(0xFFFFFFFF);
  static const Color lightBorder = Color(0xFFE8E8E8);
  
  static const Color darkBg = Color(0xFF000000);
  static const Color darkSurface = Color(0xFF1C1C1E);
  static const Color darkBorder = Color(0xFF38383A);
  
  static const Color textLight = Color(0xFF000000);
  static const Color textDark = Color(0xFFFFFFFF);
  static const Color textSecondary = Color(0xFF8E8E93);

  static const CupertinoThemeData lightTheme = CupertinoThemeData(
    brightness: Brightness.light,
    primaryColor: primaryColor,
    primaryContrastingColor: Color(0xFFFFFFFF),
    barBackgroundColor: Color(0xF9F9F9FF),
    scaffoldBackgroundColor: lightBg,
    textTheme: CupertinoTextThemeData(
      textStyle: TextStyle(
        color: textLight,
        fontFamily: 'Inter',
        fontFamilyFallback: ['system'],
      ),
    ),
  );

  static const CupertinoThemeData darkTheme = CupertinoThemeData(
    brightness: Brightness.dark,
    primaryColor: primaryColor,
    primaryContrastingColor: Color(0xFF000000),
    barBackgroundColor: Color(0x1C1C1EFF),
    scaffoldBackgroundColor: darkBg,
    textTheme: CupertinoTextThemeData(
      textStyle: TextStyle(
        color: textDark,
        fontFamily: 'Inter',
        fontFamilyFallback: ['system'],
      ),
    ),
  );

  static Color getTextColor(BuildContext context) {
    final brightness = CupertinoTheme.of(context).brightness;
    return brightness == Brightness.light ? textLight : textDark;
  }

  static Color getSurfaceColor(BuildContext context) {
    final brightness = CupertinoTheme.of(context).brightness;
    return brightness == Brightness.light ? lightSurface : darkSurface;
  }

  static Color getBackgroundColor(BuildContext context) {
    final brightness = CupertinoTheme.of(context).brightness;
    return brightness == Brightness.light ? lightBg : darkBg;
  }

  static Color getBorderColor(BuildContext context) {
    final brightness = CupertinoTheme.of(context).brightness;
    return brightness == Brightness.light ? lightBorder : darkBorder;
  }
}
