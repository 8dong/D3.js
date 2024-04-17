'use client';

import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

import * as styles from '@/app/bar-chart/components/BarChart/styles.css';

interface BarChartProps {
  id: string;
  chartInnerPadding: { top: number; right: number; bottom: number; left: number };
  chartDataList: { xAxisData: string; yAxisData: number }[];
}

export default function BarChart({ id, chartInnerPadding, chartDataList }: BarChartProps) {
  const chartAreElRef = useRef<HTMLDivElement>(null);

  const drawChart = (
    id: string,
    chartInnerPadding: { top: number; right: number; bottom: number; left: number },
    chartDataList: { xAxisData: string; yAxisData: number }[]
  ) => {
    const svgEl = createSvgEl(id, chartInnerPadding);

    const xAxisDataList = chartDataList.map((chartData) => chartData.xAxisData);
    const yAxisDataList = chartDataList.map((chartData) => chartData.yAxisData);

    const svgWidth = svgEl.node()!.getBoundingClientRect().width;

    const svgHeight = svgEl.node()!.getBoundingClientRect().height;

    const xScale = createXScale(xAxisDataList, svgWidth);
    const yScale = createYScale(yAxisDataList, svgHeight);

    createXAxis(svgEl, svgWidth, svgHeight, xScale);
    createYAxis(svgEl, svgWidth, svgHeight, yAxisDataList, yScale);

    const chartData = chartDataList.map((chartData) => [
      chartData.xAxisData,
      chartData.yAxisData
    ]) as [string, number][];

    createBars(svgEl, chartData, xScale, yScale);

    const hoverBackgroundEls = createHoverBackgrounds(svgEl, chartData, xScale, yScale);

    hoverBackgroundEls.on('mouseenter', (event: MouseEvent) => {
      (event.currentTarget as SVGRectElement).style.opacity = '1';
    });
    hoverBackgroundEls.on('mouseleave', (event: MouseEvent) => {
      (event.currentTarget as SVGRectElement).style.opacity = '0';
    });

    svgEl.on('mousemove', (event) => {
      handleMouseEnterSvg(event, xAxisDataList, yAxisDataList, xScale, chartInnerPadding.left);
    });
    svgEl.on('mouseleave', handleMouseLeaveSvg);
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
      .style('overflow', 'visible');
  };

  const createXScale = (xAxisDataList: string[], svgWidth: number) =>
    d3.scaleBand().domain(xAxisDataList).range([0, svgWidth]);

  const createYScale = (yAxisDataList: number[], svgHeight: number) =>
    d3
      .scaleLinear()
      .domain([0, d3.max(yAxisDataList)!])
      .range([svgHeight, 0]);

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

        g.append('line').attr('x2', svgWidth).attr('stroke', '#e4e4e4').attr('stroke-width', '3px');
      });
  };

  const createYAxis = (
    svgEl: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>,
    svgWidth: number,
    svgHeight: number,
    yAxisDataList: number[],
    yScale: d3.ScaleLinear<number, number, never>
  ) => {
    const avgValue = Math.floor(
      yAxisDataList.reduce((prev, cur) => prev + cur, 0) / yAxisDataList.length + 1
    );

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
          .attr('stroke-dasharray', '5')
          .attr('stroke-width', '3px');
        g.append('line')
          .attr('y2', svgHeight)
          .attr('stroke', '#e4e4e4')
          .attr('stroke-width', '3px');
      });
  };

  const createBars = (
    svgEl: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>,
    chartDataList: [string, number][],
    xScale: d3.ScaleBand<string>,
    yScale: d3.ScaleLinear<number, number, never>
  ) => {
    svgEl
      .append('g')
      .selectAll('rect')
      .data(chartDataList)
      .enter()
      .append('rect')
      .attr('x', (data) => xScale(data[0])!)
      .attr('rx', '1%')
      .attr('width', xScale.bandwidth() / 4)
      .attr('y', (data) => yScale(data[1]))
      .attr('fill', '#253FEB')
      .attr('height', (data) => yScale(0) - yScale(data[1]))
      .style('transform', `translateX(${xScale.bandwidth() / 2 - xScale.bandwidth() / 4 / 2}px)`);
  };

  const createHoverBackgrounds = (
    svgEl: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>,
    chartDataList: [string, number][],
    xScale: d3.ScaleBand<string>,
    yScale: d3.ScaleLinear<number, number, never>
  ) => {
    return svgEl
      .append('g')
      .selectAll('rect')
      .data(chartDataList)
      .enter()
      .append('rect')
      .attr('x', (data) => xScale(data[0])!)
      .attr('width', xScale.bandwidth())
      .attr('y', 0)
      .attr('height', yScale(0))
      .attr('fill', 'rgba(214, 222, 232, 0.3)')
      .style('opacity', 0);
  };

  const handleMouseEnterSvg = (
    event: MouseEvent,
    xAxisDataList: string[],
    yAxisDataList: number[],
    xScale: d3.ScaleBand<string>,
    innerPaddingLeft: number
  ) => {
    const currentChartDataListIndex =
      d3.bisect(
        xAxisDataList.map((xAxisData) => xScale(xAxisData)!),
        event.offsetX
      ) - 1;

    const tooltip = d3.select(`.${styles.tooltip}`);

    if (currentChartDataListIndex < 0 || currentChartDataListIndex > chartDataList.length) {
      tooltip.style('opacity', '0');
    } else {
      tooltip
        .style('opacity', '1')
        .style('top', `${event.offsetY - 10}px`)
        .style('left', `${event.offsetX - innerPaddingLeft}px`);
      tooltip
        .select(`.${styles.tooltipContent}`)
        .text(
          `label: ${xAxisDataList[currentChartDataListIndex]}, value: ${yAxisDataList[currentChartDataListIndex]}`
        );
    }
  };

  const handleMouseLeaveSvg = () => {
    d3.select(`.${styles.tooltip}`).style('opacity', '0');
  };

  useEffect(() => {
    drawChart(id, chartInnerPadding, chartDataList);
  }, [id, chartInnerPadding, chartDataList]);

  useEffect(() => {
    if (!chartAreElRef.current) return;

    const observer = new ResizeObserver(() => {
      drawChart(id, chartInnerPadding, chartDataList);
    });

    observer.observe(chartAreElRef.current);

    return () => {
      observer.disconnect();
    };
  }, [id, chartInnerPadding, chartDataList]);

  return (
    <div id={id} ref={chartAreElRef} className={styles.area}>
      <div className={styles.tooltip}>
        <span className={styles.tooltipContent}></span>
      </div>
    </div>
  );
}
