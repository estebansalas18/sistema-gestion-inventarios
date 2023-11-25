import React, { useEffect, useState, useRef } from "react";

interface InventoryMovement {
  id: string;
  date: Date;
  movementType: string;
  quantity: number;
  materialId: string;
  userId: string;
}

interface InventoryChartProps {
  selectedMaterial: string | undefined;
  inventory: InventoryMovement[];
}

interface ChartData {
  labels: string[];
  data: number[];
}

const InventoryChart: React.FC<InventoryChartProps> = ({
  selectedMaterial,
  inventory,
}) => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    updateChartData();
  }, [selectedMaterial, inventory]);

  const updateChartData = () => {
    if (!selectedMaterial || !inventory) return;

    const filteredMovements = inventory.filter(
      (movement) => movement.materialId === selectedMaterial
    );

    const dates = [""];
    const saldo: number[] = [0];

    let currentBalance = 0;

    filteredMovements.forEach((movement) => {
      dates.push(movement.date.toLocaleString());
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
    if (!chartData || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { labels, data } = chartData;

    // Limpiar el lienzo
    ctx?.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar ejes y etiquetas
    const xAxisHeight = 20;
    const yAxisWidth = 30;

    // Eje x
    ctx?.beginPath();
    ctx?.moveTo(yAxisWidth, canvas.height - xAxisHeight);
    ctx?.lineTo(canvas.width, canvas.height - xAxisHeight);
    if (ctx) {
      ctx.strokeStyle = "black";
    }
    ctx?.stroke();

    // Etiquetas del eje x
    for (let i = 0; i < labels.length; i++) {
      const x =
        yAxisWidth + (i * (canvas.width - yAxisWidth)) / (labels.length - 1);
      ctx?.fillText(labels[i], x, canvas.height - xAxisHeight + 15);
    }

    // Eje y
    ctx?.beginPath();
    ctx?.moveTo(yAxisWidth, 0);
    ctx?.lineTo(yAxisWidth, canvas.height - xAxisHeight);
    if (ctx) {
      ctx.strokeStyle = "black";
    }
    ctx?.stroke();

    // Etiquetas del eje y
    const maxBalance = Math.max(...data);
    for (let i = 0; i <= 5; i++) {
      const y = (i / 5) * (canvas.height - xAxisHeight);
      const balance = Math.round((i / 5) * maxBalance);
      ctx?.fillText(
        balance.toString(),
        yAxisWidth - 25,
        canvas.height - xAxisHeight - y
      );
    }

    // Dibujar la línea del gráfico
    ctx?.beginPath();
    ctx?.moveTo(yAxisWidth, canvas.height - xAxisHeight);
    const spacingX = (canvas.width - yAxisWidth) / (labels.length - 1);

    for (let i = 0; i < labels.length; i++) {
      const x = yAxisWidth + i * spacingX;
      const y =
        canvas.height -
        xAxisHeight -
        (data[i] / maxBalance) * (canvas.height - xAxisHeight);
      ctx?.lineTo(x, y);
    }

    if (ctx) {
      ctx.strokeStyle = "blue";
    }
    ctx?.stroke();
  };

  useEffect(() => {
    drawChart();
  }, [chartData]);

  return (
    <canvas
      ref={canvasRef}
      id="inventoryChart"
      width={canvasRef.current?.parentElement?.offsetWidth || 400}
      height={300}
      style={{ marginTop: "20px" }}
    ></canvas>
  );
};

export { InventoryChart };
