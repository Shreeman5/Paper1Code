class Table{
    static countriesChosenUsedInAnotherFunction

    constructor(neededData, baseTime, selectedTimes, absoluteAnomVal, percentAnomVal, percentMaxVal, receivedValForCountry){
        this.neededData = neededData
        this.baseTime = baseTime
        this.selectedTimes = selectedTimes
        this.absoluteAnomVal = absoluteAnomVal
        this.percentAnomVal = percentAnomVal
        this.percentMaxVal = percentMaxVal
        this.receivedValForCountry = receivedValForCountry

        let variables = new VariablesForTable(this.neededData, this.baseTime, this.selectedTimes)
        variables.countrySpecificInfo()
        // variables.userNameParsing()

        this.tableBody = document.getElementById('predictionTableBody');
        this.chosenCountries = []
        Table.countriesChosenUsedInAnotherFunction = []
        

        this.vizWidth = 60;
        this.vizHeight = 30; //originally 30
    }

    findValues3(minVal3, maxVal3){
        let finalFilter = []
        for (let i = 0; i < this.neededData.length; i++){
            let area = this.neededData[i]
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

    findValues2(minVal2, maxVal2, currentBaseTime){
        let finalFilter = []
        for (let i = 0; i < this.neededData.length; i++){
            let area = this.neededData[i]
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

        
    findValues(minVal, maxVal, currentBaseTime){
        let finalFilter = []
        for (let i = 0; i < this.neededData.length; i++){
            let area = this.neededData[i]
            let values = []
            for (let time of this.selectedTimes){
                if (time !== currentBaseTime){
                    let value = ((area[time].attacks - area[currentBaseTime].attacks)/area[currentBaseTime].attacks) * 100
                    let actualValue = isFinite(value) ? value : 0
                    values.push(actualValue)
                }
            }
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
        return finalFilter
    }

    findRangePercentageChange(){
        let writtenPvalue = document.getElementById("PERCHANGEWRITE").value

        // console.log(writtenPvalue)
        // console.log(typeof writtenPvalue)
        let minVal 
        let maxVal
        if (writtenPvalue === ''){
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


    filterCountries(){
        let currentBaseTime = document.getElementById("baseTP").value

        let [minVal, maxVal] = this.findRangePercentageChange()
        let finalFilter = this.findValues(minVal, maxVal, currentBaseTime)
        this.neededData = this.neededData.filter(function(el) { 
            if (finalFilter.includes(el.country)){
                return el
            }
        });

        let [minVal2, maxVal2] = this.findRangeAbsoluteChange()
        let finalFilter2 = this.findValues2(minVal2, maxVal2, currentBaseTime)
        this.neededData = this.neededData.filter(function(el) { 
            if (finalFilter2.includes(el.country)){
                return el
            }
        });

        let [minVal3, maxVal3] = this.findRangeAbsolute()
        let finalFilter3 = this.findValues3(minVal3, maxVal3)
        this.neededData = this.neededData.filter(function(el) { 
            if (finalFilter3.includes(el.country)){
                return el
            }
        });

        // console.log(this.neededData)
    }


    sortData(){
        let currentBaseTime = document.getElementById("baseTP").value
        let sortTime = document.getElementById("sortTP").value

        if (currentBaseTime === sortTime){
            this.neededData.sort((rowA, rowB) => rowB[sortTime].attacks - rowA[sortTime].attacks)
        }
        else{
            this.neededData.sort((rowA, rowB) => {
                let y = (rowB[sortTime].attacks - rowB[currentBaseTime].attacks)/rowB[currentBaseTime].attacks
                let x = (rowA[sortTime].attacks - rowA[currentBaseTime].attacks)/rowA[currentBaseTime].attacks 
                let b = isFinite(y) ? y : 0
                let a = isFinite(x) ? x : 0
                return b - a
            })
        }
    }

    helperFunction(){
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

    drawTable(){     
        if (this.receivedValForCountry !== "non-country"){
            for (let country of this.neededData){
                if (country.country === this.receivedValForCountry){
                    this.neededData = [country]
                    break
                }
            }
        }
        else{
            this.sortData()
            this.filterCountries()
        }

        let that = this
        this.changeStyle = function(e) {
            if(e.target.__data__.class === 'country'){ 
                let countryChosen = e.target.__data__.value
                if (that.chosenCountries.includes(countryChosen)){
                    that.chosenCountries = that.chosenCountries.filter(item => item !== countryChosen)
                }
                else{
                    that.chosenCountries.push(countryChosen)
                }
                // console.log(countryChosen)
                // console.log(that.chosenCountries)
                for (let i = 0, row; row = that.tableBody.rows[i]; i++) {
                    for (let j = 0, col; col = row.cells[j]; j++) {
                        // console.log('A:', that.chosenCountries)
                        // console.log('B:', col.innerText)
                        if (that.chosenCountries.includes(col.innerText)){
                            // console.log('C')
                            col.style.font = "25px times"
                            col.style.color = "red"
                        }
                        else{
                            col.style.font = "20px times"
                            col.style.color = 'black'
                        }
                    }  
                }
            }
        };
        this.tableBody.addEventListener('click', this.changeStyle, false)



        let rowSelection = d3.select('#predictionTableBody')
            .selectAll('tr')
            .data(this.neededData)
            .join('tr')

        
        rowSelection.on('click', (event, d) => 
        { 
            // console.log(event.target.__data__.class)
            if(event.target.__data__.class === 'country'){ 
                if (Table.countriesChosenUsedInAnotherFunction.includes(d.cc)){
                    Table.countriesChosenUsedInAnotherFunction = Table.countriesChosenUsedInAnotherFunction.filter(item => item !== d.cc)
                }
                else{
                    Table.countriesChosenUsedInAnotherFunction.push(d.cc)
                }


                let checkedBoxes2 = document.querySelectorAll('input[type="checkbox"]:checked');
                let selectedTPsLength2 = checkedBoxes2.length

                if ((Table.countriesChosenUsedInAnotherFunction.length > 1 || Table.countriesChosenUsedInAnotherFunction.length === 0) && selectedTPsLength2 > 1){
                    alert("Press ok. Then, EITHER have multiple countries and one time period OR have multiple time periods and one country.")
                    // console.log('here')
                    this.helperFunction()
                }
                else{
                    // console.log('there')
                    this.helperFunction()
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
        })


        let tabularLogic = new TableLogic()
        let forecastSelection = rowSelection.selectAll('td')
            .data(tabularLogic.rowToCellDataTransform)
            .join('td')
            .attr('class', d => d.class)
        
        forecastSelection.filter(d => d.type === 'text')
            .text(d => d.value)
            .style("font", "20px times")


        let vizSelection = forecastSelection.filter(d => d.type === 'viz');

        let svgSelect = vizSelection.selectAll('svg')
            .data(d => [d])
            .join('svg')
            .attr('width', this.vizWidth)
            .attr('height', this.vizHeight)

        let grouperSelect = svgSelect.selectAll('g')
        .data(d => [d])
        .join('g')

        this.shapes = new ShapesAroundTable(this.absoluteAnomVal, this.percentAnomVal, this.percentMaxVal)
        this.shapes.addRectangles(grouperSelect.filter((d,i) => i === 0));
        this.shapes.addTrianglesOrConstants(grouperSelect.filter((d,i) => i === 0));
        this.shapes.addLegend()
        // this.shapes.setBoundariesOfCell(grouperSelect.filter((d,i) => i === 0))


        let myTable = document.getElementById('predictionTable')

        for (let i = 0; i < myTable.rows.length; i++){
            for (let j = 0; j < myTable.rows[i].cells.length; j++){
                if (j === 0 && i > 0){
                    let cell = myTable.rows[i].cells[j]
                    let stringVal = cell.textContent

                    // let val1 = stringVal.substring(0, stringVal.length - 4)
                    // cell.textContent = val1

                    let val2 = stringVal.substring(stringVal.length - 3, stringVal.length - 1)      
                    let img = document.createElement("img")
                    img.src = 'https://flagcdn.com/32x24/'+val2.toLowerCase()+'.png'
                    img.alt = "Image"
                    img.style.position = "relative"
                    img.style.top = "0px"
                    img.style.left = "10px"
                    cell.appendChild(img)
                }
            }
        }
    }


}