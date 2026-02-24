# Capa de seguridad (`security`)

## 1. Introducción

 La carpeta `security` implementa el sistema de autenticación y autorización de la aplicación mediante Spring Security y JWT (JSON Web Token).

  Su objetivo principal es:
- Proteger los endpoints de la API.
- Gestionar la autenticación de usuarios.
- Controlar el acceso según roles (USER / ADMIN).
- Garantizar seguridad en contraseñas y tokens.

## 2. Arquitectura aplicada

La arquitectura sigue este modelo:
```
    Cliente → Filtro JWT → Spring Security → Controller
```
 Implementando un sistema de seguridad basado en:   
- Autenticación mediante JWT.
- Filtro personalizado para validar tokens.
- Control de acceso por roles.
- Cifrado seguro de contraseñas con BCrypt.

## 3. Componentes implementados

### 3.1 SecurityConfig

Clase principal de configuración de Spring Security, cuya responsabilidad será la de configurar la cadena de filtros (SecurityFilterChain), deshabilitar CSRF (API REST stateless), configurar CORS, definir rutas públicas y protegidas, configurar manejo de errores (401 / 403), registrar el filtro JWT antes de usernamePasswordAuthenticationFilter.

### 3.2 JwtAuthenticationFilter

Este filtro intercepta cada petición HTTP y valida el token JWT. El flujo de funcionamiento sería que excluye las rutas públicas la aplicación, se obtiene el header Authorization, se verifica que comience con Bearer, se extrae el email del token y se valida. Si el token es válido se crea un UsernamePasswordAuthenticationToken, si ocurre un error → se devuelve 401 Unauthorized.
El objetivo es permitir autenticación sin sesión, usando únicamente el token JWT en cada request. 

### 3.3 JwtUtil

Clase encargada de la gestión de los tokens JWT. Sus funcionalidades principales son generar token, extraer el email del usuario, validar el token y comprobar su expiración.
Características técnicas: El sistema añade una firma de seguridad al token que solo el servidor puede generar y validar, asegurando que no pueda ser manipulado. Dicho token dura 24 horas y contiene el email del usuario, su fecha de emisión y la fecha de expiración. 

###3.4 CustomUserDetailsService

Implementación personalizada de UserDetailsService, cuyas responsabilidades son cargar usuario desde base de datos mediante email y validar que no esté eliminado (soft delete). 
Hace una búsqueda del usuario mediante findByEmailAndDeletedAtIsNull, si no existe → UsernameNotFoundException. Además se asignan roles que permite que Spring Security controle el acceso por roles automáticamente.  

### 3.5 AuthConfig
Configura el AuthenticationManager como Bean. Permite que Spring pueda inyectarlo en los controladores de autenticación (AuthController).  

### 3.6 PasswordConfig
Define el Bean de BCryptPasswordEncoder, cuya importancia está en que las contraseñas nunca se almacenan en texto plano y compatible con Spring Security. 
  
## 4. Gestión de autenticación
El flujo completo de autenticación es:

- Usuario hace login en /api/auth/login.
- Se valida email y contraseña.

Si es correcto:
- Se genera un JWT.
- Se devuelve al cliente.

En cada petición posterior:
-  El cliente envía Authorization: Bearer <token>.
- El filtro valida el token.
- Se autentica al usuario en el contexto de seguridad.

### 5. Características de seguridad implementadas

- Autenticación stateless
- Autorización por roles
- Cifrado seguro de contraseñas
- Validación de expiración de token
- Manejo personalizado de errores
- Protección de endpoints sensibles
- Integración con soft delete