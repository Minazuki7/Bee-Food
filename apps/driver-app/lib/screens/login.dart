import 'package:flutter/material.dart';
import 'package:driver_app/const/Colors.dart';
import 'package:driver_app/components/TextField.dart';
import '../requests/VerifLogin.dart';
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

  static bool isLoading = false;

  static TextEditingController phoneController = TextEditingController();
  static TextEditingController passwordController = TextEditingController();


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
                              padding: EdgeInsets.only(right: 25, left: 25),
                              child: Text(
                                "Sign in.",
                                style: TextStyle(
                                    color: colors.MainColor,
                                    fontSize: 50,
                                    fontWeight: FontWeight.bold),
                              ),
                            ),
                            const SizedBox(height: 40.0),
                          textField.TextZone(
                            icon: Icons.phone,
                                controller: phoneController,
                                keyboardType: TextInputType.phone,
                                title: "Phone number"),
                            const SizedBox(height: 30.0),

                            textField.TextZone(
                              icon: Icons.vpn_key,
                                  controller: passwordController,
                                  title: "Password",
                                  obscureText: true),
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
                            VerifLogin(phoneController.text,phoneController.text,_formKey,isLoading),
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
}
