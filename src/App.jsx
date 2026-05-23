import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Browse from './pages/Browse';
import BookingFlow from './pages/BookingFlow';
import OrderTracking from './pages/OrderTracking';
import Orders from './pages/Orders';
import Cart from './pages/Cart';
import CustomerDashboard from './pages/CustomerDashboard';
import CustomerLayout from './pages/CustomerLayout';
import CustomerChat from './pages/CustomerChat';
import CustomerProgress from './pages/CustomerProgress';
import { Contact, EditorDetails, Portfolio, Pricing, QuickEditors, Services, Support } from './pages/MarketingPages';
import { useStore } from './store/useStore';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOrders from './pages/admin/AdminOrders';
import AdminWorkers from './pages/admin/AdminWorkers';
import AdminLayout from './pages/admin/AdminLayout';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminMore from './pages/admin/AdminMore';
import AdminProducts from './pages/admin/AdminProducts';
import AdminReports from './pages/admin/AdminReports';
import AdminPayments from './pages/admin/AdminPayments';
import AdminPaymentRequests from './pages/admin/AdminPaymentRequests';
import AdminNotifications from './pages/admin/AdminNotifications';

import WorkerDashboard from './pages/worker/WorkerDashboard';
import WorkerLayout from './pages/worker/WorkerLayout';
import WorkerHome from './pages/worker/WorkerHome';
import WorkerOrders from './pages/worker/WorkerOrders';
import WorkerHistory from './pages/worker/WorkerHistory';
import WorkerWallet from './pages/worker/WorkerWallet';
import WorkerProfile from './pages/worker/WorkerProfile';
import WorkerChat from './pages/worker/WorkerChat';

import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Layout() {
  const { pathname } = useLocation();
  const isAdminOrWorker = pathname.startsWith('/admin') || pathname.startsWith('/worker') || pathname.startsWith('/editor');
  const ensureDemoBookings = useStore(s => s.ensureDemoBookings);

  useEffect(() => {
    ensureDemoBookings();
  }, [ensureDemoBookings]);

  return (
    <>
      {!isAdminOrWorker && <Navbar />}
      <main style={{ paddingBottom: '0', paddingTop: isAdminOrWorker ? '0' : '88px' }}>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/quick-editors" element={<QuickEditors />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/services" element={<Services />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/support" element={<Support />} />
          <Route path="/editors/:id" element={<EditorDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Customer */}
          <Route path="/book/:id" element={<BookingFlow />} />
          <Route path="/track/:id" element={<OrderTracking />} />
          <Route path="/orders" element={
            <ProtectedRoute roles={['customer', 'admin']}>
              <Orders />
            </ProtectedRoute>
          } />
          <Route path="/customer" element={<ProtectedRoute roles={['customer', 'admin']}><CustomerLayout /></ProtectedRoute>}>
            <Route index element={<CustomerDashboard />} />
            <Route path="chat" element={<CustomerChat />} />
            <Route path="progress" element={<CustomerProgress />} />
            <Route path="orders" element={<Orders />} />
          </Route>

          {/* Admin */}
          <Route path="/admin" element={<ProtectedRoute roles={['admin']}><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="orders"    element={<AdminOrders />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="workers"   element={<AdminWorkers />} />
            <Route path="more"      element={<AdminMore />} />
            <Route path="products"  element={<AdminProducts />} />
            <Route path="reports"   element={<AdminReports />} />
            <Route path="payments"  element={<AdminPayments />} />
            <Route path="payment-requests" element={<AdminPaymentRequests />} />
            <Route path="notifications" element={<AdminNotifications />} />
          </Route>

          {/* Worker */}
          <Route path="/worker" element={<ProtectedRoute roles={['worker']}><WorkerLayout /></ProtectedRoute>}>
            <Route index element={<WorkerHome />} />
            <Route path="orders"  element={<WorkerOrders />} />
            <Route path="history" element={<WorkerHistory />} />
            <Route path="wallet"  element={<WorkerWallet />} />
            <Route path="profile" element={<WorkerProfile />} />
            <Route path="chat"    element={<WorkerChat />} />
          </Route>
          <Route path="/editor" element={<ProtectedRoute roles={['worker']}><WorkerLayout /></ProtectedRoute>}>
            <Route index element={<WorkerDashboard />} />
            <Route path="orders"  element={<WorkerOrders />} />
            <Route path="history" element={<WorkerHistory />} />
            <Route path="wallet"  element={<WorkerWallet />} />
            <Route path="profile" element={<WorkerProfile />} />
            <Route path="chat"    element={<WorkerChat />} />
          </Route>
        </Routes>
      </main>
      {!isAdminOrWorker && <BottomNav />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout />
    </BrowserRouter>
  );
}
