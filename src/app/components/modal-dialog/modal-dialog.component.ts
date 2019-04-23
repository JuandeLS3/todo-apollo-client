import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss']
})
export class ModalDialogComponent {

  active = false; // current display state

  @Input() heading: string; // inherited title value

  /**
   * Toogle dialog visibility state
   *
   * @param {boolean} [state]
   * @returns {boolean}
   * @memberof ModalDialogComponent
   */
  toggle(state?: boolean): boolean {
    if (typeof state !== undefined) {
      return this.active = state;
    }

    return this.active = !this.active;
  }
}
