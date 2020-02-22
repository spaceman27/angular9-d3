import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Person } from '@secureworks-homeassignment/shared/core';
import * as d3 from 'd3';
// import { AnimateLink } from "./d3/link";
// import { AnimateLabel } from "./d3/label";
// import { AnimateImage } from "./d3/image";
// import { AnimateHovercard } from "./d3/hovercard";
// import { AnimateEllipseNode } from "./d3/node";
// import { simulation } from "./d3/simulation";



@Component({
  selector: 'secureworks-homeassignment-data-visualization',
  templateUrl: './data-visualization.component.html',
  styleUrls: ['./data-visualization.component.scss']
})
export class DataVisualizationComponent implements OnInit, AfterViewInit {
  @ViewChild('mutualFriend') d3Container: ElementRef;
  @Input() lst: any[]; // Person[];

  constructor() { }

  ngOnInit(): void {
    console.log("d3 data: ", this.lst);
  }
  ngAfterViewInit() {

  }
  load_graph() {
    // Replace old graphs
    this.d3Container.nativeElement.innerHTML = "";
    const width = 700, height = 400;

    var svg = d3.select(this.d3Container.nativeElement).append("svg")
      .attr("width", width)
      .attr("height", height);

      // mock data
      const data = {
        "nodes": [
            { "index":1, "name": "Brent" },
            { "index":2, "name": "David" },
            { "index":3, "name": "Matthew" },
            { "index":4, "name": "Brittany" },
            { "index":5, "name": "Collin" },
            { "index":6, "name": "Kim" },
            { "index":7, "name": "Shreya" },
            { "index":8, "name": "Tristan" },
            { "index":9, "name": "Michael" },
            { "index":10, "name": "Maggie" },
            { "index":11, "name": "Travis" },
            { "index":12, "name": "Troy" }
          ],
        "links": [{"source":"Brent","target":"David","type":"line"},{"source":"Brent","target":"Matthew","type":"line"},{"source":"Brittany","target":"David","type":"line"},{"source":"Collin","target":"Kim","type":"line"},{"source":"Collin","target":"Shreya","type":"line"},{"source":"David","target":"Brent","type":"line"},{"source":"David","target":"Brittany","type":"bold"},{"source":"David","target":"Tristan","type":"line"},{"source":"David","target":"Matthew","type":"line"},{"source":"David","target":"Michael","type":"line"},{"source":"David","target":"Maggie","type":"line"},{"source":"Kim","target":"Collin","type":"line"},{"source":"Kim","target":"Shreya","type":"line"},{"source":"Luke","target":"Matthew","type":"line"},{"source":"Maggie","target":"David","type":"line"},{"source":"Maggie","target":"Troy","type":"line"},{"source":"Maggie","target":"Matthew","type":"line"},{"source":"Matthew","target":"Brent","type":"line"},{"source":"Matthew","target":"David","type":"line"},{"source":"Matthew","target":"Luke","type":"line"},{"source":"Matthew","target":"Maggie","type":"line"},{"source":"Matthew","target":"Tristan","type":"line"},{"source":"Matthew","target":"Michael","type":"line"},{"source":"Michael","target":"David","type":"line"},{"source":"Michael","target":"Matthew","type":"line"},{"source":"Sarah","target":"Shreya","type":"line"},{"source":"Shreya","target":"Collin","type":"line"},{"source":"Shreya","target":"Kim","type":"line"},{"source":"Shreya","target":"Sarah","type":"line"},{"source":"Travis","target":"Troy","type":"bold"},{"source":"Tristan","target":"David","type":"bold"},{"source":"Tristan","target":"Matthew","type":"line"},{"source":"Tristan","target":"Troy","type":"line"},{"source":"Troy","target":"Maggie","type":"line"},{"source":"Troy","target":"Travis","type":"line"},{"source":"Troy","target":"Tristan","type":"bold"}]
    };
      // simulation.on("tick", () => {
      //   new AnimateEllipseNode(data, svg);
      //   new AnimateLink(data, svg);
      //   new AnimateHovercard(svg);
      //   new AnimateLabel(data, svg);
      //   new AnimateImage(data, svg);
      // });

    // var force = d3.forceSimulation(nodes)
    //   .force('links', d3.forceLink(links)
    //           .distance(300))
    //   // .force('size', )
    //   .force('charge', d3.forceManyBody().strength(-300))
    //   .on("tick", tick)



    // // Per-type markers, as they don't inherit styles.
    // svg.append("defs").selectAll("marker")
    //   .data(["line", "bold", "resolved"])
    //   .enter().append("marker")
    //   .attr("id", function (d) { return d; })
    //   .attr("viewBox", "0 -5 10 10")
    //   .attr("refX", 15)
    //   .attr("refY", -1.5)
    //   .attr("markerWidth", 6)
    //   .attr("markerHeight", 6)
    //   .attr("orient", "auto")
    //   .append("path")
    //   .attr("d", "M0,-5L10,0L0,5");

    // var path = svg.append("g").selectAll("path")
    //   .data(nodes)
    //   .enter().append("path")


    // var circle = svg.append("g").selectAll("circle")
    //   .data(force.nodes())
    //   .enter().append("circle")
    //   .attr("r", 6)


    // var text = svg.append("g").selectAll("text")
    //   .data(nodes)
    //   .enter().append("text")
    //   .attr("x", 8)
    //   .attr("y", ".31em")
    //   .text(function (d) { 
    //     return d.name; 
    //   });

    // // Use elliptical arc path segments to doubly-encode directionality.
    // function tick() {
    //   path.attr("d", linkArc);
    //   circle.attr("transform", transform);
    //   text.attr("transform", transform);
    // }

    // function linkArc(d) {
    //   var dx = d.target.x - d.source.x,
    //     dy = d.target.y - d.source.y,
    //     dr = Math.sqrt(dx * dx + dy * dy);
    //   return "M" + d.source.x + "," + d.source.y + "L" + d.target.x + "," + d.target.y;
    // }

    // function transform(d) {
    //   return "translate(" + d.x + "," + d.y + ")";
    // }
  }
}
