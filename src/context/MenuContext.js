import React, { createContext } from 'react'

export const MenuContext = createContext();

export const MenuContextProvider = (props) => {
  const body = document.querySelector("body");
  const menuCheckbox = document.querySelector("input[type='checkbox']");
  menuCheckbox && 
    body.addEventListener("click", () => {
      menuCheckbox.checked = false;
  });
  return (
    <MenuContextProvider value ={{body, menuCheckbox}}>
      {props.children}
    </MenuContextProvider>
  )
}

