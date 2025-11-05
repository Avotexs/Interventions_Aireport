# ✈️ Airport Intervention Management System

A full-stack web application for managing airport interventions, equipment, projects, and operational activities.

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

The Airport Intervention Management System is a comprehensive solution designed to streamline airport operations management. It provides tools for tracking equipment, managing interventions, coordinating projects, and monitoring airport zones and counters.

### Key Capabilities

- **Equipment Management**: Track equipment entries, exits, and inventory
- **Intervention Tracking**: Monitor open and closed interventions with detailed status
- **Project Coordination**: Manage ongoing and completed projects with equipment allocation
- **Zone & Counter Management**: Organize airport zones and their associated counters
- **Company Management**: Maintain airline company information
- **Dashboard Analytics**: Real-time overview of airport operations
- **Multi-language Support**: French and English language options

## ✨ Features

### 🏠 Dashboard
- Real-time statistics for equipment, airports, interventions, and projects
- Recent activity feed with color-coded status indicators
- Quick action buttons for common tasks
- Responsive design for all device types

### 🔧 Equipment Module
- Add, edit, and delete equipment records
- Track equipment quantities and locations
- Search and filter functionality
- Equipment assignment to projects

### 🛠️ Intervention Management
- Create and manage intervention records
- Associate problems and solutions
- Track intervention status (open/closed)
- Link interventions to companies and zones

### 📊 Project Management
- Create projects with multiple equipment assignments
- Track project progress
- Manage equipment allocation per project
- View project history and details

### 🏢 Administrative Features
- Zone management with hierarchical counter assignment
- Company (airline) management
- Problem and solution catalog management
- Comptoir (counter) management within zones

### 🌐 User Interface
- Modern, intuitive design
- Gradient backgrounds and smooth animations
- Font Awesome icons throughout
- Responsive tables and forms
- Modal dialogs for create/edit operations

## 🛠️ Technology Stack

### Frontend
- **Framework**: Angular (Standalone Components)
- **Language**: TypeScript
- **Styling**: CSS3 with gradients and animations
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
- **Database Container**: MySQL official image
- **Multi-stage Builds**: Optimized Docker images

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
└── README.md                   # This file
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

   This will:
   - Start MySQL database container
   - Build and start Spring Boot backend (port 9090)
   - Build and start Angular frontend (port 4200)

3. **Access the application**
   - Frontend: http://localhost:4200
   - Backend API: http://localhost:9090/api
   - MySQL: localhost:3306

### Option 2: Local Development

#### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Configure database connection**
   Edit `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/airport_db
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=update
   ```

3. **Build and run**
   ```bash
   # Using Maven wrapper (recommended)
   ./mvnw clean install
   ./mvnw spring-boot:run

   # Or using Maven directly
   mvn clean install
   mvn spring-boot:run
   ```

   Backend will start at: http://localhost:9090

#### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   ng serve
   ```

   Frontend will start at: http://localhost:4200

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
# Serve the dist/frontend folder with a web server
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

#### Interventions (`/interventions`)
- `GET /interventions` - Get all interventions
- `GET /interventions/{id}` - Get intervention by ID
- `POST /interventions` - Create new intervention
- `PUT /interventions/{id}` - Update intervention
- `DELETE /interventions/{id}` - Delete intervention

#### Problems (`/problems`)
- `GET /problems` - Get all problems
- `POST /problems` - Create new problem
- `PUT /problems/{id}` - Update problem
- `DELETE /problems/{id}` - Delete problem

#### Solutions (`/solutions`)
- `GET /solutions` - Get all solutions
- `POST /solutions` - Create new solution
- `PUT /solutions/{id}` - Update solution
- `DELETE /solutions/{id}` - Delete solution

#### Companies (`/campagnies`)
- `GET /campagnies` - Get all companies
- `POST /campagnies` - Create new company
- `PUT /campagnies/{id}` - Update company
- `DELETE /campagnies/{id}` - Delete company

#### Zones (`/zones`)
- `GET /zones` - Get all zones
- `POST /zones` - Create new zone
- `PUT /zones/{id}` - Update zone
- `DELETE /zones/{id}` - Delete zone

#### Counters (`/comptoires`)
- `GET /comptoires` - Get all counters
- `GET /comptoires/zone/{zoneId}` - Get counters by zone
- `POST /comptoires` - Create new counter
- `PUT /comptoires/{id}` - Update counter
- `DELETE /comptoires/{id}` - Delete counter

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
1. **Frontend** (Angular) → HTTP requests → **Backend** (Spring Boot)
2. **Backend** → JPA/Hibernate → **Database** (MySQL)
3. **Backend** → JSON responses → **Frontend**

### Design Patterns Used
- **MVC Pattern**: Model-View-Controller separation
- **Repository Pattern**: Data access abstraction
- **DTO Pattern**: Data transfer between layers
- **Service Layer Pattern**: Business logic encapsulation
- **Dependency Injection**: Loose coupling via Spring/Angular DI

### Key Features
- **CORS Configuration**: Enabled for frontend-backend communication
- **RESTful API**: Standard HTTP methods and status codes
- **JPA Relationships**: One-to-Many, Many-to-One entity mappings
- **Reactive Components**: Angular standalone components with RxJS
- **Internationalization**: Multi-language support via service layer

## 🔒 Security Considerations

- Update default MySQL credentials in `docker-compose.yml`
- Configure Spring Security for production deployments
- Enable HTTPS in production
- Implement authentication/authorization
- Use environment variables for sensitive data
- Regular dependency updates for security patches

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

# E2E tests
ng e2e
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards
- **Java**: Follow Spring Boot best practices
- **TypeScript**: Use Angular style guide
- **Commits**: Use conventional commit messages
- **Documentation**: Update README for new features

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Avotexs** - *Initial work* - [GitHub](https://github.com/Avotexs)

## 🙏 Acknowledgments

- Spring Boot framework and community
- Angular framework and team
- Font Awesome for icons
- Docker for containerization
- All contributors and users of this project

## 📞 Support

For support, please open an issue on the GitHub repository or contact the development team.

## 🗺️ Roadmap

- [ ] User authentication and authorization
- [ ] Role-based access control (RBAC)
- [ ] Advanced reporting and analytics
- [ ] Email notifications for interventions
- [ ] Mobile application
- [ ] Real-time updates with WebSockets
- [ ] Export data to PDF/Excel
- [ ] Integration with external airport systems
- [ ] Advanced search and filtering
- [ ] Audit logging and history tracking

---

**Last Updated**: November 2025  
**Version**: 1.0.0  
**Status**: Active Development
