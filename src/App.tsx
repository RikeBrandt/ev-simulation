import "./App.css";
import { Card } from "./components/Card";
import { InputForm } from "./components/InputForm";
import { Occupation } from "./components/Occupation";
import { SimulationInputProvider } from "./components/SimulationInputContext";
import { TimePeriodProvider } from "./components/TimePeriodContext";
import { TimePeriodSelection } from "./components/TimePeriodSelection";

//todo remove gap-30

// next step: create a provider for simulation input values

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
