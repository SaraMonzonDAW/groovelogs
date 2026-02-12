# GrooveLogs

GrooveLogs es una **Aplicación Web Progresiva (PWA)** desarrollada como proyecto académico, cuyo objetivo es permitir a los usuarios **descubrir música**, **guardar sus contenidos favoritos** y **valorar canciones, álbumes y artistas** de forma personalizada.

El proyecto sigue una arquitectura **cliente-servidor**, separando frontend y backend para facilitar el mantenimiento y la escalabilidad.

## Funcionalidades principales

-   Búsqueda de canciones, álbumes y artistas mediante una API externa de información musical.
    
-   Registro de usuarios en la aplicación.
    
-   Autenticación de usuarios.
    
-   Gestión de favoritos (añadir y eliminar).
    
-   Puntuación de contenidos musicales (0–5).
    
-   Persistencia de datos en base de datos relacional.


## Arquitectura del proyecto

El proyecto está estructurado como un **monorepositorio**, con dos partes claramente diferenciadas:
groovelogs/
├── backend/    → API REST desarrollada con Spring Boot
└── frontend/   → Aplicación web desarrollada con React

## 📖 Documentación técnica

La documentación interna del backend se encuentra en la carpeta `/docs`:

- [Capa de Servicios](docs/services.md)

### :computer:Backend
	-   Spring Boot  
	-   API REST
	-   MySQL
	-   Gestión de usuarios y persistencia de datos
    
### :iphone: Frontend
	-   React
	-   React Router
	-   Diseño responsive
	-  Consumo de la API REST del backend

## Instalación y ejecución en local

### Requisitos

-   Node.js
    
-   Java 17
    
-   Maven
    
-   MySQL
    

### Backend

`cd backend`
`mvn clean package -DskipTests`
`java -jar target/GrooveLogs-0.0.1-SNAPSHOT.jar`

Acceso al Swagger-UI 

https://groovelogs.onrender.com/swagger-ui/index.html

### Frontend

`cd frontend`
`npm install`
`npm run dev`


## Autor
Proyecto desarrollado por **Sara Monzón Quesada**  
Ciclo Formativo de Grado Superior – Desarrollo de Aplicaciones Web (DAW)

----------

## 📌 Estado del proyecto

🚧 En desarrollo  

Se irán incorporando nuevas funcionalidades y mejoras progresivamente.
