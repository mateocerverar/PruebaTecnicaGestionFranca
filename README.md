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

## Capturas de pantalla del frontend
<img width="857" height="620" alt="image" src="https://github.com/user-attachments/assets/55b43ddf-7b9b-45b3-9c42-d3ebf55dc4b3" />
<img width="1179" height="820" alt="image" src="https://github.com/user-attachments/assets/ea16220b-4c05-4a36-a8ea-370f60ea8dec" />
<img width="1168" height="834" alt="image" src="https://github.com/user-attachments/assets/c65657a9-e0ea-4db6-a7d8-f84fe6fa131d" />
<img width="1182" height="840" alt="image" src="https://github.com/user-attachments/assets/23bbf96e-9623-4b59-8889-9e9f756d8a64" />
<img width="1187" height="830" alt="image" src="https://github.com/user-attachments/assets/85111f02-c6b5-430b-b5e9-7d10db77f9c0" />
<img width="1178" height="826" alt="image" src="https://github.com/user-attachments/assets/9c46a523-e58a-4570-ab0d-4d65766f5f18" />
<img width="1175" height="838" alt="image" src="https://github.com/user-attachments/assets/28603804-7e14-4fdd-bc10-98b36cf264d2" />

## Enlace a API publica
   ```bash
    https://pokeapi.co/api/v2/
    ```
