import React from "react";
import DateTime from "dayjs";
import Track from "./Track";
import { track, album, search } from "./types";

function matched(t: track, s: search): boolean {
    const c = (x, y) => x === "" || (s.invert && !y) || (y && y.toLowerCase().includes(x.toLowerCase()));
    const b = c(s.isrc, t.isrc) && c(s.name, t.name) && c(s.lyrics, t.lyrics);
    return s.invert && (s.isrc || s.name || s.lyrics) ? !b : b;
}

function tracks(p: { tracks: [track], search: search }) {
    return p.tracks.filter(t => matched(t, p.search));
}

function Album(props: album & { search: search, musixmatch: boolean, hide: boolean }) {
    if (tracks(props).length === 0) return;
    return (
        <div className="album">
            <a className="album-title" href={"#" + props.upc} id={props.upc.toString()} onClick={() => {
                window.location.hash = "#" + props.upc;
                navigator.clipboard.writeText(window.location.toString());
                // TODO: notify the user somehow
            }}>{props.name} by {props.artists.join(", ")}</a>
            <span className="album-info">Released {DateTime(props.release).format("YYYY-MM-DD")}, UPC: {props.upc}</span>
            {tracks(props).map(t => <Track {...props} {...t} key={t.isrc} />)}
        </div>
    );
}

export default Album;
