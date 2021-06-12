'use strict';

const imagesStorageKey = "TennisImages";
const profilesStorageKey = "TennisProfiles";
const storedPlayerKey = sessionStorage.getItem('selectedTennisPlayerName');
verifyStoredPlayerKeyExistance(storedPlayerKey);

//Ένα σταθερό αντικείμενο το οποίο περιέχει τις εικόνες για νίκη/ήττα για εύκολη αναφορά
const MatchResultIcons = {
    WIN: '<svg viewBox="0 0 24 24" width="20" height="20" fill="#52b030"><path d="M24,12c0,6.6-5.4,12-12,12C5.4,24,0,18.6,0,12S5.4,0,12,0C18.6,0,24,5.4,24,12z M15.7,16.9l2.1-9.8h-2.3 l-1.1,6.1L13,7.1h-2l-1.3,6.1L8.5,7.1H6.2l2.1,9.8h2.4l1.3-5.6l1.3,5.6H15.7L15.7,16.9z"></path></svg>',
    DEFEAT:  '<svg viewBox="0 0 24 24" width="20" height="20" fill="#c1272d"><path d="M24,12c0,6.6-5.4,12-12,12C5.4,24,0,18.6,0,12S5.4,0,12,0C18.6,0,24,5.4,24,12z M15.9,17.5v-2.1h-4.7v-9H8.5v11.1L15.9,17.5 L15.9,17.5z"></path></svg>',
    CANCELLED: '<svg viewBox="0 0 24 24" width="20" height="20" fill="#ced4da"><path d="M24,12c0,6.6-5.4,12-12,12C5.4,24,0,18.6,0,12C0,5.4,5.4,0,12,0C18.6,0,24,5.4,24,12z M13.5,17c0.1-0.1,0.1-0.3,0.1-0.5 c0-0.2,0-0.3-0.1-0.5c-0.1-0.1-0.1-0.3-0.2-0.4c-0.1-0.1-0.2-0.2-0.4-0.2c-0.2-0.1-0.3-0.1-0.5-0.1s-0.4,0-0.5,0.1 c-0.2,0.1-0.3,0.1-0.4,0.2c-0.1,0.1-0.2,0.2-0.2,0.4c-0.1,0.1-0.1,0.3-0.1,0.5c0,0.2,0,0.3,0.1,0.5c0.1,0.1,0.1,0.3,0.2,0.4 s0.2,0.2,0.4,0.2c0.2,0.1,0.3,0.1,0.5,0.1s0.4,0,0.5-0.1c0.2-0.1,0.3-0.1,0.4-0.2C13.3,17.3,13.4,17.2,13.5,17L13.5,17z M15.7,10.2 c0.1-0.3,0.2-0.6,0.2-0.9c0-0.5-0.1-0.9-0.2-1.3c-0.2-0.4-0.4-0.7-0.7-0.9c-0.3-0.3-0.7-0.4-1.1-0.6c-0.4-0.1-0.9-0.2-1.4-0.2 c-0.5,0-0.9,0.1-1.4,0.2C10.7,6.6,10.3,6.8,10,7S9.4,7.6,9.3,8C9.1,8.4,9,8.9,9,9.4h2.2c0-0.2,0-0.4,0.1-0.6s0.2-0.3,0.3-0.4 c0.1-0.1,0.3-0.2,0.4-0.2c0.2,0,0.3-0.1,0.5-0.1c0.4,0,0.7,0.1,0.9,0.3c0.2,0.2,0.3,0.5,0.3,1c0,0.2,0,0.4-0.1,0.5 c-0.1,0.2-0.1,0.3-0.2,0.5c-0.1,0.1-0.2,0.3-0.4,0.4c-0.1,0.1-0.3,0.3-0.5,0.4c-0.2,0.2-0.4,0.4-0.6,0.6c-0.1,0.2-0.3,0.4-0.4,0.6 c-0.1,0.2-0.2,0.5-0.2,0.8c0,0.3-0.1,0.6-0.1,0.9h2c0-0.2,0-0.4,0-0.5c0-0.2,0.1-0.3,0.1-0.5s0.1-0.3,0.2-0.4 c0.1-0.1,0.2-0.3,0.4-0.4c0.3-0.2,0.5-0.5,0.7-0.7c0.2-0.2,0.4-0.5,0.6-0.7S15.6,10.5,15.7,10.2L15.7,10.2z"></path></svg>'
};
Object.freeze(MatchResultIcons);

const retrievedStorageData = retrievePlayerProfileData();
let storedProfiles = retrievedStorageData[0];
let storedImages = retrievedStorageData[1];
let storedPlayerProfile = storedProfiles[storedPlayerKey];
let storedPlayerImages = storedImages[storedPlayerKey];
let storedPlayerProfileStatsTableData = storedPlayerProfile.statsTableData;
let storedPlayerProfileMatchesTableData = storedPlayerProfile.matchesTableData;
let storedPlayerProfileTitlesTableData = storedPlayerProfile.titlesTableData;

const titleImageReader = initializeTitleImageFileReader();
const matchImageReader = initializeMatchImageFileReader();

// Εκτελεί τη συνάρτηση yearpicker() ώστε να ενεργοποιήσει τις επιλογές ετών στο αντίστοιχο input της φόρμας με τους τίτλους
$('.yearpicker').yearpicker();

//Κλήση των συναρτήσεων που απαιτούνται για το αρχικό "γέμισμα" των HTML στοιχείων
fillHeaderData();
fillStatsPeriodSelect('stats-table-content-select');
fillStatsTableData(storedPlayerProfileStatsTableData.Career.singlesServiceRecordData, 'first-stats-table');
fillStatsTableData(storedPlayerProfileStatsTableData.Career.singlesReturnRecordData, 'second-stats-table');
fillMatchesTableData(storedPlayerProfileMatchesTableData, false, null);
fillTitlesTableData(storedPlayerProfileTitlesTableData, false, null);
generateAvailableFilterValuesFor(storedPlayerProfileStatsTableData.Career.singlesServiceRecordData, 'statistics-filter-service-dropdown-items', 'statistics');
generateAvailableFilterValuesFor(storedPlayerProfileStatsTableData.Career.singlesReturnRecordData, 'statistics-filter-return-dropdown-items', 'statistics');
generateAvailableFilterValuesFor(storedPlayerProfileMatchesTableData, 'matches-filter-dropdown-items', 'matches');
generateAvailableFilterValuesFor(storedPlayerProfileTitlesTableData, 'titles-filter-dropdown-items', 'titles');

