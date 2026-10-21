import { Routes, Route, Navigate } from 'react-router-dom'
import { CartProvider } from './context/CartContext'

import OpeningScreen from './pages/OpeningScreen'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import ConfirmationPage from './pages/ConfirmationPage'

export default function App() {
  return (
    <CartProvider>
      <Routes>
        {/* Opening splash — shown first at root */}
        <Route path="/" element={<OpeningScreen />} />

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />

        {/* Main pages */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />

        {/* Catch-all — redirect to opening */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </CartProvider>
  )
}
