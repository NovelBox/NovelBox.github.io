const base_data = 'base.json';
const novel_data = 'book.txt';

window.addEventListener('DOMContentLoaded', () => {
    fetch(base_data)
    .then((response) => response.json())
    .then((data) => {
        ShowHeadData(data);
    })
    .catch((error) => {
        console.log(error);
        TestShowHead();
    });
    fetch(novel_data)
    .then((response) => response.text())
    .then((data) => {
        ShowBodyData(data);
    })
    .catch((error) => {
        console.log(error);
        TestShowBody();
    });
});

function ShowHeadData(base_data) {
    // check data
    if (Object.keys(base_data).indexOf('data') == -1) {
        console.log('Invalid base data!');
        return false;
    }
    const data = base_data.data
    // Title
    const title = document.createElement('h1');
    title.textContent = data.title
    document.body.appendChild(title);
}

function ShowBodyData(novel) {
    const lines = novel.split(/\r\n|\n/);
    const noveldiv = document.createElement('div');
    for (let line of lines) {
        const p = document.createElement('p');
        p.textContent = line;
        noveldiv.appendChild(p);
    }
    document.body.appendChild(noveldiv);
}

function TestShowHead() {
    const test_base_data = {
        "data":{
            "title": "Test",
            "outline": "概要",
            "version": "1.0.0",
            "released": "2020.1.1",
            "updated": "2020.1.1",
            "note": "備考"
        }
    };
    ShowHeadData(test_base_data);
}

function TestShowBody() {
    const test_novel = `
    これはテスト用の文章です。
    表示されるかを試験しています。
    ちゃんと表示されれば大丈夫です。
    `;
    ShowBodyData(test_novel);
}
