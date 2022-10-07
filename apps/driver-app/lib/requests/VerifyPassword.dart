import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:driver_app/const/Colors.dart';

import '../components/Buttons.dart';
import '../components/dialog.dart';

class VerifyPassword extends StatefulWidget {
  const VerifyPassword({Key? key}) : super(key: key);

  @override
  State<VerifyPassword> createState() => _VerifyPasswordState();
}

class _VerifyPasswordState extends State<VerifyPassword> {

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
            title: "Confirm",
            primaryColor: colors.MainColor,
            secondaryColor: colors.SecondaryColor,
            onClick: () async {

              Dialogs.Dialog(
                  icon: Icons.cancel_rounded,
                  color: colors.Red,
                  text:"Sorry, we can't change your password. Please try again.",
                  size: 70,
                  onClick:(){
                    Navigator.of(context).pop();
                  }, context: context);
            }
        );
      }
    );
  }
}