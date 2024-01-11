class AttacksAndAttackers {


    constructor(givenCountries){
        this.givenCountries = givenCountries
        //console.log(givenCountries)
    }

    dataForSecondViz(neededData, selected, barChartData){
        // console.log(barChartData)

        let checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');

        let widthNumber = 0
        let assignedWidth = ''

        if (checkedBoxes.length <= 2){
            widthNumber = 1045
            assignedWidth = widthNumber + 'px'
        }
        else{
            widthNumber = 1045 + 200 * (checkedBoxes.length - 2)
            assignedWidth = widthNumber + 'px'
        }

        document.getElementById("attacksAndAttackers").style.outline = "5px dashed black"
        document.getElementById("attacksAndAttackers").style.left = "1720px"
        document.getElementById("attacksAndAttackers").style.top = "640px"
        document.getElementById("attacksAndAttackers").style.width = assignedWidth
        document.getElementById("attacksAndAttackers").style.height = "740px"


        let margin = {top: 180, right: 50, bottom: 60, left: 95},
                    width = widthNumber - margin.left - margin.right,
                    height = 740 - margin.top - margin.bottom;

        let svg = d3.select("#attacksAndAttackers")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")")

        // data Collection here
        let arr = []
        const entries = Object.entries(barChartData)  
        for(let i = 0; i < entries.length;i++){
            arr.push(entries[i][1])
        }

        // let attack_vals = []
        // let attacker_vals = []
        let barChartInput = []
        let pieChartInput = []
        let i = 0
        for (let entry of arr) {
            let val0 = entry['uat_'+selected[i]]
            // attack_vals.push(val0)
            let val1 = entry['cat_'+selected[i]]
            // attack_vals.push(val1)
            let val2 = entry['cat_'+selected[i+1]]
            // attack_vals.push(val2)
            let val3 = entry['uat_'+selected[i+1]]
            // attack_vals.push(val3)
            barChartInput.push([val0, val1, val2, val3])

            let val4 = entry['uatt_'+selected[i]]
            // attacker_vals.push(val4)
            let val5 = entry['catt']
            // attacker_vals.push(val5)
            let val6 = entry['uatt_'+selected[i+1]]
            // attacker_vals.push(val6)
            pieChartInput.push([val4, val5, val6])

            i = i+1
        }
                
        let idSelector2 = function() { return this.value; }
        let timePeriods = $(":checkbox:checked").map(idSelector2).get()
 
        // console.log(barChartInput)
        let attack_vals = []
        let attacker_vals = []
        for (const [key, value] of Object.entries(neededData)) {
            // console.log(key)
            // console.log(value)
            attack_vals.push(value['attacks'])
            attacker_vals.push(value['attackers'])
        }

        let maxValueAttacks = Math.max(...attack_vals)
        let maxValueAttackers = Math.max(...attacker_vals)

        
        let weekData = []
        for(let i = 0; i < timePeriods.length;i++){
            weekData.push(timePeriods[i])
        }
        
        let weekDataPair = []
        for (let w = 0; w < timePeriods.length - 1; w++){
            weekDataPair.push([weekData[w], weekData[w+1]])
        }

        let xScale = d3.scalePoint().domain(timePeriods).range([0, width])
        let yScale = d3.scaleLinear().domain([0, maxValueAttacks]).range([height/2, 0])
        let yScale2 = d3.scaleLinear().domain([0, maxValueAttackers]).range([height/2, height])


        svg.append("g")
        .style("font", "20px times")
         .attr("transform", "translate(0," + height/2 + ")")
         .call(d3.axisBottom(xScale))
         .selectAll("text")
         .style("font-size", "22px")
         .attr("dx", "-0.3em")
         .attr("dy", "12.3em")
         
         

        let that = this        
        svg.append("g").style("font", "20px times")
        .attr("transform", "translate("+0+",0)")
         .call(d3.axisLeft(yScale).ticks(5).tickFormat(function(d){
            return that.better(d)
         }))

         svg.append("g").style("font", "20px times")
         .attr("transform", "translate("+0+",0)")
          .call(d3.axisLeft(yScale2).ticks(5).tickFormat(function(d){
            return that.better(d)
         }))
                       

        let xPositions = []
        for (let i = 0; i < timePeriods.length - 1; i++){
            let a = Math.floor(xScale(timePeriods[i]) + 10)
            let b = Math.floor(xScale(timePeriods[i+1]) - 10)
            xPositions.push([a, b])
        }
        
        // console.log(xPositions)


/* Code from line x to y citation:

Title: Basic grouped barplot in d3.js
Author: Holtz, Y
Date: N/A
Code version: N/A
Type: Source Code
Availability: https://d3-graph-gallery.com/graph/barplot_grouped_basicWide.html

Notes: Cited code has been modified */


        // figures made here
        for (let i = 0; i < xPositions.length; i++){
            let myPos = xPositions[i]
            let starter = myPos[0]
            let ender = myPos[1]
            let myPair = weekDataPair[i]
            let division = Math.floor((ender - starter)/4)
            let subPosArray = []
            for (let k = starter; k < ender && subPosArray.length <= 4; k += division){
                subPosArray.push(k)
            }
            // console.log(subPosArray)
            let relevantArr = barChartInput[i]
            let colors = ['grey','#377eb8','#377eb8', 'green']
            for (let j = 0; j < relevantArr.length; j++){
                
                this.firstRect = svg.append('rect').style("fill", colors[j])
                .style("stroke", "black")
                .style("stroke-width", "5px").attr("x", subPosArray[j])
                .attr("y", function(){
                    // console.log(yScale(relevantArr[j]))
                    return yScale(relevantArr[j])
                })
                .attr("height", function(){
                    // console.log(height/2 - yScale(relevantArr[j]))
                    return height/2 - yScale(relevantArr[j])
                }).attr("width", division)

                let that = this
                let tip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 10).style("font-size", "30px")
                this.firstRect.on("mouseover", function(e, d, i) {
                    d3.select(this).style("stroke-width", "8px").style("stroke", "red")
                    let stuff = e.target.outerHTML
                    let substring = "y=\""
                    let indexStart = stuff.indexOf(substring) + 3
                    let indexEnd = stuff.indexOf(substring) + 3
                    while(stuff.charAt(indexEnd) != '\"'){
                        indexEnd += 1
                    }
                    let desiredNumber = Number(stuff.substring(indexStart, indexEnd))
                    let myNumber = yScale.invert(desiredNumber)
                    myNumber = that.better(myNumber)

                    let tiptext
                    if (j === 0){
                        tiptext = "Attacks of "+myPair[0]+" made by attackers unique to "+myPair[0]+": " + myNumber + "."
                    }
                    else if (j === 1){
                        tiptext = "Attacks of "+myPair[0]+" made by attackers common to "+myPair[0]+" & "+myPair[1]+": " + myNumber + "."
                    }
                    else if (j === 2){
                        tiptext = "Attacks of "+myPair[1]+" made by attackers common to "+myPair[0]+" & "+myPair[1]+": " + myNumber + "."
                    }  
                    else if (j === 3){
                        tiptext = "Attacks of "+myPair[1]+" made by attackers unique to "+myPair[1]+": " + myNumber + "."
                    }
                    tip.style("opacity", 5)
                        .html(tiptext)
                        .style("left", (e.pageX) + "px")
                        .style("top", (e.pageY) + "px")
                        .style("width", "600px")
                }).on("mouseout", function(d) {
                    d3.select(this).style("stroke-width", "5px").style("stroke", "black")
                    tip.style("opacity", 0)
                })

            }

            let subPosArray2 = [subPosArray[0], subPosArray[1], subPosArray[3]]
            // console.log(subPosArray2)
            let widths = [division, division * 2, division]
            let relevantArr2 = pieChartInput[i]
            // console.log(relevantArr2)
            let colors2 = ['grey','#377eb8', 'green']
            for (let j = 0; j < relevantArr2.length; j++){
                this.secondRect = svg.append('rect').style("fill", colors2[j])
                .style("opacity", 0.9).style("stroke", "black")
                .style("stroke-width", "5px").attr("x", subPosArray2[j]).attr("y", height/2)
                .attr("height", function(){
                    // console.log(relevantArr2[j])
                    return yScale2(relevantArr2[j]) - height/2
                }).attr("width", widths[j])

                let that = this
                let tip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 10).style("font-size", "30px")
                this.secondRect.on("mouseover", function(e, d, i) {
                    d3.select(this).style("stroke-width", "8px").style("stroke", "red")
                    let stuff = e.target.outerHTML
                    let substring = "y=\""
                    let indexStart = stuff.indexOf(substring) + 3
                    let indexEnd = stuff.indexOf(substring) + 3
                    while(stuff.charAt(indexEnd) != '\"'){
                        indexEnd += 1
                    }
                    let desiredNumber = Number(stuff.substring(indexStart, indexEnd))

                    let substring2 = "height=\""
                    let indexStart2 = stuff.indexOf(substring2) + 8
                    let indexEnd2 = stuff.indexOf(substring2) + 8
                    while(stuff.charAt(indexEnd2) != '\"'){
                        indexEnd2 += 1
                    }
                    let desiredNumber2 = Number(stuff.substring(indexStart2, indexEnd2))
                    let myNumber = yScale2.invert(desiredNumber+desiredNumber2)
                    myNumber = that.better(myNumber)
                    let tiptext
                    if (j === 0){
                        tiptext = "Attackers unique to "+myPair[0]+": " + myNumber + "."
                    }
                    else if (j === 1){
                        tiptext = "Attackers common to "+myPair[0]+" & "+myPair[1]+": " + myNumber + "."
                    }
                    else if (j === 2){
                        tiptext = "Attackers unique to "+myPair[1]+": " + myNumber + "."
                    }
                    
                    tip.style("opacity", 5)
                        .html(tiptext)
                        .style("left", (e.pageX) + "px")
                        .style("top", (e.pageY) + "px")
                        .style("width", "550px")
                }).on("mouseout", function(d) {
                    d3.select(this).style("stroke-width", "5px").style("stroke", "black")
                    tip.style("opacity", 0)
                })
            }
        }
        //end bargraph here

        let periodValue = VizScreen.givenTimePeriod
        let periodText
        let periodText2
        if (periodValue === "month"){
            periodText = "months"
            periodText2 = "Months"
        }
        else if(periodValue === "week"){
            periodText = "weeks"
            periodText2 = "Weeks"
        }
        else if (periodValue === "day"){
            periodText = "days"
            periodText2 = "Days"
        }


        /* Code from line x to y citation:

        Title: How to create a line chart using D3
        Author: Khan, S
        Date: N/A
        Code version: N/A
        Type: Source Code
        Availability: https://www.educative.io/answers/how-to-create-a-line-chart-using-d3

        Notes: Cited code has been modified */

        // start circle here
        let dataset1 = []
        let categories = ['attacks', 'attackers']
        for (let i = 0; i < categories.length; i++){ 
            let requiredArray = []
            for (const [key, value] of Object.entries(neededData)) {
                for (const [key2, value2] of Object.entries(value)){
                    if (key2 === categories[i]){
                        requiredArray.push([key, value2])
                    }
                }
            }
            dataset1.push(requiredArray)
        }
        // console.log(dataset1)
        let colorsInvolved = ['orange', 'brown']
        for (let i = 0; i < dataset1.length; i++){
            this.circles = svg.append('g')
            .selectAll("dot")
            .data(dataset1[i])
            .enter()
            .append("circle")
            .attr("cx", function (d) { 
                return xScale(d[0]); 
            } )
            .attr("cy", function (d) { 
                if (i === 1){
                    return yScale2(d[1])
                }
                return yScale(d[1]); 
            } )
            .attr("r", 15)
            .attr("transform", "translate(" + 0 + "," + 0 + ")")
            .style("fill", colorsInvolved[i]);

                  
            let line = d3.line()
                        .x(function(d) { return xScale(d[0]); }) 
                        .y(function(d) { return yScale(d[1]); }) 
                        .curve(d3.curveMonotoneX)

            if (i === 1){
                line = d3.line()
                        .x(function(d) { return xScale(d[0]); }) 
                        .y(function(d) { return yScale2(d[1]); }) 
                        .curve(d3.curveMonotoneX)
            }
            
            svg.append("path")
            .datum(dataset1[i]) 
            .attr("class", "line") 
            .attr("transform", "translate(" + 0 + "," + 0 + ")")
            .attr("d", line)
            .style("fill", "none")
            .style("stroke", "black")
            .style("stroke-width", "2");

            let that = this
            let tip = d3.select("body").append("div").attr("class", "tooltip").attr("id", "aAndATooltip").style("opacity", 10).style("font-size", "30px")
            this.circles.on("mouseover", function(e, d) {
                d3.select(this).style("cursor", "pointer")
                d3.select(this).attr('stroke-width', 5).style("stroke", "red")
                let tiptext = "This "+periodValue+" had " + that.better(d[1]) + ' ' + categories[i] + '.'
                tip.style("opacity", 5)
                    .html(tiptext)
                    .style("left", (e.pageX) + "px")
                    .style("top", (e.pageY) + "px")
                    .style("width", "500px")
            }).on("mouseout", function(d) {
                d3.select(this).attr('stroke-width', 0)
                tip.style("opacity", 0)
            })

            this.circles.on("click", function(e, d) {
                getData5(d[0], that.givenCountries).then(function(loadedData){
                    // console.log(loadedData) 
                    tip.style("opacity", 0)
                    document.getElementById("attacksAndAttackers").innerHTML = ""
                    // console.log(that.givenCountries)
                    let ipLineChart = new IPLineChart(d[0], loadedData, that.givenCountries, neededData, selected, barChartData)
                    ipLineChart.makeLineChart()
                })
            })
        }
        //end circle here

        
        svg.append('text').attr("transform", "translate(-90,-165)").text("Hover on Rectangles and Circles to know more details about Attacks and Attackers.").style("font-size", "20px").style("fill", "red")
        svg.append('text').attr("transform", "translate(-90,-145)").text("Click on a Circle to know the activity of the top 10 IPs of that "+periodValue+".[A new Visualization will replace this visualization]").style("font-size", "20px").style("fill", "red")
        svg.append('text').attr("transform", "translate(-90,-125)").text("Activity is defined as an IPs attack numbers 7 "+periodText+" before and after.").style("font-size", "20px").style("fill", "red")




        svg.append('circle').style("fill", "orange").attr("r", 15).attr("cx", -75).attr("cy", -105)
        svg.append('text').attr("transform", "translate(-55,-98)").text("Attacks").style("font-size", "20px")
        svg.append('circle').style("fill", "brown").attr("r", 15).attr("cx", -75).attr("cy", -70)
        svg.append('text').attr("transform", "translate(-55,-63)").text("Attackers").style("font-size", "20px")
        
        svg.append('rect').style("fill", "grey").style("stroke", "black").style("stroke-width", "3px").attr("x", 55).attr("y", -118).attr("height", 20).attr("width", 80)
        svg.append('text').attr("transform", "translate(140, -101)").text("Attacks by Attackers Unique to "+periodValue+" on the Left").style("font-size", "20px")

        svg.append('rect').style("fill", "#377eb8").style("stroke", "black").style("stroke-width", "3px").attr("x", 55).attr("y", -93).attr("height", 20).attr("width", 80)
        svg.append('text').attr("transform", "translate(140, -76)").text("Attacks by Attackers Common to "+periodText+" on the Left and the Right").style("font-size", "20px")

        svg.append('rect').style("fill", "green").style("stroke", "black").style("stroke-width", "3px").attr("x", 55).attr("y", -68).attr("height", 20).attr("width", 80)
        svg.append('text').attr("transform", "translate(140, -51)").text("Attacks by Attackers Unique to "+periodValue+" on the Right").style("font-size", "20px")


        /* Code from line x to y citation:

        Title: How to add an image to an svg container using D3.js
        Author: Cheekkallur, A
        Date: 2013-10-09
        Code version: N/A
        Type: Source Code
        Availability: https://stackoverflow.com/questions/14567809/how-to-add-an-image-to-an-svg-container-using-d3-js

        Notes: Cited code has been modified */
        svg.append('svg:image').attr('xlink:href', 'https://flagcdn.com/32x24/'+this.givenCountries[0].toLowerCase()+'.png').attr('x', (widthNumber/2 - 265)).attr('y', -41).attr('width', 32).attr('height', 24)
        svg.append('text').attr("transform", "translate("+(widthNumber/2 - 230)+",-21)").text("[Attacks and Attackers]").style("font-size", "35px")


        svg.append('text').attr("transform", "translate("+(widthNumber/2 - 100)+",555)").text(periodText2).style("font-size", "25px")
        svg.append('text').attr("transform", "translate(-70,165)rotate(270)").text("Attacks").style("font-size", "25px")
        svg.append('text').attr("transform", "translate(-70,430)rotate(270)").text("Attackers").style("font-size", "25px")
    }

    // getFlagEmoji(cc){
    //     const codePoints = cc
    //         .toUpperCase()
    //         .split('')
    //         .map(char =>  127397 + char.charCodeAt());
    //     let b = String.fromCodePoint(...codePoints);
    //     return b
    // }

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
        let checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
        let selectedWeeksLength = checkedBoxes.length

        let selected = Array.from(checkedBoxes).map(x => x.value)

        let that = this
        if (selectedWeeksLength >= 2 && this.givenCountries.length === 1){
            getData(selected, this.givenCountries).then(function(loadedData){
                that.dataForSecondViz(loadedData[0], selected, loadedData[1])
            })
        }
        else{
            // console.log("not enough checks")
        }
    }

}



