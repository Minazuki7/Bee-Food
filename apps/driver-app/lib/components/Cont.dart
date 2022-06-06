// ignore_for_file: file_names

import 'package:flutter/material.dart';
import 'package:auto_size_text/auto_size_text.dart';

class Cont {
  // ignore: non_constant_identifier_names
  static Widget InformationContainer({
      title,
      info,
      width,
      height,
      icon,
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
          AutoSizeText(
            info,
            style: const TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 20.0,
              color: Colors.black,
            ),
            maxLines: 3,
          ),
        ],
      ),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(30),
        color: Colors.white,
        boxShadow: const [
          BoxShadow(
            color: Color.fromRGBO(99, 99, 99, 0.2),
            spreadRadius: 1,
            blurRadius: 8,
            offset: Offset(0, 0),
          ),
        ],
      ),
    );
  }

  // ignore: non_constant_identifier_names
  static Widget ContentContainer({
    padding,
    required double width,
    required double height,
    required content,
  }) {
    return Container(
      padding: padding,
      margin: const EdgeInsets.all(10),
      width: width,
      height: height,
      child:
          Container(child: content),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(30),
        color: Colors.white,
        boxShadow: const [
          BoxShadow(
            color: Color.fromRGBO(99, 99, 99, 0.2),
            spreadRadius: 1,
            blurRadius: 8,
            offset: Offset(0, 0),
          ),
        ],
      ),
    );
  }
}
