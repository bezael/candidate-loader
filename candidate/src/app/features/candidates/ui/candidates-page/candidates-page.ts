import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CandidateResponse } from '@app/features/candidates/data/models/candidate.model';
import { CandidateForm } from '@app/features/candidates/ui/candidates-form/candidate-form';

@Component({
  selector: 'app-candidates-page',
  imports: [CandidateForm, JsonPipe],
  template: ` <div class="candidates-page">
    <app-candidate-form (candidateUploaded)="onCandidateUploaded($event)" />
    <pre>{{ allCandidates() | json }}</pre>
  </div>`,
  styleUrl: './candidates-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidatesPage {
  private readonly _candidate = signal<CandidateResponse[]>([]);

  public readonly allCandidates = computed<CandidateResponse[]>(() => {
    const newOne = this._candidate();
    return [...newOne];
  });

  public onCandidateUploaded(candidate: CandidateResponse): void {
    this._candidate.update((current: CandidateResponse[]) => [...current, candidate]);
  }
}
