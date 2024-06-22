
# DepthAngular

DepthAngular is an open-source project designed as a serverless alternative to LeiaPix/Immersity AI, leveraging Angular 18 standalone components and the Angular Material library. This project aims to enhance the capabilities of the Xenova tech demo with additional features and improvements.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Development Server](#development-server)
- [Code Scaffolding](#code-scaffolding)
- [Build](#build)
- [Running Unit Tests](#running-unit-tests)
- [Running End-to-End Tests](#running-end-to-end-tests)
- [Libraries Used](#libraries-used)
- [Further Help](#further-help)

## Features
- Angular 18 standalone components
- Angular Material for modern UI components
- Integration with Xenova Transformers for AI capabilities
- Canvas Capture for media processing
- Three.js for 3D rendering

## Installation

To get started with DepthAngular, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/DarioFT/depth-angular.git
    cd depth-angular
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

## Development Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

```bash
ng serve
```

## Code Scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

```bash
ng generate component component-name
```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

```bash
ng build
```

## Running Unit Tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

```bash
ng test
```

## Running End-to-End Tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

```bash
ng e2e
```

## Libraries Used

- **@angular/material**: Angular Material is used for implementing modern UI components.
  ```json
  "@angular/material": "^18.0.4"
  ```

- **@xenova/transformers**: This library provides AI capabilities through various transformers.
  ```json
  "@xenova/transformers": "^2.17.2"
  ```

- **canvas-capture**: Used for media processing and capturing canvas content.
  ```json
  "canvas-capture": "^2.1.1"
  ```

- **three**: Three.js is used for 3D rendering and visualization.
  ```json
  "three": "^0.165.0"
  ```

## Further Help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

---

Feel free to contribute to the project by opening issues and pull requests. For major changes, please open an issue first to discuss what you would like to change.

Happy coding!
