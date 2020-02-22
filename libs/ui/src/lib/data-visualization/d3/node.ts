/**
 * Simple component which draws a circle for each node wherever it is arranged by the simulation.
 */
import * as d3 from "d3";
import { drag } from "./drag";
import { simulation } from "./simulation";

export class AnimateEllipseNode {
    data: {nodes: [], links: []};
    svg: any;
    constructor(data, svg) {
        const { nodes } = data;
        this.data = data;
        this.svg = svg;

        

        this.node().call(drag(simulation));
    }
    animate() {
        return () => {
            this.node()
                .attr("cx", (d) => d.x)
                .attr("cy", (d) => d.y);

        };
    }
    nodeScale() {
        return d3.scaleLinear()
            .domain([0, d3.max(this.data.nodes.map((node) => node.influence))])
            .range([8, 20]);
    }
    node() {
        const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
        return this.svg
            .selectAll("circle")
            .data(this.data.nodes)
            .enter()
            .append("circle")
            .attr("r", (d) => this.nodeScale()(d.influence))
            .attr("stroke", "#ccc")
            .attr("stroke-width", 0.5)
            .style("fill", (d) => colorScale(d.zone));
    }
}

