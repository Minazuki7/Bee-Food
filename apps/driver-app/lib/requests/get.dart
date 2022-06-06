
import 'package:shared_preferences/shared_preferences.dart';

class Get{

  static late String? id;
  static late String? phone;
  static Future<void> getLoginNeeds() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    id = prefs.getString('id');
    phone = prefs.getString('phone');
  }
}