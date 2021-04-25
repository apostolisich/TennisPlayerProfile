'use strict';

//Ένα αντικείμενο που περιέχει τα δεδομένα για τον πίνακα των στατιστικών
const statsTableData = {
    career: {
        singlesServiceRecordData: [
            { name: "1st Serve", data: "68%" },
            { name: "1st Serve Points Won", data: "72%" },
            { name: "2nd Serve Points Won", data: "57%" },
            { name: "Aces", data: "3,650" },
            { name: "Double Faults", data: "1,898" },
            { name: "Break Points Faced", data: "5,963" },
            { name: "Break Points Saved", data: "67%" },
            { name: "Service Games Played", data: "14,053" },
            { name: "Service Games Won", data: "86%" },
            { name: "Total Service Points Won", data: "67%" }
        ],
        singlesReturnRecordData: [
            { name: "1st Serve Return Points Won", data: "34%" },
            { name: "2nd Serve Return Points Won", data: "55%" },
            { name: "Break Points Opportunities", data: "10,388" },
            { name: "Break Points Converted", data: "45%" },
            { name: "Return Games Played", data: "13,930" },
            { name: "Return Games Won", data: "34%" },
            { name: "Return Points Won", data: "42%" },
            { name: "Total Points Won", data: "55%" }
        ]
    },
    2020: {
        singlesServiceRecordData: [
            { name: "1st Serve", data: "64%" },
            { name: "1st Serve Points Won", data: "75%" },
            { name: "2nd Serve Points Won", data: "58%" },
            { name: "Aces", data: "160" },
            { name: "Double Faults", data: "66" },
            { name: "Break Points Faced", data: "160" },
            { name: "Break Points Saved", data: "68%" },
            { name: "Service Games Played", data: "414" },
            { name: "Service Games Won", data: "87%" },
            { name: "Total Service Points Won", data: "69%" }
        ],
        singlesReturnRecordData: [
            { name: "1st Serve Return Points Won", data: "35%" },
            { name: "2nd Serve Return Points Won", data: "57%" },
            { name: "Break Points Opportunities", data: "278" },
            { name: "Break Points Converted", data: "49%" },
            { name: "Return Games Played", data: "398" },
            { name: "Return Games Won", data: "34%" },
            { name: "Return Points Won", data: "43%" },
            { name: "Total Points Won", data: "56%" }
        ]
    },
    2019: {
        singlesServiceRecordData: [
            { name: "1st Serve", data: "65%" },
            { name: "1st Serve Points Won", data: "76%" },
            { name: "2nd Serve Points Won", data: "60%" },
            { name: "Aces", data: "271" },
            { name: "Double Faults", data: "118" },
            { name: "Break Points Faced", data: "231" },
            { name: "Break Points Saved", data: "68%" },
            { name: "Service Games Played", data: "737" },
            { name: "Service Games Won", data: "90%" },
            { name: "Total Service Points Won", data: "70%" }
        ],
        singlesReturnRecordData: [
            { name: "1st Serve Return Points Won", data: "35%" },
            { name: "2nd Serve Return Points Won", data: "56%" },
            { name: "Break Points Opportunities", data: "556" },
            { name: "Break Points Converted", data: "45%" },
            { name: "Return Games Played", data: "715" },
            { name: "Return Games Won", data: "35%" },
            { name: "Return Points Won", data: "42%" },
            { name: "Total Points Won", data: "56%" }
        ]
    },
    2018: {
        singlesServiceRecordData: [
            { name: "1st Serve", data: "66%" },
            { name: "1st Serve Points Won", data: "72%" },
            { name: "2nd Serve Points Won", data: "60%" },
            { name: "Aces", data: "122" },
            { name: "Double Faults", data: "91" },
            { name: "Break Points Faced", data: "281" },
            { name: "Break Points Saved", data: "70%" },
            { name: "Service Games Played", data: "612" },
            { name: "Service Games Won", data: "86%" },
            { name: "Total Service Points Won", data: "68%" }
        ],
        singlesReturnRecordData: [
            { name: "1st Serve Return Points Won", data: "36%" },
            { name: "2nd Serve Return Points Won", data: "57%" },
            { name: "Break Points Opportunities", data: "474" },
            { name: "Break Points Converted", data: "46%" },
            { name: "Return Games Played", data: "591" },
            { name: "Return Games Won", data: "37%" },
            { name: "Return Points Won", data: "44%" },
            { name: "Total Points Won", data: "55%" }
        ]
    }
};

