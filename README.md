# Candidate Loader – Technical Test

Angular frontend application to load candidates via an Excel file and display the processed result returned by a backend.

## Functional Summary

- **Candidate form**: captures `name`, `surname`, and an Excel file.
- **File validation**: validates extension and maximum size before calling the backend.
- **Backend submission**: builds a `FormData` with the form fields and the file.
- **Results visualization**: the backend response (`CandidateResponse`) is displayed in a table with information about seniority, years of experience, and availability.

## Architecture and Technical Decisions

- **Main stack**  
  - Angular 20 (standalone components, no NgModules).  
  - Angular Material for UI (`MatFormField`, `MatInput`, `MatButton`, `MatTable`).  
  - Reactive forms (`ReactiveFormsModule`).  
  - RxJS for handling asynchronous flows.  
  - Change detection with `ChangeDetectionStrategy.OnPush` to optimize performance.

- **Backend communication**  
  - A base service `BaseService` is used that implements `BaseInterface` (located in `src/app/api`), so that the candidate service (`CandidateService`) depends on an **abstraction** and not directly on `HttpClient`.  
  - `CandidateService` focuses solely on candidate logic and delegates HTTP infrastructure to `BaseService`.

- **Components and UI state management**  
  - `CandidateFormComponent`  
    - Standalone, `OnPush`, uses `ReactiveFormsModule`.  
    - Form with `FormGroup` for `name`, `surname`, `file`.  
    - Uses `FileValidationService` in `onFileSelected` to validate the file before updating the form.  
    - Controls UI state through **signals**: `loading`, `error`, `selectedFileName`.  
    - Exposes an `output` `candidateUploaded` that emits the `CandidateResponse` to the parent component when the backend responds correctly.  
    - Handles errors with `catchError` and closes the flow with `finalize` to always clean up `loading`.  
  - `CandidateTableComponent`  
    - Standalone, `OnPush`.  
    - Receives the results list through an `input.required<CandidateResponse[]>()`.  
    - Defines `displayedColumns` with the visible table columns.

- **Testing**  
  - `BaseService` is covered by unit tests where `HttpClient` is mocked and HTTP requests are verified to be constructed correctly (URLs, methods, headers, params, etc.).  
  - The dependency on `BaseService` through `BaseInterface` facilitates testing domain services (such as `CandidateService`) in isolation.

## Prerequisites

- Node.js (LTS version recommended).  
- `npm` installed.  
- Backend available with an `npm start` script in a sibling folder `../candidate-api` (you can adjust the path if your backend is elsewhere).

## Installation

```bash
npm install
```

This will install all necessary dependencies to run the frontend and associated scripts.

## Project Startup

- **Frontend only (Angular dev server)**  

```bash
npm run start
```

The application will be available at `http://localhost:4200/`.

- **Frontend + Backend simultaneously**  

A script has been added to start frontend and backend in parallel from the frontend project.

```bash
npm run start:dev
```

This script assumes that:

- The backend lives in a folder `../candidate-api` relative to the frontend project.  
- The backend exposes a `start` script in its own `package.json` (for example: `"start": "node src/main.js"` or similar).

If your backend is in another path or the script is named differently, you just need to adjust the `start:back` command in `package.json`.

## Available NPM Scripts

- **`npm run start`**: starts only the frontend with `ng serve`.  
- **`npm run start:front`**: alias for `ng serve`, intended to be used by other scripts.  
- **`npm run start:back`**: enters `../backend` and runs `npm run start` (adjustable path).  
- **`npm run start:dev`**: starts **frontend and backend in parallel** using `concurrently`.  
- **`npm run build`**: builds the application for production (`dist/`).  
- **`npm run test`**: runs the configured unit tests (Karma/Jasmine).

## Key Technical Decisions

- **Standalone components and Signals**: the use of NgModules and classic `@Input()` has been avoided, favoring standalone components and the signals API (`input`, `output`, `signal`) to align with modern Angular recommendations.  
- **Layer separation (data / ui)**: data access and validation logic is kept outside presentation components to facilitate testing, reusability, and maintainability.   
- **Reactive forms**: reactive forms are used for greater control over validation, state, and scalability in complex forms.  
- **Performance optimization**: `ChangeDetectionStrategy.OnPush` and use of signals minimize unnecessary renders in the UI.



