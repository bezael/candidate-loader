import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-candidates-page',
  imports: [],
  template: `<p>candidates-page works!</p>`,
  styleUrl: './candidates-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidatesPage { }
