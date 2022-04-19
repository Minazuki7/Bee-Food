import 'package:flutter/material.dart';

class Cont {
  // ignore: non_constant_identifier_names
  static Widget InformationContainer({
    String title = "",
    String info = "",
    String link = "",
    var Tap,
    required double width,
    required double height,
    required Icon icon,
  }) {
    return Container(
      padding: const EdgeInsets.only(left: 20, top: 25, right: 20),
      margin: const EdgeInsets.only(right: 10),
      width: width,
      height: height,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              icon,
              const SizedBox(width: 5),
              Text(
                title,
                style: const TextStyle(
                  fontFamily: 'CircularStd',
                  fontSize: 25.0,
                  color: Colors.black,
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          Text(
            info,
            style: const TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 35.0,
              color: Colors.black,
            ),
          ),
          const SizedBox(height: 50),
          InkWell(
            child: Container(
              alignment: Alignment.bottomRight,
              child: Text(
                link,
                style: const TextStyle(
                  fontSize: 15.0,
                  color: Colors.blue,
                ),
              ),
            ),
            onTap: () {
              Tap;
            },
          ),
        ],
      ),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(30),
        color: Colors.white,
        boxShadow:[
          BoxShadow(
            color: Colors.grey.withOpacity(0.3),
            spreadRadius: 5,
            blurRadius: 7,
            offset: Offset(0, 2),
          ),
        ],
      ),
    );
  }

  // ignore: non_constant_identifier_names
  static Widget ContentContainer({
    String title = "",
    required double width,
    required double height,
    required Icon icon,
    required content,
  }) {
    return Container(
      padding: const EdgeInsets.only(left: 20, top: 25, right: 20),
      margin: const EdgeInsets.only(right: 10,left: 10),
      width: width,
      height: height,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              icon,
              const SizedBox(width: 5),
              Text(
                title,
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 35.0,
                  color: Colors.black,
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          Container(child: content),
        ],
      ),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(30),
        color: Colors.white,
        boxShadow:[
          BoxShadow(
            color: Colors.grey.withOpacity(0.5),
            spreadRadius: 5,
            blurRadius: 7,
            offset: Offset(0, 2),
          ),
        ],
      ),
    );
  }
}
