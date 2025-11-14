import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CandidateResponse } from '@app/features/candidates/data/models/candidate.model';
import { CandidateTable } from '@app/features/candidates/ui/candidate-table/candidate-table';

@Component({
  selector: 'app-candidate-list',
  imports: [CandidateTable, MatProgressSpinnerModule],
  templateUrl: './candidate-list.html',
  styleUrl: './candidate-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidateList {
  readonly error = signal<string | null>(null);
  readonly loading = signal<boolean>(false);
  readonly displayedColumns = signal<string[]>(['name', 'surname', 'seniority', 'years', 'availability']);
  
  readonly candidates = input.required<CandidateResponse[]>();
  readonly displayedCandidates = computed<CandidateResponse[]>(() => this.candidates());
}
