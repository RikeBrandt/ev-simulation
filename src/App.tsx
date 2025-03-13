import "./App.css";
import { Card } from "./components/layout/Card";
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
        <div className="flex gap-8">
          <InputForm />

          <div className="grow flex flex-col gap-6">
            <div className="flex justify-between">
              <h1>EV Charging Simulation</h1>
              <TimePeriodSelection />
            </div>

            <MainNumbers />
            <div className="flex gap-4">
              <div className="grow">
                <PowerSimulationChart />
              </div>
              <div className="max-w-[30%]">
                <Card>
                  <BaseUtilization chargePoints={20} utilizationRate={100} />
                </Card>
              </div>
            </div>
            <EnergyConsumptionChart />
          </div>
        </div>
      </SimulationInputProvider>
    </TimePeriodProvider>
  );
}

export default App;
