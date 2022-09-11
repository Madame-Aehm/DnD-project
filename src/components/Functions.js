
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

function checkFirstCheck() {
  const allChecks = document.querySelectorAll("input[type='radio']");
  const firstCheck = document.querySelector("input[type='radio']");
  let isChecked = false;
  for (let i = 0; i < allChecks.length; i++) {
    if (allChecks[i].checked) {
      isChecked = true;
      break;
    }
  }
  if (!isChecked && firstCheck) {
    firstCheck.checked = true;
    // useSubFetch(firstCheck.value);
  }
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

export { displayNicely, removeHyphens, checkFirstCheck, emailValidation, passwordValidation, emailToName }