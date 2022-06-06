import 'dart:async';

import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../components/Cont.dart';
import '../screens/Orders.dart';

class DriversOrderList extends StatefulWidget {
  const DriversOrderList({Key? key}) : super(key: key);

  @override
  State<DriversOrderList> createState() => _DriversOrderListState();
}

class _DriversOrderListState extends State<DriversOrderList> {

  static String? id;
  Future<void> getLoginNeeds() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    id = prefs.getString('id');
  }

  @override
  void initState() {
    getLoginNeeds();
    super.initState();
  }

  String query = r'''
  query($driver:String!){
    DriversOrders(driver:$driver){  
    id
    totalPrice
    status
    branch{name}
    }
  }
  ''';
  @override
  Widget build(BuildContext context) {
    return Query(
        options: QueryOptions(
          document: gql(query),
          variables: {
            "driver": id
          },
          fetchPolicy: FetchPolicy.noCache,
        ),
        builder: (QueryResult result,
            {VoidCallback? refetch, FetchMore? fetchMore}) {
          print(result);
          if (result.isLoading) {
            return Container(
              height: 600,
              child: const Center(
                child: CircularProgressIndicator()),
            );
          }else if(result.data == null){
            return Container(
                height: 600,
                child: const Center(
                    child: Text("Error database"))
            );
          }else {
            return Container(
            height: 600,
            child: result.data!['DriversOrders'].length == 0?
            Container(
              height: 600,
              child: const Center(
                  child: Text("You don't have deliveries yet!"))
            ):
            SizedBox(
              height: MediaQuery.of(context).size.height,
              width: MediaQuery.of(context).size.width,
              child: ListView.builder(
                  itemCount: result.data!['DriversOrders'].length,
                  itemBuilder: (context, index) {
                    return result.data!['DriversOrders'][index]['status'] == null?const Center(child: CircularProgressIndicator()):Cont.ContentContainer(
                      height: 80,
                      width: MediaQuery.of(context).size.width,
                      content: ListTile(
                        title: Text("Ordering from : ${result.data!['DriversOrders'][index]['branch']['name'].toString()}"),
                        subtitle: Text("For the client: ${result.data!['DriversOrders'][index]['totalPrice'].toString()},000"),
                        trailing: const Icon(Icons.arrow_forward_outlined),
                        onTap: () {
                          Navigator.push(context, MaterialPageRoute(builder: (context) => Order(result.data!['DriversOrders'][index]['id'].toString())));},
                      ),
                    );
                  }
              ),
            ),
          );
          }
        }
    );
  }
}
