class VizScreen{

    constructor(summaryData, selectedTimes, timePeriod, startDate, endDate){
        let countries = []
        for (let continent of summaryData){
            for (let country of continent.meta){
                countries.push(country)
            }
        }

        VizScreen.summaryData = summaryData
        VizScreen.givenData = countries
        VizScreen.givenTimes = selectedTimes
        VizScreen.givenTimePeriod = timePeriod
        VizScreen.absoluteAnomVal
        VizScreen.percentAnomVal
        VizScreen.percentMaxVal
        VizScreen.startDate = startDate
        VizScreen.endDate = endDate

    }


    initializeProgram(){
        //set Time period Text for Initial Variable Div
        removeTimePeriodText()
        addTimePeriodText()
         //Fill Gaps in Date in Data, 1st and very crucial step
        fillInDateGapsForData()
        //write span texts
        spanTexts()
        //show reset and country and base and dependent and independent and sort div
        showThingsOnScreen() 
        //reveal information about changing ranges, options, texboxes and buttons making the visualizations on the right disappear
        removeInfoText()
        addInfoText()
        //add and remove countries
        removeCountries()
        addCountries()
        //add and remove base time period options
        removeBaseOptions()
        optionsForBaseSelections() 
        //add and remove stuff in dependent filters
        removeDependentFiltersStuff()
        addDependentFiltersStuff()
        //add and remove stuff in independent div
        removeIndependentFiltersStuff()
        addIndependentFiltersStuff()
        //add and remove sort time period options()
        removeSortStuff()
        optionsForSortSelections()
        //removing and adding things for linechart
        removeTextsFromLinechart()
        makeDoubleSidedLineChart("non-country")
        //adding and removing things for table and tableLegend
        removeTableTHelements()
        removeTableShapes()
        removeTableLegend()
        removeRedSpotFromTable()
        makeTableTHstructure()
        makeTable("non-country")
        //adding and removing things for bar graph && line chart
        removeBarGraphLineChartandAssociatedItems()
        removeParallelCoordinateandAssociatedItems()
        removeStackedHorizontalBarGraphandAssociatedItems()
    }
}


function removeTimePeriodText(){
    document.getElementById('initialDivText').innerHTML = ''
}

function addTimePeriodText(){
    let val = VizScreen.givenTimePeriod
    let val2 
    if (val === 'day'){
        val2 = 'Day'
    }
    else if (val === 'week'){
        val2 = 'Week'
    }
    else if (val === 'month'){
        val2 = 'Month'
    }
    document.getElementById('initialDivText').innerHTML = 'Current Time Period: ' + val2
}


function fillInDateGapsForData(){
    for (let country of VizScreen.givenData){
        for (let time of VizScreen.givenTimes){
            if (time in country){
                continue
            }
            else{
                country[time] = {attacks: 0, attackers: 0}
            }
        }
    }
}

function spanTexts(){
    document.getElementById('spanText1').innerHTML = "The histogram below shows the distribution of percentage change numbers given a base "+VizScreen.givenTimePeriod+" to other non-base "+VizScreen.givenTimePeriod+"(s). <br/> <br/> Use the slider to filter countries in the table and the linechart that had a percentage increase of more than or equal to x(where x is the number on the slider and text box) from base "+VizScreen.givenTimePeriod+" to any other non base "+VizScreen.givenTimePeriod+"(s). While this slider is used, the other sliders are set to their minimum values which means that they don't affect the filtering.<br/> <br/>X-axis shows the percentage change bins while y-axis shows the frequency of these bins. Hover on the bins to know exact details. <br/> <br/> Use the choose box for quicker filtering. Use the textbox to enter exact numbers(to counter slider sensitivity)."
    document.getElementById('spanText2').innerHTML = "The histogram below shows the distribution of absolute change numbers given a base "+VizScreen.givenTimePeriod+" to other non-base "+VizScreen.givenTimePeriod+"(s). <br/> <br/> Use the slider to filter countries in the table and the linechart that had an absolute increase of more than or equal to x(where x is the number on the slider and text box) from base "+VizScreen.givenTimePeriod+" to any other non base "+VizScreen.givenTimePeriod+"(s). While this slider is used, the other sliders are set to their minimum values which means that they don't affect the filtering.<br/> <br/>X-axis shows the absolute change bins while y-axis shows the frequency of these bins. Hover on the bins to know exact details.  <br/> <br/> Use the choose box for quicker filtering. Use the textbox to enter exact numbers(to counter slider sensitivity)."
    document.getElementById('spanText3').innerHTML = "The histogram below shows the distribution of absolute numbers for all the "+VizScreen.givenTimePeriod+"s. <br/> <br/>  Use the slider to filter countries in the table and the linechart that had an absolute attack number of more than or equal to x(where x is the number on the slider and text box). While this slider is used, the other sliders are set to their minimum values which means that they don't affect the filtering.<br/> <br/> X-axis shows the absolute number bins while y-axis shows the frequency of these bins. Hover on the bins to know exact details.  <br/> <br/> Use the choose box for quicker filtering. Use the textbox to enter exact numbers(to counter slider sensitivity)."
}


function showThingsOnScreen(){
    document.getElementById("infoLegend").style.visibility = "visible"
    document.getElementById("resetButton").style.visibility = "visible"
    document.getElementById("countryOptions").style.visibility = "visible"
    document.getElementById("baseTPDiv").style.visibility = "visible"
    let myTab = document.getElementsByClassName("tab");
    for(let i = 0; i < myTab.length; i++)
    {
        myTab[i].style.visibility="visible";
    }
    document.getElementById("dependentDiv").style.visibility = "visible"
    document.getElementById("dependentDiv2").style.visibility = "visible"
    document.getElementById("independentDiv").style.visibility = "visible"
    document.getElementById("sortTPDiv").style.visibility = "visible"
    let lineChartDiv = document.getElementsByClassName("linechartView");
    for(let i = 0; i < lineChartDiv.length; i++)
    {
        lineChartDiv[i].style.visibility="visible";
    }
    document.getElementById("view").style.visibility = "visible"
    document.getElementById("tableLegend").style.visibility = "visible"
    document.getElementById("attacksAndAttackers").style.visibility = "visible"
}

function removeInfoText(){
    if (document.getElementById("textArea")){
        document.getElementById("textArea").innerHTML = ""
    }
}


function addInfoText(){
    let svg = d3.select('#textArea')
    svg.append("text").attr("x", 28).attr("y", 25).text("IMPORTANT!!! If any of the filters(sliders, textboxes, chooseboxes or buttons) from below, including the filters in the tab, are modified,").style("font", "30px times").attr("fill", "red")
    svg.append("text").attr("x", 28).attr("y", 55).text("the visualizations to the right(unless labelled").style("font", "30px times").attr("fill", "red")
    svg.append("text").attr("x", 568).attr("y", 55).text("'EXCEPTION'").style("font", "30px times").attr("fill", "purple")
    svg.append("text").attr("x", 748).attr("y", 55).text(") of the calendar heatmap(if they are on screen right now) will disappear.").style("font", "30px times").attr("fill", "red")
    svg.append("text").attr("x", 28).attr("y", 85).text("INITIAL STATE = State where all the sliders, texboxes and choose boxes will be reset to initial values. Of the visualizations below or").style("font", "30px times").attr("fill", "red")
    svg.append("text").attr("x", 28).attr("y", 115).text("right(unless labelled").style("font", "30px times").attr("fill", "red")
    svg.append("text").attr("x", 278).attr("y", 115).text("'EXCEPTION'").style("font", "30px times").attr("fill", "purple")
    svg.append("text").attr("x", 458).attr("y", 115).text(") of this, only the table and linechart below will remain.").style("font", "30px times").attr("fill", "red")
}


function removeCountries(){
    $('#countries').find('option').remove()
}

function addCountries(){
    let countrySelect = document.getElementById("countries")
    for (let country of VizScreen.givenData){
        let option = document.createElement("option")
        option.value = country.country
        option.text = country.country
        countrySelect.appendChild(option)
    }
}




function removeBaseOptions(){
    $('#baseTP').find('option').remove()
}


function optionsForBaseSelections(){
    document.getElementById("baseTP").style.width = "200px"
    document.getElementById("baseTP").style.height = "50px"
    let baseSelect = document.getElementById("baseTP")
    let x = 1
    for (let time of VizScreen.givenTimes){
        let option = document.createElement("option")
        option.value = time
        option.text = 'Base -- ' + time//'TP' + x
        baseSelect.add(option)
        x += 1
    }
}



