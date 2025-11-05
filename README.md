# Airport Intervention Management Platform

An end-to-end platform for managing airport maintenance operations. The project pairs an Angular 20 frontend with a Spring Boot 3 backend to help administrators and technicians track equipment, zones, counters, projects, problems, solutions, interventions, and reporting dashboards.

## Features
- **Role-aware UX**: Angular standalone components guarded by authentication and role-based access; admins manage data, technicians land on a dedicated home view.
- **Entity management**: CRUD flows for airports, companies, zones, counters, equipment, projects, problems, solutions, technicians, and interventions.
- **Reporting & analytics**: Monthly trends, breakdowns by equipment/problem/project, Mean Time Between Failures (MTBF) calculations, and on-demand CSV exports.
- **Internationalisation**: Built-in `LangService` toggles French/English labels across screens.
- **Session handling**: Simple token-based login backed by Spring Boot with in-memory session storage (ready to swap for a persistent provider).
- **Container-ready**: Dockerfiles for both halves plus a `docker-compose.yml` that provisions MySQL, the backend API, and the compiled frontend in Nginx.

## Tech Stack
- **Frontend**: Angular 20 (standalone components, Angular Router, RxJS, Karma/Jasmine testing).
- **Backend**: Spring Boot 3.5 (Web, Data JPA), Java 21, Maven, MySQL 8.
- **Tooling**: Docker, Docker Compose, Angular CLI, npm.

## Project Structure

```text
App airport/
├─ backend/                  # Spring Boot service
│  ├─ src/main/java/com/airoport/backend
│  │  ├─ controller/         # REST controllers (auth, reports, entities, ...)
│  │  ├─ service/            # Business logic and reporting calculations
│  │  ├─ repository/         # Spring Data JPA repositories
│  │  ├─ model/              # Entities (Aeroport, Campagny, Zone, Comptoire, Technicien, ...)
│  │  └─ dto/                # Transport objects (LoginResponse, ChartDataDTO, ...)
│  ├─ src/main/resources/    # application.properties, templates
│  ├─ pom.xml
│  └─ Dockerfile
├─ frontend/                 # Angular workspace (standalone app configuration)
│  ├─ src/app/               # Components, routes, guards, services
│  ├─ angular.json
│  ├─ package.json
│  └─ Dockerfile
├─ docker-compose.yml        # Optional stack: MySQL + backend + frontend
└─ .github/                  # Automation & IDE helpers
```

## Prerequisites
- Node.js 20+ (matches the Docker build stage) and npm.
- Angular CLI 20 (`npm install -g @angular/cli`).
- Java 21+ and Maven 3.9+.
- MySQL 8 (or Docker with the official image).
- Docker Desktop (optional, for containerised runs).

## Configuration
- Default database name is `intervention`. Create it manually when running MySQL locally.
- `backend/src/main/resources/application.properties` uses:
  - `spring.datasource.username=root`
  - `spring.datasource.password=` (empty by default for local dev)
  - `spring.jpa.hibernate.ddl-auto=create-drop` (resets schema on each run; switch to `update` or `validate` before shipping to production).
- Override credentials via environment variables (`SPRING_DATASOURCE_*`) when running in containers or other environments.
- The frontend talks to the API at `http://localhost:9090/api`. Adjust service URLs if hosting elsewhere.

## Local Development

1. **Start MySQL**
   ```bash
   mysql -u root -p
   CREATE DATABASE intervention;
   ```

2. **Backend**
   ```bash
   cd backend
   mvn spring-boot:run
   ```
   The API is available at `http://localhost:9090`. Swagger is not bundled; use tools such as Postman for manual calls.

3. **Frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```
   The Angular dev server listens on `http://localhost:4200` and proxies calls directly to the backend.

## Docker Compose Workflow

Build and run the whole stack (MySQL + backend + frontend) with:
```bash
docker-compose up --build
```

- MySQL is exposed on `localhost:3306` with `root/root`.
- The backend is available at `http://localhost:9090`.
- The production build of the frontend is served from Nginx at `http://localhost:4200`.
- Data is persisted to a named volume `mysql-data`.

## Testing
- **Backend**: `cd backend && mvn test`
- **Frontend**: `cd frontend && npm test` (runs Karma + Jasmine in watch mode)

## API Surface (Highlights)

| Resource        | Endpoint                            | Methods            | Notes |
|-----------------|-------------------------------------|--------------------|-------|
| Auth            | `/api/auth/login`, `/api/auth/logout` | `POST`             | UUID token stored in-memory; include `X-Auth-Token` on logout. |
| Technicians     | `/api/techniciens`                  | `GET, POST, PUT, DELETE` | Manages technician roster and their roles (`admin`/`technicien`). |
| Airports        | `/api/aeroports`                    | CRUD               | Links technicians to airports. |
| Zones & Counters| `/api/zones`, `/api/comptoires`     | CRUD + validation  | Prevents deleting zones with existing counters. |
| Equipment       | `/api/equipements`                  | CRUD               | Used by intervention reporting. |
| Projects        | `/api/projects`                     | CRUD               | Associates with interventions and reporting filters. |
| Problems/Solutions | `/api/problems`, `/api/solutions`| CRUD               | Catalogues recurring issues and corrective actions. |
| Interventions   | `/api/interventions`                | CRUD + filtering   | Central event log; DTO supports project, equipment, problem, and technician links. |
| Reporting       | `/api/reporting/...`                | `GET`              | Monthly trends, equipment/problem/project breakdowns, MTBF stats, CSV downloads. |

> All controllers are annotated with `@CrossOrigin(origins = "http://localhost:4200")` for local development. Tighten this list before deploying.

## Frontend Notes
- Routes are declared in `frontend/src/app/app.routes.ts`. Guards enforce authentication and role access.
- `LangService` toggles the UI between French and English strings; extend `translations` to add new locales.
- Services in `frontend/src/app/*/*-service.ts` encapsulate HTTP calls; update `apiUrl` values when relocating the backend.
- Technicians can view their home dashboard at `/technicien-home`; admins access the management area under `/`.

## Security & Production Checklist
- Replace in-memory tokens with a persistent/session-backed solution (e.g., Spring Security + JWT).
- Hash technician passwords (currently stored in plain text).
- Review `spring.jpa.hibernate.ddl-auto` to avoid data loss and configure Flyway/Liquibase for migrations.
- Configure CORS origins, HTTPS, and environment-specific secrets.
- Add frontend environment files (`environment.ts`) to drive API URLs and feature flags per deployment.

## Useful Commands
- Format Angular code with `npm run lint` or `ng lint` (add a script if desired).
- Regenerate the Angular production build: `npm run build`.
- Package the backend jar: `mvn clean package`.

## Contributing
1. Fork and clone the repository.
2. Create a feature branch from `main`.
3. Make your changes with clear commits and accompanying tests where possible.
4. Open a pull request describing the motivation and testing steps.

---

Need help or found a bug? Open an issue or reach out to the maintainers listed in your team documentation.
