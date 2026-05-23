import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const DEMO_USERS = [
  { id: 'a1', email: 'admin@lovito.com', password: 'admin123', role: 'admin', name: 'Lovito Admin', phone: '+91 98000 00001' },
  { id: 'w1', email: 'maya@lovito.com', password: 'editor123', role: 'worker', name: 'Maya Stone', phone: '+91 98765 43210', vehicle: 'Brand films and social ads', rating: 4.9, jobsDone: 142, available: true },
  { id: 'w2', email: 'arjun@lovito.com', password: 'editor123', role: 'worker', name: 'Arjun Mehta', phone: '+91 97654 32109', vehicle: 'YouTube and podcast editing', rating: 4.8, jobsDone: 98, available: true },
  { id: 'w3', email: 'nora@lovito.com', password: 'editor123', role: 'worker', name: 'Nora Quinn', phone: '+91 96543 21098', vehicle: 'Wedding cinematic edits', rating: 5.0, jobsDone: 210, available: false },
  { id: 'c1', email: 'customer@lovito.com', password: 'customer123', role: 'customer', name: 'Rhea Kapoor', phone: '+91 95432 10987' },
];

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      users: DEMO_USERS,

      login: (email, password) => {
        const found = get().users.find(u => u.email === email && u.password === password);
        if (!found) return { error: 'Invalid email or password' };
        set({ user: found });
        return { success: true, role: found.role };
      },

      register: (data) => {
        const exists = get().users.find(u => u.email === data.email);
        if (exists) return { error: 'Email already registered' };
        const newUser = { id: `c${Date.now()}`, ...data };
        set(s => ({ users: [...s.users, newUser] }));
        return { success: true };
      },

      logout: () => set({ user: null }),

      updateWorkerAvailability: (workerId, available) => {
        set(s => ({
          users: s.users.map(u => u.id === workerId ? { ...u, available } : u),
          user: s.user?.id === workerId ? { ...s.user, available } : s.user,
        }));
      },

      getWorkers: () => get().users.filter(u => u.role === 'worker'),
      getCustomers: () => get().users.filter(u => u.role === 'customer'),
    }),
    { name: 'lovito-auth' }
  )
);
