# AvailIt

A full-stack application for managing and viewing hospital bed and oxygen availability.

## Project Structure

- **Availit-backend/**: Java Spring Boot REST API for hospital data
- **Availit-frontend/**: React web app for users and admins
- **Live-city-scrapper/**: Node.js script for live data scraping (optional)

---

## 1. Backend (Spring Boot)

### Features
- RESTful API for hospital management
- PostgreSQL integration
- JWT authentication
- Swagger/OpenAPI docs

### Prerequisites
- Java 17+
- Maven 3.6+
- PostgreSQL

### Setup
```sh
cd Availit-backend
# Configure DB in src/main/resources/application.properties
./mvnw spring-boot:run
```

### API Docs
- Swagger UI: http://localhost:9090/swagger-ui.html

### Deployment
- Deploy to Railway, Render, Fly.io, or similar (see below for suggestions)

---

## 2. Frontend (React)

### Features
- User-friendly hospital search and management
- Authentication modals
- Toast notifications

### Prerequisites
- Node.js 16+
- npm

### Local Setup
```sh
cd Availit-frontend
npm install
npm start
```

### Deployment (Vercel)
1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com/), sign up, and import your repo
3. Set root directory to `Availit-frontend` if prompted
4. Build command: `npm run build`, Output directory: `build`
5. Click Deploy
6. Update API URLs in your frontend to point to your backend's deployed URL

---

## 3. Live City Scraper (Node.js)

### Purpose
- Scrapes live hospital data (optional, for automation)

### Prerequisites
- Node.js 16+

### Setup
```sh
cd Live-city-scrapper
npm install
node index.js
```

---

## Backend Hosting Suggestions (Free Tiers)
- [Railway](https://railway.app/)
- [Render](https://render.com/)
- [Fly.io](https://fly.io/)
- [Cyclic.sh](https://cyclic.sh/)

---

## Environment Variables
- Never commit secrets or credentials. Use `.env` files (already gitignored).
- Set environment variables in Vercel/your backend host dashboard.

---

## Contributing
1. Fork the repo
2. Create a feature branch
3. Make changes and add tests
4. Submit a pull request

---

## License
MIT or as specified in each subproject 