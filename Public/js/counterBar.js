const answerChart = document.querySelector("#question-counter-bar");

let currentQuestion = 0;
const totalQuestions = 5;

const chart = new Chart(answerChart, {
  type: "bar",
  data: {
    labels: ["Frågor"],
    datasets: [
      {
        label: "Gjorda",
        data: [currentQuestion],
        backgroundColor: "#a68ec1",
        borderColor: "#a68ec1",
        borderWidth: 3,
        borderSkipped: false,
        barThickness: 30,
        categoryPercentage: 1,
      },
      {
        label: "Ogjorda",
        data: [totalQuestions - currentQuestion],
        backgroundColor: "#446036",
        borderColor: "#446036",
        borderWidth: 3,
        borderRadius: {
          topRight: 15,
          bottomRight: 15,
          topLeft: 0,
          bottomLeft: 0,
        },
        borderSkipped: false,
        barThickness: 30,
        categoryPercentage: 1,
      },
    ],
  },
  options: {
    indexAxis: "y",
    layout: { padding: 0 },
    responsive: true,
    maintainAspectRatio: false,
    devicePixelRatio: 1,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      x: {
        stacked: true,
        display: false,
        min: 0,
        max: totalQuestions,
        ticks: { stepSize: 1 },
        grid: { display: false },
      },
      y: {
        stacked: true,
        display: false,
        grid: { display: false },
      },
    },
  },
});

function updateChart(current) {
  const isLast = current === totalQuestions;

  chart.data.datasets[0].data = [current];
  chart.data.datasets[1].data = [totalQuestions - current];

  chart.data.datasets[0].borderRadius = {
    topRight: 0,
    bottomRight: 0,
    topLeft: 15,
    bottomLeft: 15,
  };

  chart.options.animation = {
    onComplete: () => {
      if (isLast) {
        chart.data.datasets[0].borderRadius = {
          topLeft: 15,
          bottomLeft: 15,
          topRight: 15,
          bottomRight: 15,
        };
        chart.update();
      }
    },
  };
  chart.data.datasets[1].data = [isLast ? 0 : totalQuestions - current];

  chart.update();
}

window.addEventListener("resize", () => chart.resize());
