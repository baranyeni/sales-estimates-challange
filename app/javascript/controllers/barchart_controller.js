import { Controller } from "@hotwired/stimulus";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default class extends Controller {
  static targets = ['revenueChart'];
  static values = {
    revenue: Array
  }

  canvasContext() {
    return this.revenueChartTarget.getContext('2d');
  }

  connect() {
    this.chart = null;
  }

  revenueValueChanged() {
    if (this.chart) {
      this.chart.destroy();
    }
    if (this.revenueValue.length > 0) {
      this.renderChart();
    }
  }

  renderChart() {
    const labels = this.revenueValue.map(item => {
      const date = new Date(item.d);
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    });

    const data = this.revenueValue.map(item => item.ir);

    this.chart = new Chart(this.canvasContext(), {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Revenue',
          data: data,
          fill: false,
          tension: 0.01,
          borderWidth: 0.85,
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            title: { display: true, text: 'Revenue (IR)', color: "rgba(255,255,255,0.35)" },
            ticks: { color: "rgba(255,255,255,0.35)", stepSize: 1 },
            grid: { color: "rgba(255,255,255,0.35)" }
          },
          x: {
            title: { display: false },
            ticks: { color: "rgba(255,255,255,0.35)" },
            grid: { color: "rgba(255,255,255,0.35)" }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                return `Revenue: ${tooltipItem.raw}`;
              }
            }
          }
        }
      }
    });
  }
}
