// ==UserScript==
// @name         IMDb Movie Score and Search Enhancer
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds Metacritic and Rotten Tomatoes scores, and a custom external search link to IMDb movie lists.
// @author       Gemini
// @match        https://www.imdb.com/search/title/?title_type=feature&*
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @connect      www.metacritic.com
// @connect      www.rottentomatoes.com
// @connect      *
// ==/UserScript==

(function() {
    'use strict';

    // Add some basic CSS for the new column
    GM_addStyle(`
        .lister-list .ratings-container {
            min-width: 100px;
        }
        .lister-list .ratings-container .score {
            display: block;
            font-weight: bold;
            font-size: 1.1em;
        }
        .lister-list .ratings-container .metacritic-score {
            color: #ff9900;
        }
        .lister-list .ratings-container .rotten-tomatoes-score {
            color: #993333;
        }
        .lister-list .ratings-container .external-link {
            font-size: 0.8em;
            margin-top: 5px;
            display: block;
        }
    `);

    // Define the external site you want to search.
    // The `__IMDB_ID__` placeholder will be replaced with the movie's ID (e.g., tt1234567).
    const EXTERNAL_SEARCH_URL = 'https://thepiratebay.org/search.php?q=__IMDB_ID__';

    // Helper function to get Metacritic score
    function getMetacriticScore(title) {
        const url = `https://www.metacritic.com/search/movie/${encodeURIComponent(title)}/results`;
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: "GET",
                url: url,
                onload: function(response) {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(response.responseText, "text/html");
                    const scoreElement = doc.querySelector('.metascore_w.large.movie');
                    if (scoreElement) {
                        resolve(scoreElement.textContent.trim());
                    } else {
                        resolve('N/A');
                    }
                },
                onerror: function(error) {
                    console.error('Error fetching Metacritic score for', title, error);
                    resolve('N/A');
                }
            });
        });
    }

    // Helper function to get Rotten Tomatoes score
    function getRottenTomatoesScore(title) {
        const url = `https://www.rottentomatoes.com/search?q=${encodeURIComponent(title)}`;
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: "GET",
                url: url,
                onload: function(response) {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(response.responseText, "text/html");
                    // This is a simple scrape and may break if the site's HTML changes.
                    // A more robust solution would be to use a public API if available.
                    const scoreElement = doc.querySelector('a.search-page-link');
                    if (scoreElement) {
                         const scoreText = scoreElement.textContent;
                         const regex = /(\d+)%$/;
                         const match = scoreText.match(regex);
                         if(match) {
                             resolve(match[1] + '%');
                         } else {
                             resolve('N/A');
                         }
                    } else {
                        resolve('N/A');
                    }
                },
                onerror: function(error) {
                    console.error('Error fetching Rotten Tomatoes score for', title, error);
                    resolve('N/A');
                }
            });
        });
    }

    async function addScoresAndSearchLinks() {
        const movieElements = document.querySelectorAll('.lister-item.mode-advanced');
        if (movieElements.length === 0) {
            console.log('No movie elements found on the page.');
            return;
        }

        // Add a new header column for the scores
        const headerRow = document.querySelector('.lister-list > .lister-item-header');
        if (headerRow) {
            const ratingsHeader = document.createElement('h3');
            ratingsHeader.className = 'lister-item-header';
            ratingsHeader.textContent = 'External Ratings';
            headerRow.parentNode.insertBefore(ratingsHeader, headerRow.nextSibling);
        }

        for (const movieElement of movieElements) {
            const titleElement = movieElement.querySelector('.lister-item-header a');
            const imdbId = titleElement.href.match(/tt\d+/)[0];
            const title = titleElement.textContent.trim();

            const scoresContainer = document.createElement('div');
            scoresContainer.className = 'ratings-container';

            const metacriticPromise = getMetacriticScore(title);
            const rottenTomatoesPromise = getRottenTomatoesScore(title);

            // Fetch scores in parallel
            const [metacriticScore, rottenTomatoesScore] = await Promise.all([metacriticPromise, rottenTomatoesPromise]);

            // Add the Metacritic score
            const metacriticSpan = document.createElement('span');
            metacriticSpan.className = 'score metacritic-score';
            metacriticSpan.textContent = `Metacritic: ${metacriticScore}`;
            scoresContainer.appendChild(metacriticSpan);

            // Add the Rotten Tomatoes score
            const rottenTomatoesSpan = document.createElement('span');
            rottenTomatoesSpan.className = 'score rotten-tomatoes-score';
            rottenTomatoesSpan.textContent = `RT: ${rottenTomatoesScore}`;
            scoresContainer.appendChild(rottenTomatoesSpan);

            // Add the external search link
            const externalLink = document.createElement('a');
            externalLink.className = 'external-link';
            externalLink.href = EXTERNAL_SEARCH_URL.replace('__IMDB_ID__', imdbId);
            externalLink.textContent = `Search on External Site`;
            externalLink.target = '_blank'; // Open in a new tab
            scoresContainer.appendChild(externalLink);

            // Add the new column to the movie row
            movieElement.querySelector('.lister-item-content').appendChild(scoresContainer);
        }
    }

    // Run the script after the page has loaded
    window.addEventListener('load', addScoresAndSearchLinks);
})();
