import Foundation from "./Foundation";
import Stock from "./Stock";
import Tableau from "./Tableau";
import Waste from "./Waste";

export default function () {
  return (
    <box flexDirection="column">
      <box flexDirection="row">
        <Stock />
        <Waste />
        <Foundation />
      </box>
      <Tableau />
    </box>
  );
}
