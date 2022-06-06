import 'package:driver_app/requests/AcceptOrder.dart';
import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../const/String.dart';
import 'EditOrder.dart';

class verifOrder extends StatefulWidget {

  final String order;
  final String status;

  verifOrder(this.order,this.status);

  @override
  State<verifOrder> createState() => _verifOrderState();
}

class _verifOrderState extends State<verifOrder> {


  static late String? id;
  Future<void> getLoginNeeds() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    id = prefs.getString('id');
  }

  @override
  void initState() {
      getLoginNeeds();
    super.initState();
  }
  
  String query=r''' 
  query($order:String!,$driver:String!){
	getDriverOrders(driver:$driver,id:$order){id}
}
  ''';
  @override
  Widget build(BuildContext context) {
    return Query(
        options: QueryOptions(
        document: gql(query),
            fetchPolicy: FetchPolicy.noCache,
    variables: {
      "order": widget.order,
      "driver": id
    }
    ),
    builder: (QueryResult result,
    {VoidCallback? refetch, FetchMore? fetchMore}) {
      return result.isLoading ? const SizedBox(height: 400, child: Center(child: CircularProgressIndicator())):
           result.data == null?AcceptOrder(widget.order):EditOrder(widget.order,widget.status);
    }
    );
  }
}
