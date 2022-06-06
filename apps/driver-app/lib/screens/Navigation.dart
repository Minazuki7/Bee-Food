// ignore_for_file: file_names

import 'package:flutter/material.dart';
import 'package:driver_app/const/Colors.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'LoadingScreen.dart';
import 'Profile.dart';

class Navigation extends StatefulWidget {
  const Navigation({Key? key}) : super(key: key);


  @override
  _NavigationState createState() => _NavigationState();
}

class _NavigationState extends State<Navigation> {

  final padding = const EdgeInsets.symmetric(horizontal: 20);
  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Material(
        color: colors.MainColor,
        child: ListView(
          padding: padding,
          children: [
            const SizedBox(height: 70),
            buildHeader(name: "User Name", email: "Useremail@123.xyz"),
            const SizedBox(height: 48),
            buildMenuItem(
              text: 'Profile',
              icon: Icons.person,
              onClick: () {
                Navigator.push(context,
                    MaterialPageRoute(builder: (context) => Profile()));
              },
            ),
            const SizedBox(height: 16),
            buildMenuItem(
              text: 'Settings',
              icon: Icons.settings,
              onClick: () {},
            ),
            const SizedBox(height: 16),
            buildMenuItem(
              text: 'Language',
              icon: Icons.language,
              onClick: () {
                openDialog(context);
              },
            ),
            const SizedBox(height: 16),
            buildMenuItem(
              text: 'Logout',
              icon: Icons.logout,
              onClick: () async {
                final SharedPreferences prefs = await SharedPreferences.getInstance();
                await prefs.remove('id');
                Navigator.push(context,
                    MaterialPageRoute(builder: (context) => const LoadingScreen()));
              },
            ),
          ],
        ),
      ),
    );
  }
}

Widget buildHeader({
  required String name,
  required String email,
}) =>
    InkWell(
      onTap: () {},
      child: Row(
        children: [
          const CircleAvatar(
            radius: 24,
            backgroundColor: colors.MainColor,
            child: Icon(Icons.person, color: Colors.white),
          ),
          const SizedBox(width: 20),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                name,
                style: const TextStyle(
                    fontSize: 20,
                    fontFamily: 'CircularStd',
                    color: Colors.white),
              ),
              const SizedBox(height: 4),
              Text(
                email,
                style: const TextStyle(
                    fontSize: 14,
                    fontFamily: 'CircularStd',
                    color: Colors.white),
              )
            ],
          ),
        ],
      ),
    );

Widget buildMenuItem({
  required String text,
  required IconData icon,
  VoidCallback? onClick,
}) {
  const color = Colors.white;

  return ListTile(
    leading: Icon(icon, color: color),
    title: Text(text,
        style: const TextStyle(
            color: Colors.white, fontFamily: 'CircularStd', fontSize: 18)),
    onTap: onClick,
  );
}

openDialog(BuildContext context) {
  return showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          content: SizedBox(
            height: 144,
            child: Column(
              children: [
                // ignore: deprecated_member_use
                FlatButton(
                  child: const Text(
                    '🇺🇸 English',
                    style: TextStyle(fontSize: 22),
                  ),
                  onPressed: () {
                    /// Get.updateLocale(const Locale('en', 'US'));
                    Navigator.of(context).pop();
                  },
                ),
                // ignore: deprecated_member_use
                FlatButton(
                  child: const Text(
                    '🇹🇳 العربية',
                    style: TextStyle(fontSize: 22),
                  ),
                  onPressed: () {
                    /// Get.updateLocale(const Locale('ar', 'TN'));
                    Navigator.of(context).pop();
                  },
                ),
                // ignore: deprecated_member_use
                FlatButton(
                  child: const Text(
                    '🇫🇷 Français',
                    style: TextStyle(fontSize: 22),
                  ),
                  onPressed: () {
                    /// Get.updateLocale(const Locale('fr', 'FR'));
                    Navigator.of(context).pop();
                  },
                ),
              ],
            ),
          ),
        );
      });
}
