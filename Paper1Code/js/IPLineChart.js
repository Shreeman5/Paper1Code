class IPLineChart{
    static ipData
    static indivIPs
    static resendData
    static resendTimes
    static resendCountries
    static resendBCData

    constructor(givenDate, loadedData, givenCountries, neededData, selected, barChartData){
        this.givenDate = givenDate
        this.loadedData = loadedData
        this.givenCountries = givenCountries
        IPLineChart.ipData = loadedData
        IPLineChart.resendData = neededData
        IPLineChart.resendTimes = selected
        IPLineChart.resendCountries = givenCountries
        IPLineChart.resendBCData = barChartData
    }

    makeLineChart(){
        let relevantIPs = this.loadedData[this.givenDate]
        for (let i = 0; i < relevantIPs.length; i++){
            let givenIP = relevantIPs[i]
            for (const [key, value] of Object.entries(this.loadedData)) {
                let checker = 0
                for (let j = 0; j < value.length; j++){
                    let ipInfo = value[j]
                    if (ipInfo['ip'] === givenIP['ip']){
                        checker = 1
                    }
                }
                if (checker === 0){
                    value.push({'ip':givenIP['ip'], 'count':0})
                }
            }
        }
        
        // console.log(this.loadedData)
        

        let computedLength = Object.keys(this.loadedData).length
        let widthNumber = 0
        let assignedWidth = ''
        if (computedLength <= 6){
            widthNumber = 900
            assignedWidth = widthNumber + 'px'
        }
        else{
            widthNumber = 900 + 100 * (computedLength - 6)
            assignedWidth = widthNumber + 'px'
        }
        document.getElementById("attacksAndAttackers").style.width = assignedWidth

        // console.log(widthNumber)

        let margin = {top: 50, right: 55, bottom: 60, left: 295},
                    width = widthNumber - margin.left - margin.right,
                    height = 740 - margin.top - margin.bottom;

        let svg = d3.select("#attacksAndAttackers")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")")

        let timePeriods = []
        let valuesReceived = []
        for (const [key, value] of Object.entries(this.loadedData)) {
            timePeriods.push(key)
            for (let j = 0; j < value.length; j++){
                let ipInfo = value[j]
                valuesReceived.push(ipInfo['count'])
            }
        }
        let maxValue = Math.max(...valuesReceived)
        // console.log(maxValue)

        let xScale = d3.scalePoint().domain(timePeriods).range([0, width])
        let yScale = d3.scaleLinear().domain([0, maxValue]).range([height, 0])

        let that = this
        svg.append("g")
        .style("font", "20px times")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(xScale));

        svg.append("g").style("font", "20px times")
         .call(d3.axisLeft(yScale).tickFormat(x => that.better(x)))

        let givenIPs = []
        for (let i = 0; i < relevantIPs.length; i++){
            let myIP = relevantIPs[i]
            givenIPs.push(myIP['ip'])
        }
        // console.log(givenIPs)
        IPLineChart.indivIPs = givenIPs
        
        let dataset1 = []
        for (let i = 0; i < givenIPs.length; i++){ 
            let requiredArray = []
            for (const [key, value] of Object.entries(this.loadedData)) {
                for (let j = 0; j < value.length; j++){
                    let ipInfo = value[j]
                    if (ipInfo['ip'] === givenIPs[i]){
                        requiredArray.push([key, ipInfo['count']])
                    }
                }
            }
            dataset1.push([requiredArray, givenIPs[i]])
        }
        // console.log(dataset1)

        let periodValue = VizScreen.givenTimePeriod
        let periodText
        let periodText2
        let xPos
        if (periodValue === "month"){
            periodText = "months"
            periodText2 = "Months"
            xPos = 200
        }
        else if(periodValue === "week"){
            periodText = "weeks"
            periodText2 = "Weeks"
            xPos = 180
        }
        else if (periodValue === "day"){
            periodText = "days"
            periodText2 = "Days"
            xPos = 190
        }
        


        let that2 = this
        let starterY = 311
        for (let i = 0; i < givenIPs.length; i++){
            svg.append('circle').style("fill", d3.schemeTableau10[i]).attr("r", 10).attr("cx", -280).attr("cy", starterY)
            let myTexts = svg.append('text').attr("transform", "translate(-265,"+(starterY+8)+")")
                .text(givenIPs[i]).style("font-size", "20px")
                .style("fill", d3.schemeTableau10[i])
            starterY +=  40

            let tip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 10).style("font-size", "30px")
            myTexts.on("mouseover", function(e) {
                d3.select(this).style("cursor", "pointer")
                let tiptext = "Click to add "+e.srcElement.innerHTML+ " to the 'Selected IPs' list."
                tip.style("opacity", 5)
                .html(tiptext)
                .style("left", (e.pageX) + "px")
                .style("top", (e.pageY) + "px")

                
                $(".lineForIP").remove()
                $(".circForIP").remove()

                for (let i = 0; i < dataset1.length; i++){
                    let givenObj = dataset1[i]
                    let myData = givenObj[0]
                    let myData2 = givenObj[1]

                    let bool 
                    if (myData2 === this.innerHTML){
                        bool = 1
                    }
                    else{
                        bool = 0
                    }


                    this.circles = svg.append('g')
                    .selectAll("dot")
                    .data(myData)
                    .enter()
                    .append("circle")
                    .attr("class", "circForIP") 
                    .attr("cx", function (d) { 
                        return xScale(d[0]); 
                    } )
                    .attr("cy", function (d) { return yScale(d[1]); } )
                    .attr("r", 10)
                    .attr("transform", "translate(" + 0 + "," + 0 + ")")
                    .style("fill", d3.schemeTableau10[i])
                    .attr('stroke-width', function(){
                        if (bool === 0){
                            return 0
                        }
                        else{
                            return 7
                        }
                    })
                    .style("stroke", function(){
                        if (bool === 0){
                            return "blue"
                        }
                        else{
                            return "red"
                        }
                    })
        
                          
                    let line = d3.line()
                    .x(function(d) { return xScale(d[0]); }) 
                    .y(function(d) { return yScale(d[1]); }) 
                    .curve(d3.curveMonotoneX)
                    
                    svg.append("path")
                    .datum(myData) 
                    .attr("class", "lineForIP") 
                    .attr("transform", "translate(" + 0 + "," + 0 + ")")
                    .attr("d", line)
                    .style("fill", "none")
                    .style("stroke", function(){
                        if (bool === 0){
                            return "black"
                        }
                        else{
                            return "red"
                        }
                    })
                    .attr('stroke-width', function(){
                        if (bool === 0){
                            return 2
                        }
                        else{
                            return 7
                        }
                    })
                }

            })
            .on("mouseout", function() {
                tip.style("opacity", 0)
                $(".lineForIP").remove()
                $(".circForIP").remove()

                for (let i = 0; i < dataset1.length; i++){
                    let givenObj = dataset1[i]
                    let myData = givenObj[0]
        
                    this.circles = svg.append('g')
                    .selectAll("dot")
                    .data(myData)
                    .enter()
                    .append("circle")
                    .attr("class", "circForIP") 
                    .attr("cx", function (d) { 
                        return xScale(d[0]); 
                    } )
                    .attr("cy", function (d) { return yScale(d[1]); } )
                    .attr("r", 10)
                    .attr("transform", "translate(" + 0 + "," + 0 + ")")
                    .style("fill", d3.schemeTableau10[i])
        
                          
                    let line = d3.line()
                    .x(function(d) { return xScale(d[0]); }) 
                    .y(function(d) { return yScale(d[1]); }) 
                    .curve(d3.curveMonotoneX)
                    
                    svg.append("path")
                    .datum(myData) 
                    .attr("class", "lineForIP") 
                    .attr("transform", "translate(" + 0 + "," + 0 + ")")
                    .attr("d", line)
                    .style("fill", "none")
                    .style("stroke", "black")
                    .style("stroke-width", "2")
                }

            })

            myTexts.on("click", function(e) {
                //console.log(e.srcElement.innerHTML)
                document.getElementById("crTextArea").style.visibility = "visible"

                if (document.getElementById("text1CR")){
                    document.getElementById("text1CR").remove()
                    document.getElementById("text2CR").remove()
                    document.getElementById("text3CR").remove()
                    document.getElementById("text4CR").remove()
                    document.getElementById("text5CR").remove()
                    document.getElementById("text6CR").remove()
                    document.getElementById("text7CR").remove()
                    document.getElementById("line1CR").remove()
                }

                if (document.getElementById("text8CR")){
                    document.getElementById("text8CR").remove()
                    document.getElementById("text9CR").remove()
                    document.getElementById("text10CR").remove()
                    document.getElementById("text11CR").remove()
                    document.getElementById("line2CR").remove()

                    document.getElementById("text12CR").remove()
                    document.getElementById("text13CR").remove()
                    document.getElementById("text14CR").remove()
                    document.getElementById("text15CR").remove()
                    document.getElementById("text16CR").remove()
                    document.getElementById("text17CR").remove()
                    document.getElementById("text18CR").remove()
                    document.getElementById("line3CR").remove()
           
                    document.getElementById("text19CR").remove()
                    document.getElementById("text20CR").remove()
                    document.getElementById("text21CR").remove()
                    document.getElementById("text22CR").remove()
                    document.getElementById("line4CR").remove()

                    document.getElementById("text23CR").remove()
                    document.getElementById("text24CR").remove()
                    document.getElementById("text25CR").remove()
                    document.getElementById("text26CR").remove()
                    document.getElementById("text27CR").remove()
                    document.getElementById("text28CR").remove()
                    document.getElementById("text29CR").remove()
                    document.getElementById("text30CR").remove()
                    document.getElementById("line5CR").remove()
                }

                let svg2 = d3.select('#crTextArea')

                svg2.append("text").attr("transform", "translate(5, 20)")
                .text("Selection of at least 2 IPs will make 2 text-").style("font-size", "20px").style("fill", "red").attr("id", "text1CR")
                svg2.append("text").attr("transform", "translate(5, 40)")
                .text("boxes and 2 buttons appear on the right.").style("font-size", "20px").style("fill", "red").attr("id", "text2CR")
                svg2.append("text").attr("transform", "translate(5, 60)")
                .text("The button below can be used to remove").style("font-size", "20px").style("fill", "red").attr("id", "text3CR")
                svg2.append("text").attr("transform", "translate(5, 80)")
                .text("IPs from 'selected IPs'. If 'selected IPs' has").style("font-size", "20px").style("fill", "red").attr("id", "text4CR")
                svg2.append("text").attr("transform", "translate(5, 100)")
                .text("no IP, it, along with the button, will").style("font-size", "20px").style("fill", "red").attr("id", "text5CR")
                svg2.append("text").attr("transform", "translate(5, 120)")
                .text("disappear. If 'selected IPs' has 1 IP, things").style("font-size", "20px").style("fill", "red").attr("id", "text6CR")
                svg2.append("text").attr("transform", "translate(5, 140)")
                .text("on the right will disappear.").style("font-size", "20px").style("fill", "red").attr("id", "text7CR")
                svg2.append("line").style("stroke", "black").style("stroke-width", 5).attr('x1', 405).attr('y1', 0).attr('x2', 405).attr('y2', 150).attr("id", "line1CR")
             
                let optionValue = e.srcElement.innerHTML

                // console.log('B:', optionValue)
                let exists = false; 
                $('#ipsClicked  option').each(function(){
                    // console.log('C:', this.value)
                    let thisValHere = this.value
                    if (thisValHere.substring(0, thisValHere.length - 4) == optionValue) {
                        exists = true;
                    }
                });
                
                if (exists === false){
                    let ipsClicked = document.getElementById("ipsClicked")
                    let option = document.createElement("option")
                    // console.log(that2.givenCountries)
                    option.text = optionValue + '--' + that2.getFlagEmoji(that2.givenCountries[0])
                    option.value = optionValue + '--' + that2.givenCountries[0] //+ '|' + 'https://flagcdn.com/32x24/'+that2.givenCountries[0].toLowerCase()+'.png'
                    // option.label = 'https://flagcdn.com/32x24/cn.png'
                    ipsClicked.add(option)
                }


                // that2.updateSelect()

                document.getElementById("ipsClicked").style.visibility = "visible"
                document.getElementById("removeIPButton").style.visibility = "visible"



                if ($('#ipsClicked').children('option').length > 2){
                    svg2.append("text").attr("transform", "translate(415, 20)")
                    .text("The difference between start and end").style("font-size", "20px").style("fill", "red").attr("id", "text8CR")
                    svg2.append("text").attr("transform", "translate(415, 40)")
                    .text(periodValue + " is restricted to no more than 30").style("font-size", "20px").style("fill", "red").attr("id", "text9CR")
                    svg2.append("text").attr("transform", "translate(415, 60)")
                    .text(periodText + '. End ' + periodValue + " has to be greater than").style("font-size", "20px").style("fill", "red").attr("id", "text10CR")
                    svg2.append("text").attr("transform", "translate(415, 80)")
                    .text("start " + periodValue + '.').style("font-size", "20px").style("fill", "red").attr("id", "text11CR")
                    svg2.append("line").style("stroke", "black").style("stroke-width", 5).attr('x1', 805).attr('y1', 0).attr('x2', 805).attr('y2', 150).attr("id", "line2CR")
                    
                    svg2.append("text").attr("transform", "translate(810, 20)")
                    .text("After >= 2 IPs have").style("font-size", "20px").style("fill", "red").attr("id", "text12CR")
                    svg2.append("text").attr("transform", "translate(810, 40)")
                    .text("been selected and").style("font-size", "20px").style("fill", "red").attr("id", "text13CR")
                    svg2.append("text").attr("transform", "translate(810, 60)")
                    .text("start and end "+periodValue+" are").style("font-size", "20px").style("fill", "red").attr("id", "text14CR")
                    svg2.append("text").attr("transform", "translate(810, 80)")
                    .text("specified, hit this").style("font-size", "20px").style("fill", "red").attr("id", "text15CR")
                    svg2.append("text").attr("transform", "translate(810, 100)")
                    .text("button to make a").style("font-size", "20px").style("fill", "red").attr("id", "text16CR")
                    svg2.append("text").attr("transform", "translate(810, 120)")
                    .text("visualization appear").style("font-size", "20px").style("fill", "red").attr("id", "text17CR")
                    svg2.append("text").attr("transform", "translate(810, 140)")
                    .text("below.").style("font-size", "20px").style("fill", "red").attr("id", "text18CR")
                    svg2.append("line").style("stroke", "black").style("stroke-width", 5).attr('x1', 1005).attr('y1', 0).attr('x2', 1005).attr('y2', 150).attr("id", "line3CR")

                    svg2.append("text").attr("transform", "translate(1010, 20)")
                    .text("Export the below").style("font-size", "20px").style("fill", "red").attr("id", "text19CR")
                    svg2.append("text").attr("transform", "translate(1010, 40)")
                    .text("visualization's(if it exists)").style("font-size", "20px").style("fill", "red").attr("id", "text20CR")
                    svg2.append("text").attr("transform", "translate(1010, 60)")
                    .text("IP attack data pattern").style("font-size", "20px").style("fill", "red").attr("id", "text21CR")
                    svg2.append("text").attr("transform", "translate(1010, 80)")
                    .text("into a CSV file.").style("font-size", "20px").style("fill", "red").attr("id", "text22CR")
                    svg2.append("line").style("stroke", "black").style("stroke-width", 5).attr('x1', 1235).attr('y1', 0).attr('x2', 1235).attr('y2', 150).attr("id", "line4CR")


                    svg2.append("text").attr("transform", "translate(1240, 20)")
                    .text("'EXCEPTION'").style("font-size", "20px").style("fill", "purple").attr("id", "text23CR")
                    svg2.append("text").attr("transform", "translate(1370, 20)")
                    .text("= The two").style("font-size", "20px").style("fill", "red").attr("id", "text24CR")
                    svg2.append("text").attr("transform", "translate(1240, 40)")
                    .text("visualizatio.ns below(above the").style("font-size", "20px").style("fill", "red").attr("id", "text25CR")
                    svg2.append("text").attr("transform", "translate(1240, 60)")
                    .text("Go Back button and if they are").style("font-size", "20px").style("fill", "red").attr("id", "text26CR")
                    svg2.append("text").attr("transform", "translate(1240, 80)")
                    .text("on screen) will disappear if time").style("font-size", "20px").style("fill", "red").attr("id", "text27CR")
                    svg2.append("text").attr("transform", "translate(1240, 100)")
                    .text("periods are switched during").style("font-size", "20px").style("fill", "red").attr("id", "text28CR")
                    svg2.append("text").attr("transform", "translate(1240, 120)")
                    .text("analysis or there is only one item").style("font-size", "20px").style("fill", "red").attr("id", "text29CR")
                    svg2.append("text").attr("transform", "translate(1240, 140)")
                    .text("left for the current time period.").style("font-size", "20px").style("fill", "red").attr("id", "text30CR")


                    svg2.append("line").style("stroke", "black").style("stroke-width", 5).attr('x1', 1535).attr('y1', 0).attr('x2', 1535).attr('y2', 150).attr("id", "line5CR")



                    let dateValue = VizScreen.givenTimePeriod

                    if (dateValue === "month"){
                        document.getElementById("startMonthPick").style.visibility = "visible"
                        document.getElementById("endMonthPick").style.visibility = "visible"
                    }
                    else if (dateValue === "week"){
                        document.getElementById("startWeekPick").style.visibility = "visible"
                        document.getElementById("endWeekPick").style.visibility = "visible"
                    }
                    else if (dateValue === "day"){
                        document.getElementById("startDayPick").style.visibility = "visible"
                        document.getElementById("endDayPick").style.visibility = "visible"
                    }
                    document.getElementById("crButton").style.visibility = "visible"
                    document.getElementById("exportIPButton").style.visibility = "visible"
                }



                
            })
        }

        // console.log(dataset1)

        
        for (let i = 0; i < dataset1.length; i++){
            let givenObj = dataset1[i]
            let myData = givenObj[0]

            this.circles = svg.append('g')
            .selectAll("dot")
            .data(myData)
            .enter()
            .append("circle")
            .attr("class", "circForIP") 
            .attr("cx", function (d) { 
                return xScale(d[0]); 
            } )
            .attr("cy", function (d) { return yScale(d[1]); } )
            .attr("r", 10)
            .attr("transform", "translate(" + 0 + "," + 0 + ")")
            .style("fill", d3.schemeTableau10[i])

                  
            let line = d3.line()
            .x(function(d) { return xScale(d[0]); }) 
            .y(function(d) { return yScale(d[1]); }) 
            .curve(d3.curveMonotoneX)
            
            svg.append("path")
            .datum(myData) 
            .attr("class", "lineForIP") 
            .attr("transform", "translate(" + 0 + "," + 0 + ")")
            .attr("d", line)
            .style("fill", "none")
            .style("stroke", "black")
            .style("stroke-width", "2")
        }


        svg.append('svg:image').attr('xlink:href', 'https://flagcdn.com/32x24/'+this.givenCountries[0].toLowerCase()+'.png').attr('x', (widthNumber/2 - 535)).attr('y', -39).attr('width', 32).attr('height', 24)
        svg.append('text').attr("transform", "translate("+(widthNumber/2 - 500)+",-20)").text("[Top 10 IPs of "+this.givenDate+" at most 7 "+periodText+" before and after]").style("font-size", "25px")
        svg.append('text').attr("transform", "translate("+(widthNumber/2 - xPos)+",675)").text(periodText2).style("font-size", "25px")
        svg.append('text').attr("transform", "translate(-70,350)rotate(270)").text("Attacks").style("font-size", "25px")

        let starterValue = 1720
        let barGraphStarter = starterValue + "px" 
        let barGraphStarter2 = starterValue+190 + "px"
        document.getElementById("exportButton").style.visibility = "visible"
        document.getElementById("exportButton").style.left = barGraphStarter

        document.getElementById("goBackButton").style.visibility = "visible"
        document.getElementById("goBackButton").style.left = barGraphStarter2


        svg.append('text').attr("transform", "translate(-292,-30)").text("Click the below IPs to").style("font-size", "20px").style("fill", "red")
        svg.append('text').attr("transform", "translate(-292,-10)").text("add them to the 'selected").style("font-size", "20px").style("fill", "red")
        svg.append('text').attr("transform", "translate(-292,10)").text("IPs' list. If you can't see").style("font-size", "20px").style("fill", "red")
        svg.append('text').attr("transform", "translate(-292,30)").text("the list right now, ").style("font-size", "20px").style("fill", "red")
        svg.append('text').attr("transform", "translate(-292,50)").text("clicking 1 IP will make").style("font-size", "20px").style("fill", "red")
        svg.append('text').attr("transform", "translate(-292,70)").text("it appear above. This is").style("font-size", "20px").style("fill", "red")
        svg.append('text').attr("transform", "translate(-292,90)").text("useful for cross-").style("font-size", "20px").style("fill", "red")
        svg.append('text').attr("transform", "translate(-292,110)").text("reference check of IPs").style("font-size", "20px").style("fill", "red")
        svg.append('text').attr("transform", "translate(-292,130)").text("across countries.").style("font-size", "20px").style("fill", "red")

        svg.append('text').attr("transform", "translate(-292,170)").text("Hover over the below").style("font-size", "20px").style("fill", "red")
        svg.append('text').attr("transform", "translate(-292,190)").text("IPs to see their path in").style("font-size", "20px").style("fill", "red")
        svg.append('text').attr("transform", "translate(-292,210)").text("the linechart.").style("font-size", "20px").style("fill", "red")

        svg.append('text').attr("transform", "translate(-292,250)").text("Hover over the above 2").style("font-size", "20px").style("fill", "red")
        svg.append('text').attr("transform", "translate(-292,270)").text("buttons to know").style("font-size", "20px").style("fill", "red")
        svg.append('text').attr("transform", "translate(-292,290)").text("their functions.").style("font-size", "20px").style("fill", "red")



        

    }

    // createImageElement(src){
    //     const img = document.createElement('img')
    //     img.src = src
    //     img.classList.add('option-image')

    //     console.log(img)
    //     return img
    // }

    // updateSelect(){
    //     const select = document.getElementById("ipsClicked")
    //     const options = select.getElementsByTagName('option')

    //     for (let i = 0; i < options.length; i++){
    //         const option = options[i]
    //         const imageUrl = option.label

    //         if (imageUrl){
    //             const img = this.createImageElement(imageUrl)

    //             // option.textContent = ''
    //             option.appendChild(img)
    //         }
    //     }
    // }

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


}


