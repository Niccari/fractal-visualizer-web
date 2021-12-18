import { ChartSimulator } from "..";

class Starmine extends ChartSimulator {
  public pointLength(): number {
    return this.chart.complexity * 2;
  }

  public setBasePoints(): void {
    for (let i = 0; i < this.pointLength(); i += 1) {
      const angle = (2 * Math.PI * i) / this.pointLength() - Math.PI;
      if (i % 2 === 0) {
        this.chart.basePoints[i] = {
          x: 0.1 * Math.cos(angle),
          y: 0.1 * Math.sin(angle),
        };
      } else {
        this.chart.basePoints[i] = {
          x: (0.1 * Math.cos(angle)) / 4,
          y: (0.1 * Math.sin(angle)) / 4,
        };
      }
    }
  }
}

export default Starmine;
