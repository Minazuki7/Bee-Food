import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

import '../components/Cont.dart';
import 'package:driver_app/const/Colors.dart';

class WalletAndCash extends StatefulWidget {
  int? cash;
  int? wallet;

  WalletAndCash(this.cash, this.wallet);

  @override
  State<WalletAndCash> createState() => _WalletAndCashState();
}

class _WalletAndCashState extends State<WalletAndCash> {


  String query=r'''
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
          widget.cash = result==null?0:widget.cash;
          widget.wallet = result==null?0:widget.wallet;
      return
        SizedBox(
          height: 135,
          child: ListView(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.only(left: 10, right: 10),
            children: [
              Cont.InformationContainer(
                width: (MediaQuery
                    .of(context)
                    .size
                    .width / 2) - 10,
                icon: const Icon(
                  Icons.account_balance_wallet,
                  size: 40,
                  color: colors.MainColor,
                ),
                title: "Wallet",
                info: "${widget.cash} TND",
              ),
              Cont.InformationContainer(
                width: (MediaQuery
                    .of(context)
                    .size
                    .width / 2) - 20,
                icon: const Icon(
                  Icons.monetization_on,
                  size: 40,
                  color: colors.MainColor,
                ),
                title: "Cash",
                info: "${widget.wallet} TND",
              ),
            ],
          ),
        );
    }
  );
  }
}
