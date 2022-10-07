
import 'package:shared_preferences/shared_preferences.dart';

class Get{

  static String? id;
  static String? phone;
  static Future<void> getLoginNeeds() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    id = prefs.getString('id');
    phone = prefs.getString('phone');
  }
}