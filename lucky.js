
// declare variable global
var gUserNameElement = document.getElementById("username");
var gFirstNameElement = document.getElementById("firstname");
var gLastNameElement = document.getElementById("lastname");
var gTableElement = document.getElementById("hisory-placeholder-table");
var gHistoryArea = document.getElementById('history-component');
var gObjectInput = {
    username: '',
    firstname: '',
    lastname: '',
    button: ''
};
var gButtonDiceHistory = document.getElementById('diceHistoryButton');
var gButtonVoucherHistory = document.getElementById('voucherHistoryButton');
var gButtonPresentHistory = document.getElementById('presentHistoryButton');
var gObjectNewDiceApiResponse = {};
var gObjectDiceHistoryApiResponse = {};
var gObjectVoucherHistoryApiResponse = {};
var gObjectPresentHistoryApiResponse = {};


// declare function change color when click
function changeColorButton(paramButtonClick) {
    switch (paramButtonClick) {
        case 'diceClick':
            gButtonDiceHistory.className = 'btn btn-green';
            gButtonVoucherHistory.className = 'btn btn-blue';
            gButtonPresentHistory.className = 'btn btn-blue';
            break;
        case 'voucherClick':
            gButtonDiceHistory.className = 'btn btn-blue';
            gButtonVoucherHistory.className = 'btn btn-green';
            gButtonPresentHistory.className = 'btn btn-blue';
            break;
        case 'presentClick':
            gButtonDiceHistory.className = 'btn btn-blue';
            gButtonVoucherHistory.className = 'btn btn-blue';
            gButtonPresentHistory.className = 'btn btn-green';
            break;
    }

}


//create function on Click button
function onClickButtonDice() {
    // console.log("IM button Dice");
    // console.log("I will read data below : ");
    // onLoadingPage(); //call function on Loading

    // if input data success i will call api
    if (validateData()) {
        readData();  // read data from action input
        callNewDiceAPI();  // call api to take new dice
    };
}

//function read data when customer write data
function readData() {
    gObjectInput.username = gUserNameElement.value.trim();
    gObjectInput.firstname = gFirstNameElement.value.trim();
    gObjectInput.lastname = gLastNameElement.value.trim();
    // console.log('gObjectInput: ', gObjectInput);  //test value of object
}

//create function onLoading Page
function onLoadingPage() {
    console.log('gUserNameElement: ', gUserNameElement.id + " || innerHTML ~  " + gUserNameElement.innerHTML);
    console.log('gFirstNameElement: ', gFirstNameElement.id + " || innerHTML ~  " + gFirstNameElement.innerHTML);
    console.log('gLastNameElement: ', gLastNameElement.id + " || innerHTML ~  " + gLastNameElement.innerHTML);
}

// create function validate input
function validateData() {
    var checkData = true;

    if (gUserNameElement.value.trim() === '') {
        checkData = false;
        console.assert(checkData, `user name error`);
        alert(`user name error`);
    }
    if (gFirstNameElement.value.trim() === '') {
        checkData = false;
        console.assert(checkData, `first name error`);
        alert(`first name error`);
    }
    if (gLastNameElement.value.trim() === '') {
        checkData = false;
        console.assert(checkData, `last name error`);
        alert(`last name error`);
    }

    return checkData;
}

// constant global
const vBASE_URL = "http://42.115.221.44:8080/devcamp-lucky-dice/";
const vUTF8_TEXT_APPLICATON_HEADER = "application/json;charset=UTF-8";
const gREQUEST_STATUS_OK = 200;
const gREQUEST_READY_STATUS_FINISH_AND_OK = 4;


