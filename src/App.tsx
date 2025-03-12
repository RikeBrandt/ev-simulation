import "./App.css";
import { InputForm } from "./components/InputForm";

type SimulationValues = {
  chargePoints: number;
  utilizationRate: number;
  power: number;
  consumption: number;
};

function App() {
  return (
    <>
      <InputForm />
      <div className="text-cyan-400" />
      <div className="text-cyan-800" />
    </>
  );
}

export default App;
