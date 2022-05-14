export function genius2musixmatch(raw) {
  if (!raw) return;
  // TODO: capitalization
  // TODO: remove punctuation at end of line but not ! and ?
  return raw
    .replace(/\[([pP][aA][rR][tT]|[vV][eE][rR][sS]).*\]/g, "#VERSE")
    .replace(/\[[bB][rR][iI][dD][gG][eE].*\]/g, "#BRIDGE")
    .replace(/\[[hH][oO][oO][kK].*\]/g, "#HOOK")
    .replace(/\[[cC][hH][oO][rR][uU][sS].*\]/g, "#CHORUS")
    .replace(/\[[iI][nN][tT][rR][oO].*\]/g, "#INTRO")
    .replace(/\[[oO][uU][tT][rR][oO].*\]/g, "#OUTRO")
    .replace(/\[.*\]\n/g, "")
    .replace(/\n\n+/g, "\n\n").trim();
}

export default genius2musixmatch;
