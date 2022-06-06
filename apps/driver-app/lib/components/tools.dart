import 'package:flutter/material.dart';

// ignore: camel_case_types
class tools {

  static String editText(String ch){
    var ch2 = ch.substring(0, 1).toUpperCase() + ch.substring(1);
    return ch2;
  }

  static Widget HR( String text){
    return
      Row(children: <Widget>[
        Expanded(
          child: Container(
              margin: const EdgeInsets.only(left: 10.0, right: 20.0),
              child: const Divider(
                color: Colors.black,
                height: 36,
              )),
        ),
        Text( text ),
        Expanded(
          child: Container(
              margin: const EdgeInsets.only(left: 20.0, right: 10.0),
              child: const Divider(
                color: Colors.black,
                height: 36,
              )),
        ),
      ]);
  }
}