# 🧮 Calculadora Científica — React Native + Expo

![Expo](https://img.shields.io/badge/Expo-000000?logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React%20Native-61dafb?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white)

Una **calculadora moderna, funcional y con modo científico**, desarrollada con **React Native**, **Expo Router** y **TypeScript**.  
Cuenta con historial persistente, temas claro/oscuro automáticos, soporte para funciones científicas y una interfaz limpia y responsiva.

---

## ✨ Características principales

✅ **Operaciones básicas** — suma, resta, multiplicación, división, porcentaje  
🧠 **Modo científico** — `sin`, `cos`, `tan`, `√`, `π`, `e`, `log`, potencias, paréntesis  
🕓 **Historial persistente** — guarda las últimas 100 operaciones con `AsyncStorage`  
🎨 **Modo claro y oscuro** — sincronizado con el sistema y alternable manualmente  
💾 **Persistencia local** — tanto para historial como para tema  
⚡ **Arquitectura modular** — Context API + Expo Router

---

## 🧱 Estructura del proyecto

```

calculadora/
├── app/
│   ├── _layout.tsx          # Layout raíz con carga de fuentes y providers
│   └── index.tsx            # Pantalla principal (Display + Keyboard + Historial)
│
├── assets/
│   ├── fonts/               # Tipografías (Source Code Pro)
│   └── images/              # Recursos gráficos
│
├── components/
│   ├── CalculatorBtn.tsx    # Botón de la calculadora
│   ├── Display.tsx          # Pantalla del resultado
│   ├── Keyboard.tsx         # Teclado principal
│   ├── HistoryModal.tsx     # Modal con historial completo
│   ├── Row.tsx              # Fila de botones
│   └── TopBar.tsx           # Barra superior (tema, modo científico, historial)
│
├── contexts/
│   ├── HistoryContext.tsx   # Contexto del historial (con AsyncStorage)
│   └── ThemeContext.tsx     # Contexto del tema (claro/oscuro)
│
├── lib/
│   └── calculator.ts        # Lógica de cálculo
│
├── app.json                 # Configuración principal de Expo
├── tsconfig.json            # Configuración de TypeScript
└── package.json             # Dependencias y scripts

````

---

## ⚙️ Instalación y ejecución

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/tuusuario/calculadora.git
cd calculadora
````

### 2️⃣ Instalar dependencias

```bash
npm install
# o
yarn install
```

### 3️⃣ Ejecutar el proyecto

```bash
npx expo start
```

Luego escanea el **QR** con la app de **Expo Go** 📱 o presiona `w` para abrirlo en el navegador.

---

## 🧮 Lógica del cálculo

Toda la lógica matemática vive en [`lib/calculator.ts`](/calculadora/lib/calculator.ts):

| Función            | Descripción                       |
| ------------------ | --------------------------------- |
| `handleNumber`     | Maneja la entrada de números      |
| `handleOperator`   | Procesa operadores aritméticos    |
| `handleEqual`      | Evalúa la expresión completa      |
| `handleDot`        | Añade puntos decimales            |
| `handleToggleSign` | Cambia el signo del número actual |

---

## 🎨 Temas (Light / Dark)

Definidos en [`contexts/ThemeContext.tsx`](/calculadora/contexts/ThemeContext.tsx):
El tema se adapta automáticamente al sistema operativo y puede alternarse manualmente desde la barra superior.

| Tema         | Ejemplo de colores                        |
| ------------ | ----------------------------------------- |
| 🌞 **Light** | Fondo blanco, acentos azules (`#007AFF`)  |
| 🌙 **Dark**  | Fondo negro, acentos naranjas (`#FF9500`) |

---

## 🕓 Historial de operaciones

Gestionado por [`contexts/HistoryContext.tsx`](/calculadora/contexts/HistoryContext.tsx):

* Guarda las últimas **100 operaciones** con `AsyncStorage`
* Muestra las **10 más recientes** en la pantalla principal
* Incluye un **modal** con el historial completo
* Permite **borrar todo** el historial

---

## 🧩 Componentes principales

| Componente      | Descripción                                                    |
| --------------- | -------------------------------------------------------------- |
| `Display`       | Muestra el número o resultado actual                           |
| `Keyboard`      | Contiene todos los botones organizados en filas                |
| `CalculatorBtn` | Botón individual configurable                                  |
| `TopBar`        | Permite alternar tema, ver historial o activar modo científico |
| `HistoryModal`  | Modal con lista completa del historial                         |
| `Row`           | Contenedor horizontal de botones                               |

---

## 🧰 Dependencias clave

| Librería                                    | Uso                                        |
| ------------------------------------------- | ------------------------------------------ |
| `expo`                                      | Framework base para React Native           |
| `expo-router`                               | Navegación basada en archivos              |
| `expo-font`                                 | Carga de fuentes personalizadas            |
| `expo-linear-gradient`                      | Fondos con degradados                      |
| `@react-native-async-storage/async-storage` | Persistencia local                         |
| `react-native-safe-area-context`            | Margen seguro para diferentes dispositivos |

---

## 🧑‍💻 Autores

Desarrollado con ❤️ por **Adrián y Guillermo**
