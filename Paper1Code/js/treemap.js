class Treemap{

    constructor(givenDate, givenIP, givenCountry){
        this.givenDate = givenDate
        this.givenIP = givenIP
        this.givenCountry = givenCountry
    }

    buildTreeMap(){
        // console.log(CrossReferenceIPLineChart.allTheIPs)
        // let selectedDate = '2023-01-01'
        let neededData = []
        for (let j = 0; j < CrossReferenceIPLineChart.allTheIPs.length; j++){
            let currentBatch = CrossReferenceIPLineChart.allTheIPs[j]
            // console.log(currentBatch)
            if (this.givenIP === "All"){
                neededData.push(currentBatch[this.givenDate])
            }
            else{
                let thisOne = currentBatch[this.givenDate]
                for (let i = 0; i < thisOne.length; i++){
                    let current = thisOne[i]
                    let arr = []
                    if (current['ip'] === this.givenIP){
                        arr.push(current)
                        neededData.push(arr)
                    }
                }
            }
        }

        // console.log(neededData)
        let holder = []
        for (let j = 0; j < neededData.length; j++){
            let currentBatch = neededData[j]
            for (let k = 0; k < currentBatch.length; k++){
                let currentStuff = currentBatch[k]
                // console.log(currentStuff)
                let currentNodes = currentStuff['nodes']
                for (let i = 0; i < currentNodes.length; i++){
                    let myNode = currentNodes[i]
                    let myMyNode = myNode['node']
                    let myVar = "yes"
                    for (let m = 0; m < holder.length; m++){
                        let thisThing = holder[m]
                        if (thisThing[0] === myMyNode){
                            myVar = "no"
                            thisThing[1] = thisThing[1] + myNode['count']
                            thisThing[2].push([currentStuff['ip'], myNode['count']])
                        }
                    }
                    if (myVar === "yes"){
                        let arr = [[currentStuff['ip'], myNode['count']]]
                        holder.push([myMyNode, myNode['count'], arr])
                    }
                }
            }
        }
        // console.log(holder)
        let csvData = []
        csvData.push({'id': 'dest', 'value': 0, 'value2': 0, 'value3': 0})

        for (let a = 0; a < holder.length; a++){
            let relevantArr = holder[a]
            let relevantString = relevantArr[0]
            let desiredString = 'dest.' + relevantString
            csvData.push({'id': desiredString, 'value': relevantArr[1], 'value2': relevantArr[2], 'value3': relevantString})
        }
        // csvData.push({'id': 'dest.ms', 'value': 0, 'value2': 0, 'value3': 0})
        // csvData.push({'id': 'dest.hp', 'value': 0, 'value2': 0, 'value3': 0})
        // csvData.push({'id': 'dest.amd', 'value': 0, 'value2': 0, 'value3': 0})
        // csvData.push({'id': 'dest.flex', 'value': 0, 'value2': 0, 'value3': 0})


        // for (let i = 0; i < 10; i++){  
        //     let firstChar = this.convertNumberToLetter(String(i))
        //     let desiredString1A = 'dest.ms.' + firstChar
        //     let desiredString1B = 'dest.hp.' + firstChar
        //     let desiredString1C = 'dest.amd.' + firstChar
        //     let desiredString1D = 'dest.flex.' + firstChar
        //     csvData.push({'id': desiredString1A, 'value': 0, 'value2': 0, 'value3': 0})
        //     csvData.push({'id': desiredString1B, 'value': 0, 'value2': 0, 'value3': 0})
        //     csvData.push({'id': desiredString1C, 'value': 0, 'value2': 0, 'value3': 0})
        //     csvData.push({'id': desiredString1D, 'value': 0, 'value2': 0, 'value3': 0})
        //     for (let j = 0; j < 10; j++){
        //         let secondChar = this.convertNumberToLetter(String(j))
        //         let desiredString2A = 'dest.ms.' + firstChar + '.' + secondChar
        //         let desiredString2B = 'dest.hp.' + firstChar + '.' + secondChar
        //         let desiredString2C = 'dest.amd.' + firstChar + '.' + secondChar
        //         csvData.push({'id': desiredString2A, 'value': 0, 'value2': 0, 'value3': 0})
        //         csvData.push({'id': desiredString2B, 'value': 0, 'value2': 0, 'value3': 0})
        //         csvData.push({'id': desiredString2C, 'value': 0, 'value2': 0, 'value3': 0})
        //         for (let k = 0; k < 10; k++){
        //             let thirdChar = this.convertNumberToLetter(String(k))
        //             let desiredString3A = 'dest.ms.' + firstChar + '.' + secondChar + '.' + thirdChar
        //             csvData.push({'id': desiredString3A, 'value': 0, 'value2': 0, 'value3': 0})
        //         }
        //     }
        // }


        // for (let a = 0; a < holder.length; a++){
        //     let relevantArr = holder[a]
        //     let relevantString = relevantArr[0]
        //     if (relevantString.startsWith("ms")){
        //         let firstChar = this.convertNumberToLetter(relevantString.charAt(2))
        //         let secondChar = this.convertNumberToLetter(relevantString.charAt(3))
        //         let thirdChar = this.convertNumberToLetter(relevantString.charAt(4))
        //         let fourthChar = this.convertNumberToLetter(relevantString.charAt(5))
        //         let desiredString = 'dest.ms.' + firstChar + '.' + secondChar + '.' + thirdChar + '.' + fourthChar
        //         csvData.push({'id': desiredString, 'value': relevantArr[1], 'value2': relevantArr[2], 'value3': relevantString})
        //     }
        //     else if (relevantString.startsWith("hp")){
        //         let firstChar = this.convertNumberToLetter(relevantString.charAt(2))
        //         let secondChar = this.convertNumberToLetter(relevantString.charAt(3))
        //         let thirdChar = this.convertNumberToLetter(relevantString.charAt(4))
        //         let desiredString = 'dest.hp.' + firstChar + '.' + secondChar + '.' + thirdChar
        //         csvData.push({'id': desiredString, 'value': relevantArr[1], 'value2': relevantArr[2], 'value3': relevantString})
        //     }
        //     else if(relevantString.startsWith("amd")){
        //         let firstChar = this.convertNumberToLetter(relevantString.charAt(3))
        //         let secondChar = this.convertNumberToLetter(relevantString.charAt(4))
        //         let thirdChar = this.convertNumberToLetter(relevantString.charAt(5))
        //         let desiredString = 'dest.amd.' + firstChar + '.' + secondChar + '.' + thirdChar
        //         csvData.push({'id': desiredString, 'value': relevantArr[1], 'value2': relevantArr[2], 'value3': relevantString})
        //     }
        //     else if (relevantString.startsWith("flex")){
        //         let firstChar = this.convertNumberToLetter(relevantString.charAt(4))
        //         let secondChar = this.convertNumberToLetter(relevantString.charAt(5))
        //         let desiredString = 'dest.flex.' + firstChar + '.' + secondChar
        //         csvData.push({'id': desiredString, 'value': relevantArr[1], 'value2': relevantArr[2], 'value3': relevantString})
        //     }
        // }
        // console.log(csvData)

        if (csvData.length > 1){
            this.constructTree(csvData)
        }
    }

    constructTree(data){
        let width = 750, height = 320;

        let format = d3.format(",d");

        let color = d3.scaleOrdinal()
            .range(d3.schemeCategory10
                .map(function(c) { 
                // console.log(c)
                c = d3.rgb(c); 
                c.opacity = 0.6; 
                return c; 
                }));

        let stratify = d3.stratify()
                        .parentId(function(d) { 
                        return d.id.substring(0, d.id.lastIndexOf(".")); 
                        });

        let treemap = d3.treemap()
            .size([width, height])
            .padding(1)
            .round(true);

        let root = stratify(data)
                    .sum(function(d) { return d.value; })
                    .sort(function(a, b) { return b.height - a.height || b.value - a.value; });
        // console.log(root)
        treemap(root);

        d3.select("body")
            .selectAll(".node")
            .data(root.leaves())
            .enter().append("div")
            .attr("class", "node")
            .attr("title", function(d) { 
                let involvedIps = d['data'].value2
                let returnString = ""
                for (let i = 0; i < involvedIps.length; i++){
                    let concernedIP = involvedIps[i]
                    returnString = returnString + concernedIP[0] + " --> " + concernedIP[1] + "\n"
                }
                return returnString; 
            })
            .style("left", function(d) { return d.x0 + 2960 + "px"; })
            .style("top", function(d) { return d.y0 + 190 + "px"; })
            .style("width", function(d) { return d.x1 - d.x0 + "px"; })
            .style("height", function(d) { return d.y1 - d.y0 + "px"; })
            .style("background", function(d) { while (d.depth > 1) d = d.parent; return color(d.id); })
            .append("div")
            .attr("class", "node-label")
            .text(function(d) { 
                return d['data'].value3; 
            })
            .append("div")
            .attr("class", "node-value")
            .attr("dy", "0em")
            .text(function(d) { 
                return format(d.value); 
            })
            .append("div")
            .attr("class", "node-value")
            .attr("dy", "4em")
            .text(function(d) { 
                let wantedIps = d['data'].value2
                return wantedIps.length + " ip(s)"; 
            })

        let svg2 = d3.select("#legendForTreeMap")
        .append("svg")
            .attr("width", 460)
            .attr("height", 180)
        

        if (this.givenCountry === 'Multiple'){
            svg2.append('text').attr("transform", "translate(30,140)").text("Countries: " + this.givenCountry).style("font-size", "20px").style("fill", "red")
        }
        else{
            svg2.append('text').attr("transform", "translate(30,140)").text("Country: ").style("font-size", "20px").style("fill", "red")
            svg2.append('svg:image').attr('xlink:href', 'https://flagcdn.com/32x24/'+this.givenCountry.toLowerCase()+'.png')
            .attr('x', 120).attr('y', 115).attr('width', 32).attr('height', 24)
        }
        
        svg2.append('text').attr("transform", "translate(30,160)").text("IP(s): "+this.givenIP).style("font-size", "20px").style("fill", "red")
        svg2.append('text').attr("transform", "translate(30,180)").text("Date: "+this.givenDate).style("font-size", "20px").style("fill", "red")


        svg2.append('text').attr("transform", "translate(260,120)").text("Square Layout: ").style("font-size", "20px").style("fill", "red")
        svg2.append('text').attr("transform", "translate(300,140)").text("Destination Node").style("font-size", "20px").style("fill", "red")
        svg2.append('text').attr("transform", "translate(300,160)").text("Total Attacks").style("font-size", "20px").style("fill", "red")
        svg2.append('text').attr("transform", "translate(300,180)").text("Total Attackers").style("font-size", "20px").style("fill", "red")


        svg2.append('text').attr("transform", "translate(30,20)").text("Hover on the squares to see the breakdown of").style("font-size", "20px").style("fill", "red")
        svg2.append('text').attr("transform", "translate(30,40)").text("total attacks divided by total attackers.").style("font-size", "20px").style("fill", "red")
    }

    // convertNumberToLetter(characterReceived){
    //     if (characterReceived === '0'){
    //         return "zero"
    //     }
    //     else if(characterReceived === '1'){
    //         return "one"
    //     }
    //     else if(characterReceived === '2'){
    //         return "two"
    //     }
    //     else if(characterReceived === '3'){
    //         return "three"
    //     }
    //     else if(characterReceived === '4'){
    //         return "four"
    //     }
    //     else if(characterReceived === '5'){
    //         return "five"
    //     }
    //     else if(characterReceived === '6'){
    //         return "six"
    //     }
    //     else if(characterReceived === '7'){
    //         return "seven"
    //     }
    //     else if(characterReceived === '8'){
    //         return "eight"
    //     }
    //     else if(characterReceived === '9'){
    //         return "nine"
    //     }
    // }

}