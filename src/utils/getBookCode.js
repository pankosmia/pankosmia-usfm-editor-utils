export function getBookCode(usfm) {
  const localBookCodeLine = usfm.split("\n").find((l) => l.startsWith("\\id"));

  if (!localBookCodeLine) {
    return {
      ok: false,
      error: "NO_USFM_ID_FOUND",
    };
  }

  const localBookCode = localBookCodeLine.split(" ")[1];

  if (!localBookCode || localBookCode.length !== 3) {
    return {
      ok: false,
      error: "BAD_USFM_ID_LINE",
    };
  }

  return {
    ok: true,
    value: localBookCode,
  };
}
