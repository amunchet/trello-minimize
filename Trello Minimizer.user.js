// ==UserScript==
// @name         Trello Minimzer
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Adds button to minimize trello lists
// @author       Chester Enright
// @match        https://trello.com/*
// @grant        none
// @require http://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==
$.noConflict();

var script = document.createElement('script');
script.type = "text/javascript";
script.innerHTML = `
function handleMinimize(item){

if(item.hasClass("minimizer")){
item.parentsUntil(".list-wrapper").children(".list-cards").show();
//item.parentsUntil(".list-wrapper").children("button.minimizer").hide();
item.removeClass("minimizer");
}else{
item.parentsUntil(".list-wrapper").children(".list-cards").hide();
item.addClass("minimizer");
}
}
`;
document.getElementsByTagName('head')[0].appendChild(script);


// Put the names of lists to be minimzed on startup here!
var minimized_lists = ["2019 Goals", "Kilns", "This week"];

function do_minimize(){
        console.log("In do_minimize");
        $("<button class='minimizer' onclick='javascript:handleMinimize($(this));'>Minimize</button>").insertAfter("a.js-open-card-composer");
        $(".list-header-name").each(function(){
            for(var i = 0; i<minimized_lists.length; i++){
                if($(this).attr("aria-label") == minimized_lists[i]){

                    var list_cards = $(this).parentsUntil(".list-wrapper");
                    //list_cards.addClass("chester_minimized");
                    //list_cards.children(".list-header").append("<button class='minimizer' onclick='javascript:handleMinimize($(this));'>Minimize</button>");
                    list_cards.children(".list-cards").hide();
                    //console.log(list_cards.html());
                }
            }
        });
}
(function special_minimize() {

    'use strict';



    $(window).on("load",function(){
        do_minimize();
    });

    $(window).on('hashchange', function(e){
        console.log("Changed!");
        do_minimize();
    });


})();
