# Teachers MarketPlace

[![Netlify Status](https://api.netlify.com/api/v1/badges/552f5694-863b-40f1-bed5-4e888534eb12/deploy-status)](https://app.netlify.com/sites/teachers-marketplace/deploys)

[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=mig-code_teachers-marketplace&metric=coverage)](https://sonarcloud.io/summary/new_code?id=mig-code_teachers-marketplace)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=mig-code_teachers-marketplace&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=mig-code_teachers-marketplace)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=mig-code_teachers-marketplace&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=mig-code_teachers-marketplace)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=mig-code_teachers-marketplace&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=mig-code_teachers-marketplace)
[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=mig-code_teachers-marketplace)](https://sonarcloud.io/summary/new_code?id=mig-code_teachers-marketplace)

## Índice de contenidos

-   [Descripción](#descripción)
-   [Live Demo](#live-demo)
-   [Tecnologías](#tecnologías)
-   [Estructura de Carpetas](#estructura-de-carpetas)
-   [Features](#features)
-   [Images](#images)
-   [Instalación](#instalación)
-   [Uso](#uso)
-   [Autor](#autor)

## Descripción

Teachers MarketPlaces es mi proyecto final para el BootCamp de ISDI CODERS.

Es un marketplace para que padres y profesores puedan compartir material escolar.

Ha sido desplegado usando CI/CD con GitHub Actions, SonarCloud and Netlify.

Los requisitos eran crear una SPA en REACT utilizando un gestor de estado global y Firebase como BASS.

He utilizado Figma para el diseño y Trello como gestor de tareas y sprints

El principal objetivo era llegar a un 100% en coverage y lo he conseguido testeando cada feature antes de hacer el merge en la main.

## Live Demo

El proyecto esta disponible en Netlify:

-   [Teachers-Marketplaces](https://teachers-marketplace.netlify.app/)

## Tecnologías

![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=white)
![Typescript](https://img.shields.io/badge/-Typescript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Redux](https://img.shields.io/badge/-Redux-764ABC?style=flat-square&logo=redux&logoColor=white)
![React Router](https://img.shields.io/badge/-React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white)
![Jest](https://img.shields.io/badge/-Jest-C21325?style=flat-square&logo=jest&logoColor=white)
![React Testing Library](https://img.shields.io/badge/-React_Testing_Library-990000?style=flat-square&logo=react-testing-library&logoColor=white)
![Firebase](https://img.shields.io/badge/-Firebase-FFCB2B?style=flat-square&logo=Firebase&logoColor=white)
![Sass](https://img.shields.io/badge/-Sass-CF649A?style=flat-square&logo=Sass&logoColor=white)

## Estructura de carpetas

    src
    ├── core
        ├── components
        ├── hooks
        ├── models
        ├── reducer
        ├── services
        ├── store
        ├── types
    ├── features
    ├── firebase
    ├── helpers
    ├── mocks
    ├── sass
    ├── tools

## Features

-   Home Page como feed donde se pueden ver los últimos productos listados por el usuario
-   Details Page para ver toda la infromación del producto
-   Search Page con filtrado de productos
-   Autenticación mediante Firebase Authetication
-   Add product donde se pueden subir nuevos productos
-   User Page para eliminar los productos subidos

## Images

![Desktop Home Page](https://user-images.githubusercontent.com/99726342/219626394-70ffbd20-680b-4398-9bca-851b5f38e6aa.png)
![Account Details Desktop](https://user-images.githubusercontent.com/99726342/219627410-6e1cc27f-f0e8-4940-bfcc-ffb0d8de07e6.png)
![Add product Mobile](https://user-images.githubusercontent.com/99726342/219628323-c11ffc8c-ed9b-43a7-865f-8c3b75ffbe15.png)

## Instalación

Para arrancar el proyecto necesitarás clonar el repositorio e instalar las dependencias con el siguiente comando

```bash
npm install
```

También necesitarás configurar las variables de entorno de la configuración de Firebase

## Uso

Para arrancar el proyecto en modo desarrollo utiliza el siguiente comando

```bash
npm start
```

## Autor

Miguel P.gomez

-   [hola@miguelpg.com](hola@miguelpg.com)
-   [LinkedIn](https://www.linkedin.com/in/mig-code//)
-   [Web personal](https://miguelpg.com/)
