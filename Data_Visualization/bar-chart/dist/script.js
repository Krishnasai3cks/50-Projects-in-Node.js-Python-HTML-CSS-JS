// const tooltip = document.getElementById('tooltip');
fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json').
then(res => res.json()).
then(res => {
  const { data } = res;
  birthday(data.map(d => [d[0], d[1]]));
});

function birthday(dataset) {
  const w = 800;
  const h = 500;
  const padding = 60;
  const barWidth = w / dataset.length;
  console.log(barWidth);
  const xScale = d3.scaleTime().
  domain([d3.min(dataset, d => new Date(d[0])), d3.max(dataset, d => new Date(d[0]))]).
  range([padding, w - padding]);

  const yScale = d3.scaleLinear().
  domain([0, d3.max(dataset, d => d[1])]).
  range([h - padding, padding]);

  const svg = d3.select("#container").
  append("svg").
  attr("width", w).
  attr("height", h);


  svg.selectAll("rect").
  data(dataset).
  enter().
  append('rect').
  attr("class", 'bar').
  attr("data-date", d => d[0]).
  attr("data-gdp", d => d[1]).
  attr('x', d => xScale(new Date(d[0]))).
  attr('y', d => yScale(d[1])).
  attr('width', barWidth).
  attr('height', d => h - yScale(d[1]) - padding).
  on("mouseenter", (d, i) => {
    svg.append('text').
    attr('class', 'buah').
    attr('id', 'tooltip').
    attr('x', d3.event.pageX - 70).
    attr('y', d3.event.pageY - padding).
    attr("data-date", d[0]).
    text(d[0] + 'GDP: ' + d[1]);
  }).
  on('mouseout', function (d) {
    svg.selectAll('.buah').remove();
  });
  // .on("mouseover", (d, i) => {
  //     tooltip.transition().duration(200).style("opacity", 0.9);
  //     tooltip
  //       .html(d[0] + 'GDP: '+d[1])
  //       .attr("data-date", d[0])
  //       .style("transform", "translate(200px, 200px)")
  //       .style("left", d3.event.pageX + 20 + "px")
  //       .style("top", d3.event.pageY + 20 + "px");
  //   console.log(tooltip);
  //   })
  //   .on("mouseout", (d, i) => {
  //     tooltip.transition().duration(200).style("opacity", 0);
  //   });
  //   .on('mouseenter', (d, i) => {

  //       tooltip.classList.add('toolbar');
  //       tooltip.style.left = i * barWidth + padding * 2 + 'px';
  //       tooltip.style.top = h - padding * 4 + 'px';
  //       tooltip.setAttribute('data-date', d[0])
  //       console.log(tooltip);
  //       tooltip.innerHTML = `
  //         <small>${d[0]}</small>
  //         $${d[1]} billions
  //       `;
  //   }).on('mouseout', () => {
  //      tooltip.classList.remove('toolbar');
  //     console.log(tooltip);
  //   });
  //    .on('mouseover', (d, index) => {
  //       tooltip.style('opacity', .9)
  //       .attr('data-date', d[0])
  //       .style('left', d3.event.pageX + 'px')
  //       .style('top', d3.event.pageY + 'px')
  //       .html(d[0])
  //     })
  //     .on('mouseout', d => {
  //       tooltip.style('opacity', 0);
  //     });

  //

  //   .on('mouseover',(d,i) =>{
  //      tooltip.classList.add("toolbar");
  //      tooltip.style.left = i * barWidth + padding * 2 + 'px';
  //   tooltip.style.top = h - padding * 4 + 'px';
  //      tooltip.setAttribute('data-date',d[0]);
  //       tooltip.innerHTML = `${d[0]} ${d[1]}`;
  //     console.log(tooltip);
  //      })
  //   .on('mouseout',() =>{
  //   tooltip.classList.remove("toolbar")
  //   console.log(tooltip);
  // })



  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);
  svg.append("g").
  attr('id', 'x-axis').
  attr('transform', `translate(0, ${h - padding})`).
  call(xAxis);
  svg.append("g").
  attr('id', 'y-axis').
  attr('transform', `translate(${padding}, 0)`).
  call(yAxis);
}