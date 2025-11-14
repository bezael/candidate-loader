import { TestBed } from '@angular/core/testing';
import { BaseService } from '@api/services/base.service';
import { of, throwError } from 'rxjs';
import { Candidate, CandidateResponse } from '../models/candidate.model';
import { CandidateService } from './candidate.service';

type BaseServiceMock = Pick<BaseService, 'post'>;

describe('CandidateService', () => {
  let service: CandidateService;
  let baseService: jest.Mocked<BaseServiceMock>;
  const endpoint = '/candidates';

  const createCandidate = (overrides: Partial<Candidate> = {}): Candidate => {
    const file = new File(['content'], 'candidate.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    return {
      name: 'John',
      surname: 'Doe',
      file,
      ...overrides,
    };
  };

  beforeEach(() => {
    const baseServiceSpy: BaseServiceMock = {
      post: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        CandidateService,
        {
          provide: BaseService,
          useValue: baseServiceSpy,
        },
      ],
    });

    service = TestBed.inject(CandidateService);
    baseService = TestBed.inject(BaseService) as unknown as jest.Mocked<BaseServiceMock>;
  });

  describe('uploadCandidate', () => {
    it('delegate to BaseService.post with the endpoint and FormData built', (done) => {
      const candidate = createCandidate({
        name: 'Alice',
        surname: 'Johnson',
      });
      const expectedResponse: CandidateResponse = {
        name: 'Alice',
        surname: 'Johnson',
        seniority: 'senior',
        years: 8,
        availability: true,
      };
      baseService.post.mockReturnValue(of(expectedResponse));

      service.uploadCandidate(candidate).subscribe((response) => {
        expect(response).toEqual(expectedResponse);
        expect(baseService.post).toHaveBeenCalledWith(endpoint, expect.any(FormData));

        const [, formData] = baseService.post.mock.calls.at(-1)!;
        const typedFormData = formData as FormData;
        expect(typedFormData.get('name')).toBe(candidate.name);
        expect(typedFormData.get('surname')).toBe(candidate.surname);
        expect(typedFormData.get('file')).toBe(candidate.file);
        done();
      });
    });

    it('propagate errors if BaseService.post fails', (done) => {
      const candidate = createCandidate();
      const httpError = new Error('network error');
      baseService.post.mockReturnValue(throwError(() => httpError));

      service.uploadCandidate(candidate).subscribe({
        next: () => done.fail('Expected an error'),
        error: (error) => {
          expect(error).toBe(httpError);
          expect(baseService.post).toHaveBeenCalledWith(endpoint, expect.any(FormData));
          done();
        },
      });
    });
  });
});