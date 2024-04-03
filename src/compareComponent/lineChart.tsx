import React, { useEffect, useRef, useState } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const ChartComponent: React.FC<{ funds: string[] }> = ({ funds }) => {
  const [fundsFetched, setFundsFetched] = useState(false);
  const chartDivRef = useRef<HTMLDivElement>(null);
  const chartInitializedRef = useRef<boolean>(false);
  const [legendData, setLegendData] = useState<{ name: string; color: any }[]>([]);
  const Themecolors: am5.Color[] = [
    am5.color(0x095256),
    am5.color(0xf5c06e),
    am5.color(0x9adcec),
    am5.color(0xe52a85),
    am5.color(0xbb9f06),
    am5.color(0xff2a0a),
    am5.color(0x20b37f),
    am5.color(0x6564f1),
    am5.color(0xcf5f64),
    am5.color(0x0240b1)
  ];
  const colors: string[] = [
    '#095256',
    '#f5c06e',
    '#9adcec',
    '#e52a85',
    '#bb9f06',
    '#ff2a0a',
    '#20b37f',
    '#6564f1',
    '#cf5f64',
    '#0240b1'
  ]

  useEffect(() => {
    if (!fundsFetched && funds !== null) {
      setFundsFetched(true);
    }
  }, [funds, fundsFetched]);

  useEffect(() => {
    if (chartDivRef.current && fundsFetched && !chartInitializedRef.current) {
      const root = am5.Root.new(chartDivRef.current);

      class MyTheme extends am5.Theme {
        setupDefaultRules() {

          this.rule("ColorSet").setAll({
            colors: Themecolors,
            reuse: true
          });

        }
      }

      root.setThemes([
        am5themes_Animated.new(root),
        MyTheme.new(root)
      ]);

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

      const updatedLegendData: { name: string; color: any }[] = [];

      funds.forEach((fund, index) => {
        date.setHours(0, 0, 0, 0);
        value = 100;

        const series = chart.series.push(am5xy.LineSeries.new(root, {
          name: fund,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: 'value', // Use dynamic value field based on index
          valueXField: "date",
          tooltip: am5.Tooltip.new(root, {
            labelText: `{name}: {valueY}` // Use dynamic value field for tooltip
          })
        }));

        const data = generateDatas(1200);
        series.data.setAll(data);

        date = new Date();
        date.setHours(0, 0, 0, 0);
        value = 100;

        series.appear(1000);

        updatedLegendData.push({
          name: fund,
          color: colors[index]
        });
        setLegendData(updatedLegendData);
      });

      chartInitializedRef.current = true;
    }
  }, [fundsFetched, chartInitializedRef.current, funds]);


  return (
    <>
      <div className='flex flex-wrap pb-4'>
        {legendData.map((value) => (
          <span key={value.name} className='px-[24px] 2xl:text-[16px] lg:text-[14px] md:text-[13px] text-[12px] py-2 flex items-center'><div className={`w-[14px] h-[14px] md:w-[16px] md:h-[16px] flex items-center mt-[-2px] mr-2 md:mr-3`} style={{ backgroundColor: value.color, borderRadius: '50%' }}></div>{value.name}</span>
        ))}
      </div>
      <div ref={chartDivRef} className='w-full h-[500px]' />
    </>
  );
};

export default ChartComponent;
