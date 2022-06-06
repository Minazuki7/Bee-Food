// ignore_for_file: file_names

import 'package:flutter/material.dart';
import 'package:driver_app/const/Colors.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'login.dart';
import 'mainPage.dart';

class LoadingScreen extends StatefulWidget {
  const LoadingScreen({Key? key}) : super(key: key);

  @override
  _LoadingScreenState createState() => _LoadingScreenState();
}

class _LoadingScreenState extends State<LoadingScreen> {

  late final String? id;
  Future<void> getLoginNeeds() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    id = prefs.getString('id');
  }

  @override
  void initState() {
    super.initState();
    getLoginNeeds();
    startup();
  }

  startup() async {
    await Future.delayed(const Duration(seconds: 6), () {});
    Navigator.pushReplacement(
        context, MaterialPageRoute(builder: (context) => const Login()));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.bottomRight,
            end: Alignment.topLeft,
            colors: [colors.MainColor, colors.SecondaryColor,],
          ),
        ),

        child: Column(
          children: [
            const SizedBox(height: 30),
            Expanded(
              child: Container(padding:const EdgeInsets.all(75),child: Image.asset("assets/logo.png")),
            ),
            const Expanded(child: Center(child: CircularProgressIndicator(color: Colors.white)),),
          ],
        ),
      ),
    );
  }
}
