import 'package:driver_app/requests/AcceptOrder.dart';
import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../const/String.dart';
import 'EditOrder.dart';
import 'get.dart';

class verifOrder extends StatefulWidget {

  final String order;
  final String status;

  verifOrder(this.order,this.status);

  @override
  State<verifOrder> createState() => _verifOrderState();
}

class _verifOrderState extends State<verifOrder> {

  @override
  void initState() {
    Get.getLoginNeeds();
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
      "driver": Get.id
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
