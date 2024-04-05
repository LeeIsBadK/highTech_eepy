import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const DoughnutChart = ({ allData }: { allData: Record<string, string> }) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart<"doughnut", number[], string> | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const labels = Object.keys(allData);
            const data = Object.values(allData).map(parseFloat);

            chartInstance.current = new Chart(chartRef.current, {
                type: 'doughnut',
                data: {
                    labels: labels,
                    datasets: [{
                        data: data,
                        backgroundColor: [
                            '#4BC0C0',
                            '#36A2EB',
                            '#FFCE56',
                            '#FF6384',
                            '#9966FF',
                            '#808080',
                        ],
                        hoverOffset: 4,
                        borderWidth: 1,
                        hoverBorderColor: '#cccccc',
                    }],
                },
                options: {
                    layout: {
                        padding: 20
                    },
                    plugins: {
                        legend:{
                            display: false
                        }
                    }
                }, // Add empty options to avoid type errors
            });
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []);

    return (
        <div className='relative w-[180px] h-[180px]'>
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default DoughnutChart;
