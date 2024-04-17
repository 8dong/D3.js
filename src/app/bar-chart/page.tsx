import Layout from '@/shared/components/Layout';
import BarChart from '@/app/bar-chart/components/BarChart';

const CHART_DATA_LIST = [
  { xAxisData: 'a', yAxisData: 10 },
  { xAxisData: 'b', yAxisData: 35 },
  { xAxisData: 'c', yAxisData: 90 },
  { xAxisData: 'd', yAxisData: 73 }
];

export default function Page() {
  return (
    <div>
      <Layout title='bar chart'>
        <h2>Bar Chart</h2>
        <BarChart
          id='bar-chart'
          chartInnerPadding={{ top: 20, right: 20, bottom: 20, left: 20 }}
          chartDataList={CHART_DATA_LIST}
        />
      </Layout>
    </div>
  );
}
