import Layout from '@/shared/components/Layout';
import PieChart from '@/app/pie-chart/components/PieChart';

const CHART_DATA_LIST = [
  { xAxisData: 'a', yAxisData: 10 },
  { xAxisData: 'b', yAxisData: 35 },
  { xAxisData: 'c', yAxisData: 90 },
  { xAxisData: 'd', yAxisData: 73 }
];

export default function Page() {
  return (
    <div>
      <Layout title='pie chart'>
        <h2>Pie Chart</h2>
        <PieChart
          id='pie-chart'
          chartInnerPadding={{ top: 20, right: 20, bottom: 20, left: 20 }}
          chartDataList={CHART_DATA_LIST}
        />
      </Layout>
    </div>
  );
}
