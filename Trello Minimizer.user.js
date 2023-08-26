// ==UserScript==
// @name         Trello Hide Lists
// @namespace    https://github.com/shesek/trello-hide-lists
// @version      0.1
// @description  Trello Hist Lists
// @author       FooBarWidget (https://github.com/shesek/trello-hide-lists/issues/1#issuecomment-199693936) and Chester Enright
// @match        https://trello.com/b/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

(function () {
    function start() {
        // Adding CSS fixes to correct new UI update
        var style = document.createElement("style")
        style.innerHTML = `
        body :is(.list-card,.card-composer){
            border-radius: 4px !important;
            margin-bottom: 4px !important;
        }
        body .list-header{
            padding-top: 0.5rem !important;
            padding-bottom: 0.5rem !important;
        }
        body .list{
            border-radius: 4px !important;
        }
        .board-header-rewrite~.board-canvas #board, body #board{
            margin-top: 8px !important;
        }
        .board-canvas{
            margin-top: unset !important;
        }
        `
        document.head.appendChild(style);
        
        var closeList = function (list) {
            list.querySelector('.list-cards').style.display = 'none';
        };

        var openList = function (list) {
            list.querySelector('.list-cards').style.display = 'block';
        };

        var lists = document.getElementById('board').querySelectorAll('div.js-list');

        var minimized_list = ["Butler", "Historical"]

        for (var i = 0; i < lists.length; i++) {
            (function () {
                var list    = lists[i];
                var close   = document.createElement('button');

                var list_name = list.querySelector("div.js-list-content div.list-header h2").innerHTML;

                // Handle minimization of lower case first letters


                if (list_name && (list_name[0] == list_name[0].toLowerCase() || minimized_list.indexOf(list_name.trim()) != -1 )){
                    closeList(list)
                    close.innerHTML             = 'Show';
                    close.setAttribute('class', 'open icon-sm dark-hover');

                }else {
                    close.innerHTML = 'Minimize';
                    close.setAttribute('class', 'close');
                    openList(list);
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
                list.querySelector("a.js-open-card-composer").after(close);

                close.addEventListener('click', function (e) {
                    e.preventDefault();

                    if (close.getAttribute('class').match('close')) {
                        closeList(list);
                        close.setAttribute('class', 'open icon-sm dark-hover');
                        close.innerHTML = 'Show';
                    }
                    else {
                        openList(list);
                        close.setAttribute('class', 'close');
                        close.innerHTML = 'Minimize';
                    }
                });
            })();
        }
    }

    function checkReady() {
        if (document.getElementById('board')) {
            start();
        } else {
            setTimeout(checkReady, 100);
        }
    }

    setTimeout(checkReady, 100);
})();
