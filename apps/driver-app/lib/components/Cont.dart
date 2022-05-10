// ignore_for_file: file_names

import 'package:flutter/material.dart';
import 'package:auto_size_text/auto_size_text.dart';

class Cont {
  // ignore: non_constant_identifier_names
  static Widget InformationContainer({
    String title = "",
    String info = "",
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
          AutoSizeText(
            info,
            style: const TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 20.0,
              color: Colors.black,
            ),  maxLines: 3,

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
        borderRadius: const BorderRadius.only(
          topRight: Radius.circular(30),
          topLeft: Radius.circular(30),
        ),
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