//call rest api to new dice action
function callNewDiceAPI() {
    // console.log('gObjectInput: ', gObjectInput);  // test value of object
    var vXmlHttpDice = new XMLHttpRequest();
    vXmlHttpDice.open("POST", vBASE_URL + "dice", true)
    vXmlHttpDice.setRequestHeader("Content-Type", vUTF8_TEXT_APPLICATON_HEADER);
    vXmlHttpDice.send(JSON.stringify(gObjectInput));
    vXmlHttpDice.onreadystatechange = function () {
        if (this.readyState === gREQUEST_READY_STATUS_FINISH_AND_OK && this.status === gREQUEST_STATUS_OK) {
            // console.log(vXmlHttpDice.responseText);  //test response Text
            gObjectNewDiceApiResponse = JSON.parse(vXmlHttpDice.responseText);
            console.log('gObjectNewDiceApiResponse: ', gObjectNewDiceApiResponse);
            changeMessage();    //change image and message 
        }
    }
}

// creat function change image(3) and message(4) 
function changeMessage() {
    //declare image element and message
    var vImageElement = document.getElementById('diceRound');
    var vMessageElement = document.getElementById('result-text');
    var vVoucherElement = document.getElementById('voucher-result');
    var vPrizeImageElement = document.getElementById('prizeimage');

    //change image
    switch (gObjectNewDiceApiResponse.dice) {
        case 1:
            vImageElement.src = 'images/1.png';
            vMessageElement.innerHTML = 'Chuc Ban May Man Lan Sau';
            break;
        case 2:
            vImageElement.src = 'images/2.png';
            vMessageElement.innerHTML = 'Chuc Ban May Man Lan Sau';
            break;
        case 3:
            vImageElement.src = 'images/3.png';
            vMessageElement.innerHTML = 'Chuc Ban May Man Lan Sau';
            break;
        case 4:
            vImageElement.src = 'images/4.png';
            vMessageElement.innerHTML = 'Trung Thuong Roi';
            break;
        case 5:
            vImageElement.src = 'images/5.png';
            vMessageElement.innerHTML = 'Trung Thuong Roi';
            break;
        case 6:
            vImageElement.src = 'images/6.png';
            vMessageElement.innerHTML = 'Trung Thuong Roi';
            break;
    }

    //if customer receive voucher , i will show it here
    if (gObjectNewDiceApiResponse.voucher !== null) {
        vVoucherElement.innerHTML = `<p>Voucher</p><p>${gObjectNewDiceApiResponse.voucher.maVoucher}</p><p>${gObjectNewDiceApiResponse.voucher.phanTramGiamGia}%</p>`;
    }

    //change prize
    switch (gObjectNewDiceApiResponse.prize) {
        case "Mũ":
            vPrizeImageElement.src = 'images/hat.jpg';
            break;
        case "Xe máy":
            vPrizeImageElement.src = 'images/bike.jpg';
            break;
        case "Áo":
            vPrizeImageElement.src = 'images/shirt.jpg';
            break;
        case "Ô tô":
            vPrizeImageElement.src = 'images/car.jpg';
            break;
    }
}

//dice history button onclick
function onClickDiceHistory() {
    console.log(`Im button Dice History`);
    console.log(`I Will read data below`);
    // onLoadingPage(); //call function on click
    if (validateData()) {
        gObjectInput.button = 'diceClick';
        changeColorButton(gObjectInput.button); //change color of button        
        readData();   // get input user
        callDiceHistoryAPI();  // get object response
    };

}

// function call dice history api
function callDiceHistoryAPI() {
    var vXmlHttpDiceHistory = new XMLHttpRequest();
    vXmlHttpDiceHistory.open("GET", vBASE_URL + 'dice-history?username=' + gObjectInput.username, true);
    vXmlHttpDiceHistory.send();
    vXmlHttpDiceHistory.onreadystatechange = function () {
        if (this.readyState === gREQUEST_READY_STATUS_FINISH_AND_OK && this.status === gREQUEST_STATUS_OK) {
            // console.log(vXmlHttpDiceHistory.responseText);
            gObjectDiceHistoryApiResponse = JSON.parse(vXmlHttpDiceHistory.responseText);
            console.log('gObjectDiceHistoryApiResponse: ', gObjectDiceHistoryApiResponse);
            createTableDiceHistory();
        }
    }
}

