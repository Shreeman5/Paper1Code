class ParallelCoordinate{

    //static countriesAcquired = []
    static dataUsedInVizScreen

    constructor(givenCountries, givenChoice, givenNumber){
        this.givenCountries = givenCountries
        this.givenChoice = givenChoice
        this.givenNumber = givenNumber
        //console.log(givenCountries)
    }

    dataForThirdViz(neededData){
        ParallelCoordinate.dataUsedInVizScreen = neededData
        // console.log(neededData)
        // console.log('X:', neededData)
        let idSelector = function() { return this.id; }
        let checkedBoxes = $(":checkbox:checked").map(idSelector).get()

        let widthNumber = 0
        let assignedWidth = ''

        let workingLength = 0
        if (checkedBoxes.length > this.givenCountries.length){
            workingLength = checkedBoxes.length
        }
        else{
            workingLength = this.givenCountries.length
        }


        if (workingLength <= 6){
            widthNumber = 1150
            assignedWidth = widthNumber + 'px'
        }
        else{
            widthNumber = 1150 + (100 * (workingLength - 6))
            assignedWidth = widthNumber + 'px'
        }



        let margin = {top: 100, right: 30, bottom: 100, left: 50},
        width = widthNumber - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

        let starterValue = document.getElementById('predictionTable').offsetWidth + 1800
        let parallelCoordinateStarter = starterValue + "px"
        let parallelCoordinateStarter2 = (starterValue-310) + "px"

        document.getElementById("parallelCoordinatesGraph").style.outline = "5px dashed black"
        document.getElementById("parallelCoordinatesGraph").style.left = parallelCoordinateStarter
        document.getElementById("parallelCoordinatesGraph").style.top = "1530px"
        document.getElementById("parallelCoordinatesGraph").style.width = assignedWidth
        document.getElementById("parallelCoordinatesGraph").style.height = "600px"

        // append the svg object to the body of the page
        const svg = d3.select("#parallelCoordinatesGraph")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
                `translate(${margin.left},${margin.top})`)
        .attr("id", "x")

        
        let usernameCollection = []
        for (const property in neededData) {
            let x = neededData[property]
            for (const values in x){
                for (const values2 of x[values]){
                    let usernameValue = values2['username']
                    if (!usernameCollection.includes(usernameValue)){
                        usernameCollection.push(usernameValue)
                    }
                }
            }
        }
        //console.log(usernameCollection)

        let datesOrCountries = []
        if (this.givenCountries.length === 1){
            for (const property in neededData) {
                let x = neededData[property]
                for (const values in x){
                    datesOrCountries.push(values)
                }
            }
        }
        else{
            for (const property in neededData) {
                datesOrCountries.push(property)
            }
        }
        // console.log(datesOrCountries)

        let desiredData = []
        if (this.givenCountries.length === 1){
            for (let usernames in usernameCollection){
                let chosenUsername = usernameCollection[usernames]
                let collection = []
                for (const property in neededData) {
                    let x = neededData[property]
                    for (const values in x){
                        for (const values2 of x[values]){
                            if (chosenUsername === values2['username']){
                                const prop1 = values
                                collection[prop1] = values2['count']
                            }
                        } 
                    }
                }
                collection['username'] = chosenUsername
                desiredData.push(collection)
            }
        }
        else{
            for (let usernames in usernameCollection){
                let chosenUsername = usernameCollection[usernames]
                let collection = []
                for (const property in neededData) {
                    let x = neededData[property]
                    for (const values in x){
                        let y = x[values]
                        for (const values2 of y){
                            if (chosenUsername === values2['username']){
                                const prop1 = property
                                collection[prop1] = values2['count'] 
                            }
                        }
                    }
                }
                collection['username'] = chosenUsername
                desiredData.push(collection)
            }
        }

        for (let i = 0; i < datesOrCountries.length; i++) {
            let property = datesOrCountries[i]
            for (const things in desiredData){
                let value =  desiredData[things]
                if (!value.hasOwnProperty(property)){
                    const prop1 = property
                    value[prop1] = 0
                }
            }
        }


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


        //this.removeUserNameFilterOptions()
        this.addUserNameFilterOptions(desiredData, parallelCoordinateStarter2, periodValue, periodText, periodText2)

        
        
        //console.log(desiredData)

        // let sel = document.getElementById('usernameFilter')
        // console.log(sel.selectedIndex)
        // console.log(sel.options[sel.selectedIndex])
        // let filteredUsername = sel.options[sel.selectedIndex].text
        // console.log(filteredUsername)
        // let filteredUsername = "bobby"


        let selectElement = document.getElementById('usernameFilter')
        let selectedOptions = []

        for (let i = 0; i < selectElement.options.length; i++){
            if (selectElement.options[i].selected){
                selectedOptions.push(selectElement.options[i].value)
            }
        }



        let vals = []
        for (let i = 0; i < selectedOptions.length; i++){
            if (selectedOptions[i] !== ''){
                vals.push(selectedOptions[i])
            }
        }

        // console.log('Selected Options: ', vals)



        // console.log(filteredUsername)
        // console.log(desiredData)
        if (this.givenChoice === "yes"){
            if (this.givenNumber !== 2){
                if (this.givenNumber === 3){
                    desiredData = desiredData.filter(item => item.username !== 'root')
                }
                else if(this.givenNumber === 4){
                    desiredData = desiredData.filter(item => item.username !== 'admin')
                }
                else if(this.givenNumber === 5){
                    desiredData = desiredData.filter(item => item.username !== 'root')
                    desiredData = desiredData.filter(item => item.username !== 'admin')
                }
                else{
                    desiredData = desiredData.filter(item => vals.includes(item.username))
                }
                // console.log(desiredData)
            }
        }
        // console.log(desiredData)
        this.vizPart(desiredData, height, width, svg, usernameCollection, datesOrCountries, periodValue, periodText, periodText2, vals)
    }

    addUserNameFilterOptions(desiredData, parallelCoordinateStarter2, periodValue, periodText, periodText2){
        document.getElementById("usernameFilterDiv").style.width = "1150px"
        document.getElementById("usernameFilterDiv").style.left = parallelCoordinateStarter2

        document.getElementById('usernameTextArea').style.visibility = "visible"
        let svg2 = d3.select("#usernameTextArea")
        svg2.append('text').attr("transform", "translate(0, 20)").text("A maximum of n * 10 usernames are shown, where n is the number of "+periodText+". Usernames can overlap across " + periodText + ".").style("font-size", "20px").style("fill", "red")
        svg2.append('text').attr("transform", "translate(0, 40)").text("Hover on the lines to see the path of a username. Use the below selector or buttons for filtering purposes.").style("font-size", "20px").style("fill", "red")

        svg2.append('text').attr("transform", "translate(0, 60)")
        .text("Do CTRL + Mouse Left Click to see multiple usernames from the below select on the graph.")
        .style("font-size", "20px").style("fill", "red")

        document.getElementById('usernameFilter').style.top = "70px"
        document.getElementById('usernameFilter').style.height = "665px"
        document.getElementById('usernameFilter').style.visibility = "visible"
        document.getElementById('allUsernames').style.visibility = "visible"
        document.getElementById('noRoot').style.visibility = "visible"
        document.getElementById('noAdmin').style.visibility = "visible"
        document.getElementById('noRootAndAdmin').style.visibility = "visible"



        let usernameSelect = document.getElementById("usernameFilter")

        let allUsernames = []
        for (let indivData of desiredData){
            allUsernames.push(indivData['username'])
            let exists = $("#usernameFilter option").filter(function (i, o) { return o.text === indivData['username']; }).length > 0
            if (exists == false){
                let option = document.createElement("option")
                option.value = [indivData['username']]
                option.text = indivData['username']
                usernameSelect.add(option)
            }
        }
    }

    vizPart(data, height, width, svg, usernameCollection, datesOrCountries, periodValue, periodText, periodText2, vals){
        // console.log(data)
        // console.log(datesOrCountries)
        //let lineColorScale = d3.scaleOrdinal(d3.schemeTableau10).domain(usernameCollection)
        let dimensions = datesOrCountries
        //Object.keys(data[0]).filter(function(d) { return d != "username" })
        //console.log(dimensions)
        const y = {}
        for (let i in dimensions) {
            let name = dimensions[i]
            y[name] = d3.scaleLog()
            .clamp(true)
            .domain(d3.extent(data, function(d) { 
                if (d[name] === 0){
                    return 0.1
                }
                else{
                    return +d[name]; 
                }
            }))
            .range([height, 0])
            .nice()
        }
        
        let x = d3.scalePoint()
            .range([0, width])
            .padding(1)
            .domain(dimensions);

        function path(d) {
            return d3.line()(dimensions.map(function(p) { 
                return [x(p), y[p](d[p])]; 
            }));
        }

        // Draw the lines
        svg.selectAll("myPath")
            .data(data)
            .join("path")
            .attr("d",  path)
            .style("fill", "none")
            .attr('stroke-width', 2)
            .style("stroke", "grey")
            //.style("opacity", 0.5)
            .on('mouseover', function(d, i){
                // console.log(this)
                d3.select(this).attr('stroke-width', 5).style("stroke", "red")//.style('opacity', 1)
            })
            .on('mouseout', function(d, i){
                d3.select(this).attr('stroke-width', 2).style("stroke", "grey")//.style('opacity', 0.5)
            })

        
        let tip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 10)
        const stuff = document.getElementById('x')
        stuff.addEventListener("mouseover", (event) => {
            let value = event.target.__data__
            let tiptext = null

            if (value !== null){
                tiptext = value['username']
            }
            tip.style("opacity", 5)
            .html(tiptext)
            .style("left", (event.pageX) + "px")
            .style("top", (event.pageY) + "px")
            .style("font", "55px times")
        })
        stuff.addEventListener("mouseout", (event) => {
            tip.style("opacity", 0)
        })

        //console.log(datesOrCountries)

        let idSelector = function() { return this.id; }
        let checkedBoxes = $(":checkbox:checked").map(idSelector).get()

        let idSelector2 = function() { return this.value; }
        let checkedBoxes2 = $(":checkbox:checked").map(idSelector2).get()
        //console.log(checkedBoxes)
        let weekData = []
        for(let i = 0; i < checkedBoxes.length;i++){
            weekData.push(checkedBoxes[i])
        }
        // console.log(weekData)

        this.hardcodedKeys = {}
        for (let j = 0; j < datesOrCountries.length; j++){
            this.hardcodedKeys[datesOrCountries[j]] = weekData[j]
        }
        // console.log(this.hardcodedKeys)

        this.lineIDs = {}
        let k = 1
        for (let j = 0; j < datesOrCountries.length; j++){
            this.lineIDs[datesOrCountries[j]] = 'ID' + k
            k++
        }
        // console.log(this.lineIDs)
        

        /* Code from line x to y citation:

        Title: Most basic parallel coordinates chart in d3.js
        Author: Holtz, Y
        Date: N/A
        Code version: N/A
        Type: Source Code
        Availability: https://d3-graph-gallery.com/graph/parallel_basic.html

        Notes: Cited code has been modified */

        let that = this

        if (that.givenCountries.length === 1){ 
            svg.selectAll("myAxis")
                .data(dimensions).enter()
                .append("g")
                .style("font", "25px times")
                .attr("transform", function(d) { 
                    return "translate(" + x(d) + ")"; 
                })
                .attr('id', function(d){
                    return that.lineIDs[d]; 
                })
                .each(function(d) { 
                    d3.select(this).call(d3.axisLeft()
                    .tickFormat(x => {
                        if (x === 0.1){
                            return 0
                        }
                        else {
                            let integerCheck = Math.log10(x)
                            if (Number.isInteger(integerCheck)){
                                if (Math.abs(x) >= 1000000){
                                    return (x/1000000).toFixed(1) + 'M'
                                }
                                else if (Math.abs(x) >= 100000){
                                    return (x/1000000).toFixed(2) + 'M'
                                }
                                else if (Math.abs(x) >= 10000){
                                    return (x/1000).toFixed(1) + 'K'
                                }
                                else if (Math.abs(x) >= 1000){
                                    return (x/1000).toFixed(2) + 'K'
                                }
                                else{
                                    return x.toFixed(1) + ''
                                }
                            }
                        }
                    })
                    .scale(y[d])); 
                })
                .append("text")
                .style("text-anchor", "middle")
                .attr("y", 430)
                .text(function(d) { 
                    return d
                })
                .style("fill", "black")
            
        }

        /* Code from line x to y citation:

        Title: How to add an image to an svg container using D3.js
        Author: Cheekkallur, A
        Date: 2013-10-09
        Code version: N/A
        Type: Source Code
        Availability: https://stackoverflow.com/questions/14567809/how-to-add-an-image-to-an-svg-container-using-d3-js

        Notes: Cited code has been modified */
        else{
            let xaxis = svg.selectAll("myAxis")
                .data(dimensions).enter()
                .append("g")
                .style("font", "25px times")
                .attr("transform", function(d) { 
                    return "translate(" + x(d) + ")"; 
                })
                .attr('id', function(d){
                    return that.lineIDs[d]; 
                })
                .each(function(d) { 
                    d3.select(this).call(d3.axisLeft()
                    .tickFormat(x => {
                        if (x === 0.1){
                            return 0
                        }
                        else {
                            let integerCheck = Math.log10(x)
                            if (Number.isInteger(integerCheck)){
                                if (Math.abs(x) >= 1000000){
                                    return (x/1000000).toFixed(1) + 'M'
                                }
                                else if (Math.abs(x) >= 100000){
                                    return (x/1000000).toFixed(2) + 'M'
                                }
                                else if (Math.abs(x) >= 10000){
                                    return (x/1000).toFixed(1) + 'K'
                                }
                                else if (Math.abs(x) >= 1000){
                                    return (x/1000).toFixed(2) + 'K'
                                }
                                else{
                                    return x.toFixed(1) + ''
                                }
                            }
                        }
                    })
                    .scale(y[d])); 
                })
                .append('image')
                .attr('xlink:href', function(d){
                    return 'https://flagcdn.com/32x24/'+d.toLowerCase()+'.png'
                })
                .attr('y', 415)
                .attr('x', -20)
                .attr('width', 32)
                .attr('height', 24)
                // .append("text")
                // .style("text-anchor", "middle")
                // .attr("y", 430)
                // .text(function(d) { 
                //     return d
                // })
                // .style("fill", "black")

            // xaxis.selectAll(".text").each(function(d, i){
            //     console.log(this)
            //     console.log(d)
            //     console.log(i)
            //     d3.select(this)
                
            // })
        }


        /* Code from line x to y citation:

        Title: ChatGPT
        Author: ChatGPT
        Date: 2024-01-12
        Code version: N/A
        Type: Source Code
        Availability: https://chat.openai.com/c/282e226b-1ac3-4382-be85-9ea43e3ab7eb

        Notes: Cited code has been modified */

        let element = document.getElementById("ID1");
        let svgElement = element.closest("svg");
        let svgRect = svgElement.getBoundingClientRect();
        let elementRect = element.getBoundingClientRect();
        let xWithinSvg = elementRect.left - svgRect.left;
        // let yWithinSvg = elementRect.top - svgRect.top;

        let totalDatesLength = datesOrCountries.length
        let element2 = document.getElementById("ID"+totalDatesLength);
        let svgElement2 = element2.closest("svg");
        let svgRect2 = svgElement2.getBoundingClientRect();
        let elementRect2 = element2.getBoundingClientRect();
        let xWithinSvg2 = elementRect2.left - svgRect2.left;
        // let yWithinSvg2 = elementRect2.top - svgRect2.top;


        let xaxistextAtMiddlePoint = (xWithinSvg + xWithinSvg2)/2
        // console.log('A:', xaxistextAtMiddlePoint)

        svg.append('text').attr("transform", "translate("+(xaxistextAtMiddlePoint+25)+",460)").style("text-anchor", "middle")
        .text(function(){
            if (that.givenCountries.length === 1){
                return periodText2
            }
            else{
                return "Countries"
            }
        })
        .style("font-size", "25px")

        svg.append('text').attr("transform", "translate("+(xWithinSvg-60)+",310)rotate(270)").text("Username frequency").style("font-size", "25px")


        /* Code from line x to y citation:

        Title: How to add an image to an svg container using D3.js
        Author: Cheekkallur, A
        Date: 2013-10-09
        Code version: N/A
        Type: Source Code
        Availability: https://stackoverflow.com/questions/14567809/how-to-add-an-image-to-an-svg-container-using-d3-js

        Notes: Cited code has been modified */

        
        if (that.givenCountries.length === 1){   
            svg.append('text').attr("transform", "translate("+(xaxistextAtMiddlePoint+15)+",-20)").style("text-anchor", "middle")
            .text(function(){
                let text
                if (that.givenNumber === 0){
                    text = "All the usernames"
                }
                else if (that.givenNumber === 1){
                    text = vals.join(',')
                }
                else if (that.givenNumber === 2){
                    text = "All the usernames"
                }
                else if (that.givenNumber === 3){
                    text = "Usernames w/out root"
                }
                else if (that.givenNumber === 4){
                    text = "Usernames w/out admin"
                }
                else if (that.givenNumber === 5){
                    text = "Usernames w/out root and admin"
                }
                return "["+text+"]"
            })
            .style("font-size", "25px")

            svg.append('svg:image')
            .attr('xlink:href', 'https://flagcdn.com/32x24/'+this.givenCountries[0].toLowerCase()+'.png')
            .attr('x', (xaxistextAtMiddlePoint+5)).attr('y', -70).attr('width', 32).attr('height', 24).style("text-anchor", "middle")
        }
        else{
            svg.append('text').attr("transform", "translate("+(xaxistextAtMiddlePoint+25)+",-20)").style("text-anchor", "middle")
            .text(function(){
                let text
                if (that.givenNumber === 0){
                    text = "All the usernames"
                }
                else if (that.givenNumber === 1){
                    text = vals.join(',')
                }
                else if (that.givenNumber === 2){
                    text = "All the usernames"
                }
                else if (that.givenNumber === 3){
                    text = "Usernames w/out root"
                }
                else if (that.givenNumber === 4){
                    text = "Usernames w/out admin"
                }
                else if (that.givenNumber === 5){
                    text = "Usernames w/out root and admin"
                }
                return checkedBoxes2[0]+"["+text+"]"
                //return weekData[0]+"[Username Frequency For Countries]"
            })
            .style("font-size", "25px")
        }

    }

    // getFlagEmoji(cc){
    //     const codePoints = cc
    //         .toUpperCase()
    //         .split('')
    //         .map(char =>  127397 + char.charCodeAt());
    //     let b = String.fromCodePoint(...codePoints);
    //     return b
    // }

    fetchData2(){
        let checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
        let selectedWeeksLength = checkedBoxes.length

        let selected = Array.from(checkedBoxes).map(x => x.value)
        // console.log('Weeks:', selected)
        // console.log(this.countryCode)

        // console.log('A:', selected)
        // console.log('B:', this.givenCountries)

        // && Table.countryCode != null

        let that = this
        if ( (selectedWeeksLength >= 2 && this.givenCountries.length === 1)  || 
        (selectedWeeksLength === 1 && this.givenCountries.length >= 2)  ){
            getData2(selected, this.givenCountries).then(function(loadedData){
                that.dataForThirdViz(loadedData, selected)
            })
        }
        else{
            // console.log("not enough checks")
        }
    }

}

async function getData2(selected, countries){
    let givenValue = document.getElementById("data").value
    let givenValue2 = VizScreen.givenTimePeriod



    let api_address = 'https://kibana.emulab.net/top/usernames?cluster='+givenValue+'&cc='+countries.join(',')+'&range='+selected.join(',')+'&period='+givenValue2
    //console.log(api_address)
    const data = await fetch(api_address)
    const jsonData = await data.json()
    
    // console.log('op:', jsonData)
    return jsonData

}