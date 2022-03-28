import 'dart:io';

import 'package:args/args.dart';
import 'package:dart_clipboard/dart_clipboard.dart';
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

  @override
  String toString() => '("$name" by $artists, $isrc, $length, $album)';

  String lyrics(bool musixmatch) => _lyrics == null
      ? ''
      : !musixmatch
          ? _lyrics!.trim() // TODO: file bug at dart to remove the !
          : _lyrics!
              .replaceAll(RegExp('\\[.+\\]'), '')
              .replaceAll(RegExp('\n+'), '\n')
              .trim(); // TODO: think a lot about how to musixmatch
  // TODO: trim [,.!?] at end of line and split if > 70 chars
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

  @override
  String toString() =>
      '{"$name" by $artists, $upc, released on $release, $tracks}';
}

class TrackMatcher {
  String? isrc;
  List<String>? artists;
  String? album;

  bool matches(Track t) =>
      (isrc == null || t.isrc == isrc) &&
      (artists == null || t.artists == artists) &&
      (album == null || t.album == album);

  Iterable<Track> findTracks(Iterable<Album> albums) =>
      albums.map((a) => a.tracks.where(matches)).reduce((x, y) => [...x, ...y]);
}

void main(List<String> arguments) {
  final parser = ArgParser()
    // TODO: change this to a --genius flag
    ..addFlag('musixmatch', abbr: 'm', negatable: false)
    ..addOption('isrc', abbr: 'i')
    ..addOption('artists', abbr: 'a')
    ..addOption('album', abbr: 'A')
    ..addFlag('help', abbr: 'h', negatable: false)
    ..addFlag('list', abbr: 'l', negatable: false)
    ..addFlag('copy', abbr: 'c');
  final args = parser.parse(arguments);

  final albums = loadYaml(File('albums.yaml').readAsStringSync())
      .map<Album>(Album.fromYaml)
      .toList();

  final matcher = TrackMatcher();
  if (args.wasParsed('isrc')) matcher.isrc = args['isrc'];
  if (args.wasParsed('artists')) matcher.artists = args['artists'].split(',');
  if (args.wasParsed('album')) matcher.album = args['album'];

  final out = args['copy'] ? Clipboard.setContents : print;
  if (args['help']) {
    out(parser.usage);
  } else if (args['list']) {
    matcher.findTracks(albums).forEach(out);
  } else {
    out(matcher.findTracks(albums).first.lyrics(args['musixmatch']));
  }
}
