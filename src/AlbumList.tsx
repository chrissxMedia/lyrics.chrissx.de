import React from "react";
import Album from "./Album";
import { album } from "./types";

function AlbumList({ albums }: { albums: [album] }) {
    const [isrc, setIsrc] = React.useState("");
    const [name, setName] = React.useState("");
    const [lyrics, setLyrics] = React.useState("");
    const [invert, setInvert] = React.useState(false);
    const [musixmatch, setMusixmatch] = React.useState(false);
    const [hide, setHide] = React.useState(false);
    return (
        <div className="album-list">
            <input onChange={e => setIsrc(e.target.value)} placeholder="ISRC" />
            <input onChange={e => setName(e.target.value)} placeholder="Name" />
            <br />
            <input onChange={e => setLyrics(e.target.value)} placeholder="Lyrics" />
            <br />
            <input onChange={e => setInvert(e.target.checked)} id="invert" type="checkbox" />
            <label htmlFor="invert">Invert</label>
            <br />
            <input onChange={e => setMusixmatch(e.target.checked)} id="musixmatch" type="checkbox" />
            <label htmlFor="musixmatch">Musixmatch</label>
            <br />
            <input onChange={e => setHide(e.target.checked)} id="hide" type="checkbox" />
            <label htmlFor="hide">Hide Lyrics</label>
            {albums.map(a => <Album {...a} search={{ isrc, name, lyrics, invert }} musixmatch={musixmatch} hide={hide} key={a.upc} />)}
        </div>
    );
}

export default AlbumList;
