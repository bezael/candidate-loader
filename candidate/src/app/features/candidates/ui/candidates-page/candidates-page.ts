import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CandidateForm } from '@app/features/candidates/ui/candidates-form/candidate-form';

@Component({
  selector: 'app-candidates-page',
  imports: [CandidateForm],
  template: ` 
  <div class="candidates-page">
    <app-candidate-form  />
  </div>`,
  styleUrl: './candidates-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidatesPage {}
