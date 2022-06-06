import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

import 'get.dart';


class DriverInfos{

  static double wallet= 0;
  static double cash= 0;

  static double getCash(){
    return cash;
  }

  static double getWallet(){
    return wallet;
  }

  static void setCash(double Newcash){
    Newcash = cash;
  }

  static void setWallet(double NewWallet){
    NewWallet = wallet;
  }

  static Widget GetDriverInfos(){
    String query=r''' 
      query($phone:String!){
      driverByPhone(phone:$phone){
      wallet
      cash
      }
    }
      ''';
    return Query(
        options: QueryOptions(
          document: gql(query),
          variables: {
            "driver": Get.phone
          },
          fetchPolicy: FetchPolicy.noCache,
        ),
        builder: (QueryResult result,
            {VoidCallback? refetch, FetchMore? fetchMore}) {
          setCash(result.data!['driverByPhone']['cash']);
          setWallet(result.data!['driverByPhone']['wallet']);
          return Container();
        }
    );
  }
}