//Μια συνάρτηση η οποία ελέγχει αν έχει τεθεί το storedPlayerKey, δηλαδή αν έχει γίνει επιλογή προφίλ από το menu ή
//αν ο χρήστης δημιουργήσει μόλις κάποιο και μεταφέρθηκε στη σελίδα profile.html, διαφορετικά τον επιστρέφει στην
//αρχική σελίδα
function verifyStoredPlayerKeyExistance(storedPlayerKey) {
    if(!storedPlayerKey) {
        window.location.href = 'index.html';
    }
}

//Μία συνάρτηση η οποία δημιουργεί ένα αντικείμενο τύπου reader, το οποίο θα διαβάζει και θα αποθηκεύει κατάλληλα τις
//φωτογραφίες των τουρνουά αγώνων τα οποία έχει κατακτήσει ο αθλητής
function initializeTitleImageFileReader() {
    let reader = new FileReader();
    reader.onload = function(e) {
        storedPlayerImages.titleImages.push([this.tournamentName, e.target.result]);
        storedImages[storedPlayerKey] = storedPlayerImages;
        store(imagesStorageKey, storedImages);
    };

    return reader;
}

//Μία συνάρτηση η οποία δημιουργεί ένα αντικείμενο τύπου reader, το οποίο θα διαβάζει και θα αποθηκεύει κατάλληλα τις
//φωτογραφίες των τουρνουά αγώνων στα οποία έχει παίξει ο αθλητής
function initializeMatchImageFileReader() {
    let reader = new FileReader();
    reader.onload = function(e) {
        storedPlayerImages.matchImages.push([this.tournamentName, e.target.result]);
        storedImages[storedPlayerKey] = storedPlayerImages;
        store(imagesStorageKey, storedImages);
    };

    return reader;
}

//Μια συνάρτηση που "γεμίζει" το header με όλα τα προσωπικά στοιχεία του αθλητή
function fillHeaderData() {
    let playerPersonalInfo = storedPlayerProfile.personalInfo;
    let profileImage = document.querySelectorAll('.profile_figure')[0];
    let playerName = playerPersonalInfo.playerName + " " + playerPersonalInfo.playerSurname;
    profileImage.childNodes[1].src = storedPlayerImages.profileImage;
    profileImage.childNodes[1].alt = playerName;
    profileImage.childNodes[3].innerHTML = playerName;

    let personalInfoItems = document.querySelectorAll('.personal-info-item');
    personalInfoItems[0].childNodes[1].innerHTML = playerPersonalInfo.playerNationality;
    personalInfoItems[1].childNodes[1].innerHTML = playerPersonalInfo.playerBirthplace;
    personalInfoItems[2].childNodes[1].innerHTML = playerPersonalInfo.playerRank;
    personalInfoItems[3].childNodes[1].innerHTML = playerPersonalInfo.playerHeight + "cm";
    personalInfoItems[4].childNodes[1].innerHTML = playerPersonalInfo.playerWeight + "kg";
    personalInfoItems[5].childNodes[1].innerHTML = playerPersonalInfo.playerAge;

    let facebookAnchor = document.getElementById('facebook').childNodes[1];
    facebookAnchor.href = playerPersonalInfo.playerFacebook;
    let instagramAnchor = document.getElementById('instagram').childNodes[1];
    instagramAnchor.href = playerPersonalInfo.playerInstagram;
    let twitterAnchor = document.getElementById('twitter').childNodes[1];
    twitterAnchor.href = playerPersonalInfo.playerTwitter;
}

//Γεμίζει το HTML table που έχει το δοσμένο tableId με τα δοσμένα δεδομένα (data)
function fillStatsTableData(data, tableId) {
    let table = document.getElementById(tableId);
    let tableTBody = table.getElementsByTagName('tbody')
    if(tableTBody.length != 0) {
        table.removeChild(tableTBody[0]);
    }

    let tbody = document.createElement('tbody');
    if(data.length == 0) {
        let row = tbody.insertRow();
        let col = row.insertCell(0);
        col.classList.add('warning-message-td');
        col.innerHTML = "No stat records added yet...";
        table.appendChild(tbody);
        
        return;
    }

    data.forEach( item => {
        let row = tbody.insertRow();
        let date = row.insertCell(0);
        date.innerHTML = item.name;
        let name = row.insertCell(1);
        name.classList.add('stat-value');
        name.innerHTML = item.data;
    });
    table.appendChild(tbody);
};

//Γεμίζει το HTML section με τους πίνακες των αγώνων
function fillMatchesTableData(tableData, isForFiltering, checkBoxesData) {
    let matches = document.getElementById('matches');
    matches.querySelectorAll('.match-table').forEach(child => {
        matches.removeChild(child);
    });

    if(tableData.length != 0) {
        matches.childNodes[3].style.display = "none";

        tableData.forEach( item => {
            item.matches.sort((matchA, matchB) => {
                let matchASplitDate = matchA.date.split("/");
                let matchBSplitDate = matchB.date.split("/");
                let aDate = new Date(matchASplitDate[2], matchASplitDate[1], matchASplitDate[0]);
                let bDate = new Date(matchBSplitDate[2], matchBSplitDate[1], matchBSplitDate[0])

                return bDate - aDate;
            });

            let tableContainer = document.createElement('div');
            tableContainer.classList.add('match-table');
            let header = document.createElement('div');
            header.classList.add('match-table-header');
            let img = document.createElement('img');

            storedPlayerImages.matchImages.forEach( matchEntry => {
                if(matchEntry[0] == item.header.title) {
                    img.src = matchEntry[1];
                    return;
                }
            });

            if(img.getAttribute('src') === null) {
                img.src = item.header.image;
            }

            img.alt = item.header.title;
            img.classList.add('icon');
            let p = document.createElement('p');
            p.innerHTML = item.header.title;

            header.appendChild(img);
            header.appendChild(p);
            tableContainer.appendChild(header);

            item.matches.forEach( match => {
                if(isForFiltering && shouldMatchBeFiltered(match, checkBoxesData)) {
                    return;
                }   

                let matchTableRow = document.createElement('a');
                matchTableRow.href = match.link;
                matchTableRow.target = "_blank";
                matchTableRow.classList.add('match-table-row');

                let datesDiv = document.createElement('div');
                datesDiv.classList.add('match-table-row-dates');
                let datesDivP1 = document.createElement('p');
                let datesDivP2 = document.createElement('p');
                if(match.status == "Cancelled") {
                    datesDivP2.classList.add('match-cancelled');
                }
                datesDivP1.textContent = match.date;
                datesDivP2.textContent = match.status;
                datesDiv.appendChild(datesDivP1);
                datesDiv.appendChild(datesDivP2);

                let opponentsDiv = document.createElement('div');
                fillDivContainer(opponentsDiv, match, 0);

                let pointsDiv = document.createElement('div');
                pointsDiv.classList.add('points');
                let resultsDiv = document.createElement('div');
                resultsDiv.classList.add('match-table-row-results');
                if(match.status != "Cancelled") {
                    fillDivContainer(pointsDiv, match, 1);
                    fillDivContainer(resultsDiv, match, 2);
                }

                let resultIconDiv = document.createElement('div');
                resultIconDiv.classList.add('match-table-row-result-img');
                resultIconDiv.innerHTML = match.result_img;

                matchTableRow.appendChild(datesDiv);
                matchTableRow.appendChild(opponentsDiv);
                matchTableRow.appendChild(pointsDiv);
                matchTableRow.appendChild(resultsDiv);
                matchTableRow.appendChild(resultIconDiv);
                tableContainer.appendChild(matchTableRow);
            });

            matches.appendChild(tableContainer);
        });
    }
};

