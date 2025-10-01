# MonitorX

A cross-platform desktop application built with Tauri and React that provides activity monitoring by interfacing with ActivityWatch's REST API. The application features a modern UI with both light and dark themes, password protection, and comprehensive activity tracking capabilities.

## Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Tauri (Rust-based)
- **UI Framework**: HeroUI + Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Core Features

### 1. Activity Monitoring System

The application connects to ActivityWatch's local API server running on `localhost:5600` to fetch and manage window activity data.

**Key Components:**
```typescript
// Core API integration in ActivityStore.ts
const fetchBuckets = async () => {
  const response = await fetch(bucketUrl, { method: "GET" });
  const data = await response.json();
  // Process bucket data and extract window watcher information
}

const fetchWindowTitle = async () => {
  const eventResponse = await fetch(
    `http://localhost:5600/api/0/buckets/${windowEventUrl}/events`,
    { method: "GET" }
  );
  const windowArr = await eventResponse.json();
  setWindowEventsArr(windowArr);
}
```

**Features:**
- Fetches application usage data from ActivityWatch buckets
- Displays window titles, application names, duration, and timestamps
- Real-time activity tracking with automatic data refresh
- Activity search and filtering capabilities

### 2. Password Protection System

Implements a local file-based authentication system for securing access to sensitive features.

**Implementation:**
```typescript
// Password management in ActivityStore.ts
const assignPassword = async () => {
  const data = { key: userPassword };
  await writeTextFile(
    await join("PolishedConfig", "tyson.json"),
    JSON.stringify(data),
    { baseDir: BaseDirectory.Document }
  );
}

const verifyPassword = (pass: string) => {
  if (pass === passowrdInfo?.key) {
    setIsVerified(true);
  }
}
```

**Features:**
- Password creation and storage in local documents directory
- Password verification for accessing protected features
- Persistent authentication state management

### 3. Activity Data Management

Provides comprehensive tools for viewing, searching, and managing activity data.

**Core Functionality:**
```typescript
// Activity search in ActivityStore.ts
const searchActivity = () => {
  let tempArr = windowEventsArr.filter((item) =>
    item.data.title.toLowerCase().includes(searchKeyWord.trim().toLowerCase())
  );
  setTempWindowEventsArr(tempArr);
}

// Individual event deletion
const removeEvent = async (eventID) => {
  const eventResponse = await fetch(
    `http://localhost:5600/api/0/buckets/${windowEventUrl}/events/${eventID}`,
    { method: "DELETE" }
  );
}
```

**Features:**
- Real-time activity search by window title
- Individual activity event deletion (password protected)
- Complete activity history clearing (password protected)
- Activity duration tracking and display

### 4. Custom Window Management

Built with Tauri's custom window decorations for a native desktop experience.

**Window Controls:**
```typescript
// Window management in MenuBar.tsx
const startDraggingWindow = async () => {
  await getCurrentWindow().startDragging();
}

const handleFullScreen = async () => {
  let screenStatus = await getCurrentWindow().isFullscreen();
  await getCurrentWindow().setFullscreen(!screenStatus);
}
```

**Features:**
- Custom title bar with window controls (minimize, maximize, close)
- Draggable window area for repositioning
- Fullscreen toggle functionality
- Transparent window support

### 5. Cross-Platform OS Detection

Automatically detects the operating system to provide platform-specific UI adaptations.

**Implementation:**
```typescript
// OS detection in osInfoStore.ts
const detectMobileOS = () => {
  const currentOS = platform();
  if (currentOS === "android" || currentOS === "ios") {
    set({ isMobileOS: true });
  } else {
    set({ isMobileOS: false });
  }
}
```

**Features:**
- Mobile vs desktop OS detection
- Platform-specific UI adjustments
- Conditional component rendering based on OS type

### 6. Theme System

Comprehensive dark/light theme implementation with persistent preferences.

**Theme Management:**
```typescript
// Theme control in themeStore.ts
const useThemeStore = create<ThemeState>((set) => ({
  dark: true,
  setDark: (value) => set({ dark: value }),
  toggleDark: () => set((state) => ({ dark: !state.dark })),
}));

// Theme persistence in App.tsx
useEffect(() => {
  if (dark) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}, [dark]);
```

**Features:**
- Toggle between light and dark themes
- Persistent theme preferences via localStorage
- Smooth transitions between theme states
- System-wide theme application

### 7. Update Management System

Built-in application update checking with metadata fetching from GitHub.

**Update System:**
```typescript
// Update checking in ApplicationStore.ts
const checkApplicationUpdate = async () => {
  let currentVersion = await getVersion();
  let response = await fetch(metadataUrl);
  let data = await response.json();
  
  if (localApplicationVersion < onlineApplicationVersion) {
    setApplicationUpdateAvailable(true);
  }
}
```

**Features:**
- Automatic update checking on startup
- Version comparison between local and remote
- Update notifications via toast system
- Metadata fetching from GitHub repository

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── contextMenu/     # Right-click context menu
│   ├── home/           # Home page components
│   └── menuBar/        # Custom title bar and navigation
├── constants/          # Application constants
├── interface/          # TypeScript interfaces
├── routes/            # Page components
├── store/             # Zustand state management
└── ui/               # Basic UI components

src-tauri/            # Rust backend (Tauri)
├── src/             # Rust source code
├── icons/           # Application icons
└── capabilities/    # Tauri permissions
```

## Key State Management

The application uses Zustand for state management with the following stores:

- **ActivityStore**: Manages ActivityWatch API integration and activity data
- **ApplicationStore**: Handles app metadata, updates, and menu state
- **ThemeStore**: Controls light/dark theme preferences
- **DatabaseStore**: Manages local database operations
- **ContextMenuStore**: Controls context menu visibility
- **OsInfoStore**: Handles OS detection and platform-specific logic

## Installation & Development

### Prerequisites
- Node.js (v18+)
- Rust toolchain
- ActivityWatch installed and running

### Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run Tauri development
npm run tauri dev
```

### Building
```bash
# Build the application
npm run tauri build
```

## Configuration

The application requires ActivityWatch to be running on `localhost:5600`. Password data is stored locally in the user's documents directory under `PolishedConfig/tyson.json`.

## Dependencies

**Main Dependencies:**
- React & React DOM for UI
- Tauri plugins (fs, http, os, opener)
- HeroUI for component library
- Zustand for state management
- React Router for navigation
- Tailwind CSS for styling

**Development Dependencies:**
- TypeScript for type safety
- Vite for build tooling
- Tauri CLI for desktop app building

