# Visualizing data with D3.js

## Selecting Elements

```js
import * as d3 from 'd3';

/* 
  d3.select(selector: string)
  인수로 CSS 선택자 문자열을 전달, DOM 요소를 선택하고 선택한 요소에 대한 D3.js 기능을 적용하는데 사용
*/
const element = d3.select('css selector');

/* 
  d3.selectAll(selector: string)
  매칭된 모든 요소를 갖는 Selection 객체 반환
*/
const elements = d3.selectAll('css selector');
```

```js
/* 
  Selection 객체의 구조는 아래와 같습니다.
  Selection 객체를 사용하여 선택한 요소의 스타일, 속성, 데이터 바인딩, 이벤트 핸들링 등을 조작할 수 있습니다. 또한 Selection 객체를 이용하여 애니메이션과 전환 효과를 적용하여 동적인 효과를 구현할 수도 있습니다. 이를 통해 데이터 시각화 및 DOM 조작을 효과적으로 수행할 수 있습니다.

  Selection {
    _groups: [Array of DOM elements], // 선택한 요소의 그룹 (여러 요소를 포함할 수 있음)
    _parents: [Array of parent nodes], // 선택한 요소의 부모 노드 그룹 (마찬가지로 여러 부모 노드를 포함할 수 있음)
  }

  - _groups: 선택한 DOM 요소의 그룹입니다. 이는 배열 형태로 여러 DOM 요소를 포함할 수 있습니다.
    예를 들어, d3.select를 사용하여 하나의 요소를 선택한 경우에도 _groups 배열에 해당 요소가 포함됩니다.
    여러 개의 요소를 선택한 경우, 각 요소는 배열 내의 각각의 원소로 표현됩니다.

  - _parents: 선택한 DOM 요소의 부모 노드 그룹입니다. 
    이 역시 배열 형태로 여러 부모 노드를 포함할 수 있습니다. 
    _groups와 유사하게, 각 부모 노드는 배열 내의 각각의 원소로 표현됩니다.
*/
```

## Modifying elements

```js
import * as d3 from 'd3';

/*
  Selection.append(type: string)
  선택한 요소 내에 새로운 자식 요소를 추가하는데 사용. 추가된 요소는 선택한 요소 내에서 해당 요소들의 가장 마지막에 위치
  반환값은 새롭게 추가된 요소를 갖는 Selection 객체
*/
d3.select('css selector').append('tag name');

/*
  Selection.remove()
  선택된 요소를 DOM에서 제거하는데 사용
*/
d3.select('css selector').remove();

/*
  Selection.attr(key: string, value?: string)
  택된 요소의 속성(HTML Attribute)을 설정하거나 가져올 때 사용
  반환값은 수정된 요소를 갖는 Selection 객체
*/
d3.select('css selector').attr('key', 'value');
d3.select('css selector').attr('key'); // 'value'

/*  
  Selection.style(key: string, value?: any, priority?: 'important')
  선택된 요소의 CSS 스타일을 설정하거나 가져올 때 사용
*/
d3.select('css selector').style('key', 'value');
d3.select('css selector').style('key'); // 'value'
```

## Controll flow

```js
import * as d3 from 'd3';

/*  
  selection.call(function: (element: Selection) => void)
  선택한 요소에 인자로 전달한 함수를 적용. 이 함수는 선택한 요소를 대상으로 작업을 수행하거나 설정을 변경
  첫 번째 인수로 선택된 요소 전달
*/
d3.select('css selector').call((element: Selection) => {
  // element 조작,,,
});
```

## Scale

### Band scales

```js
import * as d3 from 'd3';

// 주로 막대 차트, 그룹화된 막대 차트, 축과 같은 시각화 요소에서 x 또는 y 축의 위치를 설정하는데 활용
const createXScale = (xAxisDataList: string[], svgWidth: number) => {
  /*  
    d3.scaleBand(domain: string[], range: [number, number])
    domain에는 입력값의 범주들을 설정, range에는 해당 범주들이 표시될 위치(축의 위치)를 설정
    d3.scaleBand의 반환 값은 함수. 이 함수에 범주형 데이터 값을 입력하면 해당 값이 축의 위치로 변환
  */
  return d3.scaleBand().domain(xAxisData).range([0, svgWidth]);
};

const xScale = createXScale(['a', 'b', 'c'], 300);
console.log(xScale('a')); // 0
console.log(xScale('b')); // 150
console.log(xScale('c')); // 300
```

### Linear scales

