# ✈️ Airport Intervention Management System (v2)


A full-stack web application for managing airport interventions, equipment, projects, and operational activities. This document provides a comprehensive overview of the project architecture, features, and setup instructions.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Architecture](#architecture)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

The Airport Intervention Management System is a complete solution designed to streamline airport operations. It provides a robust platform for tracking equipment, managing interventions, coordinating projects, and monitoring airport zones and counters.

### Key Capabilities

- **Equipment Management**: Track equipment inventory, entries, and exits.
- **Intervention Tracking**: Monitor open and closed interventions with detailed status updates.
- **Project Coordination**: Manage ongoing and completed projects, including equipment allocation.
- **Zone & Counter Management**: Organize airport zones and their associated counters.
- **Company Management**: Maintain a directory of airline companies.
- **Dashboard Analytics**: Get a real-time overview of all airport operations.
- **Multi-language Support**: Switch between French and English.

## ✨ Features

### 🏠 Dashboard
- Real-time statistics for equipment, airports, interventions, and projects.
- A feed of recent activities with color-coded status indicators.
- Quick action buttons for common tasks.
- Fully responsive design for all device types.

### 🔧 Equipment Module
- Add, edit, and delete equipment records.
- Track equipment quantities and locations.
- Search and filter functionality.
- Assign equipment to specific projects.

### 🛠️ Intervention Management
- Create and manage intervention records.
- Associate problems and solutions with each intervention.
- Track the status of interventions (open/closed).
- Link interventions to companies and zones.

### 📊 Project Management
- Create projects with multiple equipment assignments.
- Track project progress from start to finish.
- Manage equipment allocation for each project.
- View project history and detailed information.

### 🏢 Administrative Features
- Zone management with hierarchical counter assignment.
- Company (airline) management.
- A catalog for managing common problems and solutions.
- Comptoir (counter) management within zones.

### 🌐 User Interface
- A modern and intuitive design.
- Gradient backgrounds and smooth animations.
- Font Awesome icons used throughout the application.
- Responsive tables and forms.
- Modal dialogs for creating and editing items.

## 🛠️ Technology Stack

### Frontend
- **Framework**: Angular (Standalone Components)
- **Language**: TypeScript
- **Styling**: CSS3 with modern features like gradients and animations.
- **Icons**: Font Awesome
- **HTTP Client**: Angular HttpClient
- **Routing**: Angular Router

### Backend
- **Framework**: Spring Boot 3.x
- **Language**: Java 17+
- **Build Tool**: Maven
- **Database**: MySQL 8.x
- **ORM**: Spring Data JPA
- **API**: RESTful architecture

### DevOps
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Database Container**: Official MySQL image
- **Multi-stage Builds**: Optimized Docker images for production.

## 📁 Project Structure

```
App airport/
├── backend/                    # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/airoport/backend/
│   │   │   │   ├── controller/      # REST API controllers
│   │   │   │   ├── dto/             # Data Transfer Objects
│   │   │   │   ├── model/           # JPA Entities
│   │   │   │   ├── repository/      # Spring Data repositories
│   │   │   │   ├── service/         # Business logic layer
│   │   │   │   └── BackendApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/                    # Unit tests
│   ├── Dockerfile
│   ├── pom.xml
│   └── HELP.md
│
├── frontend/                   # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── campagny/           # Company management
│   │   │   ├── comptoire/          # Counter management
│   │   │   ├── equipement/         # Equipment management
│   │   │   ├── home/               # Dashboard
│   │   │   ├── intervention/       # Intervention management
│   │   │   ├── problem/            # Problem catalog
│   │   │   ├── projet/             # Project management
│   │   │   ├── solution/           # Solution catalog
│   │   │   ├── zone/               # Zone management
│   │   │   ├── services/           # Shared services
│   │   │   │   └── lang.service.ts # i18n service
│   │   │   ├── app.ts              # Root component
│   │   │   ├── app.config.ts       # App configuration
│   │   │   └── app.routes.ts       # Route definitions
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.css
│   ├── public/
│   │   └── AIroportlogo.png
│   ├── angular.json
│   ├── package.json
│   ├── Dockerfile
│   └── README.md
│
├── docker-compose.yml          # Docker orchestration
├── .github/
│   └── copilot-instructions.md # GitHub Copilot guidelines
└── README.md                   # Main README file
```

## 🚀 Getting Started

### Prerequisites

- **Docker** (version 20.x or higher)
- **Docker Compose** (version 2.x or higher)
- **Node.js** (version 18.x or higher) - for local frontend development
- **Java JDK** (version 17 or higher) - for local backend development
- **Maven** (version 3.8+) - for local backend development
- **MySQL** (version 8.x) - for local database setup

### System Requirements

- **RAM**: Minimum 4GB (8GB recommended)
- **Disk Space**: At least 2GB free space
- **Ports**: 3306 (MySQL), 9090 (Backend), 4200 (Frontend)

## 📥 Installation

### Option 1: Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/Avotexs/Interventions_Aireport.git
   cd "App airport"
   ```

2. **Start all services with Docker Compose**
   ```bash
   docker-compose up --build
   ```

   This command will:
   - Start the MySQL database container.
   - Build and start the Spring Boot backend (available on port 9090).
   - Build and start the Angular frontend (available on port 4200).

3. **Access the application**
   - Frontend: http://localhost:4200
   - Backend API: http://localhost:9090/api
   - MySQL: localhost:3306

### Option 2: Local Development

#### Backend Setup

1. **Navigate to the backend directory**
   ```bash
   cd backend
   ```

2. **Configure the database connection**
   Edit `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/airport_db
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=update
   ```

3. **Build and run the backend**
   ```bash
   # Using the Maven wrapper (recommended)
   ./mvnw clean install
   ./mvnw spring-boot:run

   # Or using Maven directly
   mvn clean install
   mvn spring-boot:run
   ```

   The backend will start at: http://localhost:9090

#### Frontend Setup

1. **Navigate to the frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   ng serve
   ```

   The frontend will start at: http://localhost:4200

## 🏃 Running the Application

### Development Mode

**Using Docker Compose:**
```bash
docker-compose up
```

**Using Local Development:**
```bash
# Terminal 1 - Backend
cd backend
./mvnw spring-boot:run

# Terminal 2 - Frontend
cd frontend
ng serve

# Terminal 3 - Database (if not using Docker)
mysql -u root -p
```

### Production Build

**Backend:**
```bash
cd backend
./mvnw clean package -DskipTests
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

**Frontend:**
```bash
cd frontend
ng build --configuration production
# Serve the dist/frontend folder with a web server like Nginx or Apache.
```

### Docker Production Deployment

```bash
# Build production images
docker-compose -f docker-compose.yml build

# Run in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 📚 API Documentation

### Base URL
```
http://localhost:9090/api
```

### Endpoints Overview

#### Equipment (`/equipements`)
- `GET /equipements` - Get all equipment
- `GET /equipements/{id}` - Get equipment by ID
- `POST /equipements` - Create new equipment
- `PUT /equipements/{id}` - Update equipment
- `DELETE /equipements/{id}` - Delete equipment

#### Projects (`/projets`)
- `GET /projets` - Get all projects
- `GET /projets/{id}` - Get project by ID
- `POST /projets` - Create new project
- `PUT /projets/{id}` - Update project
- `DELETE /projets/{id}` - Delete project

... (and so on for all other endpoints)

### Request/Response Examples

**Create Equipment:**
```json
POST /api/equipements
{
  "nameEquipement": "Scanner X-Ray",
  "quantite": 5
}
```

**Create Project with Equipment:**
```json
POST /api/projets
{
  "name": "Terminal Modernization",
  "equipements": [
    {
      "equipementId": 1,
      "quantite": 3
    },
    {
      "equipementId": 2,
      "quantite": 5
    }
  ]
}
```

## 🏗️ Architecture

### Data Flow
1. **Frontend** (Angular) sends HTTP requests to the **Backend** (Spring Boot).
2. The **Backend** processes the requests and uses JPA/Hibernate to interact with the **Database** (MySQL).
3. The **Backend** returns JSON responses to the **Frontend**.

### Design Patterns Used
- **MVC Pattern**: Separates the application into Model, View, and Controller components.
- **Repository Pattern**: Abstracts data access.
- **DTO Pattern**: Transfers data between layers.
- **Service Layer Pattern**: Encapsulates business logic.
- **Dependency Injection**: Used by Spring and Angular for loose coupling.

### Key Features
- **CORS Configuration**: Allows communication between the frontend and backend.
- **RESTful API**: Follows standard HTTP methods and status codes.
- **JPA Relationships**: Uses One-to-Many and Many-to-One entity mappings.
- **Reactive Components**: Built with Angular standalone components and RxJS.
- **Internationalization (i18n)**: Supports multiple languages through a dedicated service.

## 🔒 Security Considerations

- Update the default MySQL credentials in `docker-compose.yml`.
- Configure Spring Security for production deployments.
- Enable HTTPS in a production environment.
- Implement authentication and authorization mechanisms.
- Use environment variables for sensitive data.
- Regularly update dependencies to patch security vulnerabilities.

## 🧪 Testing

### Backend Tests
```bash
cd backend
./mvnw test
```

### Frontend Tests
```bash
cd frontend
# Unit tests
ng test

# End-to-end (E2E) tests
ng e2e
```

## 🤝 Contributing

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

### Coding Standards
- **Java**: Follow Spring Boot best practices.
- **TypeScript**: Adhere to the Angular style guide.
- **Commits**: Use conventional commit messages.
- **Documentation**: Update the README for any new features.

## 📝 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

**Last Updated**: November 2025  
**Version**: 2.0.0  
**Status**: Active Development
