const matchTbody = document.getElementById("match-tbody");
const matchParentDiv = document.getElementById("create-match-form");
const createMatchButton = document.getElementById("show-create-match-form");
const createMatchForm = `<div style="margin-top: 100px">
        <label>Length</label>
        <input type="number" id="create-match-length" placeholder="Match Length">
        <label>Winner</label>
        <select name="team" id="select-winner-team">
        <option value="RED">Team Red</option>
        <option value="BLUE">Team Blue</option>
        </select>
        <label>Towers</label>
        <input type="number" id="create-towers-destroyed" placeholder="Towers Destroyed">
        <label>Kills</label>
        <input type="number" id="create-kills" placeholder="Kills">
        <label>Gold</label>
        <input type="number" id="create-gold" placeholder="Gold">
        <label>Summoner</label>
        <input id="select-summoner" placeholder="Summoner ID">
        <button onclick="createMatch()">Add</button>
        <button onclick="removeCreateMatchForm()">Cancel</button>
</div>`;

fetch(baseURL + "/matches")
    .then(response => response.json())
    .then(matches => {
        matches.map(createMatchTableRow);
    });

//Show for for create match
document.getElementById("show-create-match-form")
    .addEventListener("click", showCreateMatchForm);

function showCreateMatchForm() {
    createMatchButton.style.display = "none";
    matchParentDiv.innerHTML = createMatchForm;
}

function removeCreateMatchForm() {
    createMatchButton.style.display = "block";
    matchParentDiv.innerHTML = "";
}

function createMatch() {
    const matchToCreate = {
        match_length: document.getElementById("create-match-length").value,
        winner: document.getElementById("select-winner-team").value,
        towers_destroyed: document.getElementById("create-towers-destroyed").value,
        kills: document.getElementById("create-kills").value,
        gold: document.getElementById("create-gold").value,
        summonerMatch: {
            id: document.getElementById("select-summoner").value,
            name: document.getElementById("select-summoner").value.name,
            wins: document.getElementById("select-summoner").value.wins,
            losses: document.getElementById("select-summoner").value.losses,
            summonerType: document.getElementById("select-summoner").value.summonerType,
            favouriteChampion: document.getElementById("select-summoner").value.favouriteChampion
        }
    }

    fetch(baseURL + "/matches", {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(matchToCreate)
    }).then(response => response.json())
        .then(match => {
            removeCreateMatchForm();
            createMatchTableRow(match);
        }).catch(error => console.log(error));

}

function createMatchTableRow(match) {
    const tableRow = document.createElement("tr");
    tableRow.id = match.id;
    matchTbody.appendChild(tableRow);

    constructMatchTableRow(tableRow, match);
}

function constructMatchTableRow(tableRow, match) {
    tableRow.innerHTML = `
        <td>
            <p id="match-length-row">${match.match_length}</p>
        </td>
        <td>
            <p id="winner-row">${match.winner}</p>
        </td>
        <td>
            <p id="towers-destroyed-row">${match.towers_destroyed}</p>
        </td>
        <td>
            <p id="kills-row">${match.kills}</p>
        </td>
        <td>
            <p id="gold-row">${match.gold}</p>
        </td>
        <td>
            <p id="summoner-name-row">${match.summonerMatch.name}</p>
        </td>
        <td>
            <button id="match-update-${match.id}">Update</button>        
        </td>
        <td>
            <button id="match-delete-${match.id}">Delete</button>
        </td> 
    `;

    //Update button
    document.getElementById(`match-update-${match.id}`)
        .addEventListener("click", () => updateMatch(match));
    //Delete button
    document.getElementById(`match-delete-${match.id}`)
        .addEventListener("click", () => deleteMatch(match.id));
}

function deleteMatch(matchId) {
    fetch(baseURL + "/matches/" + matchId, {
        method: "DELETE"
    }).then(response => {
        if (response.status === 200) {
            document.getElementById(matchId).remove();
        } else {
            console.log(response.status)
        }
    });
}

function updateMatch(match) {
    const rowToUpdate = document.getElementById(match.id);

    rowToUpdate.innerHTML = `
        <td>
            <input id="update-match-length-${match.id}" value="${escapeHTML(match.match_length.toString())}"
        </td>
         <td>
            <input id="update-winner-${match.id}" value="${escapeHTML(match.winner)}">
        </td>
        <td>
            <input id="update-towers-destroyed-${match.id}" value="${escapeHTML(match.towers_destroyed.toString())}">
        </td>
        <td>
            <input id="update-kills-${match.id}" value="${escapeHTML(match.kills.toString())}">
        </td>
        <td>
            <input id="update-gold-${match.id}" value="${escapeHTML(match.gold.toString())}">
        </td>
        <td>
            <p id="summoner-match-row-${match.id}">${match.summonerMatch.name}</p>
            <input type="hidden" value="${match.summonerMatch}"
        </td>
        <td>
            <button id="cancel-match-update-${match.id}">Cancel</button>           
            <button id="match-update-${match.id}">Update</button>        
        </td>
        <td>
            <button id="match-delete-${match.id}">Delete</button>
        </td> 
    `;

    //Cancel button
    document.getElementById(`cancel-match-update-${match.id}`)
        .addEventListener("click", () => undoMatchUpdate(match));
    //Update button
    document.getElementById(`match-update-${match.id}`)
        .addEventListener("click", () => updateMatchBackend(match.id));
    //Delete button
    document.getElementById(`match-delete-${match.id}`)
        .addEventListener("click", () => deleteMatch(match.id));
}

function undoMatchUpdate(match) {
    const tableRow = document.getElementById(match.id);
    constructMatchTableRow(tableRow, match);
}

function updateMatchBackend(matchId) {
    const tableRowToUpdate = document.getElementById(matchId);
    const matchToUpdate = {
        id: matchId,
        match_length: document.getElementById(`update-match-length-${matchId}`).value,
        winner: document.getElementById(`update-winner-${matchId}`).value,
        towers_destroyed: document.getElementById(`update-towers-destroyed-${matchId}`).value,
        kills: document.getElementById(`update-kills-${matchId}`).value,
        gold: document.getElementById(`update-gold-${matchId}`).value,
        summonerMatch: {
            id: document.getElementById(`summoner-match-row-${matchId}`).value,
            name: document.getElementById(`summoner-match-row-${matchId}`).name,
            wins: document.getElementById(`summoner-match-row-${matchId}`).wins,
            losses: document.getElementById(`summoner-match-row-${matchId}`).losses,
            summonerType: document.getElementById(`summoner-match-row-${matchId}`).summonerType,
            favouriteChampion: {
                id: document.getElementById(`summoner-match-row-${matchId}`).value,
                name: document.getElementById(`summoner-match-row-${matchId}`).textContent
            }
        }
    }

    fetch(baseURL + "/matches/" + matchId , {
        method: "PATCH",
        headers: { "Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(matchToUpdate)
    }).then(response => {
        if (response.status === 200) {
            constructMatchTableRow(tableRowToUpdate, matchToUpdate)
        }
    });
}