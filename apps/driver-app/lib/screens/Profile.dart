import 'package:flutter/material.dart';
import 'package:flutter_switch/flutter_switch.dart';

import '../components/BottomNavBar.dart';
import 'package:driver_app/const/Colors.dart';

import 'login.dart';

class Profile extends StatefulWidget {
  const Profile({Key? key}) : super(key: key);

  @override
  State<Profile> createState() => _ProfileState();
}

class _ProfileState extends State<Profile> {
  bool status = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: Builder(
          builder: (context) => Padding(
            padding: const EdgeInsets.only(left: 20, top: 20),
            child: Container(
              height: 45,
              width: 45,
              decoration: BoxDecoration(
                color: colors.MainColor,
                borderRadius: BorderRadius.circular(30),
              ),
              child: Center(
                child: IconButton(
                  icon: const Icon(
                    Icons.logout,
                    size: 20,
                    color: Colors.white,
                  ),
                  onPressed: () {Navigator.pushReplacement(context, MaterialPageRoute(builder: (context)=> const Login()));},
                ),
              ),
            ),
          ),
        ),
        actions: [
          Padding(
            padding: const EdgeInsets.only(top: 20, right: 20),
            child: FlutterSwitch(
              width: 60,
              value: status,
              activeColor: colors.MainColor,
              onToggle: (val) {
                setState(() {
                  status = val;
                });
              },
            ),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.only(top: 8),
        child: Column(
          children: [
            Center(
              child: Text("Profile",
                style: TextStyle(
                  fontFamily: 'CircularStd',
                  fontWeight: FontWeight.bold,
                  fontSize: 30.0,
                  color:colors.MainColor,
                ),
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: Bottom(
          context: context,
          First: Colors.grey,
          Second: colors.MainColor,
          Third: Colors.grey),
    );
  }
}
