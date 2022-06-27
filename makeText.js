/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const process = require('process');
const markovMachine = require("./markov");


function getInputText(path) {
    // hard-coding the path for now; should be a variable using process.argv[i]
    path = 'eggs.txt'
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.log(err, "Error reading your file.");
            process.exit(1);
        }
        else { 
            let mm = new markovMachine.MarkovMachine(data);
            data = mm.makeText();           
            return runMM(data)
        }
    })
}


function runMM(data) {
    // hard-coding the path for now; should be a variable using process.argv[i]
    path = 'newText.txt'
    fs.writeFile(path, data, 'utf8', function(err) {
        if (err) {
            console.log(err, "Error writing your file.")
            process.exit(1);
        }
        else {
           console.log("Your file is ready!") 
        }
    })
}

getInputText();

////////////////////////////////////////////////////////////////////////////////////////
// So far no accounting for a url as the text source; this is a start at attempting this.

// async function getWebData(path) {
//     try {
//         let res = await axios.get(path);
//         data = res.data;
//         return data;
//     }
//     catch (err) {
//         console.log(err);
//         process.exit(1);
//     }
// }