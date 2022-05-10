// ignore_for_file: file_names

import 'package:flutter/material.dart';
import 'package:driver_app/const/Colors.dart';

// ignore: camel_case_types
class textField{
  // ignore: non_constant_identifier_names
  static Widget TextZone({
    required IconData? icon,
    required controller,
    required title,
    obscureText= false,
    onChanged,
    validator,
    keyboardType,
  }){
    return
      Container(
        padding: const EdgeInsets.only(right: 15.0, left: 15.0),
        decoration: BoxDecoration(
            color: Colors.white,
            boxShadow: [
              BoxShadow(
                color: Colors.grey.withOpacity(0.5),
                spreadRadius: 1,
                blurRadius: 8,
                offset: const Offset(4, 6),
              ),
            ],
            borderRadius: const BorderRadius.all(Radius.circular(24))),
        child: TextFormField(
          onChanged: onChanged,
          validator: validator,
          controller: controller,
          keyboardType: keyboardType,
          cursorColor: colors.MainColor,
          obscureText: obscureText,
          decoration: InputDecoration(
            border: InputBorder.none,
            hintText: title,
            prefixIcon: Icon(icon, color: colors.MainColor),
            labelStyle: const TextStyle(
              color: Colors.grey,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
      );
  }

}