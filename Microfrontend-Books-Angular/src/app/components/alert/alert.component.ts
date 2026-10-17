import { Component, Input } from '@angular/core';
import { IconAtom } from '@brejcha13320/design-system-bootstrap';
import { AlertState } from '../../interfaces/state.interface';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  imports: [IconAtom]
})
export class AlertComponent {
  @Input({ required: true }) alertState!: AlertState;
  @Input() text = '';

  readonly alertClassMap: Record<AlertState, 'primary' | 'danger'> = {
    loading: 'primary',
    error: 'danger'
  };

  getClass(): string {
    return `alert alert-${this.alertClassMap[this.alertState]} d-flex align-items-center`;
  }
}
