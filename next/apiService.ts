
const BASE_URL = process.env.API_BASE_URL!

export const getMovies = async () => {
    const url = BASE_URL + '/api/movies'
    const result = await fetch(url)

    handleErrorResponse(result, url);

    console.log(result.status)

    return await result.json();

}
export const getMovieById = async (id: string) => {

    const url = BASE_URL + `/api/movies/${id}`;
    const result = await fetch(url)

    handleErrorResponse(result, url);

    console.log(result.status)

    return await result.json();
}

function handleErrorResponse(result: Response, endpoint: string) {
    if (!result.ok) {
        throw Error(`Something went wrong when fetching data from: ${endpoint}. StatusCode: ` + result.status);
    }
}