//Ένα σταθερό αντικείμενο το οποίο περιέχει τα τουρνουά για έυκολη αναφορά και αποφυγεί του copy-paste
const Tournaments = {
    R_GARROS: {
        key: "Roland Garros",
        img: "assets/tournaments/roland_garros.png",
        value: "R. Garros"
    },
    ACAPULCO: {
        key: "Acapulco",
        img: "assets/tournaments/acapulco.jpg",
        value: "Acapulco"
    },
    US_OPEN: {
        key: "US Open",
        img: "assets/tournaments/us_open.png",
        value: "US Open"
    },
    ATP_CANADA: {
        key: "ATP Masters 1000 Canada",
        img: "assets/tournaments/atp_cup.webp",
        value: "Canada"
    },
    ATP_MONTE_CARLO: {
        key: "ATP Masters 1000 Monte Carlo",
        img: "assets/tournaments/monte_carlo.webp",
        value: "Monte Carlo"
    },
    ATP_ROME: {
        key: "ATP Masters 1000 Rome",
        img: "assets/tournaments/rome.webp",
        value: "Rome"
    },
    ATP_MADRID: {
        key: "ATP Masters 1000 Madrid",
        img: "assets/tournaments/madrid.webp",
        value: "Madrid"
    },
    BARCELONA: {
        key: "Barcelona",
        img: "assets/tournaments/barcelona_open.png",
        value: "Barcelona"
    },
    BEIJING: {
        key: "Beijing",
        img: "assets/tournaments/china_open.png",
        value: "Beijing"
    },
    HAMBURG: {
        key: "Hamburg",
        img: "assets/tournaments/hamburg.webp",
        value: "Hamburg"
    },
    STUTTGART: {
        key: "Stuttgart",
        img: "assets/tournaments/stuttgart.png",
        value: "Stuttgart"
    },
    BUENOS_AIRES: {
        key: "Buenos Aires",
        img: "assets/tournaments/buenos_aires.webp",
        value: "Buenos Aires"
    },
    RIO_DE_JANEIRO: {
        key: "Rio de Janeiro",
        img: "assets/tournaments/rio_dejaneiro.webp",
        value: "Rio d Janeiro"
    },
    DOHA: {
        key: "Doha",
        img: "assets/tournaments/doha.webp",
        value: "Doha"
    },
    AUSTRALIA: {
        key: "Australia Open",
        img: "assets/tournaments/australian_open.webp",
        value: "Australia Open",
    },
    ATP_CUP: {
        key: "ATP Cup",
        img: "assets/tournaments/atp_cup.webp",
        value: "ATP Cup"
    },
    ATP_FINALS: {
        key: "ATP Finals",
        img: "assets/tournaments/atp_finals.webp",
        value: "ATP Finals"
    },
    PARIS: {
        key: "Paris",
        img: "assets/tournaments/paris_open.webp",
        value: "Paris"
    }
};
Object.freeze(Tournaments);

