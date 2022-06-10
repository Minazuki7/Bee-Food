
import 'package:flutter/material.dart';
import 'package:flutter_switch/flutter_switch.dart';

import 'package:driver_app/const/Colors.dart';

import '../components/BottomNavBar.dart';
import '../components/NavBar.dart';
import '../requests/DriversOrderList.dart';
import 'Navigation.dart';

class MyOrders extends StatefulWidget {
  const MyOrders({Key? key}) : super(key: key);

  @override
  State<MyOrders> createState() => _MyOrdersState();
}

class _MyOrdersState extends State<MyOrders> {
  bool status = false;
  String? textStatus = "offline";

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: NavBars.NavBar(status: status, color: colors.MainColor, onClick: (val) {
          setState(() {
            status = val;
            if(status) textStatus = "online";
            else textStatus = "offline";
          });
        },
        ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.only(top: 8),
        child: Column(
          children: const [
            SizedBox(height: 30),
            Center(
              child: Text(
                "My Order List",
                style: TextStyle(
                  fontFamily: 'CircularStd',
                  fontWeight: FontWeight.bold,
                  fontSize: 30.0,
                  color: colors.MainColor,
                ),
              ),
            ),
            SizedBox(height: 20),
            DriversOrderList(),
          ],
        ),
      ),
      bottomNavigationBar: Bottom(context: context,Third: colors.SecondaryColor),
    );
  }
}

