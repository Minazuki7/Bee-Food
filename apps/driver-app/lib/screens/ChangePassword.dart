import 'package:flutter/material.dart';
import 'package:flutter_switch/flutter_switch.dart';
import 'package:driver_app/const/Colors.dart';
import 'package:driver_app/components/TextField.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

import '../components/BottomNavBar.dart';
import '../components/tools.dart';

import '../requests/VerifyPassword.dart';
import '../requests/get.dart';
import 'Navigation.dart';

class ChangePassword extends StatefulWidget {

  @override
  State<ChangePassword> createState() => _ChangePasswordState();
}

class _ChangePasswordState extends State<ChangePassword> {
  bool status = false;
  static TextEditingController OldPasswordController = TextEditingController();
  static TextEditingController NewPasswordController = TextEditingController();


  @override
  void initState() {
    Get.getLoginNeeds();
    super.initState();
  }

  String query=r''' 
  query($id:ID!) {
  user(id:$id){
    firstName
    lastName
    email
    password
    phone
  }
}
  ''';

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
                ),
                color: Colors.white,
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
        body: Stack(
          children: [
            SingleChildScrollView(
              child: Container(
                width: MediaQuery.of(context).size.width,
                child: Column(
                  children: [
                    const SizedBox(height: 20),
                    const Center(
                      child: Text(
                        "Change Password",
                        style: TextStyle(
                          fontFamily: 'CircularStd',
                          fontWeight: FontWeight.bold,
                          fontSize: 30.0,
                          color: Colors.white,
                        ),
                      ),
                    ),
                    const SizedBox(height: 60),
                    Container(
                      margin: const EdgeInsets.all(15),
                      width: MediaQuery.of(context).size.width,
                      decoration:  BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(30),
                      ),
                      child: Query(
                      options: QueryOptions(
                      document: gql(query),
                      variables: {
                      "id": Get.id
                      }
                      ),
                      builder: (QueryResult result,
                      {VoidCallback? refetch, FetchMore? fetchMore}) {
                        return  result.data ==null?
                        const SizedBox(height: 400, child: Center(child: CircularProgressIndicator()))
                            :Column(
                          children: [
                            const SizedBox(height: 150),
                            Text(
                              "${result.data!["user"]["firstName"].toString()} ${result.data!["user"]["lastName"].toString()}",
                              style: const TextStyle(
                                fontFamily: 'CircularStd',
                                fontWeight: FontWeight.bold,
                                fontSize: 30.0,
                                color: colors.MainColor,
                              ),
                            ),
                            Container(
                              padding: const EdgeInsets.all(20),
                              child: Column(
                                children: [
                                  tools.HR("Change password"),
                                  const SizedBox(height: 10),
                                  textField.TextZone(
                                      icon: Icons.vpn_key,
                                      controller: OldPasswordController,
                                      title: "Old Password",
                                      obscureText: true),
                                  const SizedBox(height: 20),
                                  textField.TextZone(
                                      icon: Icons.vpn_key,
                                      controller: NewPasswordController,
                                      title: "New Password",
                                      obscureText: true),
                                  const SizedBox(height: 40),
                                  VerifyPassword(),
                                ],
                              ),
                            ),
                            const SizedBox(height: 20),
                          ],
                        );
                      }
                      ),
                    ),
                  ],
                ),
              ),
            ),
            Container(
              padding:const EdgeInsets.only(top: 70),
              width: MediaQuery.of(context).size.width,
              height: 250,
              child: Center(
                child: Container(
                  padding:EdgeInsets.only(left: MediaQuery.of(context).size.width /2, right: MediaQuery.of(context).size.width /2),
                  width: 180,
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(180),
                  ),
                ),
              ),
            ),
            Container(
              padding:const EdgeInsets.only(top: 80),
              width: MediaQuery.of(context).size.width,
              height: 240,
              child: Center(
                child: Image.asset("assets/user.png"),
              ),
            ),
          ],
        ),
        bottomNavigationBar: Bottom(context: context,First: colors.SecondaryColor),
      ),
    );
  }
}