//Ένας πίνακας που αποτελείται από αντικείμενα, καθένα από τα οποία περιέχει τίτλους για μια συγκεκριμένη χρονιά
const titlesTableData = [
    { 
        year: 2020,
        count: 2,
        titles: [
            [Tournaments.R_GARROS.key, Tournaments.R_GARROS.value, Tournaments.R_GARROS.img],
            [Tournaments.ACAPULCO.key, Tournaments.ACAPULCO.value, Tournaments.ACAPULCO.img]
        ]
    },
    {
        year: 2019,
        count: 4,
        titles: [
            [Tournaments.US_OPEN.key, Tournaments.US_OPEN.value, Tournaments.US_OPEN.img],
            [Tournaments.ATP_CANADA.key, Tournaments.ATP_CANADA.value, Tournaments.ATP_CANADA.img],
            [Tournaments.R_GARROS.key, Tournaments.R_GARROS.value, Tournaments.R_GARROS.img],
            [Tournaments.ATP_MONTE_CARLO.key, Tournaments.ATP_MONTE_CARLO.value, Tournaments.ATP_MONTE_CARLO.img]
        ]
    },
    {
        year: 2018,
        count: 5,
        titles: [
            [Tournaments.ATP_CANADA.key, Tournaments.ATP_CANADA.value, Tournaments.ATP_CANADA.img],
            [Tournaments.R_GARROS.key, Tournaments.R_GARROS.value, Tournaments.R_GARROS.img],
            [Tournaments.ATP_ROME.key, Tournaments.ATP_ROME.value, Tournaments.ATP_ROME.img],
            [Tournaments.BARCELONA.key, Tournaments.BARCELONA.value, Tournaments.BARCELONA.img],
            [Tournaments.ATP_MONTE_CARLO.key, Tournaments.ATP_MONTE_CARLO.value, Tournaments.ATP_MONTE_CARLO.img,]
        ]
    },
    {
        year: 2017,
        count: 6,
        titles: [
            [Tournaments.BEIJING.key, Tournaments.BEIJING.value, Tournaments.BEIJING.img],
            [Tournaments.US_OPEN.key, Tournaments.US_OPEN.value, Tournaments.US_OPEN.img,],
            [Tournaments.R_GARROS.key, Tournaments.R_GARROS.value, Tournaments.R_GARROS.img],
            [Tournaments.ATP_MADRID.key, Tournaments.ATP_MADRID.value, Tournaments.ATP_MADRID.img],
            [Tournaments.BARCELONA.key, Tournaments.BARCELONA.value, Tournaments.BARCELONA.img],
            [Tournaments.ATP_MONTE_CARLO.key, Tournaments.ATP_MONTE_CARLO.value, Tournaments.ATP_MONTE_CARLO.img]
        ]
    },
    {
        year: 2016,
        count: 2,
        titles: [
            [Tournaments.BARCELONA.key, Tournaments.BARCELONA.value, Tournaments.BARCELONA.img],
            [Tournaments.ATP_MONTE_CARLO.key, Tournaments.ATP_MONTE_CARLO.value, Tournaments.ATP_MONTE_CARLO.img]
        ]
    },
    {
        year: 2015,
        count: 3,
        titles: [
            [Tournaments.HAMBURG.key, Tournaments.HAMBURG.value, Tournaments.HAMBURG.img],
            [Tournaments.STUTTGART.key, Tournaments.STUTTGART.value, Tournaments.STUTTGART.img],
            [Tournaments.BUENOS_AIRES.key, Tournaments.BUENOS_AIRES.value, Tournaments.BUENOS_AIRES.img]
        ]
    },
    {
        year: 2014,
        count: 4,
        titles: [
            [Tournaments.R_GARROS.key, Tournaments.R_GARROS.value, Tournaments.R_GARROS.img],
            [Tournaments.ATP_MADRID.key, Tournaments.ATP_MADRID.value, Tournaments.ATP_MADRID.img],
            [Tournaments.RIO_DE_JANEIRO.key, Tournaments.RIO_DE_JANEIRO.value, Tournaments.RIO_DE_JANEIRO.img],
            [Tournaments.DOHA.key, Tournaments.DOHA.value, Tournaments.DOHA.img]
        ]
    }
];

