import Foundation from "./Foundation";
import Stock from "./Stock";
import Waste from "./Waste";
import Tableau from "./Tableau";

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
