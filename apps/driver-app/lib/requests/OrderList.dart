import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

import '../components/Cont.dart';
import '../screens/Orders.dart';

class OrderList extends StatefulWidget {
  const OrderList({Key? key}) : super(key: key);

  @override
  State<OrderList> createState() => _OrderListState();
}

class _OrderListState extends State<OrderList> {


  static String query = r'''
  query{
  findOrders{
  id
  totalPrice
  status
  branch{name}
  }
}
 ''';

  @override
  Widget build(BuildContext context) {
    return
      Query(
        options: QueryOptions(
        document: gql(query),
        fetchPolicy: FetchPolicy.noCache,
    ),
    builder: (QueryResult result,
    {VoidCallback? refetch, FetchMore? fetchMore}) {
      return
        result.isLoading ? const SizedBox(height: 400, child: Center(child: CircularProgressIndicator())):
        result.data == null?const SizedBox(height: 400, child: Center(child: Text("Database Error!"))):
        result.data!['findOrders'].length == 0 ? const SizedBox(height: 400, child: Center(child: Text("There is no delivery request yet!"))):
        SizedBox(
          height: 450,
          width: MediaQuery
              .of(context)
              .size
              .width,
          child: ListView.builder(
              itemCount: result.data!['findOrders'].length,
              itemBuilder: (context, index) {
                return result.data!['findOrders'][index]['status'] ==
                    null
                    ? const Center(child: CircularProgressIndicator())
                    : Cont.ContentContainer(
                  height: 80,
                  width: MediaQuery
                      .of(context)
                      .size
                      .width,
                  content: ListTile(
                    title: Text(
                        "Ordering from : ${result
                            .data!['findOrders'][index]['branch']['name']
                            .toString()}"),
                    subtitle: Text("Total price: ${result
                        .data!['findOrders'][index]['totalPrice']
                        .toString()},000 TND"),
                    trailing:
                    const Icon(Icons.arrow_forward_outlined),
                    onTap: () {
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) =>
                                  Order (result
                                      .data!['findOrders'][index]['id']
                                      .toString())));
                    },
                  ),
                );
              }),
        );
      }
    );
  }
}
