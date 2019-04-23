import { Component, OnInit, ViewChild } from '@angular/core';

import { GraphqlService } from '../../services/graphql.service';
import { Todo } from '../../types/todo';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos: Todo[] = []; // Current "todo" object list

  @ViewChild("addTodoModalDialog") dialog: ModalDialogComponent;

  addTodoFormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    description: new FormControl()
  });

  constructor(
    private graphqlService: GraphqlService
  ) { }

  /**
   * This method will be executed automatically on Component Init
   *
   * @memberof TodoListComponent
   */
  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    // Fetch list of "todo" items from graphql server using service
    this.graphqlService.todos.subscribe(todos => {
      // Store list of "todo" object in current execution environment
      this.todos = todos;
    });
  }

  todoFormSubmit(): void {
    const { title, author, description } = this.addTodoFormGroup.value;

    this.graphqlService.addTodo(
      title, author, description
    ).subscribe(
      todo => {
        this.todos.push(todo);
        this.addTodoFormGroup.reset();
        this.dialog.toggle();
      },
      err => {
        console.error(err);
      }
    );
  }

}
