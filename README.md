# Prueba Técnica - Gestión Franca (Microservicios & Frontend Pokémon)

Solución Fullstack implementando arquitectura de Microservicios con **.NET 8** y Frontend en **Angular 18+** con temática de **Pokémon**, demostrando patrones CQRS, DDD y Event-Driven Architecture.

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
    *   **RabbitMQ**: [http://localhost:15672](http://localhost:15672) (guest/guest)

## Pruebas Manuales
1.  **Frontend**: Ingrese con `admin` para ver el menú completo (Teams, Trainers) y probar el modo oscuro.
2.  **API**: Use Swagger para crear una orden en `Orders.API` y verifique en los logs de `Payments.API` (o en la consola de Docker) que el pago fue procesado automáticamente.

## Estructura del Repositorio
*   `/backend`: Solución .NET con los 3 microservicios y Shared Kernel.
*   `/frontend`: Aplicación Angular.
*   `docker-compose.yml`: Orquestador de contenedores.
*   `architecture.md`: Diagrama y documentación de decisiones.
