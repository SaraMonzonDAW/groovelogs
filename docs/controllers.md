# Capa de repositorios (`controllers`)
## 1. Introducción
La carpeta `controllers` constituye la capa de exposición de la API REST del sistema. Su función principal es la de recibir peticiones HTTP del cliente, extraer datos del cuerpo o parámetros, obtener el usuario autenticado cuando sea necesario, delegar la lógica de negocio a la capa de servicios y devolver respuestas HTTP estructuradas.
No contiene lógica de negocio ni acceso directo a base de datos.


## 2. Arquitectura aplicada

```
Cliente → Controller → Service → Repository → Base de Datos 
```

Cada controller está anotado como un `@RestController` y define una ruta base con `@RequestMapping`, integrandose con Spring Security mediante `Authentication` y `@PreAuthorize`.

## 3. Controladores implementados
### 3.1 AuthController
```
Ruta base: /api/auth
```

Es la ruta responsable de la autenticación y registro de usuarios. El registro se hará mediante un método POST al igual que el login. 
### 3.2 UsuarioController
```
Ruta base: /api/usuarios
```
Gestiona operaciones relacionadas con el usuario autenticado. Obtiene la lista de usuarios, obtiene el perfil y actualizar el perfil mediante un método PUT. 

### 3.3 AdminController
```
Ruta base: /api/admin
```
Gestiona operaciones exclusivas para administradores. Se utiliza un `@PreAuthorize("hasRole('ADMIN')")` para restringir el acceso. Puede listar usuarios, eliminar usuario por ID... El objetivo es separar la lógica administrativa del resto del sistema.

### 3.4 FavoriteController
```
Ruta base: /api/favoritos
```
Gestiona los favoritos del usuario autenticado, tiene un GET para obtener los favoritos, un POST para guardar un favorito y un método DELETE para eliminar favorito. 

### 3.5 RatingController
```
Ruta base: /api/ratings
```
Gestiona las valoraciones del usuario autenticado, tiene un GET para obtener las valoraciones, un POST para crear una valoración y método GET para devolver todas la valoraciones del usuario. 

### 3.6 DiscogsController
```
Ruta base: /api/discogs
```
Actúa como proxy hacia la API externa de Discogs. Las funcionalidades son buscar (GET /search), recibe parámetros dinámicos, construye URL hacia la API de Discogs, añade token de autorización y devuelve la respuesta externa al frontend.

## 4. Ventajas de este modelo

- Separación total de lógica y persistencia
- Uso del contexto de seguridad en lugar de parámetros manuales
- Control de acceso por rol
- Proxy seguro para API externa
- Delegación completa a la capa service