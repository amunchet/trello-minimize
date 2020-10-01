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

// Put the names of lists to be minimzed on startup here!
// Also, will minimize any lists that start with a lowercase letter by default
document.minimized_lists = ["This week", "Butler", "Historical"];

var script = document.createElement('script');
script.type = "text/javascript";
script.innerHTML = `
function handleMinimize(item){

var item_name = item.parent().find("h2.list-header-name-assist").html();
for (var i = 0; i<document.minimized_lists.length; i++){
         if(document.minimized_lists[i] === item_name){
         document.minimized_lists.splice(i,1);
}
}


if(item.hasClass("minimizer")){
item.parentsUntil(".list-wrapper").children(".list-cards").show();
//item.parentsUntil(".list-wrapper").children("button.minimizer").hide();
item.removeClass("minimizer");

}else{
item.parentsUntil(".list-wrapper").children(".list-cards").hide();
item.addClass("minimizer");
document.minimized_lists.push(item_name);


}
}
`;
document.getElementsByTagName('head')[0].appendChild(script);




function do_minimize(){
        console.log("In do_minimize");
        $("<button class='minimizer' onclick='javascript:handleMinimize($(this));'>Minimize</button>").insertAfter("a.js-open-card-composer");
        $(".list-header-name").each(function(){
            for(var i = 0; i<document.minimized_lists.length; i++){
                var first_letter = "" + $(this).attr("aria-label")[0]
                if($(this).attr("aria-label") == document.minimized_lists[i] || first_letter  == first_letter.toLowerCase() ){

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
        setInterval(function(){

            if(!$("button.minimizer").length){
                do_minimize();
            }

        },100);
        //do_minimize();
    });

    $(window).on('hashchange', function(e){
        console.log("Changed!");
        do_minimize();
    });




})();