//Ένα σταθερό αντικείμενο το οποίο περιέχει τις εικόνες για νίκη/ήττα για εύκολη αναφορά
const MatchResultIcons = {
    WIN: '<svg viewBox="0 0 24 24" width="20" height="20" fill="#52b030"><path d="M24,12c0,6.6-5.4,12-12,12C5.4,24,0,18.6,0,12S5.4,0,12,0C18.6,0,24,5.4,24,12z M15.7,16.9l2.1-9.8h-2.3 l-1.1,6.1L13,7.1h-2l-1.3,6.1L8.5,7.1H6.2l2.1,9.8h2.4l1.3-5.6l1.3,5.6H15.7L15.7,16.9z"></path></svg>',
    DEFEAT:  '<svg viewBox="0 0 24 24" width="20" height="20" fill="#c1272d"><path d="M24,12c0,6.6-5.4,12-12,12C5.4,24,0,18.6,0,12S5.4,0,12,0C18.6,0,24,5.4,24,12z M15.9,17.5v-2.1h-4.7v-9H8.5v11.1L15.9,17.5 L15.9,17.5z"></path></svg>',
    CANCELLED: '<svg viewBox="0 0 24 24" width="20" height="20" fill="#ced4da"><path d="M24,12c0,6.6-5.4,12-12,12C5.4,24,0,18.6,0,12C0,5.4,5.4,0,12,0C18.6,0,24,5.4,24,12z M13.5,17c0.1-0.1,0.1-0.3,0.1-0.5 c0-0.2,0-0.3-0.1-0.5c-0.1-0.1-0.1-0.3-0.2-0.4c-0.1-0.1-0.2-0.2-0.4-0.2c-0.2-0.1-0.3-0.1-0.5-0.1s-0.4,0-0.5,0.1 c-0.2,0.1-0.3,0.1-0.4,0.2c-0.1,0.1-0.2,0.2-0.2,0.4c-0.1,0.1-0.1,0.3-0.1,0.5c0,0.2,0,0.3,0.1,0.5c0.1,0.1,0.1,0.3,0.2,0.4 s0.2,0.2,0.4,0.2c0.2,0.1,0.3,0.1,0.5,0.1s0.4,0,0.5-0.1c0.2-0.1,0.3-0.1,0.4-0.2C13.3,17.3,13.4,17.2,13.5,17L13.5,17z M15.7,10.2 c0.1-0.3,0.2-0.6,0.2-0.9c0-0.5-0.1-0.9-0.2-1.3c-0.2-0.4-0.4-0.7-0.7-0.9c-0.3-0.3-0.7-0.4-1.1-0.6c-0.4-0.1-0.9-0.2-1.4-0.2 c-0.5,0-0.9,0.1-1.4,0.2C10.7,6.6,10.3,6.8,10,7S9.4,7.6,9.3,8C9.1,8.4,9,8.9,9,9.4h2.2c0-0.2,0-0.4,0.1-0.6s0.2-0.3,0.3-0.4 c0.1-0.1,0.3-0.2,0.4-0.2c0.2,0,0.3-0.1,0.5-0.1c0.4,0,0.7,0.1,0.9,0.3c0.2,0.2,0.3,0.5,0.3,1c0,0.2,0,0.4-0.1,0.5 c-0.1,0.2-0.1,0.3-0.2,0.5c-0.1,0.1-0.2,0.3-0.4,0.4c-0.1,0.1-0.3,0.3-0.5,0.4c-0.2,0.2-0.4,0.4-0.6,0.6c-0.1,0.2-0.3,0.4-0.4,0.6 c-0.1,0.2-0.2,0.5-0.2,0.8c0,0.3-0.1,0.6-0.1,0.9h2c0-0.2,0-0.4,0-0.5c0-0.2,0.1-0.3,0.1-0.5s0.1-0.3,0.2-0.4 c0.1-0.1,0.2-0.3,0.4-0.4c0.3-0.2,0.5-0.5,0.7-0.7c0.2-0.2,0.4-0.5,0.6-0.7S15.6,10.5,15.7,10.2L15.7,10.2z"></path></svg>'
};
Object.freeze(MatchResultIcons);

