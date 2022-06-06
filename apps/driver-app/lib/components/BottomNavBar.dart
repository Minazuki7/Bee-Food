// ignore_for_file: file_names

import 'package:driver_app/screens/Profile.dart';
import 'package:flutter/material.dart';
import 'package:driver_app/const/Colors.dart';

import '../screens/MyOrders.dart';
import '../screens/mainPage.dart';

// ignore: non_constant_identifier_names
Widget Bottom({
  required BuildContext context,
  // ignore: non_constant_identifier_names
   First = Colors.grey,
  // ignore: non_constant_identifier_names
   Third = Colors.grey,
}) {
  return Container(
    padding: const EdgeInsets.only(left: 40, right: 40, bottom: 5),
    height: 70,
    decoration: const BoxDecoration(
      color: Colors.white,
      boxShadow: [
        BoxShadow(
          offset: Offset(0, 20),
          blurRadius: 35,
          color: Colors.grey,
        ),
      ],
    ),
    child: Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        IconButton(
            onPressed: () {
              Navigator.push(context,
                  MaterialPageRoute(builder: (context) => Profile()));
            },
            icon: Icon(Icons.person, size: 30, color: First)),
        Container(
          height: 70,
          width: 70,
          child: IconButton(
              onPressed: () {
                Navigator.push(context,
                    MaterialPageRoute(builder: (context) => const MainPage()));
              },
              icon: const Icon(Icons.home, size: 30, color: Colors.white)),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(180),
              gradient: const LinearGradient(
              begin: Alignment.bottomRight,
              end: Alignment.topLeft,
              colors: [
                colors.MainColor,
                colors.SecondaryColor,
              ],
            ),
          ),
        ),
        IconButton(
            onPressed: () {
              Navigator.push(context, MaterialPageRoute(builder: (context) => const MyOrders()));
            },
            icon: Icon(Icons.delivery_dining, size: 30, color: Third)),
      ],
    ),
  );
}
