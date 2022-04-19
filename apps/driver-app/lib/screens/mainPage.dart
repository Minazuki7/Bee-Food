import 'package:flutter/material.dart';
import 'package:flutter_switch/flutter_switch.dart';
import 'package:driver_app/const/Colors.dart';
import 'package:driver_app/components/Cont.dart';
import 'package:driver_app/components/BottomNavBar.dart';

import 'Profile.dart';

class MainPage extends StatefulWidget {
  const MainPage({Key? key}) : super(key: key);

  @override
  State<MainPage> createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  bool status = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: Builder(
          builder: (context) => Padding(
            padding: const EdgeInsets.only(left: 20, top: 20),
            child: Container(
              height: 45,
              width: 45,
              decoration: BoxDecoration(
                color: colors.MainColor,
                borderRadius: BorderRadius.circular(30),
              ),
              child: Center(
                child: IconButton(
                  icon: const Icon(
                    Icons.person,
                    size: 20,
                    color: Colors.white,
                  ),
                  onPressed: () {Navigator.push(context, MaterialPageRoute(builder: (context)=> const Profile()));},
                ),
              ),
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
        child: Column(
          children: [
            const SizedBox(height: 30),

            Center(
              child: Text("Welcome, Username",
                style: TextStyle(
                  fontFamily: 'CircularStd',
                  fontWeight: FontWeight.bold,
                  fontSize: 30.0,
                  color:colors.MainColor,
                ),
              ),
            ),
            const SizedBox(height: 40),
            SizedBox(
              height: 200,
              child: ListView(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.only(left: 10, right: 10),
                children: [
                  Cont.InformationContainer(
                    width: (MediaQuery.of(context).size.width / 2) - 10,
                    height: 200,
                    icon: Icon(
                      Icons.account_balance_wallet,
                      size: 40,
                      color: colors.MainColor,
                    ),
                    title: "Wallet",
                    info: "150TND",
                  ),
                  Cont.InformationContainer(
                    width: (MediaQuery.of(context).size.width / 2) - 20,
                    height: 200,
                    icon: Icon(
                      Icons.monetization_on,
                      size: 40,
                      color: colors.MainColor,
                    ),
                    title: "Cash",
                    info: "300TND",
                    link:"Change value",
                    Tap: () {Navigator.push(context, MaterialPageRoute(builder: (context)=> const Profile()));},
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),
            Cont.ContentContainer(
                width: MediaQuery.of(context).size.width,
                height: 500,
                icon: Icon(
                  Icons.monetization_on,
                  size: 40,
                  color: colors.MainColor,
                ),
                title: "Delivery List",
                content: SizedBox(
                  height: 400,
                  width: MediaQuery.of(context).size.width,
                  child: ListView.builder(
                      itemCount: 5,
                      itemBuilder: (context, index){
                        // ignore: deprecated_member_use
                        return Column(
                          children: [
                            // ignore: deprecated_member_use
                            FlatButton(
                            onPressed: () {  },
                            child: Padding(
                              padding: const EdgeInsets.only(left: 40, right: 40, top: 16, bottom: 16),
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children:[
                                  Column(
                                    children: const [
                                      Text(
                                        "Order name",
                                        style: TextStyle(
                                          fontSize: 30,
                                        ),
                                      ),
                                      Text(
                                        "Order distance",
                                        style: TextStyle(
                                          fontSize: 16,
                                          color: Colors.grey,
                                        ),
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            ),
                          ),
                          const Divider(color: Colors.grey,),
                          ],
                        );
                      }
                  ),
                ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: Bottom(
          context: context,
          First: Colors.grey,
          Second: colors.MainColor,
          Third: Colors.grey),
    );
  }
}
