import 'package:flutter/material.dart';
import 'package:driver_app/const/Colors.dart';

class textField{
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
        padding: EdgeInsets.only(right: 15.0, left: 15.0),
        decoration: BoxDecoration(
            color: Colors.white,
            boxShadow: [
              BoxShadow(
                color: Colors.grey.withOpacity(0.5),
                spreadRadius: 1,
                blurRadius: 8,
                offset: Offset(4, 6),
              ),
            ],
            borderRadius: BorderRadius.all(Radius.circular(24))),
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
            labelStyle: TextStyle(
              color: Colors.grey,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
      );
  }

}