async function run() {
  const eduResp = await fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json');
  const educations = await eduResp.json();

  const countiesResp = await fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json');
  const counties = await countiesResp.json();

  const width = 960;
  const height = 600;

  const path = d3.geoPath();

  const data = topojson.feature(counties, counties.objects.counties).features;

  const minEdu = d3.min(educations, edu => edu.bachelorsOrHigher);
  const maxEdu = d3.max(educations, edu => edu.bachelorsOrHigher);
  const step = (maxEdu - minEdu) / 8;


  const colorsScale = d3.scaleThreshold().
  domain(d3.range(minEdu, maxEdu, step)).
  range(d3.schemeReds[9]);

  const colors = [];

  for (let i = minEdu; i <= maxEdu; i += step) {
    colors.push(i);
  }

  const svg = d3.select('#container').append('svg').
  attr('width', width).
  attr('height', height);

  svg.append('g').
  selectAll('path').
  data(data).
  enter().
  append('path').
  attr('d', path).
  attr('fill', d => colorsScale(educations.find(edu => edu.fips === d.id).bachelorsOrHigher)).
  attr('class', 'county').
  attr('data-fips', d => d.id).
  attr('data-education', d => educations.find(edu => edu.fips === d.id).bachelorsOrHigher).
  on('mouseover', (d, i) =>
  {
    const { coordinates } = d.geometry;
    const education = educations.find(edu => edu.fips === d.id);
    const [x, y] = coordinates[0][0];
    svg.append('text').
    attr("id", "tooltip").
    attr('class', 'buah').
    attr('x', x - 50).
    attr('y', y).
    attr('data-education', education.bachelorsOrHigher).
    text(`${education.area_name} ${education.state} ${education.bachelorsOrHigher}`);
  }).
  on('mouseout', d => {
    svg.selectAll('.buah').remove();
  });

  const legendWidth = 200;
  const legendHeight = 30;

  const legendRectWidth = legendWidth / colors.length;
  const legend = d3.select('#container').
  append('svg').
  attr('id', 'legend').
  attr('class', 'legend').
  attr('width', legendWidth).
  attr('height', legendHeight);

  legend.selectAll('rect').
  data(colors).
  enter().
  append('rect').
  attr('x', (_, i) => i * legendRectWidth).
  attr('y', 0).
  attr('width', legendRectWidth).
  attr('height', legendHeight).
  attr('fill', c => colorsScale(c));
}
run();