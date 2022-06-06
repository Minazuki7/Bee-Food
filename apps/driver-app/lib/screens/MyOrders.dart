
import 'package:flutter/material.dart';
import 'package:flutter_switch/flutter_switch.dart';

import 'package:driver_app/const/Colors.dart';

import '../components/BottomNavBar.dart';
import '../requests/DriversOrderList.dart';
import 'Navigation.dart';

class MyOrders extends StatefulWidget {
  const MyOrders({Key? key}) : super(key: key);

  @override
  State<MyOrders> createState() => _MyOrdersState();
}

class _MyOrdersState extends State<MyOrders> {
  bool status = false;

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const Navigation(),
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: Builder(
          builder: (context) =>
            Padding(
              padding: const EdgeInsets.only(left: 10, top: 10),
              child: IconButton(
                icon: const Icon(
                  Icons.menu,
                  size: 40,
                  color: colors.MainColor,
                ),
                onPressed: () {
                  Scaffold.of(context).openDrawer();
                },
              ),
            ),
        ),
        actions: [
          Padding(
            padding: const EdgeInsets.only(top: 20, right: 20),
            child: FlutterSwitch(
              width: 60,
              value: status,
              activeColor: colors.MainColor,
              onToggle: (val) {
                setState(() {
                  status = val;
                });
              },
            ),
          ),
        ],
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

