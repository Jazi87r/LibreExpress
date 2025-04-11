# LibreExpress
# Table of Contents
1. [Description](#description)
2. [Development enviroment](#development-enviroment)
3. [Collaborators](#Collaborators)
## Description
Libre Express is an e-commerce project for a small technology products store aiming to expand its operations. The project involves developing a web application that allows customers to browse products, make online purchases, and manage their order history. Key features include user management, a shopping cart, and a simulated payment gateway. An administrative module will help employees manage inventory, update prices, and process orders, with the goal of creating a secure and user-friendly platform.
## Development enviroment:
### Code editor:
- VisualStudio Code
### FrontEnd
- HTML
- CSS
- JavaScript
### BackEnd
- NodeJS
- Express
### DataBase
- MongoDB
## Installation

### 1.Clone the repository
```bash
git clone https://github.com/Jazi87r/LibreExpress
```
### 2. installation of modules for backend and frontend
```bash
cd LibreExpress/backend
npm install
cd ..
cd LibreExpress/frontend
npm install
```
### 3. Run the servers that are hosted in Backend and Frontend
```bash
cd LibreExpress/backend
npm start
cd ..
cd LibreExpress/frontend
npm start
```
# Shopping Cart with Factory Method

## Overview
This project implements a shopping cart using the **Factory Method** design pattern, which allows cart creation to be centralized through a factory (`CartFactory`). The Factory Method ensures that the creation logic is decoupled from the cart's use, promoting extensibility and code maintainability.

The cart controller (`cartController`) includes functionalities such as:
- Retrieving items from the cart.
- Adding new products to the cart.
- Deleting existing products.

The entire workflow is designed following clean and modular programming principles.

---

## Project Structure

### **1. Cart Model (`Cart`)**
The `Cart` class encapsulates the cart's logic and data. It includes methods for adding, removing, and retrieving products.

#### Código:
```javascript
class Cart {
    constructor(items = []) {
        this.items = items; // Inicializa el carrito con una lista vacía o existente
    }

    // Agrega un producto al carrito
    addItem(item) {
        this.items.push(item);
    }

    // Elimina un producto del carrito por su ID
    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
    }

    // Devuelve todos los productos en el carrito
    getItems() {
        return this.items;
    }
}

module.exports = Cart;
```
# MVC Design Pattern (Model-View-Controller)

The MVC (Model-View-Controller) design pattern is a software architecture that divides an application into three main components, promoting better organization, scalability, and maintainability.

---

## Structure of the MVC Pattern

### 1. **Model**
The Model is responsible for managing the data and business logic of the application. It represents the data and the rules of the system. Additionally:
- It handles database operations such as Create, Read, Update, and Delete (CRUD).
- It does not directly interact with the View or Controller.

**Example:**  
```javascript
class ProductModel {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  save() {
    // Logic to save the product in the database
  }
}
```

## Collaborators
- derinson
- neydercm
- Carlos-web322
- jazi87r

