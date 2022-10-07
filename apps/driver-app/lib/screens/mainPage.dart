
import 'package:flutter/material.dart';
import 'package:driver_app/const/Colors.dart';

import '../components/BottomNavBar.dart';
import '../components/NavBar.dart';
import '../requests/OrderList.dart';
import '../requests/WalletAndCash.dart';
import '../requests/get.dart';

class MainPage extends StatefulWidget {
  const MainPage({Key? key}) : super(key: key);

  @override
  State<MainPage> createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  bool status = false;
  String? textStatus = "offline";
  int cash = 20;
  int wallet = 210;

  @override
  void initState() {
    Get.getLoginNeeds();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.bottomRight,
                end: Alignment.topLeft,
                colors: [colors.MainColor, colors.SecondaryColor,],
              ),
            ),
            child: Scaffold(
              backgroundColor: Colors.transparent,
              appBar: NavBars.NavBar(status: status,textStatus: textStatus, onClick: (val) {
                setState(() {
                  status = val;
                  if(status) textStatus = "online";
                  else textStatus = "offline";
                });
              },),
              body: SingleChildScrollView(
                child: Container(
                  child: Column(
                    children: [
                      const SizedBox(height: 30),
                      const Center(
                        child: Text(
                          "Welcome",
                          style: TextStyle(
                            fontFamily: 'CircularStd',
                            fontWeight: FontWeight.bold,
                            fontSize: 30.0,
                            color: Colors.white,
                          ),
                        ),
                      ),
                      const SizedBox(height: 40),
                      WalletAndCash(cash,wallet),
                      const SizedBox(height: 20),
                      Container(
                        decoration: const BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.only(
                            topRight: Radius.circular(30),
                            topLeft: Radius.circular(30),
                          ),
                        ),
                        child: Column(
                                children: const [
                                  SizedBox(height: 10),
                                  Text(
                                    "Delivery list",
                                    style: TextStyle(
                                      fontFamily: 'CircularStd',
                                      fontWeight: FontWeight.bold,
                                      fontSize: 30.0,
                                      color: colors.MainColor,
                                    ),
                                  ),
                                  SizedBox(height: 20),
                                  OrderList(),
                                ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              bottomNavigationBar: Bottom(context: context),
            ),
          );
  }
}