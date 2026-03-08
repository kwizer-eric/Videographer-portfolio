import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/public/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Admin routes will go here shortly */}
      </Routes>
    </Router>
  );
}

export default App;
