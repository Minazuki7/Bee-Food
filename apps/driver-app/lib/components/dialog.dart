import 'package:flutter/material.dart';

import '../const/Colors.dart';

class Dialogs{
  static Future Dialog({
    required BuildContext context,
    icon,
    text,
    onClick,
  }) {
    return showDialog(
        context: context,
        builder: (context) {
          return AlertDialog(
            content: SizedBox(
              height: 144,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [

                  Center(child: Icon(icon, color: colors.Yellow,size: 30,)),
                  Text(text),
                  // ignore: deprecated_member_use
                  RaisedButton(child:const Text("Ok",style: TextStyle(color: Colors.white),),color: colors.MainColor,onPressed: onClick
                  ),
                ],
              ),
            ),
          );
        });
  }
}
