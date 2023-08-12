import { FC, useEffect } from 'react'
import * as d3 from 'd3'

import BarChartView from '@components/view-assets/sections/BarChartView'

interface IProps {
  dataList: { xAxisData: string; yAxisData: number }[]
  chartId: string
  chartWidth: number
  chartHeight: number
}

const BarChartContainer: FC<IProps> = ({ dataList, chartId, chartWidth, chartHeight }) => {
  const draw = () => {
    const xAxisDataList = dataList.map((data) => data.xAxisData)
    const yAxisDataList = dataList.map((data) => data.yAxisData)

    const svg = createSvg(chartId, chartWidth, chartHeight)

    const xScale = createXScale(xAxisDataList, chartWidth)
    const yScale = createYScale(yAxisDataList, chartHeight)

    createXAxis(svg, chartHeight, xScale)
    createYAxis(svg, chartWidth, yScale)

    createBars(svg, xScale, yScale, dataList)
    const focusBg = createFocusBg(svg, chartHeight, xScale)
    const tooltip = createTooltip(chartId)

    svg.on('mousemove', (event: MouseEvent) =>
      handleMouseMove(
        event,
        chartWidth,
        chartHeight,
        xAxisDataList,
        yAxisDataList,
        xScale,
        focusBg,
        tooltip
      )
    )
    svg.on('mouseout', () => handleMouseOut(focusBg, tooltip))
  }

  const createSvg = (chartId: string, chartWidth: number, chartHeight: number) => {
    const chartArea = d3.selectAll(`#${chartId}`)

    chartArea.selectAll('svg').remove()
    chartArea.selectAll('.tooltip').remove()

    return chartArea
      .append('svg')
      .attr('id', chartId)
      .attr('width', chartWidth)
      .attr('height', chartHeight)
  }

  const createXScale = (xAxisDataList: string[], chartWidth: number) => {
    return d3
      .scaleBand()
      .domain(xAxisDataList)
      .range([30, chartWidth - 30])
  }

  const createYScale = (yAxisDataList: number[], chartHeight: number) => {
    return d3
      .scaleLinear()
      .domain([0, d3.max(yAxisDataList) as number])
      .range([chartHeight - 30, 30])
  }

  const createXAxis = (
    svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>,
    chartHeight: number,
    xScale: d3.ScaleBand<string>
  ) => {
    svg
      .append('g')
      .call(d3.axisBottom(xScale))
      .attr('transform', `translate(0, ${chartHeight - 30})`)
      .call((g) => g.selectAll('.domain').remove())
      .call((g) => g.selectAll('.tick > line').remove())
      .call((g) =>
        g
          .selectAll('text')
          .attr('fill', '#505050')
          .attr('stroke', '#505050')
          .attr('stroke-width', '0.1')
          .attr('font-size', '14')
          .attr('font-weight', '400')
      )
  }

  const createYAxis = (
    svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>,
    chartWidth: number,
    yScale: d3.ScaleLinear<number, number, never>
  ) => {
    svg
      .append('g')
      .call(d3.axisLeft(yScale).ticks(3))
      .attr('transform', 'translate(30, 0)')
      .call((g) => g.selectAll('.domain').remove())
      .call((g) =>
        g
          .selectAll('.tick > line')
          .attr('x2', Number(chartWidth) - 30)
          .style('stroke', '#e4e4e4')
          .attr('stroke-width', '1px')
      )
      .call((g) =>
        g
          .selectAll('text')
          .attr('fill', '#505050')
          .attr('stroke', '#505050')
          .attr('stroke-width', '0.1')
          .attr('font-size', '14')
          .attr('font-weight', '400')
      )
  }

  const createBars = (
    svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>,
    xScale: d3.ScaleBand<string>,
    yScale: d3.ScaleLinear<number, number, never>,
    dataList: { xAxisData: string; yAxisData: number }[]
  ) => {
    svg
      .append('g')
      .selectAll('rect')
      .data(dataList)
      .enter()
      .append('rect')
      .attr('x', (data) => (xScale(data.xAxisData) as number) + xScale.bandwidth() / 2 - 15)
      .attr('y', (data) => yScale(data.yAxisData))
      .attr('width', 30)
      .attr('height', (data) => yScale(0) - yScale(data.yAxisData))
      .attr('fill', '#253FEB')
  }

  const createFocusBg = (
    svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>,
    chartHeight: number,
    xScale: d3.ScaleBand<string>
  ) => {
    return svg
      .append('rect')
      .attr('class', 'hover-background')
      .attr('width', xScale.bandwidth())
      .attr('x', 30)
      .attr('y', 30)
      .attr('height', Number(chartHeight) - 60)
      .style('fill', 'rgba(214, 222, 232, 0.3)')
      .style('opacity', '0')
  }

  const createTooltip = (chartId: string) => {
    const tooltip = d3
      .selectAll(`#${chartId}`)
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', '0')

    tooltip.append('span').attr('class', 'tooltip-label')
    tooltip.append('span').attr('class', 'tooltip-amount')

    return tooltip
  }

  const handleMouseMove = (
    event: MouseEvent,
    chartWidth: number,
    chartHeight: number,
    xAxisDataList: string[],
    yAxisDataList: number[],
    xScale: d3.ScaleBand<string>,
    focusBg: d3.Selection<SVGRectElement, unknown, HTMLElement, any>,
    tooltip: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>
  ) => {
    const currentIndex =
      d3.bisect(xAxisDataList.map((xAxisData) => xScale(xAxisData)) as number[], event.offsetX, 1) -
      1

    focusBg
      .attr('transform', `translate(${(xScale(xAxisDataList[currentIndex]) as number) - 30}, 0)`)
      .style('opacity', 1)

    const tooltipTopPosition =
      event.offsetY >= chartHeight / 2 ? event.clientY + 30 : event.clientY - 100
    const tooltipLeftPosition =
      event.offsetX >= chartWidth / 2 ? event.clientX - 200 : event.clientX + 30
    tooltip.select('.tooltip-label').text(`Label : ${xAxisDataList[currentIndex]}`)
    tooltip.select('.tooltip-amount').text(`Amount : ${yAxisDataList[currentIndex]}`)
    tooltip
      .style('top', `${tooltipTopPosition}px`)
      .style('left', `${tooltipLeftPosition}px`)
      .style('opacity', 1)
  }

  const handleMouseOut = (
    focusBg: d3.Selection<SVGRectElement, unknown, HTMLElement, any>,
    tooltip: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>
  ) => {
    focusBg.style('opacity', 0)
    tooltip.style('opacity', 0)
  }

  useEffect(() => {
    draw()
  }, [dataList])

  return <BarChartView chartId={chartId} />
}

export default BarChartContainer
