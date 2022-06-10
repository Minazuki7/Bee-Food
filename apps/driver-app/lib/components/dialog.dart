import 'package:flutter/material.dart';

import '../const/Colors.dart';

class Dialogs{
  static Future Dialog({
    required BuildContext context,
    icon,
    color = colors.Yellow,
    text,
    double size = 30,
    text2 = "Try Again",
    onClick,
  }) {
    return showDialog(
        context: context,
        builder: (context) {
          return AlertDialog(
            content: SizedBox(
              height: 160,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [

                  Center(child: Icon(icon, color: color,size: size,)),
                  Container(child: Center(child: Text(text))),
                  // ignore: deprecated_member_use
                  RaisedButton(child: Text(text2,style: TextStyle(color: Colors.white),),color: colors.MainColor,onPressed: onClick
                  ),
                ],
              ),
            ),
          );
        });
  }
}
