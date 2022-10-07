// ignore_for_file: file_names, prefer_if_null_operators, prefer_typing_uninitialized_variables

import "package:flutter/material.dart";
import "package:graphql_flutter/graphql_flutter.dart";

class GraphQLConfiguration {
  static String token ="";
  static String url = 'http://192.168.1.124:3333/graphql';
  static HttpLink httpLink = HttpLink(url);
  static AuthLink authLink = AuthLink(getToken: () async {
    return token;
  });

  static void setToken(String T) {
    token = 'Bearer ' + T;
  }

  static final WebSocketLink webSocketLink = WebSocketLink(
    url,config: SocketClientConfig(
    autoReconnect: true,
    inactivityTimeout: Duration(seconds: 10),
    initialPayload: {
      "headers": {"Authorization": token}
    }
  )
  );

  static final Link link = authLink.concat(httpLink).concat(webSocketLink);

  static ValueNotifier<GraphQLClient> initializeClient(String Token){
    Token = token;
    ValueNotifier<GraphQLClient> client = ValueNotifier(
      GraphQLClient(
        link: link,
        cache: GraphQLCache(store: HiveStore()),
      ),
    );
    return client;
  }
}
