class StackedHorizontalBarGraph{

    constructor(givenCountries){
        this.givenCountries = givenCountries
        // console.log(givenCountries)
    }


    dataForFifthViz(neededData){
        // console.log(neededData)

        let idSelector = function() { return this.value; }
        let checkedBoxes = $(":checkbox:checked").map(idSelector).get()

        let heightNumber = 0
        let assignedHeight = ''

        let workingLength = 0
        if (checkedBoxes.length > this.givenCountries.length){
            workingLength = checkedBoxes.length
        }
        else{
            workingLength = this.givenCountries.length
        }


        if (workingLength <= 2){
            heightNumber = 260
            assignedHeight = heightNumber + 'px'
        }
        else{
            heightNumber = 260 + (75 * (workingLength - 2))
            assignedHeight = heightNumber + 'px'
        }


        let margin = {top: 50, right: 40, bottom: 60, left: 140},
        width = 750 - margin.left - margin.right,
        height = heightNumber - margin.top - margin.bottom;

        let starterValue = document.getElementById('predictionTable').offsetWidth + 730
        let stackedHorizontalBarGraphStarter = starterValue + "px"
        let stackedHorizontalBarGraphStarter2 = (starterValue-5) + "px"
        // let parallelCoordinateStarter2 = (starterValue-10) + "px"

        document.getElementById("stackedHorizontalDiv").style.left = stackedHorizontalBarGraphStarter2
        // document.getElementById('usernameTextArea').style.visibility = "visible"

        document.getElementById("shbgTextArea").style.width = "760px"
        document.getElementById("stackedHorizontalDiv").style.width = "760px"
        let svg2 = d3.select("#shbgTextArea")

        svg2.append('rect').style("fill", "navy").style("stroke", "black").style("stroke-width", "3px").attr("x", 0).attr("y", 60).attr("height", 20).attr("width", 40)
        svg2.append('text').attr("transform", "translate(45, 75)").text("Hosting").style("font-size", "20px")

        svg2.append('rect').style("fill", "grey").style("stroke", "black").style("stroke-width", "3px").attr("x", 120).attr("y", 60).attr("height", 20).attr("width", 40)
        svg2.append('text').attr("transform", "translate(165, 75)").text("Isp").style("font-size", "20px")

        svg2.append('rect').style("fill", "maroon").style("stroke", "black").style("stroke-width", "3px").attr("x", 200).attr("y", 60).attr("height", 20).attr("width", 40)
        svg2.append('text').attr("transform", "translate(245, 75)").text("Education").style("font-size", "20px")

        svg2.append('rect').style("fill", "purple").style("stroke", "black").style("stroke-width", "3px").attr("x", 340).attr("y", 60).attr("height", 20).attr("width", 40)
        svg2.append('text').attr("transform", "translate(385, 75)").text("Business").style("font-size", "20px")

        svg2.append('rect').style("fill", "black").style("stroke", "black").style("stroke-width", "3px").attr("x", 470).attr("y", 60).attr("height", 20).attr("width", 40)
        svg2.append('text').attr("transform", "translate(515, 75)").text("NONE").style("font-size", "20px")

        svg2.append('text').attr("transform", "translate(0, 105)").text("Hover on the rectangles to know exact attack numbers.").style("font-size", "20px").style("fill", "red")



        document.getElementById("stackedHorizontalBarGraph").style.outline = "5px dashed black"
        document.getElementById("stackedHorizontalBarGraph").style.left = stackedHorizontalBarGraphStarter
        document.getElementById("stackedHorizontalBarGraph").style.top = "1520px"
        document.getElementById("stackedHorizontalBarGraph").style.width = "750px"
        document.getElementById("stackedHorizontalBarGraph").style.height = assignedHeight

        const svg = d3.select("#stackedHorizontalBarGraph")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")")

        // .attr("id", "x")


        let keys = ["hosting", "isp", "education", "business", "NONE"]

        let myData = []
        let timeOrCountry

