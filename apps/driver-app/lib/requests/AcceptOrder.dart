import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../components/Buttons.dart';
import '../const/Colors.dart';
import '../screens/Orders.dart';

class AcceptOrder extends StatefulWidget {

  final String order;

  AcceptOrder(this.order);

  @override
  State<AcceptOrder> createState() => _AcceptOrderState();
}

class _AcceptOrderState extends State<AcceptOrder> {

  late final String? id;
  Future<void> getLoginNeeds() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    id = prefs.getString('id');
  }

  @override
  void initState() {
    super.initState();
    getLoginNeeds();
  }


  String mutation = r'''
  mutation($order:ID!,$driver:String!){
  addOrder(
    id:$order,
    driverId:$driver)
  {id}
}
  ''';

  @override
  Widget build(BuildContext context) {
    return Mutation(
              options: MutationOptions(
              document: gql(mutation),
                fetchPolicy: FetchPolicy.noCache,
              ),
              builder: (RunMutation insert, QueryResult? mutationResult) {
              return Bottons.Button(
                  title: "Accept",
                  primaryColor: colors.MainColor,
                  secondaryColor: colors.SecondaryColor,
                  onClick: () async {
                    if(mutationResult?.data == null){
                      insert(<String, dynamic>{
                        "order": widget.order,
                        "driver": id,
                      });
                      Navigator.push(context, MaterialPageRoute(builder: (context) => Order(widget.order)));
                    }else{
                      openDialog(context);
                    }
                  });
              },
          );
  }

  openDialog(BuildContext context) {
    return showDialog(
        context: context,
        builder: (context) {
          return AlertDialog(
            content: SizedBox(
              height: 144,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [

                  Center(child: Icon(Icons.warning, color: colors.Yellow,size: 30,)),
                  const Text("Sorry! The order is already taken"),
                  // ignore: deprecated_member_use
                  RaisedButton(child:const Text("Ok",style: TextStyle(color: Colors.white),),color: colors.MainColor,onPressed:(){
                    Navigator.of(context).pop();
                  }
                  ),
                ],
              ),
            ),
          );
        });
  }

}