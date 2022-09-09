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
  const allChecks = document.querySelectorAll("input[type='radio']");
  const firstCheckbox = document.querySelector("input[type='radio']");
  const value = firstCheckbox.value;
  let isChecked = false;
  for (let i = 0; i < allChecks.length; i++) {
      if (allChecks[i].checked) {
      isChecked = true;
      break;
      }
  }
  return { isChecked, value }
}

function emailValidation(emailInput) {
    if (emailInput.value.includes("@")) {
      return true;
    } else {
      alert("Invalid email, please try again");
      return false;
    }
  }

  function passwordValidation(passwordInput) {
    if (passwordInput.value.length >= 6) {
        return true;
    } else {
        alert("Password must be at least 6 characters")
        return false;
    }
  }

  function emailToName(string) {
    const atPosition = string.search("@");
    return string.slice(0, atPosition);
  }

export { displayNicely, removeHyphens, MakeChecked, checkFirstCheck, emailValidation, passwordValidation, emailToName }