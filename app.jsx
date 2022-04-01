import React from "react";
import ReactDOMClient from "react-dom/client";
import DateTime from "dayjs";

import Albums from "./albums.yaml";

class Track extends React.Component {
    state = {
        copied: false,
    };
    lyrics() {
        return this.props.musixmatch && this.props.lyrics ? this.props.lyrics.replace(/\[.+\]/g, "").replace(/\n+/g, "\n").trim() : this.props.lyrics;
    }
    render() {
        return (
            <div className="track">
                <a className="track-title" href={"#" + this.props.isrc} id={this.props.isrc}>{this.props.name} by {this.props.artists.join(", ")}</a>
                <span className="track-info">Length: {DateTime.unix(this.props.length).format("mm:ss")}, ISRC: {this.props.isrc}</span>
                {this.props.lyrics ?
                    <button className="track-clipboard"
                        onClick={e => navigator.clipboard.writeText(this.lyrics()).then(x => this.setState({ copied: true }))}>
                        {this.state.copied ? "Copied Lyrics" : "Copy Lyrics"}
                    </button> : undefined}
                <p className="lyrics">{this.lyrics()}</p>
            </div>
        );
    }
}

class Album extends React.Component {
    matched(t, s) {
        const c = (x, y) => x === "" || (s.invert && !y) || (y && y.toLowerCase().includes(x.toLowerCase()));
        const b = c(s.isrc, t.isrc) && c(s.name, t.name) && c(s.lyrics, t.lyrics);
        return s.invert && (s.isrc || s.name || s.lyrics) ? !b : b;
    }
    tracks() {
        return this.props.tracks.filter(t => this.matched(t, this.props.search));
    }
    render() {
        if (this.tracks().length === 0) return;
        return (
            <div className="album">
                <a className="album-title" href={"#" + this.props.upc} id={this.props.upc}>{this.props.name} by {this.props.artists.join(", ")}</a>
                <span className="album-info">Released {DateTime(this.props.release).format("YYYY-MM-DD")}, UPC: {this.props.upc}</span>
                {this.tracks().map(t => <Track {...this.props} {...t} key={t.isrc} />)}
            </div>
        );
    }
}

class LyricList extends React.Component {
    state = {
        isrc: "",
        name: "",
        lyrics: "",
        invert: false,
        musixmatch: false,
    };
    render() {
        return (
            <div className="lyric-list">
                <input onChange={(e) => this.setState({ isrc: e.target.value })} placeholder="ISRC" />
                <input onChange={(e) => this.setState({ name: e.target.value })} placeholder="Name" />
                <br />
                <input onChange={(e) => this.setState({ lyrics: e.target.value })} placeholder="Lyrics" />
                <br />
                <input onChange={(e) => this.setState({ invert: e.target.checked })} type="checkbox" />
                <label>Invert</label>
                <br />
                <input onChange={(e) => this.setState({ musixmatch: e.target.checked })} type="checkbox" />
                <label>Musixmatch</label>
                {this.props.albums.map(a => <Album {...a} search={this.state} musixmatch={this.state.musixmatch} key={a.upc} />)}
            </div>
        );
    }
}

ReactDOMClient.createRoot(document.getElementById("root")).render(<LyricList albums={Albums.reverse()} />);
