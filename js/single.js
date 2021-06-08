const base_data = 'data.json';
const novel_data = 'book.txt';

window.addEventListener('DOMContentLoaded', () => {
    fetch(base_data)
    .then((response) => response.json())
    .then((data) => {
        ShowHeadData(data);
        return fetch(novel_data)
    })
    .then((response) => response.text())
    .then((data) => {
        ShowBodyData(data);
    })
    .catch((error) => {
        console.log(error);
        TestShowHead();
        TestShowBody();
    });
});

function ShowBodyData(novel) {
    const lines = novel.split(/\r\n|\n/);
    const noveldiv = document.createElement('div');
    for (let line of lines) {
        if (!line.match(/\S/g)) {
            const br = document.createElement('br');
            noveldiv.appendChild(br)
        } else if (line.startsWith('# ')) {
            const h3 = document.createElement('h3');
            h3.textContent = line.slice(2);
            noveldiv.appendChild(h3);
        } else {
            const p = document.createElement('p');
            p.textContent = line;
            noveldiv.appendChild(p);
        }
    }
    document.body.appendChild(noveldiv);
    ShowFootData();
}

function TestShowBody() {
    const test_novel = `これはテスト用の文章です。
表示されるかを試験しています。
ちゃんと表示されれば大丈夫です。

空行後も確認します。

# これは章タイトルです

文章は続きます。`;
    ShowBodyData(test_novel);
}
