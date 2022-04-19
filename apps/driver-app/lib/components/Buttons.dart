import 'package:flutter/material.dart';


class Bottons {
  // ignore: non_constant_identifier_names
  static Widget Button ({
    required title,
    required primaryColor,
    required secondaryColor,
    required onClick,
    double? height,
    double? width,
    double? size=20,
  }) {
    return InkWell(
        child: Container(
          height: height,
          width: width,
          padding: const EdgeInsets.all(15),
          alignment: Alignment.center,
          decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.bottomRight,
                end: Alignment.topLeft,
                colors: [
                  primaryColor,
                  secondaryColor,
                ],
              ),
              borderRadius: BorderRadius.circular(30)),
          child: Text(
            title,
            style: TextStyle(
                color: Colors.white, fontSize: size, fontWeight: FontWeight.bold),
          ),
        ),
        onTap:
        onClick
    );
  }
}
