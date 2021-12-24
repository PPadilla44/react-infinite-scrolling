import axios from 'axios'
import { useEffect, useState } from 'react'

const usePokeSearch = (offset) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [pokemon, setPokemon] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(false);
        let cancel;
        const fetchData = async () => {
            const results = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${offset}`,{
                cancelToken: new axios.CancelToken(c => cancel = c)
            })
            const { data } = results;
            setPokemon(prevPoke => {
                return [...prevPoke, ...data.results.map(p => p.name)]
            })
            setHasMore(data.results.length > 0)
            setLoading(false)
        }

        try {
            fetchData()
        } catch (err) {
            if (axios.isCancel(err)) return
            setError(true)
        }
        return () => cancel()
    }, [offset])

    return { loading, error, pokemon, hasMore }
};

export default usePokeSearch;
