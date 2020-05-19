README:

The Chinese Dictionary is a sleek, minimalist app that takes a string of characters as an input, and returns data specific to the user's chosen app. The current functional apps are: Dictionary, FlashCards. The Chinese Dictionary is written with HTML, CSS, JavaScript and jQuery.

Dictionary:
The dictionary app takes in a string input and returns a link to a definition page, as well as the pinyin pronunciation.

FlashCards:
The flashcards app takes in a string input and returns a deck of flashcards, made up of the individual characters in the string. Each flashcard displays three incorrect and one correct pinyin pronunciation. Correct matches add points, while incorrect matches subtracts them.


Technological Approach:
The main idea was to create a website that could act as a socket or a shell, and then to build individual apps that could be 'inserted' into the shell. Regarding that, I decided to build only this shell in HTML, and the rest would be programatically generated in jQuery. Although I was able to implement this, it's not as modular as I would like. Eventually, this site should be able to accept a module and display it(maybe from a user upload? I don't know enough about this yet).

Creative Approach:
The approach was twofold - first I went in guns blazing, coding through trial and error. After creating initial logic and a janky wireframe, my next approach was to take a working program and make it as sleek and simple as possible. Simplicty in form and function was the name of the game, but this proved a difficult balance once I began coming up with ideas for flashy new features. Drawing inspiration from Chinese minimalist design, the intention of the app was to create an elegant, responsive app that seems to move and breathe organically.

ToDo:
Create local storage for Flash Card Decks. Allow these to be exportable or importable for easy use.
Streamline the app 'modules'. Maybe use CLASSES instead?

Live Link
https://zachherwitz.github.io/chineseapp/

API Link
https://ctext.org/plugins/apilist/
