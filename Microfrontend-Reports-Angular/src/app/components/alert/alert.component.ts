import { Component, Input } from '@angular/core';
import { AlertState } from '../../interfaces/state.interface';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
})
export class AlertComponent {
  @Input({ required: true }) alertState!: AlertState;
  @Input() text = '';

  getClass(): string {
    return `alert alert-${this.alertState === 'error' ? 'danger' : 'primary'} d-flex align-items-center`;
  }
}
