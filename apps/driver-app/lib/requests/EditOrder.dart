import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../components/Buttons.dart';
import '../components/dialog.dart';
import '../const/Colors.dart';
import '../screens/Orders.dart';

class EditOrder extends StatefulWidget {

  final String order;
  final String status;

  EditOrder(this.order,this.status);


  @override
  State<EditOrder> createState() => _EditOrderState();
}

class _EditOrderState extends State<EditOrder> {

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

  String mutation = r''' mutation($id:String!){
    setOrderStatus(id:$id){id,status}
  }''';

  @override
  Widget build(BuildContext context) {
    return Mutation(
      options: MutationOptions(
        document: gql(mutation),
        fetchPolicy: FetchPolicy.noCache,
      ),
      builder: (RunMutation insert, QueryResult? mutationResult) {
        print("hello "+widget.order);
        return widget.status == "Delivery"?Bottons.Button(
            title: "Delivered",
            primaryColor: colors.WarningSecondaryColor,
            secondaryColor: colors.WarningMainColor,
            onClick: () async {
              if(mutationResult?.data == null){
                insert(<String, dynamic>{
                  "id": widget.order,
                });
                Navigator.push(context, MaterialPageRoute(builder: (context) => Order(widget.order)));
              }else{
                Dialogs.Dialog(icon: Icons.warning,text:"Error",
                    onClick:(){
                  Navigator.of(context).pop();
                  }, context: context);
              }
            })
        :
        widget.status == "Delivered"?
        Bottons.Button(
            title: "Done",
            primaryColor: colors.SuccessSecondaryColor,
            secondaryColor: colors.SuccessMainColor,
            onClick: () {}
        )
        :Bottons.Button(
            title: "Pending..",
            primaryColor: colors.DangerSecondaryColor,
            secondaryColor: colors.DangerMainColor,
            onClick: () {}
        )
        ;
      },
    );
  }
}