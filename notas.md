Proyecto: Sistema de Gestión de Puntuaciones para Videojuego (Game Score Manager)

1. Descripción del Proyecto:
   El proyecto Sistema de Gestión de Puntuaciones es una aplicación web fullstack que permite gestionar y mostrar las puntuaciones (scores) de los jugadores de un videojuego en línea. Los jugadores podrán registrarse en la plataforma, iniciar sesión, y sus puntuaciones se registrarán automáticamente cuando jueguen. Las puntuaciones más altas se mostrarán en un ranking global. Los administradores podrán gestionar el contenido de las puntuaciones y usuarios desde un panel de administración.

2. Objetivos del Proyecto:
   Desarrollar una plataforma web que permita registrar las puntuaciones de los jugadores de manera automática.
   Proporcionar una interfaz donde los jugadores puedan visualizar sus puntuaciones y las de otros usuarios en tiempo real.
   Implementar autenticación y autorización para jugadores y administradores.
   Crear una interfaz de administración para gestionar usuarios, puntuaciones y el ranking global.
3. Funcionalidades Principales:
   a. Para Jugadores:
   Registro y Autenticación: Los jugadores podrán registrarse en la plataforma con su correo electrónico o mediante redes sociales (OAuth, Google, GitHub).
   Visualización de Puntuaciones: Los jugadores podrán ver sus puntuaciones históricas y el ranking global de los mejores jugadores.
   Actualización Automática de Puntuaciones: La plataforma recibirá puntajes en tiempo real desde la API del videojuego y los actualizará en la base de datos.
   Perfil de Usuario: Los jugadores podrán editar su perfil y ver sus estadísticas de juego.
   b. Para Administradores:
   Panel de Administración: Los administradores podrán ver y gestionar las puntuaciones de todos los jugadores.
   Gestión de Usuarios: Añadir, eliminar o bloquear jugadores.
   Gestión de Puntuaciones: Eliminar puntuaciones erróneas o fraudulentas.
   c. Funcionalidades Extras (Opcionales):
   Historial de Puntuaciones: Ver un gráfico de evolución de las puntuaciones del jugador a lo largo del tiempo.
   Clasificaciones por Nivel o Rango: Crear tablas de clasificación basadas en diferentes niveles o categorías del juego.
   Modo Multijugador: Permitir comparar puntuaciones con amigos agregados.

# Base de datos PostgreSQL de Usuarios

- userId: Identificador único del usuario (clave primaria)
- username: Nombre de usuario (único)
- name: Nombre completo del usuario
- email: Correo electrónico del usuario
- password: Contraseña encriptada del usuario
- role: Rol del usuario (jugador, administrador)
- createdAt: Fecha de creación del usuario
- updatedAt: Fecha de última actualización del usuario
- deletedAt: Fecha de eliminación del usuario
- profilePicture: URL de la imagen de perfil del usuario
- active: Estado de activación del usuario (activo, inactivo)
- provider?: Proveedor de autenticación (local, google, github)
- providerId?: Identificador del proveedor de autenticación

# Base de datos MongoDB de Puntuaciones

- scoreId: Identificador único de la puntuación (clave primaria)
- userId: Identificador del usuario que realizó la puntuación
- game: Nombre del juego
- score: Puntuación obtenida
- createdAt: Fecha y hora de la puntuación
- level?: Nivel o categoría del juego
- updatedAt: Fecha de última actualización de la puntuación
- deletedAt: Fecha de eliminación de la puntuación
- uploadedBy: Usuario que subió la puntuación
