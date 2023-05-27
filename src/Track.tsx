import React from "react";
import DateTime from "dayjs";
import genius2musixmatch from "g2mm";
import { track } from "./types";

function Track(props: track & { hide, musixmatch }) {
    const [copied, setCopied] = React.useState(false);
    const displayedLyrics = props.lyrics && props.musixmatch ? genius2musixmatch(props.lyrics) : props.lyrics;
    return (
        <div className="track">
            <a className="track-title" href={"#" + props.isrc} id={props.isrc} onClick={() => {
                window.location.hash = "#" + props.isrc;
                navigator.clipboard.writeText(window.location.toString());
                // TODO: notify the user somehow
            }}>{props.name} by {props.artists?.join(", ")}</a>
            <span className="track-info">
                {displayedLyrics ?
                    <button className="track-clipboard"
                        onClick={e => navigator.clipboard.writeText(displayedLyrics).then(x => setCopied(true))}>
                        {copied ? "Copied Lyrics" : "Copy Lyrics"}
                    </button> : undefined}
                Length: {DateTime.unix(props.length).format("mm:ss")}, ISRC: {props.isrc}</span>
            {props.hide || !displayedLyrics ? undefined : <p className="lyrics">{displayedLyrics}</p>}
        </div>
    );
}

export default Track;
