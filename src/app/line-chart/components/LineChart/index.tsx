'use client';

import { useEffect } from 'react';
import * as d3 from 'd3';

import * as styles from '@/app/line-chart/components/LineChart/style.css';

interface LineChartProps {
  id: string;
  chartInnerPadding: { top: number; right: number; bottom: number; left: number };
  chartDataList: { xAxisData: string; yAxisData: number }[];
}

export default function LineChart({ id, chartInnerPadding, chartDataList }: LineChartProps) {
  const drawChart = (
    id: string,
    chartInnerPadding: { top: number; right: number; bottom: number; left: number },
    chartDataList: { xAxisData: string; yAxisData: number }[]
  ) => {
    const svgEl = createSvgEl(id, chartInnerPadding);

    const svgWidth = (svgEl.node() as SVGElement).getBoundingClientRect().width;
    const svgHeight = (svgEl.node() as SVGElement).getBoundingClientRect().height;
    const xAxisDataList = chartDataList.map((chartData) => chartData.xAxisData);
    const yAxisdDataList = chartDataList.map((chartData) => chartData.yAxisData);

    const xScale = createXScale(xAxisDataList, svgWidth);
    const yScale = createYScale(yAxisdDataList, svgHeight);

    createXAxis(svgEl, svgWidth, svgHeight, xScale);
    createYAxis(svgEl, svgWidth, svgHeight, yAxisdDataList, yScale);

    createLine(svgEl, chartDataList, xScale, yScale);
    const verticalLine = createVerticalLine(svgEl, svgHeight);
    const points = createPoints(svgEl, chartDataList, xScale, yScale);

    svgEl.on('mousemove', (event) => {
      handleMouseMoveSvgEl(
        event,
        points,
        verticalLine,
        chartInnerPadding,
        xAxisDataList,
        yAxisdDataList,
        xScale
      );
    });
    svgEl.on('mouseleave', () => {
      handleMouseLeaveSvgEl(points, verticalLine);
    });
  };

  const createSvgEl = (
    id: string,
    chartInnerPadding: { top: number; right: number; bottom: number; left: number }
  ) => {
    d3.select(`#${id}`).select('svg').remove();

    return d3
      .select(`#${id}`)
      .append('svg')
      .attr('width', `calc(100% - ${chartInnerPadding.left}px - ${chartInnerPadding.right}px)`)
      .attr('height', `calc(100% - ${chartInnerPadding.top}px - ${chartInnerPadding.bottom}px)`)
      .attr('overflow', 'visible');
  };

  const createXScale = (xAxisDataList: string[], svgWidth: number) => {
    return d3.scaleBand().domain(xAxisDataList).range([0, svgWidth]);
  };

  const createYScale = (yAxisDataList: number[], svgHeight: number) => {
    return d3
      .scaleLinear()
      .domain([0, d3.max(yAxisDataList)!])
      .range([svgHeight, 0]);
  };

  const createXAxis = (
    svgEl: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>,
    svgWidth: number,
    svgHeight: number,
    xScale: d3.ScaleBand<string>
  ) => {
    svgEl
      .append('g')
      .style('transform', `translateY(${svgHeight}px)`)
      .call(d3.axisBottom(xScale))
      .call((g) => {
        g.select('.domain').remove();
        g.selectAll('.tick > line').remove();

        g.attr('font-size', '14px');

        g.append('line')
          .attr('x2', `${svgWidth}`)
          .attr('stroke', '#e4e4e4')
          .attr('stroke-width', '3px');
      });
  };

  const createYAxis = (
    svgEl: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>,
    svgWidth: number,
    svgHeight: number,
    yAxisDataList: number[],
    yScale: d3.ScaleLinear<number, number, never>
  ) => {
    const avgValue = yAxisDataList.reduce((prev, cur) => prev + cur, 0) / yAxisDataList.length + 1;

    svgEl
      .append('g')
      .call(d3.axisLeft(yScale).tickValues([0, avgValue, d3.max(yAxisDataList)!]))
      .call((g) => {
        g.select('.domain').remove();
        g.selectAll('.tick > line').remove();

        g.attr('font-size', '14px');

        g.selectAll('.tick')
          .append('line')
          .attr('x2', svgWidth)
          .attr('stroke', '#e4e4e4')
          .attr('stroke-width', '3px')
          .attr('stroke-dasharray', '5');
        g.append('line')
          .attr('y2', svgHeight)
          .attr('stroke', '#e4e4e4')
          .attr('stroke-width', '3px');
      });
  };

  const createLine = (
    svgEl: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>,
    chartDataList: { xAxisData: string; yAxisData: number }[],
    xScale: d3.ScaleBand<string>,
    yScale: d3.ScaleLinear<number, number, never>
  ) => {
    const lineGenerator = d3
      .line()
      .x((data) => data[0])
      .y((data) => data[1]);

    const lineGeneratorParams = chartDataList.map((chartData) => [
      xScale(chartData.xAxisData),
      yScale(chartData.yAxisData)
    ]) as [number, number][];

    svgEl
      .append('g')
      .append('path')
      .data([lineGeneratorParams])
      .attr('d', (data) => lineGenerator(data))
      .attr('fill', 'none')
      .attr('stroke', '#253FEB')
      .attr('stroke-width', '3px')
      .style('transform', `translateX(${xScale.bandwidth() / 2}px)`);
  };

  const createPoints = (
    svgEl: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>,
    chartDataList: { xAxisData: string; yAxisData: number }[],
    xScale: d3.ScaleBand<string>,
    yScale: d3.ScaleLinear<number, number, never>
  ) => {
    return svgEl
      .append('g')
      .style('transform', `translateX(${xScale.bandwidth() / 2}px)`)
      .selectAll('circle')
      .data(chartDataList)
      .enter()
      .append('circle')
      .attr('r', '6')
      .attr('cx', (data) => xScale(data.xAxisData)!)
      .attr('cy', (data) => yScale(data.yAxisData))
      .attr('stroke', '#253FEB')
      .attr('stroke-width', '3px')
      .attr('fill', '#fff')
      .style('opacity', '0');
  };

  const createVerticalLine = (
    svgEl: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>,
    svgHeight: number
  ) => {
    return svgEl
      .append('g')
      .append('line')
      .attr('y2', `${svgHeight}`)
      .attr('fill', 'none')
      .attr('stroke', '#e4e4e4')
      .attr('stroke-width', '3px');
  };

  const handleMouseMoveSvgEl = (
    event: MouseEvent,
    points: d3.Selection<
      SVGCircleElement,
      {
        xAxisData: string;
        yAxisData: number;
      },
      SVGGElement,
      unknown
    >,
    verticalLine: d3.Selection<SVGLineElement, unknown, HTMLElement, any>,
    chartInnerPadding: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    },
    xAxisDataList: string[],
    yAxisDataList: number[],
    xScale: d3.ScaleBand<string>
  ) => {
    const currentIndex =
      d3.bisect(
        xAxisDataList.map((xAxisData) => xScale(xAxisData)!),
        event.offsetX
      ) - 1;

    points.each((_, index, points) => {
      if (index === currentIndex) {
        points[index].style.opacity = '1';
      } else {
        points[index].style.opacity = '0';
      }
    });

    verticalLine
      .style('opacity', '1')
      .style(
        'transform',
        `translateX(${xScale(xAxisDataList[currentIndex])! + xScale.bandwidth() / 2}px)`
      );

    const tooltip = d3.select(`.${styles.tooltip}`);
    tooltip
      .style('opacity', '1')
      .style('top', `${event.offsetY - 10}px`)
      .style('left', `${event.offsetX - chartInnerPadding.left}px`);
    tooltip
      .select(`.${styles.tooltipContent}`)
      .text(`label: ${xAxisDataList[currentIndex]}, value: ${yAxisDataList[currentIndex]}`);
  };

  const handleMouseLeaveSvgEl = (
    points: d3.Selection<
      SVGCircleElement,
      {
        xAxisData: string;
        yAxisData: number;
      },
      SVGGElement,
      unknown
    >,
    verticalLine: d3.Selection<SVGLineElement, unknown, HTMLElement, any>
  ) => {
    d3.select(`.${styles.tooltip}`).style('opacity', '0');
    points.nodes().forEach((el) => (el.style.opacity = '0'));
    verticalLine.style('opacity', '0');
  };

  useEffect(() => {
    drawChart(id, chartInnerPadding, chartDataList);
  }, [id, chartInnerPadding, chartDataList]);

  return (
    <div id={id} className={styles.area}>
      <div className={styles.tooltip}>
        <span className={styles.tooltipContent}></span>
      </div>
    </div>
  );
}
