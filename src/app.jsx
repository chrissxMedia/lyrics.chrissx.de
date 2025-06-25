import React from "react";
import ReactDOMClient from "react-dom/client";
import AlbumList from "./AlbumList";
import Albums from "../albums.yaml";

function Root() {
    React.useEffect(() => {
        const id = window.location.hash;
        const el = id && document.getElementById(id.substring(1));
        if (el) el.scrollIntoView();
    }, [window.location.hash]);
    return <AlbumList albums={Albums.reverse()} />;
}

ReactDOMClient.createRoot(document.getElementById("root")).render(<Root />);
