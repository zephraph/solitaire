# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- Always prefer to use a `mise` task when possible by running `mise run ...`. For instance, `mise run build`. If you need to invoke another command like `bun`, do so via `mise x --` like `mise x -- bun add`. Otherwise you'll get a not found error.

### Available Scripts
- `mise run build` - Compile TypeScript to JavaScript
- `mise run dev` - Run the game in watch mode with hot reload
- `mise run start` - Start the solitaire game
- `mise x -- bun game` - Alternative way to start the game
- `mise run format` - Format code using Biome
- `mise run lint` - Lint and auto-fix code using Biome
- `mise run release` - Release a new version using auto

### Running the Game
- `npx @zephraph/solitaire` - Run the published package
- `mise run dev` - Run in development mode with hot reload

## Architecture Overview

This is a terminal-based solitaire game built with React (via @opentui/react for terminal rendering), TypeScript, and Zustand for state management.

### Key Architecture Components

**State Management (store.ts)**
- Uses Zustand for global game state
- Single store pattern with actions and derived state getters
- Main state includes deck (CardState[]) and highlightedArea
- Cards have area, position, rank, suit, faceUp, and selected properties
- Four main areas: "stock", "waste", "foundation", "tableau"

**Controls System (controls.ts)**
- Three separate hook-based control systems:
  - `useHighlightCardControls()` - Arrow key navigation between game areas
  - `useStockControls()` - Space key to flip stock cards to waste pile
  - `useSelectCardControls()` - Space key to select/move cards, flip face-down cards
- Uses @opentui/react's useKeyboard hook for input handling

**Game Layout (components/Board/)**
- Board component renders four main game areas:
  - Stock - Face-down deck pile
  - Waste - Face-up cards from stock
  - Foundation - Four suit-specific foundation piles (Ace to King)
  - Tableau - Seven columns of cascading cards
- Each area is a separate React component

**Card System**
- CardState interface defines card properties (rank, suit, position, area, faceUp, selected)
- Helper functions for game logic (isCardMovableToTableau, isCardMovableToFoundation, etc.)
- Standard 52-card deck generation with proper solitaire layout initialization

### Key Dependencies
- @opentui/react - Terminal-based React rendering
- zustand - State management
- es-toolkit - Utility functions (cloneDeep, last, etc.)
- biome - Code formatting and linting

The game follows standard Klondike solitaire rules with keyboard navigation using arrow keys for highlighting and space for selection/actions.