import "./App.css";
import { InputForm } from "./components/InputForm";
import { BaseUtilization } from "./components/BaseUtilization";
import { SimulationInputProvider } from "./components/context/SimulationInputContext";
import { TimePeriodProvider } from "./components/context/TimePeriodContext";
import { TimePeriodSelection } from "./components/TimePeriodSelection";
import { MainNumbers } from "./components/MainNumbers";
import { PowerSimulationChart } from "./components/PowerChart";
import { EnergyConsumptionChart } from "./components/ConsumptionChart";

function App() {
  return (
    <TimePeriodProvider>
      <SimulationInputProvider>
        <h1 className="pb-4">EV Charging Simulation</h1>

        <div className="flex gap-8 items-start">
          <InputForm />

          <div className="grow flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <MainNumbers />
              <TimePeriodSelection />
            </div>

            <div className="flex gap-4">
              <div className="grow">
                <PowerSimulationChart />
              </div>
              <BaseUtilization chargePoints={20} utilizationRate={100} />
            </div>
            <EnergyConsumptionChart />
          </div>
        </div>
      </SimulationInputProvider>
    </TimePeriodProvider>
  );
}

export default App;
