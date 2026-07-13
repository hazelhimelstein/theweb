const container =
    document.getElementById("network");


// empty map

let people = [];


// create nodes and lines

const nodes =
    new vis.DataSet([]);


const edges =
    new vis.DataSet([]);


// create graph

const network =
    new vis.Network(

        container,

        {
            nodes: nodes,
            edges: edges
        },

        {

            physics: {

                enabled: true

            },

            edges: {

                font: {

                    align: "middle"

                }

            }

        }

    );



// colors

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



// add relationship

function addRelationship(){


    const name1 =
        document.getElementById("person1").value.trim();


    const name2 =
        document.getElementById("person2").value.trim();


    const type =
        document.getElementById("type").value;



    if(!name1 || !name2){

        alert("Enter two names");

        return;

    }



    const id1 =
        findOrCreatePerson(name1);


    const id2 =
        findOrCreatePerson(name2);



    edges.add({

        from: id1,

        to: id2,

        label: type,

        color: {

            color: getColor(type)

        },

        width: 3,


        dashes:

            type === "hookup" ||
            type === "hookup+"


    });



    // clear inputs

    document.getElementById("person1").value = "";

    document.getElementById("person2").value = "";


}



// create person if new

function findOrCreatePerson(name){



    const existing =

        people.find(

            person =>

            person.label.toLowerCase() ===

            name.toLowerCase()

        );



    if(existing){

        return existing.id;

    }



    const newPerson = {


        id: Date.now(),


        label: name


    };



    people.push(newPerson);


    nodes.add(newPerson);



    return newPerson.id;


}



// delete everything

function clearMap(){


    nodes.clear();

    edges.clear();

    people = [];


}



// save image

function downloadImage(){


    htmlToImage

        .toPng(container)

        .then(function(dataUrl){


            const link =
                document.createElement("a");


            link.download =
                "relationship-map.png";


            link.href =
                dataUrl;


            link.click();


        });


}

}
