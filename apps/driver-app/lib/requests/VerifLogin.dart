import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:driver_app/const/Colors.dart';

import '../components/Buttons.dart';
import '../components/dialog.dart';
import '../screens/mainPage.dart';
import 'Graphql.dart';

class VerifLogin extends StatefulWidget {
  String? phoneController;
  String? passwordController;
  final _formKey;
  bool? isLoading;

  VerifLogin(this.phoneController,this.passwordController,this._formKey,this.isLoading);
  @override
  State<VerifLogin> createState() => _VerifLoginState();
}

class _VerifLoginState extends State<VerifLogin> {

  Future<void> setLoginNeeds(id,token,phone) async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setString('id', id);
    prefs.setString('token', token);
    prefs.setString('phone', phone);
  }

    String query = r'''mutation login($phone:String!,$password:String!){
    loginDriver(
      phone:$phone,
      password:$password
    ){
      token
      user{id}
    }
  }''';

  @override
  Widget build(BuildContext context) {
    return Mutation(
        options: MutationOptions(
          document: gql(query),
          fetchPolicy: FetchPolicy.noCache,
          // ignore: void_checks
          update: (GraphQLDataProxy cache,
              QueryResult? result) {
            return cache;
          },
          onCompleted: (dynamic resultData) async {

            if (resultData != null) {
              GraphQLConfiguration.setToken(resultData['loginDriver']['token']);
              setLoginNeeds(resultData['loginDriver']['user']['id'],resultData['loginDriver']['token'],resultData['loginDriver']['phone']);
              setState(() => widget.isLoading = true);
              widget.phoneController = "";
              widget.passwordController = "";
              await Future.delayed(
                  const Duration(seconds: 1));
              // ignore: avoid_print
              Navigator.pushAndRemoveUntil(
                  context,
                  MaterialPageRoute(
                      builder: (context) =>
                      const MainPage()),
                      (route) => false);
            } else {
              widget.phoneController = "";
              widget.passwordController = "";
              Dialogs.Dialog(icon: Icons.security_update_warning_rounded,
                  text:"Sorry, we can't find your account. Please try to enter valid phone number and password.",
                  onClick:(){
                    Navigator.of(context).pop();
                  }, context: context);
            }
          },
        ),
        builder:
            (RunMutation insert, QueryResult? result) {
          return Bottons.Button(
              title: "Login",
              primaryColor: colors.MainColor,
              secondaryColor: colors.SecondaryColor,
              onClick: () async {
                  insert(<String, dynamic>{
                    "phone": widget.phoneController,
                    "password": widget.passwordController,
                  });
              });
        });
  }
}
