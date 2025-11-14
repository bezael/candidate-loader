import { ChangeDetectionStrategy, Component, ElementRef, inject, OnInit, signal, viewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-candidate-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './candidate-form.html',
  styleUrl: './candidate-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidateForm implements OnInit {
  public readonly fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');

  public readonly loading = signal<boolean>(false);
  public readonly error = signal<string | null>(null);
  public readonly selectedFileName = signal<string | null>(null);

  public form!: FormGroup;
  private _formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this._buildForm();
  }
  
  onSubmit(): void {
    console.log(this.form.value);
  }

  onFileSelected(event: Event): void {
    console.log((event.target as HTMLInputElement).files?.[0]);
  }

  private _buildForm(): void {
    this.form = this._formBuilder.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      file: [null, [Validators.required]],
    });
  }
}
