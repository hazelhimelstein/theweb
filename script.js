const container = document.getElementById("network");

const nodes = new vis.DataSet(people);

const edges = new vis.DataSet(
  relationships.map(r => ({
    ...r,
    color: { color: r.color }
  }))
);

const network = new vis.Network(
  container,
  { nodes, edges },
  {
    physics: true,
    edges: {
      font: {
        align: "middle"
      }
    }
  }
);

document
  .getElementById("search")
  .addEventListener("input", e => {

    const name = e.target.value.toLowerCase();

    const match = people.find(
      p => p.label.toLowerCase() === name
    );

    if (!match) return;

    network.focus(match.id, {
      scale: 1.5,
      animation: true
    });
  });
