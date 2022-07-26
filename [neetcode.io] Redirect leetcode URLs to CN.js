// ==UserScript==
// @name         Redirect leetcode URLs to CN
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       kriscris@github
// @match        https://neetcode.io/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neetcode.io
// @grant        none
// ==/UserScript==
const replaceURLs = () => {
    let links = document.querySelectorAll("a.table-text[href]");
    links.forEach(link => {
        let url = link.getAttribute("href");
        url = url.replace("leetcode.com", "leetcode.cn");
        link.setAttribute("href", url);
    });
  }

window.addEventListener('load', replaceURLs, false);
