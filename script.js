const container = document.getElementById("network");


let savedPeople =
  JSON.parse(localStorage.getItem("people")) || people;

let savedRelationships =
  JSON.parse(localStorage.getItem("relationships")) || relationships;


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
    nodes,
    edges
  },
  {
    physics:true
  }
);



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



function saveData(){

  localStorage.setItem(
    "people",
    JSON.stringify(savedPeople)
  );

  localStorage.setItem(
    "relationships",
    JSON.stringify(
      edges.get()
    )
  );
}
