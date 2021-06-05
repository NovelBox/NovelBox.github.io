const data_url = 'novels.json';

window.addEventListener('load', () => {
    fetch(data_url)
    .then((response) => response.json())
    .then((data) => {
        ShowContentsList(data);
        console.log('test data');
    })
    .catch((error) => {
        TestContentsList();
    })
    console.log('hello');
})

function ShowContentsList(jsonObj){
    console.log('get json object');
    const data = jsonObj.results[0]
    ShowTableFromJson(data);
}

const TestJson = {
    'contents': [
        {'index': 0, 'title': 'TestA'},
        {'index': 1, 'title': 'TestB'}
    ]
}

function TestContentsList(){
    ShowTableFromJson(TestJson);
}

function ShowTableFromJson(obj){
    // データ取得
    const data = obj.contents;
    // 要素作成
    const table = document.createElement('table');
    // ヘッダー作成
    const tr = document.createElement('tr');
    for (key in data[0]) {
        const th = document.createElement('th');
        th.textContent = key;
        tr.appendChild(th);
    }
    table.appendChild(tr);
    // ボディ作成
    for (let i = 0; i < data.length; i++) {
        const tr = document.createElement('tr');
        for (key in data[0]) {
            const td = document.createElement('td');
            td.classList.add('cell');
            td.textContent = data[i][key];
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    // table追加
    document.body.appendChild(table);
}
