import 'package:flutter/material.dart';
import 'package:flutter_switch/flutter_switch.dart';
import 'package:driver_app/const/Colors.dart';

class NavBars {

  static PreferredSizeWidget NavBar({
    status = false,
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
              Icons.menu,
              size: 40,
            ),
            color: Colors.white,
            onPressed: () {
              Scaffold.of(context).openDrawer();
            },
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
            onToggle: onClick,
          ),
        ),
      ],
    );
  }

}
