import ChartSimulator from "..";

class Clover extends ChartSimulator {
  public pointLength(): number {
    return this.chart.complexity * 40;
  }

  public setBasePoints(): void {
    for (let i = 0; i < this.pointLength(); i += 1) {
      const sinA = Math.sin((2 * Math.PI * this.chart.complexity * i) / this.pointLength());
      this.chart.basePoints[i] = {
        x: 0.1 * sinA * Math.cos((2 * Math.PI * i) / this.pointLength() - Math.PI),
        y: 0.1 * sinA * Math.sin((2 * Math.PI * i) / this.pointLength() - Math.PI),
      };
    }
  }
}

export default Clover;
