const wheel = document.getElementById("wheelImage");
const spinButton = document.getElementById("spinButton");
const stopButton = document.getElementById("stopButton");
const historyButton = document.getElementById("historyButton");
const resultText = document.getElementById("result");
const historyList = document.getElementById("historyList");

let spinning = false;
let rotation = 0;
let spinSpeed = 10;
let spinInterval;
let spinHistory = [];

const segments = [
    { label: "Voucher USD 100", start: 0, end: 45, probability: 0.00 },
    { label: "Voucher USD 50", start: 45, end: 90, probability: 0.05 },
    { label: "Voucher USD 30", start: 90, end: 135, probability: 0.05 },
    { label: "Voucher USD 20", start: 135, end: 180, probability: 0.10 },
    { label: "Voucher USD 10", start: 180, end: 225, probability: 0.10 },
    { label: "Voucher USD 5", start: 225, end: 270, probability: 0.10 },
    { label: "DGB Tote Bag", start: 270, end: 315, probability: 0.50 },
    { label: "Thank You", start: 315, end: 360, probability: 0.10 }
];

function getRandomSegment() {
    let rand = Math.random();
    let cumulative = 0;
    for (let seg of segments) {
        cumulative += seg.probability;
        if (rand < cumulative) {
            return seg;
        }
    }
    return segments[segments.length - 1];
}

function startSpinning() {
    if (spinning) return; // Prevent multiple clicks

    spinning = true;
    spinButton.disabled = true; // Disable spin button

    spinInterval = setInterval(() => {
        rotation += 10;
        wheel.style.transform = `rotate(${rotation}deg)`;
    }, 50);
}

function stopWheel() {
    if (!spinning) return;
    spinning = false;
    clearInterval(spinInterval);

    let selectedSegment = getRandomSegment();
    let finalRotation = ((selectedSegment.start + selectedSegment.end) / 2) + (360 * 3);

    wheel.style.transition = "transform 3s ease-out";
    wheel.style.transform = `rotate(${finalRotation}deg)`;

    setTimeout(() => {
        let timestamp = new Date().toLocaleString();
        spinHistory.push({ time: timestamp, prize: selectedSegment.label });
        alert(`You won: ${selectedSegment.label}!`);
        spinButton.disabled = false; // Re-enable spin button after result
    }, 3000);
}

function showHistory() {
    historyList.innerHTML = ""; // Clear previous records
    if (spinHistory.length === 0) {
        historyList.innerHTML = "<li>No history available</li>";
    } else {
        spinHistory.forEach((record) => {
            let li = document.createElement("li");
            li.textContent = `${record.time} - ${record.prize}`;
            historyList.appendChild(li);
        });
    }
    document.getElementById("historyModal").style.display = "block";
}

function closeHistory() {
    document.getElementById("historyModal").style.display = "none";
}

spinButton.addEventListener("click", startSpinning);
stopButton.addEventListener("click", stopWheel);
historyButton.addEventListener("click", showHistory);
document.getElementById("closeHistory").addEventListener("click", closeHistory);

