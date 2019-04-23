import { Component, OnInit, Input, SimpleChanges, OnChanges, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GraphqlService } from 'src/app/services/graphql.service';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnChanges {

  @Input() todo; // inherited Todo object value
  @ViewChild("updateCommentModalDialog") commentDialog: ModalDialogComponent; // template element reference

  comments: Comment[] = []; // Current Comment object list

  // Angular FromGroup object for UpdateComment form declaration
  updateCommentFormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
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
   * @memberof CommentsComponent
   */
  ngOnInit() {
    this.setComments();
  }

  /**
   * This method will be executed automatically on Component @Input changes
   *
   * @memberof CommentsComponent
   */
  ngOnChanges(changes: SimpleChanges) {
    this.setComments();
  }

  /**
   * Extract and store Comment objects as local var
   *
   * @private
   * @memberof CommentsComponent
   */
  private setComments(): void {
    // Set comments based on "todo" object
    if (this.todo && this.todo.comments) {
      this.comments = this.todo.comments;
    }
  }

  /**
   * Show modal dialog for comment edition
   *
   * @param {Comment} comment
   * @memberof CommentsComponent
   */
  edit(comment: Comment): void {
    this.updateCommentFormGroup.reset(); // clean form

    // Fill Todo Update form with values
    const fields = Object.keys(this.updateCommentFormGroup.controls);
    const values = fields.reduce((acc, cur) => {
      acc[cur] = comment[cur];
      return acc;
    }, {});

    // Update form with resultant object values
    this.updateCommentFormGroup.setValue(values); // fill form
    this.commentDialog.toggle(true); // open modal dialog
  }

  /**
   * UpdateComment Form submit handler
   *
   * @memberof CommentsComponent
   */
  commentFormSubmit(): void {
    // Deconstruct form value object into separated vars
    const { id, title, author, description } = this.updateCommentFormGroup.value;

    this.graphqlService.updateComment(
      this.todo.id,
      id,
      title,
      author,
      description
    ).subscribe(
      todo => {
        console.log('UpdateComment Mutation result:', todo);
        this.updateCommentFormGroup.reset(); // clean form
        this.commentDialog.toggle(); // close modal dialog
      },
      err => {
        console.error(err);
      }
    );
  }

}
