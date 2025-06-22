# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Building and Development
- `npm run dev` - Start development server with Vite
- `npm run build` - Build production bundle (runs TypeScript check then Vite build)
- `npm run preview` - Preview production build

### Code Quality
- `npm run lint` - Run Biome linter
- `npm run lint:fix` - Run Biome linter with auto-fix and formatting
- `npm test` - Run Jest tests

### Testing
- `npm test` - Run all tests
- `npx jest path/to/test.test.ts` - Run specific test file
- Test files are located in `test/` directory with `.test.ts` extension

## Architecture Overview

This is a fractal visualization web application built with TypeScript, Vite, and HTML5 Canvas. The architecture follows a modular pattern with clear separation of concerns and uses ES6 modules with centralized exports.

### Core Components

**Container** (`src/container.ts`): Main application orchestrator that wires together all modules
- Instantiates Visualizer, Simulator, ViewEvent, and View
- Acts as dependency injection container
- Simple constructor-based dependency injection pattern

**Visualizer** (`src/visualizer.ts`): Canvas rendering engine
- Handles drawing fractal charts to HTML5 Canvas
- Supports 4 drawing styles: Line, Triangle, Circles, Curve
- Implements performance optimizations like viewport culling
- Exports default class without interface prefix

**Simulator** (`src/modules/simulator/index.ts`): Fractal computation and animation engine
- Manages fractal generation, animation timing, and user interactions
- Handles scroll events for navigation and touch interactions
- Loads chart configurations from `charts.json`
- Implements 60fps animation with background tab pausing
- Optimized for performance with point/color memory reuse
- Exported through centralized module exports

**ViewEvent** (`src/viewEvent/index.ts`): Event handling layer
- Bridges user interactions between View and Simulator/Visualizer
- Default export pattern

**View** (`src/view/index.ts`): DOM manipulation and UI management
- Handles canvas setup and user interface elements
- Manages canvas resizing and responsive layout
- Named export with class-based structure

### Module Organization

**Centralized Exports**: The codebase uses centralized export files for clean module organization:
- `src/libs/index.ts` - Exports collection and math utilities
- `src/modules/index.ts` - Exports Randomizer and Simulator

### Fractal Chart System

**Chart Types** (`src/modules/simulator/chart/kinds/`):
All chart types are exported as default exports from their respective files:
- BinaryTree (`binaryTree.ts`)
- Circle (`circle.ts`) 
- Clover (`clover.ts`)
- Random (`random.ts`)
- Star variants (`star.ts`, `starmine.ts`)
- Sunrise (`sunrise.ts`)
- Fold curves (`fold/` directory): FoldCurve, KochCurve, KochTriangle, TriCurve

**Chart Configuration** (`src/charts.json`):
- Contains predefined fractal configurations with parameters for complexity, positioning, colors, animation, and styling
- Each chart specifies: kind, complexity, center, scale, rotation, mutation, randomizer, style, color

**Chart Models** (`src/modules/simulator/chart/models.ts`):
- Defines data structures for Point, Order, Chart, ChartConfig
- Handles fractal generation parameters and rendering properties

**Chart Components**:
- Orders (`src/modules/simulator/chart/orders.ts`) - Manages fractal iteration logic
- Points (`src/modules/simulator/chart/points.ts`) - Handles point generation and transformation
- Color (`src/modules/simulator/color.ts`) - Color management for fractals
- Loader (`src/modules/simulator/loader.ts`) - Chart configuration loading

### Utilities

**Math Library** (`src/libs/math.ts`): 
- `radian2degree()` and `degree2radian()` conversion functions
- Mathematical utilities for fractal calculations

**Collection Library** (`src/libs/collection.ts`):
- `range()` function for array generation
- Data structure utilities

**Randomizer** (`src/modules/randomizer.ts`): 
- Default export for randomization utilities
- Procedural generation support

## Code Conventions

- **TypeScript**: Strict configuration with ES6+ features
- **Biome**: Used for linting and formatting with these settings:
  - 2-space indentation
  - 120 character line width
  - Targets `src/` and `test/` directories
  - Enabled rules: recommended, correctness (undeclared/unused variables/imports), import type disabled
- **Module Pattern**: 
  - Default exports for main classes and components
  - Centralized exports through `index.ts` files
  - No interface prefixes in current implementation
- **Architecture**: Clear separation between rendering (Visualizer), simulation (Simulator), and UI (View/ViewEvent)
- **Testing**: Jest with `ts-jest` preset, test files mirror source structure
- **Rendering**: HTML5 Canvas for fractal visualization
- **File Structure**: Organized by feature/module with index file exports

## Testing Patterns

- Test files mirror source structure in `test/` directory
- Common chart test utilities in `test/modules/simulator/chart/testCommon.ts`
- Uses `baseChart` configuration for consistent test setup
