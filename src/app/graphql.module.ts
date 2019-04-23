import { Apollo } from 'apollo-angular';
import { ApolloModule } from 'apollo-angular';
import { getMainDefinition } from 'apollo-utilities';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { NgModule } from '@angular/core';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';

/**
 * This module provides Apollo Module configuration
 *
 * To learn more about subscriptions and GraphQl WebSockets configuration, visit:
 * https://www.apollographql.com/docs/angular/features/subscriptions
 *
 * @export
 * @class GraphQLModule
 */
@NgModule({
  exports: [ApolloModule, HttpLinkModule]
})
export class GraphQLModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    // Create an http link:
    const http = httpLink.create({
      uri: 'https://todo-apollo-server.herokuapp.com/'
    });

    // Create a WebSocket link:
    const ws = new WebSocketLink({
      uri: `wss://todo-apollo-server.herokuapp.com/graphql`,
      options: {
        reconnect: true
      }
    });

    // using the ability to split links, you can send data to each link
    // depending on what kind of operation is being sent
    const link = split(
      // split based on operation type
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      ws,
      http,
    );

    apollo.create({
      link,
      cache: new InMemoryCache(),
    });
  }
}
