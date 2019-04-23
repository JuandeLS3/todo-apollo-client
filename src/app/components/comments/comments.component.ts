import { Component, OnInit, Input, SimpleChanges, OnChanges, ViewChild } from '@angular/core';
import { GraphqlService } from 'src/app/services/graphql.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnChanges {

  @Input() todo;
  @ViewChild("updateCommentModalDialog") commentDialog: ModalDialogComponent;

  comments: Comment[] = [];

  updateCommentFormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    description: new FormControl()
  });

  constructor(
    private graphqlService: GraphqlService
  ) { }

  ngOnInit() {
    this.setComments();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setComments();
  }

  private setComments(): void {
    // Set comments based on "todo" object
    if (this.todo && this.todo.comments) {
      this.comments = this.todo.comments;
    }
  }

  edit(comment: Comment): void {
    this.updateCommentFormGroup.reset();

    // Fill Todo Update form with values by creating object of type {[<fieldName>]: <value>}
    const fields = Object.keys(this.updateCommentFormGroup.controls);
    const values = fields.reduce((acc, cur) => {
      acc[cur] = comment[cur];
      return acc;
    }, {});

    // update form with resultant object values
    this.updateCommentFormGroup.setValue(values);
    this.commentDialog.toggle(true);
  }

  commentFormSubmit(): void {
    const { id, title, author, description } = this.updateCommentFormGroup.value;

    this.graphqlService.updateComment(
      this.todo.id, id, title, author, description
    ).subscribe(
      todo => {
        this.todo = todo;
        this.setComments();
        this.updateCommentFormGroup.reset();
        this.commentDialog.toggle();
      },
      err => {
        console.error(err);
      }
    );
  }

}