//Μια βοηθητική συνάρτηση που ελέγχει αν κάποιος απο τους επιλεγμένους αντιπάλους στα checkboxes υπάρχει στο δοσμένο match
function shouldMatchBeFiltered(match, checkboxes) {
    let filter = true;
    checkboxes.forEach( checkbox => {
        if(match.opponentA[0] == checkbox.value || match.opponentB[0] == checkbox.value) {
            filter =  false;
        }
    });

    return filter;
}

//Μια βοηθητική μέθοδος για τη δημιουργία κάποιων element στα match του match table
function fillDivContainer(container, match, dataIndex) {
    let containerP1 = document.createElement('p');
    let containerP2 = document.createElement('p');
    containerP1.innerHTML = match.opponentA[dataIndex];
    containerP2.innerHTML = match.opponentB[dataIndex];

    if(match.status == "Cancelled") {
        containerP1.classList.add('match-loser');
        containerP2.classList.add('match-loser');
        container.appendChild(containerP1);
        container.appendChild(containerP2);
    } else {
        containerP1.classList.add('match-winner');
        containerP2.classList.add('match-loser');
        if(match.winnerFirst) {
            container.appendChild(containerP1);
            container.appendChild(containerP2);
        } else {
            container.appendChild(containerP2);
            container.appendChild(containerP1);
        }
    }
};

//Γεμίζει το HTML table με τους τίτλους με τα δοσμένα δεδομένα (data)
function fillTitlesTableData(data, isForFiltering, checkBoxesData, isFromSorting = false) {
    let table = document.getElementById('titles-table');

    if(data.length > 0) {
        if(table.children.length > 0) {
            table.innerHTML = "";
        }

        if(!isFromSorting) {
            data.sort(titlesYearDescCompare);
        }

        data.forEach( dataItem => {
            let row = table.insertRow();
            let year = row.insertCell(0);
            year.innerHTML = dataItem.year;
            let count = row.insertCell(1);

            let titles = row.insertCell(2);
            dataItem.titles.forEach( title => {
                if(isForFiltering && shouldTitleBeFiltered(title, checkBoxesData)) {
                    return;
                } 

                let div = document.createElement('div');
                div.classList.add('title-entry');
                let img = document.createElement('img');

                storedPlayerImages.titleImages.forEach( titleEntry => {
                    if(titleEntry[0] == title[0]) {
                        img.src = titleEntry[1];
                        return;
                    }
                });
    
                if(img.getAttribute('src') === null) {
                    img.src = title[1];
                }

                img.alt = title[0];
                img.classList.add('icon');
                let p = document.createElement('p');
                p.innerHTML = title[0];

                div.appendChild(img);
                div.appendChild(p);
                titles.appendChild(div);
            });

            count.innerHTML = row.querySelectorAll('.title-entry').length;
        });

        table.style.display = "table";
        document.getElementById('titles').childNodes[7].style.display = "none";
    } else {
        table.style.display = "none";
    }
};

//Μια βοηθητική συνάρτηση που ελέγχει αν κάποιος απο τους επιλεγμένους τίτλους στα checkboxes αντιστοιχεί στον δοσμένο τίτλο
function shouldTitleBeFiltered(title, checkboxes) {
    let filter = true;
    checkboxes.forEach( checkbox => {
        if(title[0] == checkbox.value) {
            filter =  false;
        }
    });

    return filter;
}

//Μια συνάρτηση που γεμίζει με όλες τις διαθέσιμες επιλογές το dropdown με τα checkboxes στους τίτλους
function generateAvailableFilterValuesFor(tableData, filterItemsList, filterType) {
    let filterValues = [];

    switch(filterType) {
        case 'statistics':
            getFilterValuesForStatisticsTableData(tableData, filterValues);
            break;
        case 'matches':
            filterMatchesTableData(tableData, filterValues);
            break;
        case 'titles':
            getFilterValuesForTitlesTableData(tableData, filterValues);
            break;
    }

    
    let dropdownList = document.getElementById(filterItemsList);
    dropdownList.querySelectorAll('li').forEach( child => {
        dropdownList.removeChild(child);
    });

    filterValues.forEach( item => {
        let input = document.createElement('input');
        input.type = "checkbox";
        input.value = item[0];
        let li = document.createElement('li');
        let liText = document.createTextNode(item[0]);
    
        li.appendChild(input);
        li.appendChild(liText);
        dropdownList.appendChild(li);
    });
};

//Μια βοηθητική μέθοδος που γεμίζει τη μεταβλητή filterValues με τους τίτλους των διαθέσιμων στατιστικών
function getFilterValuesForStatisticsTableData(tableData, filterValues) {
    if(tableData == null)
        return;

    tableData.forEach( titleItem => {
        filterValues.push([titleItem.name, titleItem.name]);
    });
};

//Μια βοηθητική μέθοδος που γεμίζει τη μεταβλητή filterValues με τους τίτλους των διαθέσιμων προταθλημάτων
function getFilterValuesForTitlesTableData(tableData, filterValues) {
    tableData.forEach( titleItem => {
        titleItem.titles.forEach(titleEntry => {
            if(!filterValues.some(item => item[0] == titleEntry[0])) {
                filterValues.push(titleEntry);
            }
        });
    });

    filterValues.sort(stringAscCompare);
};

