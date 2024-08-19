import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

export default function PieChart({ data, width = 380, height = 380 }) {
    const chartRef = useRef(null);

    useEffect(() => {
        if (!chartRef.current || !data || !data.series || data.series.length === 0) {
            return;
        }

        const options = {
            chart: {
                type: 'pie',
                width: width,
                height: height,
            },
            series: data.series,
            labels: data.labels,
        };

        const chart = new ApexCharts(chartRef.current, options);
        chart.render();

        return () => {
            chart.destroy();
        };
    }, [data, width, height]);

    return <div ref={chartRef} />;
}
