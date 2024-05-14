import Layout from '@/shared/components/Layout';
import PolygonChart from '@/app/polygon-chart/components/PoloygonChart';

const CHART_DATA_LIST = [
  { xAxisData: 'a', yAxisData: 80 },
  { xAxisData: 'b', yAxisData: 35 },
  { xAxisData: 'c', yAxisData: 90 },
  { xAxisData: 'd', yAxisData: 73 },
  { xAxisData: 'd', yAxisData: 59 }
];

export default function Page() {
  return (
    <div>
      <Layout title='polygon chart'>
        <h2>Polygon Chart</h2>
        <PolygonChart
          id='polygon-chart'
          chartInnerPadding={{ top: 20, right: 20, bottom: 20, left: 20 }}
          chartDataList={CHART_DATA_LIST}
        />
      </Layout>
    </div>
  );
}
