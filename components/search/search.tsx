'use client'

import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react";
import { Icons } from "../icons/icons";
import { Input } from "../ui/input";
import Link from "next/link";
import { Button } from "../ui/button";
import { TMediaTypes } from "@/types/types";
import TMDB from "@/types/tmdb-types";

type TProps = {
    movieGenres: TMDB.TGenres,
    tvGenres: TMDB.TGenres,
    countries: TMDB.TCountry[]
}

export default function Search({movieGenres, tvGenres, countries}: TProps) {

    const router = useRouter();

    const pathParams = useParams<{slug?: string}>();

    const searchParamsReadonly = useSearchParams();

    const [filters, setFilters] = useState({
        type: (searchParamsReadonly.get('type') as TMediaTypes) || 'movie',
        query: pathParams.slug || '',
        genreId: searchParamsReadonly.get('genreId'),
        year: searchParamsReadonly.get('year'),
        country: searchParamsReadonly.get('country'),
    });

    const currentGenres = filters.type === 'movie' ? movieGenres : tvGenres;

    const searchParams = new URLSearchParams();

    searchParams.set('type', filters.type);
    searchParams.set('genreId', filters.genreId || '');
    searchParams.set('year', filters.year || '');
    searchParams.set('country', filters.country || '');

    const removeQuery = () => {
        setFilters({
            ...filters,
            query: ''
        });
        const clearedLink = `/szukaj?${searchParams.toString()}`;
        router.push(clearedLink);
    }
    
    const resetFilters = () => {
        router.push('/szukaj');

        setFilters({
            type: 'movie',
            query: '',
            genreId: '',
            year: '',
            country: '',
        })
    }

    return (
        <div>
            {
                pathParams.slug ? (
                    <div className="mb-7 gap-2 text-xl text-silver xl:flex">
                        Wyniki wyszukiwania:
                        <div>
                            <strong className="text-white">{decodeURI(pathParams.slug)}</strong>
                        </div>
                        <Icons.x
                            className="ml-2 inline-block cursor-pointer text-primary"
                            onClick={removeQuery}
                        />
                    </div>
                ) : ''
            }
            <Input
                placeholder="Co dzisiaj oglądamy?"
                value={decodeURI(filters.query)}
                onChange={e => setFilters({
                    ...filters,
                    query: e.target.value
                })}
            />
            <div className="mt-7 flex flex-col justify-center gap-5 text-center lg:flex-row lg:justify-end">
                <Link
                    href={`/szukaj/${filters.query}?${searchParams.toString()}`}
                    className="lg:mx-auto lg:translate-x-1/2"
                >
                    <Button className="w-full lg:w-[200px]">Szukaj</Button>
                </Link>
                <Button className="w-full lg:w-[200px]" onClick={resetFilters}>
                    Resetuj filtry
                </Button>
            </div>
        </div>
    )
}
