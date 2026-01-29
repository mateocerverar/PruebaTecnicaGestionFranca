# Prueba Técnica - Gestión Franca (Microservicios & Frontend Pokémon)

Solución Fullstack implementando arquitectura de Microservicios con **.NET 9** y Frontend en **Angular 21** con temática de **Pokémon**, demostrando patrones CQRS, DDD y Event-Driven Architecture.

## Arquitectura
El sistema consta de 3 microservicios independientes y un frontend desacoplado.

### Backend (.NET 9)
*   **Users.API** (Puerto 5001): Gestión de usuarios y "Login" simulado (roles).
*   **Orders.API** (Puerto 5002): Gestión de pedidos. Publica eventos `OrderCreated`.
*   **Payments.API** (Puerto 5003): Procesa pagos. Consume eventos `OrderCreated` vía RabbitMQ.

**Tecnologías:**
*   CQRS (MediatR)
*   EntityFramework Core InMemory
*   MassTransit (RabbitMQ)
*   DDD (Capas: Domain, Features/Application, Infrastructure)

### Frontend (Angular 21)
*   **Tema Pokémon**: Diseño visual basado en la franquicia Pokémon (PokeAPI).
*   **Tecnologías**: Standalone Components, Signals (parcial), CSS Variables, HttpClient.
*   **Login Simulado**:
    *   **Admin**: Usuario `admin` / Password `admin123` (Acceso total).
    *   **User**: Usuario `user` / Password `user123` (Acceso limitado).

## Ejecución con Docker
Para levantar todo el entorno (Infraestructura + Backend + Frontend):

1.  Asegúrese de tener Docker Desktop corriendo.
2.  Ejecute en la raíz del repositorio:
    ```bash
    docker-compose up --build
    ```
3.  Acceda a las aplicaciones:
    *   **Frontend**: [http://localhost:4200](http://localhost:4200)
    *   **Users API**: [http://localhost:5001/swagger](http://localhost:5001/swagger)
    *   **Orders API**: [http://localhost:5002/swagger](http://localhost:5002/swagger)
    *   **Payments API**: [http://localhost:5003/swagger](http://localhost:5003/swagger)
    *   **RabbitMQ**: [http://localhost:15672](http://localhost:15672) (user:guest/pass:guest)

## Pruebas Manuales
1.  **Frontend**: Ingrese con `admin` para ver el menú completo (Teams, Trainers) y probar el modo oscuro.
2.  **API**: Use Swagger para crear una orden en `Orders.API` y verifique en los logs de `Payments.API` (o en la consola de Docker) que el pago fue procesado automáticamente.

## Estructura del Repositorio
*   `/backend`: Solución .NET con los 3 microservicios y Shared Kernel.
*   `/frontend`: Aplicación Angular.
*   `docker-compose.yml`: Orquestador de contenedores.

## Diagrama de arquitectura
<img width="992" height="781" alt="image" src="https://github.com/user-attachments/assets/4d8ee092-3d43-4712-ab95-a10646ad0be8" />

## Decisiones técnicas

### 1. Backend: Implementación de RabbitMQ

Se eligió **RabbitMQ** como Message Broker por las siguientes razones:
- **Desacoplamiento Real**: Permite que `Orders.API` envíe eventos sin conocer la existencia de `Payments.API`. Si el servicio de pagos cae, los mensajes persisten en la cola hasta que se recupera.
- **Estándar de Industria**: Es el broker más maduro y soportado en el ecosistema .NET, especialmente fácil de integrar mediante **MassTransit**.
- **Escalabilidad**: Facilita agregar nuevos consumidores en el futuro sin modificar el servicio de órdenes.
### 2. Estructura de Proyecto: "Monorepo" en una Solución
Aunque son microservicios, se agruparon en una única solución `.sln` (`backend/`) porque:
- **Facilidad de Desarrollo**: Permite depurar múltiples servicios simultáneamente en Visual Studio / VS Code.
- **Shared Kernel**: Facilita compartir código común sin la sobrecarga de gestionar paquetes NuGet privados.
- **Orquestación**: Simplifica la configuración de `docker-compose` al tener contextos de build relativos conocidos.
### 3. Uso de PokeAPI
Se utilizó la **PokeAPI** en el Frontend para:
- **Simular Integración Externa**: Demostrar cómo el frontend puede consumir datos de APIs públicas de terceros totalmente ajenas al backend corporativo.
- **Temática Visual**: Proveer una fuente de datos.
### 4. Estructura de Microservicios (Clean Architecture / DDD)
Cada microservicio (`Users`, `Orders`, `Payments`) sigue una estructura interna consistente:
- **API (Controllers)**: Sola entrada HTTP.
- **Features (Application)**: Implementación de casos de uso usando **CQRS** (Command Query Responsibility Segregation) con la librería **MediatR**. Esto aísla la lógica de negocio de los controladores.
- **Domain**: Entidades puras y objetos de valor.
- **Infrastructure**: Implementación de base de datos (`DbContext`) y configuraciones de bus.
*Justificación*: Esta separación asegura que la complejidad de la infraestructura no contamine la lógica de negocio.
### 5. Arquitectura Frontend (Angular)
- **Componentes Standalone**: Se utilizó para reducir el "boilerplate" de los `NgModules`.
- **Organización por Features**: (`/features/dashboard`, `/features/trainers`) en lugar de por tipo de archivo. Esto hace que el proyecto sea más navegable y escalable.
- **CSS Variables**: Se usaron variables nativas (`var(--pk-blue)`) para manejar el **Modo Oscuro** .
### 6. Otras Decisiones Relevantes
- **MassTransit**: Se usó como capa de abstracción sobre RabbitMQ. Esto elimina la complejidad de manejar conexiones "raw", reintentos y topología de colas manualmente.
- **Docker Compose**: Unifica la ejecución. Con un solo comando se levanta toda la infraestructura.
- **EF Core In-Memory**: Se eligió para la demostración para evitar pre-requisitos de instalación de SQL Server/Postgres.
  
## Capturas de pantalla del frontend
<img width="857" height="620" alt="image" src="https://github.com/user-attachments/assets/55b43ddf-7b9b-45b3-9c42-d3ebf55dc4b3" />
<img width="1179" height="820" alt="image" src="https://github.com/user-attachments/assets/ea16220b-4c05-4a36-a8ea-370f60ea8dec" />
<img width="1168" height="834" alt="image" src="https://github.com/user-attachments/assets/c65657a9-e0ea-4db6-a7d8-f84fe6fa131d" />
<img width="1182" height="840" alt="image" src="https://github.com/user-attachments/assets/23bbf96e-9623-4b59-8889-9e9f756d8a64" />
<img width="1187" height="830" alt="image" src="https://github.com/user-attachments/assets/85111f02-c6b5-430b-b5e9-7d10db77f9c0" />
<img width="1178" height="826" alt="image" src="https://github.com/user-attachments/assets/9c46a523-e58a-4570-ab0d-4d65766f5f18" />
<img width="1175" height="838" alt="image" src="https://github.com/user-attachments/assets/28603804-7e14-4fdd-bc10-98b36cf264d2" />

## Enlace a API publica
   `https://pokeapi.co/api/v2/`
