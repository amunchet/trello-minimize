# trello-minimize
Trello Minimizer Tampermonkey script

## Installation Instructions
1.  Install Tampermonkey extension in Chrome.
2.  Open the "Trello Minimizer.user.js" in raw format.  
3.  This should open the Tamper Monkey automatically (it detects the user.js ending).  Install from there

 -- OR --

2.  Click on the icon in Chrome and click "Create new script"
3.  Copy and paste the contents.
4.  When you browse to Trello, you will see at the bottom of lists a button to Minimize.  You can also specify in the script which boards should automatically start minimized.

## Known Issues
1.  When going to another board, the script does not fire.  It is attached to the window load event.
