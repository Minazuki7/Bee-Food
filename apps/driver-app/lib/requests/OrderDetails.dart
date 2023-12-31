import 'package:driver_app/requests/verifOrder.dart';
import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:driver_app/const/Colors.dart';
import '../components/Cont.dart';
import '../components/tools.dart';

import '../components/Buttons.dart';
import '../screens/map.dart';

class OrderDetails extends StatefulWidget {
  final String order;

  const OrderDetails(this.order);


  @override
  State<OrderDetails> createState() => _OrderDetailsState();
}

class _OrderDetailsState extends State<OrderDetails> {


  String query = r'''
  query($id:String!){
 	getOrder(id:$id){    
 	order{
      id
      items
      status 
    	price
      totalPrice
      deliveryFees
      branch{
        name
      }
    }
    totalPrice
  }
}
  ''';

  String itemsQuery = r'''
  query($id:ID!){
  item(id:$id){
   title
   price 
  }
}
  ''';


  Future<void> _refresh() async {}

  @override
  Widget build(BuildContext context) {
    return Query(
        options: QueryOptions(
            document: gql(query),
            fetchPolicy: FetchPolicy.noCache,
            variables: {
              "id": widget.order
            }
        ),
        builder: (QueryResult result,
            {VoidCallback? refetch, FetchMore? fetchMore}) {

          return result.isLoading ? const SizedBox(height: 400, child: Center(child: CircularProgressIndicator())):
          Container(
            padding: const EdgeInsets.all(10),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Center(
                  child: Text(
                    "Ordering from \n${result.data?['getOrder']['order']['branch']['name'].toString()}",
                    style: const TextStyle(
                      fontFamily: 'CircularStd',
                      fontWeight: FontWeight.bold,
                      fontSize: 30.0,
                      color: colors.MainColor,
                    ),
                  ),
                ),
                const SizedBox(height: 20),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text("  This order is: ",
                      style: TextStyle(
                        fontFamily: 'CircularStd',
                        fontWeight: FontWeight.bold,
                        fontSize: 20.0,
                        color: colors.Black,
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.all(10),
                      child: Bottons.Button(
                          height: 50,
                          width: 100,
                          title: tools.editText(result.data!['getOrder']['order']['status'].toString()),
                          primaryColor: colors.SuccessSecondaryColor,
                          secondaryColor: colors.SuccessMainColor,
                          size: 15,
                          onClick: () async {}
                      ),
                    ),
                  ],
                ),
                Container(
                  margin: const EdgeInsets.all(10),
                  child: Bottons.ButtonIcon(
                      width: MediaQuery.of(context).size.width,
                      title: "Restaurant Location",
                      primaryColor: colors.MainColor,
                      secondaryColor: colors.SecondaryColor,
                      onClick: () {
                        Navigator.push(context, MaterialPageRoute(builder: (context) => MapLocation(36.8123866, 10.1691902)));
                      }),
                ),
                SizedBox(
                  height: 300,
                  width: MediaQuery.of(context).size.width,
                  child: Cont.ContentContainer(
                    padding: const EdgeInsets.all(15),
                    height: 80,
                    width: MediaQuery.of(context).size.width,
                    content: Column(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        Center(
                          child: Text("Ref code: [${result.data!['getOrder']['order']['id']}]",
                            style: const TextStyle(
                              fontFamily: 'CircularStd',
                              fontWeight: FontWeight.bold,
                              fontSize: 12.0,
                              color: colors.Black,
                            ),
                          ),
                        ),

                        tools.HR("Items to Deliver"),

                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text("Item name",style: TextStyle(fontWeight: FontWeight.bold,),),
                            Text("Price",style: TextStyle(fontWeight: FontWeight.bold,)),
                          ],
                        ),
                        SingleChildScrollView(
                          child: Container(
                            height: 50,
                            child: ListView.builder(
                                itemCount: result.data!['getOrder']['order']['items'].length,
                                itemBuilder: (context, index) {
                                  return Query(
                                      options: QueryOptions(
                                          document: gql(itemsQuery),
                                          fetchPolicy: FetchPolicy.noCache,
                                          variables: {
                                            "id":  result.data!['getOrder']['order']['items'][index]
                                          }
                                      ),
                                      builder: (QueryResult itemsResult,
                                          {VoidCallback? refetch, FetchMore? fetchMore}) {
                                        return itemsResult.data == null
                                            ? const Center(child: CircularProgressIndicator())
                                            :Row(
                                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                          children: [
                                            Text(itemsResult.data!['item']['title']),
                                            Text(itemsResult.data!['item']['price'].toString()+",000 TND"),
                                          ],
                                        );
                                      }
                                  );
                                }
                            ),
                          ),
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text("Total items price",style: TextStyle(fontWeight: FontWeight.bold,),),
                            Text("${result.data?['getOrder']['order']['price'].toString()},000 TND",style: TextStyle(fontWeight: FontWeight.bold,)),
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text("Delivery fees",style: TextStyle(fontWeight: FontWeight.bold,),),
                            Text("+${result.data?['getOrder']['order']['deliveryFees'].toString()},000 TND",style: TextStyle(fontWeight: FontWeight.bold,)),
                          ],
                        ),
                        tools.HR("Total Price"),
                        Text("${result.data?['getOrder']['order']['totalPrice'].toString()},000 TND", style: const TextStyle(fontSize: 20.0,),),

                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 10),
                verifOrder(result.data?['getOrder']['order']['id'],tools.editText(result.data?['getOrder']['order']['status'].toString() as String)),
              ],
            ),
          );
        }
    );
  }
}