function removeDependentFiltersStuff(){
    //percentage change 
    if (document.getElementById("svg1")){
        document.getElementById("svg1").innerHTML = ""
    }
    $('#PERCHANGECHOOSE').find('option').not(':first').remove()
    let perOutput = document.getElementById("PERCHANGEWRITE")
    perOutput.value = ''
    perOutput.placeholder = ''


    //absolute change
    if (document.getElementById("svg2")){
        document.getElementById("svg2").innerHTML = ""
    }
    $('#ABSCHANGECHOOSE').find('option').not(':first').remove()
    let absOutput = document.getElementById("ABSCHANGEWRITE")
    absOutput.value = ''
    absOutput.placeholder = ''
}


function neededTickValues(maxY){
    // let a = 10
    // let i = 0
    // let returnArr = []
    // while (Math.pow(a, i) < maxY){
    //     returnArr.push(Math.pow(a, i))
    //     i++
    // }
    // returnArr.push(maxY)
    // return returnArr
    if (maxY > 32){
        return [1, 10, maxY]
    }
    else if (maxY > 2){
        return [1, maxY]
    }
    else if (maxY > 1){
        return [2]
    }
    else{
        return [1]
    }
}



function addPercentageChangeHistogram(svg, percentSliderMin, percentSliderMax, allNumbers){
    let margin = ({top: 10, right: 0, bottom: 10, left: 80})
    let height = 160
    let width = 770

    percentSliderMin = Number(percentSliderMin)
    percentSliderMax = Number(percentSliderMax)
    let midNum = (percentSliderMin+percentSliderMax)/2
    let IQ1 = (percentSliderMin+midNum)/2
    let IQ3 = (midNum+percentSliderMax)/2
    let fiveNumbers = [percentSliderMin, IQ1, midNum, IQ3, percentSliderMax]
    
    // console.log(fiveNumbers)
    let xAxis = d3.scaleLinear().domain([percentSliderMin, percentSliderMax]).range([margin.left, width - margin.right])
    
    let that = this
    svg.append("g")
        .style("font", "20px times")
        .attr("transform", "translate(0," + (height - margin.bottom) + ")")
        .call(d3.axisBottom(xAxis).tickValues(fiveNumbers).tickFormat(function(d){
            return that.fixNumbers(d)
        }))
        

    let histogram = d3.histogram()
                    // .value(function(d) { 
                    //     return d
                    // })   
                    .domain(xAxis.domain()) 
                    .thresholds(d3.range(percentSliderMin, percentSliderMax, (percentSliderMax - percentSliderMin)/100)); 

    let bins = histogram(allNumbers)

    // console.log(bins)
    
    // let minY = 0
    let maxY = d3.max(bins, function(d) { return d.length; })
    // let avgY = (minY+maxY)/2
    let receivedTickValues = neededTickValues(maxY)

    let yAxis = d3.scaleLog().domain([.1, maxY]).nice().range([height - margin.bottom, margin.top]);
    yAxis.clamp(true)
    // //yAxis;   // d3.hist has to be called before the Y axis obviously
    
    svg.append("g")
    .style("font", "20px times")
    .attr("transform", "translate("+margin.left+"," + 0 + ")")
    .call(d3.axisLeft(yAxis).tickValues(receivedTickValues).tickFormat(function(d){
        // console.log(d)
        return that.fixNumbers(d)
    }))

    this.rect = svg.selectAll("rect")
    .data(bins)
    .enter()
    .append("rect")
      .attr("x", d =>  xAxis(d.x0) + 1)
    //   .attr("transform", function(d) { return "translate(" + (xAxis(d.x0)+20) + "," + yAxis(d.length) + ")"; })
      .attr("width", function(d) { return xAxis(d.x1) - xAxis(d.x0) - 1 ; })
      .attr("y", d => yAxis(d.length))
      .attr("height", function(d) { 
        // console.log(d)
        // console.log(yAxis(d.length))
        return yAxis.range()[0] - yAxis(d.length); 
    })
    .style("fill", "#69b3a2")


    this.rect.on("mouseover", function(e, d) {
        d3.select(this).attr('stroke-width', 3).attr("stroke", "black")
            .append("title")
            .text(d => "Bin size: "+d.length+ "\u000d"+"Bin LowerLimit : " + fixNumbers(d.x0) + "\u000d" +"Bin UpperLimit : "+ fixNumbers(d.x1));
    })
    .on("mouseout", function(e, d) {
        d3.select(this).attr('stroke-width', 0)
    })
}




function addOptionsForPercentageChangeSlider(){
    // $('#PERCHANGECHOOSE').find('option').remove()
    let baseSelect = document.getElementById("PERCHANGECHOOSE")
    let givenOptions = ["0) Show all countries from data in Table and Linechart and the number distribution in Histogram",
                        "1) Show all countries with Relative Percent decrease(from base TP) in Table and Linechart and the number distribution in Histogram",
                        "2) Show all countries with Relative Percent increase(from base TP) in Table and Linechart and the number distribution in Histogram",
                        "3) Show all countries with Relative Percent increase by at least 100%(from base TP) in Table and Linechart and the number distribution in Histogram",
                        "4) Show all countries with Relative Percent increase by at least 1K%(from base TP) in Table and Linechart and the number distribution in Histogram",
                        "5) Show all countries with Relative Percent increase by at least 10K%(from base TP) in Table and Linechart and the number distribution in Histogram",
                        "6) Show all countries with Relative Percent increase by at least 0.1M%(from base TP) in Table and Linechart and the number distribution in Histogram",
                        "7) Show all countries with Relative Percent increase by at least 1M%(from base TP) in Table and Linechart and the number distribution in Histogram"]
    for (let i = 0; i < givenOptions.length; i++){
        let maximumVal = document.getElementById("myRange1").max
        if (maximumVal < 100 && i >= 3){
            break
        }
        if (maximumVal < 1000 && i >= 4){
            break
        }
        if (maximumVal < 10000 && i >= 5){
            break
        }
        if (maximumVal < 100000 && i >= 6){
            break
        }
        if (maximumVal < 1000000 && i >= 7){
            break
        }

        let option = document.createElement("option")
        option.value = i + 'A'
        option.text = givenOptions[i]
        baseSelect.add(option)
    }
}

function addAbsoluteChangeHistogram(svg2, absoluteSliderMin, absoluteSliderMax, allNumbers2){
    let margin = ({top: 10, right: 0, bottom: 10, left: 70})
    let height = 160
    let width = 770

    let midNum = (absoluteSliderMin+absoluteSliderMax)/2
    let IQ1 = (absoluteSliderMin+midNum)/2
    let IQ3 = (midNum+absoluteSliderMax)/2
    let fiveNumbers = [absoluteSliderMin, IQ1, midNum, IQ3, absoluteSliderMax]
    let xAxis = d3.scaleLinear().domain([absoluteSliderMin, absoluteSliderMax]).range([margin.left, width - margin.right])
    let that = this
    svg2.append("g")
        .style("font", "20px times")
        .attr("transform", "translate(0," + (height - margin.bottom) + ")")
        .call(d3.axisBottom(xAxis).tickValues(fiveNumbers).tickFormat(function(d){
            return that.fixNumbers(d)
        }))
        

    let histogram = d3.histogram()
                    // .value(function(d) { 
                    //     return d
                    // })   
                    .domain(xAxis.domain()) 
                    .thresholds(d3.range(absoluteSliderMin, absoluteSliderMax, (absoluteSliderMax - absoluteSliderMin)/100)); 

    let bins = histogram(allNumbers2)
    
    // let minY = 0
    let maxY = d3.max(bins, function(d) { return d.length; })
    // let avgY = (minY+maxY)/2
    let receivedTickValues = neededTickValues(maxY)


    //console.log(maxY)

    let yAxis = d3.scaleLog().domain([.1, maxY]).nice().range([height - margin.bottom, margin.top]);
    yAxis.clamp(true) // d3.hist has to be called before the Y axis obviously
    
    svg2.append("g")
    .style("font", "20px times")
    .attr("transform", "translate("+margin.left+"," + 0 + ")")
    .call(d3.axisLeft(yAxis).tickValues(receivedTickValues).tickFormat(function(d){
        return that.fixNumbers(d)
    }))

    this.rect = svg2.selectAll("rect")
    .data(bins)
    .enter()
    .append("rect")
      .attr("x", d =>  xAxis(d.x0) + 1)
      //.attr("transform", function(d) { return "translate(" + (xAxis(d.x0)+20) + "," + yAxis(d.length) + ")"; })
      .attr("width", function(d) { return xAxis(d.x1) - xAxis(d.x0) - 1 ; })
      .attr("y", d => yAxis(d.length))
      .attr("height", function(d) { return yAxis.range()[0] - yAxis(d.length);  })
      .style("fill", "#69b3a2")

    this.rect.on("mouseover", function(e, d) {
        d3.select(this).attr('stroke-width', 3).attr("stroke", "black")
            .append("title")
            .text(d => "Bin size: "+d.length+ "\u000d"+"Bin LowerLimit : " + fixNumbers(d.x0) + "\u000d" +"Bin UpperLimit : "+ fixNumbers(d.x1));
    })
    .on("mouseout", function(e, d) {
        d3.select(this).attr('stroke-width', 0)
    })
}



