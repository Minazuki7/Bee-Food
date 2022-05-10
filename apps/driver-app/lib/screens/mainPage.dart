import 'package:flutter/material.dart';
import 'package:flutter_switch/flutter_switch.dart';
import 'package:driver_app/const/Colors.dart';
import 'package:driver_app/components/Cont.dart';
import 'package:driver_app/components/BottomNavBar.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

import '../const/String.dart';
import 'Navigation.dart';
import 'Orders.dart';

class MainPage extends StatefulWidget {
  const MainPage({Key? key}) : super(key: key);

  @override
  State<MainPage> createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {

  bool status = false;
  String User = "Username";
  double Cash = 2160.150;
  double Wallet = 12125.560;

  String query = r'''
  query login($id:ID!){
  user(
    id:$id
  ){
    firstName
    lastName
    email
    password
    roles
  }
}
  ''';

  @override
  Widget build(BuildContext context) {
    return Query(
        options: QueryOptions(
          document: gql(query),
          variables: {
            'id': '${Strings.ID}',
          },
        ),
        builder: (QueryResult result, { VoidCallback? refetch, FetchMore? fetchMore }) {
          return Scaffold(
            drawer: Navigation(),
            appBar: AppBar(
              backgroundColor: Colors.transparent,
              elevation: 0,
              leading: Builder(
                builder: (context) => Padding(
                  padding: const EdgeInsets.only(left: 10, top: 10),
                  child: IconButton(
                    icon: const Icon(Icons.menu,size: 40,),
                    color: colors.MainColor,
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
              child: Column(
                children: [
                  const SizedBox(height: 30),
                  Center(
                    child: Text("Welcome",
                      style: const TextStyle(
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
                          height: 200,
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
                  Cont.ContentContainer(
                    width: MediaQuery.of(context).size.width,
                    height: 400,
                    icon: const Icon(
                      Icons.monetization_on,
                      size: 40,
                      color: colors.MainColor,
                    ),
                    title: "Delivery List",
                    content: SizedBox(
                      height: 300,
                      width: MediaQuery.of(context).size.width,
                      child: ListView.builder(
                          itemCount: result.data?['orders'].length,
                          itemBuilder: (context, index){
                            return ListTile(
                              title: Text("Order ${index +1} : Price : ${result.data!['orders'][index]['price'].toString()}"),
                              subtitle: Text("Status : ${result.data!['orders'][index]['status'].toString()}"),
                              trailing: const Icon(Icons.arrow_forward_outlined),
                              onTap: (){

                                Navigator.push(context, MaterialPageRoute(builder: (context) => Order(index+1)));
                              },
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
        });
  }
}