//Ένας πίνακας που αποτελείται από αντικείμενα αγώνων
const matchesTableData = [
    {
        header: {
            image: Tournaments.AUSTRALIA.img,
            title: Tournaments.AUSTRALIA.value
        },
        matches: [
            {
                link: "https://www.sofascore.com/nadal-tsitsipas/LOfsqXY",
                date: "17/02/21",
                status: "FT",
                winnerFirst: true,
                winner: [ "Tsitsipas S.", "3 2 7<sup>7</sup> 6 7", "3"],
                loser: [ "Nadal R.", "6 6 6<sup>4</sup> 4 5", "2"],
                result_img: MatchResultIcons.DEFEAT
            },
            {
                link: "https://www.sofascore.com/fognini-nadal/LOfsJig",
                date: "15/02/21",
                status: "FT",
                winnerFirst: false,
                winner: [ "Nadal R.", "6 6 6", "3"],
                loser: [ "Fognini F.", "3 4 2", "0"],
                result_img: MatchResultIcons.WIN
            },
            {
                link: "https://www.sofascore.com/norrie-nadal/LOfsKtN",
                date: "13/02/21",
                status: "FT",
                winnerFirst: false,
                winner: [ "Nadal R.", "7 6 7", "3"],
                loser: [ "Norrie C.", "5 2 5", "0"],
                result_img: MatchResultIcons.WIN
            },
            {
                link: "https://www.sofascore.com/nadal-mmoh/LOfsRDcb",
                date: "11/02/21",
                status: "FT",
                winnerFirst: false,
                winner: [ "Nadal R.", "6 6 6", "3"],
                loser: [ "Mmoh M.", "1 4 2", "0"],
                result_img: MatchResultIcons.WIN
            },
            {
                link: "https://www.sofascore.com/djere-nadal/LOfsGUN",
                date: "09/02/21",
                status: "FT",
                winnerFirst: false,
                winner: [ "Nadal R.", "6 6 6", "3"],
                loser: [ "Djere L.", "3 4 1", "0"],
                result_img: MatchResultIcons.WIN
            }
        ]
    },
    {
        header: {
            image: Tournaments.ATP_CUP.img,
            title: Tournaments.ATP_CUP.value
        },
        matches: [
            {
                link: "https://www.sofascore.com/nadal-tsitsipas/LOfsqXY",
                date: "05/02/21",
                status: "Cancelled",
                winnerFirst: true,
                winner: [ "Tsitsipas S." ],
                loser: [ "Nadal R." ],
                result_img: MatchResultIcons.CANCELLED
            },
            {
                link: "https://www.sofascore.com/de-minaur-nadal/LOfsOzFb",
                date: "02/02/21",
                status: "Cancelled",
                winnerFirst: true,
                winner: [ "de Minaur A." ],
                loser: [ "Nadal R." ],
                result_img: MatchResultIcons.CANCELLED
            }
        ]
    },
    {
        header: {
            image: Tournaments.ATP_FINALS.img,
            title: Tournaments.ATP_FINALS.value
        },
        matches: [
            {
                link: "https://www.sofascore.com/medvedev-nadal/LOfsevpb",
                date: "21/11/20",
                status: "FT",
                winnerFirst: true,
                winner: [ "Medvedev D.", "3 7<sup>7</sup> 6", "2"],
                loser: [ "Nadal R.", "6 6<sup>4</sup> 3", "1"],
                result_img: MatchResultIcons.DEFEAT
            },
            {
                link: "https://www.sofascore.com/nadal-tsitsipas/LOfsqXY",
                date: "19/11/20",
                status: "FT",
                winnerFirst: true,
                winner: [ "Nadal R.", "6 4 6", "2"],
                loser: [ "Tsitsipas S.", "4 6 2", "1"],
                result_img: MatchResultIcons.WIN
            },
            {
                link: "https://www.sofascore.com/thiem-nadal/LOfsYzr",
                date: "17/11/20",
                status: "FT",
                winnerFirst: false,
                winner: [ "Thiem D.", "7<sup>9</sup> 7<sup>7</sup>", "2"],
                loser: [ "Nadal R.", "6<sup>7</sup> 6<sup>4", "0"],
                result_img: MatchResultIcons.DEFEAT
            },
            {
                link: "https://www.sofascore.com/nadal-rublev/LOfsfKR",
                date: "15/11/20",
                status: "FT",
                winnerFirst: true,
                winner: [ "Nadal R.", "6 6", "2"],
                loser: [ "Rublev A.", "3 4", "0"],
                result_img: MatchResultIcons.WIN
            }
        ]
    },
    {
        header: {
            image: Tournaments.PARIS.img,
            title: Tournaments.PARIS.value
        },
        matches: [
            {
                link: "https://www.sofascore.com/zverev-nadal/LOfsnTx",
                date: "07/11/20",
                status: "FT",
                winnerFirst: false,
                winner: [ "Zverev A.", "6 7", "2" ],
                loser: [ "Nadal R.", "4 5", "0" ],
                result_img: MatchResultIcons.DEFEAT
            },
            {
                link: "https://www.sofascore.com/carreno-busta-nadal/LOfsaqq",
                date: "06/11/20",
                status: "FT",
                winnerFirst: true,
                winner: [ "Nadal R.", "4 7 6", "2" ],
                loser: [ "Carreño Busta P.", "6 5 1", "1" ],
                result_img: MatchResultIcons.WIN
            },
            {
                link: "https://www.sofascore.com/thompson-nadal/LOfsPdK",
                date: "05/11/20",
                status: "FT",
                winnerFirst: true,
                winner: [ "Nadal R.", "6 7<sup>7</sup>", "2" ],
                loser: [ "Thompson J.", "1 6<sup>3</sup>", "0" ],
                result_img: MatchResultIcons.WIN
            },
            {
                link: "https://www.sofascore.com/nadal-lopez/pOfsLOf",
                date: "04/11/20",
                status: "FT",
                winnerFirst: true,
                winner: [ "Nadal R.", "4 7<sup>7</sup> 6", "2" ],
                loser: [ "Rublev A.", "6 6<sup>5</sup> 4", "1" ],
                result_img: MatchResultIcons.WIN
            }
        ]
    },
    {
        header: {
            image: Tournaments.R_GARROS.img,
            title: Tournaments.R_GARROS.value
        },
        matches: [
            {
                link: "https://www.sofascore.com/djokovic-nadal/LOfsHXf",
                date: "11/10/20",
                status: "FT",
                winnerFirst: false,
                winner: [ "Nadal R.", "6 6 7", "3" ],
                loser: [ "Djokovic N.", "0 2 5", "0" ],
                result_img: MatchResultIcons.WIN
            },
            {
                link: "https://www.sofascore.com/schwartzman-nadal/LOfsZwu",
                date: "09/10/20",
                status: "FT",
                winnerFirst: false,
                winner: [ "Nadal R.", "6 5 1<sup>7</sup>", "3" ],
                loser: [ "Schwartzman D.", "4 7 6<sup>0</sup>", "0" ],
                result_img: MatchResultIcons.WIN
            },
            {
                link: "https://www.sofascore.com/sinner-nadal/LOfsvGHb",
                date: "06/10/20",
                status: "FT",
                winnerFirst: false,
                winner: [ "Nadal R.", "7<sup>7</sup> 6 6", "3" ],
                loser: [ "Sinner J.", "6<sup>4</sup> 4 1", "0" ],
                result_img: MatchResultIcons.WIN
            },
            {
                link: "https://www.sofascore.com/korda-nadal/LOfsPqDb",
                date: "04/10/20",
                status: "FT",
                winnerFirst: false,
                winner: [ "Nadal R.", "6 6 6", "3" ],
                loser: [ "Korda S.", "1 1 2", "0" ],
                result_img: MatchResultIcons.WIN
            },
            {
                link: "https://www.sofascore.com/travaglia-nadal/LOfsaBo",
                date: "02/10/20",
                status: "FT",
                winnerFirst: false,
                winner: [ "Nadal R.", "6 6 6", "3" ],
                loser: [ "Travaglia S.", "1 4 0", "0" ],
                result_img: MatchResultIcons.WIN
            }
        ]
    }
];

