'use client';

import NavBar from "@/components/nav";
import Billboard from "@/components/billboard";
import MovieList from "@/components/movie_list";
import {api} from "@/lib/helpers";
import {home} from "@/lib/routes";
import {useEffect, useState} from "react";
import {MovieInterface} from "@/types"
import {HTTP_OK} from "@/lib/http_codes";

export default function Home() {
    const [movies=[], setMovies] = useState<MovieInterface[]|undefined>(undefined)
    useEffect(() => {
        api(home).then((resp) => {
            if (resp.status !== HTTP_OK) {
                console.log("doh")
            }

            setMovies(resp.data)
        })
    }, []);

    return (
        <>
            <NavBar/>
            <Billboard/>
            <MovieList data={movies} title="Most Popular For You" />
        </>
    )
}
