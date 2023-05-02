import React from "react";
import { bind } from "mousetrap";
import Album from "./Album";
import { album } from "./types";

function AlbumList({ albums }: { albums: [album] }) {
    const [search, setSearch] = React.useState("");
    const [invert, setInvert] = React.useState(false);
    const [musixmatch, setMusixmatch] = React.useState(false);
    const [hide, setHide] = React.useState(false);
    const searchBox = React.useRef<HTMLInputElement>(null);
    React.useEffect(() => {
        bind(["command+f", "ctrl+f", "/", "s"], e => {
            e.preventDefault();
            searchBox.current?.focus();
        });
    }, []);
    return (
        <div className="album-list">
            <input ref={searchBox} onChange={e => setSearch(e.target.value)} type="search" placeholder="Search" />
            <br />
            <input onChange={e => setInvert(e.target.checked)} id="invert" type="checkbox" />
            <label htmlFor="invert">Invert</label>
            <br />
            <input onChange={e => setMusixmatch(e.target.checked)} id="musixmatch" type="checkbox" />
            <label htmlFor="musixmatch">Musixmatch</label>
            <br />
            <input onChange={e => setHide(e.target.checked)} id="hide" type="checkbox" />
            <label htmlFor="hide">Hide Lyrics</label>
            {albums.map(a => <Album {...a} {...{ search, invert, musixmatch, hide }} key={a.upc} />)}
        </div>
    );
}

export default AlbumList;
