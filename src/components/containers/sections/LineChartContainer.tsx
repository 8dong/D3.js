import { FC, useEffect } from 'react'
import * as d3 from 'd3'

import LineChartView from '@components/view-assets/sections/LineChartView'

interface IProps {
  dataList: { xAxisData: string; yAxisData: number }[]
  chartId: string
  chartWidth: number
  chartHeight: number
}

const LineChartContainer: FC<IProps> = ({ dataList, chartId, chartWidth, chartHeight }) => {
  const draw = () => {
    const xAxisDataList = dataList.map((data) => data.xAxisData)
    const yAxisDataList = dataList.map((data) => data.yAxisData)

    const svg = createSvg(chartId, chartWidth, chartHeight)

    const xScale = createXScale(xAxisDataList, chartWidth)
    const yScale = createYScale(yAxisDataList, chartHeight)

    createXAxis(svg, chartHeight, xScale)
    createYAxis(svg, chartWidth, yScale)

    createSeriesLine(svg, dataList, xScale, yScale)

    const focusArea = createFocusArea(svg, chartHeight)
    const tooltip = createTooltip(chartId)

    svg.on('mousemove', (event: MouseEvent) => {
      handleMouseMove(
        event,
        chartWidth,
        chartHeight,
        xAxisDataList,
        yAxisDataList,
        xScale,
        yScale,
        focusArea,
        tooltip
      )
    })
    svg.on('mouseout', () => {
      handleMouseOut(focusArea, tooltip)
    })
  }

  const createSvg = (chartId: string, chartWidth: number, chartHeight: number) => {
    const chartArea = d3.selectAll(`#${chartId}`)

    chartArea.selectAll('svg').remove()
    chartArea.selectAll('.tooltip').remove()

    return chartArea.append('svg').attr('width', chartWidth).attr('height', chartHeight)
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
      .attr('transform', `translate(30, 0)`)
      .call((g) => g.selectAll('.domain').remove())
      .call((g) =>
        g
          .selectAll('.tick > line')
          .attr('x2', chartWidth)
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

  const createSeriesLine = (
    svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>,
    dataList: {
      xAxisData: string
      yAxisData: number
    }[],
    xScale: d3.ScaleBand<string>,
    yScale: d3.ScaleLinear<number, number, never>
  ) => {
    const lineGenerator = d3
      .line()
      .x((data) => data[0])
      .y((data) => data[1])

    const positionDataList = dataList.map((data) => [
      (xScale(data.xAxisData) as number) + xScale.bandwidth() / 2,
      yScale(data.yAxisData)
    ])

    svg
      .append('g')
      .append('path')
      .data([positionDataList])
      .attr('d', (data) => lineGenerator(data as [number, number][]))
      .attr('fill', 'none')
      .attr('stroke', '#253FEB')
      .attr('stroke-width', 4)
  }

  const createFocusArea = (
    svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>,
    chartHeight: number
  ) => {
    const focuseArea = svg.append('g').style('opacity', 0)

    focuseArea
      .append('line')
      .attr('y1', 30)
      .attr('y2', chartHeight - 30)
      .attr('stroke', '#b7b7b7')
      .attr('stroke-width', '2px')

    focuseArea.append('circle').attr('r', 7).style('fill', '#4E63EF')

    return focuseArea
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
    yScale: d3.ScaleLinear<number, number, never>,
    focuseArea: d3.Selection<SVGGElement, unknown, HTMLElement, any>,
    tooltip: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>
  ) => {
    const currentIndex =
      d3.bisect(
        xAxisDataList.map((xAxisData) => xScale(xAxisData) as number),
        event.offsetX,
        1
      ) - 1

    focuseArea
      .selectAll('line')
      .attr(
        'transform',
        `translate(${(xScale(xAxisDataList[currentIndex]) as number) + xScale.bandwidth() / 2}, 0)`
      )
    focuseArea
      .selectAll('circle')
      .attr(
        'transform',
        `translate(${
          (xScale(xAxisDataList[currentIndex]) as number) + xScale.bandwidth() / 2
        }, ${yScale(yAxisDataList[currentIndex])})`
      )

    const tooltipTopPosition =
      event.offsetY >= chartHeight / 2 ? event.clientY + 50 : event.clientY - 130
    const tooltipLeftPosition =
      event.offsetX >= chartWidth / 2 ? event.clientX - 200 : event.clientX + 30
    tooltip.style('top', `${tooltipTopPosition}px`).style('left', `${tooltipLeftPosition}px`)
    tooltip.select('.tooltip-label').text(`Label : ${xAxisDataList[currentIndex]}`)
    tooltip.select('.tooltip-amount').text(`Amount : ${yAxisDataList[currentIndex]}`)

    focuseArea.style('opacity', 1)
    tooltip.style('opacity', 1)
  }

  const handleMouseOut = (
    focuseArea: d3.Selection<SVGGElement, unknown, HTMLElement, any>,
    tooltip: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>
  ) => {
    focuseArea.style('opacity', 0)
    tooltip.style('opacity', 0)
  }

  useEffect(() => {
    draw()
  }, [dataList])

  return <LineChartView chartId={chartId} />
}

export default LineChartContainer
