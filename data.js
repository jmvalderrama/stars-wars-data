const baseUrl = 'https://swapi.dev/api';
const message = document.getElementById('message');

const runAPI = async () => {
    message.textContent = 'Loading data. Please wait...'
    const promises = [];
    try {
        const films = await fetch(`${baseUrl}/films/`).then(response => response.json());
        if (films.detail) message.textContent = films.detail;
        films.results.forEach(film => {
            let newPromise = {
                'name': film.title,
                'planets': getDetails(film.planets),
                'people': getDetails(film.characters),
                'starships': getDetails(film.starships)
            };
            promises.push(newPromise)
        })
        let data = promises.map(async (film) => {
            return {
                'name': film.name,
                'planets':  await film.planets,
                'people':  await film.people,
                'starships':  await film.starships
            };
        });
        resolveData(data)
    } catch (error) {
        console.log(error)
    }
}

const getDetails = async data => {
    try {
        let requests = data.map(url => fetch(url));
        return await Promise.all(requests).then(responses => Promise.all(responses.map(r => r.json())));
    } catch (error) {
        console.log(error)
    }
}

const getOne = async data => {
    try {
        const res = await fetch(data).then(response => response.json());
        return res.name;
    } catch (error) {
        console.log(error)
    }
}

const resolveData = async data => {
    try {
        let films = await Promise.all(data);
        films.forEach(film => {
            film.people = [...mapCharacter(film.people)];
            film.planets = [...mapPlanets(film.planets)];
            film.starships = {...mapStarShips(film.starships)};
        });
        console.log(films)
        message.textContent = 'Request Finished. Open your console to see the results.'
    } catch (error) {
        console.log(error)
    }
}

const mapCharacter = characters => {
    let newCharacters = characters.map(item => {
        let { name, height, homeworld, hair_color, skin_color, eye_color, species } = item;
        return { name, height, homeworld, hair_color, skin_color, eye_color, species };
    });
    return newCharacters;
}

const mapPlanets = planets => {
    let newPlanets = planets.map(item => {
        let { name, terrain, gravity, diameter, population } = item;
        return { name, terrain, gravity, diameter, population };
    });
    return newPlanets;
}

const mapStarShips = starships => {
    let newStarShips = starships.map(item => item.length = {...item, length: parseInt(item.length)}).sort((a, b) => b.length - a.length );
    let { name, model, manufacturer, passengers } = newStarShips[0];
    return { name, model, manufacturer, passengers };
}