import 'package:driver_app/screens/mainPage.dart';
import 'package:flutter/material.dart';
import 'package:driver_app/const/Colors.dart';
import 'package:driver_app/components/TextField.dart';
import 'package:driver_app/components/Buttons.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';


import '../const/String.dart';
import 'LoadingScreen.dart';

void main() {
  runApp(const MaterialApp(home: Login()));
}

class Login extends StatefulWidget {
  const Login({Key? key}) : super(key: key);

  @override
  State<Login> createState() => _LoginState();
}

class _LoginState extends State<Login> {
  final _formKey = GlobalKey<FormState>();
  final prefs = SharedPreferences.getInstance();


  bool isLoading = false;

  String query = r'''mutation login($phone:String!,$password:String!){
  loginDriver(
    phone:$phone,
    password:$password
  ){
    token
    user{id}
  }
}''';

  TextEditingController phoneController = TextEditingController();
  TextEditingController passwordController = TextEditingController();

  String errorMessage = "";


  @override
  Widget build(BuildContext context) => isLoading
      ? const LoadingScreen()
      : Scaffold(
    body: SingleChildScrollView(
      child: Container(
        height: MediaQuery.of(context).size.height,
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.bottomRight,
            end: Alignment.topLeft,
            colors: [
              colors.MainColor,
              colors.SecondaryColor,
            ],
          ),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Expanded(
              child: SizedBox(
                width: MediaQuery.of(context).size.width,
                child: const Center(
                  child: Text(
                    "Delivery App",
                    style: TextStyle(
                      fontFamily: 'CircularStd',
                      fontWeight: FontWeight.bold,
                      fontSize: 40.0,
                      color: Colors.white,
                    ),
                  ),
                ),
              ),
            ),
            Expanded(
              flex: 2,
              child: Container(
                decoration: const BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(30),
                      topRight: Radius.circular(30),
                    )),
                padding: const EdgeInsets.only(right: 20, left: 20),
                child: Form(
                  key: _formKey,
                  child: Column(
                    children: [
                      const SizedBox(height: 50.0),
                      const SingleChildScrollView(
                        padding:
                        EdgeInsets.only(right: 25, left: 25),
                        child: Text(
                          "Sign in.",
                          style: TextStyle(
                              color: colors.MainColor,
                              fontSize: 50,
                              fontWeight: FontWeight.bold),
                        ),
                      ),
                      const SizedBox(height: 20.0),
                      Text(
                        errorMessage,
                        style: const TextStyle(
                            color: Colors.red,
                            fontWeight: FontWeight.bold,
                            fontSize: 16),
                      ),
                      const SizedBox(height: 20.0),
                      _PhoneField(),
                      const SizedBox(height: 30.0),
                      _PasswordField(),
                      const SizedBox(height: 20.0),
                      Container(
                        alignment: const Alignment(1.0, 0.0),
                        child: InkWell(
                            child: const Text(
                              "Forget Your Password?",
                              style: TextStyle(
                                color: colors.MainColor,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            onTap: () {}),
                      ),
                      const SizedBox(height: 50.0),
                      Mutation(
                          options: MutationOptions(document: gql(query),
                            // ignore: void_checks
                            update: (GraphQLDataProxy cache, QueryResult? result) {
                              return cache;
                            },
                            onCompleted: (dynamic resultData) async{

                              Strings.ID = resultData['loginDriver']['user']['id'];
                              print(resultData);
                              if (resultData != null) {
                                setState(() => isLoading = true);
                                await Future.delayed(
                                    const Duration(seconds: 1));
                                print("right");
                                Navigator.pushAndRemoveUntil(context, MaterialPageRoute(builder: (context) => const MainPage()), (route) => false);
                              } else {
                                print("wrong");
                                errorMessage = "Invalid Phone/Password";
                              }
                                phoneController.text = "";
                                passwordController.text = "";
                            },
                          ),
                          builder:
                              (RunMutation insert, QueryResult? result) {
                            return Bottons.Button(
                                title: "Login",
                                primaryColor: colors.MainColor,
                                secondaryColor: colors.SecondaryColor,
                                onClick: () async {
                                  if (_formKey.currentState!.validate()) {
                                      insert(<String, dynamic>{
                                        "phone": phoneController.text,
                                        "password": passwordController.text,
                                      });
                                    }
                                  print("DONE");
                                  }
                                );
                          }),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    ),
  );
  // ignore: non_constant_identifier_names
  Widget _PhoneField() {
    return textField.TextZone(
        icon: Icons.phone,
        controller: phoneController,
        keyboardType: TextInputType.phone,
        validator: validatePhone,
        title: "Phone number");
  }

  // ignore: non_constant_identifier_names
  Widget _PasswordField() {
    return textField.TextZone(
        icon: Icons.vpn_key,
        controller: passwordController,
        validator: validatePassword,
        title: "Password",
        obscureText: true);
  }

  String? validatePhone(String? value) {
    if (value?.length != 8) {
      return 'Phone Number must be of 8 digit';
    }
    return null;
  }

  String? validatePassword(String? value) {
    if (value!.isEmpty) {
      return 'Password field is empty';
    }
    return null;
  }
}
