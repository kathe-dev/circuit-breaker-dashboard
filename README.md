# 🚦 Circuit Breaker Dashboard  

Este proyecto es una simulación visual de un **Circuit Breaker** para microservicios.  
Permite observar cómo cambia el estado del *circuit breaker* (`Closed`, `Open`, `Half-Open`) cuando se realizan peticiones al servicio y este responde correctamente o falla.  

## 📌 Características  

- Visualización clara del **estado actual** del *circuit breaker*.  
- Tres posibles estados:  
  - 🟢 **Closed**: todas las peticiones pasan normalmente.  
  - 🔴 **Open**: las peticiones fallan inmediatamente, protegiendo al servicio.  
  - 🟡 **Half-Open**: se permite pasar algunas peticiones de prueba para verificar recuperación.  
- Simulación de peticiones periódicas con resultados aleatorios (éxito o fallo).  
- **Logs en tiempo real** de cada petición con su resultado.  
- Botones de control para cambiar rápidamente el escenario:  
  - 🌱 **Escenario sano** (pocas fallas).  
  - 💥 **Escenario con fallos** (mayor tasa de errores).  
- Estadísticas dinámicas: número de peticiones totales, éxitos y fallos.  

## 🚀 Uso  

1. Clona este repositorio

```console
git clone https://github.com/SoftwareArchitecture-Space/400CIS002-20252-poc-availability.git
cd 400CIS002-20252-poc-availability
```

2. Instala las dependencias
```console
npm install
```

3. Inicia el proyecto en modo desarrollo:
```console
npm run dev
```

1. Abre el navegador en la URL que indique la terminal (http://localhost:3000).
2. Verás el panel principal con el **estado del circuito** y los botones de control.  
3. Selecciona un escenario con los botones:  
   - 🌱 Escenario sano → 20% de fallos.  
   - 💥 Escenario con fallos → 70% de fallos.  
4. Observa cómo cambian el **estado** y los **logs** en tiempo real.  

## 🛠️ Tecnologías  

- **HTML5**  
- **CSS3**  
- **JavaScript** (sin librerías externas)  

## 📷 Vista previa  

![Vista previa del dashboard](assets/screenshot.png)  
