const chartYear = document.getElementById('chart_year');
const chartMonth = document.getElementById('chart_month');
const render = () => {
    renderTable(getData());
    createChart(chartYear, document.getElementById('procent_years'), 'year');
    createChart(chartMonth, document.getElementById('procent_month'), 'month');
}
window.addEventListener('load', () => {
    render();
})
