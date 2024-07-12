// Set up the SVG canvas dimensions
const width = 800;
const height = 600;
const margin = { top: 50, right: 50, bottom: 50, left: 50 };

// Append SVG to the body
const svg = d3.select("#visualization")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMidYMid meet");

// Example dataset
const data = [
    { x: 50, y: 100, label: "A" },
    { x: 150, y: 200, label: "B" },
    { x: 250, y: 300, label: "C" },
    { x: 350, y: 400, label: "D" },
    { x: 450, y: 500, label: "E" }
];

// Parameters for state management
let currentScene = 0;

// Function to update the scene
function updateScene(scene) {
    svg.selectAll("*").remove();

    if (scene === 0) {
        // Scene 1: Overview
        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
            .attr("r", 20)
            .style("fill", "blue");

        svg.append("text")
            .attr("x", 50)
            .attr("y", 90)
            .text("Overview of the Data")
            .style("font-size", "16px")
            .style("fill", "black");

    } else if (scene === 1) {
        // Scene 2: Detailed View
        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
            .attr("r", 20)
            .style("fill", d => d.label === "C" ? "red" : "blue");

        svg.append("text")
            .attr("x", 250)
            .attr("y", 290)
            .text("Detailed view of point C")
            .attr("class", "annotation");

    } else if (scene === 2) {
        // Scene 3: Conclusion
        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
            .attr("r", 20)
            .style("fill", "blue");

        svg.append("text")
            .attr("x", 50)
            .attr("y", 90)
            .text("Conclusion")
            .style("font-size", "16px")
            .style("fill", "black");

        svg.selectAll("circle")
            .on("mouseover", function(event, d) {
                d3.select(this).style("fill", "orange");

                svg.append("text")
                    .attr("x", d.x + 10)
                    .attr("y", d.y - 10)
                    .text(`Label: ${d.label}`)
                    .attr("class", "annotation");
            })
            .on("mouseout", function() {
                d3.select(this).style("fill", "blue");
                svg.selectAll(".annotation").remove();
            });
    }
}

// Initial render
updateScene(currentScene);

// Function to go to the next scene
function nextScene() {
    currentScene = (currentScene + 1) % 3;
    updateScene(currentScene);
}

// Add a button for navigation
d3.select("body")
    .append("button")
    .text("Next Scene")
    .on("click", nextScene);
