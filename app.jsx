import React from "react";
import ReactDOMClient from "react-dom/client";
import DateTime from "dayjs";

import Albums from "./albums.yaml";

function lyrics(props) {
    return props.musixmatch && props.lyrics ? props.lyrics.replace(/\[.+\]/g, "").replace(/\n+/g, "\n").trim() : props.lyrics;
}

function Track(props) {
    const [copied, setCopied] = React.useState(false);
    return (
        <div className="track">
            <a className="track-title" href={"#" + props.isrc} id={props.isrc} onClick={() => {
                window.location.hash = "#" + props.isrc;
                navigator.clipboard.writeText(window.location);
                // TODO: notify the user somehow
            }}>{props.name} by {props.artists.join(", ")}</a>
            <span className="track-info">
                {props.lyrics ?
                    <button className="track-clipboard"
                        onClick={e => navigator.clipboard.writeText(lyrics(props)).then(x => setCopied(true))}>
                        {copied ? "Copied Lyrics" : "Copy Lyrics"}
                    </button> : undefined}
                Length: {DateTime.unix(props.length).format("mm:ss")}, ISRC: {props.isrc}</span>
            {props.hide || !props.lyrics ? undefined : <p className="lyrics">{lyrics(props)}</p>}
        </div>
    );
}

function matched(t, s) {
    const c = (x, y) => x === "" || (s.invert && !y) || (y && y.toLowerCase().includes(x.toLowerCase()));
    const b = c(s.isrc, t.isrc) && c(s.name, t.name) && c(s.lyrics, t.lyrics);
    return s.invert && (s.isrc || s.name || s.lyrics) ? !b : b;
}

function tracks(props) {
    return props.tracks.filter(t => matched(t, props.search));
}

function Album(props) {
    if (tracks(props).length === 0) return;
    return (
        <div className="album">
            <a className="album-title" href={"#" + props.upc} id={props.upc} onClick={() => {
                window.location.hash = "#" + props.upc;
                navigator.clipboard.writeText(window.location);
                // TODO: notify the user somehow
            }}>{props.name} by {props.artists.join(", ")}</a>
            <span className="album-info">Released {DateTime(props.release).format("YYYY-MM-DD")}, UPC: {props.upc}</span>
            {tracks(props).map(t => <Track {...props} {...t} key={t.isrc} />)}
        </div>
    );
}

function LyricList(props) {
    const [isrc, setIsrc] = React.useState("");
    const [name, setName] = React.useState("");
    const [lyrics, setLyrics] = React.useState("");
    const [invert, setInvert] = React.useState(false);
    const [musixmatch, setMusixmatch] = React.useState(false);
    const [hide, setHide] = React.useState(false);
    return (
        <div className="lyric-list">
            <input onChange={(e) => setIsrc(e.target.value)} placeholder="ISRC" />
            <input onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <br />
            <input onChange={(e) => setLyrics(e.target.value)} placeholder="Lyrics" />
            <br />
            <input onChange={(e) => setInvert(e.target.checked)} id="invert" type="checkbox" />
            <label htmlFor="invert">Invert</label>
            <br />
            <input onChange={(e) => setMusixmatch(e.target.checked)} id="musixmatch" type="checkbox" />
            <label htmlFor="musixmatch">Musixmatch</label>
            <br />
            <input onChange={(e) => setHide(e.target.checked)} id="hide" type="checkbox" />
            <label htmlFor="hide">Hide Lyrics</label>
            {props.albums.map(a => <Album {...a} search={{ isrc, name, lyrics, invert }} musixmatch={musixmatch} hide={hide} key={a.upc} />)}
        </div>
    );
}

function Root() {
    React.useEffect(() => {
        const id = window.location.hash;
        const el = id && document.getElementById(id.substring(1));
        if (el) el.scrollIntoView();
    }, [window.location.hash]);
    return <LyricList albums={Albums.reverse()} />;
}

ReactDOMClient.createRoot(document.getElementById("root")).render(<Root />);
