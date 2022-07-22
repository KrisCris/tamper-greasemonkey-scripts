// ==UserScript==
// @name         干掉新版b站评论区的搜索 (放大镜/蓝字) 功能
// @version      1.0
// @description  干掉新版b站评论区的评论搜索 (放大镜/蓝字) .
// @author       DuckBurnIncense, modified by KrisCris
// @match        *://www.bilibili.com/video/*
// @icon         https://www.bilibili.com/favicon.ico
// @grant        none
// @homepage     //duckburnincense.ml/
// @supportURL   https://www.bilibili.com/video/BV1SS4y1E7xB
// @license      MIT
// @run-at       document-end
// ==/UserScript==

// credit to DuckBurnIncense@bilibili
const removeHashTag = () => {
    const reg = /^(?:<a.*?>)(.*)(?:<\/a>)$/gim;
    // 啊b天天改class名来屏蔽我脚本, 只好改成黑名单模式了
    const searchWordQueries = [
        'a.jump-url-link.underline-word',
        'a.underline-link.comment-jump-url',
        'a.jump-link.search-word',
    ];
    const searchIconQueries = [
        'i.jump-url-prefix.search-word',
        'i.underline.jump-img',
        'i.icon.search-word',
    ];
    searchWordQueries.forEach(query => {
        let searchWords = document.querySelectorAll(query);
        searchWords.forEach(item => {
            item.outerHTML = item.outerHTML.replace(reg, '$1');
        });
    });
    searchIconQueries.forEach(query => {
        let searchIcons = document.querySelectorAll(query);
        searchIcons.forEach(item => {
            item.outerHTML = '';
        });
    });
}

// credit to stackoverflow answers
const addXMLRequestCallback = (callback) =>{
    var oldSend, i;
    if( XMLHttpRequest.callbacks ) {
        // we've already overridden send() so just add the callback
        XMLHttpRequest.callbacks.push( callback );
    } else {
        // create a callback queue
        XMLHttpRequest.callbacks = [callback];
        // store the native send()
        oldSend = XMLHttpRequest.prototype.send;
        // override the native send()
        XMLHttpRequest.prototype.send = function(){
            // process the callback queue
            // the xhr instance is passed into each callback but seems pretty useless
            // you can't tell what its destination is or call abort() without an error
            // so only really good for logging that a request has happened
            // I could be wrong, I hope so...
            // EDIT: I suppose you could override the onreadystatechange handler though
            for( i = 0; i < XMLHttpRequest.callbacks.length; i++ ) {
                XMLHttpRequest.callbacks[i]( this );
            }
            // call the native send()
            oldSend.apply(this, arguments);
        }
    }
}

addXMLRequestCallback( function( xhr ) {
    xhr.addEventListener("load", function(){
        if ( xhr.readyState == 4 && xhr.status == 200 ) {
            // console.log( xhr.responseURL );
            if ( xhr.responseURL.includes("api.bilibili.com/x/v2/reply/") ) {
                console.log(xhr);
                removeHashTag();
            }
        }
    });
});
