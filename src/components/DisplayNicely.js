function displayNicely(string) {
    let noHyphens = string.replace("-", " ");
    noHyphens = noHyphens.replace("-", " ");
    let final = "";
    for (let i = 0; i < noHyphens.length; i++) {
        if (i === 0 || noHyphens.charAt(i - 1) === " ") {
            final += noHyphens.charAt(i).toUpperCase();
        } else {
            final += noHyphens.charAt(i);
        }
    } return final;
}

function removeHyphens(string) {
    let noHyphens = string.replace("-", "");
    return noHyphens;
}

function MakeChecked() {
    const checks = document.querySelector("input");
      checks.checked = true;
  }

export { displayNicely, removeHyphens, MakeChecked }