function addOptionsForAbsoluteChangeSlider(){
    // $('#ABSCHANGECHOOSE').find('option').remove()
    let baseSelect = document.getElementById("ABSCHANGECHOOSE")
    let givenOptions = ["0) Show all countries from data in Table and the number distribution in Histogram",
                        "1) Show all countries with Absolute decrease(from base TP) in Table and Linechart and the number distribution in Histogram",
                        "2) Show all countries with Absolute increase(from base TP) in Table and Linechart and the number distribution in Histogram",
                        "3) Show all countries with Absolute increase by at least 1K(from base TP) in Table and Linechart and the number distribution in Histogram",
                        "4) Show all countries with Absolute increase by at least 10K(from base TP) in Table and Linechart and the number distribution in Histogram",
                        "5) Show all countries with Absolute increase by at least 0.1M(from base TP) in Table and Linechart and the number distribution in Histogram",
                        "6) Show all countries with Absolute increase by at least 1M(from base TP) in Table and Linechart and the number distribution in Histogram"]
    for (let i = 0; i < givenOptions.length; i++){
        let maximumVal = document.getElementById("myRange2").max
        if (maximumVal < 1000 && i >= 3){
            break
        }
        if (maximumVal < 10000 && i >= 4){
            break
        }
        if (maximumVal < 100000 && i >= 5){
            break
        }
        if (maximumVal < 1000000 && i >= 6){
            break
        }

        let option = document.createElement("option")
        option.value = i + 'B'
        option.text = givenOptions[i]
        baseSelect.add(option)
    }
}

function addDependentFiltersStuff(){
    // console.log(VizScreen.givenData)
    let baseSelect = document.getElementById("baseTP")
    let dynamicSlider = new DynamicSlider(VizScreen.givenData, baseSelect.value)

    let [percentChangeSliderMin, percentSliderChangeMax, allNumbers] = dynamicSlider.percentChangeSliderValues()
    let perSlider = document.getElementById("myRange1")
    perSlider.min = percentChangeSliderMin
    perSlider.max = percentSliderChangeMax
    perSlider.value = percentChangeSliderMin
    let svg = d3.select("#svg1")
    addPercentageChangeHistogram(svg, percentChangeSliderMin, percentSliderChangeMax, allNumbers)
    addOptionsForPercentageChangeSlider()

    let [absoluteChangeSliderMin, absoluteChangeSliderMax, allNumbers2] = dynamicSlider.absoluteChangeSliderValues()
    let absSlider = document.getElementById("myRange2")
    absSlider.min = absoluteChangeSliderMin
    absSlider.max = absoluteChangeSliderMax
    absSlider.value = absoluteChangeSliderMin
    let svg2 = d3.select("#svg2")
    addAbsoluteChangeHistogram(svg2, absoluteChangeSliderMin, absoluteChangeSliderMax, allNumbers2)
    addOptionsForAbsoluteChangeSlider()
    // console.log(allNumbers)
    // console.log(allNumbers2)
}




function removeIndependentFiltersStuff(){
    //absolute
    if (document.getElementById("svg3")){
        document.getElementById("svg3").innerHTML = ""
    }
    $('#ABSCHOOSE').find('option').not(':first').remove()
    let absAnomOutput = document.getElementById("ABSWRITE")
    absAnomOutput.value = ''
    absAnomOutput.placeholder = ''
}




function addAbsoluteHistogram(svg3, absoluteSliderMin, absoluteSliderMax, allNumbers3){
    let margin = ({top: 10, right: 0, bottom: 10, left: 70})
    let height = 160
    let width = 770

    let midNum = (absoluteSliderMin+absoluteSliderMax)/2
    let IQ1 = (absoluteSliderMin+midNum)/2
    let IQ3 = (midNum+absoluteSliderMax)/2
    let fiveNumbers = [absoluteSliderMin, IQ1, midNum, IQ3, absoluteSliderMax]
    let xAxis = d3.scaleLinear().domain([absoluteSliderMin, absoluteSliderMax]).range([margin.left, width - margin.right])
    let that = this
    svg3.append("g")
        .style("font", "20px times")
        .attr("transform", "translate(0," + (height - margin.bottom) + ")")
        .call(d3.axisBottom(xAxis).tickValues(fiveNumbers).tickFormat(function(d){
            return that.fixNumbers(d)
        })).selectAll("text")  

    let histogram = d3.histogram()
    // .value(function(d) { 
    //     return d
    // })   
    .domain(xAxis.domain()) 
    .thresholds(d3.range(absoluteSliderMin, absoluteSliderMax, (absoluteSliderMax - absoluteSliderMin)/100)); 

    let bins = histogram(allNumbers3)

   // let minY = 0
    let maxY = d3.max(bins, function(d) { return d.length; })
    //let avgY = (minY+maxY)/2
    let receivedTickValues = neededTickValues(maxY)


    let yAxis = d3.scaleLog().domain([.1, maxY]).nice().range([height - margin.bottom, margin.top]);
    yAxis.clamp(true)  // d3.hist has to be called before the Y axis obviously

    svg3.append("g")
    .style("font", "20px times")
    .attr("transform", "translate("+margin.left+",0)")//rotate(270)
    .call(d3.axisLeft(yAxis).tickValues(receivedTickValues).tickFormat(function(d){
        return that.fixNumbers(d)
    }))
    

    this.rect = svg3.selectAll("rect")
    .data(bins)
    .enter()
    .append("rect")
    .attr("x", d =>  xAxis(d.x0) + 1)
    //   .attr("transform", function(d) { return "translate(" + (xAxis(d.x0)+20) + "," + (yAxis(d.length)) + ")"; })
      .attr("width", function(d) { return xAxis(d.x1) - xAxis(d.x0) - 1 ; })
      .attr("y", d => yAxis(d.length))
      .attr("height", function(d) { return yAxis.range()[0] - yAxis(d.length); })
      .style("fill", "#69b3a2")

    this.rect.on("mouseover", function(e, d) {
        d3.select(this).attr('stroke-width', 3).attr("stroke", "black")
            .append("title")
            .text(d => "Bin size: "+d.length+ "\u000d"+"Bin LowerLimit : " + fixNumbers(d.x0) + "\u000d" +"Bin UpperLimit : "+ fixNumbers(d.x1));
    })
    .on("mouseout", function(e, d) {
        d3.select(this).attr('stroke-width', 0)
    })

}


function addOptionsForAbsoluteSlider(){
    let baseSelect = document.getElementById("ABSCHOOSE")
    let givenOptions = ["0) Show all countries from data in Table and Linechart and the number distribution in Histogram",
                        "1) Show all countries in Table and Linechart with at least 100 attacks in any time period and the number distribution in Histogram",
                        "2) Show all countries in Table and Linechart with at least 1K attacks in any time period and the number distribution in Histogram",
                        "3) Show all countries in Table and Linechart with at least 10K attacks in any time period and the number distribution in Histogram",
                        "4) Show all countries in Table and Linechart with at least 100K attacks in any time period and the number distribution in Histogram",
                        "5) Show all countries in Table and Linechart with at least 1M attacks in any time period and the number distribution in Histogram",
                        "6) Show all countries in Table and Linechart with at least 10M attacks in any time period and the number distribution in Histogram"]
    for (let i = 0; i < givenOptions.length; i++){
        let maximumVal = document.getElementById("myRange3").max
        if (maximumVal < 100 && i >= 1){
            break
        }
        if (maximumVal < 1000 && i >= 2){
            break
        }
        if (maximumVal < 10000 && i >= 3){
            break
        }
        if (maximumVal < 100000 && i >= 4){
            break
        }
        if (maximumVal < 1000000 && i >= 5){
            break
        }
        if (maximumVal < 10000000 && i >= 6){
            break
        }

        let option = document.createElement("option")
        option.value = i + 'C'
        option.text = givenOptions[i]
        baseSelect.add(option)
    }
}



