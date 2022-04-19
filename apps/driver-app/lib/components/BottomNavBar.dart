import 'package:flutter/material.dart';

import '../screens/mainPage.dart';

// ignore: non_constant_identifier_names
Widget Bottom({
  required BuildContext context,
  // ignore: non_constant_identifier_names
  required First,
  // ignore: non_constant_identifier_names
  required Second,
  // ignore: non_constant_identifier_names
  required Third,
}) {
  return Container(
    padding: const EdgeInsets.only(left: 40, right: 40, bottom: 5),
    height: 60,
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
            onPressed: () {Navigator.push(context, MaterialPageRoute(builder: (context)=> const MainPage()));},
            icon: Icon(Icons.map_outlined, size: 30, color: First)),
        IconButton(
            onPressed: () {Navigator.push(context, MaterialPageRoute(builder: (context)=> const MainPage()));},
            icon: Icon(Icons.home, size: 30, color: Second)),
        IconButton(
            onPressed: () {Navigator.push(context, MaterialPageRoute(builder: (context)=> const MainPage()));},
            icon: Icon(Icons.notifications, size: 30, color: Third)),
      ],
    ),
  );
}
