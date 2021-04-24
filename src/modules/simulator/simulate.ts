import { CalcResult } from "./index";

let t = 0;
type Simulate = () => CalcResult;

const simulate: Simulate = () => {
  const sin = Math.sin(t) / 3;
  const cos = Math.cos(t) / 3;
  t += 0.05;
  const calcResult: CalcResult = {
    elapsedMs: 0,
    charts: [
      {
        kind: "free_hand",
        elevation: 1,
        orders: [
          { id: 1, link: [0, 1], style: { type: "line", color: "#ff00bbaa", thickness: 3 } },
          { id: 2, link: [1, 2], style: { type: "line", color: "#00ffbbaa", thickness: 3 } },
          { id: 3, link: [2, 3], style: { type: "line", color: "#0000ffaa", thickness: 3 } },
          { id: 4, link: [3, 4], style: { type: "line", color: "#ffffbbaa", thickness: 3 } },
          { id: 5, link: [4, 5], style: { type: "line", color: "#bbffffaa", thickness: 3 } },
          { id: 5, link: [5, 0], style: { type: "line", color: "#00ff00aa", thickness: 3 } },
        ],
        points: [
          { id: 0, x: 0.122344 + sin, y: 0.134143 + cos },
          { id: 1, x: 0.222344 + sin, y: 0.234143 + cos },
          { id: 2, x: 0.322344 + sin, y: 0.334143 + cos },
          { id: 3, x: 0.422344 + sin, y: 0.434143 + cos },
          { id: 4, x: 0.522344 + sin, y: 0.534143 + cos },
          { id: 5, x: 0.622344 + sin, y: 0.734143 + cos },
        ],
      },
    ],
  };
  return calcResult;
};

export default simulate;
