import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const DoughnutChart = () => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart<"doughnut", number[], string> | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            chartInstance.current = new Chart(chartRef.current, {
                type: 'doughnut',
                data: {
                    labels: ['DAPP US', 'MSTR US', 'SQ US', 'MSFT US', 'MARA US', 'อื่นๆ'],
                    datasets: [{
                        data: [76.76, 4.96, 3.61, 3.11, 2.84, 8.72],
                        backgroundColor: [
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56',
                            '#4BC0C0',
                            '#9966FF',
                            '#808080',
                        ],
                        hoverOffset: 4,
                        borderWidth: 2,
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
        <div className='relative w-[280px] h-[280px]'>
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default DoughnutChart;
