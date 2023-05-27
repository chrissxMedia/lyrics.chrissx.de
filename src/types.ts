export type track = {
    name: string,
    isrc: string, // TODO: nullable
    length: number,
    lyrics?: string,
    artists?: [string],
};

export type album = {
    name: string,
    upc: number, // TODO: nullable
    artists: [string],
    release: string,
    cover: string, // TODO: nullable
    tracks: [track],
};
