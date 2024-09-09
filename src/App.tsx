import './App.scss';

import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import routes from './routes';
import ProductsPage from './pages/ProductsListPage';
import ProductPage from './pages/ProductItemPage';
import CreateProductPage from './pages/CreateProductPage';

const App = () => {

  return (
      <Router basename="/e-commerce-spa">
        <Routes>
          <Route path="/" element={<Navigate to={routes.products()} />} />
          <Route path={routes.products()} element={<ProductsPage />} />
          <Route path={`${routes.product(':id')}`} element={<ProductPage />} />
          <Route path={routes.createProduct()} element={<CreateProductPage />} />
        </Routes>
      </Router>
  );
};

export default App;
