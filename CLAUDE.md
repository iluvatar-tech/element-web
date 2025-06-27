# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **Element Web** (formerly Riot/Vector), a Matrix web client built with React and TypeScript. It's a secure, decentralized messaging application that supports end-to-end encryption, spaces/communities, voice/video calls, and extensive customization.

**Key Technologies**: React 19, TypeScript, PostCSS, Webpack, Jest, Playwright, Matrix JS SDK

## Essential Development Commands

### Build & Development
```bash
# Start development server (port 8080)
yarn start

# Start with HTTPS
yarn start:https

# Production build
yarn build

# Create distribution tarball
yarn dist

# Clean build artifacts
yarn clean
```

### Code Quality
```bash
# Run all linting (types, JS, CSS, workflows)
yarn lint

# Auto-fix linting issues
yarn lint:js-fix

# Type checking only
yarn lint:types
```

### Testing
```bash
# Unit tests with Jest
yarn test

# End-to-end tests with Playwright
yarn test:playwright

# Test coverage
yarn coverage
```

### Development Setup
1. Copy `config.sample.json` to `config.json` and configure
2. For matrix-js-sdk development: `yarn link matrix-js-sdk` after building SDK
3. Development server runs at `http://127.0.0.1:8080/`

## Architecture Overview

### Core Patterns
- **Flux Architecture**: Central dispatcher for cross-component communication
- **Store Pattern**: AsyncStore-based state management with immutable updates
- **Context Pattern**: React contexts for dependency injection (MatrixClientContext, RoomContext)
- **Singleton Pattern**: MatrixClientPeg for Matrix client lifecycle

### Key Components Hierarchy
- **MatrixChat** - Root application component, handles routing
- **LoggedInView** - Main authenticated layout
- **Structures**: Major layout components (LeftPanel, RoomView, RightPanel, MainSplit)
- **Views**: Smaller UI components organized by function (dialogs/, auth/, rooms/, elements/)

### State Management
- **MatrixClientPeg** (`src/MatrixClientPeg.ts`) - Central Matrix client singleton
- **Dispatcher** (`src/dispatcher/`) - Flux-style event bus with typed payloads
- **Stores** (`src/stores/`) - AsyncStore-based state containers:
  - `RoomViewStore` - Current room/thread navigation
  - `RoomListStore` - Room organization and filtering
  - `SettingsStore` - Multi-level settings management
  - `SpaceStore` - Space/community organization

### Authentication & Routing
- **Hash-based routing** with deep-linking support
- **Multiple auth methods**: Password, SSO, OIDC, token-based
- **Session management**: Secure storage, device verification, cross-signing

## File Organization

### Source Structure
- `src/components/structures/` - Major layout components
- `src/components/views/` - Smaller UI components by functional area
- `src/stores/` - State management stores
- `src/dispatcher/` - Action system and payloads
- `src/utils/` - Utility functions and helpers
- `src/hooks/` - React hooks
- `src/contexts/` - React contexts

### Resources
- `res/css/` - PostCSS stylesheets (NOT SCSS)
- `res/img/` - Images and icons
- `res/themes/` - Theme-specific resources

### Testing
- `test/unit-tests/` - Jest unit tests
- `playwright/e2e/` - Playwright end-to-end tests

## Code Style Guidelines

### TypeScript/React
- Use **TypeScript** for all new code
- **Named exports** preferred
- **Hooks** preferred over class components (except structures)
- **Interface per component** with Props/State interfaces
- **TSDoc comments** for public APIs
- **4 space indentation**, 120 character line limit

### CSS (PostCSS)
- **mx_** prefix for all class names
- **Component-specific naming**: `.mx_ComponentName_elementName`
- **Minimal nesting** (max 5 levels)
- **Document overrides** with comments for z-index, pixel adjustments

### Testing
- **TypeScript** for all tests
- **Jest** for unit tests, **Playwright** for E2E
- Follow `describe/it should...` pattern

## Common Development Tasks

### Adding New Components
- Place in appropriate `src/components/structures/` or `src/components/views/` directory
- Follow existing patterns for Props/State interfaces
- Create corresponding CSS file with `mx_` prefixed classes
- Add unit tests in `test/unit-tests/`

### Store Development
- Extend `AsyncStore` or `AsyncStoreWithClient`
- Use dispatcher for action handling
- Emit updates via EventEmitter pattern
- Follow singleton pattern with static instance

### Matrix SDK Integration
- Use `MatrixClientPeg.safeGet()` for client access
- Handle client lifecycle changes
- Use hooks like `useEventEmitter` for Matrix events

### Settings
- Add to `src/settings/Settings.tsx` with appropriate controller
- Support multi-level hierarchy (device → room → account → config)
- Use `SettingsStore.getValue()` for access

## Important Notes

- **No CDN dependencies** - package all external resources
- **Offline support** - ensure functionality without internet
- **Security focus** - never log sensitive data, follow secure practices
- **Browser support** - Last 2 major versions of Chrome/Firefox/Safari/Edge
- **Development branch**: `develop` (not `main`)
- **Pull requests** must target `develop` branch