import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import SlotMachine from './components/slot-machine/SlotMachinePage.tsx';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/slot-machine" element={<SlotMachine />}></Route>
      </Routes>
    </div>
  );
};
export default App;
