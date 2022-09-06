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

function checkFirstCheck() {
    const allChecks = document.querySelectorAll("input");
    const firstCheck = document.querySelector("input").value;
    let isChecked = false;
    for (let i = 0; i < allChecks.length; i++) {
        if (allChecks[i].checked) {
        isChecked = true;
        break;
        }
    }
    return { isChecked, firstCheck }
}

export { displayNicely, removeHyphens, MakeChecked, checkFirstCheck }