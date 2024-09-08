import './App.scss';

import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import routes from './routes';
import ProductsPage from './pages/ProductsListPage';

const App = () => {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={routes.products()} />} />
          <Route path={routes.products()} element={<ProductsPage />} />
        </Routes>
      </Router>
  );
};

export default App;
