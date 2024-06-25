document.getElementById('betForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const playerName = document.getElementById('playerName').value;
    const betAmount = document.getElementById('betAmount').value;
    const selectedCar = document.getElementById('car').value;

    localStorage.setItem('playerName', playerName);
    localStorage.setItem('betAmount', betAmount);
    localStorage.setItem('selectedCar', selectedCar);

    document.getElementById('registration').style.display = 'none';
    document.getElementById('race').style.display = 'block';
});

document.getElementById('startRace').addEventListener('click', function() {
    const cars = document.querySelectorAll('.car');
    let raceOver = false;

    function moveCar(car) {
        const distance = Math.random() * 10;
        const currentLeft = parseFloat(car.style.left || 0);
        car.style.left = currentLeft + distance + '%';

        if (currentLeft + distance >= 90 && !raceOver) {
            raceOver = true;
            const winnerCar = car.id;
            const selectedCar = localStorage.getItem('selectedCar');
            const playerName = localStorage.getItem('playerName');
            const betAmount = localStorage.getItem('betAmount');

            let resultMessage = `O carro vencedor é ${winnerCar}! `;
            if (selectedCar === winnerCar) {
                resultMessage += `${playerName}, você ganhou ${betAmount * 2}!`;
            } else {
                resultMessage += `${playerName}, você perdeu a aposta.`;
            }

            document.getElementById('result').textContent = resultMessage;
        }
    }

    const raceInterval = setInterval(() => {
        cars.forEach(car => moveCar(car));
        if (raceOver) clearInterval(raceInterval);
    }, 500);
});
