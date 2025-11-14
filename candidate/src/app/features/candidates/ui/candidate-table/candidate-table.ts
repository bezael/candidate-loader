import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CandidateResponse } from '@app/features/candidates/data/models/candidate.model';

@Component({
  selector: 'app-candidate-table',
  imports: [MatTableModule],
  templateUrl: './candidate-table.html',
  styleUrl: './candidate-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidateTable {
  readonly candidates = input.required<CandidateResponse[]>();
  readonly displayedColumns = input.required<string[]>();
}
