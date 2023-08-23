let totalStations = document.querySelectorAll('.station').length;
let completedStations = 0;
let timer;
let minutes = parseInt(document.getElementById('setMinutes').value) || 5;
let seconds = 0;

let negativeMinutes = 0;
let negativeSeconds = 0;

function startTimer() {
    timer = setInterval(() => {
        if (minutes === 0 && seconds === 0) {
            if (negativeSeconds === 59) {
                negativeMinutes += 1;
                negativeSeconds = 0;
            } else {
                negativeSeconds += 1;
            }

            document.getElementById('negativeMinutes').textContent = "-" + String(negativeMinutes).padStart(2, '0');
            document.getElementById('negativeSeconds').textContent = String(negativeSeconds).padStart(2, '0');
        } else {
            if(seconds === 0) {
                minutes -= 1;
                seconds = 59;
            } else {
                seconds -= 1;
            }
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        }
    }, 1000);
}

function markAsDone(stationNumber) {
    let stationButton = document.querySelectorAll('.station')[stationNumber-1];
    if(!stationButton.classList.contains('completed')) {
        stationButton.classList.add('completed');
        completedStations += 1;
    }

    if(completedStations === totalStations) {
        clearInterval(timer);
    }
}

function resetTimer() {
    clearInterval(timer);

    let inputTime = parseInt(document.getElementById('setMinutes').value);
    if (isNaN(inputTime) || inputTime <= 0) {
        alert('Wprowadź prawidłową wartość czasu!');
        return;
    }
    minutes = inputTime;
    seconds = 0;
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    
    completedStations = 0;
    let stationButtons = document.querySelectorAll('.station');
    stationButtons.forEach(button => {
        button.classList.remove('completed');
    });
}

function updateCurrentTime() {
    let now = new Date();
    let hours = String(now.getHours()).padStart(2, '0');
    let minutes = String(now.getMinutes()).padStart(2, '0');
    let seconds = String(now.getSeconds()).padStart(2, '0');

    document.getElementById('currentTime').textContent = `${hours}:${minutes}:${seconds}`;
}

updateCurrentTime();  // Aktualizuj czas od razu po załadowaniu strony
setInterval(updateCurrentTime, 1000);  // Następnie aktualizuj co sekundę

function setTime() {
    let inputMinutes = parseInt(document.getElementById('setMinutes').value);
    if (!isNaN(inputMinutes) && inputMinutes > 0) {
        minutes = inputMinutes;
        seconds = 0;
        
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    } else {
        alert('Wprowadź poprawną ilość minut.');
    }
}
