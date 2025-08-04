// ==UserScript==
// @name         Trello Hide Lists
// @namespace    https://github.com/shesek/trello-hide-lists
// @version      0.5.3
// @description  Trello Hide Lists with dynamic updates
// @author       Chester Enright
// @match        https://trello.com/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

(function () {
    // Function to hide a list
    function closeList(list) {
        list.classList.add('hidden-content');
        const parent = list.parentElement;
        if (parent) {
            parent.style.height = 'unset !important';
        }
    }

    // Function to show a list
    function openList(list) {
        list.classList.remove('hidden-content');
        const parent = list.parentElement;
        if (parent) {
            parent.style.height = '100%';
        }
    }

    // Main function to initialize and apply hiding logic
    function start() {
        const lists = document.body.querySelectorAll('[data-testid="list"]');
        const minimizedListNames = ["Butler", "Historical"];

        lists.forEach((list) => {
            const listNameElement = list.querySelector("h2[data-testid='list-name']");
            if (!listNameElement) return;

            const listName = listNameElement.textContent.trim();
            let closeButton = list.querySelector('.toggle-button');

            // Avoid adding duplicate buttons
            if (!closeButton) {
                closeButton = document.createElement('button');
                closeButton.classList.add('toggle-button');

                // Determine if the list should be minimized
                if (listName[0] === listName[0].toLowerCase() || minimizedListNames.includes(listName)) {
                    closeList(list);
                    closeButton.textContent = 'Show';
                    closeButton.classList.add('open', 'icon-sm', 'dark-hover');
                } else {
                    openList(list);
                    closeButton.textContent = 'Minimize';
                    closeButton.classList.add('close');
                }

                // Style the button
                closeButton.style.cssText = `
                    text-decoration: none;
                    min-width: 5rem;
                    border: 1px solid #bfbfbe;
                    padding-top: 0.25rem;
                    margin-top: 0.25rem;
                    height: 2rem;
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
                    font-size: 10pt;
                `;

                // Add the button after the 'Add a card' button
                const addCardButton = list.querySelector("button[data-testid='list-add-card-button']");
                if (addCardButton) {
                    addCardButton.after(closeButton);
                }

                // Add event listener for toggling visibility
                closeButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (closeButton.classList.contains('close')) {
                        closeList(list);
                        closeButton.classList.remove('close');
                        closeButton.classList.add('open', 'icon-sm', 'dark-hover');
                        closeButton.textContent = 'Show';
                    } else {
                        openList(list);
                        closeButton.classList.remove('open', 'icon-sm', 'dark-hover');
                        closeButton.classList.add('close');
                        closeButton.textContent = 'Minimize';
                    }
                });
            }
        });
    }

    // Adding CSS to handle new Trello UI updates
    const style = document.createElement('style');
    style.textContent = `
        body [data-testid='list-cards'] {
            row-gap: 6px !important;
        }
        body [data-testid='list-card'] div {
            border-radius: 6px !important;
        }
        body [data-testid='list'] {
            border-radius: 6px !important;
        }
        .hidden-content [data-testid='list-cards'] {
            display: none !important;
        }
        
    `;
    /* div [data-testid="list-card-gap"] {
            display: none !important;
        }
    */
    // NOTE: Removing since Trello Fixed styles
    document.head.appendChild(style);

    // Use MutationObserver to watch for changes in the DOM
    const observer = new MutationObserver(start);
    observer.observe(document.body, { childList: true, subtree: true });

    // Run the script on page load
    window.addEventListener('load', start);
})();
