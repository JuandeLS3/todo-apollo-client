import { Component, OnInit } from '@angular/core';

import { GraphqlService } from '../../services/graphql.service';
import { Todo } from '../../types/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos: Todo[] = []; // Current "todo" object list

  constructor(
    private graphqlService: GraphqlService
  ) { }

  /**
   * This method will be executed automatically on Component Init
   *
   * @memberof TodoListComponent
   */
  ngOnInit(): void {
    // Fetch list of "todo" items from graphql server using service
    this.graphqlService.todos.subscribe(todos => {
      // Store list of "todo" object in current execution environment
      this.todos = todos;
    });
  }

}
