import yargs from "yargs";
import parseArgs from 'minimist';


const param = (p) => {
    const index = process.argv.indexOf(p)
    console.log(index);
}

param('Marcos')

/* ------------------------- ARGUMENTOS DE ENTRRADA ------------------------- */
// console.log(process.argv);
// console.log(process.argv.slice(0, 2));

/* ---------------------------------- YARGS --------------------------------- */
const info = yargs(process.argv.slice(2))
    .alias({ p: 'port' })
    .default({ p: 8080 })
    .argv

// console.log(info);


// console.log(parseArgs(['1', '2', '3', '4']));


// console.log(process.argv);


let { cant } = req.query
const childProcess = fork('./utils/randomNums.js')

cant ? childProcess.send({ order: 'start', cant }) : childProcess.send({ order: 'start', cant: 100000000 });
childProcess.on('message', message => res.json({ message }))

function randomNums(cant) {
    let arrayNums = []

    for (let i = 0; i < cant; i++) {
        const randNum =  Math.round(Math.random() * 1000)
        const findArray = arrayNums.find(element => element.num == randNum);

        if (findArray != undefined) {
            findArray.i++
        } else {
            arrayNums.push({ num: randNum, i: 1 })
        }
    }
    return arrayNums;
}

process.on('message', message => {
    const { order, cant } = message

    if (order == 'start') {
        const response = randomNums(cant);
        process.send(response)
        process.exit()
    }
})