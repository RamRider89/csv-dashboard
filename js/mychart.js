$("body").ready(function () {


    












    chartTest();











});

function chartTest() {
    new Chart(document.getElementById("myChart"), {
        "type": "bar",
        "data": {
            "labels": ["a", "b", "c"],
            "datasets": [{
                label: 'grafica 1',
                fill: true,
                lineTension: 0.1,
                backgroundColor: '#f01010',
                borderColor: '#fb0101',
                data: [2, 5, 8],
                yAxisID: [1, 2, 5]
            }]
        },
        options: {
            elements: { point: { radius: 1 } },
            legend: {
                display: true,
                labels: {
                    fontColor: '#000000',
                    fontSize: 14
                }
            },
            title: {
                display: true,
                text: 'titulo',
                fontSize: 16,
                maintainAspectRatio: '',
                fontColor: '#000000'
            },
            responsive: true
        }
    });

}