const tooltip = document.getElementById('tooltip');

fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json').then(res => res.json()).
then(res => {
  const { baseTemperature, monthlyVariance } = res;

  bday(monthlyVariance.map(d => ({
    ...d,
    temp: baseTemperature - d.variance })));

});
const colors = ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#f7f7f7", "#d1e5f0", "#92c5de", "#4393c3", "#2166ac", "#053061"];

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


function bday(data) {
  const width = 1000;
  const height = 500;
  const padding = 60;
  const svg = d3.select('#container').append("svg").
  attr('width', width).
  attr('height', height);

  const cellHeight = (height - 2 * padding) / 12;

  const cellWidth = width / Math.floor(data.length / 12);

  const monthvar = data;
  const tempScale = d3.scaleLinear().
  domain([
  d3.min(data, d => d.temp),
  d3.max(data, d => d.temp)]).

  range([0, 10]);

  /*
                  Object {
                  month: 1,
                  variance: -1.366,
                  year: 1753
                  }
                  */
  //.domain([d3.min(monthvar, d =>d.year-1),d3.max(monthvar,d=> d.year +1)])
  const xScale = d3.scaleTime().
  domain([d3.min(monthvar, d => d.year), d3.max(monthvar, d => d.year)]).
  range([padding, width - padding]);

  const yScale = d3.scaleLinear().
  domain([0, 11]).
  range([padding, height - padding]);

  //actual values start here 

  svg.selectAll('rect').
  data(data).
  enter().
  append('rect').
  attr('class', 'cell').
  attr('data-month', d => d.month - 1).
  attr('data-year', d => d.year).
  attr('data-temp', d => d.temp).
  attr('fill', d => colors[Math.floor(tempScale(d.temp))]).
  attr('x', d => xScale(d.year)).
  attr('y', d => yScale(d.month - 1) - cellHeight).
  attr('width', cellWidth).
  attr('height', cellHeight).
  on('mouseenter', function (d) {
    svg.append('text').
    attr('class', 'buah').
    attr('id', 'tooltip').
    attr("data-year", d.year).
    attr('x', d3.event.pageX).
    attr('y', d3.event.pageY - 2 * padding).
    text('year: ' + d.year + ' temperature: ' + d.temp);
  }).
  on('mouseout', function (d) {
    svg.selectAll('.buah').remove();
  });
  //actual values end here 
  const xAxis = d3.axisBottom(xScale).tickFormat(d3.format('d'));
  const yAxis = d3.axisLeft(yScale).tickFormat(month => {
    const date = new Date(0);
    date.setMonth(month);
    return d3.timeFormat("%B")(date);
  });

  svg.append('g').
  attr('id', 'x-axis').
  attr('transform', `translate(0, ${height - padding})`).
  call(xAxis);
  svg.append('g').
  attr('id', 'y-axis').

  call(yAxis).
  attr('transform', `translate(${padding}, ${-cellHeight})`);

  const legend = d3.select('body').append('svg').
  attr('id', "legend").
  attr('width', 120).
  attr('height', 40).
  selectAll('rect').

  data(colors).
  enter().
  append('rect').
  attr('x', (d, i) => i * 120 / colors.length).
  attr('width', 120 / colors.length).
  attr("height", 40).
  attr('fill', (d, i) => d);

}