'use strict'

let connectionStatus;
let xmlHttp = new XMLHttpRequest();
xmlHttp.open("GET", "https://apostolisich.github.io/TennisPlayerProfile/", true);
xmlHttp.setRequestHeader("Pragma", "no-cache");
xmlHttp.setRequestHeader("Cache-Control", "no-cache");
xmlHttp.send();
xmlHttp.onload = function() {
    if(this.readyState == 4 && this.status == 200) {
        connectionStatus = "connected";
    } else {
        connectionStatus = "disconnected"
        document.getElementById('create-profile-section').style.display = "none";
    }
    console.log("Status: " + xmlHttp.status);
    console.log("State: " + xmlHttp.readyState);
    console.log(connectionStatus);
}

const imagesStorageKey = "TennisImages";
const profilesStorageKey = "TennisProfiles";

const storedItems = retrieveExistingStoredItems();
let storedProfiles = storedItems[0];
let storedImages = storedItems[1];

//Ένας event listener που "ακούει" για κλικ στη λίστα των ήδη υπαρχόντων προφίλ από το localStorage
const existingProfilesList = document.getElementById('existing-profiles-list');
existingProfilesList.addEventListener('click', (event) => {
    if(event.target && event.target.tagName == "LI") {
        let selectedPlayerName = event.target.querySelectorAll('p')[0].innerHTML.replace(/\s+/g, '');
        window.location.replace('profile.html?name=' + selectedPlayerName);
    }
});

//Ένας event listener που "ακούει" για κλικ στο κουμπί διαγραφής όλων των υπάρχοντων προφίλ
const deleteProfilesButton = document.getElementById('delete-profiles-button');
document.getElementById('delete-profiles-button').addEventListener('click', () => {
    localStorage.removeItem(imagesStorageKey);
    localStorage.removeItem(profilesStorageKey);
    existingProfilesList.style.display = "none";
    deleteProfilesButton.style.display = "none";
    document.getElementById('profiles-warning-paragraph').style.display = "block";
});

buildAlreadyExistingProfilesList();

//Ένας event listener που "ακούει" για φόρτωση εικόνων του αθλητή
const playerImage = document.getElementById('player-image');
playerImage.addEventListener('change', () => {
    let imageLabel = document.getElementById('player-image-label');
    imageLabel.textContent = playerImage.files[0].name;
    let i = document.createElement('i');
    i.className = 'fa fa-upload upload-icon';
    imageLabel.prepend(i);
});

//Ένας event listener που "ακούει" για υποβολές στη φόρμα δημιουργίας παίκτη
const profileForm = document.getElementById('profile-create-form');
profileForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if(!navigator.onLine) {
        document.getElementsByClassName('offline-error-message')[0].style.display = "block";
    } else {
        buildPlayerProfile();
    }
});

// Μια συνάρτηση η οποία χτίζει το αρχικό αντικείμενο του αθλητή με τα στοιχεία του
function buildPlayerProfile() {
    let playerImageValue = playerImage.files[0];
    let playerNameValue = document.getElementById('player-name').value;
    let playerSurnameValue = document.getElementById('player-surname').value;
    let playerHeightValue = document.getElementById('player-height').value;
    let playerWeightValue = document.getElementById('player-weight').value;
    let playerRankValue = document.getElementById('player-rank').value;
    let playerAgeValue = document.getElementById('player-age').value;
    let playerNationalityValue = document.getElementById('player-nationality').value;
    let playerBirthplaceValue = document.getElementById('player-birthplace').value;
    let playerFacebook = document.getElementById('player-facebook').value;
    let playerInstagram = document.getElementById('player-instagram').value;
    let playerTwitter = document.getElementById('player-twitter').value;

    let playerObject = {
        
        personalInfo: {
            playerName: playerNameValue,
            playerSurname: playerSurnameValue,
            playerHeight: playerHeightValue,
            playerWeight: playerWeightValue,
            playerRank: playerRankValue,
            playerAge: playerAgeValue,
            playerNationality: playerNationalityValue,
            playerBirthplace: playerBirthplaceValue,
            playerFacebook: playerFacebook,
            playerInstagram: playerInstagram,
            playerTwitter: playerTwitter
        },
        statsTableData: {
            Career: {
                singlesServiceRecordData: [],
                singlesReturnRecordData: []
            }
        },
        titlesTableData: [],
        matchesTableData: []
    }

    let storageKey = playerObject.personalInfo.playerName + playerObject.personalInfo.playerSurname;
    let reader = new FileReader();
    reader.onload = function(e) {
        let imageObject = {
            profileImage: e.target.result,
            matchImages: [],
            titleImages: []
        }
        storedImages[storageKey] = imageObject;
        store(imagesStorageKey, storedImages);
    };
    reader.readAsDataURL(playerImageValue);

    storedProfiles[storageKey] = playerObject;
    store(profilesStorageKey, storedProfiles);
    window.location.replace('profile.html?name=' + storageKey);
}

//Μια συνάρτηση που "γεμίζει" τη λίστα με τα προφίλ που είναι αποθηκευμένα στο localStorage
function buildAlreadyExistingProfilesList() {
    if(storedProfiles && Object.keys(storedProfiles).length === 0){
        existingProfilesList.style.display = "none";
        deleteProfilesButton.style.display = "none";
        return;
    }

    Object.keys(storedProfiles).forEach( key => {
        let currentProfile = storedProfiles[key];

        let personalInfo = currentProfile.personalInfo;
        let fullName = personalInfo.playerName + " " + personalInfo.playerSurname;
        let li = document.createElement('li');
        let image = document.createElement('img');
        image.src = storedImages[key].profileImage;
        image.alt = fullName;
        image.classList.add('icon');
        let p = document.createElement('p');
        p.textContent = fullName;
        
        li.appendChild(image);
        li.appendChild(p);
        existingProfilesList.appendChild(li);
    });
    document.getElementById('profiles-warning-paragraph').style.display = "none";
}

//Μια συνάρτηση η οποία αποθηκεύει το δοσμένο αντικείμενο με το δοσμένο όνομα στο localStorage
function store(constName, tableData) {
    localStorage.setItem(constName, JSON.stringify(tableData));
}

//Μια συνάρτηση που ανακτά όλα τα προφίλ από το localStorage
function retrieveExistingStoredItems() {
    let profiles;
    let images;
    Object.keys(localStorage).forEach(item => {
        if(item.startsWith('TennisProfiles')){
            profiles = JSON.parse(localStorage.getItem(item));
        } else if(item.startsWith('TennisImages')) {
            images = JSON.parse(localStorage.getItem(item));
        }
    });

    if(profiles == null) {
        profiles = {};
    }

    if(images == null) {
        images = {};
    }

    return [profiles, images];
}

//Κώδικας απαραίτητος για την δημιουργία ενός service worker για την σελίδα
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker
        .register('serviceWorker.js')
        .then(res => console.log('service worker registered'))
        .catch(err => console.log('service worker not registered', err))
    });
};