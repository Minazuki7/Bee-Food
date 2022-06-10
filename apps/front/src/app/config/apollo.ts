/* eslint-disable no-console */
import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  Observable,
  Operation,
  createHttpLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

let token = "";

export function setToken(nextToken: string) {
  token = nextToken;
}

export function getToken() {
  return token;
}

const request = async (operation: Operation) => {
  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
};

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle: any | undefined;
      Promise.resolve(operation)
        .then((oper) => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

export default new ApolloClient({
  link: ApolloLink.from([
    requestLink,
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      }
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    createHttpLink({
      uri: process.env.NX_API_URL,
    }),
  ]),
  cache: new InMemoryCache({
    dataIdFromObject: (o: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      o.id ? `${o.__typename}-${o.id}` : `${o.__typename}-${o.cursor}`;
    },
  } as any),
});
