# Copilot Instructions for App Airport

## Overview
This project is a full-stack web application for managing airport interventions, structured as a monorepo with two main components:
- **backend/**: Java Spring Boot REST API (Maven, MySQL)
- **frontend/**: Angular SPA (Angular CLI)
- **docker-compose.yml**: Orchestrates MySQL, backend, and frontend containers

## Architecture & Data Flow
- **Frontend** (`frontend/`):
  - Angular standalone components (see `src/app/problem/`, `campagny/`, `solution/`)
  - Uses services (e.g., `problem-service.ts`) to call backend REST endpoints (see `apiUrl` in services)
  - UI state and modals managed in component classes (e.g., `ProblemComponent`)
  - Styling uses modular CSS per feature (e.g., `problem.css`)
- **Backend** (`backend/`):
  - Spring Boot app exposing REST endpoints under `/api/*` (see `controller/`)
  - DTOs for request/response mapping (`dto/`), JPA entities (`model/`), and repositories (`repository/`)
  - Service layer (`service/`) handles business logic
  - MySQL database configured via `application.properties` and Docker
- **Integration**:
  - Frontend calls backend at `http://localhost:9090/api/*` (see CORS config in controllers)
  - Backend connects to MySQL (see `docker-compose.yml` for env vars)

## Developer Workflows
- **Build & Run (Local):**
  - Backend: `cd backend && ./mvnw spring-boot:run` (or use Docker)
  - Frontend: `cd frontend && ng serve`
  - Full stack (with DB): `docker-compose up --build`
- **Testing:**
  - Backend: `./mvnw test`
  - Frontend: `ng test` (unit), `ng e2e` (e2e)
- **Debugging:**
  - Backend: Standard Spring Boot debug tools
  - Frontend: Angular CLI dev server with HMR

## Project Conventions & Patterns
- **Angular:**
  - Use standalone components (see `@Component({ standalone: true })`)
  - Services are provided in root and injected via constructor
  - UI feedback (success/error) handled via boolean flags and modals
  - CSS is feature-scoped (e.g., `problem.css` for ProblemComponent)
- **Spring Boot:**
  - REST endpoints follow `/api/{entity}` pattern
  - DTOs used for input/output, not entities
  - CORS enabled for frontend dev (`@CrossOrigin`)
- **Docker:**
  - Use `docker-compose up` for full environment
  - MySQL data persisted via named volume

## Key Files & Directories
- `frontend/src/app/problem/` — Example of Angular feature module
- `backend/src/main/java/com/airoport/backend/controller/` — REST API controllers
- `docker-compose.yml` — Service orchestration and integration

## External Integrations
- MySQL (via Docker)
- Font Awesome & Google Fonts (imported in CSS)

---
For more details, see `frontend/README.md` and `backend/HELP.md`.