function addIndependentFiltersStuff(){
    let baseSelect = document.getElementById("baseTP")
    let dynamicSlider = new DynamicSlider(VizScreen.givenData, baseSelect.value)

    let [absoluteMin, absoluteAnomaly, absoluteMax, allNumbers3] = dynamicSlider.absoluteAnomalySliderValues()
    let absoluteSlider = document.getElementById("myRange3")
    absoluteSlider.min = absoluteMin
    absoluteSlider.max = absoluteMax
    absoluteSlider.value = absoluteMin
    let svg3 = d3.select("#svg3")
    addAbsoluteHistogram(svg3, absoluteMin, absoluteMax, allNumbers3)
    addOptionsForAbsoluteSlider(allNumbers3)
    VizScreen.absoluteAnomVal = absoluteAnomaly

    let [percentAnomaly, percentMax] = dynamicSlider.percentAnomalyValue()
    VizScreen.percentAnomVal = percentAnomaly
    VizScreen.percentMaxVal = percentMax
}



function removeSortStuff(){
    $('#sortTP').find('option').remove()
}

function optionsForSortSelections(){
    let sortSelect = document.getElementById("sortTP")
    let y = 1
    for (let time of VizScreen.givenTimes){
        let option = document.createElement("option")
        option.value = time
        option.text = 'Sort By -- ' + time
        sortSelect.add(option)
        y += 1
    }
}



function removeTextsFromLinechart(){
    if (document.getElementById("caaText"))
        document.getElementById("caaText").remove()
    if (document.getElementById("freq1"))
        document.getElementById("freq1").remove()
    if (document.getElementById("freq2"))
        document.getElementById("freq2").remove()
    if (document.getElementById("attacks"))
        document.getElementById("attacks").remove()
    if (document.getElementById("attackers"))
        document.getElementById("attackers").remove()
    if (document.getElementById("overall"))
        document.getElementById("overall").remove()
    if (document.getElementById("sbaText"))
        document.getElementById("sbaText").remove()
    if (document.getElementById("hoverText"))
        document.getElementById("hoverText").remove()
    if (document.getElementById("hbText"))
        document.getElementById("hbText").remove()
}

function makeDoubleSidedLineChart(receivedValForCountry){
    let lineChart = new LineChartAttacks(VizScreen.givenData, VizScreen.givenTimes, VizScreen.givenTimePeriod, receivedValForCountry)
    lineChart.drawLinechart()
}


function removeTableTHelements(){
    $("#predictionTable>thead>tr").find("th").remove()
}

function removeTableShapes(){
    if (document.getElementById("rect1")){
        d3.selectAll("#rect1").remove()
    }
    if (document.getElementById("changeTriangles")){
        d3.selectAll("#changeTriangles").remove()
    }
    if (document.getElementById("rect2")){
        d3.selectAll("#rect2").remove()
    }

    //below is if we want to add more stuff to table cell

    // if (document.getElementById("bgrect")){
    //     d3.selectAll('#bgrect').remove()
    // }
    // if (document.getElementById("bgrect2")){
    //     d3.selectAll("#bgrect2").remove()
    // }
    // if (document.getElementById("bgrect3")){
    //     d3.selectAll("#bgrect3").remove()
    // }
    // if (document.getElementById("bgrect4")){
    //     d3.selectAll("#bgrect4").remove()
    // }
}

function removeTableLegend(){
    document.getElementById("legend").innerHTML = ""
}

function removeRedSpotFromTable(){
    let tableBody = document.getElementById('predictionTableBody');
    for (let i = 0, row; row = tableBody.rows[i]; i++) {
        for (let j = 0, col; col = row.cells[j]; j++) {
            col.style.color = 'black'
            col.style.font = "20px times"
        }  
    }
}


function makeTableTHstructure(){
    $("#predictionTable>thead>tr").append("<th class=sortable id=c0 width=380px>Country</th>")
    let i = 1
    for (let time of VizScreen.givenTimes){
        // console.log(time)
        $("#predictionTable>thead>tr").append("<th class=sortable id=c"+i+">"+time+"<input type=checkbox id=TP"+i+" value="+time+" onchange=timeSelection();></th>")
        let requiredBox = 'c'+i
        document.getElementById(requiredBox).style.maxWidth = "60px"
        i++
    }

}

function makeTable(receivedValForCountry){
    let baseSelect = document.getElementById("baseTP")
    let table = new Table(VizScreen.givenData, baseSelect.value, VizScreen.givenTimes, VizScreen.absoluteAnomVal, VizScreen.percentAnomVal, VizScreen.percentMaxVal, receivedValForCountry)
    setTimeout( function() { table.drawTable(); }, 2000)
}


function removeBarGraphLineChartandAssociatedItems(){
    if (document.getElementById("attacksAndAttackers")){
        document.getElementById("attacksAndAttackers").innerHTML = ""
        document.getElementById("attacksAndAttackers").style.outline = "none"
    }
    document.getElementById("exportButton").style.visibility = "hidden"
    document.getElementById("goBackButton").style.visibility = "hidden"
}

function removeParallelCoordinateandAssociatedItems(){
    if (document.getElementById("parallelCoordinatesGraph")){
        document.getElementById("parallelCoordinatesGraph").innerHTML = ""
        document.getElementById("parallelCoordinatesGraph").style.outline = "none"
        document.getElementById("parallelCoordinatesGraph").style.width = "0px"
    }

    document.getElementById("usernameTextArea").innerHTML = ""
    document.getElementById("usernameFilter").style.visibility = "hidden"
    $('#usernameFilter').find('option').not(':first').remove()
    document.getElementById('allUsernames').style.visibility = "hidden"
    document.getElementById('noRoot').style.visibility = "hidden"
    document.getElementById('noAdmin').style.visibility = "hidden"
    document.getElementById('noRootAndAdmin').style.visibility = "hidden"
    document.getElementById("usernameFilterDiv").style.width = "0px"
}

function removeStackedHorizontalBarGraphandAssociatedItems(){
    // if (document.getElementById("donutGraph")){
    //     document.getElementById("donutGraph").innerHTML = ""
    //     document.getElementById("donutGraph").style.outline = "none"
    // }

    
    document.getElementById("shbgTextArea").innerHTML= ""
    document.getElementById("shbgTextArea").style.width = "0px"
    document.getElementById("stackedHorizontalDiv").style.width = "0px"

    if (document.getElementById("stackedHorizontalBarGraph")){
        document.getElementById("stackedHorizontalBarGraph").innerHTML = ""
        document.getElementById("stackedHorizontalBarGraph").style.outline = "none"
        document.getElementById("stackedHorizontalBarGraph").style.width = "0px"
    }
}



function helperFunction1(receivedValForCountry){
    removeTextsFromLinechart()
    makeDoubleSidedLineChart(receivedValForCountry)

    removeTableTHelements()
    removeTableShapes()
    removeTableLegend()
    removeRedSpotFromTable()
    makeTableTHstructure()
    makeTable(receivedValForCountry)


    removeBarGraphLineChartandAssociatedItems()
    removeParallelCoordinateandAssociatedItems()
    removeStackedHorizontalBarGraphandAssociatedItems()
}

function resetToInitial(){
    helperFunction8()
    let vizScreen = new VizScreen(VizScreen.summaryData, VizScreen.givenTimes, VizScreen.givenTimePeriod)
    vizScreen.initializeProgram()
}

