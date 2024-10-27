// src/App.jsx
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import BucketList from './components/BucketList';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BucketList />} />

      </Routes>
    </Router>
  );
}

export default App;
