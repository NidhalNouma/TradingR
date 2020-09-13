import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";

function Chartd() {
  const [chart, setChart] = useState({});
  const [style, setStyle] = useState({});

  const charts = () => {
    setChart({
      datasets: [
        {
          data: [10, 20, 30],
          backgroundColor: [
            "rgba(0, 255, 0, 1)",
            "rgba(255, 255, 0, 1)",
            "rgba(0, 255, 255, 1)",
          ],
        },
      ],
      labels: ["Red", "Yellow", "Blue"],
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
      <Doughnut data={chart} options={style} />
    </div>
  );
}

export default Chartd;
