# Sporenkijker

A real-time 3D digital twin application for Belgian train spotters, built with Next.js, React Three Fiber, and the iRail API.

## Overview

Sporenkijker visualizes Belgian railway stations in 3D, displaying live train departure data on an interactive map. Users select stations to view upcoming departures and click platforms to highlight trains in the 3D scene.

## Tech Stack

- **Next.js 16** with React 19
- **React Three Fiber** for 3D rendering
- **@react-three/drei** for Three.js helpers
- **TypeScript** for type safety
- **SCSS/Tailwind** for styling
- **iRail API** for live Belgian train data

## Key Features

- Real-time train departure data from iRail API
- Interactive 3D map with clickable stations and platforms
- Responsive camera system with desktop/mobile optimizations
- Platform highlighting with emissive materials
- Automatic data refresh every 60 seconds
- Minimizable UI panels

## Development

install node modules:
```bash
npm install
```
also works with bun, pnpm or yarn

```bash
npm run dev
```

Runs on `http://localhost:4066`

## Build

```bash
npm run build
npm start
```

## Data Flow

1. User selects station → `StationSelect` updates context
2. Camera animates to station position
3. `PlatformSelect` fetches live train data from API
4. API calls iRail, filters upcoming trains, returns one per platform
5. `filterTrains` updates visible 3D meshes
6. User clicks train → camera pans to platform, mesh highlights

## 3D Model Structure

The GLTF model (`042_sporenkijker_export_12.gltf`) contains:
- Base map geometry (tracks, terrain)
- Station empties (positioned reference objects)
- Platform meshes named: `{StationID}{PlatformNumber}` (e.g., `BE.NMBS.008814001003`)

Mesh names are matched against station IDs and platform numbers to enable selective rendering and highlighting.
