import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useUserStore } from './userStore';

// Example of another store for different features
interface ExampleState {
  count: number;
  isVisible: boolean;
  notifications: string[];

  // Actions
  increment: () => void;
  decrement: () => void;
  toggleVisibility: () => void;
  addNotification: (message: string) => void;
  removeNotification: (index: number) => void;
  clearNotifications: () => void;
}

export const useExampleStore = create<ExampleState>()(
  devtools(
    (set, get) => ({
      count: 0,
      isVisible: true,
      notifications: [],

      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
      toggleVisibility: () => set((state) => ({ isVisible: !state.isVisible })),

      addNotification: (message) => set((state) => ({
        notifications: [...state.notifications, message]
      })),

      removeNotification: (index) => set((state) => ({
        notifications: state.notifications.filter((_, i) => i !== index)
      })),

      clearNotifications: () => set({ notifications: [] }),
    }),
    {
      name: 'example-store',
    }
  )
);

// Example of how to use multiple stores together
export const useCombinedStores = () => {
  const userStore = useUserStore();
  const exampleStore = useExampleStore();

  return {
    ...userStore,
    ...exampleStore,
    // You can add computed values that depend on multiple stores
    getTotalItems: () => userStore.users.length + exampleStore.count,
  };
}; 