        if (checkedBoxes.length > this.givenCountries.length){
            for (const [key, value] of Object.entries(neededData)){
                for (const [key2, value2] of Object.entries(value)){
                    let ispVal = 0
                    let hostingVal = 0
                    let businessVal = 0
                    let educationVal = 0
                    let NONEval = 0
                    for (let values of value2){
                        if (values['asn_type'] === 'isp'){
                            ispVal = values['count']
                        }
                        else if (values['asn_type'] === 'hosting'){
                            hostingVal = values['count']
                        }
                        else if (values['asn_type'] === 'business'){
                            businessVal = values['count']
                        }
                        else if (values['asn_type'] === 'education'){
                            educationVal = values['count']
                        }
                        else if (values['asn_type'] === 'NONE'){
                            NONEval = values['count']
                        }
                    }
                    let totalVal = ispVal+hostingVal+businessVal+educationVal+NONEval
                    myData.push({'Date':key2, 'hosting':hostingVal, 'isp':ispVal, 'education':educationVal, 'business':businessVal, 'NONE':NONEval, 'total':totalVal})
                }
            }
            timeOrCountry = 'Time'
        }
        else{
            for (const [key, value] of Object.entries(neededData)){
                for (const [key2, value2] of Object.entries(value)){
                    let ispVal = 0
                    let hostingVal = 0
                    let businessVal = 0
                    let educationVal = 0
                    let NONEval = 0
                    for (let values of value2){
                        if (values['asn_type'] === 'isp'){
                            ispVal = values['count']
                        }
                        else if (values['asn_type'] === 'hosting'){
                            hostingVal = values['count']
                        }
                        else if (values['asn_type'] === 'business'){
                            businessVal = values['count']
                        }
                        else if (values['asn_type'] === 'education'){
                            educationVal = values['count']
                        }
                        else if (values['asn_type'] === 'NONE'){
                            NONEval = values['count']
                        }
                    }
                    let totalVal = ispVal+hostingVal+businessVal+educationVal+NONEval
                    myData.push({'Country':key, 'hosting':hostingVal, 'isp':ispVal, 'education':educationVal, 'business':businessVal, 'NONE':NONEval, 'total':totalVal})
                }
            }
            timeOrCountry = 'Country'
        }

        // console.log(myData)

