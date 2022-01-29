import 'dart:io';

import 'package:args/args.dart';
import 'package:yaml/yaml.dart';

class Track {
  final String name;
  final String? isrc;
  final List<String> artists;
  final Duration length;
  final String? _lyrics;
  final String album;

  Track(this.name, this.isrc, this.artists, this.length, this._lyrics,
      this.album);

  static Track fromYaml(YamlMap yaml, List? artists, String album) {
    final len = yaml['length'].split(':').map(int.parse).toList();
    if (len.length > 2) throw 'too complex length: ${yaml['length']}';
    return Track(
        yaml['name'],
        yaml['isrc'],
        List<String>.from(yaml['artists'] ?? artists),
        len.length == 1
            ? Duration(seconds: len[0])
            : Duration(minutes: len[0], seconds: len[1]),
        yaml['lyrics'],
        album);
  }

  String toString() => '("$name" by $artists, $isrc, $length, $album)';

  String lyrics(bool musixmatch) => _lyrics == null
      ? ''
      : !musixmatch
          ? _lyrics! // TODO: file bug at dart to remove the !
          : 'MUSIXMATCH NOT SUPPORTED RN'; // TODO
}

class Album {
  final String name;
  final List<String> artists;
  final int? upc;
  final DateTime? release;
  final List<Track> tracks;

  Album(this.name, this.artists, this.upc, this.release, this.tracks);

  static Album fromYaml(dynamic yaml) => Album(
      yaml['name'],
      List<String>.from(yaml['artists']),
      yaml['upc'],
      DateTime.parse(yaml['release']),
      yaml['tracks']
          .map<Track>((y) => Track.fromYaml(y, yaml['artists'], yaml['name']))
          .toList());

  String toString() =>
      '{"$name" by $artists, $upc, released on $release, $tracks}';
}

class TrackMatcher {
  String? isrc;
  List<String>? artists;
  String? album;

  bool matches(Track t) {
    bool b = true;
    if (isrc != null) b &= t.isrc == isrc;
    if (artists != null) b &= t.artists == artists;
    if (album != null) b &= t.album == album;
    return b;
  }

  Iterable<Track> findTracks(Iterable<Album> albums) => albums
      .map((a) => a.tracks.where((t) => matches(t)))
      .reduce((x, y) => [...x, ...y]);
}

void main(List<String> arguments) {
  final parser = ArgParser()
    ..addFlag('musixmatch', abbr: 'm', negatable: false)
    ..addOption('isrc', abbr: 'i')
    ..addOption('artists', abbr: 'a')
    ..addOption('album', abbr: 'A')
    ..addFlag('help', abbr: 'h', negatable: false)
    ..addFlag('list', abbr: 'l', negatable: false);
  final args = parser.parse(arguments);

  final albums = loadYaml(File('albums.yaml').readAsStringSync())
      .map<Album>(Album.fromYaml)
      .toList();

  final matcher = TrackMatcher();
  if (args.wasParsed('isrc')) matcher.isrc = args['isrc'];
  if (args.wasParsed('artists')) matcher.artists = args['artists'].split(',');
  if (args.wasParsed('album')) matcher.album = args['album'];

  if (args['help']) {
    print(parser.usage);
  } else if (args['list']) {
    matcher.findTracks(albums).forEach(print);
  } else {
    print(matcher.findTracks(albums).first.lyrics(args['musixmatch']));
  }
}
