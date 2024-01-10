class DynamicSlider{

    constructor(neededData, baseTime){
        this.neededData = neededData
        this.baseTime = baseTime
    }

    percentChangeSliderValues(){
        let baseAttackNumbers = []
        for (let country of this.neededData){
            for (const [key, numbers] of Object.entries(country)) {
                if (key === this.baseTime){
                    for (const [key2, value] of Object.entries(numbers)) {
                        if (key2 === 'attacks'){
                            baseAttackNumbers.push(value)
                        }
                    }
                }
            }
        }

        let i = 0
        let arr = []
        let stuff = {}
        for (let country of this.neededData){
            for (const [key, numbers] of Object.entries(country)) {
                if (key !== this.baseTime && key !== 'country'){
                    for (const [key2, value] of Object.entries(numbers)) {
                        if (key2 === 'attacks'){
                            let percentDiff = ((value - baseAttackNumbers[i])/baseAttackNumbers[i]) * 100
                            let actDiff = isFinite(percentDiff) ? percentDiff : 0
                            arr.push(actDiff)
                            stuff[country.country] = actDiff
                        }
                    }
                }
            }
            i++
        }

        //console.log(arr)

        arr.sort(function(a, b){return a-b;})
        let firstIndexNumber = arr[0]
        let lastIndexNumber = arr[arr.length - 1]
        return [firstIndexNumber, lastIndexNumber, arr]
    }

    absoluteChangeSliderValues(){
        let baseAttackNumbers = []
        for (let country of this.neededData){
            for (const [key, numbers] of Object.entries(country)) {
                if (key === this.baseTime){
                    for (const [key2, value] of Object.entries(numbers)) {
                        if (key2 === 'attacks'){
                            baseAttackNumbers.push(value)
                        }
                    }
                }
            }
        }

        let i = 0
        let arr = []
        for (let country of this.neededData){
            for (const [key, numbers] of Object.entries(country)) {
                if (key !== this.baseTime && key !== 'country'){
                    for (const [key2, value] of Object.entries(numbers)) {
                        if (key2 === 'attacks'){
                            let absoluteDiff = value - baseAttackNumbers[i]
                            arr.push(absoluteDiff)
                        }
                    }
                }
            }
            i++
        }

        arr.sort(function(a, b){return a-b;})
        let firstIndexNumber = arr[0]
        let lastIndexNumber = arr[arr.length - 1]
        return [firstIndexNumber, lastIndexNumber, arr]
    }

    //gathers all absolute numbers, irrespective of base date, seprates out 95% anomalies
    absoluteAnomalySliderValues(){
        let arr = []
        for (let country of this.neededData){
            for (const [key, numbers] of Object.entries(country)) {
                if (key !== 'country'){
                    for (const [key2, value] of Object.entries(numbers)) {
                        if (key2 === 'attacks'){
                            arr.push(value)
                        }
                    }
                }
            }
        }
        arr.sort(function(a, b){return a-b;})
        let firstIndexNumber = arr[0]
        let anomalyThreshold = arr[Math.floor(arr.length * 0.95)]
        let lastIndexNumber = arr[arr.length - 1]
        return [firstIndexNumber, anomalyThreshold, lastIndexNumber, arr]
    }

    //gathers all percentage numbers, irrespective of base date, seprates out 95% anomalies
    percentAnomalyValue(){
        let arr = []
        for (let country of this.neededData){
            for (const [key, numbers] of Object.entries(country)) {
                if (key !== 'country'){
                    for (const [key2, value] of Object.entries(numbers)) {
                        if (key2 === 'attacks'){
                            let baseNumber = value

                            for (const [key3, numbers2] of Object.entries(country)) {
                                if (key3 !== 'country' && key3 !== key){
                                    for (const [key4, value2] of Object.entries(numbers2)) {
                                        if (key4 === 'attacks'){
                                            let nonbaseNumber = value2
                                            let pdiff = ((nonbaseNumber - baseNumber)/baseNumber) * 100
                                            let actDiff = isFinite(pdiff) ? pdiff : 0
                                            arr.push(actDiff)
                                        }
                                    }
                                }
                            }

                        }
                    }           
                }
            }
        }

        arr.sort(function(a, b){return a-b;})
        // let firstIndexNumber = arr[0]
        let anomalyThreshold = arr[Math.floor(arr.length * 0.95)]
        let lastIndexNumber = arr[arr.length - 1]
        // return [firstIndexNumber, anomalyThreshold, lastIndexNumber, arr]
        return [anomalyThreshold, lastIndexNumber]
    }

}