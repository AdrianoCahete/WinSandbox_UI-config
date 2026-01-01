# Windows Sandbox UI Configuration

A modern web application built with Nuxt 4 for generating Windows Sandbox configuration files.

## Features

- 🎨 Built with Nuxt 4 and NuxtUI
- ⚡ Real-time XML configuration generation
- 🎛️ Interactive toggle controls for sandbox settings
- 📋 Copy to clipboard functionality
- 📱 Responsive two-column layout

## Prerequisites

- Node.js 18.x or higher
- npm or yarn

## Installation

```bash
# Install dependencies
npm install
```

## Development

```bash
# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

## Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Configuration Options

The application provides controls for three Windows Sandbox settings:

1. **vGPU (Virtual GPU)** - Enable/disable GPU virtualization sharing
2. **Networking** - Control network access for the sandbox
3. **Protected Client** - Add additional security hardening

## Technology Stack

- Nuxt 4.2.2
- NuxtUI 3.3.7
- Vue 3.5.26
- Sass 1.93.3
- Sass-embedded 1.93.3
- Tailwind CSS (via NuxtUI)