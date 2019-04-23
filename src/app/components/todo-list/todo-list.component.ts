import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GraphqlService } from '../../services/graphql.service';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { Todo } from '../../types/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos: Todo[] = []; // Current Todo object list

  @ViewChild("addTodoModalDialog") dialog: ModalDialogComponent; // template element reference

  // Angular FromGroup object for AddTodo form declaration
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
    // Fetch list of Todo objects
    this.graphqlService.todos.subscribe(todos => {
      this.todos = todos;
    });
  }

  /**
   * AddTodo Form submit handler
   *
   * @memberof TodoListComponent
   */
  todoFormSubmit(): void {
    // Deconstruct form value object into separated vars
    const { title, author, description } = this.addTodoFormGroup.value;

    this.graphqlService.addTodo(
      title,
      author,
      description
    ).subscribe(
      todo => {
        /*
        Append resultant Todo object to current Todo object list,
        this way there is no need to fetch data again.
        */
        this.todos.push(todo);
        this.addTodoFormGroup.reset(); // clean form
        this.dialog.toggle(); // close modal dialog
      },
      err => {
        console.error(err);
      }
    );
  }

}