/* Code from line x to y citation:

Title: Using the Fetch API - Web APIs
Author: mdn web docs
Date: N/A
Code version: N/A
Type: Source Code
Availability: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

Notes: Cited code has been modified */

async function getData5(givenDate, countries){
    let givenValue = document.getElementById("data").value
    let givenValue2 = VizScreen.givenTimePeriod
    let api_address = 'https://kibana.emulab.net/attacker_activity?cluster='+givenValue+'&cc='+countries.join(',')+'&range='+givenDate+'&period='+givenValue2
    const data = await fetch(api_address)
    const jsonData = await data.json()
    // console.log(jsonData)
    return jsonData
}

async function getData(selected, countries){
    let givenValue = document.getElementById("data").value
    let givenValue2 = VizScreen.givenTimePeriod
    // console.log(givenValue2)

    let api_address = 'https://kibana.emulab.net/attacks_and_attackers?cluster='+givenValue+'&cc='+countries.join(',')+'&range='+selected.join(',')+'&period='+givenValue2
    const data = await fetch(api_address)
    const jsonData = await data.json()
    // console.log(jsonData)

    let api_address_2 = 'https://kibana.emulab.net/comparison?cluster='+givenValue+'&cc='+countries.join(',')+'&period='+givenValue2+'&range='+selected.join(',')
    const data2 = await fetch(api_address_2)
    const jsonData2 = await data2.json()
    // console.log(jsonData2)

    return [jsonData, jsonData2]

}