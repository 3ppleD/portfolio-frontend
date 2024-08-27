import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loader from './components/Loader';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Admin/Login';
import { useState } from 'react';

function App() {
  const [showLoading, setShowLoading] = useState(false);

  // Function to show loader
  const showLoader = () => setShowLoading(true);

  // Function to hide loader
  const hideLoader = () => setShowLoading(false);

  return (
    <BrowserRouter>
      {showLoading && <Loader />}
      <Routes>
        <Route path="/" element={<Home showLoader={showLoader} hideLoader={hideLoader} />} />
        <Route path="/admin" element={<Admin showLoader={showLoader} hideLoader={hideLoader} />} />
        <Route path="/admin-login" element={<Login showLoader={showLoader} hideLoader={hideLoader} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;