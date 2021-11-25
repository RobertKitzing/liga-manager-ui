import {ApolloModule} from 'apollo-angular';
import {HttpLinkModule} from 'apollo-angular/http';
import { NgModule } from '@angular/core';


import { GraphqlService } from './services/graphql.service';
import { GraphqlSubscriptionService } from './services/graphql-subscription.service';

@NgModule({
  exports: [
    ApolloModule,
    HttpLinkModule
  ],
  providers: [
    GraphqlSubscriptionService,
    GraphqlService
  ],
})
export class GraphQLModule { }
