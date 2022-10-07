import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import '../screens/MyOrders.dart';
import '../screens/Orders.dart';
import '../components/Cont.dart';
import '../components/tools.dart';
import 'get.dart';

class DriversOrderList extends StatefulWidget {
  const DriversOrderList({Key? key}) : super(key: key);

  @override
  State<DriversOrderList> createState() => _DriversOrderListState();
}

class _DriversOrderListState extends State<DriversOrderList> {


  @override
  void initState() {
    Get.getLoginNeeds();
    super.initState();
  }

  Future<void> _refresh() async {
    WidgetsBinding.instance.addPostFrameCallback((_){
      Navigator.push(context, MaterialPageRoute(builder: (context) => const MyOrders()));
    });
  }

  String query = r'''
  query($driver:String!){
    DriversOrders(driver:$driver){  
    id
    totalPrice
    status
    branch{name}
    }
  }
  ''';
  @override
  Widget build(BuildContext context) {
    return Query(
        options: QueryOptions(
          document: gql(query),
          variables: {
            "driver": Get.id
          },
          fetchPolicy: FetchPolicy.noCache,
        ),
        builder: (QueryResult result,
            {VoidCallback? refetch, FetchMore? fetchMore}) {
          print(result);
          if (result.isLoading) {
            return Container(
              height: 600,
              child: const Center(
                child: CircularProgressIndicator()),
            );
          }else if(result.data == null) {
             WidgetsBinding.instance.addPostFrameCallback((_){
              Navigator.push(context, MaterialPageRoute(builder: (context) => const MyOrders()));
            });
            return const CircularProgressIndicator();
          }else {
            return Container(
            height: 600,
            child: result.data!['DriversOrders'].length == 0?
            Container(
              height: 600,
              child: const Center(
                  child: Text("You don't have deliveries yet!"))
            ):
            RefreshIndicator(onRefresh: _refresh,
              child: SizedBox(
                height: MediaQuery.of(context).size.height,
                width: MediaQuery.of(context).size.width,
                child: ListView.builder(
                    itemCount: result.data!['DriversOrders'].length,
                    itemBuilder: (context, index) {
                      return result.data!['DriversOrders'][index]['status'] == null?const Center(child: CircularProgressIndicator()):Cont.ContentContainer(
                        height: 80,
                        width: MediaQuery.of(context).size.width,
                        content: ListTile(
                          title: Text("Ordering from : ${result.data!['DriversOrders'][index]['branch']['name'].toString()}"),
                          subtitle: Text("For the client: ${result.data!['DriversOrders'][index]['totalPrice'].toString()},000 TND"),
                          trailing: Text(tools.editText(result.data!['DriversOrders'][index]['status'].toString())),
                          onTap: () {
                            Navigator.push(context, MaterialPageRoute(builder: (context) => Order(result.data!['DriversOrders'][index]['id'].toString())));},
                        ),
                      );
                    }
                ),
              ),
            ),
          );
          }
        }
    );
  }
}
