import { useEffect, useState } from "react";

export function useStaticData() {
  const [staticData, setStaticData] = useState<StaticData | null>(null);

  useEffect(() => {
    (async () => {
      setStaticData(await window.ElectronWebInstance.getStaticData());
    })();
  }, []);

  return staticData;
}
