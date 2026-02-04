FROM eclipse-temurin:17-jdk AS build
WORKDIR /app

COPY backend/pom.xml backend/
COPY backend/.mvn backend/.mvn
COPY backend/mvnw backend/
RUN cd backend && ./mvnw dependency:go-offline

COPY backend backend
RUN cd backend && ./mvnw clean package -DskipTests

FROM eclipse-temurin:17-jre
WORKDIR /app

COPY --from=build /app/backend/target/*.jar app.jar

EXPOSE 8080
CMD ["java", "-jar", "app.jar"]