function resetFilters(){
    let selectedTime = document.getElementById("baseTP").value
    let dynamicSlider = new DynamicSlider(VizScreen.givenData, selectedTime)

    //reset histograms
    helperFunction3(dynamicSlider)
    helperFunction5(dynamicSlider)
    helperFunction7(dynamicSlider)

    //reset sliders and textboxes
    let slider1 = document.getElementById("myRange1")
    let textBox1 = document.getElementById("PERCHANGEWRITE")
    slider1.value = slider1.min
    textBox1.value = ''

    let slider2 = document.getElementById("myRange2")
    let textBox2 = document.getElementById("ABSCHANGEWRITE")
    slider2.value = slider2.min
    textBox2.value = ''

    let slider3 = document.getElementById("myRange3")
    let textBox3 = document.getElementById("ABSWRITE")
    slider3.value = slider3.min
    textBox3.value = ''

    //reset choose options
    $('#PERCHANGECHOOSE').find('option').not(':first').remove()
    addOptionsForPercentageChangeSlider()
    $('#ABSCHANGECHOOSE').find('option').not(':first').remove()
    addOptionsForAbsoluteChangeSlider()
    $('#ABSCHOOSE').find('option').not(':first').remove()
    addOptionsForAbsoluteSlider()
}


function countrySelect(value){
    if (value === ''){
        let vizScreen = new VizScreen(VizScreen.summaryData, VizScreen.givenTimes, VizScreen.givenTimePeriod)
        vizScreen.initializeProgram()
    }
    else{
        resetFilters()
        helperFunction1(value)
    }
}


function baseTPFunc(){
    removeDependentFiltersStuff()
    addDependentFiltersStuff()
    helperFunction1("non-country")
}

function helperFunction8(){
    let dataList1 = document.getElementById("countries-from-data")
    dataList1.value = '' 
}

function helperFunction2(){
    let slider2 = document.getElementById("myRange2")
    let textBox2 = document.getElementById("ABSCHANGEWRITE")
    slider2.value = slider2.min
    textBox2.value = slider2.min

    let slider3 = document.getElementById("myRange3")
    let textBox3 = document.getElementById("ABSWRITE")
    slider3.value = slider3.min
    textBox3.value = slider3.min
}

function helperFunction3(dynamicSlider){
    document.getElementById("svg2").innerHTML = ""
    let [absoluteChangeSliderMin, absoluteChangeSliderMax, allNumbers2] = dynamicSlider.absoluteChangeSliderValues()
    let svg2 = d3.select("#svg2")
    addAbsoluteChangeHistogram(svg2, absoluteChangeSliderMin, absoluteChangeSliderMax, allNumbers2)

    document.getElementById("svg3").innerHTML = ""
    let [absoluteMin, absoluteAnomaly, absoluteMax, allNumbers3] = dynamicSlider.absoluteAnomalySliderValues()
    let svg3 = d3.select("#svg3")
    addAbsoluteHistogram(svg3, absoluteMin, absoluteMax, allNumbers3)
}

function helperFunction10(){
    document.getElementById("PERCHANGECHOOSE").selectedIndex = 0
    document.getElementById("ABSCHANGECHOOSE").selectedIndex = 0
    document.getElementById("ABSCHOOSE").selectedIndex = 0
}

function helperFunction11(){
    document.getElementById("ABSCHANGECHOOSE").selectedIndex = 0
    document.getElementById("ABSCHOOSE").selectedIndex = 0
}

function helperFunction12(){
    document.getElementById("PERCHANGECHOOSE").selectedIndex = 0
    document.getElementById("ABSCHOOSE").selectedIndex = 0
}

function helperFunction13(){
    document.getElementById("PERCHANGECHOOSE").selectedIndex = 0
    document.getElementById("ABSCHANGECHOOSE").selectedIndex = 0
}


function PCS(){
    //THIS IS FOR THE SLIDERS AND TEXTBOXES

    //keeping PC slider and PC textbox aligned
    let slider1 = document.getElementById("myRange1")
    let textBox1 = document.getElementById("PERCHANGEWRITE")
    textBox1.value = slider1.value 

    //setting the other 2 sliders and texboxes to minimum
    helperFunction2()

    //resetting all choose boxes to default
    helperFunction10()

    //THIS IS FOR THE HISTOGRAMS
    let selectedTime = document.getElementById("baseTP").value
    let dynamicSlider = new DynamicSlider(VizScreen.givenData, selectedTime)

    //change PC histogram
    document.getElementById("svg1").innerHTML = ""
    let [percentChangeSliderMin, percentSliderChangeMax, allNumbers] = dynamicSlider.percentChangeSliderValues()
    let svg = d3.select("#svg1")
    allNumbers = allNumbers.filter(item => item >= slider1.value && item <= slider1.max)
    let sliderValue 
    if (slider1.value >= slider1.max - 4 && slider1.value <= slider1.max){
        sliderValue = slider1.value - 4
    }
    else{
        sliderValue = slider1.value
    }
    addPercentageChangeHistogram(svg, sliderValue, slider1.max, allNumbers)

    //reset AC and A histogram
    helperFunction3(dynamicSlider)

    //draw linechart and table
    helperFunction1("non-country")

    //erase country datalist
    helperFunction8()
    
}

function PCC(selectedOption){
    // console.log(selectedOption)
    //keeping PC slider and PC textbox aligned
    let slider1 = document.getElementById("myRange1")
    slider1.value = slider1.min
    let textBox1 = document.getElementById("PERCHANGEWRITE")
    textBox1.value = ''
    textBox1.placeholder = 'Option ' + selectedOption.substring(0,1) + ')' 

    //setting the other 2 sliders and texboxes to minimum
    helperFunction2()

    //resetting the other 2 choose boxes to default
    helperFunction11()

    //THIS IS FOR THE HISTOGRAMS
    let selectedTime = document.getElementById("baseTP").value
    let dynamicSlider = new DynamicSlider(VizScreen.givenData, selectedTime)

    //change PC histogram
    document.getElementById("svg1").innerHTML = ""
    let [percentChangeSliderMin, percentSliderChangeMax, allNumbers] = dynamicSlider.percentChangeSliderValues()
    let svg = d3.select("#svg1")
    if (selectedOption === '0A'){
        allNumbers = allNumbers.filter(item => item >= percentChangeSliderMin && item <= percentSliderChangeMax)
        addPercentageChangeHistogram(svg, percentChangeSliderMin, percentSliderChangeMax, allNumbers)
    }
    else if (selectedOption === '1A'){
        allNumbers = allNumbers.filter(item => item >= percentChangeSliderMin && item < 0)
        addPercentageChangeHistogram(svg, percentChangeSliderMin, 0, allNumbers)
    }
    else if (selectedOption === '2A'){
        allNumbers = allNumbers.filter(item => item >= 0 && item <= percentSliderChangeMax)
        addPercentageChangeHistogram(svg, 0, percentSliderChangeMax, allNumbers)
    }
    else if (selectedOption === '3A'){
        allNumbers = allNumbers.filter(item => item >= 100 && item <= percentSliderChangeMax)
        addPercentageChangeHistogram(svg, 100, percentSliderChangeMax, allNumbers)
    }
    else if (selectedOption === '4A'){
        allNumbers = allNumbers.filter(item => item >= 1000 && item <= percentSliderChangeMax)
        addPercentageChangeHistogram(svg, 1000, percentSliderChangeMax, allNumbers)
    }
    else if (selectedOption === '5A'){
        allNumbers = allNumbers.filter(item => item >= 10000 && item <= percentSliderChangeMax)
        addPercentageChangeHistogram(svg, 10000, percentSliderChangeMax, allNumbers)
    }
    else if (selectedOption === '6A'){
        allNumbers = allNumbers.filter(item => item >= 100000 && item <= percentSliderChangeMax)
        addPercentageChangeHistogram(svg, 100000, percentSliderChangeMax, allNumbers)
    }
    else if (selectedOption === '7A'){
        allNumbers = allNumbers.filter(item => item >= 1000000 && item <= percentSliderChangeMax)
        addPercentageChangeHistogram(svg, 1000000, percentSliderChangeMax, allNumbers)
    }
    
    //reset AC and A histogram
    helperFunction3(dynamicSlider)

    //draw linechart and table
    helperFunction1("non-country")

    //erase country datalist
    helperFunction8()
}

