// ignore_for_file: file_names

import 'package:flutter/material.dart';
import 'package:flutter_switch/flutter_switch.dart';

import 'package:driver_app/const/Colors.dart';

import '../components/BottomNavBar.dart';
import '../requests/OrderDetails.dart';
import 'Navigation.dart';

class Order extends StatefulWidget {
  final String order;

  const Order(this.order);

  @override
  State<Order> createState() => _OrderState();
}

class _OrderState extends State<Order> {

  @override
  void initState() {
    super.initState();
  }

  bool status = false;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const Navigation(),
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: Builder(
          builder: (context) => Padding(
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
        child:OrderDetails(widget.order),
      ),
      bottomNavigationBar: Bottom(context: context),
    );
  }
}