//Μια βοηθητική μέθοδος που γεμίζει τη μεταβλητή filterValues με τους αντιπάλους στα διαθέσιμα ματς
function filterMatchesTableData(tableData, filterValues) {
    tableData.forEach( matchObject => {
        matchObject.matches.forEach( matchEntry => {
            if(!filterValues.some(item => (item[0] == matchEntry.opponentA[0] || item[0] == matchEntry.opponentB[0]))) {
                if(matchEntry.opponentA[0] == storedPlayerProfile.personalInfo.playerName + " " + storedPlayerProfile.personalInfo.playerSurname) {
                    filterValues.push([matchEntry.opponentB[0], matchEntry.opponentB[0]]);
                } else {
                    filterValues.push([matchEntry.opponentA[0], matchEntry.opponentA[0]]);
                }
            }
        });
    });

    filterValues.sort(stringAscCompare);
};

//Μια βοηθητική συνάρτηση η οποία συγκρίνει δύο αλφαριθμητικά για ταξινόμηση κατά αύξουσα σειρά
function stringAscCompare(string1, string2) {
    let nameA = string1[0].toLowerCase().replace(/\s+/g, '');
    let nameB = string2[0].toLowerCase().replace(/\s+/g, '');

    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }
        
    return 0; 
}

//Ένας event listener ο οποίος "ακούει" για αλλαγές της περιόδου στον πίνακα με τα στατιστικά
document.getElementById('stats-table-content-select').addEventListener('change', event => {
    let selectedValue = event.target.value;
    fillStatsTableData(storedPlayerProfileStatsTableData[selectedValue].singlesServiceRecordData, 'first-stats-table');
    fillStatsTableData(storedPlayerProfileStatsTableData[selectedValue].singlesReturnRecordData, 'second-stats-table');
    generateAvailableFilterValuesFor(storedPlayerProfileStatsTableData[selectedValue].singlesServiceRecordData, 'statistics-filter-service-dropdown-items', 'statistics');
    generateAvailableFilterValuesFor(storedPlayerProfileStatsTableData[selectedValue].singlesReturnRecordData, 'statistics-filter-return-dropdown-items', 'statistics');
});

//Ένας event listener ο οποίο "ακούει" για αλλαγές στον τρόπο ταξινόμησης του πίνακα με τους τίτλους
document.getElementById('tiles-table-sortby-select').addEventListener('change', event => {
    switch(event.target.value) {
        case "year-desc":
            storedPlayerProfileTitlesTableData.sort(titlesYearDescCompare);
            break;
        case "year-asc":
            storedPlayerProfileTitlesTableData.sort(titlesYearAscCompare);
            break;
        case "titles-desc":
            storedPlayerProfileTitlesTableData.sort(titlesCountDescCompare);
            break;
        case "titles-asc":
            storedPlayerProfileTitlesTableData.sort(titlesCountAscCompare);
            break;
    }
    fillTitlesTableData(storedPlayerProfileTitlesTableData, false, null, true);
});

//Μια βοηθητική συνάρτηση που λειτουργεί ως comparator για φθίνουσα διάταξη ως προς το έτος συμμετοχής
function titlesYearDescCompare(title1, title2) {
    if(title1.year > title2.year) {
        return -1;
    }

    if(title1.year < title2.year) {
        return 1;
    }
    return 0;
};

//Μια βοηθητική συνάρτηση που λειτουργεί ως comparator για αύξουσα διάταξη ως προς το έτος συμμετοχής
function titlesYearAscCompare(title1, title2) {
    if(title1.year < title2.year) {
        return -1;
    }

    if(title1.year > title2.year) {
        return 1;
    }
    return 0;
};

//Μια βοηθητική συνάρτηση που λειτουργεί ως comparator για φθίνουσα διάταξη ως προς το πλήθος τίτλων ανά έτος
function titlesCountDescCompare(title1, title2) {
    if(title1.count > title2.count) {
        return -1;
    }

    if(title1.count < title2.count) {
        return 1;
    }
    return 0;
};

//Μια βοηθητική συνάρτηση που λειτουργεί ως comparator για αύξουσα διάταξη ως προς το πλήθος τίτλων ανά έτος
function titlesCountAscCompare(title1, title2) {
    if(title1.count < title2.count) {
        return -1;
    }

    if(title1.count > title2.count) {
        return 1;
    }
    return 0;
};

//Ένας event listener που "ακούει" για κλικ στο dropdown με τα φίλτρα στους τίτλους ώστε να εμφανίσει/αποκρύψει τις επιλογές
const statisticsActionButtons = document.getElementById('statistics-filter-check-list').getElementsByClassName('action-button');
const statisticsServiceCheckListItems = document.getElementById('statistics-filter-service-dropdown-items');
const statisticsReturnCheckListItems = document.getElementById('statistics-filter-return-dropdown-items');
const statisticsAdditionModal = document.getElementById('stats-addition-modal');
const statisticsAdditionForm = document.getElementById('stats-addition-form');
const statisticsAdditionFormExistingPeriodRadio = document.getElementById('modal-stats-existing-period-radio');
const statisticsAdditionFormNewPeriodRadio = document.getElementById('modal-stats-new-period-radio');

//Ένας event listener που "ακούει" για κλικ στο κουμπί επιλογής φίλτρου για τα στατιστικά
statisticsActionButtons[0].addEventListener('click', function () {
    handleCheckListVisibility(statisticsServiceCheckListItems);
    handleCheckListVisibility(statisticsReturnCheckListItems);
});

//Μια βοηθητική συνάρτηση που ορίζει την ορατότητα για τη δοσμένη λίστα αντικειμένων
function handleCheckListVisibility(checkListItems) {
    if (checkListItems.classList.contains('visible')) {
        checkListItems.classList.remove('visible');
        checkListItems.style.display = "none";
    } else{
        checkListItems.classList.add('visible');
        checkListItems.style.display = "block";
    }
}

//Ένας event listener που "ακούει" για κλικ στο κουμπί προσθήκης τίτλου
statisticsActionButtons[1].addEventListener('click', function() {
    fillStatsPeriodSelect('modal-stats-period-select');
    statisticsAdditionForm.childNodes[5].style.display = "none";
    statisticsAdditionModal.style.display = "block";
});

//Ένας event listener που "ακούει" για κλικ στο radio button για χρήση υπάρχουσας περιόδου των στατιστικών που θα προστεθούν
statisticsAdditionFormExistingPeriodRadio.addEventListener('change', () => {
    showHideElements(statisticsAdditionForm.childNodes[5], statisticsAdditionForm.childNodes[3]);
});

