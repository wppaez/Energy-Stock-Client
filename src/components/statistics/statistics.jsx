import React, { useEffect, useRef } from 'react';
import { Text, VStack } from '@chakra-ui/layout';
import {
  select,
  scaleLinear,
  line,
  curveCardinal,
  axisBottom,
  axisLeft,
  scaleTime,
} from 'd3';

import { useResizeObserver } from '../../hooks/useResizeObserver';

import styles from './statistics.module.css';
import { DateHelper, ChromaHelper } from '../../shared/common';

export const Statistics = ({ stats }) => {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  /**
   * Handle linechart render with d3-
   */
  useEffect(() => {
    if (!stats) return;

    const svg = select(svgRef.current);
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    const xScale = scaleTime()
      .domain([new Date(stats.range.date.min), new Date(stats.range.date.max)])
      .range([0, width]);

    const yScale = scaleLinear()
      .domain([
        stats.range.value.min - stats.delta,
        stats.range.value.max + stats.delta,
      ])
      .range([height, 0]);

    const lineGenerator = line()
      .x((record, index) => xScale(new Date(record.date)))
      .y(record => yScale(record.value))
      .curve(curveCardinal);

    const lines = svg.select('#pf-linechart-lines');

    // render the line
    const lineColor = '#1d5d90';
    lines
      .selectAll(`.linechart-line-${1}`)
      .data([stats.prediction])
      .join('path')
      .attr('class', `linechart-line-${1}`)
      .attr('stroke', (record, index) => lineColor)
      .attr('stroke-width', '2px')
      .attr('fill', 'none')
      .attr('d', lineGenerator);

    // render dots
    const dotColor = '#1d5d90';
    lines
      .selectAll(`.linechart-dot-${1}`)
      .data(stats.prediction)
      .join('circle')
      .attr('class', `clickable linechart-dot-${1}`)
      .attr('stroke', dotColor)
      .attr('r', 2)
      //   .attr('r', (record, index) =>
      //     record.date >= selection[0] && record.date <= selection[1] ? 4 : 2
      //   )
      .attr(
        'fill',
        dotColor
        // record.date >= selection[0] && record.date <= selection[1]
        //   ? Common.brightenColor(entry.color, 2)
        //   : entry.color
      )
      .attr('cx', (record, index) => xScale(new Date(record.date)))
      .attr('cy', (record, index) => yScale(record.value))
      .on('mouseover', (event, { date, value }) => {
        select(event.target)
          .attr('r', 4)
          .attr('fill', ChromaHelper.brighten(dotColor, 2));

        svg
          .selectAll('.d3-tooltip-bg')
          .data([event])
          .join(enter => enter.append('rect').attr('y', yScale(value) - 120))
          .attr('class', 'd3-tooltip-bg')
          .attr('x', xScale(new Date(date)) - 80)
          .attr('text-anchor', 'middle')
          .attr('width', 165)
          .attr('height', '60px')
          .attr('fill', '#1A202C')
          .transition()
          .attr('y', yScale(value) - 70)
          .attr('fill-opacity', 0.5);

        svg
          .selectAll('.d3-tooltip-title')
          .data([event])
          .join(enter => enter.append('text').attr('y', yScale(value) - 110))
          .attr('class', 'd3-tooltip-title')
          .text(`${DateHelper.formatDate(new Date(date))}:`)
          .attr('font-family', "'Lato', sans-serif")
          .attr('x', xScale(new Date(date)))
          .attr('text-anchor', 'middle')
          .attr('width', 200)
          .attr('height', 30)
          .style('fill', 'white')
          .transition()
          .attr('y', yScale(value) - 50)
          .attr('opacity', 1);

        svg
          .selectAll('.d3-tooltip-text')
          .data([event])
          .join(enter => enter.append('text').attr('y', yScale(value) - 110))
          .attr('class', 'd3-tooltip-text')
          .text(`$ ${value.toFixed(6)}`)
          .attr('font-family', "'Lato', sans-serif")
          .attr('x', xScale(new Date(date)))
          .attr('text-anchor', 'middle')
          .attr('width', 200)
          .attr('height', 30)
          .style('fill', 'white')
          .transition()
          .attr('y', yScale(value) - 20)
          .attr('opacity', 1);
      })
      .on('mouseleave', (event, { date, value }) => {
        // if (date < selection[0] || date > selection[1])
        select(event.target).attr('r', 2).attr('fill', dotColor);
        svg.select('.d3-tooltip-bg').remove();
        svg.select('.d3-tooltip-title').remove();
        svg.select('.d3-tooltip-text').remove();
      });

    const xTicks = stats.prediction.length > 10 ? 16 : stats.prediction.length;
    // axes
    const xAxis = axisBottom(xScale)
      .ticks(xTicks)
      .tickFormat(DateHelper.d3Format);
    svg
      .select('.linechart-x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis)
      .selectAll('text')
      .attr('y', 10)
      .attr('x', -10)
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    const yAxis = axisLeft(yScale).ticks(10);
    svg.select('.linechart-y-axis').call(yAxis);

    const margin = {
      top: 100,
      left: 60,
    };

    // Add X axis label:
    svg
      .select('.linechart-x-axis-label')
      .join('text')
      .attr('class', 'linechart-x-axis-label')
      .attr('text-anchor', 'end')
      .attr('x', width)
      .attr('y', height + margin.top)
      .text('Tiempo (Días)');

    // Y axis label:
    svg
      .select('.linechart-y-axis-label')
      .join('text')
      .attr('class', 'linechart-y-axis-label')
      .attr('text-anchor', 'end')
      .attr('transform', 'rotate(-90)')
      .attr('y', -margin.left + 10)
      .attr('x', 0)
      .text(`${stats.variable} KW/día ($)`);
  }, [stats, dimensions]);

  return (
    <VStack bg="#FFFFFF" m={0} minH="100vh" flex="1" px="20">
      {stats ? (
        <Text
          fontSize="2xl"
          align="left"
          width="100%"
          py="4"
          color="#1d5d90"
          fontWeight="700"
        >
          Pron&oacute;stico:
        </Text>
      ) : null}
      <div id="pf-linechart-wrapper" ref={wrapperRef} className={styles.root}>
        {stats ? (
          <svg
            id="pf-linechart-container"
            ref={svgRef}
            className={styles.svg}
            style={{ backgroundSize: `${5}% ${5}%` }}
          >
            <g id="pf-linechart-info" className={styles.svg_container}>
              <g className="linechart-x-axis"></g>
              <text className="linechart-x-axis-label"></text>
              <g className="linechart-y-axis"></g>
              <text className="linechart-y-axis-label"></text>
              <g className="linechart-brush"></g>
            </g>
            <g id="pf-linechart-lines" className={styles.svg_container}>
              <g className="linechart-x-axis"></g>
              <text className="linechart-x-axis-label"></text>
              <g className="linechart-y-axis"></g>
              <text className="linechart-y-axis-label"></text>
              <g className="linechart-brush"></g>
            </g>
          </svg>
        ) : null}
      </div>
      {stats ? (
        <>
          <div className={styles.spacer} />
          <Text
            fontSize="xl"
            align="left"
            width="100%"
            p="4"
            my="1"
            borderRadius="4"
            bg="#f0f0f0"
            color="#1a202c"
            fontWeight="700"
          >
            {`MAPE:\t `}
            <span className={styles.stat_text}>
              {stats.stats.mape.toFixed(2)}%
            </span>
          </Text>
          <Text
            fontSize="xl"
            align="left"
            width="100%"
            p="4"
            my="1"
            borderRadius="4"
            bg="#f0f0f0"
            color="#1a202c"
            fontWeight="700"
          >
            {`SSE:\t `}
            <span className={styles.stat_text}>{stats.stats.sse}</span>
          </Text>
          <Text
            fontSize="xl"
            align="left"
            width="100%"
            p="4"
            my="1"
            borderRadius="4"
            bg="#f0f0f0"
            color="#1a202c"
            fontWeight="700"
          >
            {`MSE:\t `}
            <span className={styles.stat_text}>{stats.stats.mse}</span>
          </Text>
        </>
      ) : null}
    </VStack>
  );
};
