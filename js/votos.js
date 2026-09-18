const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwF12bPe41urhj_e6cBTRfhLpcxaOR2zdhJ-HP26f1EU_6H6OW49T1Ms0hHdYUVKk3b/exec';
const voteForm = document.getElementById('vote-form');
const formMessage = document.getElementById('form-message');
const submitButton = voteForm.querySelector('button[type="submit"]');
const nameInput = document.getElementById('voter-name');
let voterNames = new Set();
let currentVotes = { M: 0, F: 0 };
let celebrationShown = false;
let finalRevealShown = false;

function normalizeName(name) {
	return name.trim().replace(/\s+/g, ' ').toLocaleLowerCase();
}

function isExistingName(name) {
	return voterNames.has(normalizeName(name));
}

function updateDuplicateState() {
	const name = nameInput.value;
	const duplicate = isExistingName(name);
	submitButton.disabled = duplicate;
	if (duplicate) {
		formMessage.textContent = 'Este nombre ya registró un voto.';
	} else if (formMessage.textContent === 'Este nombre ya registró un voto.') {
		formMessage.textContent = '';
	}
}

function renderResults(votes) {
	currentVotes = { M: Number(votes.M) || 0, F: Number(votes.F) || 0 };
	const total = currentVotes.M + currentVotes.F;
	const girlPercent = total ? Math.round((currentVotes.F / total) * 100) : 0;
	const boyPercent = total ? 100 - girlPercent : 0;

	document.getElementById('total-votes').textContent = `${total} ${total === 1 ? 'voto' : 'votos'}`;
	document.getElementById('girl-percent').textContent = `${girlPercent}%`;
	document.getElementById('boy-percent').textContent = `${boyPercent}%`;
	document.getElementById('girl-bar').style.width = `${girlPercent}%`;
	document.getElementById('boy-bar').style.width = `${boyPercent}%`;
}

function showFinalGirlReveal() {
	if (finalRevealShown) return;
	finalRevealShown = true;

	const predictionsSaidGirl = currentVotes.F > currentVotes.M;
	const overlay = document.createElement('div');
	overlay.className = 'final-girl-reveal';
	overlay.setAttribute('role', 'dialog');
	overlay.setAttribute('aria-label', 'Revelación final');
	overlay.innerHTML = `
		<div class="final-girl-card">
			<div class="final-girl-icon" aria-hidden="true">🎀</div>
			<h2>${predictionsSaidGirl ? '¡Las predicciones acertaron!' : '¡La gran sorpresa!'}</h2>
			<p>${predictionsSaidGirl ? 'La mayoría predijo niña.' : 'Las predicciones no lo esperaban...'}</p>
			<strong>¡GANÓ NIÑA! 💗</strong>
			<div class="pink-hearts" aria-hidden="true">♥ ♥ ♥ ♥ ♥</div>
		</div>
	`;

	if (!document.getElementById('final-girl-reveal-styles')) {
		const styles = document.createElement('style');
		styles.id = 'final-girl-reveal-styles';
		styles.textContent = `
			.final-girl-reveal {
				position: fixed;
				inset: 0;
				z-index: 9999;
				display: grid;
				place-items: center;
				padding: 22px;
				background: rgba(255, 105, 170, .97);
				opacity: 0;
				transform: scale(.7);
				transition: opacity .8s ease, transform .8s ease;
			}
			.final-girl-reveal.is-visible {
				opacity: 1;
				transform: scale(1);
				animation: final-girl-pulse 1.8s infinite alternate;
			}
			.final-girl-card {
				width: min(100%, 680px);
				padding: 55px 25px;
				text-align: center;
				color: #fff;
				border: 5px solid #fff;
				border-radius: 35px;
				background: linear-gradient(145deg, #ffafd0, #e9368c);
				box-shadow: 0 0 70px rgba(255, 255, 255, .9);
			}
			.final-girl-icon {
				font-size: 80px;
				animation: final-girl-bounce 1s infinite alternate;
			}
			.final-girl-card h2 {
				margin: 15px 0;
				font-size: clamp(1.8rem, 5vw, 3.5rem);
			}
			.final-girl-card p {
				font-size: 1.25rem;
			}
			.final-girl-card strong {
				display: block;
				margin-top: 25px;
				font-size: clamp(2.3rem, 8vw, 5rem);
				text-shadow: 3px 3px #a91e61;
			}
			.pink-hearts {
				margin-top: 25px;
				font-size: 2rem;
				letter-spacing: 12px;
				animation: final-heart-float 1.2s infinite alternate;
			}
			@keyframes final-girl-pulse {
				to { box-shadow: inset 0 0 120px rgba(255, 255, 255, .4); }
			}
			@keyframes final-girl-bounce {
				to { transform: translateY(-18px) rotate(8deg); }
			}
			@keyframes final-heart-float {
				to { transform: scale(1.2); }
			}
			@media (prefers-reduced-motion: reduce) {
				.final-girl-reveal,
				.final-girl-reveal.is-visible,
				.final-girl-icon,
				.pink-hearts { animation: none; transition: none; }
			}
		`;
		document.head.appendChild(styles);
	}

	document.body.appendChild(overlay);
	document.body.classList.add('reveal-open');
	requestAnimationFrame(() => overlay.classList.add('is-visible'));
}

