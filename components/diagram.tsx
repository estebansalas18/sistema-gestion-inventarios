import React, { useEffect, useState } from "react";

interface InventoryChartProps {
  selectedMaterial: number;
  inventory: {
    id: number;
    date: string;
    movementType: string;
    quantity: number;
    materialId: number;
    userId: number;
  }[];
}

const InventoryChart = ({
  selectedMaterial,
  inventory,
}: InventoryChartProps) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    updateChartData();
  }, [selectedMaterial, inventory]);

  const updateChartData = () => {
    if (!selectedMaterial || !inventory) return;

    const filteredMovements = inventory.filter(
      (movement) => movement.materialId === selectedMaterial
    );

    const dates = filteredMovements.map((movement) => movement.date);
    const saldo: number[] = [];

    let currentBalance = 0;

    filteredMovements.forEach((movement) => {
      if (movement.movementType === "ENTRADA") {
        currentBalance += movement.quantity;
      } else if (movement.movementType === "SALIDA") {
        currentBalance -= movement.quantity;
      }

      saldo.push(currentBalance);
    });

    setChartData({
      labels: dates,
      data: saldo,
    });
  };

  const drawChart = () => {
    if (!chartData) return;

    const canvas = document.getElementById("inventoryChart");
    const ctx = canvas.getContext("2d");
    const { labels, data } = chartData;

    // Limpiar el lienzo
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar ejes y etiquetas
    const xAxisHeight = 20; // Altura del eje x
    const yAxisWidth = 30; // Ancho del eje y

    // Eje x
    ctx.beginPath();
    ctx.moveTo(yAxisWidth, canvas.height - xAxisHeight);
    ctx.lineTo(canvas.width, canvas.height - xAxisHeight);
    ctx.strokeStyle = "black";
    ctx.stroke();

    // Etiquetas del eje x
    for (let i = 0; i < labels.length; i++) {
      const x =
        yAxisWidth + (i * (canvas.width - yAxisWidth)) / (labels.length - 1);
      ctx.fillText(labels[i], x, canvas.height - xAxisHeight + 15);
    }

    // Eje y
    ctx.beginPath();
    ctx.moveTo(yAxisWidth, 0);
    ctx.lineTo(yAxisWidth, canvas.height - xAxisHeight);
    ctx.strokeStyle = "black";
    ctx.stroke();

    // Etiquetas del eje y
    const maxBalance = Math.max(...data);
    for (let i = 0; i <= 5; i++) {
      const y = (i / 5) * (canvas.height - xAxisHeight);
      const balance = Math.round((i / 5) * maxBalance);
      ctx.fillText(
        balance.toString(),
        yAxisWidth - 25,
        canvas.height - xAxisHeight - y
      );
    }

    // Dibujar la línea del gráfico
    ctx.beginPath();
    ctx.moveTo(yAxisWidth, canvas.height - xAxisHeight); // Mover al punto inicial
    const spacingX = (canvas.width - yAxisWidth) / (labels.length - 1);

    for (let i = 0; i < labels.length; i++) {
      const x = yAxisWidth + i * spacingX;
      const y =
        canvas.height -
        xAxisHeight -
        (data[i] / maxBalance) * (canvas.height - xAxisHeight);
      ctx.lineTo(x, y);
    }

    ctx.strokeStyle = "blue";
    ctx.stroke();
  };

  useEffect(() => {
    drawChart();
  }, [chartData]);

  return (
    <canvas
      id="inventoryChart"
      width="400"
      height="200"
      style={{ marginTop: "20px" }}
    ></canvas>
  );
};

export default InventoryChart;
