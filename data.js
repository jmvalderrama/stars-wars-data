const baseUrl = 'https://swapi.dev/api';

const getFilms = async () => {
    try {
        const response = await fetch(`${baseUrl}/films/`, { mode: 'no-cors' });
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}

getFilms();