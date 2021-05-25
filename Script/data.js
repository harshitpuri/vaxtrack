const DATA_URL = "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/country_data/";
const MASTER_DATA_URL = "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.csv";
var allData = [];
let lastDataAvaible = [];
let secondlastData = [];


async function loadVariables() {
    allData = await GetAllData();
    lastDataAvaible = await GetLastData();
}

async function GetAllData() {
    // Get all data for OWID master CSV
    const { data } = await axios.get(MASTER_DATA_URL);
    return data.split("\n");
}

async function GetCountryData(country_name) {
    // Get data by country
    return allData.filter(word => word.split(',')[0] == country_name.toString().replaceAll("%20", " "));
}


async function GetWorldLastData() {
    //Get the last world data
    var query = allData.filter(word => word.split(',')[0] == "World");
    return query[query.length - 1].split(',');
}

function GetCountriesLastData() {
    //delete "non countries" from lastDataAvaible
    return lastDataAvaible.filter(word => word.split(',')[0] != "World"
        && word.split(',')[0] != "Europe"
        && word.split(',')[0] != "Asia"
        && word.split(',')[0] != "North America"
        && word.split(',')[0] != "Africa"
        && word.split(',')[0] != "South America"
        && word.split(',')[0] != "Oceania"
        && word.split(',')[0] != "High income"
        && word.split(',')[0] != "Upper middle income"
        && word.split(',')[0] != "Lower middle income"
        && word.split(',')[0] != "Low income"
        && word.split(',')[0] != "European Union");
}


async function GetLastData() {
    // Get all the last available data for each country & continents
    var alldata = [];
    var lastadata = [];
    const { data } = await axios.get(MASTER_DATA_URL);
    let lines = data.split('\n');
    for (let i = 1; i < lines.length; i++) {
        alldata.push(lines[i].toString().split(','));
    }
    for (let i = 0; i < alldata.length - 1; i++) {
        if (alldata[i][1] != alldata[i + 1][1]) {
            lastadata.push(alldata[i].toString());
        }
    }
    return lastadata;
}


function GetContinentsData() {
    //Get the data for each continent
    var continents = [];

    continents.push(lastDataAvaible.filter(word => word.split(',')[0] == "Europe").toString());
    continents.push(lastDataAvaible.filter(word => word.split(',')[0] == "Asia").toString());
    continents.push(lastDataAvaible.filter(word => word.split(',')[0] == "North America").toString());
    continents.push(lastDataAvaible.filter(word => word.split(',')[0] == "Africa").toString());
    continents.push(lastDataAvaible.filter(word => word.split(',')[0] == "South America").toString());
    continents.push(lastDataAvaible.filter(word => word.split(',')[0] == "Oceania").toString());
    return continents;
}

function formatNumberWithCommas(number) {
    // Just read the name of the function
    return parseInt(number).toLocaleString();
}

function formatDifferenceWithCommas(number) {
    return '+' + parseInt(number.substring(1)).toLocaleString();
}