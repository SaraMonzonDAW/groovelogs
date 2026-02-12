# Capa de Servicios (`services`)

## 1. Introducción

En una arquitectura basada en Spring Boot, la capa de `services` actúa como intermediaria entre los controladores (`controllers`) y los repositorios (`repositories`), siguiendo el patrón de arquitectura en capas.

Su objetivo principal es:

- Implementar reglas de negocio.
- Coordinar operaciones con la base de datos.
- Garantizar coherencia e integridad en las operaciones.
- Desacoplar la lógica del acceso directo a datos.


## 2. Arquitectura aplicada

Se sigue una arquitectura en tres capas principales:

```
Controller → Service → Repository → Base de Datos
```

Esta organización permite:

- Separación clara de responsabilidades.
- Código más mantenible y escalable.
- Mejor capacidad de pruebas unitarias.
- Mayor claridad estructural del proyecto.

## 3. Servicios implementados

### 3.1 UsuarioService

Gestiona la lógica asociada a la entidad `Usuario`.

#### Funcionalidades principales:

- Creación de nuevos usuarios.
- Búsqueda de usuario por email.
- Actualización de datos de perfil.
- Eliminación lógica (soft delete).
- Comprobación de existencia de email.
- Obtención de todos los usuarios registrados.

#### Aspectos técnicos destacados:

- Uso de `BCryptPasswordEncoder` para el cifrado seguro de contraseñas.
- Implementación de soft delete mediante el campo `deletedAt`, evitando el borrado físico en la base de datos.
- Validación previa a operaciones críticas (como búsqueda obligatoria antes de actualización o eliminación).
- Integración con `UsuarioRepository` para la persistencia de datos.


### 3.2 FavoriteService

Gestiona la entidad `Favorito`, que representa los elementos marcados como favoritos por un usuario.

#### Funcionalidades principales:

- Guardar un nuevo favorito.
- Obtener los favoritos de un usuario.
- Eliminar un favorito específico.

#### Lógica aplicada:

Antes de guardar un favorito, se comprueba si ya existe un registro con el mismo `discogsId`, `tipo` y usuario asociado.  
Si existe, se lanza una excepción para evitar duplicidades.

Esta validación garantiza la integridad lógica a nivel de aplicación.


### 3.3 RatingService

Gestiona las valoraciones realizadas por los usuarios sobre distintos elementos.

#### Funcionalidades principales:

- Crear o actualizar una valoración.
- Obtener todas las valoraciones de un usuario.
- Obtener la valoración específica de un usuario para un elemento.
- Calcular la media de valoraciones de un elemento.
- Contar el total de valoraciones de un usuario.

#### Lógica aplicada:

- Si el usuario ya ha valorado un elemento, se actualiza la valoración existente.
- Si no existe valoración previa, se crea una nueva.
- La media se calcula procesando los resultados obtenidos desde el repositorio.

## 4. Gestión de transacciones

La capa de servicios centraliza operaciones que pueden implicar múltiples accesos a la base de datos.

Hacemos uso de la anotación `@Transactional` en esta capa para:

- Garantizar la atomicidad de las operaciones.
- Asegurar consistencia en caso de error.
- Agrupar múltiples operaciones dentro de una única transacción.

Este enfoque refuerza la robustez del sistema ante posibles fallos durante la ejecución.

---

## 5. Conclusión

La carpeta `services` nos permite:

- Mantener el código desacoplado y organizado.
- Garantizar la integridad de los datos.
- Aplicar reglas de negocio antes de persistir información.
- Facilitar la escalabilidad y el mantenimiento futuro del sistema.
