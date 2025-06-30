# Build stage
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# Expose the port (default 8080, but Render sets $PORT)
EXPOSE 8080

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"] 