const gEnd_Of_Table = -1; // value for end of table
// function create header for table history
function createTableDiceHistory() {
    var vTableDiceHistory = document.createElement('table');
    //create header
    var vHeaderRow = vTableDiceHistory.insertRow(gEnd_Of_Table);

    var vHeaderSTT = document.createElement('th');
    vHeaderSTT.innerHTML = 'STT';
    vHeaderRow.appendChild(vHeaderSTT);

    var vHeaderDice = document.createElement('th');
    vHeaderDice.innerHTML = 'DICE HISTORY';
    vHeaderRow.appendChild(vHeaderDice);

    //insert data to row

    var tableRowLength = gObjectDiceHistoryApiResponse.dices.length;
    for (var vI = 0; vI < gObjectDiceHistoryApiResponse.dices.length; vI++) {
        var vRow = vTableDiceHistory.insertRow(gEnd_Of_Table);
        var vCell1 = vRow.insertCell(0);
        var vCell2 = vRow.insertCell(1);
        vCell1.innerHTML = vI + 1;
        vCell2.innerHTML = gObjectDiceHistoryApiResponse.dices[vI];
    }


    //insert table to history area
    gHistoryArea.innerHTML = '';
    gHistoryArea.appendChild(vTableDiceHistory);

}

// function onclick 
function onClickVoucherHistory() {
    console.log(`IM ONCLICK VOUCHER HISTORY `);
    if (validateData()) {
        gObjectInput.button = 'voucherClick';
        changeColorButton(gObjectInput.button); //change color of button     
        readData();
        voucherHistoryAPI();
    };
}

//gọi mẫu lấy voucher history
function voucherHistoryAPI() {
    //base url
    const vBASE_URL = "http://42.115.221.44:8080/devcamp-lucky-dice";
    var vUserNameTest = gObjectInput.username;
    var vXmlHttpVoucherHistory = new XMLHttpRequest();
    vXmlHttpVoucherHistory.open("GET", vBASE_URL + "/voucher-history?username=" + vUserNameTest, true);
    vXmlHttpVoucherHistory.send();
    vXmlHttpVoucherHistory.onreadystatechange =
        function () {
            if (this.readyState == gREQUEST_READY_STATUS_FINISH_AND_OK && this.status == gREQUEST_STATUS_OK) {
                var bVoucherHistory = vXmlHttpVoucherHistory.responseText;
                // console.log(bVoucherHistory);
                gObjectVoucherHistoryApiResponse = JSON.parse(vXmlHttpVoucherHistory.responseText);
                console.log('gObjectVoucherHistoryApiResponse: ', gObjectVoucherHistoryApiResponse);
                createTableVoucherHistory();
            }
        }
    console.log('60s loading data...');
    confirm("Data Loading..! Please wait for 60s..");

}

