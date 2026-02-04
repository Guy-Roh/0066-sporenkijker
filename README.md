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

## Architecture

### Core Components

**MainApp.tsx**
- Wraps the Canvas component from React Three Fiber
- Handles WebGL/WebGPU rendering
- Mobile detection for optimized rendering

**AppContext.tsx**
- Centralized state management via React Context
- Manages active station, train data, camera controls, platforms
- Provides refs for camera manipulation across components

**MainScene.tsx**
- Sets up the 3D scene with camera controls, environment, and lighting
- Loads GLTF 3D model containing station and platform meshes
- Filters visible meshes based on active station and train data

**MapMesh.tsx**
- Renders filtered 3D meshes from the GLTF model
- Highlights selected platform with emissive material
- Maps platform numbers to specific mesh nodes

### UI Components

**StationSelect.tsx**
- Lists available Belgian stations
- Moves camera to selected station on click
- Toggles station selection (click again to deselect)

**PlatformSelect.tsx**
- Displays live departure data for selected station
- Shows destination, platform, time, and delay
- Clicking a train pans camera to that platform
- Fetches fresh data when station changes

**MainPanel.tsx**
- Container for station selection UI
- Minimizable sidebar with toggle button

### Helper Modules

**GetData.ts**
- Fetches train data from `/api/trains` endpoint
- Retry logic for empty responses
- Type-safe data handling

**Camera.ts**
- Camera movement functions: `ResetCamera`, `MoveCameraToStation`, `PanCameraToPlatform`
- Separate desktop/mobile camera configurations
- Smooth animated transitions using CameraControls

**Trains.ts**
- `filterTrains`: Filters GLTF nodes to show only relevant stations and platforms
- `getTrainPosition`: Maps platform numbers to 3D positions
- `formatPlatformId`: Normalizes platform identifiers (pads numbers with zeros)
- `CleanId`: Removes dots from station IDs for mesh matching

### API Routes

**api/trains/route.ts**
- Server-side fetch from iRail API (`https://api.irail.be/liveboard/`)
- Filters trains departing within 15 minutes
- Returns one train per platform (earliest departure)
- Excludes platforms marked with "?"
- Formats times for Europe/Brussels timezone

### Data Files

**stationData.json**
- List of supported Belgian stations with IDs and camera offsets
- Desktop and mobile camera position configurations per station

**textData.json**
- UI text strings for internationalization readiness

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
- Base map geometry (roads, terrain)
- Station empties (positioned reference objects)
- Platform meshes named: `{StationID}{PlatformNumber}` (e.g., `BE.NMBS.008814001003`)

Mesh names are matched against station IDs and platform numbers to enable selective rendering and highlighting.
