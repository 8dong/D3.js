import { FC, useEffect } from 'react'
import * as d3 from 'd3'

import PieChartView from '@components/view-assets/sections/PieChartView'

interface IProps {
  dataList: {
    xAxisData: string
    yAxisData: number
  }[]
  chartId: string
  chartWidth: number
  chartHeight: number
}

const PieChartContainer: FC<IProps> = ({ dataList, chartId, chartWidth, chartHeight }) => {
  const draw = () => {
    const svg = createSvg(chartId, chartWidth, chartHeight)

    const percentDataList = getPercentDataList(dataList)
    const pieChartDataList = getPieChartDataList(percentDataList)

    const outerRadius = (d3.min([chartWidth, chartHeight]) as number) / 2
    const innerRadius = outerRadius * 0.7

    const originArcGenerator = getOriginArcGenerator(innerRadius, outerRadius)
    const hoverArcGenerator = getHoverArcGenerator(innerRadius, outerRadius)

    const piePaths = createPies(svg, chartWidth, chartHeight, pieChartDataList, originArcGenerator)

    const tooltip = createTooltip(chartId)

    piePaths
      .data(pieChartDataList)
      .on('mousemove', (event: MouseEvent, data) => {
        handleMouseMove(event, data, hoverArcGenerator, tooltip)
      })
      .on('mouseout', (event: MouseEvent, data) => {
        handleMouseOut(event, originArcGenerator, tooltip)
      })
  }

  const createSvg = (chartId: string, chartWidth: number, chartHeight: number) => {
    const chartArea = d3.selectAll(`#${chartId}`)

    chartArea.selectAll('svg').remove()
    chartArea.selectAll('.tooltip').remove()

    return chartArea.append('svg').attr('width', chartWidth).attr('height', chartHeight)
  }

  const getPercentDataList = (
    dataList: {
      xAxisData: string
      yAxisData: number
    }[]
  ) => {
    const totlaYAxisData = dataList.reduce((prevTotal, data) => prevTotal + data.yAxisData, 0)

    return dataList.map((data) => ({
      xAxisData: data.xAxisData,
      yAxisData: (data.yAxisData / totlaYAxisData) * 100
    }))
  }

  const getPieChartDataList = (percentDataList: { xAxisData: string; yAxisData: number }[]) => {
    return d3.pie().value((data) => (data as any).yAxisData)(percentDataList as any)
  }

  const getOriginArcGenerator = (innerRadius: number, outerRadius: number) => {
    return d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius * 0.9)
      .startAngle((data) => data.startAngle)
      .endAngle((data) => data.endAngle)
  }

  const getHoverArcGenerator = (innerRadius: number, outerRadius: number) => {
    return d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .startAngle((data) => data.startAngle)
      .endAngle((data) => data.endAngle)
  }

  const createPies = (
    svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>,
    chartWidth: number,
    chartHeight: number,
    pieChartDataList: d3.PieArcDatum<
      | number
      | {
          valueOf(): number
        }
    >[],
    arcGenerator: d3.Arc<any, d3.DefaultArcObject>
  ) => {
    return svg
      .append('g')
      .attr('transform', `translate(${chartWidth / 2}, ${chartHeight / 2})`)
      .selectAll('path')
      .data(pieChartDataList)
      .enter()
      .append('path')
      .attr('d', (data) => arcGenerator(data as any))
      .attr('fill', '#4E63EF')
      .attr('stroke', '#fff')
  }

  const createTooltip = (chartId: string) => {
    const tooltip = d3
      .select(`#${chartId}`)
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', '0')

    tooltip.append('span').attr('class', 'tooltip-label')
    tooltip.append('span').attr('class', 'tooltip-amount')

    return tooltip
  }

  const handleMouseMove = (
    event: MouseEvent,
    data: any,
    arcGenerator: d3.Arc<any, d3.DefaultArcObject>,
    tooltip: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>
  ) => {
    const hoveredPiePath = d3.select(event.target as HTMLElement)

    hoveredPiePath.attr('d', (data) => arcGenerator(data as any))

    tooltip.select('.tooltip-label').text(`Label : ${data.data.xAxisData}`)
    tooltip.select('.tooltip-amount').text(`Amount : ${Math.floor(data.data.yAxisData)}%`)
    const tooltipTopPosition =
      event.offsetY >= chartHeight / 2 ? event.clientY + 50 : event.clientY - 130
    const tooltipLeftPosition =
      event.offsetX >= chartWidth / 2 ? event.clientX - 200 : event.clientX + 30
    tooltip
      .style('top', `${tooltipTopPosition}px`)
      .style('left', `${tooltipLeftPosition}px`)
      .style('opacity', 1)
  }

  const handleMouseOut = (
    event: MouseEvent,
    arcGenerator: d3.Arc<any, d3.DefaultArcObject>,
    tooltip: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>
  ) => {
    const bluredPiePath = d3.select(event.target as HTMLElement)

    bluredPiePath.attr('d', (data) => arcGenerator(data as any))

    tooltip.style('opacity', 0)
  }

  useEffect(() => {
    draw()
  }, [dataList])

  return <PieChartView chartId={chartId} />
}

export default PieChartContainer