```js
import * as d3 from 'd3';

// 주로 선 그래프, 산점도, 축과 같은 시각화 요소에서 데이터의 값을 픽셀 좌표나 크기로 변환하는데 활용
const createYScale = (yAxisDataList: number[], svgHeight: number) => {
  /*
    d3.scaleLinear(domain: [number, number], range: [number, number])
    domain에는 입력값의 범위를 설정, range에는 해당 입력값들이 표시될 위치(축의 위치)나 크기의 범위를 설정
    반환 값은 함수. 이 함수에 입력값을 전달하면 해당 값이 출력 범위 내의 위치로 변환
  */
  return d3
    .scaleLinear()
    .domain([0, d3.max(yAxisDataList)])
    .range([0, svgHeight]);
};

const yScale = createYScale([10, 130], 960);
console.log(yScale(10)); // 80
console.log(yScale(10)); // 320
```

## Axis

```js
import * as d3 from 'd3';

const createXAxis = (
  svgEl: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>,
  xSacle: d3.ScaleBand<string>
) => {
  /*
    d3.axisBottom(sacle: AxisScale)
    x축의 스케일과 연결하여 x 축을 생성. 이 스케일은 입력 도메인의 값을 출력 범위에 매핑하는 역할을 수행
    인수로 scale 함수 전달
  */
  svgEl.append('g').call(d3.axisBottom(xScale));
};

const createYAxis = (
  svgEl: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>,
  yScale: d3.ScaleLinear<number, number, never>
) => {
  svgEl.append('g').call(d3.axisTop(yScale));
};
```

## Joining Data

```js
import * as d3 from 'd3';

const createBar = (
  svgEl: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>,
  xSacle: d3.ScaleBand<string>,
  yScale: d3.ScaleLinear<number, number, never>,
  chartDataList: { xAxisData: string, yAxisData: number }[]
) => {
  /*
    Selection.data(any[])
    데이터를 선택한 요소에 데이터 바인딩하는데 사용. 이를 통해 데이터와 요소가 연결되어 데이터의 변화에 따라 요소의 상태를 업데이트
    데이터를 바인딩하면 새로운 데이터의 갯수에 따라 enter, update, exit의 개념을 사용하여 요소를 관리 가능
    바인딩된 데이터는 선택한 요소 내에서 콜백 함수 등에서 사용

    데이터 바인딩 한 이후 메서드 체이닝 두 번째 인수로 콜백함수 전달하여 바인딩한 데이터 접근 가능
    ex) Selection.data(dataList).attr('key', (data: any) => { ,,, })
    위 예제처럼 data 메서드로 데이터 바인딩 후 attr 메서드 체이닝 두 번째 인수로 콜백함수 전달하여 바인딩된 데이터에 접근 가능
    콜백함수는 아래와 같은 인수를 전달받음

    1. data: 데이터 바인딩된 요소에 대응하는 데이터 항목
    2. index: 데이터 배열 내에서의 데이터 항목의 인덱스
    3. groupIndex: selectAll() 메서드를 사용하여 여러 그룹을 선택한 경우에 해당 그룹의 인덱스를 전달
    4. nodes: 일부 메서드나 이벤트에서는 선택된 요소에 대한 정보
    5. event: 이벤트와 관련된 정보
  */

  /*    
    Selection.enter()
    새로운 데이터에 대응하는 Selection(요소)를 추가하는 역할
    바인딩한 데이터의 개수가 Selection 객체보다 많은 경우, 새로운 Selection 가상 객체 생성하여 데이터 바인딩하고 가상 객체 반환
    이후 append 메서드를 통해 가상 Selection 객체를 실제 Selection 객체로 추가
    즉, selectAll -> data -> enter -> append 순서로 사용
  */
  svgEl
    .append('g')
    .selectAll('rect')
    .data(chartDataList)
    .enter()
    .append('rect')
    .attr('x', (chartData) => xScale(chartData.xAxisData))
    .attr('y', (chartData) => yScale(chartData.yAxisData))
    .attr('width', 50)
    .attr('height', yScale(0) - yScale(d.yAxisData));
};
```

## Bisecting data

```js
import * as d3 from 'd3';

const handleMouseMove = (event: MouseEvent) => {
  /*
    d3.bisect(array: ArrayLike<number>, x: number, lo?: number, hi?: number): number
    첫 번째 인수로 배열, 두 번째 인수로 첫 번째 배열에 삽입할 값, 세 번째 인수는 검색 시작, 네 번째 인수는 검색 마지막 인덱스 전달
    정렬된 배열에서 특정 값이 삽입될 위치나 값을 찾는데 사용되는 함수
  */
  const currentDataIndex =
    d3.bisect(
      xAxisData.map((data) => xScale(data)),
      event.offsetX
    ) - 1;
};
```

## Generator

### Lines

