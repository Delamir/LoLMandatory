const summonerTbody = document.getElementById("summoner-tbody");

fetch(baseURL + "/summoners")
    .then(response => response.json())
    .then(summoners => {
        summoners.map(createSummonerTableRow);
    });

function createSummonerTableRow(summoner) {
    const tableRow = document.createElement("tr");
    tableRow.id = summoner.id;
    summonerTbody.appendChild(tableRow);

    constructSummonerTableRow(tableRow, summoner);
}

function constructSummonerTableRow(tableRow, summoner) {
    tableRow.innerHTML = `
        <td>
            <p id="summoner-name-row">${escapeHTML(summoner.name)}</p>          
        </td>
        <td>
            <p id="summoner-wins-row">${escapeHTML(summoner.wins.toString())}</p>
        </td>
        <td>
            <p id="summoner-losses-row">${escapeHTML(summoner.losses.toString())}</p>
        </td>
        <td>
            <p id="summoner-type-row">${(summoner.summonerType)}</p>   
        </td>
        <td>
            <p id="favourite-champion-row">${(summoner.favouriteChampion.name)}</p>
        </td>
        <td>
            <button id="summoner-update-${summoner.id}">Update</button>
        </td>
        <td>
            <button id="summoner-delete-${summoner.id}">Delete</button>
        </td>
    `;

    //Update button
    document.getElementById(`summoner-update-${summoner.id}`)
        .addEventListener("click", () => updateSummoner(summoner));
    //Delete button
    document.getElementById(`summoner-delete-${summoner.id}`)
        .addEventListener("click", () => deleteSummoner(summoner.id))
}

function deleteSummoner(summonerId) {
    fetch(baseURL + "/summoners/" + summonerId, {
        method: "DELETE"
    }).then(response => {
        if (response.status === 200) {
            document.getElementById(summonerId).remove();
        } else {
            console.log(response.status)
        }
    });
}

function updateSummoner(summoner) {
    const rowToUpdate = document.getElementById(summoner.id);

    rowToUpdate.innerHTML = `
        <td>
            <input id="update-summoner-name-${summoner.id}" value="${escapeHTML(summoner.name)}">
        </td>
        <td>
            <input id="update-summoner-wins-${summoner.id}" value="${escapeHTML(summoner.wins.toString())}">
        </td>
        <td>
            <input id="update-summoner-losses-${summoner.id}" value="${escapeHTML(summoner.losses.toString())}">
        </td>
         <td>
            <input id="summoner-type-row-${summoner.id}" value="${escapeHTML(summoner.summonerType)}">
        </td>
        <td>
            <p id="favourite-champion-row-${summoner.id}">${summoner.favouriteChampion.name}</p>
            <input type="hidden" id="favourite-champion-id-${summoner.id}" value="${summoner.favouriteChampion}">
        </td>
        <td>
            <button id="cancel-summoner-update-${summoner.id}">Cancel</button>
            <button id="update-summoner-${summoner.id}">Update</button>
        </td>
        <td>
            <button id="summoner-delete-${summoner.id}">Delete</button>
        </td>
    `;

    //Cancel button
    document.getElementById(`cancel-summoner-update-${summoner.id}`)
        .addEventListener("click", () => undoSummonerUpdate(summoner));
    //Update button
    document.getElementById(`update-summoner-${summoner.id}`)
        .addEventListener("click", () => updateSummonerBackend(summoner.id));
    //Delete button
    document.getElementById(`summoner-delete-${summoner.id}`)
        .addEventListener("click", () => deleteSummoner(summoner.id));
}

function undoSummonerUpdate(summoner) {
    const tableRow = document.getElementById(summoner.id);
    constructSummonerTableRow(tableRow, summoner);
}

function updateSummonerBackend(summonerId) {
    const tableRowToUpdate = document.getElementById(summonerId);
    const summonerToUpdate = {
        id: summonerId,
        name: document.getElementById(`update-summoner-name-${summonerId}`).value,
        wins: document.getElementById(`update-summoner-wins-${summonerId}`).value,
        losses: document.getElementById(`update-summoner-losses-${summonerId}`).value,
        summonerType: document.getElementById(`summoner-type-row-${summonerId}`).value,
        favouriteChampion: {
            id: document.getElementById(`favourite-champion-row-${summonerId}`).value,
            name: document.getElementById(`favourite-champion-row-${summonerId}`).textContent
        }
    }

    fetch(baseURL + "/summoners/" + summonerId, {
        method: "PATCH",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(summonerToUpdate)
    }).then(response => {
        if (response.status === 200) {
            constructSummonerTableRow(tableRowToUpdate, summonerToUpdate)
        }
    });
}