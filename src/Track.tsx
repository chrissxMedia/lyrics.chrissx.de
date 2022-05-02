import React from "react";
import DateTime from "dayjs";

function lyrics({ musixmatch, lyrics }) {
    return musixmatch && lyrics ? lyrics.replace(/\[.+\]/g, "").replace(/\n+/g, "\n").trim() : lyrics;
}

function Track(props) {
    const [copied, setCopied] = React.useState(false);
    return (
        <div className="track">
            <a className="track-title" href={"#" + props.isrc} id={props.isrc} onClick={() => {
                window.location.hash = "#" + props.isrc;
                navigator.clipboard.writeText(window.location.toString());
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

export default Track;
