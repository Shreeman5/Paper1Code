class CrossReferenceIPLineChart{
    static allTheIPs
    static dates 
    static ipsForFunction
    static dataSetForFunction

    constructor(timeRangeList){
        this.timeRangeList = timeRangeList
        this.neededIPs = []
        this.IPsAndCountries = []
        CrossReferenceIPLineChart.allTheIPs = []
        CrossReferenceIPLineChart.dates = timeRangeList
    }

    crossReferenceIPChart(){

        let starterNumber = 0
        let endingNumber = 10
        let maxVal = 0
        let dataset = []
        for (let j = 0; j < CrossReferenceIPLineChart.allTheIPs.length; j++){
            let currentBatch = CrossReferenceIPLineChart.allTheIPs[j]
            // console.log(currentBatch)
            
            for (let z = starterNumber; z < this.neededIPs.length && z < endingNumber; z++){
                let specificIPInfo = []
                let myIP = this.neededIPs[z]
                for (let k = 0; k < this.timeRangeList.length; k++){
                    let checkTime = this.timeRangeList[k]
                    if (checkTime in currentBatch){ 
                        let myData = currentBatch[checkTime]
                        let myVal = 0
                        let meanVal = 0
                        let stdVal = 0
                        let minValInArray = 0
                        let maxValInArray = 0
                        let totalLength = 0
                        for (let i = 0; i < myData.length; i++){
                            let rowData = myData[i]
                            if (rowData['ip'] === myIP){
                                myVal = rowData['count']
                                if (myVal > maxVal){
                                    maxVal = myVal
                                }

                                let myVal2 = rowData['nodes']
                                let allCountValues = []
                                for (let a = 0; a < myVal2.length; a++){
                                    let thisVal = myVal2[a]
                                    allCountValues.push(thisVal['count'])
                                }

                                const standardDeviation = (arr, usePopulation = false) => {
                                    const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length;
                                    const stDev = Math.sqrt(arr
                                                            .reduce((acc, val) => acc.concat((val - mean) ** 2), [])
                                                            .reduce((acc, val) => acc + val, 0) /
                                                            (arr.length - (usePopulation ? 0 : 1)))
                                    return [mean, stDev]
                                };

                                // console.log(allCountValues)

                                if (allCountValues.length === 1){
                                    meanVal = allCountValues[0]
                                    stdVal = 0
                                }
                                else{
                                    let returnVal = standardDeviation(allCountValues)
                                    meanVal = returnVal[0]
                                    stdVal = returnVal[1]
                                }
                                minValInArray = Math.min(...allCountValues)
                                maxValInArray = Math.max(...allCountValues)
                                totalLength = allCountValues.length
                            }
                        }
                        if (myVal === 0){
                            specificIPInfo.push([checkTime, 0, 0, 0, 0, 0, myIP, 0])
                        }
                        else{
                            specificIPInfo.push([checkTime, myVal, meanVal, stdVal, minValInArray, maxValInArray, myIP, totalLength])
                        }
                    }
                    else{
                        specificIPInfo.push([checkTime, 0, 0, 0, 0, 0, myIP, 0])
                    }
                }
                dataset.push(specificIPInfo)
            }
            starterNumber += 10
            endingNumber += 10
        }
        // console.log(dataset)
        CrossReferenceIPLineChart.ipsForFunction = this.IPsAndCountries
        CrossReferenceIPLineChart.dataSetForFunction = dataset

        let colorMap = {}
        for (let x = 0; x < dataset.length; x++){
            colorMap[dataset[x]] = this.IPsAndCountries[x]
        }
        // console.log(colorMap)

        this.makeLineChart(dataset, maxVal, colorMap)
    }

    makeLineChart(dataset1, maxValue, colorMap){
        // console.log(dataset1)
        document.getElementById("crossReferenceIPGraphs").style.outline = "5px dashed black"
        document.getElementById("crossReferenceIPGraphs").style.left = "2030px"
        document.getElementById("crossReferenceIPGraphs").style.top = "190px"
        document.getElementById("crossReferenceIPGraphs").style.width = "900px"
        document.getElementById("crossReferenceIPGraphs").style.height = "320px"

        let margin = {top: 50, right: 15, bottom: 110, left: 90},
                    width = 900 - margin.left - margin.right,
                    height = 320 - margin.top - margin.bottom;

        let svg = d3.select("#crossReferenceIPGraphs")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")")
            .attr("id", "IPline")

        // console.log(maxValue)

        let xScale = d3.scalePoint().domain(this.timeRangeList).range([0, width])
        let yScale = d3.scaleLinear().domain([0, maxValue]).range([height, 0])

        let periodValue = VizScreen.givenTimePeriod

        let that = this
        svg.append("g")
        .attr("id", "xaxis")
        .style("font", "20px times")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(xScale))
         .selectAll("text")  
         .style("text-anchor", "start")
         .attr("dx", function() {
            if (periodValue === 'day'){
                return "-5.3em"
            }
            else{
                return "-3.8em"
            }
         })
         .attr("dy", "0em")
         .attr("transform", "rotate(-45)")
        
        function clickMe(e, d){
            // console.log(d)
            $(".node").remove()
            document.getElementById("legendForTreeMap").innerHTML = ""

            let myVal = []
            for (let i = 0; i < that.IPsAndCountries.length; i++){
                let val = that.IPsAndCountries[i]
                myVal.push(val.substring(val.length - 2, val.length))
            }
            // console.log(myVal)

            let myVal2
            if (new Set(myVal).size === 1){
                myVal2 = myVal[0]
            }
            else{
                myVal2 = 'Multiple'
            }
            let treemap = new Treemap(d, "All", myVal2)
            treemap.buildTreeMap()
        }

        d3.select('#xaxis')
            .selectAll('.tick')
            .on('click',clickMe)
            .on("mouseover", function() {
                d3.select(this).style("cursor", "pointer")
            })


        svg.append("g").style("font", "20px times")
         .call(d3.axisLeft(yScale).ticks(4).tickFormat(x => that.better(x)))

        let division = (1/dataset1.length).toFixed(3)
        let colors = []
        let starterValue = 1
        for (let i = 0; i < dataset1.length; i++){
            // console.log(starterValue)
            colors.push(d3.interpolateSpectral(starterValue))
            starterValue = (starterValue - division).toFixed(3)
        }

        /* Code from line x to y citation:

        Title: How to create a line chart using D3
        Author: Khan, S
        Date: N/A
        Code version: N/A
        Type: Source Code
        Availability: https://www.educative.io/answers/how-to-create-a-line-chart-using-d3

        Notes: Cited code has been modified */
        for (let i = 0; i < dataset1.length; i++){
            this.circles = svg.append('g')
            .selectAll("dot")
            .data(dataset1[i])
            .enter()
            .append("circle")
            .attr("cx", function (d) { 
                return xScale(d[0]); 
            } )
            .attr("cy", function (d) { return yScale(d[1]); } )
            .attr("r", 12)
            .attr("transform", "translate(" + 0 + "," + 0 + ")")
            .style("fill", colors[i]);

            let that = this
            let tip2 = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 10).style("font-size", "30px")
            this.circles.on("mouseover", function(e, d) {
                // console.log(d)
                d3.select(this).style("cursor", "pointer")
                d3.select(this).attr('stroke-width', 5).style("stroke", "red")
                let tiptext =   "For the top " +d[7]+ " destination nodes hit by this IP <br>"
                                + "Mean destination node val: " + that.better(d[2]) + '<br>' 
                                + "StDev destination node val: " + that.better(d[3]) + '<br>'
                                + "Min destination node val: " + that.better(d[4]) + '<br>'
                                + "Max destination node val: " + that.better(d[5]) + '<br>'
                tip2.style("opacity", 5)
                    .html(tiptext)
                    .style("left", (e.pageX  - 450) + "px")
                    .style("top", (e.pageY)  + "px")
                    .style("width", "610px")
                // console.log(d)
            }).on("mouseout", function(d) {
                d3.select(this).attr('stroke-width', 0)
                tip2.style("opacity", 0)
            })

            this.circles.on("click", function(e, d) {
                // console.log(d)
                // console.log(d[0])
                // console.log(d[6])
                $(".node").remove()
                document.getElementById("legendForTreeMap").innerHTML = ""

                let myVal
                for (let i = 0; i < that.IPsAndCountries.length; i++){
                    let val = that.IPsAndCountries[i]
                    if (val.includes(d[6])){
                        myVal = val.substring(val.length - 2, val.length)
                    }
                }
                // console.log(myVal)
                // console.log(that.IPsAndCountries)

                let treemap = new Treemap(d[0], d[6], myVal)
                treemap.buildTreeMap()
            })

                  
            let line = d3.line()
            .x(function(d) { return xScale(d[0]); }) 
            .y(function(d) { return yScale(d[1]); }) 
            .curve(d3.curveMonotoneX)
            
            svg.append("path")
            .datum(dataset1[i]) 
            .attr("class", "line") 
            .attr("transform", "translate(" + 0 + "," + 0 + ")")
            .attr("d", line)
            .style("fill", "none")
            .style("stroke", "black")
            .style("stroke-width", "4")
            .on('mouseover', function(d, i){
                // console.log(d)
                // console.log(i)
                d3.select(this).attr('stroke-width', 12).style("stroke", "red")//.style('opacity', 1)
            })
            .on('mouseout', function(d, i){
                d3.select(this).attr('stroke-width', 4).style("stroke", "black")//.style('opacity', 0.5)
            })

            let tip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 10)
            const stuff = document.getElementById('IPline')
            stuff.addEventListener("mouseover", (event) => {
                let IPval = colorMap[event.toElement.__data__]
                let lastTwo = IPval.substring(IPval.length - 2, IPval.length)
                let exceptLastTwo = IPval.substring(0, IPval.length - 2)
                let tiptext = null
                if (IPval !== null){
                    tiptext = exceptLastTwo+" <img src='https://flagcdn.com/32x24/"+lastTwo.toLowerCase()+".png' width='32'height='24'></img>"
                }
                tip.style("opacity", 5)
                .html(tiptext)
                .style("left", (event.pageX) + "px")
                .style("top", (event.pageY) + "px")
                .style("width", "230px")
                .style("font", "25px times")
            })
            stuff.addEventListener("mouseout", (event) => {
                tip.style("opacity", 0)
            })
        }

        
        let periodText
        let periodText2
        let xPos
        if (periodValue === "month"){
            periodText = "Months"
            periodText2 = "months"
            xPos = 350
        }
        else if(periodValue === "week"){
            periodText = "Weeks"
            periodText2 = "weeks"
            xPos = 330
        }
        else if (periodValue === "day"){
            periodText = "Days"
            periodText2 = "days"
            xPos = 340
        }
        svg.append('text').attr("transform", "translate(250,-20)").text("Cross Referenced IPs").style("font-size", "25px")
        svg.append('text').attr("transform", "translate("+xPos+",265)").text(periodText).style("font-size", "25px")
        svg.append('text').attr("transform", "translate(-70,125)rotate(270)").text("Attacks").style("font-size", "25px")

        // legend for IP graph

        let upperBound = Math.ceil((this.IPsAndCountries.length/5)) * 220
        // document.getElementById("legendForIPGraph").style.outline = "5px dashed black"
        let svg2 = d3.select("#legendForIPGraph")
        .append("svg")
            .attr("width", upperBound)
            .attr("height", 110)

        let starterY = 10
        let starterX = 10
        for (let i = 0; i < this.IPsAndCountries.length; i++){
            if (i % 5 === 0 && i !== 0){
                starterX += 220
                starterY = 10
            }
            let myVal = this.IPsAndCountries[i]
            let myText = myVal.substring(0, myVal.length - 2) //+ this.getFlagEmoji(myVal.substring(myVal.length - 2, myVal.length)) 
            svg2.append('circle').style("fill", colors[i]).attr("r", 8).attr("cx", starterX).attr("cy", starterY).attr('stroke', 'black').attr('stroke-width', 1)
            svg2.append('text').attr("transform", "translate("+(starterX+10)+","+(starterY+8)+")")
                .text(myText).style("font-size", "20px")
                .style("fill", colors[i]).style("stroke", "black")
            
            /* Code from line x to y citation:

            Title: How to add an image to an svg container using D3.js
            Author: Cheekkallur, A
            Date: 2013-10-09
            Code version: N/A
            Type: Source Code
            Availability: https://stackoverflow.com/questions/14567809/how-to-add-an-image-to-an-svg-container-using-d3-js

            Notes: Cited code has been modified */
            svg2.append('svg:image').attr('xlink:href', 'https://flagcdn.com/24x18/'+myVal.substring(myVal.length - 2, myVal.length).toLowerCase()+'.png').attr('x', (starterX+175))
            .attr('y', (starterY-8)).attr('width', 24).attr('height', 18)
            starterY +=  21
        }


        let svg3 = d3.select("#crossReferencePointer")
        .append("svg")
            .attr("width", 300)
            .attr("height", 400)

        
        svg3.append('text').attr("transform", "translate(0,15)").text("Hover on a circle to know the").style("fill", "red").style("font-size", "20px")
        svg3.append('text').attr("transform", "translate(0,35)").text("destination node details of that IP").style("fill", "red").style("font-size", "20px")
        svg3.append('text').attr("transform", "translate(0,55)").text("for that " + periodValue + ".").style("fill", "red").style("font-size", "20px")

        svg3.append('text').attr("transform", "translate(0,85)").text("Hover on a line to see the attack").style("fill", "red").style("font-size", "20px")
        svg3.append('text').attr("transform", "translate(0,105)").text("pattern of that IP.").style("fill", "red").style("font-size", "20px")

        svg3.append('text').attr("transform", "translate(0,135)").text("Click on a circle to open a").style("fill", "red").style("font-size", "20px")
        svg3.append('text').attr("transform", "translate(0,155)").text("treemap(on the right) that shows").style("fill", "red").style("font-size", "20px")
        svg3.append('text').attr("transform", "translate(0,175)").text("the top 10 destination nodes hit").style("fill", "red").style("font-size", "20px")
        svg3.append('text').attr("transform", "translate(0,195)").text("by that IP that " +periodValue+".").style("fill", "red").style("font-size", "20px")

        svg3.append('text').attr("transform", "translate(0,225)").text("Click on a "+periodValue+" on the x-axis to").style("fill", "red").style("font-size", "20px")
        svg3.append('text').attr("transform", "translate(0,245)").text("see a treemap(on the right) that").style("fill", "red").style("font-size", "20px")
        svg3.append('text').attr("transform", "translate(0,265)").text("shows a maximum of n * 10,").style("fill", "red").style("font-size", "20px")
        svg3.append('text').attr("transform", "translate(0,285)").text("where n is the number of IPs in").style("fill", "red").style("font-size", "20px")
        svg3.append('text').attr("transform", "translate(0,305)").text("the graph, destination nodes hit").style("fill", "red").style("font-size", "20px")
        svg3.append('text').attr("transform", "translate(0,325)").text("by the n IPs.").style("fill", "red").style("font-size", "20px")

        // svg3.append('text').attr("transform", "translate(0,355)").text("If all the selected IPs attack 0").style("fill", "red").style("font-size", "20px")
        // svg3.append('text').attr("transform", "translate(0,375)").text("times for all the "+periodText2+", y-axis").style("fill", "red").style("font-size", "20px")
        // svg3.append('text').attr("transform", "translate(0,395)").text("will show negative values.").style("fill", "red").style("font-size", "20px")

        
    }

    getFlagEmoji(cc){
        const codePoints = cc
            .toUpperCase()
            .split('')
            .map(char =>  127397 + char.charCodeAt());
        let b = String.fromCodePoint(...codePoints);
        return b
    }

    better(value){
        if (Math.abs(value) >= 1000000){
            return (value/1000000).toFixed(1) + 'M'
        }
        else if (Math.abs(value) >= 100000){
            return (value/1000000).toFixed(2) + 'M'
        }
        else if (Math.abs(value) >= 10000){
            return (value/1000).toFixed(1) + 'K'
        }
        else if (Math.abs(value) >= 1000){
            return (value/1000).toFixed(2) + 'K'
        }
        else{
            return value.toFixed(1) + ''
        }
    }

    fetchData(){
        let clusterValue = document.getElementById("data").value
        let periodValue = VizScreen.givenTimePeriod
        
        

        let myOpts = document.getElementById('ipsClicked').options
        let selectedIPslength = myOpts.length - 1
        // console.log(selectedIPslength)

        let divisionBy10s = Math.ceil(selectedIPslength/10)
        for (let i = 0; i < divisionBy10s; i++){
            let requiredIPs = []
            let requiredCountries = []
            for (let j = (10*i)+1; j <= (10*i)+10 && j <= selectedIPslength; j++){
                let myStr = myOpts[j].value
                requiredIPs.push(myStr.substring(0, myStr.length - 4))
                this.neededIPs.push(myStr.substring(0, myStr.length - 4))
                let givenValue = myOpts[j].value
                this.IPsAndCountries.push(givenValue)
                if (!requiredCountries.includes(givenValue.slice(-2))){
                    requiredCountries.push(givenValue.slice(-2))
                }
            }
            // console.log(requiredCountries)
            let that = this
            getData6(clusterValue, requiredCountries, this.timeRangeList, periodValue, requiredIPs).then(function(loadedData){
                CrossReferenceIPLineChart.allTheIPs.push(loadedData)
            })
        }

        let that = this
        setTimeout( function() { that.crossReferenceIPChart(); }, 2000)
    }

}

