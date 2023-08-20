document.querySelector('button[name = "reset"]').addEventListener('click', (event) => {
	if (!window.confirm("Are you sure you want to reset greeted users?")) {
		event.preventDefault();
	}
})

window.addEventListener('load', () => {
	setTimeout(() => {
		document.querySelector('.error-message').classList.add('fade-out');
	}, 4000);

	setTimeout(() => {
		document.querySelector('.error-message').classList.add('hidden');
	}, 4800);
})