//Ένας event listener που "ακούει" για κλικ στο radio button για χρήση νέας περιόδου των στατιστικών που θα προστεθούν
statisticsAdditionFormNewPeriodRadio.addEventListener('change', () => {
    showHideElements(statisticsAdditionForm.childNodes[3], statisticsAdditionForm.childNodes[5]);
});

//Ένας event listener που "ακούει" για κλικ στο κουμπί εξόδου από το μενού προσθήκης στατιστικών
document.getElementById('statistics-close-button').addEventListener('click', () => {
    statisticsAdditionForm.reset();
    statisticsAdditionModal.style.display = "none";
});

//Ένας event listener που "ακούει" για υποβολές της φόρμας προσθήκης ενός τίτλου
statisticsAdditionForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let periodName;
    if(statisticsAdditionFormExistingPeriodRadio.checked) {
        periodName = document.getElementById('modal-stats-period-select').value.trim();
    } else {
        periodName = document.getElementById('modal-stats-new-period-name').value.trim();
    }

    if(!storedPlayerProfileStatsTableData.hasOwnProperty(periodName)) {
        storedPlayerProfileStatsTableData[periodName] = {
            singlesServiceRecordData: [],
            singlesReturnRecordData: []
        }
    }

    let serviceRecordRadio = document.getElementById('modal-stats-service-record-radio');
    let isServiceRecord = serviceRecordRadio.checked ? true : false;
    let recordName = document.getElementById('modal-stats-new-record-name').value.trim();
    let recordValue = document.getElementById('modal-stats-new-record-value').value.trim();

    let recordObject = {
        name: recordName,
        data: recordValue
    }

    if(isServiceRecord) {
        storedPlayerProfileStatsTableData[periodName].singlesServiceRecordData.push(recordObject);
    } else {
        storedPlayerProfileStatsTableData[periodName].singlesReturnRecordData.push(recordObject);
    }

    storedProfiles[storedPlayerKey] = storedPlayerProfile;
    store(profilesStorageKey, storedProfiles);

    statisticsAdditionForm.reset();
    fillStatsPeriodSelect('stats-table-content-select');
    let selectedCareerPeriodFromDropdown = document.getElementById('stats-table-content-select').value;
    fillStatsTableData(storedPlayerProfileStatsTableData[selectedCareerPeriodFromDropdown].singlesServiceRecordData, 'first-stats-table');
    fillStatsTableData(storedPlayerProfileStatsTableData[selectedCareerPeriodFromDropdown].singlesReturnRecordData, 'second-stats-table');
    generateAvailableFilterValuesFor(storedPlayerProfileStatsTableData[selectedCareerPeriodFromDropdown].singlesServiceRecordData, 'statistics-filter-service-dropdown-items', 'statistics');
    generateAvailableFilterValuesFor(storedPlayerProfileStatsTableData[selectedCareerPeriodFromDropdown].singlesReturnRecordData, 'statistics-filter-return-dropdown-items', 'statistics');
    showHideElements(statisticsAdditionForm.childNodes[5], statisticsAdditionForm.childNodes[3]);
    serviceRecordRadio.checked = true;
    statisticsAdditionFormExistingPeriodRadio.checked = true;
    statisticsAdditionModal.style.display = "none";
});

//Μια βοηθητική συνάρτηση η οποία "γεμίζει" το δοσμένο HTML element με τις διαθέσιμες επιλογές περιόδου στατιστικών
function fillStatsPeriodSelect(elementName) {
    let htmlElement = document.getElementById(elementName);
    htmlElement.querySelectorAll('option').forEach(child => {
        htmlElement.removeChild(child);
    });

    let statsData = storedPlayerProfileStatsTableData;
    Object.keys(statsData).forEach( key => {
        let option = document.createElement('option');
        option.value = key;
        option.innerHTML = key;

        htmlElement.appendChild(option);
    });
}

//Δηλώσεις σταθερών στοιχείων τα οποία είναι απαραίτητα για τη διαχείριση των κουμπιών στου τίτλους και την εισαγωγή αυτών μέσω της αντίστοιχης φόρμας
const titlesActionButtons = document.getElementById('titles-filter-check-list').getElementsByClassName('action-button');
const titlesCheckListItems = document.getElementById('titles-filter-dropdown-items');
const titlesAdditionModal = document.getElementById('titles-addition-modal');
const titlesAdditionForm = document.getElementById('title-addition-form');
const titlesAdditionFormExistingYear = document.getElementById('modal-form-existing-year');
const titlesAdditionFormNewYear = document.getElementById('modal-form-title-new-year');
const titlesAdditionFormExistingTournament = document.getElementById('modal-form-title-existing-tournament');
const titlesAdditionFormNewTournament = document.getElementById('modal-form-title-new-tournament');
const titlesAdditionFormImageUpload = document.getElementById('modal-form-title-image-upload');
const titleAdditionFormYearSelect = document.getElementById('modal-title-select-year');
const titleAdditionFormTournamentSelect = document.getElementById('modal-title-select-tournament');

//Ένας event listener που "ακούει" για κλικ στο κουμπί επιλογής φίλτρου για τους τίτλους
titlesActionButtons[0].addEventListener('click', function () {
    handleCheckListVisibility(titlesCheckListItems);
});

//Ένας event listener που "ακούει" για κλικ στο κουμπί προσθήκης τίτλου
titlesActionButtons[1].addEventListener('click', function () {
    fillExistingYearsDropdown();
    fillExistingTournamentsDropdown(false);
    titleAdditionFormYearSelect.setAttribute('required', '');
    titleAdditionFormTournamentSelect.setAttribute('required', '');
    titlesAdditionModal.style.display = "block";
});

//Ένας event listener που "ακούει" για φόρτωση εικόνας για τον νέο τίτλο
titlesAdditionFormImageUpload.addEventListener('change', () => {
    document.getElementById('modal-form-title-image-label').textContent = titlesAdditionFormImageUpload.files[0].name;
});

//Ένας event listener που "ακούει" για κλικ στο κουμπί εξόδου από το μενού προσθήκης τίτλου
document.getElementById('titles-close-button').addEventListener('click', () => {
    titlesAdditionForm.reset();
    showHideElements(titlesAdditionFormNewTournament, titlesAdditionFormExistingTournament);
    titlesAdditionModal.style.display = "none";
});

