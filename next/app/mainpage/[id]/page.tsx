import { getMovieById } from "@/apiService";



export default async function Id({ params }: { params: { id: string } }) {

    const { id } = params;
    const movie = await getMovieById(id);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <p>Movie: {JSON.stringify(movie, null, 2)}</p>
            </div>
        </main>
    )
}