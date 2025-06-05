Lab12 - Ajax y Servicios Web con Django REST Framework y React
📋 Descripción
Este laboratorio implementa una aplicación web completa utilizando Ajax y servicios web, integrando un backend API REST desarrollado en Django REST Framework con un frontend en React.js. La aplicación permite realizar operaciones CRUD completas sobre el módulo de categorías.
🎯 Objetivos

Utilizar Ajax y Servicios Web en una aplicación Web
Integrar Django REST Framework con React.js
Implementar operaciones CRUD consumiendo APIs REST
Configurar correctamente CORS para comunicación cross-origin

🛠️ Tecnologías Utilizadas
Backend

Django REST Framework - Framework para desarrollo de APIs REST
django-cors-headers - Manejo de políticas CORS
Python - Lenguaje de programación del backend

Frontend

React.js - Biblioteca de JavaScript para interfaces de usuario
Axios - Cliente HTTP para consumo de APIs
React Router - Enrutamiento en aplicaciones React
Bootstrap - Framework CSS para estilos

📁 Estructura del Proyecto
Lab12/
├── backend/
│   ├── series/
│   │   ├── api/
│   │   │   └── v1/
│   │   │       └── categories/
│   │   └── models/
│   └── settings.py
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── HeaderComponent.jsx
│   │   ├── pages/
│   │   │   ├── CategoryPage.jsx
│   │   │   └── category/
│   │   │       ├── CategoryFormPage.jsx
│   │   │       └── CategoryEditFormPage.jsx
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md