import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

function Chartbar() {
  const [chart, setChart] = useState({});
  const [style, setStyle] = useState({});

  const charts = () => {
    setChart({
      labels: ["JA", "FI", "MA", "AV", "MA", "JU", "Au", "SP", "NV", "DC"],
      datasets: [
        {
          label: "Profit",
          data: [20, 33, 30, 39, 44, 51, 49, 47, 62, 58],
          backgroundColor: "rgba(0, 255, 0, 1)",
          borderColor: ["rgba(0, 255, 0, 1)"],
          borderWidth: 2,
          fill: false,
          lineTension: 0,
        },
        {
          label: "Loss",
          data: [18, 28, 16, 26, 40, 41, 36, 44, 48, 50],
          backgroundColor: "rgba(255,0,0,1)",
          borderColor: "rgba(255,0,0,1)",
          borderWidth: 2,
          fill: false,
          lineTension: 0,
        },
      ],
    });
  };

  const styles = () => {
    setStyle({
      responsive: false,
      title: {
        display: true,
        text: "Custom Chart Title",
      },
      legend: {
        position: "bottom",
      },
      scales: {
        yAxes: [
          {
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10,
              fontColor: "#000A",
              beginAtZero: true,
            },
            gridLines: {
              display: true,
              color: "#0002",
              zeroLineWidth: 1,
              zeroLineColor: "#000A",
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              fontColor: "#000A",
            },
            gridLines: {
              display: true,
              color: "#0002",
              zeroLineWidth: 1,
              zeroLineColor: "#000A",
            },
          },
        ],
      },
      tooltips: {
        mode: "index",
        intersect: false,
        xPadding: 10,
        yPadding: 10,
        titleFontColor: "#FFF",
        bodyFontColor: "#FFF",
        backgroundColor: "#000B",
        displayColors: true,
        borderColor: "#000C",
        borderWidth: 5,
      },
      hover: {
        mode: "nearest",
        intersect: true,
      },
    });
  };

  useEffect(() => {
    charts();
    styles();
  }, []);
  return (
    <div>
      <Bar data={chart} options={style} />
    </div>
  );
}

export default Chartbar;
