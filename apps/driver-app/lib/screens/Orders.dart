// ignore_for_file: file_names

import 'package:flutter/material.dart';

import 'package:driver_app/const/Colors.dart';
import '../components/BottomNavBar.dart';
import '../components/NavBar.dart';
import '../requests/OrderDetails.dart';

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

  String? textStatus = "offline";
  bool status = false;


  Future<void> _refresh() async {
    WidgetsBinding.instance.addPostFrameCallback((_){
      Navigator.push(context, MaterialPageRoute(builder: (context) => widget));
    });
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
        child:
        RefreshIndicator(
            onRefresh: _refresh,
            child: OrderDetails(widget.order)),
      ),
      bottomNavigationBar: Bottom(context: context),
    );
  }
}
