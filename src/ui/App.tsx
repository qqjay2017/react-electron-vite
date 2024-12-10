import { useEffect, useMemo, useState } from "react";

import "./App.css";
import { useStaticData } from "./useStaticData";
import { Header } from "./Header";
import { useStatistics } from "./useStatistics";
import { SelectOption } from "./SelectOption";

import { Chart } from "./Chart";

function App() {
  const staticData = useStaticData();
  const statistics = useStatistics(10);
  const [activeView, setActiveView] = useState<View>("CPU");
  const cpuUsages = useMemo(
    () => statistics.map((stat) => stat.cpuUsage),
    [statistics]
  );
  const ramUsages = useMemo(
    () => statistics.map((stat) => stat.ramUsage),
    [statistics]
  );
  const storageUsages = useMemo(
    () => statistics.map((stat) => stat.storageUsage),
    [statistics]
  );

  const activeUsages = useMemo(() => {
    switch (activeView) {
      case "CPU":
        return cpuUsages;
      case "RAM":
        return ramUsages;
      case "STORAGE":
        return storageUsages;
    }
  }, [activeView, cpuUsages, ramUsages, storageUsages]);

  useEffect(() => {
    return window.ElectronWebInstance.subscribeChangeView((view) =>
      setActiveView(view)
    );
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="main">
        <div>
          <SelectOption
            onClick={() => setActiveView("CPU")}
            title="CPU"
            view="CPU"
            subTitle={staticData?.cpuModel ?? ""}
            data={cpuUsages}
          />
          <SelectOption
            onClick={() => setActiveView("RAM")}
            title="RAM"
            view="RAM"
            subTitle={(staticData?.totalMemoryGB.toString() ?? "") + " GB"}
            data={ramUsages}
          />
          <SelectOption
            onClick={() => setActiveView("STORAGE")}
            title="STORAGE"
            view="STORAGE"
            subTitle={(staticData?.totalStorage.toString() ?? "") + " GB"}
            data={storageUsages}
          />
        </div>
        <div className="mainGrid">
          <Chart
            selectedView={activeView}
            data={activeUsages}
            maxDataPoints={10}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
