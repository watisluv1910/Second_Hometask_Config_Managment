//  function to paint a graph
function paintGraph(value) {

    var dots = value.split('\n');
    var graphviz = d3.select("#graph")
        .graphviz()
        .logEvents(true)
        .on("initEnd", render);

    function render() {
        var dot = dots.join('');
        graphviz
            .renderDot(dot)
            .on("end", function () {
                render();
            });
    }
}