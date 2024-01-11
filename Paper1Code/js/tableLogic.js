class TableLogic{

    constructor(){
    }

    rowToCellDataTransform(d) {

        function getFlagEmoji(country, cc){
            let a = country + '[' + cc + ']'
            
            // const codePoints = cc
            //     .toUpperCase()
            //     .split('')
            //     .map(char =>  127397 + char.charCodeAt());
            // let b = String.fromCodePoint(...codePoints);

            return a //+ b
        }

        let stateInfo = new function(){
            this.type = 'text';
            this.class = 'country';
            this.value = getFlagEmoji(d.country, d.cc);
        }
        // console.log(stateInfo)

        let dataList = [stateInfo]

        let i = 1
        let j = 1
        for (let time of d.selectedTimes){
            if (time === d.number){
                let marginInfo = {
                    type: 'viz',
                    value: d[d.number].attacks,
                    value2: 0,
                    value3: 0
                }
                dataList.push(marginInfo)
            }
            else{
                let marginInfo = {
                    type: 'viz',
                    value: d[time].attacks,
                    value2: isFinite(100 * ((d[time].attacks - d[d.number].attacks)/d[d.number].attacks))?
                            100 * ((d[time].attacks - d[d.number].attacks)/d[d.number].attacks): 0,
                    value3: d[time].attacks - d[d.number].attacks
                }
                dataList.push(marginInfo)
                j++
            }
            i++
        }

        // for (let i = 1; i < dataList.length; i++){
        //     let thisCell = dataList[i]
        //     thisCell['value4'] = d['country_root_admin_top_' + i]
        //     thisCell['value5'] = d['country_username_top_10_differ_by_half_' + i]
        //     thisCell['value6'] = d['country_username_historic_top_10_differ_by_half_' + i]
        //     thisCell['value7'] = d['country_root_second_place_ratio_' + i]
        // }

        // console.log(dataList)

        return dataList
    }

}




// http://128.110.217.95/attacker_activity?cluster=utah&cc=US&range=2023-01-01,2023-01-02&period=day&ips=159.108.29.35,128.110.156.4

// https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=5487236
