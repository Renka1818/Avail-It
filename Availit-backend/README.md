# AvailIt Backend API

Spring Boot application for managing hospital bed and oxygen availability.

## Live Demo
[https://avail-it.vercel.app/](https://avail-it.vercel.app/)

## Features
- REST API for hospital data
- PostgreSQL integration
- JWT authentication
- Swagger/OpenAPI docs
- CRUD for hospitals
- Multi-location support
- Input validation
- Pagination and sorting

## Requirements
- Java 17+
- Maven 3.6+
- PostgreSQL

## Setup
```sh
git clone <repository-url>
cd AvailIt/backend
```
- Create a PostgreSQL database named `availit_db`.
- Update credentials in `src/main/resources/application.properties`.

To run:
```sh
mvn spring-boot:run
```

## API Documentation
- Swagger UI: http://localhost:9090/swagger-ui.html
- OpenAPI JSON: http://localhost:9090/api-docs

## Example Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/hospitals/getAllHospitals | Get all hospitals |
| GET    | /api/hospitals/{id}           | Get hospital by ID |
| POST   | /api/hospitals                | Create hospital    |
| PUT    | /api/hospitals/{id}           | Update hospital    |
| DELETE | /api/hospitals/{id}           | Delete hospital    |

## Sample Request
```json
{
  "hospitalName": "City General Hospital",
  "totalBeds": 100,
  "availableBeds": 25,
  "oxygenAvailable": true,
  "address": "123 Main St, Springfield",
  "contactNumber": "+1-555-1234",
  "icuBeds": 10,
  "ventilators": 5,
  "locations": [
    {"address": "123 Main St", "city": "Springfield", "state": "IL", "zipCode": "62701"},
    {"address": "456 Elm St", "city": "Springfield", "state": "IL", "zipCode": "62702"}
  ]
}
```

## Testing
- Use Swagger UI or curl for API testing.
- Example:
```sh
curl -X GET "http://localhost:9090/api/hospitals/getAllHospitals"
curl -X POST "http://localhost:9090/api/hospitals" -H "Content-Type: application/json" -d '{...}'
```

## Configuration
- Edit `src/main/resources/application.properties` for DB, Swagger, and server settings.

## Development Structure
- `controller/` - REST controllers
- `model/` - Entity models
- `repository/` - Data access
- `service/` - Business logic
- `config/` - Swagger and security config

## Troubleshooting
- Change server port if in use
- Check DB connection and credentials
- Ensure app starts for Swagger UI

## API Documentation (OpenAPI)

The root directory contains `AvailIt-openapi.yaml`, documenting all backend endpoints and the APIs used by the frontend, including the live city scrapper.

**To view or edit the API docs:**
- Open [Swagger Editor](https://editor.swagger.io/)
- File > Import File > select `AvailIt-openapi.yaml`
- View, edit, and validate the API documentation

You can also use this file in Postman, Insomnia, or any OpenAPI-compatible tool.

- `Backend`: All backend endpoints
- `Frontend`: Endpoints used by the frontend (including scrapper)

## Contributing
1. Fork the repo
2. Create a feature branch
3. Make changes and add tests
4. Submit a pull request

## License
MIT 