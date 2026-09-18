const revealDate = new Date(2026, 8, 17, 21, 34, 0);
window.revealDate = revealDate;
window.revealReached = false;

const countdownElements = {
	days: document.getElementById('days'),
	hours: document.getElementById('hours'),
	minutes: document.getElementById('minutes'),
	seconds: document.getElementById('seconds')
};
let countdownTimer;

function updateCountdown() {
	const remaining = Math.max(0, revealDate.getTime() - Date.now());
	const totalSeconds = Math.floor(remaining / 1000);
	const days = Math.floor(totalSeconds / 86400);
	const hours = Math.floor((totalSeconds % 86400) / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	countdownElements.days.textContent = String(days).padStart(2, '0');
	countdownElements.hours.textContent = String(hours).padStart(2, '0');
	countdownElements.minutes.textContent = String(minutes).padStart(2, '0');
	countdownElements.seconds.textContent = String(seconds).padStart(2, '0');

	if (remaining === 0) {
		window.revealReached = true;
		document.querySelector('.countdown-label').textContent = '¡Llegó el momento!';
		document.querySelector('.event-date').textContent = 'La gran revelación';
		document.dispatchEvent(new CustomEvent('reveal:now'));
		clearInterval(countdownTimer);
	}
}

updateCountdown();
countdownTimer = setInterval(updateCountdown, 1000);
