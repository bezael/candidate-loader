import { Injectable, inject } from '@angular/core';
import { BaseService } from '@api/services/base.service';
import { Observable } from 'rxjs';
import { Candidate, CandidateResponse } from '../models/candidate.model';


@Injectable({ providedIn: 'root' })
export class CandidateService {
  private readonly _baseService = inject(BaseService);
  private readonly _endpoint = '/candidates';

  public uploadCandidate(candidate: Candidate): Observable<CandidateResponse> {
    const formData = this._buildFormData(candidate);
    return this._baseService.post<CandidateResponse>(this._endpoint, formData);
  }

  private _buildFormData(candidate: Candidate): FormData {
    const { name, surname, file } = candidate;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('file', file);
    return formData;
  }
}
