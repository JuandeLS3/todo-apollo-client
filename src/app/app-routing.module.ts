import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoDetailsComponent } from './components/todo-details/todo-details.component';

// Application routes configuration
const routes: Routes = [
  {path: 'todos', component: TodoListComponent},
  {path: 'todo/:id', component: TodoDetailsComponent},
  {path: '**', redirectTo: 'todos', pathMatch: 'full'} // redirect any other path to "todo" page
];

/**
 * This Module provides routes configuration for the application
 *
 * @export
 * @class AppRoutingModule
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
