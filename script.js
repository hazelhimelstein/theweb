const container = document.getElementById("network");


let savedPeople = [];

let savedRelationships = [];

const nodes = new vis.DataSet(savedPeople);

const edges = new vis.DataSet(
  savedRelationships.map(r => ({
    ...r,
    color: {
      color: r.color
    }
  }))
);


const network = new vis.Network(
  container,
  {
    nodes: nodes,
    edges: edges
  },
  {
    physics:true
  }
);

edges.add({
  from: 1,
  to: 2,
  label: "test",
  color: {
    color: "red"
  }
});

function getColor(type){

  if(type === "roommates"){
    return "green";
  }

  if(type === "hookup"){
    return "pink";
  }

  if(type === "hookup+"){
    return "purple";
  }

  if(type === "relationship"){
    return "red";
  }

  return "black";
}


function addRelationship(){

  const p1 =
    document.getElementById("person1").value;

  const p2 =
    document.getElementById("person2").value;

  const type =
    document.getElementById("type").value;


  let id1 = findOrCreatePerson(p1);
  let id2 = findOrCreatePerson(p2);


  let style = {
    roommates:{
      color:"green",
      dashes:false
    },

    hookup:{
      color:"pink",
      dashes:true
    },

    "hookup+":{
      color:"purple",
      dashes:true
    },

    relationship:{
      color:"red",
      dashes:false
    }
  };


  edges.add({
    from:id1,
    to:id2,
    label:type,
    color:{
      color:style[type].color
    },
    dashes:style[type].dashes
  });


  saveData();
}



function findOrCreatePerson(name){

  let existing =
    savedPeople.find(
      p => p.label === name
    );


  if(existing){
    return existing.id;
  }


  let newPerson = {
    id: Date.now(),
    label:name
  };


  savedPeople.push(newPerson);

  nodes.add(newPerson);

  return newPerson.id;
}

function downloadImage(){

  htmlToImage
    .toPng(document.getElementById("network"))
    .then(function(dataUrl){

      const link = document.createElement("a");

      link.download = "relationship-map.png";

      link.href = dataUrl;

      link.click();

    });

}