```js
import * as d3 from 'd3';

const createLinePath = (
  svgEl: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>,
  xSacle: d3.ScaleBand<string>,
  yScale: d3.ScaleLinear<number, number, never>,
  chartDataList: { xAxisData: string, yAxisData: number }[]
) => {
  // [x좌표, y좌표]를 요소로 갖는 배열
  const lineGeneratorParams = chartDataList.map((chartData) => [
    xScale(chartData.xAxisData),
    yScale(chartData.yAxisData)
  ]);

  /*
    d3.line()
      .x(function: (data: [xPosition: number, yPosition: number]) => data[0])
      .y(function: (data: [xPosition: number, yPosition: number]) => data[1])
      (dataList: [xPosition: number, yPostion: number][])
    선 그래프(line chart)를 생성하기 위해 사용되는 함수. 선 그래프는 데이터 포인트를 선으로 연결하여 데이터의 추이나 패턴을 시각화하는데 사용
    line을 생성하기 위한 path 요소의 d 어트리뷰트 값으로 변환해주는 함수를 반환
    반환된 함수 인수로 x, y 좌표 값을 갖는 배열 전달시 x, y 메서드 콜백함수 인수로 배열 요소 순차 전달
  */
  const lineGenerator = d3
    .line()
    // x 좌표
    .x((data) => data[0])
    // y 좌표
    .y((data) => data[1]);

  return svg
    .append('g')
    .append('path')
    .data([positionValueList])
    .attr('d', (positionValueList) => lineGenerator(positionValueList));
};
```

### Pies & Arcs

```js
import * as d3 from 'd3';

// 파이 차트를 그리기 위해 yAxis 값을 백분율로 변환
const convertPercentDataList = (dataList: { xAxisData: string, yAxisData: number }[]) => {
  const totalYAxisData = dataList.reduce(
    (prevTotalValue: number, data: { xAxisData: string, yAxisData: number }) =>
      data.yAxisData + prevTotalValue,
    0
  );

  return dataList.map((data) => ({
    xAxisData: data.xAxisData,
    yAxisData: (data.yAxisData / totalAmount) * 100
  }));
};

const getPieDatalist = (calculatedDataList: { xAxisData: string, yAxisData: number }[]) => {
  /*
    d3.pie().value(Function)(dataList: any[])
    value 메서드 인수로 콜백 전달하면서 호출시 함수 반환, 반환된 함수 인수로 배열 전달
    value 메서드 인수로 전달한 콜백은 백분율로 변환된 값 반환
    입력 데이터 배열을 파이 차트의 데이터 포인트 배열로 변환. 각 데이터 포인트에는 데이터 항목의 값, 각도 등의 정보가 포함
  */

  /*
    d3.pie().value(Function)(dataList: any[]) 반환값의 타입은 아래와 같습니다.

    {
      data: any;
      index: number;
      endAngle: nuimber;
      startAngle: number;
      padAngle: number;
      value: number;
    }[]
  */
  return d3.pie().value((data) => data.yAxisData)(calculatedDataList);
};

const createPieChart = (
  svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>,
  pieDataList: d3.PieArcDatum<
    | number
    | {
        valueOf(): number
      }
  >[]
) => {
  const svgWidth = Number(svg.attr('width'));
  const svgHeight = Number(svg.attr('height'));

  const outerRadius = d3.min([svgWidth, svgHeight]) / 2;

  /*
    d3.arc()
      .innerRadius(radius: number)
      .outerRadius(radius: number)
      .startAngle((data) => data.startAngle)
      .endAngle((data) => data.endAngle)
      (data)
    파이 차트(pie chart)를 그리기 위한 path 어트리뷰트의 d 어트리뷰트 값으로 변환하는 함수 반환
    innerRadius, outerRadius 메서드 인수로 각각 내부, 외부 원 반지름 값 전달
    startAngle, endAngle 메서드 인수로 각각 시작, 끝 각도 값 전달
    반환된 함수 호출시 d3.pie().value(Function)가 반환한 배열의 요소 전달
  */

  const arcGenerator = d3
    .arc()
    .innerRadius(outerRadius * 0.65)
    .outerRadius(outerRadius)
    // d3.pie().value(Function)(data) 반환값 바인딩시 startAngle, endAngle 값으로 각도 값 접근 가능
    .startAngle((data) => data.startAngle)
    .endAngle((data) => data.endAngle);

  svg
    .append('g')
    .attr('transform', `translate(${svgWidth / 2}, ${svgHeight / 2})`)
    .selectAll('path')
    // d3.pie().value(Function)(data) 반환값 전달
    .data(pieDatalist)
    .enter()
    .append('path')
    .attr('d', (data) => arcGenerator(data))
    .attr('stroke', '#fff');
};
```
