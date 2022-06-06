// ignore_for_file: file_names

import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';

class Bottons {
  // ignore: non_constant_identifier_names
  static Widget Button({
    required title,
    required primaryColor,
    required secondaryColor,
    required onClick,
    double? height,
    double? width,
    double? size = 20,
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
          child: AutoSizeText(
            title,
            style: TextStyle(
                color: Colors.white,
                fontSize: size,
                fontWeight: FontWeight.bold),
            maxLines: 1,
          ),
        ),
        onTap: onClick);
  }

  static Widget ButtonIcon({
    required title,
    required primaryColor,
    required secondaryColor,
    required onClick,
    double? height = 50,
    double? width,
    double? size = 20,
  }) {
    return InkWell(
        child: Container(
          height: height,
          width: width,
          child: Center(child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Container(
                width: width! - 100,
                padding: const EdgeInsets.only(
                  left: 20, right: 20
                ),
                child: Center(child: Text("Click here if you want to see the road!",style: TextStyle(fontWeight: FontWeight.bold,color: Colors.grey[800]),)),
              ),
              Container(
                height: 50,
                width: 50,
                child: Container(
                    child: Icon(
                      Icons.location_on,
                      color: Colors.white,
                    ),
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.bottomRight,
                      end: Alignment.topLeft,
                      colors: [
                        primaryColor,
                        secondaryColor,
                      ],
                    ),

                      borderRadius: BorderRadius.only(
                        topRight: Radius.circular(12),
                        bottomRight: Radius.circular(12),
                      )),
                  ),
                ),
              ],
            )
          ),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(12),
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
        ),
        onTap: onClick);
  }
}