function goBack(){
    document.getElementById("exportButton").style.visibility = "hidden"
    document.getElementById("goBackButton").style.visibility = "hidden"
    document.getElementById("attacksAndAttackers").innerHTML = ""
    let aAndALineChart = new AttacksAndAttackers(IPLineChart.resendCountries)
    aAndALineChart.dataForSecondViz(IPLineChart.resendData, IPLineChart.resendTimes, IPLineChart.resendBCData)
}

function exportData(){
    console.log(IPLineChart.ipData)
    let allRows = []

    let headerRow = ['IP']
    for (const [key, value] of Object.entries(IPLineChart.ipData)) {
        headerRow.push(key)
    }
    allRows.push(headerRow)

    for (let i = 0; i < IPLineChart.indivIPs.length; i++){ 
        let ipRow = [IPLineChart.indivIPs[i]]
        for (const [key, value] of Object.entries(IPLineChart.ipData)) {
            for (let j = 0; j < value.length; j++){
                let thing = value[j]
                if (thing['ip'] === IPLineChart.indivIPs[i]){
                    ipRow.push(better2(thing['count']))
                }
            }
        }
        allRows.push(ipRow)
    }
    console.log(allRows)

    let csvContent = "data:text/csv;charset=utf-8,";
    
    allRows.forEach(function(rowArray) {
        let row = rowArray.join(",");
        csvContent += row + "\r\n";
    })

    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri)
}

function better2(value){
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
