# AvailIt

A full-stack platform for managing and viewing hospital bed and oxygen availability.

## Try It Live
[https://avail-it.vercel.app/](https://avail-it.vercel.app/)

## Project Structure
- **Availit-backend/**: Spring Boot REST API
- **Availit-frontend/**: React web app
- **Live-city-scrapper/**: Node.js script for live data scraping.

---

## Backend (Spring Boot)

**Features:**
- REST API for hospital management
- PostgreSQL database
- JWT authentication
- Swagger/OpenAPI docs

**Requirements:**
- Java 17+
- Maven 3.6+
- PostgreSQL

**Setup:**
```sh
cd Availit-backend
Edit DB config in src/main/resources/application.properties
./mvnw spring-boot:run
```

**API Docs:**
- Swagger UI: http://localhost:9090/swagger-ui.html

**Deployment:**
- Deploy to Railway, Render, Fly.io, or similar

---

## Frontend (React)

**Features:**
- Hospital search and management
- Authentication modals
- Toast notifications

**Requirements:**
- Node.js 16+
- npm

**Setup:**
```sh
cd Availit-frontend
npm install
npm start
```

**Deployment (Vercel):**
1. Push code to your repo
2. Go to [vercel.com](https://vercel.com/) and import your repo
3. Set root to `Availit-frontend` if prompted
4. Build command: `npm run build`, Output: `build`
5. Deploy and update frontend API URLs as needed

---

## Live City Scraper (Node.js)

**Purpose:**
- Scrapes live hospital data (optional)

**Requirements:**
- Node.js 16+

**Setup:**
```sh
cd Live-city-scrapper
npm install
node index.js
```

---

## Hosted Platforms
- [Railway](https://railway.app/)
- [Render](https://render.com/)
- [Fly.io](https://fly.io/)
- [Cyclic.sh](https://cyclic.sh/)

---

## Environment Variables
- Never commit secrets. Use `.env` files (already gitignored).
- Set environment variables in Vercel or your backend host dashboard.

---

## API Documentation (OpenAPI)

The root directory contains `AvailIt-openapi.yaml`, documenting all backend endpoints and the APIs used by the frontend, including the live city scrapper.

**To view or edit the API docs:**
- Open [Swagger Editor](https://editor.swagger.io/)
- File > Import File > select `AvailIt-openapi.yaml`
- View, edit, and validate the API documentation

You can also use this file in Postman, Insomnia, or any OpenAPI-compatible tool.

**File structure:**
- `Backend`: All backend endpoints
- `Frontend`: Endpoints used by the frontend (including scrapper)
