# GrooveLogs

GrooveLogs es una **Aplicación Web Progresiva (PWA)** desarrollada como proyecto académico, cuyo objetivo es permitir a los usuarios **descubrir música**, **guardar sus contenidos favoritos** y **valorar canciones, álbumes y artistas** de forma personalizada.

El proyecto sigue una arquitectura **cliente-servidor**, separando frontend y backend para facilitar el mantenimiento y la escalabilidad.

## Funcionalidades principales

- Búsqueda de canciones, álbumes y artistas mediante API externa (Discogs).
- Registro de usuarios.
- Autenticación mediante JWT.
- Gestión de favoritos (añadir y eliminar).
- Valoración de contenidos musicales (0–5).
- Persistencia de datos en base de datos relacional.
- Control de acceso por roles (USER / ADMIN).
- Diseño responsive y enfoque PWA.

## Arquitectura del proyecto

El proyecto está estructurado como un **monorepositorio**, con dos partes claramente diferenciadas:
groovelogs/
├── backend/    → API REST desarrollada con Spring Boot
└── frontend/   → Aplicación web desarrollada con React

Se aplica una arquitectura en capas en el backend:

```
Controller → Service → Repository → Base de Datos
``` 

## 📖 Documentación técnica

La documentación interna del backend se encuentra en la carpeta `/docs`:

- [Capa de Services](docs/services.md)
- [Capa de Entities](docs/entities.md)
- [Capa de Security](docs/security.md)
- [Capa de Repositories](docs/repositories.md)
- [Capa de Controllers](docs/controllers.md)

### :computer:Backend

- Spring Boot
- Spring Security + JWT
- API REST
- Postgresql
- JPA / Hibernate
- Swagger (documentación de endpoints)

Swagger UI

Disponible en:
```
https://groovelogs.onrender.com/swagger-ui/index.html
```
    
### :iphone: Frontend
- React
- React Router
- Consumo de API REST
- Diseño responsive
- Arquitectura basada en componentes

## Instalación y ejecución en local

### Requisitos

-   Node.js
    
-   Java 17
    
-   Maven
    
-   Postgresql 17
    

### Backend

`cd backend`
`mvn clean package -DskipTests`
`java -jar target/GrooveLogs-0.0.1-SNAPSHOT.jar`


### Frontend

`cd frontend`
`npm install`
`npm run dev`

### Seguridad

El sistema implementa:

- Autenticación basada en JWT.

- Arquitectura stateless (sin sesiones).

- Protección de endpoints por roles.

- Cifrado de contraseñas con BCrypt.

- Validación de tokens en cada petición.


## Autor
Proyecto desarrollado por **Sara Monzón Quesada**  
Ciclo Formativo de Grado Superior – Desarrollo de Aplicaciones Web (DAW)

----------

## 📌 Estado del proyecto

🚧 En desarrollo  

Se irán incorporando nuevas funcionalidades y mejoras progresivamente.
