'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

import * as styles from '@/app/polygon-chart/components/PoloygonChart/style.css';

interface PolygonChartProps {
  id: string;
  chartInnerPadding: { top: number; right: number; bottom: number; left: number };
  chartDataList: { xAxisData: string; yAxisData: number }[];
}

export default function PolygonChart({ id, chartInnerPadding, chartDataList }: PolygonChartProps) {
  const chartAreaElRef = useRef<HTMLDivElement>(null);
  const isFirstComeRef = useRef<boolean>(true);

  const drawChart = (
    id: string,
    chartInnerPadding: { top: number; right: number; bottom: number; left: number },
    chartDataList: { xAxisData: string; yAxisData: number }[]
  ) => {
    const svgEl = createSvgEl(id, chartInnerPadding);

    const svgElClientRect = svgEl.node()!.getBoundingClientRect();
    const svgSize = Math.min(svgElClientRect.width, svgElClientRect.height);
    const radius = svgSize / 2;

    const scaleLinear = createScaleLinear(radius);

    const percentChartDataList = chartDataList.map((chartData) => [
      chartData.xAxisData,
      scaleLinear(chartData.yAxisData)
    ]) as [string, number][];

    createGrids(
      svgEl,
      radius,
      svgElClientRect.width,
      svgElClientRect.height,
      3,
      percentChartDataList
    );
    createAxis(svgEl, radius, svgElClientRect.width, svgElClientRect.height, percentChartDataList);
    createSeriesLine(svgEl, svgElClientRect.width, svgElClientRect.height, percentChartDataList);
    createLabels(
      svgEl,
      radius,
      svgElClientRect.width,
      svgElClientRect.height,
      percentChartDataList
    );
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

  const createScaleLinear = (radius: number) => {
    return d3.scaleLinear().domain([0, 100]).range([0, radius]);
  };

  const createAxis = (
    svgEl: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>,
    radius: number,
    svgWidth: number,
    svgHeight: number,
    chartDataList: [string, number][]
  ) => {
    const angle = (Math.PI * 2) / chartDataList.length;

    svgEl
      .append('g')
      .style('transform', `translate(${svgWidth / 2}px, ${svgHeight / 2}px`)
      .selectAll('line')
      .data(chartDataList)
      .enter()
      .append('line')
      .attr('x1', '0')
      .attr('y', '0')
      .attr('x2', (_, i) => radius * Math.cos(i * angle - Math.PI / 2))
      .attr('y2', (_, i) => radius * Math.sin(i * angle - Math.PI / 2))
      .attr('stroke', '#EFEEEE')
      .attr('stroke-dasharray', '4 4')
      .attr('stroke-width', '2px');
  };

  const createGrids = (
    svgEl: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>,
    radius: number,
    svgWidth: number,
    svgHeight: number,
    gridLineNum: number,
    chartDataList: [string, number][]
  ) => {
    const radiusDelta = radius / gridLineNum;

    const gridLineGenerator = (radius: number) => {
      const angle = (Math.PI * 2) / chartDataList.length;

      return d3
        .line()
        .x((_, i) => radius * Math.cos(i * angle - Math.PI / 2))
        .y((_, i) => radius * Math.sin(i * angle - Math.PI / 2))(chartDataList as any);
    };

    svgEl
      .append('g')
      .style('transform', `translate(${svgWidth / 2}px, ${svgHeight / 2}px`)
      .selectAll('path')
      .data(d3.range(gridLineNum))
      .enter()
      .append('path')
      .attr('d', (_, i) => gridLineGenerator((chartDataList.length - 2 - i) * radiusDelta))
      .style('fill', (_, i) => (i % 2 !== 0 ? '#F7F7F7' : '#fff'))
      .style('stroke', '#EFEEEE')
      .style('stroke-width', (_, i) => (i === 0 ? '1px' : '2px'))
      .style('stroke-dasharray', (_, i) => (i === 0 ? '0' : '4 4'));
  };

  const createSeriesLine = (
    svgEl: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>,
    svgWidth: number,
    svgHeight: number,
    chartDataList: [string, number][]
  ) => {
    const angle = (Math.PI * 2) / chartDataList.length;

    const lineAreaGenerator = d3
      .areaRadial()
      .angle((_, i) => angle * i)
      .innerRadius(0)
      .outerRadius((data) => data[1])
      .curve(d3.curveLinearClosed);

    svgEl
      .append('g')
      .style('transform', `translate(${svgWidth / 2}px, ${svgHeight / 2}px)`)
      .append('path')
      .attr('d', lineAreaGenerator(chartDataList as any))
      .attr('stroke', '#001B8E')
      .attr('stroke-width', '1px')
      .attr('fill', '#3D58CF4D');
  };

  const createLabels = (
    svgEl: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>,
    radius: number,
    svgWidth: number,
    svgHeight: number,
    chartDataList: [string, number][]
  ) => {
    const angle = (Math.PI * 2) / chartDataList.length;

    svgEl
      .append('g')
      .style('transform', `translate(${svgWidth / 2}px, ${svgHeight / 2}px)`)
      .selectAll('text')
      .data(chartDataList)
      .enter()
      .append('text')
      .text((data) => data[0])
      .attr('x', (_, i) => radius * Math.cos(i * angle - Math.PI / 2) * 1.05)
      .attr('y', (_, i) => radius * Math.sin(i * angle - Math.PI / 2) * 1.05)
      .attr('text-anchor', 'middle');
  };

  const observer = new ResizeObserver(() => {
    if (!chartAreaElRef.current) return;

    drawChart(id, chartInnerPadding, chartDataList);
  });

  useEffect(() => {
    if (isFirstComeRef.current) return;

    drawChart(id, chartInnerPadding, chartDataList);
  }, [id, chartInnerPadding, chartDataList]);

  useEffect(() => {
    if (!chartAreaElRef.current || !isFirstComeRef.current) return;

    isFirstComeRef.current = false;

    observer.observe(chartAreaElRef.current);

    return () => {
      if (!chartAreaElRef.current || !isFirstComeRef.current) return;

      observer.disconnect();
    };
  }, []);

  return <div ref={chartAreaElRef} id={id} className={styles.area}></div>;
}
