import { HttpHeaders, HttpParams, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { environment } from '@env/environment';
import { BaseService } from './base.service';

interface ApiResponseModel {
  id: string;
  status: boolean;
  requestedDate: Date;
}

interface TestModel {
  id: string;
  name: string;
}

const mockAPIResponse: ApiResponseModel = {
  id: '123',
  requestedDate: new Date(),
  status: true,
};

const mockArrayResponse: ApiResponseModel[] = [mockAPIResponse];

const API_FAKE_RESOURCE = '/entity';

describe('BaseService', () => {
  let service: BaseService;
  let httpTestingController: HttpTestingController;
  const baseUrl = environment.API_URL;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseService,
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(BaseService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
  describe('getById', () => {
    it('make a GET request to the correct endpoint', (done) => {
      const endpoint = `${API_FAKE_RESOURCE}/123`;
      const expectedUrl = `${baseUrl}${endpoint}`;

      service.getById<ApiResponseModel>(endpoint).subscribe((response) => {
        expect(response).toEqual(mockAPIResponse);
        done();
      });

      const req = httpTestingController.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockAPIResponse);
    });

    it('include request options when provided', (done) => {
      const endpoint = `${API_FAKE_RESOURCE}/123`;
      const expectedUrl = `${baseUrl}${endpoint}`;
      const headers = new HttpHeaders().set('Authorization', 'Bearer token123');
      const params = new HttpParams().set('include', 'details');

      service.getById<ApiResponseModel>(endpoint, { headers, params }).subscribe((response) => {
        expect(response).toEqual(mockAPIResponse);
        done();
      });

      const req = httpTestingController.expectOne(
        (request) => request.url === expectedUrl && request.method === 'GET'
      );
      expect(req.request.headers.get('Authorization')).toBe('Bearer token123');
      expect(req.request.params.get('include')).toBe('details');
      req.flush(mockAPIResponse);
    });
  });

  describe('get', () => {
    it('make a GET request to the correct endpoint', (done) => {
      const endpoint = API_FAKE_RESOURCE;
      const expectedUrl = `${baseUrl}${endpoint}`;

      service.get<ApiResponseModel[]>(endpoint).subscribe((response) => {
        expect(response).toEqual(mockArrayResponse);
        done();
      });

      const req = httpTestingController.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockArrayResponse);
    });

    it('include request options when provided', (done) => {
      const endpoint = API_FAKE_RESOURCE;
      const expectedUrl = `${baseUrl}${endpoint}`;
      const headers = new HttpHeaders().set('X-Custom-Header', 'value');
      const params = new HttpParams().set('page', '1').set('limit', '10');

      service.get<ApiResponseModel[]>(endpoint, { headers, params }).subscribe((response) => {
        expect(response).toEqual(mockArrayResponse);
        done();
      });

      const req = httpTestingController.expectOne(
        (request) => request.url === expectedUrl && request.method === 'GET'
      );
      expect(req.request.headers.get('X-Custom-Header')).toBe('value');
      expect(req.request.params.get('page')).toBe('1');
      expect(req.request.params.get('limit')).toBe('10');
      req.flush(mockArrayResponse);
    });
  });

  describe('post', () => {
    it('make a POST request to the correct endpoint with body', (done) => {
      const endpoint = API_FAKE_RESOURCE;
      const expectedUrl = `${baseUrl}${endpoint}`;
      const body: TestModel = { id: '1', name: 'Test' };

      service.post<ApiResponseModel>(endpoint, body).subscribe((response) => {
        expect(response).toEqual(mockAPIResponse);
        done();
      });

      const req = httpTestingController.expectOne(expectedUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(body);
      req.flush(mockAPIResponse);
    });

    it('make a POST request without body when body is undefined', (done) => {
      const endpoint = API_FAKE_RESOURCE;
      const expectedUrl = `${baseUrl}${endpoint}`;

      service.post<ApiResponseModel>(endpoint).subscribe((response) => {
        expect(response).toEqual(mockAPIResponse);
        done();
      });

      const req = httpTestingController.expectOne(expectedUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBeNull();
      req.flush(mockAPIResponse);
    });

    it('include request options when provided', (done) => {
      const endpoint = API_FAKE_RESOURCE;
      const expectedUrl = `${baseUrl}${endpoint}`;
      const body: TestModel = { id: '1', name: 'Test' };
      const headers = new HttpHeaders().set('Content-Type', 'application/json');

      service.post<ApiResponseModel>(endpoint, body, { headers }).subscribe((response) => {
        expect(response).toEqual(mockAPIResponse);
        done();
      });

      const req = httpTestingController.expectOne(
        (request) => request.url === expectedUrl && request.method === 'POST'
      );
      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      expect(req.request.body).toEqual(body);
      req.flush(mockAPIResponse);
    });
  });

  describe('put', () => {
    it('make a PUT request to the correct endpoint', (done) => {
      const endpoint = `${API_FAKE_RESOURCE}/123`;
      const expectedUrl = `${baseUrl}${endpoint}`;

      service.put<ApiResponseModel>(endpoint).subscribe((response) => {
        expect(response).toEqual(mockAPIResponse);
        done();
      });

      const req = httpTestingController.expectOne(expectedUrl);
      expect(req.request.method).toBe('PUT');
      req.flush(mockAPIResponse);
    });

    it('include request options when provided', (done) => {
      const endpoint = `${API_FAKE_RESOURCE}/123`;
      const expectedUrl = `${baseUrl}${endpoint}`;
      const headers = new HttpHeaders().set('If-Match', 'etag123');
      const options = { headers };

      service.put<ApiResponseModel>(endpoint, options).subscribe((response) => {
        expect(response).toEqual(mockAPIResponse);
        done();
      });

      const req = httpTestingController.expectOne(
        (request) => request.url === expectedUrl && request.method === 'PUT'
      );
 
      expect(req.request.body).toEqual(options);
      req.flush(mockAPIResponse);
    });
  });

  describe('delete', () => {
    it('make a DELETE request to the correct endpoint', (done) => {
      const endpoint = `${API_FAKE_RESOURCE}/123`;
      const expectedUrl = `${baseUrl}${endpoint}`;

      service.delete<ApiResponseModel>(endpoint).subscribe((response) => {
        expect(response).toEqual(mockAPIResponse);
        done();
      });

      const req = httpTestingController.expectOne(expectedUrl);
      expect(req.request.method).toBe('DELETE');
      req.flush(mockAPIResponse);
    });

    it('include request options when provided', (done) => {
      const endpoint = `${API_FAKE_RESOURCE}/123`;
      const expectedUrl = `${baseUrl}${endpoint}`;
      const headers = new HttpHeaders().set('Authorization', 'Bearer token123');

      service.delete<ApiResponseModel>(endpoint, { headers }).subscribe((response) => {
        expect(response).toEqual(mockAPIResponse);
        done();
      });

      const req = httpTestingController.expectOne(
        (request) => request.url === expectedUrl && request.method === 'DELETE'
      );
      expect(req.request.headers.get('Authorization')).toBe('Bearer token123');
      req.flush(mockAPIResponse);
    });
  });

  describe('URL construction', () => {
    it('correctly concatenate base URL with endpoint', (done) => {
      const endpoint = '/test-endpoint';
      const expectedUrl = `${baseUrl}${endpoint}`;

      service.get(endpoint).subscribe(() => {
        done();
      });

      const req = httpTestingController.expectOne(expectedUrl);
      expect(req.request.url).toBe(expectedUrl);
      req.flush({});
    });

    it('handle endpoints with leading slash', (done) => {
      const endpoint = '/test-endpoint';
      const expectedUrl = `${baseUrl}${endpoint}`;

      service.get(endpoint).subscribe(() => {
        done();
      });

      const req = httpTestingController.expectOne(expectedUrl);
      expect(req.request.url).toBe(expectedUrl);
      req.flush({});
    });

    it('handle endpoints without leading slash', (done) => {
      const endpoint = 'test-endpoint';
      const expectedUrl = `${baseUrl}${endpoint}`;

      service.get(endpoint).subscribe(() => {
        done();
      });

      const req = httpTestingController.expectOne(expectedUrl);
      expect(req.request.url).toBe(expectedUrl);
      req.flush({});
    });
  });
});
