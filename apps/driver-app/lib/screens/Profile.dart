import 'package:flutter/material.dart';
import 'package:flutter_switch/flutter_switch.dart';
import 'package:driver_app/const/Colors.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

import '../components/BottomNavBar.dart';
import '../components/Buttons.dart';
import '../components/NavBar.dart';
import '../components/tools.dart';

import '../requests/get.dart';
import 'ChangePassword.dart';
import 'Navigation.dart';

class Profile extends StatefulWidget {

  @override
  State<Profile> createState() => _ProfileState();
}




class _ProfileState extends State<Profile> {
  bool status = false;
  String? textStatus = "offline";


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
}''';

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
          appBar: NavBars.NavBar(status: status, onClick: (val) {
            setState(() {
              status = val;
              if(status) textStatus = "online";
              else textStatus = "offline";
            });
          },
          ),
        body: Stack(
          children: [
            Container(
              width: MediaQuery.of(context).size.width,
              child: Column(
                children: [
                  const SizedBox(height: 20),
                  const Center(
                    child: Text(
                      "Profile",
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
                    margin: EdgeInsets.all(15),
                    width: MediaQuery.of(context).size.width,
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(30),
                    ),
                    child: Query(
                      options: QueryOptions(
                      document: gql(query),
                      fetchPolicy: FetchPolicy.noCache,
                      variables: {
                      "id": Get.id
                      }
                      ),
                      builder: (QueryResult result,
                      {VoidCallback? refetch, FetchMore? fetchMore}) {
                        return result.data ==null?
                        const SizedBox(height: 400, child: Center(child: CircularProgressIndicator()))
                            :Column(
                          children: [
                            const SizedBox(height: 150),
                            Text(
                              "${result.data!["user"]["firstName"].toString()} ${result.data!["user"]["lastName"].toString()}",
                              style:const TextStyle(
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
                                  const SizedBox(height: 10),
                                  tools.HR("Change password"),
                                  const SizedBox(height: 10),
                                  Bottons.Button(
                                      title: "Change Password",
                                      primaryColor: colors.MainColor,
                                      secondaryColor: colors.SecondaryColor,
                                      onClick: () async {
                                        Navigator.push(context,
                                            MaterialPageRoute(
                                                builder: (context) =>
                                                    ChangePassword()));
                                      }
                                  ),
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
