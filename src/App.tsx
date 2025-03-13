import "./App.css";
import { Card } from "./components/layout/Card";
import { InputForm } from "./components/InputForm";
import { Occupation } from "./components/Occupation";
import { SimulationInputProvider } from "./components/context/SimulationInputContext";
import { TimePeriodProvider } from "./components/context/TimePeriodContext";
import { TimePeriodSelection } from "./components/TimePeriodSelection";
import { MainNumbers } from "./components/MainNumbers";
import { PowerSimulationChart } from "./components/PowerChart";

//todo remove gap-30

function App() {
  return (
    <TimePeriodProvider>
      <SimulationInputProvider>
        <div className="flex gap-20">
          <InputForm />

          <div className="grow flex flex-col gap-8">
            <div className="flex gap-30 justify-between">
              <h1>EV Charging Simulation</h1>
              <TimePeriodSelection />
            </div>

            <MainNumbers />
            <PowerSimulationChart />
            <Card>
              <Occupation chargePoints={20} utilizationRate={100} />
            </Card>
          </div>
        </div>
      </SimulationInputProvider>
    </TimePeriodProvider>
  );
}

export default App;
