const createChart = (el, elForLegend, paramTime) => {
    const data = getData()
    if (!data) {
        document.getElementsByClassName('empty_title_charts')[0].style.display = 'block'
        document.getElementsByClassName('content_charts')[0].style.display = 'none'
    } else {
        document.getElementsByClassName('empty_title_charts')[0].style.display = 'none';
        document.getElementsByClassName('content_charts')[0].style.display = 'flex';
        elForLegend.innerHTML = '';
        let legendHTML = '';
        if (el && el.getContext) {
            let context = el.getContext('2d');
            // рисуем окружность
            context.fillStyle = "#ddd";
            context.strokeStyle = "#ddd";
            context.beginPath();
            context.arc(100, 100, 86, 0, Math.PI * 2, true);
            context.closePath();
            context.fill();
            // рисуем сектор
            const sumPrecip = sum(uniqSumArrayByParamTime(getData(), paramTime));
            uniqSumArrayByParamTime(sortDate(getData(), paramTime), paramTime).reduce((acc, cur) => {
                const generateColor = () => '#' + (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase()
                let current = cur.numPrecipitation * 100 / sumPrecip;
                let color = generateColor()
                context.fillStyle = color;
                context.beginPath();
                context.moveTo(100, 100);
                context.arc(
                    100,
                    100,
                    100,
                    (Math.PI / 180) * acc * 360 / 100,
                    (Math.PI / 180) * acc * 360 / 100 + (Math.PI / 180) * current * 360 / 100,
                    false
                );
                context.closePath();
                context.fill();
                let slice_angle = 2 * Math.PI * current / sumPrecip;
                let pieRadius = Math.min(el.width / 2, el.height / 2);
                let offset = (pieRadius * 0.3) / 2;
                let labelX = el.width / 2 + (offset + pieRadius / 2) * Math.cos((Math.PI / 180) * acc * 360 / 100 + slice_angle / 2);
                let labelY = el.height / 2 + (offset + pieRadius / 2) * Math.sin((Math.PI / 180) * acc * 360 / 100 + slice_angle / 2);
                context.fillStyle = "#000";
                context.font = "bold 13px Arial";
                context.fillText(Math.floor(current) + "%", labelX, labelY);
                //Добавляем подписи
                legendHTML += `<div style='margin-bottom: 3px;'><span style='display:inline-block;width:20px;height:20px;background-color:${color};'>&nbsp;</span> ${cur[paramTime]}</div>`;
                elForLegend.innerHTML = legendHTML;
                return acc + current
            }, 0)
            // закрашиваем меньший радиус
            context.fillStyle = "#F8F8F8";
            context.beginPath();
            context.arc(100, 100, 30, 0, Math.PI * 2, true);
            context.closePath();
            context.fill();
        }
    }
}












