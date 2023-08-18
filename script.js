let totalStations = document.querySelectorAll('.station').length;
let completedStations = 0;
let timer;
let minutes = 5;
let seconds = 0;

function startTimer() {
    timer = setInterval(() => {
        if(seconds === 0) {
            if(minutes === 0) {
                clearInterval(timer);
                return;
            } else {
                minutes -= 1;
                seconds = 59;
            }
        } else {
            seconds -= 1;
        }
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
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
    minutes = 5;
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

// Aktualizuj czas od razu po załadowaniu strony
updateCurrentTime();

// Następnie aktualizuj co sekundę
setInterval(updateCurrentTime, 1000);
function setTime() {
    let inputMinutes = parseInt(document.getElementById('setMinutes').value);

    // Sprawdzamy, czy wartość z inputa jest liczbą i czy jest większa od 0
    if (!isNaN(inputMinutes) && inputMinutes > 0) {
        // Zaktualizuj wartości `minutes` i `seconds`
        minutes = inputMinutes;
        seconds = 0;
        
        // Zaktualizuj wyświetlany czas
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    } else {
        alert('Wprowadź poprawną ilość minut.');
    }
}
