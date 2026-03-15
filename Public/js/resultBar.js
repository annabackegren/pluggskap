function createResultChart(canvasId, score) {
  const canvas = document.getElementById(canvasId);
  const maxScore = 5;

  const chart = new Chart(canvas, {
    type: "bar",
    data: {
      labels: ["Resultat"],
      datasets: [
        {
          label: "Rätt",
          data: [score],
          backgroundColor: "#a68ec1",
          borderColor: "#a68ec1",
          borderWidth: 3,
          borderSkipped: false,
          barThickness: 35,
          categoryPercentage: 1,
        },
        {
          label: "Fel",
          data: [maxScore - score],
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
          barThickness: 35,
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
          max: maxScore,
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
}
