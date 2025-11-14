import { ChangeDetectionStrategy, Component, ElementRef, inject, OnInit, output, signal, viewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CandidateResponse } from '@app/features/candidates/data/models/candidate.model';
import { FileValidationService } from '@app/features/candidates/data/services/file-validation.service';


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

  readonly candidateUploaded = output<CandidateResponse>();

  public form!: FormGroup;
  private _formBuilder = inject(FormBuilder);
  private _fileValidationService = inject(FileValidationService);
  
  ngOnInit(): void {
    this._buildForm();
  }

  onSubmit(): void {
    console.log(this.form.value);
  }

   onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const validationResult = this._fileValidationService.validateFile(file);

      if (!validationResult.isValid) {
        this.error.set(validationResult.error || 'Invalid file');
        this.form.patchValue({ file: null });
        this.selectedFileName.set(null);
        input.value = '';
        return;
      }

      this.form.patchValue({ file });
      this.form.get('file')?.markAsTouched();
      this.selectedFileName.set(file.name);
      this.error.set(null);
    }
  }

  private _buildForm(): void {
    this.form = this._formBuilder.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      file: [null, [Validators.required]],
    });
  }
}
