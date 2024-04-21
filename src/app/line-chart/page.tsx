import Layout from '@/shared/components/Layout';
import LineChart from '@/app/line-chart/components/LineChart';

const CHART_DATA_LIST = [
  { xAxisData: 'a', yAxisData: 10 },
  { xAxisData: 'b', yAxisData: 35 },
  { xAxisData: 'c', yAxisData: 90 },
  { xAxisData: 'd', yAxisData: 73 }
];

export default function Page() {
  return (
    <div>
      <Layout title='line chart'>
        <h2>Line Chart</h2>
        <LineChart
          id='line-chart'
          chartInnerPadding={{ top: 20, right: 20, bottom: 20, left: 20 }}
          chartDataList={CHART_DATA_LIST}
        />
      </Layout>
    </div>
  );
}
