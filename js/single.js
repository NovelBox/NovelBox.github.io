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

function CreatePersonList(data) {
    if (!data.persons) {
        return;
    }
    const pdata = data.persons;
    // button
    const btn = document.createElement('button');
    btn.textContent = '登場人物';
    btn.onclick = OnClickPButton;
    // person list
    const table = document.createElement('table');
    table.setAttribute('id', 'info');
    table.style.display = 'none';
    for (let key in pdata) {
        const tr = document.createElement('tr');
        const name = document.createElement('td');
        const info = document.createElement('td');
        name.textContent = key;
        if (pdata[key]) {
            info.textContent = '……' + pdata[key];
        }
        tr.appendChild(name);
        tr.appendChild(info);
        table.appendChild(tr);
    }
    // to body
    document.body.appendChild(btn);
    document.body.appendChild(table);
}

function OnClickPButton() {
    const pinfo = document.getElementById('info');
    if (pinfo.style.display == 'block') {
        pinfo.style.display = 'none';
    } else {
        pinfo.style.display = 'block';
    }
}

function ShowHeadData(base_data) {
    // check data
    if (Object.keys(base_data).indexOf('data') == -1) {
        console.log('Invalid base data!');
        return false;
    }
    const data = base_data.data
    const datadiv = document.createElement('div');
    datadiv.classList.add('noveldata');
    // Title
    const title = document.createElement('h1');
    title.textContent = data.title;
    // Outline
    const outline = document.createElement('div');
    outline.textContent = data.outline;
    // Data
    const table = document.createElement('table');
    const contents_keys = [
        'version', 'released', 'updated',
    ];
    const head_tr = document.createElement('tr');
    const data_tr = document.createElement('tr');
    for (let key of contents_keys) {
        const th = document.createElement('th');
        th.textContent = key;
        head_tr.appendChild(th);
        const td = document.createElement('td');
        td.textContent = data[key];
        data_tr.appendChild(td);
    }
    table.appendChild(head_tr);
    table.appendChild(data_tr);
    datadiv.appendChild(table);
    // hr
    const hr = document.createElement('hr');
    // Add parts
    const html_data = [title, outline, datadiv];
    for (let val of html_data) {
        document.body.appendChild(val);
    }
    // persons
    CreatePersonList(data);
    // hr
    document.body.appendChild(hr);
}

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
    // Footer
    const hr = document.createElement('hr');
    const cpright = document.createElement('p');
    cpright.textContent = '(C)N.T.WORKS';
    cpright.classList.add('copyright');
    document.body.appendChild(hr);
    document.body.appendChild(cpright);
}

function TestShowHead() {
    const test_base_data = {
        "data":{
            "title": "Test",
            "outline": "概要",
            "version": "1.0.0",
            "released": "2020.1.1",
            "updated": "2020.1.1",
            "note": "備考",
            "persons": {
                "太郎": "主人公",
                "花子": ""
            }
        }
    };
    ShowHeadData(test_base_data);
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
