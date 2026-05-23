import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { allVehicles } from '../data/vehicles';

const ORDER_STAGES = ['Brief Confirmed', 'Editor Assigned', 'First Cut', 'Revision Review', 'Completed'];
let _counter = 0;

const demoService = (id) => allVehicles.find(v => v.id === id) || allVehicles[0];

const DEMO_ORDERS = [
  {
    id: 'LVDEMO001',
    vehicle: demoService('ad-editor'),
    booking: {
      location: 'Launch reel with fast hook, captions, and 3 ad variants',
      date: '2026-05-27',
      duration: 1,
      notes: 'Use brand colors, upbeat music, square and vertical exports.',
      total: 7500,
    },
    customer: { id: 'c1', name: 'Rhea Kapoor', phone: '+91 95432 10987' },
    operator: { id: 'w1', name: 'Maya Stone', rating: 4.9, vehicle: 'Brand films and social ads' },
    stage: 2,
    stages: ORDER_STAGES,
    placedAt: '10:15 AM',
    createdAt: '2026-05-23T04:45:00.000Z',
    status: 'active',
  },
  {
    id: 'LVDEMO002',
    vehicle: demoService('podcast-editor'),
    booking: {
      location: 'Podcast episode 18 multicam cleanup and clips',
      date: '2026-05-28',
      duration: 1,
      notes: 'Clean audio, add intro sting, and export 5 shorts.',
      total: 4800,
    },
    customer: { id: 'c1', name: 'Rhea Kapoor', phone: '+91 95432 10987' },
    operator: { id: 'w2', name: 'Arjun Mehta', rating: 4.8, vehicle: 'YouTube and podcast editing' },
    stage: 1,
    stages: ORDER_STAGES,
    placedAt: '12:30 PM',
    createdAt: '2026-05-23T07:00:00.000Z',
    status: 'assigned',
  },
  {
    id: 'LVDEMO003',
    vehicle: demoService('wedding-editor'),
    booking: {
      location: 'Wedding teaser film with cinematic color grade',
      date: '2026-05-29',
      duration: 1,
      notes: 'Romantic music, family moments, and one Instagram reel.',
      total: 15000,
    },
    customer: { id: 'c1', name: 'Rhea Kapoor', phone: '+91 95432 10987' },
    operator: { id: 'w3', name: 'Nora Quinn', rating: 5, vehicle: 'Wedding cinematic edits' },
    stage: 4,
    stages: ORDER_STAGES,
    placedAt: '03:05 PM',
    createdAt: '2026-05-22T09:35:00.000Z',
    status: 'completed',
  },
];

export const useStore = create(
  persist(
    (set, get) => ({
      orders: [],
      activeOrder: null,
      cart: [],

      ensureDemoBookings: () => {
        if (get().orders.length > 0) return;
        set({ orders: DEMO_ORDERS, activeOrder: DEMO_ORDERS[0] });
      },

      addToCart: (vehicle, booking) => {
        const item = { cartId: `cart-${Date.now()}`, vehicle, booking };
        set(s => ({ cart: [...s.cart, item] }));
      },

      removeFromCart: (cartId) => {
        set(s => ({ cart: s.cart.filter(i => i.cartId !== cartId) }));
      },

      clearCart: () => set({ cart: [] }),

      placeOrder: (vehicle, booking, customer) => {
        const order = {
          id: `LV${Date.now()}_${++_counter}`,
          vehicle,
          booking,
          customer: customer || { name: 'Guest', phone: '' },
          stage: 0,
          stages: ORDER_STAGES,
          operator: null,
          placedAt: new Date().toLocaleTimeString(),
          createdAt: new Date().toISOString(),
          status: 'pending',
        };
        set(s => ({ orders: [order, ...s.orders], activeOrder: order }));
        return order;
      },

      assignWorker: (orderId, worker) => {
        set(s => ({
          orders: s.orders.map(o =>
            o.id === orderId
              ? { ...o, operator: worker, stage: 1, status: 'assigned' }
              : o
          ),
        }));
      },

      advanceStage: (orderId) => {
        set(s => {
          const updated = s.orders.map(o => {
            if (o.id !== orderId) return o;
            const newStage = Math.min(o.stage + 1, ORDER_STAGES.length - 1);
            return {
              ...o,
              stage: newStage,
              status: newStage === ORDER_STAGES.length - 1 ? 'completed' : 'active',
            };
          });
          const updatedOrder = updated.find(o => o.id === orderId);
          return {
            orders: updated,
            activeOrder: s.activeOrder?.id === orderId ? updatedOrder : s.activeOrder,
          };
        });
      },

      cancelOrder: (orderId) => {
        set(s => ({
          orders: s.orders.map(o => o.id === orderId ? { ...o, status: 'cancelled' } : o),
          activeOrder: s.activeOrder?.id === orderId ? null : s.activeOrder,
        }));
      },

      setActiveOrder: (order) => set({ activeOrder: order }),
      clearActiveOrder: () => set({ activeOrder: null }),

      getOrdersByCustomer: (customerId) => get().orders.filter(o => o.customer?.id === customerId),
      getOrdersByWorker: (workerId) => get().orders.filter(o => o.operator?.id === workerId),
      getPendingOrders: () => get().orders.filter(o => o.status === 'pending'),
    }),
    { name: 'lovito-orders' }
  )
);
