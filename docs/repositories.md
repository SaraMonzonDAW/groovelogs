# Capa de repositorios (`repositories`)
## 1. Introducción
La carpeta `repositories` representa la capa de acceso a datos de la aplicación.

Su objetivo principal es:

- Gestionar la comunicación con la base de datos.

- Realizar operaciones CRUD (Create, Read, Update, Delete).

- Permitir búsquedas personalizadas.

- Abstraer la lógica de persistencia del resto del sistema.

Esta capa trabaja directamente con Spring Data JPA, lo que permite generar consultas automáticamente sin necesidad de escribir SQL manual.
## 2. Arquitectura aplicada

Dentro del patrón en capas:
```
Controller → Service → Repository → Base de Datos
```
La capa repositories no contiene lógica de negocio, se encarga de consultar y persistir datos, siendo utilizada exclusivamente por la capa services.

## 3. Repositorios implementados
### 3.1 UsuarioRepository

Gestiona la persistencia de la entidad `Usuario`. Verifica si un email ya existe y busca usuarios activos por su email. 
### 3.2 FavoriteRepository
Gestiona la unidad `Favorito`, cuyas funcionalidades principales son, obtener favoritos de un usuario y buscar un favorito específico. La lógica de este repositorio nos permitirá:

- Evitar duplicados a nivel de aplicación.
- Consultar favoritos por usuario.
- Identificar un favorito concreto según: Usuario, ID externo (Discogs) y tipo de elemento. 

### 3.3 RatingRepository
Gestiona la entidad Rating, cuyas funcionalidades son buscar valoraciones concretas y obtener las valoraciones de un usuario. Esto permite saber si un usuario ya ha valorado un elemento y gestionar actualizaciones de valoraciones. 

## 4. Características técnicas destacadas
Las consultas se generan automáticamente a partir del nombre del método, sin necesidad de escribir SQL manual. 
Tenemos así una separación de responsabilidades entre la capa de repository, service y controller, lo que nos hace tener un código más limpio, menos SQL manual, mayor mantenabilidad y fácil amplicación de nuevas búsquedas. 