import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from 'UserContext';
import { AuthProvider } from 'AuthContext';
import { BookProvider } from 'BookContext';
import { CartProvider } from 'CartContext';
import AppRoutes from 'routing/AppRoutes';
import './App.css';

function App() {
  return (
      <div className="App">
        <AuthProvider>
          <CartProvider>
            <UserProvider>
              <BrowserRouter>
                <BookProvider>
                    <AppRoutes />
                </BookProvider>
              </BrowserRouter>
            </UserProvider>
          </CartProvider>
        </AuthProvider>
      </div>
  );
}

export default App;
