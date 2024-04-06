import React, { useEffect, useRef, useState } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const apiClient = axios.create({
  baseURL: 'https://backend-ruby-eight.vercel.app',
});

const ChartComponent: React.FC<{ funds: string[] }> = ({ funds }) => {
  const chartDivRef = useRef<HTMLDivElement>(null);
  const chartInitializedRef = useRef<boolean>(false);
  const [legendData, setLegendData] = useState<{ name: string; color: any }[]>([]);
  const [check, setCheck] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
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

  const [fundData, setFundData] = useState<Array<any> | null>(null);

  useEffect(() => {
    const fetchDataForAllFunds = async () => {
      try {
        if ((!fundData && funds && funds.length === 1 && funds[0] !== '') || (!fundData && funds.length > 1)) {
          const promises = funds.map(async (fund) => {
            const response = await apiClient.get('/page1/' + fund);
            return response.data;
          });

          const dataForAllFunds = await Promise.all(promises);
          setFundData(dataForAllFunds);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        navigate('/missing', { state: { from: location }, replace: true });
      }
    };

    fetchDataForAllFunds();
  }, [fundData, funds]);

  useEffect(() => {
    if (chartDivRef.current && fundData && !chartInitializedRef.current) {
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
      let value = 0;

      function generateData(NAV: Array<any>) {
        const generatedData = [];

        for (const navData of NAV) {
          date = new Date(navData[0]);
          date.setHours(0, 0, 0, 0);
          value = navData[1];
          am5.time.add(date, "day", 1);

          generatedData.push({
            date: date.getTime(),
            value: value,
          });
        }
        return generatedData;
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

      fundData?.forEach((fund, index) => {

        const series = chart.series.push(am5xy.LineSeries.new(root, {
          name: fund.proj_abbr_name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: 'value',
          valueXField: "date",
          tooltip: am5.Tooltip.new(root, {
            labelText: `{name}: {valueY}`
          })
        }));

        if (fund.compareinfomation.nav && fund.compareinfomation.nav.length !== 0 && fund.compareinfomation.nav.NAV && fund.compareinfomation.nav.NAV.length !== 0) {
          const data = generateData(fund.compareinfomation.nav.NAV);
          series.data.setAll(data);

          series.appear(1000);

          updatedLegendData.push({
            name: fund.proj_abbr_name,
            color: colors[index]
          });
          setLegendData(updatedLegendData);
        }
      });

      chartInitializedRef.current = true;
      setCheck(true);
    }
  }, [fundData, chartInitializedRef.current, funds]);


  return (
    <>
      <div className='flex flex-wrap pb-4'>
        {legendData.map((value) => (
          <span key={value.name} className='px-[24px] 2xl:text-[16px] lg:text-[14px] md:text-[13px] text-[12px] py-2 flex items-center'><div className={`w-[14px] h-[14px] md:w-[16px] md:h-[16px] flex items-center mt-[-2px] mr-2 md:mr-3`} style={{ backgroundColor: value.color, borderRadius: '50%' }}></div>{value.name}</span>
        ))}
      </div>
      {!chartInitializedRef.current || (legendData.length !== 0 && chartInitializedRef.current) ? (
        <div className='relative'>
          <div ref={chartDivRef} className='w-full 2xl:h-[500px] lg:h-[425px] md:h-[375px] h-[325px]'></div>
          {!check && (
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="flex items-center py-2 px-4 border border-transparent text-[13px] md:text-[15px] lg:text-[17px] font-medium rounded-md shadow-md text-gray-600 bg-gray-200">
                <svg className="animate-spin -ml-1 mr-[10px] h-[22px] w-[22px] text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                กำลังโหลดข้อมูล...
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className='flex justify-center items-center w-full 2xl:h-[500px] lg:h-[425px] md:h-[400px] h-[375px] font-semibold 2xl:text-[19px] lg:text-[17px] md:text-[15px] text-[13px]'>ไม่มีข้อมูลกราฟ</div>
      )}
    </>
  );
};

export default ChartComponent;