        this.drawStackedbarGraph(keys, myData, svg, width, height, timeOrCountry, checkedBoxes)
    }

    /* Code from line x to y citation:

    Title: Horizontal Stacked Bar Chart
    Author: Reid, A
    Date: 2018-06-04
    Code version: N/A
    Type: Source Code
    Availability: https://gist.github.com/Andrew-Reid/0aedd5f3fb8b099e3e10690bd38bd458

    Notes: Cited code has been modified */
    drawStackedbarGraph(keys, data, svg, width, height, timeOrCountry, checkedBoxes){
        data.reverse()
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

        let y = d3.scaleBand()			// x = d3.scaleBand()	
        .rangeRound([0, height])	// .rangeRound([0, width])
        .paddingInner(0.05)
        .align(0.1);
    
        let x = d3.scaleLinear()		// y = d3.scaleLinear()
            .rangeRound([0, width]);	// .rangeRound([height, 0]);
    
        var z = d3.scaleOrdinal()
            .range(["navy", "grey", "maroon", "purple", "black"]);

        // myData.sort(function(a, b) { return b.total - a.total; });
        if (timeOrCountry === 'Time'){
            y.domain(data.map(function(d) { return d.Date; }));	
        }
        else{
            y.domain(data.map(function(d) { return d.Country; }));	
        }
        x.domain([0, d3.max(data, function(d) { return d.total; })]).nice();	// y.domain...
        z.domain(keys);


        let that = this
        let tip = d3.select("body").append("div").attr("class", "tooltip").attr("id", "aAndATooltip").style("opacity", 10).style("font-size", "30px")
        svg.append("g")
            .selectAll("g")
            .data(d3.stack().keys(keys)(data))
            .enter().append("g")
            .attr("fill", function(d) { return z(d.key); })
            .selectAll("rect")
            .data(function(d) { return d; })
            .enter().append("rect")
            .attr("y", function(d) { 
                if (timeOrCountry === 'Time'){
                    return y(d.data.Date); 
                }
                else{
                    return y(d.data.Country); 
                }
            })	    //.attr("x", function(d) { return x(d.data.State); })
            .attr("x", function(d) { return x(d[0]); })			    //.attr("y", function(d) { return y(d[1]); })	
            .attr("width", function(d) { return x(d[1]) - x(d[0]); })	//.attr("height", function(d) { return y(d[0]) - y(d[1]); })
            .attr("height", y.bandwidth())				    //.attr("width", x.bandwidth());	
            .attr("stroke-width", 2)
            .attr("stroke", "black")
            .on('mouseover', function(e, d){
                d3.select(this).attr('stroke-width', 5).style("stroke", "red")//.style('opacity', 1)
                let tiptext = that.better(d[1] - d[0]) + " Attacks"
                tip.style("opacity", 5)
                    .html(tiptext)
                    .style("left", (e.pageX) + "px")
                    .style("top", (e.pageY) + "px")
                    .style("width", "200px")
            })
            .on('mouseout', function(d, i){
                d3.select(this).attr('stroke-width', 2).style("stroke", "black")//.style('opacity', 0.5)
                tip.style("opacity", 0)
            })
        
        if (timeOrCountry === 'Time'){ 
            svg.append("g").style("font", function(){
                    return "20px times"
            })
            .style("text-anchor", "end")
                .attr("transform", "translate(0,0)") 						//  .attr("transform", "translate(0," + height + ")")
                .call(d3.axisLeft(y).tickFormat(function(d){
                    return d
                }));									//   .call(d3.axisBottom(x));
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
            let yaxis = svg.append("g").style("font", function(){
                return "20px times"
            })
            .style("text-anchor", "end")
                .attr("transform", "translate(0,0)") 						//  .attr("transform", "translate(0," + height + ")")
                .call(d3.axisLeft(y).tickFormat(function(d){
                    return d
                }));	


            yaxis.selectAll(".tick").each(function(d, i){
                // console.log(this)
                // console.log(d)
                // console.log(i)
                d3.select(this)
                .append('image')
                .attr('xlink:href', 'https://flagcdn.com/32x24/'+d.toLowerCase()+'.png')
                .attr('x', -40)
                .attr('y', -15)
                .attr('width', 32)
                .attr('height', 24)
            })
        }

        svg.append("g").style("font", "20px times")
            .attr("transform", "translate(0,"+height+")")				// New line
            .call(d3.axisBottom(x).ticks(5).tickFormat(function(d){
                return that.better(d)
            }))					//  .call(d3.axisLeft(y).ticks(null, "s"))
            .append("text")
            .attr("y", 2)												//     .attr("y", 2)
            .attr("x", x(x.ticks().pop()) + 0.5) 						//     .attr("y", y(y.ticks().pop()) + 0.5)
            .attr("dy", "0.32em")										//     .attr("dy", "0.32em")
            .attr("fill", "#000")
            .attr("font-weight", "bold")
            .attr("text-anchor", "start")
            // .text("Population")
            // .attr("transform", "translate("+ (-width) +",-10)");   	// Newline


        
        /* Code from line x to y citation:

        Title: How to add an image to an svg container using D3.js
        Author: Cheekkallur, A
        Date: 2013-10-09
        Code version: N/A
        Type: Source Code
        Availability: https://stackoverflow.com/questions/14567809/how-to-add-an-image-to-an-svg-container-using-d3-js

        Notes: Cited code has been modified */
        if (timeOrCountry === 'Time'){
            svg.append('text').attr("transform", "translate(-110,"+(height/2)+")rotate(270)").text(periodText2).style("font-size", "25px").style("text-anchor", "middle")
            svg.append('svg:image').attr('xlink:href', 'https://flagcdn.com/32x24/'+this.givenCountries[0].toLowerCase()+'.png').attr('x', 70).attr('y', -40).attr('width', 32).attr('height', 24)
            svg.append('text').attr("transform", "translate(240,-20)").text("[ASN_type Distribution]").style("font-size", "25px").style("text-anchor", "middle")
        }
        else{
            svg.append('text').attr("transform", "translate(-110,"+(height/2)+")rotate(270)").text("Countries").style("font-size", "25px").style("text-anchor", "middle")
            svg.append('text').attr("transform", "translate(240,-20)").text(checkedBoxes[0]+"[ASN_type Distribution]").style("font-size", "25px").style("text-anchor", "middle")
        }

        svg.append('text').attr("transform", "translate(270,"+(height + 50)+")").text("ASN_type Attacks").style("font-size", "25px").style("text-anchor", "middle")

        
        // console.log(myData)
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


    fetchData4(){
        let checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
        let selectedWeeksLength = checkedBoxes.length

        let selected = Array.from(checkedBoxes).map(x => x.value)
        // console.log('Weeks:', selected)
        // console.log(this.countryCode)

        let that = this
        if ( (selectedWeeksLength >= 2 && this.givenCountries.length === 1)  || 
        (selectedWeeksLength === 1 && this.givenCountries.length >= 2)  ){
            getData7(selected, this.givenCountries).then(function(loadedData){
                that.dataForFifthViz(loadedData, selected)
            })
        }
        else{
            // console.log("not enough checks")
        }
    }

}


async function getData7(selected, countries){
    let givenValue = document.getElementById("data").value
    let givenValue2 = VizScreen.givenTimePeriod

    let api_address = 'https://kibana.emulab.net/top/asn/type?cluster='+givenValue+'&cc='+countries.join(',')+'&range='+selected.join(',')+'&period='+givenValue2
    //console.log(api_address)
    const data = await fetch(api_address)
    const jsonData = await data.json()
    
    //console.log('op:', jsonData)
    return jsonData

}
