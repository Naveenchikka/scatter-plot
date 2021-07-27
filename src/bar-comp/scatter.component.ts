import { Component, OnInit } from "@angular/core";
import * as d3 from 'd3';
import * as d3Selection from 'd3-selection';

@Component({
  selector: 'app-scatter',
  templateUrl: './scatter.component.html',
  styleUrls: [ './scatter.component.css' ]
})
export class ScatterComponent implements OnInit {
  private data = [
    {"Framework": "Vue", "Stars": "4", "Released": "5"},
    {"Framework": "React", "Stars": "15", "Released": "12"},
    {"Framework": "Angular", "Stars": "28", "Released": "18"},
    {"Framework": "Backbone", "Stars": "49", "Released": "25"},
    {"Framework": "Ember", "Stars": "58", "Released": "29"},
  ];
  private svg;
  private margin = 50;
  private width = 600 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  ngOnInit(): void {
    this.createSvg();
    this.drawPlot();
}

  private createSvg(): void {
    this.svg = d3.select("figure#scatter")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
}

private drawPlot(): void {
  // Add X axis
  const x = d3.scaleLinear()
  .domain([0, 30])
  .range([ 0, this.width ]);

  // this.svg.append("g")
  // .attr("transform", "translate(0," + this.height + ")")
  // .call(d3.axisBottom(x).tickFormat(d3.format("d")).ticks(6));

  this.svg.append("g").attr("transform", "translate(0," + this.height + ")")
  .call(d3.axisBottom(x).tickSize(-this.height, 0, 0)
  .tickFormat(d3.format("d")).tickPadding(15).ticks(6));
 
  this.svg.style('color','#8C8C8C')
  .style('stroke-opacity', 0.6)

  // Add Y axis
  const y = d3.scaleLinear()
  .domain([0, 60])
  .range([ this.height, 0]);
  this.svg.append("g")
  .call(d3.axisLeft(y).tickSize(-this.width, 0, 0)
  .tickFormat(d3.format("d")).tickPadding(15).ticks(5));
  
  this.svg.select('rect .background')
       .append('rect')
       .classed('background', true)
       .attr('y', 30)
       .attr('x', 10)
       .attr('height', 150)
       .attr('width', 250)
       .attr('fill', 'red');

  // Add dots
  const dots = this.svg.append('g');
  dots.selectAll("dot")
  .data(this.data)
  .enter()
  .append("circle")
  .attr("cx", d => x(d.Released))
  .attr("cy", d => y(d.Stars))
  .attr("r", 7)
  .style("opacity", .5)
  .style("fill", "#69b3a2");

  // Add labels
  dots.selectAll("text")
  .data(this.data)
  .enter()
  .append("text")
  .text(d => d.Framework)
  .attr("x", d => x(d.Released))
  .attr("y", d => y(d.Stars))

  this.svg.
  attr("fill", "rgba(66,139,202, 0.2)");
}
}