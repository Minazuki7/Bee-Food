import 'package:flutter/material.dart';
import 'package:driver_app/const/Colors.dart';

import 'login.dart';

class LoadingScreen extends StatefulWidget {
  const LoadingScreen({Key? key}) : super(key: key);

  @override
  _LoadingScreenState createState() => _LoadingScreenState();
}

class _LoadingScreenState extends State<LoadingScreen> {

  @override
  void initState() {
    super.initState();
    startup();
  }

  startup() async {
    await Future.delayed(const Duration(seconds: 6), () {});
    Navigator.pushReplacement(context, MaterialPageRoute(builder: (context)=> const Login()));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.bottomRight,
            end: Alignment.topLeft,
            colors: [
              colors.MainColor,
              colors.SecondaryColor,
            ],
          ),
        ),
        child: Column(
          children: [
            const SizedBox(height: 30),
            Expanded(
              child: SizedBox(
                width: MediaQuery
                    .of(context)
                    .size
                    .width,
                child:const Center(
                  child: Text("Loading",
                    style: TextStyle(
                      fontFamily: 'CircularStd',
                      fontWeight: FontWeight.bold,
                      fontSize: 30.0,
                      color: Colors.white,
                    ),
                  ),
                ),
              ),
            ),

            const Expanded(
              child:
              Center(
                child: CircularProgressIndicator(color: Colors.white,),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