//Μια μέθοδος η οποία "γεμίζει" το dropdown menu με τα ήδη υπάρχοντα έτη στα οποία έχει κατακτηθεί τίτλος
function fillExistingYearsDropdown() {
    titleAdditionFormYearSelect.querySelectorAll('option').forEach(child => {
        titleAdditionFormYearSelect.removeChild(child);
    });

    let availableTitles = [];
    storedPlayerProfileTitlesTableData.forEach( entry => {
        availableTitles.push(entry.year);
    });

    availableTitles.forEach( item => {
        let option = document.createElement('option');
        option.value = item;
        option.text = item;
        titleAdditionFormYearSelect.appendChild(option);
    });
};

/*
 * Οι παρακάτω 4 μέθοδοι είναι event listeners οι οποίοι κρύβουν και εμφανίζουν τα απαραίτητα πεδία στην επιλογή έτους και τουρνουά
 * στο μενού προσθήκης τίτλου
 */
document.getElementById('existing-title-year-radio').addEventListener('change', () => {
    showHideElements(titlesAdditionFormNewYear, titlesAdditionFormExistingYear);
    document.getElementById('modal-form-title-new-year').removeAttribute('required');
    
});

document.getElementById('new-title-year-radio').addEventListener('change', () => {
    showHideElements(titlesAdditionFormExistingYear, titlesAdditionFormNewYear);
    document.getElementById('modal-form-title-new-year').setAttribute('required', '');
    titleAdditionFormYearSelect.removeAttribute('required');
});

document.getElementById('existing-title-tournament-radio').addEventListener('change', () => {
    showHideElements(titlesAdditionFormNewTournament, titlesAdditionFormExistingTournament);
    document.getElementById('modal-form-title-new-tournament-name').removeAttribute('required');
    titleAdditionFormTournamentSelect.setAttribute('required', '');
});

document.getElementById('new-title-tournament-radio').addEventListener('change', () => {
    showHideElements(titlesAdditionFormExistingTournament, titlesAdditionFormNewTournament);
    document.getElementById('modal-form-title-new-tournament-name').setAttribute('required', '');
    titleAdditionFormTournamentSelect.removeAttribute('required');
});
    

//Ένας event listener ο οποίος "ακούει" για υποβολή της φόρμας προσθήκης τίτλου από το αντίστοιχο μενού
titlesAdditionForm.addEventListener('submit', event => {
    event.preventDefault();
    let existingYearRadio = document.getElementById('existing-title-year-radio');
    let yearValue;
    if(existingYearRadio.checked) {
        yearValue = titleAdditionFormYearSelect.value;
        let existingTitleObject;
        storedPlayerProfileTitlesTableData.forEach( item => {
            if(item.year == yearValue) {
                existingTitleObject = item;
                return;
            }
        });

        existingTitleObject.count++;
        let titlesArray = createNewTitleArray();
        existingTitleObject.titles.push(titlesArray);
    } else {
        yearValue = document.getElementById('modal-form-title-new-year').value;
        let newTitlesTableEntry = {
            year: parseInt(yearValue),
            count: 1
        };

        let titlesArray = createNewTitleArray();
        newTitlesTableEntry.titles = [titlesArray];
        storedPlayerProfileTitlesTableData.push(newTitlesTableEntry);
        storedProfiles[storedPlayerKey] = storedPlayerProfile; 
    }

    store(profilesStorageKey, storedProfiles);

    titlesAdditionForm.reset();
    titlesAdditionModal.style.display = "none";
    titleAdditionFormYearSelect.removeAttribute('required');
    document.getElementById('modal-form-title-image-label').textContent = "Upload image...";
    document.getElementById('modal-form-title-new-year').removeAttribute('required');
    document.getElementById('modal-form-title-new-tournament-name').removeAttribute('required');
    storedPlayerProfileTitlesTableData.sort(titlesYearDescCompare);
    fillTitlesTableData(storedPlayerProfileTitlesTableData, false, null, false);
    showHideElements(titlesAdditionFormNewYear, titlesAdditionFormExistingYear);
    showHideElements(titlesAdditionFormNewTournament, titlesAdditionFormExistingTournament);
    generateAvailableFilterValuesFor(storedPlayerProfileTitlesTableData, 'titles-filter-dropdown-items', 'titles');
});

// Μια συνάρτηση η οποία κατασκευάζει έναν πίνακα που περιέχει τα στοιχεία ενός τίτλου
function createNewTitleArray() {
    let newTitleObject = [];
    let isExistingTournamentSelected = document.getElementById('existing-title-tournament-radio').checked;

    let selectedTournament;
    if(isExistingTournamentSelected) {
        selectedTournament = titleAdditionFormTournamentSelect.value;
       
        storedPlayerImages.titleImages.forEach( imageEntry => {
            if(imageEntry[0] == selectedTournament) {
                newTitleObject[1] = imageEntry[1];
            }
        });

        newTitleObject[0] = selectedTournament;
    } else {
        selectedTournament = document.getElementById('modal-form-title-new-tournament-name').value.trim();
        let image = titlesAdditionFormImageUpload;

        newTitleObject[0] = selectedTournament;
        newTitleObject[1] = URL.createObjectURL(image.files[0]);

        titleImageReader.tournamentName = selectedTournament;
        titleImageReader.readAsDataURL(image.files[0]);
    }

    return newTitleObject;
}

//Ένας event listener που "ακούει" για κλικ που γίνονται στα checkboxes που φιλτραρουν τα στατιστικά στο Service 
document.getElementById('statistics-filter-service-dropdown-items').addEventListener('click', () => {
    statsFilteringFor('statistics-filter-service-dropdown-items', 'first-stats-table', true);
});

//Ένας event listener που "ακούει" για κλικ που γίνονται στα checkboxes που φιλτραρουν τα στατιστικά στο Return
document.getElementById('statistics-filter-return-dropdown-items').addEventListener('click', () => {
    statsFilteringFor('statistics-filter-return-dropdown-items', 'second-stats-table', false);
});

//Μια βοηθητική μέθοδος που χειρίζεται το φιλτράρισμα των εγγραφών στον πίνακα στατιστικών είτε στο Service είτε στο Return με βάση τις δοσμένες τιμές στις παραμέτρους
function statsFilteringFor(checkBoxElement, tableDataId, isService) {
    let checkBoxes = document.getElementById(checkBoxElement).querySelectorAll('input[type=checkbox]:checked');
    let statsSelectDropdown = document.getElementById('stats-table-content-select');
    let recordData = isService ? storedPlayerProfileStatsTableData[statsSelectDropdown.value].singlesServiceRecordData : storedPlayerProfileStatsTableData[statsSelectDropdown.value].singlesReturnRecordData;
    if(checkBoxes.length != 0) {
        let filteredTableData = recordData.filter( stat => {
            let found = false;
            checkBoxes.forEach( checkBox => {
                if(checkBox.value == stat.name) {
                    found = true;
                }
            });

            return found;
        });

        fillStatsTableData(filteredTableData, tableDataId);
    } else {
        fillStatsTableData(recordData, tableDataId);
    }
};

