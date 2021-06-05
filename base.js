const data_url = 'novels.json';

function ShowContentsList(jsonObj){
    const data = jsonObj.results[0]
    console.log(data);
}

window.addEventListener('load', () => {
    fetch(data_url, {
        mode: 'cors'
    })
    .then((response) => {
        return response.json()
    })
    .then((result) => {
        ShowContentsList(result);
    })
    .catch((error) => {
        TestContentsList();
    })
    console.log('hello');
})

function TestContentsList(){
    const table = document.createElement('div');
    table.classList.add('table');
    table.textContent = 'タイトル';
    document.body.appendChild(table);

    for (let i = 0; i < 4; i++) {
        const dl = document.createElement('dl');
        dl.classList.add('row');
        table.appendChild(dl);
        for (let j = 0; j < 4; j++) {
            const dt = document.createElement('dt');
            dt.classList.add('cell');
            dt.textContent = `${i}行${j}列`;
            dl.appendChild(dt);
        }
    }
}
