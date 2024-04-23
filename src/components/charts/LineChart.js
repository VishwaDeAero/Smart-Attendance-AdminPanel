import { Container } from '@mui/material';
import { Chart } from 'chart.js';
import React, { useEffect, useRef } from 'react'

const LineChart = (data) => {
    var chartRef = useRef(null);
    const chartData = data.chartData
    const item_id = (data.id)? data.id: 'lineChart';

    useEffect(() => {
        renderChart();
    }, [data]);

    const renderChart = () => {
        
        if (chartRef.current) {
            // Destroy previous chart if it exists
            chartRef.current.destroy();
        }

        const ctx = document.getElementById(item_id).getContext('2d');
        chartRef.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: chartData.labels,
                datasets: chartData.datasets.map((dataset, index) => ({
                  label: chartData.datasetLabels[index],
                  data: dataset,
                })),
              },
        });
    };
    return (
        <canvas id={item_id} width="400" height="200"></canvas>
    )
}

export default LineChart