document.getElementById('search-button').addEventListener('click', fetchAnime);
document.getElementById('clear-button').addEventListener('click', clearData);
document.getElementById('api1').addEventListener('click', fetchRandomUser);
document.getElementById('api2').addEventListener('click', fetchCatFact);

async function fetchCatFact() {
	const container = document.getElementById('data-container2');
	renderLoadingState(container);
	try {
		const response = await fetch('https://catfact.ninja/fact');
		if (!response.ok) {
			throw new Error('Algo no está funcionando');
		}
		const data = await response.json();
		renderCatFactData(data, container);
	} catch (error) {
		renderErrorState(container, error);
	}
}

async function fetchRandomUser() {
	const container = document.getElementById('data-container1');
	renderLoadingState(container);
	try {
		const response = await fetch('https://randomuser.me/api/');
		if (!response.ok) {
			throw new Error('Algo no está funcionando');
		}
		const data = await response.json();
		renderRandomUserData(data, container);
	} catch (error) {
		renderErrorState(container, error);
	}
}

async function fetchAnime() {
	const container = document.getElementById('data-container3');
	renderLoadingState(container);

	const limit = document.getElementById('limit').value;
	const search = document.getElementById('search').value;
	const type = document.getElementById('type').value;

	let url = 'https://api.jikan.moe/v4/anime?';
	if (limit) url += `limit=${limit}`;
	if (search) url += `&q=${search}`;
	if (type) url += `&type=${type}`;

	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error('Algo no está funcionando');
		}
		const data = await response.json();
		renderAnimeData(data, container);
	} catch (error) {
		renderErrorState(container, error);
	}
}

function clearData() {
	document.getElementById('data-container3').innerHTML = '';
	document.getElementById('limit').value = '';
	document.getElementById('search').value = '';
	document.getElementById('type').value = '';
}

function renderErrorState(container, error) {
	container.innerHTML = ''; // Clear previous data
	container.innerHTML = '<p>Algo no está funcionando</p>';
	console.error('Error:', error);
}

function renderLoadingState(container) {
	container.innerHTML = ''; // Clear previous data
	container.innerHTML = '<p>Loading...</p>';
	console.log('Loading...');
}

function renderCatFactData(data, container) {
	container.innerHTML = ''; // Clear previous data
	const div = document.createElement('div');
	div.className = 'card';
	div.innerHTML = `<p>${data.fact}</p>`;
	container.appendChild(div);
}

function renderRandomUserData(data, container) {
	container.innerHTML = ''; // Clear previous data
	const user = data.results[0];
	const div = document.createElement('div');
	div.className = 'card';
	div.innerHTML = `
        <h2>${user.name.first} ${user.name.last}</h2>
        <img src="${user.picture.large}" alt="User Picture">
        <p>${user.email}</p>
    `;
	container.appendChild(div);
}

function renderAnimeData(data, container) {
	container.innerHTML = ''; // Clear previous data
	data.data.forEach((anime) => {
		const div = document.createElement('div');
		div.className = 'card';
		div.innerHTML = `
            <h2>${anime.title}</h2>
            <img src="${anime.images.jpg.image_url}" alt="Anime Image">
            <p>${anime.synopsis}</p>
        `;
		container.appendChild(div);
	});
}
