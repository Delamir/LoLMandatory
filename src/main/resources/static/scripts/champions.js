const championTbody = document.getElementById("champion-tbody");
const championParentDiv = document.getElementById("create-champion-form");
const createChampionButton = document.getElementById("show-create-champion-form");
const createChampionForm = `<div style="margin-top: 100px">
        <label>Champion</label>
        <input type="text" id="create-champion-name">
        <button onclick="createChampion()">Add</button>
        <button onclick="removeCreateChampionForm()">Cancel</button>
    </div>`;

fetch(baseURL + "/champions")
    .then(response => response.json())
    .then(champions => {
        champions.map(createChampionTableRow);
    });

//Show form for create champion
document.getElementById("show-create-champion-form")
    .addEventListener("click", showCreateChampionForm);

function showCreateChampionForm() {
    createChampionButton.style.display = "none";
    championParentDiv.innerHTML = createChampionForm;
}

function removeCreateChampionForm() {
    createChampionButton.style.display = "block";
    championParentDiv.innerHTML = "";
}

function createChampion() {
    const championToCreate = {
        name: document.getElementById("create-champion-name").value
    };

    fetch(baseURL + "/champions", {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(championToCreate)
    }).then(response => response.json()).then(champion => {
        removeCreateChampionForm();
        createChampionTableRow(champion);
    }).catch(error => console.log(error));
}

function createChampionTableRow(champion) {
    const tableRow = document.createElement("tr");
    tableRow.id = champion.id;
    championTbody.appendChild(tableRow);

    constructChampionTableRow(tableRow, champion);
}

function constructChampionTableRow(tableRow, champion) {
    tableRow.innerHTML = `
        <td>
            <p id="champion-name-row">${escapeHTML(champion.name)}</p>
        </td>
        <td>
            <button id="champion-update-${champion.id}">Update</button>        
        </td>
        <td>
            <button id="champion-delete-${champion.id}">Delete</button>
        </td>
    `;

    //Update button
    document.getElementById(`champion-update-${champion.id}`)
        .addEventListener("click", () => updateChampion(champion));
    //Delete button
    document.getElementById(`champion-delete-${champion.id}`)
        .addEventListener("click", () => deleteChampion(champion.id));
}

function deleteChampion(championId) {
    fetch(baseURL + "/champions/" + championId, {
        method: "DELETE"
    }).then(response => {
        if (response.status === 200) {
            document.getElementById(championId).remove();
        } else {
            console.log(response.status)
        }
    });
}

function updateChampion(champion) {
    const rowToUpdate = document.getElementById(champion.id);

    rowToUpdate.innerHTML = `
        <td>
            <input id="update-champion-name-${champion.id}" value="${escapeHTML(champion.name)}">    
        </td>
        <td>
            <button id="cancel-champion-update-${champion.id}">Cancel</button>
            <button id="update-champion-${champion.id}">Update</button>       
        </td>
        <td>
            <button id="champion-delete-${champion.id}">Delete</button>
        </td>
    `;

    //Cancel button
    document.getElementById(`cancel-champion-update-${champion.id}`)
        .addEventListener("click", () => undoUpdate(champion));
    //Update button
    document.getElementById(`update-champion-${champion.id}`)
        .addEventListener("click", () => updateChampionBackend(champion.id));
    //Delete button
    document.getElementById(`champion-delete-${champion.id}`)
        .addEventListener("click", () => deleteChampion(champion.id));
}

function undoUpdate(champion) {
    const tableRow = document.getElementById(champion.id);
    constructChampionTableRow(tableRow, champion);
}

function updateChampionBackend(championId) {
    const tableRowToUpdate = document.getElementById(championId);
    const championToUpdate = {
        id: championId,
        name: document.getElementById(`update-champion-name-${championId}`).value
    }

    fetch(baseURL + "/champions/" + championId, {
        method: "PATCH",
        headers: {"Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*"},
        body: JSON.stringify(championToUpdate)
    }).then(response => {
        if (response.status === 200) {
            constructChampionTableRow(tableRowToUpdate, championToUpdate)
        }
    });
}

function search() {
    let input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("champ-search");
    filter = input.value.toUpperCase();
    ul = championTbody;
    li = ul.getElementsByTagName("tr");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("p")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}