export function Header() {
  return (
    <header>
      <button
        id="close"
        onClick={() => window.ElectronWebInstance.sendFrameAction("CLOSE")}
      ></button>
      <button
        id="minimize"
        onClick={() => window.ElectronWebInstance.sendFrameAction("MINIMIZE")}
      ></button>
      <button
        id="maximize"
        onClick={() => window.ElectronWebInstance.sendFrameAction("MAXIMIZE")}
      ></button>
    </header>
  );
}
