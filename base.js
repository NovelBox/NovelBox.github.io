const data_url = 'novels.json';

window.addEventListener('DOMContentLoaded', () => {
    fetch(data_url)
    .then((response) => response.json())
    .then((data) => {
        ShowContentsList(data);
        console.log('test data');
    })
    .catch((error) => {
        console.log(error);
        TestContentsList();
    });
    console.log('hello');
});

function ShowContentsList(data){
    console.log('get json object');
    ShowTableFromJson(data);
}

const TestJson = {
    'contents': [
        {"index": "apple", "title": "TestA", "link": "none"},
        {"index": "orange", "title": "TestB", "link": "http://yahoo.co.jp/"},
        {"index": "melon", "title": "TestC", "link": "none"}
    ]
}

function TestContentsList(){
    ShowTableFromJson(TestJson);
}

function ShowTableFromJson(obj){
    // データ取得
    const data = SortData(obj.contents);
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
            if (key == 'link') {
                url = data[i][key]
                if (url && url != "none") {
                    const a = document.createElement('a');
                    a.href = url
                    a.textContent = url
                    td.appendChild(a)
                } else {
                    td.textContent = "none";
                }
            } else {
                td.textContent = data[i][key];
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    // table追加
    document.body.appendChild(table);
}


function SortData(data){
    return data.sort((a,b) => {
        if (a.index > b.index) {
            return 1;
        } else {
            return -1;
        }
    })
}
