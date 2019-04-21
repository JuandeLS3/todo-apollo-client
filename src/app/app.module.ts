import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { GraphqlService } from './services/graphql.service';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoDetailsComponent } from './components/todo-details/todo-details.component';
import { CommentsComponent } from './components/comments/comments.component';

/**
 * Both TodoListComponent and TodoDetailsComponent
 * should be assigned to "declarations" array so they can be used in our app
 *
 * Our custom GraphqlService should be added to "providers" array
 * so all of the application references to this service
 * use a single instance of GraphqlService.
 *
 * @export
 * @class AppModule
 */
@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoDetailsComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [ GraphqlService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
