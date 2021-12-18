import ChartSimulator from "..";

class Sunrise extends ChartSimulator {
  public setOrders(): void {
    const { chart } = this;
    const pointLength = this.pointLength();
    for (let i = 0; i < pointLength; i += 1) {
      const start = i;
      const end = (2 * i + 2) % pointLength;
      chart.orders.push({
        link: [start, end],
      });
    }
  }
}

export default Sunrise;