/* Code from line x to y citation:

Title: How to export JavaScript array info to csv (on client side)?
Author: Default
Date: 2013-02-19
Code version: N/A
Type: Source Code
Availability: https://stackoverflow.com/questions/14567809/how-to-add-an-image-to-an-svg-container-using-d3-js

Notes: Cited code has been modified */
function exportCRData(){
    if (CrossReferenceIPLineChart.ipsForFunction.length !== 0){
        let allRows = []

        let headerRow = ['IP']
        for (let i = 0; i < CrossReferenceIPLineChart.dates.length; i++) {
            headerRow.push(CrossReferenceIPLineChart.dates[i])
        }
        allRows.push(headerRow)
        

        for (let i = 0; i < CrossReferenceIPLineChart.dataSetForFunction.length; i++){
            let ipRow = [CrossReferenceIPLineChart.ipsForFunction[i]]
            let dateRow = CrossReferenceIPLineChart.dataSetForFunction[i]
            for (let j = 0; j < dateRow.length; j++){
                let element = dateRow[j]
                ipRow.push(better2(element[1]))
            }
            allRows.push(ipRow)
        }
        // console.log(allRows)

        let csvContent = "data:text/csv;charset=utf-8,";
        
        allRows.forEach(function(rowArray) {
            let row = rowArray.join(",");
            csvContent += row + "\r\n";
        })

        var encodedUri = encodeURI(csvContent);
        window.open(encodedUri)
    }
}

function better2(value){
    if (Math.abs(value) >= 1000000){
        return (value/1000000).toFixed(1) + 'M'
    }
    else if (Math.abs(value) >= 100000){
        return (value/1000000).toFixed(1) + 'M'
    }
    else if (Math.abs(value) >= 10000){
        return (value/1000).toFixed(1) + 'K'
    }
    else if (Math.abs(value) >= 1000){
        return (value/1000).toFixed(1) + 'K'
    }
    else{
        return value.toFixed(1) + ''
    }
}

async function getData6(clusterValue, requiredCountries, timeRangeList, periodValue, requiredIPs){
    let api_address = 'https://kibana.emulab.net/attacker_activity?cluster='+clusterValue+'&cc='+requiredCountries.join(',')+'&range='+timeRangeList.join(',')+'&period='+periodValue+'&ips='+requiredIPs
    // console.log(api_address)
    const data = await fetch(api_address)
    const jsonData = await data.json()
    // console.log(jsonData)
    return jsonData
}