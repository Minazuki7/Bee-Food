import 'package:flutter/material.dart';
import 'package:driver_app/screens/LoadingScreen.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

import 'requests/Graphql.dart';

void main() async {
  await initHiveForFlutter();
  runApp(GraphQLProvider(
    client: GraphQLConfiguration.initializeClient(GraphQLConfiguration.token),
    child: const MaterialApp(home: Main()),
  ));
}

class Main extends StatelessWidget {
  const Main({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const Scaffold(body: LoadingScreen());
  }
}
