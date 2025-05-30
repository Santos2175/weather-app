# Weather App

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Building for Production](#building-for-production)
- [Docker Support](#docker-support)
- [Authors](#authors)
- [Acknowledgements](#acknowledgments)

---

## Introduction

A sleek, modern weather application built with React, TypeScript, and Vite. This application provides real-time weather information with a beautiful, responsive user interface and dark mode support.

---

## Features

- Real-time weather data for any city
- Dark/Light mode support
- Fully responsive design
- Interactive weather charts and graphs
- City search functionality
- Modern UI with smooth animations
- Automatic data refresh
- Detailed weather metrics and forecasts
- Add to favourities functionality

---

## Tech Stack

- **Frontend Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **State Management:** React Query
- **Api Requests:** Axios
- **Routing:** React Router
- **Charts:** Recharts
- **Notifications:** Sonner
- **Date Handling:** date-fns
- **Icons:** Lucide React

---

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm package manager

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Santos2175/weather-app.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
```

---

## Docker Support

The project includes Docker configuration for containerized deployment:

```bash
# Build the Docker image
docker build -t weather-app .

# Run the container
docker run -p 5173:5173 weather-app
```

---

## Authors

- Santosh Gurung

---

## Acknowledgments

- Weather data provided by [https://openweathermap.org/api]
- Icons by [Lucide Icons](https://lucide.dev)

---