function PCT(typedNumber){
    if(typedNumber.replace(/\s/g,"") == "" || isNaN(typedNumber)){
        alert("PLEASE ENTER A NUMBER!!!")
    }
    else{
        if (Number(typedNumber) < document.getElementById("myRange1").min){
            alert("PLEASE ENTER A NUMBER BIGGER THAN THE MINIMUM!!!")
        }
        else if (Number(typedNumber) > document.getElementById("myRange1").max){
            alert("PLEASE ENTER A NUMBER SMALLER THAN THE MAXIMUM!!!")
        }
        else{
            //keeping PC slider and PC textbox aligned
            let slider1 = document.getElementById("myRange1")
            slider1.value = typedNumber
        
            //setting the other 2 sliders and texboxes to minimum
            helperFunction2()

            //resetting all choose boxes to default
            helperFunction10()
        
            //THIS IS FOR THE HISTOGRAMS
            let selectedTime = document.getElementById("baseTP").value
            let dynamicSlider = new DynamicSlider(VizScreen.givenData, selectedTime)
            
            //change PC histogram
            document.getElementById("svg1").innerHTML = ""
            let [percentChangeSliderMin, percentSliderChangeMax, allNumbers] = dynamicSlider.percentChangeSliderValues()
            let svg = d3.select("#svg1")
            allNumbers = allNumbers.filter(item => item >= typedNumber && item <= percentSliderChangeMax)
            let boxValue 
            if (typedNumber >= percentSliderChangeMax - 4){
                boxValue = percentSliderChangeMax - 4
            }
            else{
                boxValue = typedNumber
            }
            addPercentageChangeHistogram(svg, boxValue, percentSliderChangeMax, allNumbers)

            //reset AC and A histogram
            helperFunction3(dynamicSlider)

            //draw linechart and table
            helperFunction1("non-country")

            //erase country datalist
            helperFunction8()
        }
    }
}

function helperFunction4(){
    let slider1 = document.getElementById("myRange1")
    let textBox1 = document.getElementById("PERCHANGEWRITE")
    slider1.value = slider1.min
    textBox1.value = slider1.min

    let slider3 = document.getElementById("myRange3")
    let textBox3 = document.getElementById("ABSWRITE")
    slider3.value = slider3.min
    textBox3.value = slider3.min
}

function helperFunction5(dynamicSlider){
    document.getElementById("svg1").innerHTML = ""
    let [percentChangeSliderMin, percentSliderChangeMax, allNumbers] = dynamicSlider.percentChangeSliderValues()
    let svg = d3.select("#svg1")
    addPercentageChangeHistogram(svg, percentChangeSliderMin, percentSliderChangeMax, allNumbers)
    
    document.getElementById("svg3").innerHTML = ""
    let [absoluteMin, absoluteAnomaly, absoluteMax, allNumbers3] = dynamicSlider.absoluteAnomalySliderValues()
    let svg3 = d3.select("#svg3")
    addAbsoluteHistogram(svg3, absoluteMin, absoluteMax, allNumbers3)
}


function ACS(){
    //THIS IS FOR THE SLIDERS AND TEXTBOXES

    //keeping AC slider and AC textbox aligned
    let slider2 = document.getElementById("myRange2")
    let textBox2 = document.getElementById("ABSCHANGEWRITE")
    textBox2.value = slider2.value 

    //setting the other 2 sliders and texboxes to minimum
    helperFunction4()

    //resetting all choose boxes to default
    helperFunction10()

    //THIS IS FOR THE HISTOGRAMS
    let selectedTime = document.getElementById("baseTP").value
    let dynamicSlider = new DynamicSlider(VizScreen.givenData, selectedTime)

    //change AC histogram
    document.getElementById("svg2").innerHTML = ""
    let [absoluteSliderMin, absoluteSliderMax, allNumbers2] = dynamicSlider.absoluteChangeSliderValues()
    let svg2 = d3.select("#svg2")
    allNumbers2 = allNumbers2.filter(item => item >= slider2.value && item <= slider2.max)
    let sliderValue 
    if (slider2.value >= slider2.max - 4 && slider2.value <= slider2.max){
        sliderValue = slider2.value - 4
    }
    else{
        sliderValue = slider2.value
    }
    addAbsoluteChangeHistogram(svg2, Number(sliderValue), Number(slider2.max), allNumbers2)

    //reset PC and A histogram
    helperFunction5(dynamicSlider)

    //draw linechart and table
    helperFunction1("non-country")

    //erase country datalist
    helperFunction8()
}

function ACC(selectedOption){
    //THIS IS FOR THE SLIDERS AND TEXTBOXES

    //keeping AC slider and AC textbox aligned
    let slider2 = document.getElementById("myRange2")
    slider2.value = slider2.min
    let textBox2 = document.getElementById("ABSCHANGEWRITE")
    textBox2.value = '' 
    textBox2.placeholder = 'Option ' + selectedOption.substring(0,1) + ')' 

    //setting the other 2 sliders and texboxes to minimum
    helperFunction4()

    //resetting the other 2 choose boxes to default
    helperFunction12()

    //THIS IS FOR THE HISTOGRAMS
    let selectedTime = document.getElementById("baseTP").value
    let dynamicSlider = new DynamicSlider(VizScreen.givenData, selectedTime)

    //change AC histogram
    document.getElementById("svg2").innerHTML = ""
    let [absoluteSliderMin, absoluteSliderMax, allNumbers2] = dynamicSlider.absoluteChangeSliderValues()
    let svg2 = d3.select("#svg2")
    if (selectedOption === '0B'){
        allNumbers2 = allNumbers2.filter(item => item >= absoluteSliderMin && item <= absoluteSliderMax)
        addAbsoluteChangeHistogram(svg2, absoluteSliderMin, absoluteSliderMax, allNumbers2)
    }
    else if (selectedOption === '1B'){
        allNumbers2 = allNumbers2.filter(item => item >= absoluteSliderMin && item < 0)
        addAbsoluteChangeHistogram(svg2, absoluteSliderMin, 0, allNumbers2)
    }
    else if (selectedOption === '2B'){
        allNumbers2 = allNumbers2.filter(item => item >= 0 && item <= absoluteSliderMax)
        addAbsoluteChangeHistogram(svg2, 0, absoluteSliderMax, allNumbers2)
    }
    else if (selectedOption === '3B'){
        allNumbers2 = allNumbers2.filter(item => item >= 1000 && item <= absoluteSliderMax)
        addAbsoluteChangeHistogram(svg2, 1000, absoluteSliderMax, allNumbers2)
    }
    else if (selectedOption === '4B'){
        allNumbers2 = allNumbers2.filter(item => item >= 10000 && item <= absoluteSliderMax)
        addAbsoluteChangeHistogram(svg2, 10000, absoluteSliderMax, allNumbers2)
    }
    else if (selectedOption === '5B'){
        allNumbers2 = allNumbers2.filter(item => item >= 100000 && item <= absoluteSliderMax)
        addAbsoluteChangeHistogram(svg2, 100000, absoluteSliderMax, allNumbers2)
    }
    else if (selectedOption === '6B'){
        allNumbers2 = allNumbers2.filter(item => item >= 1000000 && item <= absoluteSliderMax)
        addAbsoluteChangeHistogram(svg2, 1000000, absoluteSliderMax, allNumbers2)
    }

    //reset PC and A histogram
    helperFunction5(dynamicSlider)

    //draw linechart and table
    helperFunction1("non-country")

    //erase country datalist
    helperFunction8()
}

function ACT(typedNumber){
    if(typedNumber.replace(/\s/g,"") == "" || isNaN(typedNumber)){
        alert("PLEASE ENTER A NUMBER!!!")
    }
    else{
        if (Number(typedNumber) < document.getElementById("myRange2").min){
            alert("PLEASE ENTER A NUMBER BIGGER THAN THE MINIMUM!!!")
        }
        else if (Number(typedNumber) > document.getElementById("myRange2").max){
            alert("PLEASE ENTER A NUMBER SMALLER THAN THE MAXIMUM!!!")
        }
        else{
            //keeping AC slider and AC textbox aligned
            let slider2 = document.getElementById("myRange2")
            slider2.value = typedNumber
        
            //setting the other 2 sliders and texboxes to minimum
            helperFunction4()

            //resetting all choose boxes to default
            helperFunction10()
        
            //THIS IS FOR THE HISTOGRAMS
            let selectedTime = document.getElementById("baseTP").value
            let dynamicSlider = new DynamicSlider(VizScreen.givenData, selectedTime)

            //change AC histogram
            document.getElementById("svg2").innerHTML = ""
            let [absoluteSliderMin, absoluteSliderMax, allNumbers2] = dynamicSlider.absoluteChangeSliderValues()
            let svg2 = d3.select("#svg2")
            allNumbers2 = allNumbers2.filter(item => item >= Number(typedNumber) && item <= absoluteSliderMax)
            let boxValue 
            if (typedNumber >= absoluteSliderMax - 4){
                boxValue = absoluteSliderMax - 4
            }
            else{
                boxValue = typedNumber
            }
            addAbsoluteChangeHistogram(svg2, Number(boxValue), absoluteSliderMax, allNumbers2)

            //reset PC and A histogram
            helperFunction5(dynamicSlider)

            //draw linechart and table
            helperFunction1("non-country")

            //erase country datalist
            helperFunction8()
        }
    }
}

