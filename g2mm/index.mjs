export function g2mm(raw, style = "musixmatch") {
  if (!raw) return raw;
  raw = raw
    .replace(/\r\n?/, "\n")
    .replace(/ +/g, " ")
    .replace(/\n /g, "\n")
    .replace(/ $/, "");
  if (style === "genius") {
    return raw.replace(/\n\n+/g, "\n\n").trim();
  } else if (style === "musixmatch") {
    // TODO: capitalization
    // TODO: remove punctuation at end of line but not ! and ?
    // TODO: consider processing line-by-line
    return raw
      .replace(/\[([pP][aA][rR][tT]|[vV][eE][rR][sS]).*\]/g, "#VERSE")
      .replace(/\[[bB][rR][iI][dD][gG][eE].*\]/g, "#BRIDGE")
      .replace(/\[[hH][oO][oO][kK].*\]/g, "#HOOK")
      .replace(/\[[cC][hH][oO][rR][uU][sS].*\]/g, "#CHORUS")
      .replace(/\[[iI][nN][tT][rR][oO].*\]/g, "#INTRO")
      .replace(/\[[oO][uU][tT][rR][oO].*\]/g, "#OUTRO")
      .replace(/\[.*\]\n/g, "")
      .replace(/\n\n+/g, "\n\n").trim();
  } else if (style === "plain") {
    return raw
      .replace(/\[.*\]\n/g, "")
      .replace(/\n\n+/g, "\n\n").trim();
  } else {
    throw "not implemented";
  }
}

export default g2mm;
