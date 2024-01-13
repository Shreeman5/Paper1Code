class Donut{

    constructor(givenCountries){
        this.givenCountries = givenCountries
        //console.log(givenCountries)
    }

    dataForFourthViz(neededData){
        //console.log('X:', neededData)
        let idSelector = function() { return this.id; }
        let checkedBoxes = $(":checkbox:checked").map(idSelector).get()

        let widthNumber = 0
        let heightNumber = 0
        let assignedWidth = ''
        let assignedHeight = ''

        let workingLength = 0
        if (checkedBoxes.length > this.givenCountries.length){
            workingLength = checkedBoxes.length
        }
        else{
            workingLength = this.givenCountries.length
        }

        if (workingLength <= 2){
            widthNumber = 680
            heightNumber = 480
            assignedWidth = widthNumber + 'px'
            assignedHeight = heightNumber + 'px'
        }
        else{
            widthNumber = 680 + (60 * (workingLength - 2))
            heightNumber = 480 + (45 * (workingLength - 2))
            assignedWidth = widthNumber + 'px'
            assignedHeight = heightNumber + 'px'
        }

        let margin = {top: 150, right: 30, bottom: 20, left: 50},
        width = widthNumber - margin.left - margin.right,
        height = heightNumber - margin.top - margin.bottom;

        let starterValue =  document.getElementById('predictionTable').offsetWidth + 680
        let donutStarter = starterValue + "px"
        
        document.getElementById("donutGraph").style.outline = "5px dashed black"
        document.getElementById("donutGraph").style.left = donutStarter
        document.getElementById("donutGraph").style.top = "1670px"
        document.getElementById("donutGraph").style.width = assignedWidth
        document.getElementById("donutGraph").style.height = assignedHeight

        let svg = d3.select("#donutGraph")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
        
        svg.append("rect").attr("x", "-40").attr("y", "-140").attr("width", "20").attr("height", "20").style("fill", "navy")
        svg.append('text').attr("x", "-15").attr("y", "-120").text("hosting").style("fill", "navy").style("font-size", "25px")
        
        svg.append("rect").attr("x", "70").attr("y", "-140").attr("width", "20").attr("height", "20").style("fill", "grey")
        svg.append('text').attr("x", "95").attr("y", "-120").text("isp").style("fill", "grey").style("font-size", "25px")

        svg.append("rect").attr("x", "135").attr("y", "-140").attr("width", "20").attr("height", "20").style("fill", "maroon")
        svg.append('text').attr("x", "160").attr("y", "-120").text("education").style("fill", "maroon").style("font-size", "25px")

        svg.append("rect").attr("x", "275").attr("y", "-140").attr("width", "20").attr("height", "20").style("fill", "purple")
        svg.append('text').attr("x", "300").attr("y", "-120").text("business").style("fill", "purple").style("font-size", "25px")

        svg.append("rect").attr("x", "410").attr("y", "-140").attr("width", "20").attr("height", "20").style("fill", "black")
        svg.append('text').attr("x", "435").attr("y", "-120").text("NONE").style("fill", "black").style("font-size", "25px")
        
        let that2 = this
        svg.append('text').attr("x", "-45").attr("y", "-80")
        .text(function(){
            if (that2.givenCountries.length === 1){
                return that2.givenCountries[0] + '[ASN Type Frequency Over Time Periods]'
            }
            else{
                return checkedBoxes[0] + '[ASN Type Frequency For Countries]'
            } 
        })
        .style("font-size", "30px")

        let that = this
        svg.append('text').attr("x", "-45").attr("y", "-45")
        .text(function(){
            if (that.givenCountries.length === 1){
                return "Left Most Checked TP = Innermost Donut"
            }
            else{
                return "Top Most Selected Country = Innermost Donut"
            }
        })
        .style("fill", "black").style("font-size", "30px")
        svg.append('text').attr("x", "-45").attr("y", "-10")
        .text(function(){
            if (that.givenCountries.length === 1){
                return "Right Most Checked TP = Outermost Donut"
            }
            else{
                return "Bottom Most Selected Country = Outermost Donut"
            }
        })
        .style("fill", "black").style("font-size", "30px")

        this.makeDonutChart(neededData, svg, widthNumber, heightNumber)
    }


    /* Code from line x to y citation:

    Title: Most basic donut chart in d3.js
    Author: Holtz, Y
    Date: N/A
    Code version: N/A
    Type: Source Code
    Availability: https://d3-graph-gallery.com/graph/donut_basic.html

    Notes: Cited code has been modified */

    makeDonutChart(data, svg, widthNumber, heightNumber){
        let innerRadiusValue = 125
        let outerRadiusValue = 140

        //console.log(data)

        for (const key in data){
            // console.log(innerRadiusValue)
            // console.log(outerRadiusValue)
            let x = data[key]

            for (const key2 in x){
                //console.log(key2)
                let desiredData = {}
                let totalCount = 0
                for (const values of x[key2]){
                    desiredData[values['asn_type']] = values['count']
                    totalCount += values['count']
                }

                //console.log(desiredData)
                let centerWidth = (widthNumber/2) - 220
                let centerHeight = (heightNumber/2) - 80
                const g = svg.append("g")
                            .attr("transform", `translate(${centerWidth}, ${centerHeight})`)

                let color = d3.scaleOrdinal(["hosting", "isp", "education", "business", "NONE"], ["navy", "grey", "maroon", "purple", "black"])

                let pie = d3.pie()
                    .sort(null) // Do not sort group by size
                    .value(function(d) {return d[1] })
                let data_ready = pie(Object.entries(desiredData))


                // The arc generator
                let arc = d3.arc()
                    .innerRadius(innerRadiusValue)         // This is the size of the donut hole
                    .outerRadius(outerRadiusValue)
                
                
                let that = this
                g.selectAll('allSlices')
                    .data(data_ready)
                    .join('path')
                    .attr('d', arc)
                    .attr('fill', function(d){ 
                        return(color(d.data[0])) 
                    })
                    .attr("stroke", "white")
                    .style("stroke-width", "2px")
                    .style("opacity", 0.7)
                    .on('mouseover', function(e, d){
                        let totalCountinString = ''
                        if (totalCount >= 1000000){
                            totalCountinString = (totalCount/1000000).toFixed(1) + 'M'
                        }
                        else if (totalCount >= 100000){
                            totalCountinString = (totalCount/1000000).toFixed(2) + 'M'
                        }
                        else if (totalCount >= 10000){
                            totalCountinString =  (totalCount/1000).toFixed(1) + 'K'
                        }
                        else if (totalCount >= 1000){
                            totalCountinString = (totalCount/1000).toFixed(2) + 'K'
                        }
                        else{
                            totalCountinString = totalCount.toFixed(1) + ''
                        }
                        
                        let specificCountinString = ''
                        if (d.data[1] >= 1000000){
                            specificCountinString = (d.data[1]/1000000).toFixed(1) + 'M'
                        }
                        else if (d.data[1] >= 100000){
                            specificCountinString = (d.data[1]/1000000).toFixed(2) + 'M'
                        }
                        else if (d.data[1] >= 10000){
                            specificCountinString = (d.data[1]/1000).toFixed(1) + 'K'
                        }
                        else if (d.data[1] >= 1000){
                            specificCountinString = (d.data[1]/1000).toFixed(2) + 'K'
                        }
                        else{
                            specificCountinString = d.data[1].toFixed(1) + ''
                        }

                        //console.log(this.givenCountries.length)
                        let percentageString = ((d.data[1]/totalCount) * 100).toFixed(2) + '%'
                        svg.append('text').attr("id", "tempTextSpecificAttack").attr("transform", `translate(${centerWidth - 110}, ${centerHeight - 30})`)
                                    .text(d.data[0] + ": " + specificCountinString).style("font-size", "20px").style("fill", color(d.data[0]))
                        svg.append('text').attr("id", "tempTextTotalAttacks").attr("transform", `translate(${centerWidth - 110}, ${centerHeight})`)
                                    .text("Total Attacks: " + totalCountinString).style("font-size", "20px")
                        svg.append('text').attr("id", "tempTextPercentage").attr("transform", `translate(${centerWidth - 115}, ${centerHeight + 30})`)
                                    .text(d.data[0] + " share = " + percentageString).style("font-size", "20px").style("fill", color(d.data[0]))
                        svg.append('text').attr("id", "tempTextTimePeriod").attr("transform", `translate(${centerWidth - 60}, ${centerHeight + 60})`)
                                    .text(function(){
                                        if (that.givenCountries.length === 1){
                                            return key2
                                        }
                                        else{
                                            return key
                                        }
                                    })
                                    .style("font-size", "20px")

                        d3.select(this).attr("stroke", "lime").style("stroke-width", "7px")
                        
                        
                    })
                    .on('mouseout', function(e, d){
                        document.getElementById("tempTextTotalAttacks").remove()
                        document.getElementById("tempTextSpecificAttack").remove()
                        document.getElementById("tempTextPercentage").remove()
                        document.getElementById("tempTextTimePeriod").remove()

                        d3.select(this).attr("stroke", "white").style("stroke-width", "2px")
                    })


                innerRadiusValue = outerRadiusValue + 5
                outerRadiusValue = innerRadiusValue + 15
            }
        }
    }



    fetchData3(){
        let checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
        let selectedWeeksLength = checkedBoxes.length

        let selected = Array.from(checkedBoxes).map(x => x.value)
        // console.log('Weeks:', selected)
        // console.log(this.countryCode)

        let that = this
        if ( (selectedWeeksLength >= 2 && this.givenCountries.length === 1)  || 
        (selectedWeeksLength === 1 && this.givenCountries.length >= 2)  ){
            getData3(selected, this.givenCountries).then(function(loadedData){
                that.dataForFourthViz(loadedData, selected)
            })
        }
        else{
            // console.log("not enough checks")
        }
    }

}


async function getData3(selected, countries){
    let givenValue = document.getElementById("data").value
    let givenValue2 = document.getElementById("timePeriod").value

    let api_address = 'https://kibana.emulab.net/top/asn/type?cluster='+givenValue+'&cc='+countries.join(',')+'&range='+selected.join(',')+'&period='+givenValue2
    //console.log(api_address)
    const data = await fetch(api_address)
    const jsonData = await data.json()
    
    //console.log('op:', jsonData)
    return jsonData

}