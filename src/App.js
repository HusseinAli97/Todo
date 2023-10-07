import { useContext } from 'react';
import './App.css';
import Home from './components/home/home';
import { ToggleModeContext } from './context/ToggleMode';

function App() {
  const { mode } = useContext(ToggleModeContext);
  return (
    <div className={`App ${mode === 'light'? 'lightMode' : ''}`}>
      <Home />
    </div>
  );
}

export default App;
