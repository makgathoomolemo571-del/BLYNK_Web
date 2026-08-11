export const copyToClipboard = async (text) => {

  try {

    await navigator.clipboard.writeText(text);

    return true;

  } catch (err) {

    console.error("Clipboard error:", err);

    return false;

  }

};