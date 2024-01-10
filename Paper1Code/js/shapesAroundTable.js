class ShapesAroundTable{

    constructor(absoluteAnomVal, percentAnomVal, percentMaxVal){
        this.percentAnomVal = percentAnomVal
        this.percentMaxVal = percentMaxVal
        this.colorScaleForPercentAttacks= d3.scaleSequential()
        .interpolator(d3.interpolateGreens)
        .domain([0,percentAnomVal])

        this.absoluteAnomVal = absoluteAnomVal
        this.slider3ValueMin = document.getElementById("myRange3").min
        this.colorScaleForAbsoluteAttacks = d3.scaleSequential()
        .interpolator(d3.interpolateBlues)
        .domain([this.slider3ValueMin,absoluteAnomVal])
        this.slider3ValueMax = document.getElementById("myRange3").max


        this.periodValue = VizScreen.givenTimePeriod
        this.periodText
        this.periodText2
        if (this.periodValue === "month"){
            this.periodText = "months"
            this.periodText2 = "Months"
        }
        else if(this.periodValue === "week"){
            this.periodText = "weeks"
            this.periodText2 = "Weeks"
        }
        else if (this.periodValue === "day"){
            this.periodText = "days"
            this.periodText2 = "Days"
        }
    }


    addRectangles(containerSelect) {
        this.rectangles = containerSelect.append('rect')
            .attr("id", "rect1")
            .attr('x', 10)
            .attr('y', 5)
            .attr('width', 20)
            .attr('height', 20)     
            .attr('stroke', 'black')
            .attr('stroke-width', 2)
            .attr('fill', d => {
                if (d.value >= this.absoluteAnomVal){
                    return 'purple'
                }
                else{
                    return this.colorScaleForAbsoluteAttacks(d.value)
                }
            })

        let that = this
        let tip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 10).style("font-size", "30px")
        this.rectangles.on("mouseover", function(e, d) {
            let thisText
            if (d.value === 1){
                thisText = "attack"
            }
            else{
                thisText = "attacks"
            }
            let tiptext = "This country attacked "+that.better(d.value)+ " times on this "+that.periodValue+"."
            tip.style("opacity", 5)
                .html(tiptext)
                .style("left", (e.pageX) + "px")
                .style("top", (e.pageY) + "px")
                .style("width", "500px")
        })
        .on("mouseout", function(d) {
            tip.style("opacity", 0)
        })

    }


    addTrianglesOrConstants(containerSelect) {
        this.triangles = containerSelect
            .append("path")
            .attr("id", "changeTriangles")
            .attr("d",  d3.symbol()
                        .type(d3.symbolTriangle)
                        .size(d => {
                            if (d.value2 !== 0){
                                return 200
                            }
                            else{
                                return 0
                            }
                        })
            )
            .style("stroke", "black")
            .attr('stroke-width', 2)
            .attr("fill", d => {
                // console.log('YY:', d.value2)
                if (d.value2 > this.percentAnomVal){
                    return 'purple'
                }
                else if (d.value2 > 0){
                    return this.colorScaleForPercentAttacks(d.value2)
                }
                else if (d.value2 === 0){
                    return 'white'
                }
                else if (d.value2 < 0){
                    return 'grey'
                }
            })
            .attr("transform", d => {
                if (d.value2 > 0){
                    return "translate(45, 18)"
                }
                else if (d.value2 < 0){
                    return "translate(45, 12)rotate(180)"
                } 
            })
        
        this.rectangles2 = containerSelect.append('rect')
            .attr("id", "rect2")
            .attr('x', 32)
            .attr('y', 12)
            .attr('width', 20)
            .attr('height', d => {
                if (d.value2 === 0){
                    return 4
                }
                else{
                    return 0
                }
            })     
            .attr('stroke-width', 2)
            .attr('fill', d => {
                if (d.value2 === 0){
                    return 'grey'
                }
            })


        let that = this
        let tip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 10).style("font-size", "30px")
        this.triangles.on("mouseover", function(e, d) {
            let text 
            if (d.value2 < 0){
                text = 'decreased'
            }
            else{
                text = 'increased'
            }
            let tiptext = "This country's attacks "+ text +" by "+that.better(d.value2)+ "% from base "+that.periodValue+" to this "+that.periodValue+". Absolute change was "+that.better(d.value3)+"."
            tip.style("opacity", 5)
                .html(tiptext)
                .style("left", (e.pageX) + "px")
                .style("top", (e.pageY) + "px")
                .style("width", "600px")
        })
        .on("mouseout", function(d) {
            tip.style("opacity", 0)
        })

        this.rectangles2.on("mouseover", function(e, d) {
            let tiptext = "EITHER, this "+that.periodValue+" is base "+that.periodValue+" and therefore. there is no percentage or absolute change. \n OR, base "+that.periodValue+" is 0 and therefore, percentage change is incalculable. Absolute change is "+that.better(d.value3)+"."
            tip.style("opacity", 5)
                .html(tiptext)
                .style("left", (e.pageX) + "px")
                .style("top", (e.pageY) + "px")
                .style("width", "600px")
        })
        .on("mouseout", function(d) {
            tip.style("opacity", 0)
        })
    }


    addLegend(){
        // add Absolute Legend
        let svg = d3.select('#legend')

        svg.append("text").attr("x", 40).attr("y", 20).text("Absolute Attack Numbers").style("font", "20px times")

        let defs = svg.append("defs");

        //Append a linearGradient element to the defs and give it a unique id
        let linearGradient = defs.append("linearGradient")
            .attr("id", "linear-gradient-4");
    
        linearGradient
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "0%")

         //Set the color for the start (0%)
        linearGradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", this.colorScaleForAbsoluteAttacks(this.slider3ValueMin)); //light blue

        //Set the color for the end (100%)
        linearGradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", this.colorScaleForAbsoluteAttacks(this.absoluteAnomVal)); //dark blue

        svg.append("rect")
        .attr("x", 40)
        .attr("y", 30)
        .attr("width", 170)
        .attr("height", 20)
        .style("fill", "url(#linear-gradient-4)")
        .attr('stroke', 'black')
        .attr('stroke-width', 2)

        svg.append("rect")
        .attr("x", 210)
        .attr("y", 30)
        .attr("width", 35)
        .attr("height", 20)
        .style("fill", "purple")
        .attr('stroke', 'black')
        .attr('stroke-width', 2)

        svg.append("path")
            .attr("d",  d3.symbol()
                        .type(d3.symbolTriangle)
                        .size(d => {
                            return 50
                        })
            )
            .style("stroke", "black")
            .attr('stroke-width', 2)
            .attr("fill", "black")
            .attr("transform","translate(40, 60)")

        svg.append("path")
            .attr("d",  d3.symbol()
                        .type(d3.symbolTriangle)
                        .size(d => {
                            return 50
                        })
            )
            .style("stroke", "black")
            .attr('stroke-width', 2)
            .attr("fill", "black")
            .attr("transform","translate(210, 60)")

        svg.append("path")
            .attr("d",  d3.symbol()
                        .type(d3.symbolTriangle)
                        .size(d => {
                            return 50
                        })
            )
            .style("stroke", "black")
            .attr('stroke-width', 2)
            .attr("fill", "black")
            .attr("transform","translate(245, 60)")

        svg.append("text").attr("x", 0).attr("y", 80).text("Min: " +this.better(this.slider3ValueMin)).style("font", "18px times")
        svg.append("text").attr("x", 65).attr("y", 80).text("Anomaly Threshold").style("font", "18px times")
        svg.append("text").attr("x", 65).attr("y", 100).text("(95 percentile value): " +this.better(this.absoluteAnomVal)).style("font", "18px times")
        svg.append("text").attr("x", 240).attr("y", 80).text("Max: " +this.better(this.slider3ValueMax)).style("font", "18px times")


        //add Percentage Legend

        svg.append("text").attr("x", 420).attr("y", 20).text("Percentage Change in Attacks").style("font", "20px times")

        let defs2 = svg.append("defs");

        //Append a linearGradient element to the defs and give it a unique id
        let linearGradient2 = defs2.append("linearGradient")
            .attr("id", "linear-gradient-5");
    
        linearGradient2
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "0%")

        //  //Set the color for the start (0%)
        linearGradient2.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", this.colorScaleForPercentAttacks(0)); //light blue

        // //Set the color for the end (100%)
        linearGradient2.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", this.colorScaleForPercentAttacks(this.percentAnomVal)); //dark blue

        svg.append("rect")
        .attr("x", 453)
        .attr("y", 30)
        .attr("width", 170)
        .attr("height", 20)
        .style("fill", "url(#linear-gradient-5)")
        .attr('stroke', 'black')
        .attr('stroke-width', 2)

        svg.append("rect")
        .attr("x", 420)
        .attr("y", 30)
        .attr("width", 33)
        .attr("height", 20)
        .style("fill", "grey")
        .attr('stroke', 'black')
        .attr('stroke-width', 2)

        svg.append("rect")
        .attr("x", 623)
        .attr("y", 30)
        .attr("width", 33)
        .attr("height", 20)
        .style("fill", "purple")
        .attr('stroke', 'black')
        .attr('stroke-width', 2)

        svg.append("path")
            .attr("d",  d3.symbol()
                        .type(d3.symbolTriangle)
                        .size(d => {
                            return 50
                        })
            )
            .style("stroke", "black")
            .attr('stroke-width', 2)
            .attr("fill", "black")
            .attr("transform","translate(421, 60)")

        svg.append("path")
            .attr("d",  d3.symbol()
                        .type(d3.symbolTriangle)
                        .size(d => {
                            return 50
                        })
            )
            .style("stroke", "black")
            .attr('stroke-width', 2)
            .attr("fill", "black")
            .attr("transform","translate(453, 60)")

        svg.append("path")
            .attr("d",  d3.symbol()
                        .type(d3.symbolTriangle)
                        .size(d => {
                            return 50
                        })
            )
            .style("stroke", "black")
            .attr('stroke-width', 2)
            .attr("fill", "black")
            .attr("transform","translate(623, 60)")

        svg.append("path")
            .attr("d",  d3.symbol()
                        .type(d3.symbolTriangle)
                        .size(d => {
                            return 50
                        })
            )
            .style("stroke", "black")
            .attr('stroke-width', 2)
            .attr("fill", "black")
            .attr("transform","translate(655, 60)")

        svg.append("text").attr("x", 355).attr("y", 80).text("Min: -100").style("font", "18px times")
        svg.append("text").attr("x", 448).attr("y", 80).text("0").style("font", "18px times")

        svg.append("text").attr("x", 483).attr("y", 80).text("Anomaly Threshold").style("font", "18px times")
        svg.append("text").attr("x", 483).attr("y", 100).text("(95 percentile value): " +this.better(this.percentAnomVal)).style("font", "18px times")
        svg.append("text").attr("x", 655).attr("y", 80).text("Max: " +this.better(this.percentMaxVal)).style("font", "18px times")

        svg.append("text").attr("x", 0).attr("y", 130).text("Select EITHER 1 Country && Multiple "+this.periodText+" OR 1 "+this.periodValue+" && Multiple Countries.").style("font", "18px times").attr("fill", "red")
        svg.append("text").attr("x", 0).attr("y", 150).text("SELECT a Country by clicking it. SELECT a "+this.periodValue+" by clicking its accompanying checkbox.").style("font", "18px times").attr("fill", "red")
        svg.append("text").attr("x", 0).attr("y", 170).text("Upon APPROPRIATE SELECTION, 2 or 3 Visualizations will appear on the right.").style("font", "18px times").attr("fill", "red")
        svg.append("text").attr("x", 0).attr("y", 190).text("HOVER on the shapes in the table for more details.").style("font", "18px times").attr("fill", "red")
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
        else if (Math.abs(value) > 0){
            return value.toFixed() + ''
        }
        else{
            return 0 + ''
        }
    }

}