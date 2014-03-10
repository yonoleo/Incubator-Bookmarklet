# Read Me

## Bookmarklet to highlight suggested translations.
This bookmarklet takes the accepted translations as they are on the page (not as they are on the system) and highlights the suggested translations that should be accepted according to them.

## Installation
1. Copy contents of Incubator-min.js 
2. Create a bookmark
3. Type 'javascript:' and paste contents of file.
4. Save bookmark

## Limitations
- Made to work with English <–> Spanish characters by "folding" accents and special characters.
- Does not recognize contractions.
- Does not match spelled-out numbers with numerals.
- Punctuation of sentences needs to be the same for a possitive match.

## Notes
- The variable charMap is the one to change to support other languages.
- This is the first pass. The code may need some cleaning but it is functional.