//Κλήση των συναρτήσεων που απαιτούνται για το αρχικό "γέμισμα" των HTML στοιχείων
fillStatsTableData(statsTableData.career.singlesServiceRecordData, 'first-stats-table');
fillStatsTableData(statsTableData.career.singlesReturnRecordData, 'second-stats-table');
fillMatchesTableData(matchesTableData, false, null);
fillTitlesTableData(titlesTableData, false, null);
generateAvailableFilterValuesFor(statsTableData.career.singlesServiceRecordData, 'statistics-filter-service-dropdown-items', 'statistics');
generateAvailableFilterValuesFor(statsTableData.career.singlesReturnRecordData, 'statistics-filter-return-dropdown-items', 'statistics');
generateAvailableFilterValuesFor(matchesTableData, 'matches-filter-dropdown-items', 'matches');
generateAvailableFilterValuesFor(titlesTableData, 'titles-filter-dropdown-items', 'titles');

//Γεμίζει το HTML table που έχει το δοσμένο tableId με τα δοσμένα δεδομένα (data)
function fillStatsTableData(data, tableId) {
    let table = document.getElementById(tableId);
    let tableTBody = table.getElementsByTagName('tbody')
    if(tableTBody.length != 0) {
        table.removeChild(tableTBody[0]);
    }

    let tbody = document.createElement('tbody');
    data.forEach( item => {
        let row = tbody.insertRow();
        let date = row.insertCell(0);
        date.innerHTML = item.name;
        let name = row.insertCell(1);
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

    tableData.forEach( item => {
        let tableContainer = document.createElement('div');
        tableContainer.classList.add('match-table');
        let header = document.createElement('div');
        header.classList.add('match-table-header');
        let img = document.createElement('img');
        img.src = item.header.image;
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
};

//Μια βοηθητική συνάρτηση που ελέγχει αν κάποιος απο τους επιλεγμένους αντιπάλους στα checkboxes υπάρχει στο δοσμένο match
function shouldMatchBeFiltered(match, checkboxes) {
    let filter = true;
    checkboxes.forEach( checkbox => {
        if(match.winner[0] == checkbox.value || match.loser[0] == checkbox.value) {
            filter =  false;
        }
    });

    return filter;
}

//Μια βοηθητική μέθοδος για τη δημιουργία κάποιων element στα match του match table
function fillDivContainer(container, match, dataIndex) {
    let containerP1 = document.createElement('p');
    let containerP2 = document.createElement('p');
    containerP1.innerHTML = match.winner[dataIndex];
    containerP2.innerHTML = match.loser[dataIndex];

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
function fillTitlesTableData(data, isForFiltering, checkBoxesData) {
    let table = document.getElementById('titles-table');
    if(table.children.length > 0) {
        table.innerHTML = "";
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
            
            img.src = title[2];
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

//Ένας event listener ο οποίος "ακούει" για αλλαγές της περιόδου στον πίνακα με τα στατιστικά
document.getElementById('stats-table-content-select').addEventListener('change', event => {
    let selectedValue = event.target.value;
    fillStatsTableData(statsTableData[selectedValue].singlesServiceRecordData, 'first-stats-table');
    fillStatsTableData(statsTableData[selectedValue].singlesReturnRecordData, 'second-stats-table');
    generateAvailableFilterValuesFor(statsTableData[selectedValue].singlesServiceRecordData, 'statistics-filter-service-dropdown-items', 'statistics');
    generateAvailableFilterValuesFor(statsTableData[selectedValue].singlesReturnRecordData, 'statistics-filter-return-dropdown-items', 'statistics');
});

//Ένας event listener ο οποίο "ακούει" για αλλαγές στον τρόπο ταξινόμησης του πίνακα με τους τίτλους
document.getElementById('tiles-table-sortby-select').addEventListener('change', event => {
    switch(event.target.value) {
        case "year-desc":
            titlesTableData.sort(titlesYearDescCompare);
            break;
        case "year-asc":
            titlesTableData.sort(titlesYearAscCompare);
            break;
        case "titles-desc":
            titlesTableData.sort(titlesCountDescCompare);
            break;
        case "titles-asc":
            titlesTableData.sort(titlesCountAscCompare);
            break;
    }
    fillTitlesTableData(titlesTableData);
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
        let liText = document.createTextNode(item[1]);
    
        li.appendChild(input);
        li.appendChild(liText);
        dropdownList.appendChild(li);
    });
};

//Μια βοηθητική μέθοδος που γεμίζει τη μεταβλητή filterValues με τους τίτλους των διαθέσιμων στατιστικών
function getFilterValuesForStatisticsTableData(tableData, filterValues) {
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

    filterValues.sort((string1, string2) => {
        let nameA = string1[1].toLowerCase().replace(/\s+/g, '');
        let nameB = string2[1].toLowerCase().replace(/\s+/g, '');

        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
            
        return 0; 
    });
};

//Μια βοηθητική μέθοδος που γεμίζει τη μεταβλητή filterValues με τους αντιπάλους στα διαθέσιμα ματς
function filterMatchesTableData(tableData, filterValues) {
    tableData.forEach( matchObject => {
        matchObject.matches.forEach( matchEntry => {
            if(!filterValues.some(item => (item[0] == matchEntry.winner[0] || item[0] == matchEntry.loser[0]))) {
                if(matchEntry.winner[0] == "Nadal R.") {
                    filterValues.push([matchEntry.loser[0], matchEntry.loser[0]]);
                } else {
                    filterValues.push([matchEntry.winner[0], matchEntry.winner[0]]);
                }
            }
        });
    });

    filterValues.sort((string1, string2) => {
        let nameA = string1[0].toLowerCase().replace(/\s+/g, '');
        let nameB = string2[0].toLowerCase().replace(/\s+/g, '');

        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
            
        return 0; 
    });
};

//Ένας event listener που "ακούει" για κλικ στο dropdown με τα φίλτρα στους τίτλους ώστε να εμφανίσει/αποκρύψει τις επιλογές
const statisticsCheckList = document.getElementById('statistics-filter-check-list');
const statisticsServiceCheckListItems = document.getElementById('statistics-filter-service-dropdown-items');
const statisticsReturnCheckListItems = document.getElementById('statistics-filter-return-dropdown-items');
statisticsCheckList.getElementsByClassName('dropdown-checklist-anchor')[0].addEventListener('click', function () {
    handleCheckListVisibility(statisticsServiceCheckListItems);
    handleCheckListVisibility(statisticsReturnCheckListItems);
});

//Ένας event listener που "ακούει" για κλικ στο dropdown με τα φίλτρα στα ματς ώστε να εμφανίσει/αποκρύψει τις επιλογές
const matchesCheckList = document.getElementById('matches-filter-check-list');
const matchesCheckListItems = document.getElementById('matches-filter-dropdown-items');
matchesCheckList.getElementsByClassName('dropdown-checklist-anchor')[0].addEventListener('click', function () {
    handleCheckListVisibility(matchesCheckListItems);
});

//Ένας event listener που "ακούει" για κλικ στο dropdown με τα φίλτρα στους τίτλους ώστε να εμφανίσει/αποκρύψει τις επιλογές
const titlesCheckList = document.getElementById('titles-filter-check-list');
const titlesCheckListItems = document.getElementById('titles-filter-dropdown-items');
titlesCheckList.getElementsByClassName('dropdown-checklist-anchor')[0].addEventListener('click', function () {
    handleCheckListVisibility(titlesCheckListItems);
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
    let recordData = isService ? statsTableData[statsSelectDropdown.value].singlesServiceRecordData : statsTableData[statsSelectDropdown.value].singlesReturnRecordData;
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

//Ένας event listener που "ακούει" για κλικ που γίνονται στα checkboxes που φιλτραρουν τους τίτλους
document.getElementById('matches-filter-dropdown-items').addEventListener('click', event => {
    let checkBoxes = document.getElementById('matches-filter-dropdown-items').querySelectorAll('input[type=checkbox]:checked');
    if(checkBoxes.length != 0) {
        let filteredTableData = matchesTableData.filter(matchObject => {
            let found = false;
            matchObject.matches.forEach( matchEntry => {
                checkBoxes.forEach( checkBox => {
                    if(checkBox.value == matchEntry.winner[0] || checkBox.value == matchEntry.loser[0]) {
                        found = true;
                    }
                });
            });

            return found;
        });

        fillMatchesTableData(filteredTableData, true, checkBoxes);
    } else {
        fillMatchesTableData(matchesTableData, false, null);
    }
});

//Ένας event listener που "ακούει" για κλικ που γίνονται στα checkboxes που φιλτραρουν τους τίτλους
document.getElementById('titles-filter-dropdown-items').addEventListener('click', event => {
    let checkBoxes = document.getElementById('titles-filter-dropdown-items').querySelectorAll('input[type=checkbox]:checked');
    if(checkBoxes.length != 0) {
        let filteredTableData = titlesTableData.filter(title => {
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
        fillTitlesTableData(titlesTableData, false, null);
    }
});

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
        .register("serviceWorker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    });
};