import React, { useState, useRef, useCallback } from "react";
import usePokeSearch from "./usePokeSearch";
import { SyncLoader } from "react-spinners";

function App() {

  const [offset, setOffset] = useState(0);

  const {
    pokemon,
    hasMore,
    loading,
    error
  } = usePokeSearch(offset)

  const observer = useRef();
  const lastPokeElemRef = useCallback(node => {
    if(loading) return;

    if(observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && hasMore) {
        setOffset(prevOffSet => prevOffSet + 50)
      }
    })

    if (node) observer.current.observe(node);
  }, [loading, hasMore])


  return (
    <>
      {pokemon.map((p, i) => {
        if (pokemon.length === i + 1) {
          return <div ref={lastPokeElemRef} key={i}> {p} </div>
        }
        return <div key={i}>{p} </div>
      })}
      <SyncLoader color={"black"} loading={loading} />
      <div>{error && 'Error'}</div>
    </>

  );
}

export default App;
