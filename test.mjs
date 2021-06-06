function printConversation(flatTree, userAnswers) {
    // Write your solution below
    // Some example code is provided to show you how to access our data structures, feel free to modify/delete
    // let currentTalker
    // let current indent
    let currentAnswer = 0;
    let currentIdent = null;
    // console.log(`FlatTree are ${JSON.stringify(flatTree)}`)
    // console.log(`Answers ${JSON.stringify(userAnswers)}`);
    let subTree = {

    }
    let printAll = false;
    flatTree.forEach((treeItem, i)=>{

    })
    for (let i = 0; i < flatTree.length; i++) {
        if(printAll) console.log(` i = ${i}`);
        const row = flatTree[i];
        //console.log(`Indentation is ${row.inputObject.indentation}`)
        if(printAll){
            console.log(`the row is ${row.inputObject.type} ${row.inputObject.type === GotoType}`);
        }
        if(row.inputObject.label){
            // if(printAll) console.log(`Found a label! ${row.inputObject.\} ${i}`);
            subTree[row.inputObject.label] = i;
        }
        if(currentIdent != null && row.indentation > currentIdent){
            // console.log(`the row is ${JSON.stringify(row)}`);
            if(printAll) console.log(`Skipping ${currentIdent} ${row.indentation}`)
            continue;
        }
        if (row.inputObject.type === OutputType) {
            console.log(HopperMessagePrefix + row.inputObject.text);
        } else if (row.inputObject.type === AnswerType) {
            // console.log(JSON.stringify(row.inputObject));
            const ans = userAnswers[currentAnswer];
            if(row.inputObject.text === ans){
                // console.log(`Answer is correct ${row.inputObject.text} ${ans}`);
                console.log(UserMessagePrefix + row.inputObject.text);
                currentAnswer++;
                currentIdent = null;
                printAll = true;
            } else{
                // console.log(`Answer not correct ${row.inputObject.text} ${ans} setting indent to ${row.indentation}`);
                currentIdent = row.indentation;
            }

        } else if (row.inputObject.type === ConclusionType) {
            // console.log(JSON.stringify(row.inputObject));
            console.log(ConclusionMessagePrefix + row.inputObject.text);
            break;
        } else
        if(row.inputObject.type === GotoType){
            const location = subTree[row.inputObject.label];
            // console.log(`The label location is ${location}`);
            if(location == null){
                console.log("Location not found for goto")
            } else{console.log(`Going to location ${location} ${currentIdent}`);
                printAll = true;
                i = location;
            }

        }
    }
}
// Find set of strings in collection that match the provided string

/*
function calcMaxPop(arr){
    const pops = {
        years:[]
    };
    arr.forEach((person)=>{
        for(let i = person[0]; i < person[1]; i++){
            if(!pops[i]){
                pops[i]= {
                    year: i,
                    population: 1,
                }
                pops.years.push(i);
            } else{
                const pop = pops[i];
                pop.population = pop.population+1
            }
        }
    });
    return pops;
}
const result = calcMaxPop([[0,2],[1,3],[3,4]]);
const largest = result.years.reduce((acc, res)=>{
    const item = result[res];
    return(acc == null || acc.population < item.population) ? item: acc;
}, null)
console.log(`Test result is ${JSON.stringify(result)}\n Largets pop is ${largest.population}`);
 */

class ChangeArray {
    constructor(arr) {
        this.arr = arr;
    }

    hashPermutations = () => {
        const output = [];

        const run = (n, curArr) => {
            if (n === 1) {
                output.push([...curArr]);
                return;
            }
            run(n - 1, curArr);
            for (let i = 0; i < n - 1; i++) {
                if (n % 2 === 0) {
                    ChangeArray.swapElements(curArr, i, n - 1);
                } else {
                    ChangeArray.swapElements(curArr, 0, n - 1);
                }
            }
            run(n - 1, curArr);
        }
        run(this.arr.length, [...this.arr]);
        return output;
    }
    static swapElements = (arr, left, right) => {
        let tmp = arr[left]
        arr[left] = right;
        arr[right] = tmp;
    }

    static partition(items, left, right) {
        let pivot = items[Math.floor((right + left) / 2)], //middle element
            i = left, //left pointer
            j = right; //right pointer
        while (i <= j) {
            while (items[i] < pivot) {
                i++;
            }
            while (items[j] > pivot) {
                j--;
            }
            if (i <= j) {
                ChangeArray.swapElements(items, i, j); //swap two elements
                i++;
                j--;
            }
        }
        return i;
    }

    static quickSort(items, left, right) {
        let index;
        if (items.length > 1) {
            index = ChangeArray.partition(items, left, right); //index returned from partition
            if (left < index - 1) { //more elements on the left side of the pivot
                ChangeArray.quickSort(items, left, index - 1);
            }
            if (index < right) { //more elements on the right side of the pivot
                ChangeArray.quickSort(items, index, right);
            }
        }
        return items;
    }

    quickSort() {
        return ChangeArray.quickSort(
            [...this.arr],
            0,
            this.arr.length - 1
        );
    }
}

class ChangeGraph {
    constructor(graph) {
        this.graph = Object.assign(graph);
    }
    static findLowestWeightNode(weights, processed){
        const knownNodes = Object.keys(weights)
        return knownNodes.reduce((lowest, node) => {
            if (lowest === null && !processed.includes(node)) {
                lowest = node;
            }
            if (weights[node] < weights[lowest] && !processed.includes(node)) {
                lowest = node;
            }
            return lowest;
        }, null)
    };
    dijkstra() {
        const weights = Object.assign(
            {finish: Infinity},
            this.graph.start
        );

        const parents = {finish: null};
        for (let child in this.graph.start) {
            parents[child] = 'start';
        }
        const processed = [];
        let node = ChangeGraph.findLowestWeightNode(weights, processed);
        while (node) {
            let weight = weights[node];//Get all the neighbors of current node
            let children = graph[node]; //Loop through each of the children, and calculate the weight to reach that child node. We'll update the weight of that node in the weights object if it is lowest or the ONLY weight availablefor (let n in children) {
            for (let n in children) {
                let newWeight = weight + children[n];
                if (!weights[n] || weights[n] > newWeight) {
                    weights[n] = newWeight;
                    parents[n] = node;
                }
            }
            processed.push(node)
            node = ChangeGraph.findLowestWeightNode(weights, processed);
        }
        let optimalPath = ['finish'];
        let parent = parents.finish;
        while (parent) {
            optimalPath.unshift(parent);
            parent = parents[parent]; // add parent to start of path array
        }

        const results = {
            distance: weights.finish,
            path: optimalPath
        };

        return results;

    }
}

const graph = {
    start: {A: 5, B: 2},
    A: {C: 4, D: 2},
    B: {A: 8, D: 7},
    C: {D: 6, finish: 3},
    D: {finish: 1},
    finish: {}
};

const x = new ChangeArray([4, 1, 2, 3]);
const y = new ChangeGraph(graph);

console.log(`The result is ${JSON.stringify(x.hashPermutations())}`);
console.log(`The result of the sort is ${JSON.stringify(x.quickSort())}`);
console.log(`The shortest path is ${JSON.stringify(y.dijkstra())}`);