//Функция формирования массива с уникальными параметрами года или месяца и суммой осадков для каждого параметра
const uniqSumArrayByParamTime = (arr, paramTime) => {
    let arrResult = [];
    if (!arr) {
        return [];
    } else {
        arr.map(item => {
            let hasObj = arrResult.find(it => it[paramTime] == item[paramTime]);
            if (hasObj) {
                hasObj.numPrecipitation = +hasObj.numPrecipitation + +item.numPrecipitation;
                arrResult.map(itm => {
                    if (itm[paramTime] == hasObj[paramTime]) {
                        itm.numPrecipitation = hasObj.numPrecipitation
                    }
                })
            } else {
                arrResult.push(item);
            }
        })
        return arrResult
    }
}
//Функция суммирования осадков у сформированного массива ( uniqSumArrayByParamTime )
const sum = arr => {
    if (!arr) {
        return []
    } else {
        return arr.reduce((acc, cur) => {
            return acc + +cur.numPrecipitation
        }, 0)
    }
}
//Функция сортировки года и месяца для легенд под диаграммами
const sortDate = (arr, paramTime) => {
    if (paramTime === 'month') {
        const months = [
            'январь', 
            'февраль', 
            'март', 
            'апрель', 
            'май', 
            'июнь', 
            'июль', 
            'август', 
            'сентябрь', 
            'октябрь',
            'ноябрь',
            'декабрь'
        ]
        const arrResult = []
        months.forEach( item => {
            return arr.map( obj => {
                if(obj.month === item) {
                    arrResult.push(obj)
                }
            })
        })
        return arrResult
    } else {
        return arr.sort(function(a, b) {
            const dateA = a[paramTime];       
            const dateB = b[paramTime];
            return dateA - dateB
        })
    }
}