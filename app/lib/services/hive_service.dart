import 'package:hive_flutter/hive_flutter.dart';

class HiveService {
  static const String domainsBoxName = 'domains';
  static const String codesBoxName = 'codes';
  static const String userBoxName = 'user';
  static const String settingsBoxName = 'settings';

  static Future<void> initializeBoxes() async {
    await Hive.openBox(domainsBoxName);
    await Hive.openBox(codesBoxName);
    await Hive.openBox(userBoxName);
    await Hive.openBox(settingsBoxName);
  }

  static Box getDomainsBox() {
    return Hive.box(domainsBoxName);
  }

  static Box getCodesBox() {
    return Hive.box(codesBoxName);
  }

  static Box getUserBox() {
    return Hive.box(userBoxName);
  }

  static Box getSettingsBox() {
    return Hive.box(settingsBoxName);
  }

  static Future<void> clearAll() async {
    await Hive.box(domainsBoxName).clear();
    await Hive.box(codesBoxName).clear();
    await Hive.box(userBoxName).clear();
    await Hive.box(settingsBoxName).clear();
  }
}
