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
        ShowBodyMultiData(data);
    })
    .catch((error) => {
        console.log(error);
        TestShowHead();
        TestShowBodyMulti();
    });
})

function DivideChapter(novels) {
    const lines = novels.split(/\r\n|\n/);
    let chapters = [];
    let tmp = [];
    let key = ''
    for (let line of lines) {
        if (line.startsWith('# ')) {
            if (!key) {
                key = line.slice(2);
                continue;
            }
            chapters.push({title: [key], data: tmp});
            key = line.slice(2);
            tmp = [];
        } else {
            tmp.push(line);
        }
    }
    if (tmp) {
        chapters.push({title: [key], data: tmp});
    }
    return chapters;
}

function ShowBodyMultiData(novels) {
    // contents
    const data = DivideChapter(novels);
    // buttons
    const btnbox = document.createElement('div');
    btnbox.classList.add('buttonbox');
    for (let i = 0; i < data.length; i++) {
        const btn = document.createElement('button');
        btn.textContent = data[i].title;
        btn.onclick = function() {OnClickNovelButton(i);};
        btnbox.appendChild(btn);
    }
    // contents
    const contentbody = document.createElement('div');
    contentbody.classList.add('contentbody');
    for (let i = 0; i < data.length; i++) {
        const chap = document.createElement('div');
        chap.classList.add('chapter');
        const title = data[i].title;
        const cdata = data[i].data;
        for (let line of cdata) {
            if (!line.match(/\S/g)) {
                const br = document.createElement('br');
                chap.appendChild(br);
            } else if (line.startsWith('## ')) {
                const h3 = document.createElement('h3');
                h3.textContent = line.slice(3);
                chap.appendChild(h3);
            } else {
                const p = document.createElement('p');
                p.textContent = line;
                chap.appendChild(p);
            }
        }
        chap.style.display = 'none';
        contentbody.appendChild(chap);
    }
    // add
    document.body.appendChild(btnbox);
    document.body.appendChild(document.createElement('hr'));
    document.body.appendChild(contentbody);
    // show
    const chapters = document.getElementsByClassName('chapter');
    chapters[0].style.display = 'block';
}

function OnClickNovelButton(index) {
    const chapters = document.getElementsByClassName('chapter');
    for (let i = 0; i < chapters.length; i++) {
        if (i == index) {
            chapters[index].style.display = 'block';
        } else {
            if (chapters[i].style.display == 'block') {
                chapters[i].style.display = 'none';
            }
        }
    }
}

function TestShowBodyMulti() {
    const test_novels = `# テスト用第一章
## 大見出し
これは内容を書いています。
ちゃんと表示されるかテストします。

# テスト用第二章
## 見出し２
こちらは二章になります。
ちゃんと切り替わるかの確認です。
おわり`;
    ShowBodyMultiData(test_novels);
}
