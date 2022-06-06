
import 'package:flutter/material.dart';
import 'package:driver_app/const/Colors.dart';
import 'package:driver_app/components/Cont.dart';

import '../components/BottomNavBar.dart';
import '../components/NavBar.dart';
import '../requests/OrderList.dart';
import '../requests/getDriverInfos.dart';
import 'Navigation.dart';

class MainPage extends StatefulWidget {
  const MainPage({Key? key}) : super(key: key);

  @override
  State<MainPage> createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  bool status = false;
  late double Cash;
  late double Wallet;

  @override
  void initState() {
    setState(()async{
      await DriverInfos.GetDriverInfos();
    });
    Cash = DriverInfos.getCash();
    Wallet = DriverInfos.getWallet();
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
              drawer: const Navigation(),
              appBar: NavBars.NavBar(status: status, onClick: (val) {
                setState(() {
                  status = val;
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
                      SizedBox(
                        height: 135,
                        child: ListView(
                          scrollDirection: Axis.horizontal,
                          padding: const EdgeInsets.only(left: 10, right: 10),
                          children: [
                            Cont.InformationContainer(
                              width: (MediaQuery.of(context).size.width / 2) - 10,
                              icon: const Icon(
                                Icons.account_balance_wallet,
                                size: 40,
                                color: colors.MainColor,
                              ),
                              title: "Wallet",
                              info: Cash.toString() + " TND",
                            ),
                            Cont.InformationContainer(
                              width: (MediaQuery.of(context).size.width / 2) - 20,
                              icon: const Icon(
                                Icons.monetization_on,
                                size: 40,
                                color: colors.MainColor,
                              ),
                              title: "Cash",
                              info: Wallet.toString() + " TND",
                            ),
                          ],
                        ),
                      ),
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