//Ένας event listener που "ακούει" για κλικ που γίνονται στα checkboxes που φιλτραρουν τους αγώνες
document.getElementById('matches-filter-dropdown-items').addEventListener('click', event => {
    let checkBoxes = document.getElementById('matches-filter-dropdown-items').querySelectorAll('input[type=checkbox]:checked');
    if(checkBoxes.length != 0) {
        let filteredTableData = storedPlayerProfileMatchesTableData.filter(matchObject => {
            let found = false;
            matchObject.matches.forEach( matchEntry => {
                checkBoxes.forEach( checkBox => {
                    if(checkBox.value == matchEntry.opponentA[0] || checkBox.value == matchEntry.opponentB[0]) {
                        found = true;
                    }
                });
            });

            return found;
        });

        fillMatchesTableData(filteredTableData, true, checkBoxes);
    } else {
        fillMatchesTableData(storedPlayerProfileMatchesTableData, false, null);
    }
});

//Ένας event listener που "ακούει" για κλικ που γίνονται στα checkboxes που φιλτραρουν τους τίτλους
document.getElementById('titles-filter-dropdown-items').addEventListener('click', event => {
    let checkBoxes = document.getElementById('titles-filter-dropdown-items').querySelectorAll('input[type=checkbox]:checked');
    if(checkBoxes.length != 0) {
        let filteredTableData = storedPlayerProfileTitlesTableData.filter(title => {
            let found = false;
            title.titles.forEach( titleEntry => {
                checkBoxes.forEach( checkBox => {
                    if(checkBox.value == titleEntry[0]) {
                        found = true;
                    }
                });
            });

            return found;
        });

        fillTitlesTableData(filteredTableData, true, checkBoxes);
    } else {
        fillTitlesTableData(storedPlayerProfileTitlesTableData, false, null);
    }
});

//Δηλώσεις σταθερών στοιχείων τα οποία είναι απαραίτητα για τη διαχείριση των κουμπιών στου αγώνες και την εισαγωγή αυτών μέσω της αντίστοιχης φόρμας
const matchesActionButtons = document.getElementById('matches-filter-check-list').getElementsByClassName('action-button');
const matchesAdditionModal = document.getElementById('matches-addition-modal');
const matchAdditionForm = document.getElementById('match-addition-form');
const matchesNewTournamentName = matchAdditionForm.elements.namedItem('modal-form-new-tournament-name');
const existingTournamentDiv = document.getElementById('modal-form-existing-tournament');
const newTournamentDiv = document.getElementById('modal-form-new-tournament');
const matchesNewTournamentImage = document.getElementById('modal-form-image-upload');
const matchesNewTournamentLabel = document.getElementById('modal-form-image-label');
const matchesExistingTournamentSelect = document.getElementById('modal-tournament-select');

//Ένας event listener που "ακούει" για κλικ στο κουμπί επιλογής φίλτρων για τους αγώνες
matchesActionButtons[0].addEventListener('click', function () {
    handleCheckListVisibility(document.getElementById('matches-filter-dropdown-items'));
});

//Ένας event listener που "ακούει" για κλικ στο κουμπί προσθήκης αγώνων
matchesActionButtons[1].addEventListener('click', function () {
    fillExistingTournamentsDropdown(true);
    matchesAdditionModal.style.display = "block";
    matchAdditionForm.elements.namedItem('modal-form-opponentA-name').setAttribute('placeholder', storedPlayerProfile.personalInfo.playerName + " " + storedPlayerProfile.personalInfo.playerSurname);
    matchesExistingTournamentSelect.setAttribute('required', '');
});

//Μια μέθοδος η οποία "γεμίζει" το dropdown menu με τα υπάρχοντα τουρνουά στον πίνακα των αγώνων και των τίτλων
function fillExistingTournamentsDropdown(isForMatch) {
    let dropdownMenu;
    let availableTournaments = [];
    if(isForMatch) {
        dropdownMenu = document.getElementById('modal-tournament-select');
        storedPlayerProfileMatchesTableData.forEach( entry => {
            availableTournaments.push(entry.header.title);
        });
    } else {
        dropdownMenu = titleAdditionFormTournamentSelect;
        storedPlayerProfileTitlesTableData.forEach( titlesObject => {
            titlesObject.titles.forEach( titleEntry => {
                let titleName = titleEntry[0];
                if(!availableTournaments.includes(titleName))
                    availableTournaments.push(titleName);
            });
        });
    }

    dropdownMenu.querySelectorAll('option').forEach(child => {
        dropdownMenu.removeChild(child);
    });

    availableTournaments.forEach( item => {
        let option = document.createElement('option');
        option.value = item;
        option.text = item;
        dropdownMenu.appendChild(option);
    });
}

//Ένας event listener που "ακούει" για κλικ στο radio button που σηματοδοτεί τη χρήση ήδη υπάρχοντος τουρνουά
document.getElementById('existing-tournament-radio').addEventListener('change', () => {
    showHideElements(newTournamentDiv, existingTournamentDiv);
    matchesNewTournamentName.removeAttribute('required');
    matchesNewTournamentImage.removeAttribute('required');
    matchesExistingTournamentSelect.setAttribute('required', '');
});

//Ένας event listener που "ακούει" για κλικ στο radio button που σηματοδοτεί τη χρήση ήδη υπάρχοντος τουρνουά
matchAdditionForm.elements.namedItem('new-tournament').addEventListener('change', () => {
    showHideElements(existingTournamentDiv, newTournamentDiv);
    matchesNewTournamentName.setAttribute('required', '');
    matchesNewTournamentImage.setAttribute('required', '');
    matchesExistingTournamentSelect.removeAttribute('required');
});

//Μια βοηθητική συνάρτηση η οποία κρύβει και εμφανίζει τα κατάλληλα πεδία
function showHideElements(itemToHide, itemToReveal) {
    itemToHide.style.display = "none";
    itemToReveal.style.display = "flex";
};

