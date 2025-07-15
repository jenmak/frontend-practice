# User Directory with State Management

This project demonstrates a comprehensive state management solution using **Zustand** for global state and **React Context** for theme management.

## Architecture Overview

### State Management Strategy

We use a hybrid approach combining Zustand and React Context based on the specific use case:

#### Zustand Store (`src/store/userStore.ts`)
- **Purpose**: Global application state that needs to be accessed by multiple components
- **Use Cases**:
  - User data management (fetching, filtering, sorting)
  - Loading states
  - Error handling
  - Search functionality
- **Benefits**:
  - Lightweight and simple API
  - Built-in TypeScript support
  - DevTools integration
  - No provider wrapping required

#### React Context (`src/context/ThemeContext.tsx`)
- **Purpose**: UI-specific state that affects the entire component tree
- **Use Cases**:
  - Theme management (light/dark mode)
  - Language preferences
  - Authentication context
- **Benefits**:
  - Built into React
  - Perfect for UI state that affects many components
  - Clear provider pattern

## File Structure

```
src/
├── store/
│   └── userStore.ts          # Zustand store for user management
├── context/
│   └── ThemeContext.tsx      # React Context for theme management
├── components/
│   ├── UserList.tsx          # Displays user list using Zustand
│   ├── SearchBar.tsx         # Search functionality using Zustand
│   ├── SortButton.tsx        # Sorting functionality using Zustand
│   └── ThemeToggle.tsx       # Theme toggle using React Context
└── AppExample.tsx            # Main app component
```

## Key Features

### Zustand Store Features
- **User Management**: Fetch, filter, and sort users
- **Loading States**: Track API request states
- **Error Handling**: Centralized error management
- **Search Functionality**: Real-time filtering
- **Sorting**: Toggle between ascending/descending order
- **DevTools Integration**: Debug state changes in browser

### React Context Features
- **Theme Management**: Light/dark mode toggle
- **Provider Pattern**: Wrap app with theme context
- **Type Safety**: Full TypeScript support

## Usage Examples

### Using Zustand Store
```typescript
import { useUserStore } from './store/userStore';

function MyComponent() {
  const { users, loading, fetchUsers, setSearchTerm } = useUserStore();
  
  // Access state and actions directly
  return (
    <div>
      {loading ? 'Loading...' : users.map(user => <div>{user.name}</div>)}
    </div>
  );
}
```

### Using React Context
```typescript
import { useTheme } from './context/ThemeContext';

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}
```

## When to Use Each

### Use Zustand When:
- You need global state that many components access
- You want simple, lightweight state management
- You need complex state logic with actions
- You want built-in DevTools support
- You're managing data that doesn't change frequently

### Use React Context When:
- You need UI state that affects the entire app
- You want to avoid prop drilling
- You're managing simple state (like themes, language)
- You want to stay within React's ecosystem
- The state is primarily for UI configuration

## Installation

```bash
npm install zustand
```

## Running the Application

```bash
npm start
```

The application will demonstrate:
1. User data fetching and display
2. Real-time search functionality
3. Sorting with visual feedback
4. Theme switching with smooth transitions
5. Error handling and loading states

## Benefits of This Architecture

1. **Separation of Concerns**: Business logic in Zustand, UI state in Context
2. **Performance**: Zustand's selective re-rendering
3. **Developer Experience**: TypeScript support and DevTools
4. **Maintainability**: Clear patterns and reusable components
5. **Scalability**: Easy to add new features and state 