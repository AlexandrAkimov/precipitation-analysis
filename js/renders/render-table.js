const renderTable = data => {
    const tbody = document.getElementById('tbody');
    tbody.innerHTML = '';
    if (!data) {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.setAttribute('colspan', '4');
        td.innerText = 'Данных нет. Введите данные'
        tr.appendChild(td);
        tbody.appendChild(tr);
    } else {
        data.map(obj => {
            const tr = document.createElement('tr');
            const tdYear = document.createElement('td');
            const tdMonth = document.createElement('td');
            const tdNumPrecip = document.createElement('td');
            const tdRemove = document.createElement('td');
            const btnDelete = document.createElement('button');
            btnDelete.className = 'btn btn_delete';
            btnDelete.id = obj.id; btnDelete.innerText = 'Удалить'
            tdRemove.appendChild(btnDelete);
            tdYear.innerText = obj.year;
            tdMonth.innerText = obj.month;
            tdNumPrecip.innerText = obj.numPrecipitation;
            tr.appendChild(tdYear); tr.appendChild(tdMonth); tr.appendChild(tdNumPrecip);tr.appendChild(tdRemove)
            tbody.appendChild(tr);
        })
    }
}
