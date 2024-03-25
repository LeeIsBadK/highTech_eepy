import React, { useEffect, useRef, useState} from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const ChartComponent: React.FC<{ funds: string[] }> = ({ funds }) => {
  const [fundsFetched, setFundsFetched] = useState(false);
  const chartDivRef = useRef<HTMLDivElement>(null);
  const chartInitializedRef = useRef<boolean>(false);
  const [legendData, setLegendData] = useState<{ name: string; color: any }[]>([]);

  useEffect(() => {
    if (!fundsFetched && funds !== null) {
      setFundsFetched(true);
    }
  }, [funds, fundsFetched]);

  console.log(funds);
  console.log(fundsFetched);

  useEffect(() => {
    if (chartDivRef.current && fundsFetched && !chartInitializedRef.current) {
      const root = am5.Root.new(chartDivRef.current);
      root.setThemes([am5themes_Animated.new(root)]);

      const chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingLeft: 0
      }));

      const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
        behavior: "none"
      }));
      cursor.lineY.set("visible", false);


      let date = new Date();
      date.setHours(0, 0, 0, 0);
      let value = 100;

      function generateData() {
        value = Math.round((Math.random() * 10 - 5) + value);
        am5.time.add(date, "day", 1);
        return {
          date: date.getTime(),
          value: value,
        };
      }

      function generateDatas(count: number) {
        const data = [];
        for (let i = 0; i < count; ++i) {
          data.push(generateData());
        }
        return data;
      }

      const xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
        maxDeviation: 0.2,
        baseInterval: {
          timeUnit: "day",
          count: 1
        },
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true
        }),
        tooltip: am5.Tooltip.new(root, {})
      }));

      const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {
          pan: "zoom"
        })
      }));

      console.log(funds);
      const updatedLegendData: { name: string; color: any }[] = [];

      funds.forEach((fund) => {
        date.setHours(0, 0, 0, 0);
        value = 100;

        const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

        const series = chart.series.push(am5xy.LineSeries.new(root, {
          name: fund,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: 'value', // Use dynamic value field based on index
          valueXField: "date",
          tooltip: am5.Tooltip.new(root, {
            labelText: `{name}: {valueY}` // Use dynamic value field for tooltip
          }),
          legendLabelText: "{name}",
          legendRangeLabelText: "{name}",
          stroke: am5.color(randomColor),
        }));
        const data = generateDatas(1200);
        series.data.setAll(data);
        
        date = new Date();
        date.setHours(0, 0, 0, 0);
        value = 100;

        series.appear(1000);

        updatedLegendData.push({
          name: fund,
          color: randomColor
        });
        setLegendData(updatedLegendData);
      });

      chartInitializedRef.current = true;
    }
  }, [fundsFetched, chartInitializedRef.current]);

  console.log(legendData);

  return (
    <>
      <div className='max-w-2xl lg:max-w-7xl flex flex-wrap pb-4'>
        {legendData.map((value) => (
          <span key={value.name} className='px-[24px] py-2 flex items-center'><div className={`w-[16px] h-[16px] flex items-center mt-[-2px] mr-3`} style={{ backgroundColor: value.color, borderRadius: '50%' }}></div>{value.name}</span>
        ))}
      </div>
      <div ref={chartDivRef} className='w-full h-[500px]'/>
    </>
  );
};

export default ChartComponent;
