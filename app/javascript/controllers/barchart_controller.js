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

  revenueValueChanged() {
    if (this.revenueValue.length > 0) {
      this.renderChart();
    }
  }

  connect() {
  }

  renderChart() {
    const labels = this.revenueValue.map(item => {
      const date = new Date(item.d);
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`; // örneğin: 1/1/2014
    });

    const data = this.revenueValue.map(item => item.ir);

    new Chart(this.canvasContext(), {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Revenue',
          data: data,
          fill: false,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgb(255,255,255)',
          color: 'rgb(255,255,255)',
          tension: 0.01,
          borderWidth: 2,
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            title: {
              display: true,
              text: 'Revenue (IR)'
            },
            ticks: {
              stepSize: 1
            }
          },
          x: {
            title: {
              display: true,
              text: 'Date'
            }
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
