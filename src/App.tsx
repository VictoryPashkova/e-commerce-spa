import './App.scss';

import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import routes from './routes';

const App = () => {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={routes.products()} />} />
          <Route path={routes.products()} element={}/>
          <Route path={routes.product(':id')} element={} />
        </Routes>
      </Router>
  );
};

export default App;