function helperFunction6(){
    let slider1 = document.getElementById("myRange1")
    let textBox1 = document.getElementById("PERCHANGEWRITE")
    slider1.value = slider1.min
    textBox1.value = slider1.min

    let slider2 = document.getElementById("myRange2")
    let textBox2 = document.getElementById("ABSCHANGEWRITE")
    slider2.value = slider2.min
    textBox2.value = slider2.min
}

function helperFunction7(dynamicSlider){
    document.getElementById("svg1").innerHTML = ""
    let [percentChangeSliderMin, percentSliderChangeMax, allNumbers] = dynamicSlider.percentChangeSliderValues()
    let svg1 = d3.select("#svg1")
    addPercentageChangeHistogram(svg1, percentChangeSliderMin, percentSliderChangeMax, allNumbers)

    document.getElementById("svg2").innerHTML = ""
    let [absoluteChangeSliderMin, absoluteChangeSliderMax, allNumbers2] = dynamicSlider.absoluteChangeSliderValues()
    let svg2 = d3.select("#svg2")
    addAbsoluteChangeHistogram(svg2, absoluteChangeSliderMin, absoluteChangeSliderMax, allNumbers2)
}


function AS(){ 
    //THIS IS FOR THE SLIDERS AND TEXTBOXES

    //keeping AC slider and AC textbox aligned
    let slider3 = document.getElementById("myRange3")
    let textBox3 = document.getElementById("ABSWRITE")
    textBox3.value = slider3.value 

    //setting the other 2 sliders and texboxes to minimum
    helperFunction6()

    //resetting all choose boxes to default
    helperFunction10()

    //THIS IS FOR THE HISTOGRAMS
    let selectedTime = document.getElementById("baseTP").value
    let dynamicSlider = new DynamicSlider(VizScreen.givenData, selectedTime)

    //change AC histogram
    document.getElementById("svg3").innerHTML = ""
    let [absoluteMin, absoluteAnomaly, absoluteMax, allNumbers3] = dynamicSlider.absoluteAnomalySliderValues()
    let svg3 = d3.select("#svg3")
    allNumbers3 = allNumbers3.filter(item => item >= slider3.value && item <= slider3.max)
    let sliderValue 
    if (slider3.value >= slider3.max - 4 && slider3.value <= slider3.max){
        sliderValue = slider3.value - 4
    }
    else{
        sliderValue = slider3.value
    }
    addAbsoluteHistogram(svg3, Number(sliderValue), Number(slider3.max), allNumbers3)

    //reset PC and A histogram
    helperFunction7(dynamicSlider)

    //draw linechart and table
    helperFunction1("non-country")

    //erase country datalist
    helperFunction8()
}

function AC(selectedOption){
    //THIS IS FOR THE SLIDERS AND TEXTBOXES

    //keeping AC slider and AC textbox aligned
    let slider3 = document.getElementById("myRange3")
    slider3.value = slider3.min
    let textBox3 = document.getElementById("ABSWRITE")
    textBox3.value = '' 
    textBox3.placeholder = 'Option ' + selectedOption.substring(0,1) + ')' 

    //setting the other 2 sliders and texboxes to minimum
    helperFunction6()

    //resetting the other 2 choose boxes to default
    helperFunction13()

    //THIS IS FOR THE HISTOGRAMS
    let selectedTime = document.getElementById("baseTP").value
    let dynamicSlider = new DynamicSlider(VizScreen.givenData, selectedTime)

    //change AC histogram
    document.getElementById("svg3").innerHTML = ""

    let [absoluteMin, absoluteAnomaly, absoluteMax, allNumbers3] = dynamicSlider.absoluteAnomalySliderValues()
    let svg3 = d3.select("#svg3")
    if (selectedOption === '0C'){
        allNumbers3 = allNumbers3.filter(item => item >= absoluteMin && item <= absoluteMax)
        addAbsoluteHistogram(svg3, absoluteMin, absoluteMax, allNumbers3)
    }
    else if (selectedOption === '1C'){
        allNumbers3 = allNumbers3.filter(item => item >= 100 && item <= absoluteMax)
        addAbsoluteHistogram(svg3, 100, absoluteMax, allNumbers3)
    }
    else if (selectedOption === '2C'){
        allNumbers3 = allNumbers3.filter(item => item >= 1000 && item <= absoluteMax)
        addAbsoluteHistogram(svg3, 1000, absoluteMax, allNumbers3)
    }
    else if (selectedOption === '3C'){
        allNumbers3 = allNumbers3.filter(item => item >= 10000 && item <= absoluteMax)
        addAbsoluteHistogram(svg3, 10000, absoluteMax, allNumbers3)
    }
    else if (selectedOption === '4C'){
        allNumbers3 = allNumbers3.filter(item => item >= 100000 && item <= absoluteMax)
        addAbsoluteHistogram(svg3, 100000, absoluteMax, allNumbers3)
    }
    else if (selectedOption === '5C'){
        allNumbers3 = allNumbers3.filter(item => item >= 1000000 && item <= absoluteMax)
        addAbsoluteHistogram(svg3, 1000000, absoluteMax, allNumbers3)
    }
    else if (selectedOption === '6C'){
        allNumbers3 = allNumbers3.filter(item => item >= 10000000 && item <= absoluteMax)
        addAbsoluteHistogram(svg3, 10000000, absoluteMax, allNumbers3)
    }

    //reset PC and A histogram
    helperFunction7(dynamicSlider)

    //draw linechart and table
    helperFunction1("non-country")

    //erase country datalist
    helperFunction8()
}


function AT(typedNumber){
    if(typedNumber.replace(/\s/g,"") == "" || isNaN(typedNumber)){
        alert("PLEASE ENTER A NUMBER!!!")
    }
    else{
        if (Number(typedNumber) < document.getElementById("myRange3").min){
            alert("PLEASE ENTER A NUMBER BIGGER THAN THE MINIMUM!!!")
        }
        else if (Number(typedNumber) > document.getElementById("myRange3").max){
            alert("PLEASE ENTER A NUMBER SMALLER THAN THE MAXIMUM!!!")
        }
        else{
            //keeping AC slider and AC textbox aligned
            let slider3 = document.getElementById("myRange3")
            slider3.value = typedNumber
        
            //setting the other 2 sliders and texboxes to minimum
            helperFunction6()

            //resetting all choose boxes to default
            helperFunction10()
        
            //THIS IS FOR THE HISTOGRAMS
            let selectedTime = document.getElementById("baseTP").value
            let dynamicSlider = new DynamicSlider(VizScreen.givenData, selectedTime)

            //change AC histogram
            document.getElementById("svg3").innerHTML = ""
            let [absoluteMin, absoluteAnomaly, absoluteMax, allNumbers3] = dynamicSlider.absoluteAnomalySliderValues()
            let svg3 = d3.select("#svg3")
            allNumbers3 = allNumbers3.filter(item => item >= Number(typedNumber) && item <= absoluteMax)
            let boxValue 
            if (typedNumber >= absoluteMax - 4){
                boxValue = absoluteMax - 4
            }
            else{
                boxValue = typedNumber
            }
            addAbsoluteChangeHistogram(svg3, Number(boxValue), absoluteMax, allNumbers3)

            //reset PC and A histogram
            helperFunction7(dynamicSlider)

            //draw linechart and table
            helperFunction1("non-country")

            //erase country datalist
            helperFunction8()
        }
    }
}


