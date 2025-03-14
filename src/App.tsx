import "./App.css";
import { InputForm } from "./components/InputForm";
import { BaseUtilization } from "./components/BaseUtilization";
import { SimulationInputProvider } from "./components/context/SimulationInputContext";
import { TimePeriodProvider } from "./components/context/TimePeriodContext";
import { TimePeriodSelection } from "./components/TimePeriodSelection";
import { MainValues } from "./components/MainValues";
import { PowerSimulationChart } from "./components/PowerChart";
import { EnergyConsumptionChart } from "./components/ConsumptionChart";
import { Drawer } from "./components/layout/Drawer";
import { Headline } from "./components/layout/Headline";
import { useState } from "react";
import Pen from "./assets/pen.svg?react";

function App() {
  const [open, setOpen] = useState(false);
  return (
    <TimePeriodProvider>
      <SimulationInputProvider>
        <div className="flex">
          <Drawer open={open} setOpen={setOpen}>
            <InputForm />
          </Drawer>

          <div className="grow flex flex-col gap-4 p-4 w-full">
            <div className="md:hidden">
              <button
                onClick={() => setOpen(true)}
                className="bg-zinc-900 rounded-full p-3"
              >
                <Pen />
              </button>
              <div className="flex justify-between items-center pb-4 grow">
                <Headline />
                <TimePeriodSelection />
              </div>
              <MainValues />
            </div>

            <div className="justify-between items-center hidden md:flex">
              <MainValues />
              <TimePeriodSelection />
            </div>

            <div className="flex gap-4 flex-wrap md:flex-nowrap">
              <div className="grow-8 w-full">
                <PowerSimulationChart />
              </div>
              <BaseUtilization />
            </div>

            <EnergyConsumptionChart />
          </div>
        </div>
      </SimulationInputProvider>
    </TimePeriodProvider>
  );
}

export default App;
