import logo from './logo.svg';
import './App.css';
import StrategyForm from './components/StrategyForm/StrategyForm';
import StrategyList from './components/StrategyList/StrategyList';
import React, {useState} from "react";

function App() {
  const [refresh, setRefresh] = useState(false);

  // Pass this as a prop to StrategyForm to re-render list
  const handleSuccess = () => {
    setRefresh((prev) => !prev);
  }

  return (
    <div className="App">
      <div className="container">
        <StrategyList refresh={refresh} />
        <StrategyForm 
            onSuccess={handleSuccess}
        />
      </div>
    </div>
  );
}

export default App;
