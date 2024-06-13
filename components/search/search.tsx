'use client'

import { useParams, useRouter } from "next/navigation"
import { useState } from "react";
import { Icons } from "../icons/icons";
import { Input } from "../ui/input";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Search() {

    const router = useRouter();

    const pathParams = useParams<{slug?: string}>();

    const [query, setQuery] = useState(pathParams.slug || '');

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
                            onClick={() => router.push('/szukaj')}
                        />
                    </div>
                ) : ''
            }
            <Input
                placeholder="Co dzisiaj oglądamy?"
                value={decodeURI(query)}
                onChange={e => setQuery(e.target.value)}
            />
            <div className="mt-7 flex flex-col justify-center gap-5 text-center lg:flex-row lg:justify-end">
                <Link
                    href={`/szukaj/${query}`}
                    className="lg:mx-auto lg:translate-x-1/2"
                >
                    <Button className="w-full lg:w-[200px]">Szukaj</Button>
                </Link>
                <Button className="w-full lg:w-[200px]" onClick={() => {
                    router.push('/szukaj');
                    setQuery('');
                }}>
                    Resetuj filtry
                </Button>
            </div>
        </div>
    )
}
