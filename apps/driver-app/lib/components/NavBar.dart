import 'package:flutter/material.dart';
import 'package:flutter_switch/flutter_switch.dart';
import 'package:driver_app/const/Colors.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../screens/LoadingScreen.dart';

class NavBars {

  static PreferredSizeWidget NavBar({
    status = false,
    textStatus = "offline",
    color: Colors.white,
    onClick
  }) {
    return AppBar(
      backgroundColor: Colors.transparent,
      elevation: 0,
      leading: Builder(
        builder: (context) => Padding(
          padding: const EdgeInsets.only(left: 15, top: 10),
          child: IconButton(
            icon: const Icon(
              Icons.logout,
              size: 40,
            ),
            color: color,
            onPressed: () async {
                final SharedPreferences prefs = await SharedPreferences.getInstance();
                await prefs.remove('id');
                Navigator.push(context,
                MaterialPageRoute(builder: (context) => const LoadingScreen()));
            },
          ),
        ),
      ),
      actions: [
        Container(
          padding: const EdgeInsets.only(top: 20, right: 20),
          child: Row(
            children: [
              Text(
                  "${textStatus} ",style: TextStyle(color: color,),),
              FlutterSwitch(
                width: 60,
                value: status,
                activeColor: colors.MainColor,
                onToggle: onClick,
              ),
            ],
          )
        ),
      ],
    );
  }

}
