//Получение данных
const getData = () => {
    const dataStorage = JSON.parse(localStorage.getItem('data'));
    return dataStorage
}
//Запись новых данных
const form = document.getElementById('form');
form.addEventListener('submit', () => {
    let year = new Date(document.getElementById('date').value).getFullYear();
    let month = new Date(document.getElementById('date').value).toLocaleString('ru', { month: 'long' });
    let numPrecipitation = document.getElementById('num_precipitation').value;
    const dataStorage = JSON.parse(localStorage.getItem('data'))
    const data = {
        year,
        month,
        numPrecipitation,
        id: Date.now().toString()
    }
    if (!dataStorage) {
        localStorage.setItem('data', JSON.stringify([data]));
        render();
    } else {
        const repeatedRecording = dataStorage.find(item => item.year === year && item.month === month);
        if (repeatedRecording) {
            const errorMessage = `Запись с годом ${year} и месяцем ${month} уже есть. Введите другие данные`;
            renderError(errorMessage);
            setTimeout(() => {
                document.getElementsByClassName('error_message')[0].style.display = 'none';
            }, 3000);
            return
        }
        dataStorage.push(data);
        localStorage.setItem('data', JSON.stringify(dataStorage));
        render();
    }
    document.getElementById('date').value = null;
    document.getElementById('num_precipitation').value = null;
})
//Удаление данных
const remove = e => {
    if (e.target.textContent === 'Удалить') {
        const data = getData();
        const filterData = data.filter(item => item.id !== e.target.id);
        localStorage.setItem('data', JSON.stringify(filterData));
        if (data.length === 1) {
            localStorage.clear();
        }
        render();
    } else {
        return
    }
}
document.getElementById('table')
    .addEventListener('click', remove)