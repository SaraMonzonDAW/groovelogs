# Capa de entidades (`entities`)
## 1. Introducción

La carpeta entities representa el modelo de datos de la aplicación. Su función principal es definir las tablas de la base de datos, establecer relaciones entre entidades, mapear objetos Java a tablas mediante JPA y garantizar la integridad estructural de los datos.
Se utiliza JPA (Java Persistence API) junto con Hibernate como proveedor de persistencia.

## 2. Arquitectura aplicada
```
Entidad ↔ Tabla en Base de Datos
```
Cada clase anotada con @Entity representa una tabla y cada atributo representa una columna. 
Las relaciones se gestionan mediante anotaciones como:

- @OneToMany
- @ManyToOne
- @Enumerated
- @UniqueConstraint

## 3. Entidades implementadas
### 3.1 Usuario

Representa a los usuarios registrados en la aplicación. Se lleva a cabo una auditoría automática que se implementa mediante el uso de: 
- @CreatedDate
- @LastModifiedDate
- @CreatedBy
- @LastModifiedBy
- @EntityListeners(AuditingEntityListener.class)

Lo que nos permitirá registrar cuándo se crea un usuario, registrar cuándo se modifica y guardar información de trazabilidad.

### 3.2 Favorito

Representa los elementos marcados como favoritos por un usuario. Se establece una restricción única compuesta:
```
(usuario_id, discogsId, tipo)
``` 
Esto garantiza que un usuario no pueda guardar el mismo elemento como favorito más de una vez, pero que un mismo usuario pueda tener varios favoritos. Es una medida de integridad a nivel de base de datos.

### 3.3 Rating

Representa la valoración que un usuario realiza sobre un elemento. Al igual que en favoritos, un usuario solo puede darle un elemento una vez, si vuelve a valorarlo, se actualiza el registro. Una valoración siempre pertenece a un usuario, no puede existir sin usuario asociado.

### 3.4 Rol

Define los tipos de usuario del sistema. Las ventajas que esto nos aporta es el evitar errores por strings manuales, facilita control de acceso y se integra directamente con Spring Security.

## 4. Ventajas de este modelo

- Restricciones de unicidad a nivel de base de datos
- Soft delete en usuarios
- Auditoría automática
- Uso de enumeraciones para roles