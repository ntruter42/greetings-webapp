document.querySelector('button[name = "reset"]').addEventListener('click', (event) => {
	if (!window.confirm("Are you sure you want to reset greeted users?")) {
		event.preventDefault();
	}
})