import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CandidateResponse } from '@app/features/candidates/data/models/candidate.model';
import { CandidateList } from '@app/features/candidates/ui/candidate-list/candidate-list';
import { CandidateForm } from '@app/features/candidates/ui/candidates-form/candidate-form';

@Component({
  selector: 'app-candidates-page',
  imports: [CandidateForm, CandidateList],
  template: ` 
  <div class="candidates-page">
    <app-candidate-form (candidateUploaded)="onCandidateUploaded($event)" />
    <app-candidate-list [candidates]="allCandidates()" />
  </div>`,
  styleUrl: './candidates-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidatesPage {
  private readonly newCandidates = signal<CandidateResponse[]>([]);

  public readonly allCandidates = computed(() => {
    const initial: CandidateResponse[] = [];
    const newOnes = this.newCandidates();
    return [...initial, ...newOnes];
  });

   onCandidateUploaded(candidate: CandidateResponse): void {
    this.newCandidates.update((current: CandidateResponse[]) => [...current, candidate]);
  }
}
