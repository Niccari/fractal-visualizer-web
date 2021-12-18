import ChartSimulator from "..";

class Random extends ChartSimulator {
  public simulate(): void {
    const { chart } = this;
    const pointLength = this.pointLength();
    for (let i = 0; i < pointLength; i += 1) {
      const x = 0.1 * (Math.random() - 0.5);
      const y = 0.1 * (Math.random() - 0.5);
      chart.basePoints[i] = { x, y };
    }
    super.simulate();
  }
}

export default Random;
