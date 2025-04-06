// Example: Creating a custom bar chart using D3.js

d3.json('data.json').then(function(data) {
    // Set dimensions
    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
  
    // Create SVG container
    const svg = d3.select('#custom-chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height);
  
    // Set scales
    const x = d3.scaleBand()
      .domain(data.map(d => d.workout_type))
      .range([margin.left, width - margin.right])
      .padding(0.1);
  
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.calories_burned)])
      .nice()
      .range([height - margin.bottom, margin.top]);
  
    // Add bars to the chart
    svg.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.workout_type))
      .attr('y', d => y(d.calories_burned))
      .attr('width', x.bandwidth())
      .attr('height', d => height - margin.bottom - y(d.calories_burned))
      .attr('fill', 'steelblue');
  
    // Add x-axis
    svg.append('g')
      .selectAll('.tick')
      .data(data)
      .enter()
      .append('text')
      .attr('x', d => x(d.workout_type) + x.bandwidth() / 2)
      .attr('y', height - margin.bottom + 5)
      .attr('text-anchor', 'middle')
      .text(d => d.workout_type)
      .style('font-size', '12px');
  
    // Add y-axis
    svg.append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y));
  
    // Add chart title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', margin.top)
      .attr('text-anchor', 'middle')
      .style('font-size', '18px')
      .text('Calories Burned by Workout Type');
  });
  