function showCelebration() {
	if (celebrationShown) return;
	celebrationShown = true;
	const title = document.getElementById('winner-title');
	const subtitle = document.getElementById('winner-subtitle');
	const celebration = document.getElementById('celebration');
	const confetti = document.getElementById('confetti');
	const winner = currentVotes.M > currentVotes.F ? 'niño' : currentVotes.F > currentVotes.M ? 'niña' : 'empate';

	title.textContent = winner === 'empate' ? '¡Hay empate!' : `¡Ganó ${winner}!`;
	subtitle.textContent = winner === 'empate'
		? `Niño y niña tienen ${currentVotes.M} voto${currentVotes.M === 1 ? '' : 's'} cada uno.`
		: `La opción ${winner} obtuvo ${Math.max(currentVotes.M, currentVotes.F)} votos.`;

	for (let index = 0; index < 70; index += 1) {
		const piece = document.createElement('span');
		piece.className = 'confetti-piece';
		piece.style.left = `${Math.random() * 100}%`;
		piece.style.backgroundColor = ['#df9eaa', '#88b7c9', '#c79752', '#fff6dc'][index % 4];
		piece.style.setProperty('--drift', `${(Math.random() - 0.5) * 260}px`);
		piece.style.animationDelay = `${Math.random() * 900}ms`;
		confetti.appendChild(piece);
	}

	celebration.classList.add('is-visible');
	celebration.setAttribute('aria-hidden', 'false');
	document.body.classList.add('reveal-open');
	submitButton.disabled = true;
	nameInput.disabled = true;
	voteForm.querySelectorAll('input[name="prediction"]').forEach(input => { input.disabled = true; });
	window.setTimeout(showFinalGirlReveal, 5000);
}

async function loadResults() {
	if (!GOOGLE_SCRIPT_URL.startsWith('https://script.google.com/')) {
		formMessage.textContent = 'Falta configurar la conexión con Google Sheets.';
		return;
	}

	try {
		const response = await fetch(GOOGLE_SCRIPT_URL);
		if (!response.ok) throw new Error('No se pudieron cargar los resultados.');
		const result = await response.json();
		voterNames = new Set((result.names || []).map(normalizeName));
		renderResults(result.votes);
		updateDuplicateState();
		if (window.revealReached) showCelebration();
	} catch (error) {
		formMessage.textContent = 'No se pudieron cargar los resultados. Intenta de nuevo.';
	}
}

voteForm.addEventListener('submit', async (event) => {
	event.preventDefault();
	const formData = new FormData(voteForm);
	const voterName = String(formData.get('voterName') || '').trim();
	const selected = formData.get('prediction');

	if (!voterName || !selected) {
		formMessage.textContent = 'Escribe tu nombre y elige niño o niña para votar.';
		return;
	}

	if (isExistingName(voterName)) {
		updateDuplicateState();
		return;
	}

	if (!GOOGLE_SCRIPT_URL.startsWith('https://script.google.com/')) {
		formMessage.textContent = 'Falta configurar la conexión con Google Sheets.';
		return;
	}

	submitButton.disabled = true;
	submitButton.textContent = 'Guardando...';
	try {
		const response = await fetch(GOOGLE_SCRIPT_URL, {
			method: 'POST',
			body: JSON.stringify({ name: voterName, vote: selected === 'niño' ? 'M' : 'F' })
		});
		const result = await response.json();
		if (!response.ok || !result.success) {
			if (result.duplicate) {
				voterNames.add(normalizeName(voterName));
				updateDuplicateState();
				return;
			}
			throw new Error(result.error || 'No se pudo guardar el voto.');
		}
		formMessage.textContent = '¡Tu voto quedó guardado en la lista!';
		voterNames = new Set((result.names || []).map(normalizeName));
		voteForm.reset();
		renderResults(result.votes);
		if (window.revealReached) showCelebration();
	} catch (error) {
		formMessage.textContent = 'No se pudo guardar el voto. Intenta de nuevo.';
	} finally {
		submitButton.disabled = isExistingName(nameInput.value) || window.revealReached;
		submitButton.innerHTML = 'Guardar mi voto <span aria-hidden="true">→</span>';
	}
});

nameInput.addEventListener('input', updateDuplicateState);
document.addEventListener('reveal:now', showCelebration);
document.getElementById('close-celebration').addEventListener('click', () => {
	document.getElementById('celebration').classList.remove('is-visible');
	document.getElementById('celebration').setAttribute('aria-hidden', 'true');
	document.body.classList.remove('reveal-open');
});
loadResults();
