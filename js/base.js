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

function CreateBack() {
    // back button
    const back = document.createElement('button');
    back.classList.add('back');
    back.textContent = 'BACK';
    back.onclick = function(){history.back();};
    document.body.appendChild(back);
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
    datadiv.setAttribute('id', 'noveldata');
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
    CreateBack();
    const html_data = [title, outline, datadiv];
    for (let val of html_data) {
        document.body.appendChild(val);
    }
    // persons
    CreatePersonList(data);
    // hr
    document.body.appendChild(hr);
}

function ShowFootData() {
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
