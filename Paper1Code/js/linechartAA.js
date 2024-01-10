class LineChartAttacks{

    static countries 

    constructor(neededData, selectedTimes, timePeriod, receivedValForCountry){
        this.neededData = neededData
        this.selectedTimes = selectedTimes
        this.timePeriod = timePeriod
        this.receivedValForCountry = receivedValForCountry
    }

    findValues3(minVal3, maxVal3, countriesOnly){
        let finalFilter = []
        for (let i = 0; i < countriesOnly.length; i++){
            let area = countriesOnly[i]
            let values = []
            for (let time of this.selectedTimes){
                let value = area[time].attacks
                values.push(value)
            }
            if (maxVal3 === document.getElementById("myRange3").max){
                if (values.some(el => el >= minVal3 && el <= maxVal3)){
                    finalFilter.push(area.country)
                }
            }
            else{
                if (values.some(el => el >= minVal3 && el < maxVal3)){
                    finalFilter.push(area.country)
                }
            }
        }
        return finalFilter
    }


    findRangeAbsolute(){
        let writtenAvalue = document.getElementById("ABSWRITE").value
        let minVal3
        let maxVal3
        if (writtenAvalue === ''){
            // console.log('here2')
            let turningPointValue = document.getElementById("ABSCHOOSE").value
            if (turningPointValue === '0C'){
                minVal3 = document.getElementById("myRange3").min
                maxVal3 = document.getElementById("myRange3").max
            }
            else if (turningPointValue === '1C'){
                minVal3 = 100
                maxVal3 = document.getElementById("myRange3").max
            }
            else if (turningPointValue === '2C'){
                minVal3 = 1000
                maxVal3 = document.getElementById("myRange3").max
            }
            else if (turningPointValue === '3C'){
                minVal3 = 10000
                maxVal3 = document.getElementById("myRange3").max
            }
            else if (turningPointValue === '4C'){
                minVal3 = 100000
                maxVal3 = document.getElementById("myRange3").max
            }
            else if (turningPointValue === '5C'){
                minVal3 = 1000000
                maxVal3 = document.getElementById("myRange3").max
            }
            else if (turningPointValue === '6C'){
                minVal3 = 10000000
                maxVal3 = document.getElementById("myRange3").max
            }
            //taking care of initial state where there is an exception
            else{
                minVal3 = document.getElementById("myRange3").min
                maxVal3 = document.getElementById("myRange3").max
            }
        }
        else{
            minVal3 = Number(document.getElementById("myRange3").value)
            maxVal3 = document.getElementById("myRange3").max
        }

        return [minVal3, maxVal3]
    }

    findValues2(minVal2, maxVal2, currentBaseTime, countriesOnly){
        let finalFilter = []
        for (let i = 0; i < countriesOnly.length; i++){
            let area = countriesOnly[i]
            let values = []
            for (let time of this.selectedTimes){
                if (time !== currentBaseTime){
                    let value = area[time].attacks - area[currentBaseTime].attacks
                    values.push(value)
                }
            }
            if (maxVal2 === document.getElementById("myRange2").max){
                if (values.some(el => el >= minVal2 && el <= maxVal2)){
                    finalFilter.push(area.country)
                }
            }
            else{
                if (values.some(el => el >= minVal2 && el < maxVal2)){
                    finalFilter.push(area.country)
                }
            }
        }
        return finalFilter
    }

    findRangeAbsoluteChange(){
        let writtenAvalue = document.getElementById("ABSCHANGEWRITE").value
        let minVal2 
        let maxVal2
        if (writtenAvalue === ''){
            // console.log('here2')
            let turningPointValue = document.getElementById("ABSCHANGECHOOSE").value
            if (turningPointValue === '0B'){
                minVal2 = document.getElementById("myRange2").min
                maxVal2 = document.getElementById("myRange2").max
            }
            else if (turningPointValue === '1B'){
                minVal2 = document.getElementById("myRange2").min
                maxVal2 = 0
            }
            else if (turningPointValue === '2B'){
                minVal2 = 0
                maxVal2 = document.getElementById("myRange2").max
            }
            else if (turningPointValue === '3B'){
                minVal2 = 1000
                maxVal2 = document.getElementById("myRange2").max
            }
            else if (turningPointValue === '4B'){
                minVal2 = 10000
                maxVal2 = document.getElementById("myRange2").max
            }
            else if (turningPointValue === '5B'){
                minVal2 = 100000
                maxVal2 = document.getElementById("myRange2").max
            }
            else if (turningPointValue === '6B'){
                minVal2 = 1000000
                maxVal2 = document.getElementById("myRange2").max
            }
            //taking care of initial state where there is an exception
            else{
                minVal2 = document.getElementById("myRange2").min
                maxVal2 = document.getElementById("myRange2").max
            }
        }
        else{
            // console.log('there2')
            minVal2 = Number(document.getElementById("myRange2").value)
            // console.log(minVal2)
            maxVal2 = document.getElementById("myRange2").max
        }

        return [minVal2, maxVal2]
    }


    findValues(minVal, maxVal, currentBaseTime, countriesOnly){
        // console.log(minVal)
        // console.log(maxVal)
        let finalFilter = []
        for (let i = 0; i < countriesOnly.length; i++){
            let area = countriesOnly[i]
            let values = []
            for (let time of this.selectedTimes){
                if (time !== currentBaseTime){
                    let value = ((area[time].attacks - area[currentBaseTime].attacks)/area[currentBaseTime].attacks) * 100
                    let actualValue = isFinite(value) ? value : 0
                    values.push(actualValue)
                }
            }
            // console.log(values)
            if (maxVal === document.getElementById("myRange1").max){
                if (values.some(el => el >= minVal && el <= maxVal)){
                    finalFilter.push(area.country)
                }
            }
            else{
                if (values.some(el => el >= minVal && el < maxVal)){
                    finalFilter.push(area.country)
                }
            }
        }
        // console.log(finalFilter)
        return finalFilter
    }

    findRangePercentageChange(){
        let writtenPvalue = document.getElementById("PERCHANGEWRITE").value
        let minVal 
        let maxVal
        if (writtenPvalue === ''){
            // console.log('here')
            let turningPointValue = document.getElementById("PERCHANGECHOOSE").value
            if (turningPointValue === '0A'){
                minVal = document.getElementById("myRange1").min
                maxVal = document.getElementById("myRange1").max
            }
            else if (turningPointValue === '1A'){
                minVal = document.getElementById("myRange1").min
                maxVal = 0
            }
            else if (turningPointValue === '2A'){
                minVal = 0
                maxVal = document.getElementById("myRange1").max
            }
            else if (turningPointValue === '3A'){
                minVal = 100
                maxVal = document.getElementById("myRange1").max
            }
            else if (turningPointValue === '4A'){
                minVal = 1000
                maxVal = document.getElementById("myRange1").max
            }
            else if (turningPointValue === '5A'){
                minVal = 10000
                maxVal = document.getElementById("myRange1").max
            }
            else if (turningPointValue === '6A'){
                minVal = 100000
                maxVal = document.getElementById("myRange1").max
            }
            else if (turningPointValue === '7A'){
                minVal = 1000000
                maxVal = document.getElementById("myRange1").max
            }
            //taking care of initial state where there is an exception
            else{
                minVal = document.getElementById("myRange1").min
                maxVal = document.getElementById("myRange1").max
            }
        }
        else{
            // console.log('there')
            minVal = Number(document.getElementById("myRange1").value)
            // console.log(minVal)
            maxVal = document.getElementById("myRange1").max
        }
        return [minVal, maxVal]
    }


    filterCountries(countriesOnly){
        let currentBaseTime = document.getElementById("baseTP").value

        let [minVal, maxVal] = this.findRangePercentageChange()
        let finalFilter = this.findValues(minVal, maxVal, currentBaseTime, countriesOnly)
        countriesOnly = countriesOnly.filter(function(el) { 
            if (finalFilter.includes(el.country)){
                return el
            }
        });

        let [minVal2, maxVal2] = this.findRangeAbsoluteChange()
        let finalFilter2 = this.findValues2(minVal2, maxVal2, currentBaseTime, countriesOnly)
        countriesOnly = countriesOnly.filter(function(el) { 
            if (finalFilter2.includes(el.country)){
                return el
            }
        });

        let [minVal3, maxVal3] = this.findRangeAbsolute()
        let finalFilter3 = this.findValues3(minVal3, maxVal3, countriesOnly)
        countriesOnly = countriesOnly.filter(function(el) { 
            if (finalFilter3.includes(el.country)){
                return el
            }
        });
        // console.log(countriesOnly)

        return countriesOnly
    }

    drawLinechart(){
        // console.log(this.receivedValForCountry)


        let filteredCountriesOnly = []
        if (this.receivedValForCountry === "non-country"){
            filteredCountriesOnly = this.filterCountries(this.neededData)
        }
        else{
            for (let country of this.neededData){
                if (country.country === this.receivedValForCountry){
                    filteredCountriesOnly.push(country)
                }
            }
        }

        




        let dimensionOfLineChartHeight = 700
        if (this.selectedTimes.length > 10){
            dimensionOfLineChartHeight = 700 + 30 * (this.selectedTimes.length - 10)
        }

        // console.log(dimensionOfLineChartHeight)
        let lineChartView = document.querySelectorAll(".linechartView");
        for (var i= 0; i < lineChartView.length ; i++) { 
            lineChartView[i].style.height = dimensionOfLineChartHeight + "px"
            lineChartView[i].style.width = 700 + "px"
            // console.log(lineChartView[i])
        }
        let linechartElement = document.getElementById("line-chart-aa")
        linechartElement.style.height = 700+"px"
        linechartElement.style.width = dimensionOfLineChartHeight+"px"
        
        // console.log(linechartElement.style)

        


        // LineChartAttacks.countries = filteredCountriesOnly


        let pad_left = 50
        let pad_right = 60
        let pad_bottom = 280
        let pad_top = 10
        let attacksByPlaceMappedByLocation = new Map([])
        let csvTypeData = []

        for (let country of filteredCountriesOnly){
            let number = 1
            let val = []
            for (let time of this.selectedTimes){
                let instance = {attacks: country[time].attacks, attackers: country[time].attackers, country: country.country, time: number}
                val.push(instance)
                csvTypeData.push(instance)
                number = number + 1
            }
            attacksByPlaceMappedByLocation.set(country.country, val)
        }

        // console.log(attacksByPlaceMappedByLocation)

        let attacksNum = []
        let attackersNum = []
        for (let [key, value] of attacksByPlaceMappedByLocation) {
          value.forEach(function(element){
            element.attacks = parseFloat(element.attacks)
            attacksNum.push(element.attacks)
            element.attackers = parseFloat(element.attackers)
            attackersNum.push(element.attackers)
          })
        }

        let diff = dimensionOfLineChartHeight - 700
        // console.log(diff)


        let lineChart = d3.select('#line-chart-aa').attr("transform", "translate("+(-(diff/2))+","+(diff/2)+")rotate(-90)")

        let a = document.getElementById("line-chart-aa")
        // console.log("x:", a.getBoundingClientRect().x)
        // console.log("y:", a.getBoundingClientRect().y)

        // console.log(this.selectedTimes)


        this.dateToTP = {}
        
        let k = 1
        for (let j = 0; j < this.selectedTimes.length; j++){
            this.dateToTP['TP' + k] = this.selectedTimes[j]
            k++
        }

        let lowerLimit = 0.9
        let upperlimit = this.selectedTimes.length
        //console.log(limit)
        let that = this
        let xScale = d3.scaleLinear().domain([lowerLimit, upperlimit]).range([pad_left, 700 - pad_right + (diff)]);
        let xAxis = d3.axisBottom(xScale).ticks(this.selectedTimes.length)
        .tickFormat(x => {
            if (x % 1 === 0){
                let str = 'TP' + x
                return that.dateToTP[str]
            }
            else{
                return ''
            }
        })

        // console.log(this.timePeriod)
        let dx 
        if (this.timePeriod !== 'day'){
            dx = "-0.5em"
        }
        else{
            dx = "0.1em"
        }
        // console.log(dx)

        
        lineChart.select("#x-axis-aa")
        .attr("transform", "translate(0," + (((dimensionOfLineChartHeight-diff) - pad_bottom)/2) + ")").call(xAxis)
        .selectAll("text").attr("font-weight",900)
        .style('fill', 'darkOrange')
        // .style('text-anchor', 'middle')
        .style("font-size", "22px")
        .attr("dx", dx)
        .attr("dy", "-.85em")
        .attr("transform", "rotate(90)")
        

        let yScale = d3.scaleLinear().domain([0, d3.max(attacksNum)]).range([((dimensionOfLineChartHeight-diff) - pad_bottom)/2 - 70, 30]);
        let yAxis = d3.axisRight().scale(yScale).ticks(2)//
        lineChart.select("#y-axis-aa").attr("transform", "translate(" + (640+diff) + ",0)").call(yAxis)
        .selectAll("text")
        .text(d => {
            if (d >= 1000000){
                return (d/1000000) + 'M'
            }
            else if (d >= 1000){
                return (d/1000).toFixed(0) + 'K'
            }
            else{
                return d
            }
        }).style("font-size", "18px")
        .style("text-anchor", "middle")
        .attr("dx", "-0.5em")
        .attr("dy", "-.95em")
        .attr("transform", "rotate(90)")



        let yScale2 = d3.scaleLinear().domain([0, d3.max(attackersNum)]).range([((dimensionOfLineChartHeight-diff) - pad_bottom)/2 + 70, ((dimensionOfLineChartHeight-diff) - pad_bottom)]);
        let yAxis2 = d3.axisRight().scale(yScale2).ticks(2)//
        lineChart.select("#y-axis-aa-2").attr("transform", "translate(" + (640+diff) + ",0)").call(yAxis2)
        .selectAll("text")
        .text(d => {
            if (d >= 1000000){
                return (d/1000000) + 'M'
            }
            else if (d >= 1000){
                return (d/1000).toFixed(0) + 'K'
            }
            else{
                return d
            }
        }).style("font-size", "18px")
        .style("text-anchor", "middle")
        .attr("dx", "-0.5em")
        .attr("dy", "-.95em")
        .attr("transform", "rotate(90)")

        let xVal = 105
        let yVal = 535
        if (this.selectedTimes.length > 10){
            xVal = 105 + (15 * (this.selectedTimes.length - 10))
            yVal = 535 + (15 * (this.selectedTimes.length - 10))
        } 
        lineChart.append('text').text('Country, Attacks, Attackers').attr('transform', 'rotate(90 ' +xVal + ' ' + yVal + ')').attr("id", "caaText")

        
        let xVal2 = 320
        let yVal2 = 360
        if (this.selectedTimes.length > 10){
            xVal2 = 320 + (15 * (this.selectedTimes.length - 10))
            yVal2 = 360 + (15 * (this.selectedTimes.length - 10))
        } 
        lineChart.append('text').text('Frequency').attr('transform', 'rotate(90 ' +(xVal2) + ' ' + yVal2 + ')').style("font-size", "20px").attr("id", "freq1")


        let xVal3 = 185
        let yVal3 = 495
        if (this.selectedTimes.length > 10){
            xVal3 = 185 + (15 * (this.selectedTimes.length - 10))
            yVal3 = 495 + (15 * (this.selectedTimes.length - 10))
        } 
        lineChart.append('text').text('Frequency').attr('transform', 'rotate(90 ' +(xVal3) + ' ' + yVal3 + ')').style("font-size", "20px").attr("id", "freq2")

        let xVal4 = 120
        let yVal4 = 550
        if (this.selectedTimes.length > 10){
            xVal4 = 115 + (15 * (this.selectedTimes.length - 10))
            yVal4 = 555 + (15 * (this.selectedTimes.length - 10))
        } 
        lineChart.append('text').text('Sorted By Attacks').attr('transform', 'rotate(90 ' +xVal4 + ' ' + yVal4 + ')').attr("fill", "red").attr("id", "sbaText")

        let xVal5 = 260
        let yVal5 = 420
        if (this.selectedTimes.length > 10){
            xVal5 = 260 + (15 * (this.selectedTimes.length - 10))
            yVal5 = 420 + (15 * (this.selectedTimes.length - 10))
        } 
        lineChart.append('text').text('Hover Below').attr('transform', 'rotate(90 ' +xVal5 + ' ' + yVal5 + ')').style("font-size", "20px").attr("fill", "red").attr("id", "hbText")


        lineChart.append('text').text('Hover over a Country to Highlight it on the line chart.').attr('x', 130).attr('y', 695).attr("fill", "red").style("font-size", "20px").attr("id", "hoverText")


        let myText
        if (this.timePeriod === 'day'){
            myText = 'Days'
        }
        else if (this.timePeriod === 'week'){
            myText = 'Weeks'
        }
        else{
            myText = 'Months'
        }
        
        lineChart.append('text').text('Countries Activity Over ' + myText).attr('transform', "translate("+(dimensionOfLineChartHeight/2 - 130)+","+(20)+")").style("font-size", "20px").attr("id", "overall")
        lineChart.append('text').text('Attacks').attr('transform', 'rotate(90 ' +(-20) + ' ' + 40 + ')').style("font-size", "20px").attr("id", "attacks")
        lineChart.append('text').text('Attackers').attr('transform', 'rotate(90 ' +(-140) + ' ' + 160 + ')').style("font-size", "20px").attr("id", "attackers")



        let lineColorScale 
        if (filteredCountriesOnly.length <= 20){
            lineColorScale = d3.scaleOrdinal(d3.schemeTableau10).domain(attacksByPlaceMappedByLocation.keys())
        }
        else{
            lineColorScale = d3.scaleOrdinal(['grey']).domain(attacksByPlaceMappedByLocation.keys())
        }


        let countryToColor = {}
        lineChart.select('#lines-aa').selectAll('path').data(function(){
            return attacksByPlaceMappedByLocation
        }).join('path')
                 .attr('fill', 'none').attr('stroke', ([group, values]) => {
                    countryToColor[group] = lineColorScale(group)
                    return lineColorScale(group)
                }).attr('stroke-width', function(){
                    if (filteredCountriesOnly.length <= 20){
                        return 3
                    }
                    else{
                        return 1
                    }
                })
                .attr('d', ([group, values]) => d3.line()
                                         .x((d) => xScale(d.time))
                                         .y((d) => yScale(d.attacks))
                                         (values)) 
        
        // console.log(countryToColor)


        lineChart.select('#lines-aa-2').selectAll('path').data(function(){
        return attacksByPlaceMappedByLocation
        }).join('path')
                .attr('fill', 'none').attr('stroke', ([group, values]) => {
                return countryToColor[group]
            }).attr('stroke-width', function(){
                if (filteredCountriesOnly.length <= 20){
                    return 3
                }
                else{
                    return 1
                }
            })
            .attr('d', ([group, values]) => d3.line()
                                        .x((d) => xScale(d.time))
                                        .y((d) => yScale2(d.attackers))
                                        .curve(d3.curveMonotoneX)
                                        (values)) 

        lineChart.on('mousemove', (event) => {
          if (event.offsetX > pad_left && event.offsetX < dimensionOfLineChartHeight - pad_right
            && event.offsetY > 20 && event.offsetY < 700 - pad_bottom) {
            // Set the line position
            lineChart.select('#overlay-aa').select('line').attr('stroke', 'black').attr('x1', event.offsetX).attr('x2', event.offsetX).attr('y1', 700 - pad_bottom).attr('y2', 20);
            const yearHovered = Math.ceil(xScale.invert(event.offsetX))
            // console.log('X:', yearHovered)
    
            let filteredData = csvTypeData
              .filter((row) => {
                return Number(row['time']) === yearHovered
              })
              .sort((rowA, rowB) => rowB.attacks - rowA.attacks)
            
            // console.log('Y:', filteredData)
    
            lineChart.select('#overlay-aa')
              .selectAll('text')
              .data(filteredData)
              .join('text')
              .text(d=>`${d.country}, ${this.convert(d.attacks)}, ${this.convert(d.attackers)}`)
              .attr('transform', (d, i) => {
                let xVal = 105
                let yVal = 530
                if (this.selectedTimes.length > 10){
                    xVal = 105 + (15 * (this.selectedTimes.length - 10))
                    yVal = 530 + (15 * (this.selectedTimes.length - 10))
                } 

                let xValue =  xVal - (10*i)
                
                let yValue = yVal - (10*i)
                
                return 'rotate(90 ' + xValue + ' ' + yValue + ')'
            })
              .attr('alignment-baseline', 'hanging')
              .attr('fill', (d) => lineColorScale(d.country))
              .style("font-size", "15px")
              .on("mouseover", function(e, d) {
                // console.log(d)
                $("#lines-aa").empty()
                $("#lines-aa-2").empty()

                let countryToColor2 = {}
                lineChart.select('#lines-aa').selectAll('path').data(function(){
                    return attacksByPlaceMappedByLocation
                }).join('path')
                         .attr('fill', 'none').attr('stroke', ([group, values]) => {
                            if (group === d.country){
                                return 'black'
                            }
                            countryToColor2[group] = lineColorScale(group)
                            return lineColorScale(group)
                        }).attr('stroke-width', ([group, values]) => {
                            if (group === d.country){
                                return 5
                            }
                            else if (filteredCountriesOnly.length <= 20){
                                return 3
                            }
                            else{
                                return 1
                            }
                        })
                        .attr('d', ([group, values]) => d3.line()
                                                 .x((d) => xScale(d.time))
                                                 .y((d) => yScale(d.attacks))
                                                 (values)) 


                lineChart.select('#lines-aa-2').selectAll('path').data(function(){
                    return attacksByPlaceMappedByLocation
                }).join('path')
                        .attr('fill', 'none').attr('stroke', ([group, values]) => {
                        if (group === d.country){
                            return 'black'
                        }
                        return countryToColor2[group]
                    }).attr('stroke-width', ([group, values]) => {
                        if (group === d.country){
                            return 5
                        }
                        else if (filteredCountriesOnly.length <= 20){
                            return 3
                        }
                        else{
                            return 1
                        }
                    })
                    .attr('d', ([group, values]) => d3.line()
                                                .x((d) => xScale(d.time))
                                                .y((d) => yScale2(d.attackers))
                                                .curve(d3.curveMonotoneX)
                                                (values)) 
                
            })
            .on("mouseout", function(e, d) {
                $("#lines-aa").empty()
                $("#lines-aa-2").empty()
                let countryToColor3 = {}
                lineChart.select('#lines-aa').selectAll('path').data(function(){
                    return attacksByPlaceMappedByLocation
                }).join('path')
                        .attr('fill', 'none').attr('stroke', ([group, values]) => {
                            countryToColor3[group] = lineColorScale(group)
                            return lineColorScale(group)
                        }).attr('stroke-width', function(){
                            if (filteredCountriesOnly.length <= 20){
                                return 3
                            }
                            else{
                                return 1
                            }
                        })
                        .attr('d', ([group, values]) => d3.line()
                                                .x((d) => xScale(d.time))
                                                .y((d) => yScale(d.attacks))
                                                (values)) 


                lineChart.select('#lines-aa-2').selectAll('path').data(function(){
                return attacksByPlaceMappedByLocation
                }).join('path')
                        .attr('fill', 'none').attr('stroke', ([group, values]) => {
                        return countryToColor3[group]
                    }).attr('stroke-width', function(){
                        if (filteredCountriesOnly.length <= 20){
                            return 3
                        }
                        else{
                            return 1
                        }
                    })
                    .attr('d', ([group, values]) => d3.line()
                                                .x((d) => xScale(d.time))
                                                .y((d) => yScale2(d.attackers))
                                                .curve(d3.curveMonotoneX)
                                                (values)) 
            })
          }
        });
    }

    convert(value){
        if (value >= 1000000){
            return (value/1000000).toFixed(1) + 'M'
        }
        else if (value >= 1000){
            return (value/1000).toFixed(1) + 'K'
        }
        else{
            return value
        }
    }

}