// creat table voucher history
// function create header for table history
function createTableVoucherHistory() {

    var vTableVoucherHistory = document.createElement('table');
    //create header
    var vHeaderRow = vTableVoucherHistory.insertRow(gEnd_Of_Table);

    var vHeaderSTT = document.createElement('th');
    vHeaderSTT.innerHTML = 'STT';
    vHeaderRow.appendChild(vHeaderSTT);

    var vHeaderVoucherId = document.createElement('th');
    vHeaderVoucherId.innerHTML = 'VOUCHER ID';
    vHeaderRow.appendChild(vHeaderVoucherId);

    var vHeaderVoucherCode = document.createElement('th');
    vHeaderVoucherCode.innerHTML = 'VOUCHER CODE';
    vHeaderRow.appendChild(vHeaderVoucherCode);

    var vHeaderVoucherDiscount = document.createElement('th');
    vHeaderVoucherDiscount.innerHTML = 'VOUCHER DISCOUNT';
    vHeaderRow.appendChild(vHeaderVoucherDiscount);

    //insert data to row

    var tableRowLength = gObjectVoucherHistoryApiResponse.vouchers.length;
    for (var vI = 0; vI < tableRowLength; vI++) {
        var vRow = vTableVoucherHistory.insertRow(gEnd_Of_Table);
        var vCell1 = vRow.insertCell(0);
        var vCell2 = vRow.insertCell(1);
        var vCell3 = vRow.insertCell(2);
        var vCell4 = vRow.insertCell(3);
        vCell1.innerHTML = vI + 1;
        vCell2.innerHTML = gObjectVoucherHistoryApiResponse.vouchers[vI].id;
        vCell3.innerHTML = gObjectVoucherHistoryApiResponse.vouchers[vI].maVoucher;
        vCell4.innerHTML = gObjectVoucherHistoryApiResponse.vouchers[vI].phanTramGiamGia + '%';
    }


    //insert table to history area
    gHistoryArea.innerHTML = '';
    gHistoryArea.appendChild(vTableVoucherHistory);
    console.log('vTableVoucherHistory: ', gHistoryArea.innerHTML);

}




// function onclick present history
function onClickPresentHistory() {
    console.log(`IM ONCLICK PRESENT HISTORY `);
    console.log(`I READ DATA IN  `);
    onLoadingPage(); //call function on click


    if (validateData()) {
        gObjectInput.button = 'presentClick';
        changeColorButton(gObjectInput.button); //change color of button     
        readData();
        presentHistoryAPI();  //call api present history API

    };
}


//gọi mẫu lấy Present history
function presentHistoryAPI() {
    //base url
    //base url
    const vBASE_URL = "http://42.115.221.44:8080/devcamp-lucky-dice";
    var vUserNameTest = gObjectInput.username;
    // create a request
    var vXmlHtt0pPrizeHistory = new XMLHttpRequest();
    vXmlHtt0pPrizeHistory.open("GET", vBASE_URL + "/prize-history?username=" + vUserNameTest, true);
    vXmlHtt0pPrizeHistory.send();
    vXmlHtt0pPrizeHistory.onreadystatechange =
        function () {
            if (this.readyState == gREQUEST_READY_STATUS_FINISH_AND_OK && this.status == gREQUEST_STATUS_OK) {
                var bPrizeHistory = vXmlHtt0pPrizeHistory.responseText;
                // console.log(bPrizeHistory);  // print test
                gObjectPresentHistoryApiResponse = JSON.parse(vXmlHtt0pPrizeHistory.responseText);
                console.log('gObjectPresentHistoryApiResponse: ', gObjectPresentHistoryApiResponse);
                createTablePresentHistory();
            }
        }
}

// creat table voucher history
// function create header for table history
function createTablePresentHistory() {

    var vTablePresentHistory = document.createElement('table');
    //create header
    var vHeaderRow = vTablePresentHistory.insertRow(gEnd_Of_Table);

    var vHeaderSTT = document.createElement('th');
    vHeaderSTT.innerHTML = 'STT';
    vHeaderRow.appendChild(vHeaderSTT);

    var vHeaderPresent = document.createElement('th');
    vHeaderPresent.innerHTML = 'Present';
    vHeaderRow.appendChild(vHeaderPresent);


    // //insert data to row

    var tableRowLength = gObjectPresentHistoryApiResponse.prizes.length;
    for (var vI = 0; vI < tableRowLength; vI++) {
        var vRow = vTablePresentHistory.insertRow(gEnd_Of_Table);
        var vCell1 = vRow.insertCell(0);
        var vCell2 = vRow.insertCell(1);

        vCell1.innerHTML = vI + 1;
        vCell2.innerHTML = gObjectPresentHistoryApiResponse.prizes[vI];

    }


    //insert table to history area
    gHistoryArea.innerHTML = '';
    gHistoryArea.appendChild(vTablePresentHistory);
    console.log('vTablePresentHistory: ', gHistoryArea.innerHTML);

}

