# MMM-Promiedos

A [MagicMirror²](https://github.com/MagicMirrorOrg/MagicMirror) module to display Argentine football league tables using data from Promiedos.

## Preview
![MMM-Promiedos Preview](/MMM-Promiedos%20Module.png)

## Features
- Displays multiple league tables side by side
- Shows team positions, points, matches played, goals, and other statistics
- Auto-updates daily at configurable time
- Compact design optimized for MagicMirror² display

## Installation

1. Navigate to your MagicMirror's modules folder:
```bash
cd ~/MagicMirror/modules
```

2. Clone this repository:
```bash
git clone https://github.com/matiasmtl/MMM-Promiedos.git
```

## Configuration

Add the following to your `config/config.js` file:

```js
{
    module: "MMM-Promiedos",
    position: "top_right",
    config: {
        apiUrl: "https://api.promiedos.com.ar/league/tables_and_fixtures/hc",
        refreshHour: 23,    // Hour of the day to refresh (24h format)
        refreshMinute: 0,   // Minute of the hour to refresh
        animationSpeed: 1000
    }
}
```

### Configuration Options

| Option | Description | Default |
|--------|-------------|---------|
| `apiUrl` | URL for the Promiedos API endpoint | `"https://api.promiedos.com.ar/league/tables_and_fixtures/hc"` |
| `refreshHour` | Hour of the day to refresh data (24h format) | `23` |
| `refreshMinute` | Minute of the hour to refresh data | `0` |
| `animationSpeed` | Speed of update animations in milliseconds | `1000` |

## Note
This module uses the Promiedos API to fetch data. Please ensure you comply with their terms of service and usage policies.

## Contributing
Feel free to submit issues and enhancement requests!

## License
[MIT License](LICENSE.txt)

---

# MMM-Promiedos (Español)

Un módulo para [MagicMirror²](https://github.com/MichMich/MagicMirror) que muestra las tablas de posiciones del fútbol argentino usando datos de Promiedos.

## Vista Previa
![Vista Previa de MMM-Promiedos](/MMM-Promiedos%20Module.png)

## Características
- Muestra múltiples tablas de posiciones lado a lado
- Exhibe posiciones, puntos, partidos jugados, goles y otras estadísticas
- Actualización automática diaria en horario configurable
- Diseño compacto optimizado para MagicMirror²

## Instalación

1. Navegá a la carpeta de módulos de MagicMirror:
```bash
cd ~/MagicMirror/modules
```

2. Cloná este repositorio:
```bash
git clone https://github.com/matiasmtl/MMM-Promiedos.git
```

## Configuración

Agregá lo siguiente a tu archivo `config/config.js`:

```js
{
    module: "MMM-Promiedos",
    position: "top_right",
    config: {
        apiUrl: "https://api.promiedos.com.ar/league/tables_and_fixtures/hc",
        refreshHour: 23,    // Hora del día para actualizar (formato 24h)
        refreshMinute: 0,   // Minuto de la hora para actualizar
        animationSpeed: 1000
    }
}
```

### Opciones de Configuración

| Opción | Descripción | Valor Predeterminado |
|--------|-------------|---------|
| `apiUrl` | URL del endpoint de la API de Promiedos | `"https://api.promiedos.com.ar/league/tables_and_fixtures/hc"` |
| `refreshHour` | Hora del día para actualizar (formato 24h) | `23` |
| `refreshMinute` | Minuto de la hora para actualizar | `0` |
| `animationSpeed` | Velocidad de las animaciones en milisegundos | `1000` |

## Nota
Este módulo utiliza la API de Promiedos para obtener datos. Asegurate de cumplir con sus términos de servicio y políticas de uso.

## Contribuciones
¡No dudes en enviar issues y solicitudes de mejoras!

## Licencia
[Licencia MIT](LICENSE.txt)
