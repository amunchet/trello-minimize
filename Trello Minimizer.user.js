// ==UserScript==
// @name         Trello Hide Lists
// @namespace    https://github.com/shesek/trello-hide-lists
// @version      0.3
// @description  Trello Hist Lists
// @author       FooBarWidget (https://github.com/shesek/trello-hide-lists/issues/1#issuecomment-199693936) and Chester Enright
// @match        https://trello.com/b/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

(function () {
    function start() {
        
        var closeList = function (list) {
            list.classList.add("hidden-content")
        };

        var openList = function (list) {
            list.classList.remove('hidden-content')
        };

        var lists = document.body.querySelectorAll('[data-testid="list"]');

        var minimized_list = ["Butler", "Historical"]

        for (var i = 0; i < lists.length; i++) {
            (function () {
                var list    = lists[i];
                var close   = document.createElement('button');

                var list_name = list.querySelector("h2[data-testid='list-name']").innerHTML;

                // Handle minimization of lower case first letters


                if (list_name && (list_name[0] == list_name[0].toLowerCase() || minimized_list.indexOf(list_name.trim()) != -1 )){
                    try{
                        closeList(list)
                        close.innerHTML             = 'Show';
                        close.setAttribute('class', 'open icon-sm dark-hover');
                    }catch(e){
                        console.log(e)
                    }

                }else {
                    close.innerHTML = 'Minimize';
                    close.setAttribute('class', 'close');
                    try{
                        openList(list);
                    }catch(e){
                        console.log(e)
                    }
                }

                close.setAttribute('href', '#');

                close.style.textDecoration  = 'none';
                //close.style.position        = 'absolute';
                //close.style.left            = '1px';
                //close.style.top             = '-5px';
                close.style.minWidth        = "5rem";
                close.style.border          = "1px solid #bfbfbe";
                close.style.paddingTop       = "0.25rem";
                close.style.marginTop       = "0.25rem";
                close.style.height          = "2rem";
                close.style.fontFamily      =  "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif";
                close.style.fontSize        = "10pt";

                //list.querySelector('.list-header').appendChild(close);
                list.querySelector("button[data-testid='list-add-card-button']").after(close);

                close.addEventListener('click', function (e) {
                    e.preventDefault();

                    if (close.getAttribute('class').match('close')) {
                        try{
                            closeList(list);
                        }catch(e){
                            console.log(e)
                        }
                        close.setAttribute('class', 'open icon-sm dark-hover');
                        close.innerHTML = 'Show';
                    }
                    else {
                        try{
                            openList(list);
                        }catch(e){
                            console.log(e)
                        }
                        close.setAttribute('class', 'close');
                        close.innerHTML = 'Minimize';
                    }
                });
            })();
        }
    }
    // Adding CSS fixes to correct new UI update
    // NOTE: You must use display:none for the spacing.  You cannot use visibility: hidden.
    var style = document.createElement("style")
    style.innerHTML = `
        body [data-testid="list-card"] {
            padding-bottom: 6px;
        }
        body [data-testid="list-card"] div{
            border-radius: 6px !important;
        }
        body [data-testid="list"] {
            border-radius: 6px !important;
        }

        .hidden-content [data-testid='list-cards'] {
            display: none !important;
        }
        `
    document.head.appendChild(style);

    addEventListener("load", (event) => {
        console.log("Loaded...")
        start()
    });
    addEventListener("scroll", (event) => {
        console.log("Scrolling....")
        start()
    });
})();
