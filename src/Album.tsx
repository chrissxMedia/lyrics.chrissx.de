import DateTime from "dayjs";
import Track from "./Track";
import { track, album } from "./types";

const contains = (a?: string, b?: string): boolean => a && b && a.toLowerCase().includes(b.toLowerCase());

function matched(t: track, search: string, invert: boolean): boolean {
    if (!search) return true;
    const c = (y?: string) => (invert && !y) || contains(y, search);
    const b = c(t.isrc) || c(t.name) || c(t.lyrics);
    return invert ? !b : b;
}

function Album(props: album & { search: string, invert: boolean, musixmatch: boolean, hide: boolean }) {
    const searched = (x?: string) => contains(x, props.search);
    const tracks = props.tracks.filter(t => matched(t, props.search, props.invert));
    const albumMatched = [...props.artists, props.name, props.release, props.upc.toString()].map(searched).reduce((a, b) => a || b);
    if (tracks.length === 0 && !albumMatched) return;
    return (
        <div className="album">
            <a className="album-title" href={"#" + props.upc} id={props.upc.toString()} onClick={() => {
                window.location.hash = "#" + props.upc;
                navigator.clipboard.writeText(window.location.toString());
                // TODO: notify the user somehow
            }}>{props.name} by {props.artists.join(", ")}</a>
            <span className="album-info">Released {DateTime(props.release).format("YYYY-MM-DD")}, UPC: {props.upc}</span>
            {tracks.map(t => <Track {...props} {...t} key={t.isrc} />)}
        </div>
    );
}

export default Album;
