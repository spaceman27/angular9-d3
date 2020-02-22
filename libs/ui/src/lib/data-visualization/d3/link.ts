/**
 * Component of force directed graph that vizualises links between Nodes.
 */

import * as d3 from "d3";
export class AnimateLink {
    data = {nodes: [], links: []};
    svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;

    link() {
        const linkDashScale = d3
            .scaleOrdinal()
            .domain(["0", "2", "3"])
            .range(["4 2", "2 2", null]);
        const linkWidthScale = d3
            .scaleLinear()
            .domain([0, d3.max(this.data.links.map((link) => link.weight))])
            .range([0.5, 1.5]);
        return this.svg
            .selectAll("path.link")
            .data(this.data.links)
            .enter()
            .append("path")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .attr("stroke-dasharray", (d) => linkDashScale(d.weight))
            .attr("stroke-width", (d) => linkWidthScale(d.weight))
            .attr("marker-mid", (d) => {

                /**
                 * Define a marker to indicate what kind of line it is.
                 * Currently defined: arrow for subordinate / supervisory relationship.
                 */

                switch (d.type) {

                    case "SUPERVISORY":
                        return "url(#markerArrow)";

                    default:
                        return "none";

                }

            })
            .attr("fill", "none");
    }
    animate() {
        const lineGenerator = d3.line()
            .curve(d3.curveCardinal);

        return () => {

            this.link().attr("d", (d) => {

                const mid : [number, number]= [
                    (d.source.x + d.target.x) / 2,
                    (d.source.y + d.target.y) / 2
                ];


                /**
                 * If two lines overlap with each other, curve one of the lines.
                 */

                if (d.overlap > 0) {

                    const index = d.overlap;

                    // console.log("Index?", index);
                    // const index = d.overlap.filter((ol) => ol.weight > d.weight).length;

                    const distance = Math.sqrt(
                        Math.pow(d.target.x - d.source.x, 2) +
                        Math.pow(d.target.y - d.source.y, 2)
                    );

                    /**
                     * The math below finds a point just off the center of the line.
                     */

                    const slopeX = (d.target.x - d.source.x) / distance;
                    const slopeY = (d.target.y - d.source.y) / distance;

                    const curveSharpness = 3.5 * index;
                    mid[0] += curveSharpness * slopeY;
                    mid[1] -= curveSharpness * slopeX;

                }

                return lineGenerator([
                    [d.source.x, d.source.y],
                    mid,
                    [d.target.x, d.target.y]
                ]);

            });

        };
    }
    constructor(data, svg) {
        this.data = data;
        this.svg = svg;
    }
}