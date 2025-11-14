import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnInit,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Candidate, CandidateResponse } from '@app/features/candidates/data/models/candidate.model';
import { CandidateService } from '@app/features/candidates/data/services/candidate.service';
import { FileValidationService } from '@app/features/candidates/data/services/file-validation.service';
import { catchError, finalize, Observable, of, tap } from 'rxjs';

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
  private readonly _fileValidationService = inject(FileValidationService);
  private readonly _candidateService = inject(CandidateService);

  ngOnInit(): void {
    this._buildForm();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this._startUpload();

    const candidate = this._getValuesForm();

    this._candidateService
      .uploadCandidate(candidate)
      .pipe(
        tap((response) =>   this.handleUploadSuccess(response )),
        catchError((err: unknown) => this._handleUploadError(err)),
        finalize(() => this.loading.set(false))
      )
      .subscribe();
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

  private _startUpload(): void {
    this.loading.set(true);
    this.error.set(null);
  }

  private _getValuesForm(): Candidate {
    const formValue = this.form.value;
    const { name, surname, file } = formValue;
    return {
      name,
      surname,
      file,
    };
  }
  private _handleUploadError(err: unknown): Observable<CandidateResponse | null> {
    const errorMessage = err instanceof Error ? err.message : 'Error uploading candidate';
    this.error.set(errorMessage);
    return of(null);
  }

  private handleUploadSuccess(response: CandidateResponse): void {
    this.candidateUploaded.emit(response);
    this._resetForm();
  }

  private _resetForm(): void {
    this.form.reset();
    this.selectedFileName.set(null);
    this.error.set(null);
    this._clearFileInput();
  }

  private _clearFileInput(): void {
    const fileInputRef = this.fileInput();
    if (fileInputRef?.nativeElement) {
      fileInputRef.nativeElement.value = '';
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
