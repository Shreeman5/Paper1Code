class VariablesForTable{

    constructor(neededData, baseTime, selectedTimes){
        this.neededData = neededData
        this.baseTime = baseTime
        this.selectedTimes = selectedTimes
    }

    countrySpecificInfo(){
        for (let country of this.neededData){
            country.selectedTimes = this.selectedTimes
            country.number = this.baseTime
        }
    }

    // dataForTable(givenData, dateselected, index){
    //     let trackerForTop10 = {}

    //     for (let country of this.neededData){
    //         let a = givenData[country.cc]
    //         if (a != null){
    //             let b = a[dateselected]
    //             let c = b[0]

    //             if (c.username === 'root' || c.username === 'admin'){
    //                 country['country_root_admin_top_' + index] = 'yes'
    //             }
    //             else{
    //                 country['country_root_admin_top_' + index] = 'no'
    //             }

    //             for (let i = 0; i < b.length && i < 10; i++){
    //                 let keyValueObject = b[i]
    //                 let currentUsername = keyValueObject['username']
    //                 if (currentUsername in trackerForTop10){
    //                     trackerForTop10[currentUsername] += b[i].count
    //                 }
    //                 else{
    //                     trackerForTop10[currentUsername] = b[i].count
    //                 }
    //             }

    //             if (b.length >= 2){
    //                 let keyValueObject1 = b[0]
    //                 let keyValueObject2 = b[1]
    //                 if (keyValueObject1['username'] === 'root'){
    //                     let myRatio = keyValueObject1['count']/keyValueObject2['count']
    //                     let value = 'no'
    //                     if (myRatio >= 50){
    //                         value = 'yes'
    //                     }
    //                     country['country_root_second_place_ratio_' + index] = value
    //                 }
    //                 else{
    //                     country['country_root_second_place_ratio_' + index] = 'no'
    //                 }
    //             }
    //             else{
    //                 country['country_root_second_place_ratio_' + index] = 'no'
    //             }
    //         }
    //         else{
    //             country['country_root_admin_top_' + index] = 'yes'
    //             country['country_root_second_place_ratio_' + index] = 'no'
    //         }
    //     }

    //     let top10Usernames = Object
    //                 .entries(trackerForTop10) 
    //                 .sort(([, a],[, b]) => b-a) 
    //                 .slice(0,10) 
    //                 .map(([n])=> n); 

    //     for (let country of this.neededData){
    //         let a = givenData[country.cc]
    //         if (a != null){
    //             let b = a[dateselected]
    //             let counterMatch = 0
    //             for (let i = 0; i < b.length && i < 10; i++){
    //                 let keyValueObject = b[i]
    //                 let currentUsername = keyValueObject['username']
    //                 if (!top10Usernames.includes(currentUsername)){
    //                     counterMatch += 1
    //                 }
    //             }
    //             if (counterMatch > 5){
    //                 country['country_username_top_10_differ_by_half_' + index] = 'yes'
    //             }
    //             else{
    //                 country['country_username_top_10_differ_by_half_' + index] = 'no'
    //             }
    //         }
    //         else{
    //             country['country_username_top_10_differ_by_half_' + index] = 'no'
    //         }
    //     }

    //     let top10HistoricUsernames = ['root', 'admin', 'test', 'guest', 'mysql', 'user', 'administrator', 'oracle', 'postgres', 'nagios']

    //     for (let country of this.neededData){
    //         let a = givenData[country.cc]
    //         if (a != null){
    //             let b = a[dateselected]
    //             let counterMatch = 0
    //             for (let i = 0; i < b.length && i < 10; i++){
    //                 let keyValueObject = b[i]
    //                 let currentUsername = keyValueObject['username']
    //                 if (!top10HistoricUsernames.includes(currentUsername)){
    //                     counterMatch += 1
    //                 }
    //             }
    //             if (counterMatch > 5){
    //                 country['country_username_historic_top_10_differ_by_half_' + index] = 'yes'
    //             }
    //             else{
    //                 country['country_username_historic_top_10_differ_by_half_' + index] = 'no'
    //             }
    //         }
    //         else{
    //             country['country_username_historic_top_10_differ_by_half_' + index] = 'no'
    //         }
    //     }
    // }

    // userNameParsing(){
    //     let countries = []
    //     for (let country of this.neededData){
    //         countries.push(country.cc)
    //     }

    //     let checkedBoxes = document.querySelectorAll('input[type="checkbox"]')
    //     let selected = Array.from(checkedBoxes).map(x => x.value)


    //     let that = this
    //     for (let i = 0; i < selected.length; i++){
    //         getData4(selected[i], countries).then(function(loadedData){
    //             that.dataForTable(loadedData, selected[i], i+1)
    //         })
    //     }
    // }

    convert(value){
        if (value >= 100000){
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

// async function getData4(selected, countries){
//     let givenValue = document.getElementById("data").value
//     let givenValue2 = document.getElementById("timePeriod").value
//     let api_address = 'https://kibana.emulab.net/top/usernames?cluster='+givenValue+'&cc='+countries.join(',')+'&range='+selected+'&period='+givenValue2
//     const data = await fetch(api_address)
//     const jsonData = await data.json()
//     return jsonData

// }