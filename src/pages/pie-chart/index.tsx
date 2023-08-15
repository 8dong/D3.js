import PieChartContainer from '@components/containers/sections/PieChartContainer'
import { NextPage } from 'next'

const PieChart: NextPage = () => {
  return (
    <PieChartContainer
      dataList={[
        { xAxisData: 'a', yAxisData: 47 },
        { xAxisData: 'b', yAxisData: 89 },
        { xAxisData: 'c', yAxisData: 100 },
        { xAxisData: 'd', yAxisData: 17 },
        { xAxisData: 'e', yAxisData: 55 }
      ]}
      chartId="pie-chart"
      chartWidth={800}
      chartHeight={400}
    />
  )
}

export default PieChart