//Ένας event listener που "ακούει" για αλλαγές στο checkbox για τους Cancelled αγώνες, ώστε να απενεργοποιήσει/ενεργοποιήσει τα απαραίτητα πεδία
document.getElementById('modal-form-canceled-tournament').addEventListener('change', (event) => {
    if(event.target.checked) {
        disableFieldsForCancelledMatch(true);
    } else {
        disableFieldsForCancelledMatch(false);
    }
});

//Μια συνάρτηση η οποία ενεργοποιεί/απενεργοποιεί τα επιλεγμένα πεδία ανάλογα με τη τιμή της παραμέτρου flag
function disableFieldsForCancelledMatch(flag) {
    document.getElementsByClassName('modal-form-opponents-groups')[0].querySelectorAll('input:nth-child(3), input:nth-child(4), input[type="radio"]').forEach( inputElement => {
        inputElement.disabled = flag;
    });
};

//Ένας event listener που "ακούει" για κλικ στο κουμπί εξόδου από το μενού προσθήκης αγώνων
matchAdditionForm.elements.namedItem('matches-close-button').addEventListener('click', () => {
    matchAdditionForm.reset();
    showHideElements(newTournamentDiv, existingTournamentDiv);
    matchesAdditionModal.style.display = "none";
});

//Ένας event listener που "ακούει" για αλλαγές στο κουμπί φόρτωσης φωτογραφίας τουρνούα αγώνων
matchesNewTournamentImage.addEventListener('change', () => {
    matchesNewTournamentLabel.textContent = matchesNewTournamentImage.files[0].name;
});

//Ένας event listener που "ακούει" για την υποβολή της φόρμας προσθήκης αγώνων
matchAdditionForm.addEventListener('submit', event => {
    event.preventDefault();
    let selectedTournamentRadio = document.getElementById('existing-tournament-radio');
    if(selectedTournamentRadio.checked) {
        let existingMatchObject;
        storedPlayerProfileMatchesTableData.forEach( item => {
            if(item.header.title == matchesExistingTournamentSelect.value) {
                existingMatchObject = item;
                return;
            }
        });

        let newMatchObject = createNewMatchObject();
        existingMatchObject.matches.push(newMatchObject);
    } else {
        let tournamentName = matchesNewTournamentName.value.trim();
        let newTournament = {
            header: {
                //Ένας "hack" για να εμφανίζεται το image όταν γίνεται εισαγωγή του αγώνα. Διότι αν πάει να τραβήξει τη φωτογραφία
                //από το storedPlayerImages πριν γίνει reload η σελίδα, η νέα φωτογραφία δεν επιστρέφεται για κάποιο λόγο. 
                image: URL.createObjectURL(matchesNewTournamentImage.files[0]),
                title: tournamentName
            }
        };

        matchImageReader.tournamentName = tournamentName;
        matchImageReader.readAsDataURL(matchesNewTournamentImage.files[0]);

        let newMatchObject = createNewMatchObject();
        newTournament.matches = [newMatchObject];
        storedPlayerProfileMatchesTableData.push(newTournament);
    }

    storedProfiles[storedPlayerKey] = storedPlayerProfile;
    store(profilesStorageKey, storedProfiles);

    matchAdditionForm.reset();
    matchesAdditionModal.style.display = "none";
    matchesNewTournamentLabel.textContent = "Upload image...";
    matchesNewTournamentName.removeAttribute("required");
    matchesNewTournamentImage.removeAttribute("required");
    disableFieldsForCancelledMatch(false);
    fillMatchesTableData(storedPlayerProfileMatchesTableData, false, null);
    showHideElements(newTournamentDiv, existingTournamentDiv)
    generateAvailableFilterValuesFor(storedPlayerProfileMatchesTableData, 'matches-filter-dropdown-items', 'matches');
});

//Μια συνάρτηση η οποία κατασκευάζει ένα αντικείμενο που περιέχει τα στοιχεία ενός αγώνα
function createNewMatchObject() {
    let newMatchObject = {};
    newMatchObject.link = matchAdditionForm.elements.namedItem('modal-form-match-link').value.trim();

    let dateInput = document.getElementById('modal-form-date');
    let date = new Date(dateInput.value.trim());
    newMatchObject.date = date.toLocaleDateString('en-GB');

    let opponentAPoints = matchAdditionForm.elements.namedItem('modal-form-opponentA-points').value.trim();
    let opponentAResult = matchAdditionForm.elements.namedItem('modal-form-opponentA-result').value.trim();
    let opponentBName = matchAdditionForm.elements.namedItem('modal-form-opponentB-name').value.trim();
    let opponentBPoints = matchAdditionForm.elements.namedItem('modal-form-opponentB-points').value.trim();
    let opponentBResult = matchAdditionForm.elements.namedItem('modal-form-opponentB-result').value.trim();

    let playerName = storedPlayerProfile.personalInfo.playerName + " " + storedPlayerProfile.personalInfo.playerSurname;
    if(document.getElementById('modal-form-canceled-tournament').checked) {
        newMatchObject.status = "Cancelled";
        newMatchObject.result_img = MatchResultIcons.CANCELLED;

        newMatchObject.opponentA = [ playerName ];
        newMatchObject.opponentB = [ opponentBName ];
    } else {
        let isOpponentAWinner = matchAdditionForm.elements.namedItem('modal-form-opponentA-winner-radio').checked;
        newMatchObject.result_img = isOpponentAWinner ? MatchResultIcons.WIN : MatchResultIcons.DEFEAT;

        newMatchObject.status = "FT";
        newMatchObject.winnerFirst = false;

        if(isOpponentAWinner) {
            newMatchObject.opponentA = [ playerName, opponentAPoints, opponentAResult];
            newMatchObject.opponentB = [ opponentBName, opponentBPoints, opponentBResult];
        } else {
            newMatchObject.opponentB = [ playerName, opponentAPoints, opponentAResult];
            newMatchObject.opponentA = [ opponentBName, opponentBPoints, opponentBResult];
        }
    }

    return newMatchObject;
}

//Μια συνάρτηση η οποία αποθηκεύει το δοσμένο αντικείμενο με το δοσμένο όνομα στο localStorage
function store(constName, tableData) {
    localStorage.setItem(constName, JSON.stringify(tableData));
}

//Μια συνάρτηση η οποία επιστρέφει τα αποθηκευμένα προφίλ και τις εικόνες από το localStorage
function retrievePlayerProfileData() {
    let profiles = JSON.parse(localStorage.getItem(profilesStorageKey));
    let playerImage = JSON.parse(localStorage.getItem(imagesStorageKey));

    return [profiles, playerImage];
}