function sortTPFunc(){
    helperFunction1("non-country")
}


function helperFunction9(){
    document.getElementById("exportButton").style.visibility = "hidden"
    document.getElementById("goBackButton").style.visibility = "hidden"
    let cgbg = document.getElementById("attacksAndAttackers")
    cgbg.innerHTML = ''
    document.getElementById("attacksAndAttackers").style.outline = "none"

    document.getElementById("usernameTextArea").innerHTML = ""
    $('#usernameFilter').find('option').not(':first').remove()
    document.getElementById('usernameFilter').style.visibility = "hidden"
    document.getElementById('allUsernames').style.visibility = "hidden"
    document.getElementById('noRoot').style.visibility = "hidden"
    document.getElementById('noAdmin').style.visibility = "hidden"
    document.getElementById('noRootAndAdmin').style.visibility = "hidden"
    let pcg = document.getElementById("parallelCoordinatesGraph")
    pcg.innerHTML = ''
    document.getElementById("parallelCoordinatesGraph").style.outline = "none"

    // let dc = document.getElementById("donutGraph")
    // dc.innerHTML = ''
    // document.getElementById("donutGraph").style.outline = "none"
    document.getElementById("shbgTextArea").innerHTML= ""
    let shbg = document.getElementById("stackedHorizontalBarGraph")
    shbg.innerHTML = ""
    document.getElementById("stackedHorizontalBarGraph").style.outline = "none"
    
}


function timeSelection(){
    let checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
    let selectedTPsLength = checkedBoxes.length

    if (Table.countriesChosenUsedInAnotherFunction.length > 1 && (selectedTPsLength > 1 || selectedTPsLength === 0)){
        alert("Press ok. Then, EITHER have multiple countries and one time period OR have multiple time periods and one country.")
        
        helperFunction9()
    }
    else{
        helperFunction9()

        let aAndALineChart = new AttacksAndAttackers(Table.countriesChosenUsedInAnotherFunction)
        aAndALineChart.fetchData()

        let parallelCoordinate = new ParallelCoordinate(Table.countriesChosenUsedInAnotherFunction, "no", 0)
        parallelCoordinate.fetchData2()

        // let donutGraph = new Donut(Table.countriesChosenUsedInAnotherFunction)
        // donutGraph.fetchData3()

        let stackedHorizontalBarGraph = new StackedHorizontalBarGraph(Table.countriesChosenUsedInAnotherFunction)
        stackedHorizontalBarGraph.fetchData4()
    }
}

function removeCRandTreemap(){
    document.getElementById("crossReferenceIPGraphs").innerHTML = ""
    document.getElementById("legendForIPGraph").innerHTML = ""
    document.getElementById("crossReferencePointer").innerHTML = ""
    $(".node").remove()
    document.getElementById("legendForTreeMap").innerHTML = ""
}

function removeIP(){
    const select = document.getElementById('ipsClicked');
    const opt  = select.options[select.selectedIndex];
    if (opt.disabled === false){
        opt.remove()
    }

    

    if ($('#ipsClicked').children('option').length === 2){
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

        document.getElementById("startDayPick").style.visibility = "hidden"
        document.getElementById("endDayPick").style.visibility = "hidden"
        document.getElementById("startWeekPick").style.visibility = "hidden"
        document.getElementById("endWeekPick").style.visibility = "hidden"
        document.getElementById("startMonthPick").style.visibility = "hidden"
        document.getElementById("endMonthPick").style.visibility = "hidden"
        document.getElementById("crButton").style.visibility = "hidden"
        document.getElementById("exportIPButton").style.visibility = "hidden"


        CrossReferenceIPLineChart.ipsForFunction = []
        document.getElementById("crossReferenceIPGraphs").style.outline = "none"
        removeCRandTreemap()
    }

    if ($('#ipsClicked').children('option').length === 1){
        document.getElementById("text1CR").remove()
        document.getElementById("text2CR").remove()
        document.getElementById("text3CR").remove()
        document.getElementById("text4CR").remove()
        document.getElementById("text5CR").remove()
        document.getElementById("text6CR").remove()
        document.getElementById("text7CR").remove()
        document.getElementById("line1CR").remove()

        document.getElementById("ipsClicked").style.visibility = "hidden"
        document.getElementById("removeIPButton").style.visibility = "hidden"
    }


}

function finalCRChecker(){
    let dateValue = VizScreen.givenTimePeriod
        
    if (dateValue === "month"){
        let value1 = $("select[name='startMonthPick'] option:selected").index()
        let value2 = $("select[name='endMonthPick'] option:selected").index()

        if (value2 > value1){
            if (value2 - value1 + 1 <= 30){
                let timeRangeList = []
                let monthList = document.getElementById("startMonthPick")
                for (let x = value1; x <= value2; x++){
                    timeRangeList.push(monthList.options[x].text)
                }

                document.getElementById("exportIPButton").style.visibility = "visible"
                removeCRandTreemap()
                let crossReferenceIPObject = new CrossReferenceIPLineChart(timeRangeList)
                crossReferenceIPObject.fetchData()
            }
            else{
                alert("Choose at most 30 months.")
            }
        }
        else{
            alert("End Month has to be greater than Start Month.")
        }
    }
    if (dateValue === "week"){
        let value1 = $("select[name='startWeekPick'] option:selected").index()
        let value2 = $("select[name='endWeekPick'] option:selected").index()

        if (value2 > value1){
            if (value2 - value1 + 1 <= 30){
                let timeRangeList = []
                let weekList = document.getElementById("startWeekPick")
                for (let x = value1; x <= value2; x++){
                    let totalText = weekList.options[x].text
                    let neededText = totalText.substring(0,7)
                    timeRangeList.push(neededText)
                }

                document.getElementById("exportIPButton").style.visibility = "visible"
                removeCRandTreemap()
                let crossReferenceIPObject = new CrossReferenceIPLineChart(timeRangeList)
                crossReferenceIPObject.fetchData()
            }
            else{
                alert("Choose at most 30 weeks.")
            }
        }
        else{
            alert("End Week has to be greater than Start Week.")
        }
    }
    if (dateValue === "day"){
        let startDay = new Date($('#startDayPick').val() + "GMT-0700")
        let endDay = new Date($('#endDayPick').val() + "GMT-0700")
        let diffTime = Math.abs(endDay - startDay)
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        // console.log(diffDays)
        if (endDay > startDay){
            if (diffDays + 1 <= 30){
                let timeRangeList = []
                function getDates (startDay, endDay) {
                    const dates = []
                    let currentDate = startDay
                    const addDays = function (days) {
                      const date = new Date(this.valueOf())
                      date.setDate(date.getDate() + days)
                      return date
                    }
                    while (currentDate <= endDay) {
                      dates.push(currentDate)
                      currentDate = addDays.call(currentDate, 1)
                    }
                    return dates
                }
                const dates = getDates(startDay, endDay)
                
                function formatDate(date) {
                    var d = new Date(date),
                        month = '' + (d.getMonth() + 1),
                        day = '' + d.getDate(),
                        year = d.getFullYear();
                
                    if (month.length < 2) 
                        month = '0' + month;
                    if (day.length < 2) 
                        day = '0' + day;
                
                    return [year, month, day].join('-');
                }

                dates.forEach(function (date) {
                    timeRangeList.push(formatDate(date))
                })
                
                document.getElementById("exportIPButton").style.visibility = "visible"
                removeCRandTreemap()
                let crossReferenceIPObject = new CrossReferenceIPLineChart(timeRangeList)
                crossReferenceIPObject.fetchData()
            }
            else{
                alert("Choose at most 30 days.")
            }
        }
        else{
            alert("End Day has to be greater than Start Day.")
        }
    }

}


function filterUsername(value){
    document.getElementById("usernameTextArea").innerHTML = ""
    let pcg = document.getElementById("parallelCoordinatesGraph")
    pcg.innerHTML = ''
    document.getElementById("parallelCoordinatesGraph").style.outline = "none"
    let parallelCoordinate = new ParallelCoordinate(Table.countriesChosenUsedInAnotherFunction, "yes", value)
    parallelCoordinate.dataForThirdViz(ParallelCoordinate.dataUsedInVizScreen)
}



function fixNumbers(value){
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
        return value.toFixed(0) + ''
    }
}

function openCity(evt, cityName) {
    console.log(cityName)

    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}









