'use client';

import { useEffect } from 'react';
import * as d3 from 'd3';

import * as styles from '@/app/pie-chart/components/PieChart/style.css';

interface PieChartProps {
  id: string;
  chartInnerPadding: { top: number; right: number; bottom: number; left: number };
  chartDataList: { xAxisData: string; yAxisData: number }[];
}

export default function PieChart({ id, chartInnerPadding, chartDataList }: PieChartProps) {
  const drawChart = (
    id: string,
    chartInnerPadding: { top: number; right: number; bottom: number; left: number },
    chartDataList: { xAxisData: string; yAxisData: number }[]
  ) => {
    const svgEl = createSvgEl(id, chartInnerPadding);

    const svgWidth = svgEl.node()!.getBoundingClientRect().width;
    const svgHeight = svgEl.node()!.getBoundingClientRect().height;

    const pieChartDataList = getPieChartDataList(chartDataList);

    const outerRadius = (d3.min([svgWidth, svgHeight]) as number) / 2;
    const innerRadius = outerRadius * 0.7;

    const originArcGenerator = getOriginArcGenerator(outerRadius, innerRadius);
    const hoverArcGenerator = getHoverArcGenerator(outerRadius, innerRadius);

    const piePathEls = createPie(svgEl, svgWidth, svgHeight, pieChartDataList, originArcGenerator);

    piePathEls.on('mousemove', (event: MouseEvent, data) => {
      handleMouseMovePiePath(event, data, chartDataList, chartInnerPadding, hoverArcGenerator);
    });
    piePathEls.on('mouseout', (event: MouseEvent) => {
      handleMouseOutPiePath(event, originArcGenerator);
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
      .attr('height', `calc(100% - ${chartInnerPadding.top}px - ${chartInnerPadding.bottom}px)`);
  };

  const getPieChartDataList = (chartDataList: { xAxisData: string; yAxisData: number }[]) => {
    const totalYAXisData = chartDataList.reduce((prev, cur) => prev + cur.yAxisData, 0);

    return d3.pie().value((data) => data as number)(
      chartDataList.map((chartData) => (chartData.yAxisData / totalYAXisData) * 100)
    );
  };

  const getOriginArcGenerator = (outerRadius: number, innerRadius: number) => {
    return d3
      .arc()
      .outerRadius(outerRadius * 0.9)
      .innerRadius(innerRadius)
      .startAngle((data) => data.startAngle)
      .endAngle((data) => data.endAngle);
  };

  const getHoverArcGenerator = (outerRadius: number, innerRadius: number) => {
    return d3
      .arc()
      .outerRadius(outerRadius)
      .innerRadius(innerRadius)
      .startAngle((data) => data.startAngle)
      .endAngle((data) => data.endAngle);
  };

  const createPie = (
    svgEl: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>,
    svgWidth: number,
    svgHeight: number,
    pieChartDataList: d3.PieArcDatum<
      | number
      | {
          valueOf(): number;
        }
    >[],
    arcGenerator: d3.Arc<any, d3.DefaultArcObject>
  ) => {
    return svgEl
      .append('g')
      .style('transform', `translate(${svgWidth / 2}px, ${svgHeight / 2}px)`)
      .selectAll('path')
      .data(pieChartDataList)
      .enter()
      .append('path')
      .attr('stroke', '#fff')
      .attr('d', (data) => arcGenerator(data as any))
      .attr('fill', '#253FEB');
  };

  const handleMouseMovePiePath = (
    event: MouseEvent,
    data: d3.PieArcDatum<
      | number
      | {
          valueOf(): number;
        }
    >,
    chartDataList: {
      xAxisData: string;
      yAxisData: number;
    }[],
    chartInnerPadding: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    },
    hoverArcGenerator: d3.Arc<any, d3.DefaultArcObject>
  ) => {
    const piePathEl = d3.select(event.currentTarget as SVGPathElement);

    piePathEl.attr('d', (data) => hoverArcGenerator(data as any));

    const tooltipEl = d3.select(`.${styles.tooltip}`);

    tooltipEl
      .style('opacity', '1')
      .style('top', `${event.offsetY - 10}px`)
      .style('left', `${event.offsetX - chartInnerPadding.left}px`);
    tooltipEl
      .select(`.${styles.tooltipContent}`)
      .text(`label: ${chartDataList[data.index].xAxisData}, value: ${Math.floor(data.value)}%`);
  };

  const handleMouseOutPiePath = (
    event: MouseEvent,
    originArcGenerator: d3.Arc<any, d3.DefaultArcObject>
  ) => {
    const piePathEl = d3.select(event.currentTarget as SVGPathElement);

    piePathEl.attr('d', (data) => originArcGenerator(data as any));

    const tooltipEl = d3.select(`.${styles.tooltip}`);
    tooltipEl.style('opacity', '0');
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
