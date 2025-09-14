// ==UserScript==
// @name         IMDb Movie Score and Search Enhancer
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Adds Metacritic and Rotten Tomatoes scores, and a custom external search link to IMDb movie lists.
// @author       Gemini
// @match        https://www.imdb.com/search/title/?title_type=feature&*
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant        GM_registerMenuCommand
// @grant        GM_notification
// @connect      www.rottentomatoes.com
// @connect      raw.githubusercontent.com
// @connect      *
// @updateURL    https://github.com/akleski/ls_imdb/blob/main/ls_imdb.js
// @downloadURL  https://github.com/akleski/ls_imdb/blob/main/ls_imdb.js
// ==/UserScript==

(function() {
    'use strict';
    
    // Current version
    const CURRENT_VERSION = '1.3';
    
    // Function to check for updates
    function checkForUpdates() {
        const updateUrl = 'https://github.com/akleski/ls_imdb/blob/main/ls_imdb.js';
        
        GM_xmlhttpRequest({
            method: "GET",
            url: updateUrl,
            onload: function(response) {
                const versionMatch = response.responseText.match(/@version\s+(\d+\.\d+)/);
                
                if (versionMatch && versionMatch[1]) {
                    const latestVersion = versionMatch[1];
                    
                    if (latestVersion > CURRENT_VERSION) {
                        GM_notification({
                            title: 'Update Available',
                            text: `A new version (${latestVersion}) of IMDb Movie Score and Search Enhancer is available. Click to update.`,
                            onclick: function() {
                                window.open(updateUrl, '_blank');
                            }
                        });
                    } else {
                        GM_notification({
                            title: 'No Updates Available',
                            text: `You're running the latest version (${CURRENT_VERSION}).`
                        });
                    }
                } else {
                    console.error('Failed to parse version from update URL');
                }
            },
            onerror: function(error) {
                console.error('Error checking for updates', error);
                GM_notification({
                    title: 'Update Check Failed',
                    text: 'Failed to check for updates. Please try again later.'
                });
            }
        });
    }
    
    // Register the update check menu command
    GM_registerMenuCommand('Check for updates', checkForUpdates);

    // Add some basic CSS for the new column
    GM_addStyle(`
        .ipc-metadata-list-summary-item .ratings-container {
            min-width: 100px;
            margin-top: 8px;
            padding: 8px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .ipc-metadata-list-summary-item .ratings-container .score {
            display: block;
            font-weight: bold;
            font-size: 1.1em;
            margin-bottom: 4px;
        }
        .ipc-metadata-list-summary-item .ratings-container .rotten-tomatoes-score {
            color: #993333;
        }
        .ipc-metadata-list-summary-item .ratings-container .external-link {
            font-size: 0.8em;
            margin-top: 5px;
            display: block;
            color: #5799ef;
            text-decoration: none;
        }
        .ipc-metadata-list-summary-item .ratings-container .external-link:hover {
            text-decoration: underline;
        }
    `);

    // Define the external site you want to search.
    // The `__IMDB_ID__` placeholder will be replaced with the movie's ID (e.g., tt1234567).
    const EXTERNAL_SEARCH_URL = 'https://thepiratebay.org/search.php?q=__IMDB_ID__';

    // Metacritic score is now provided natively by IMDb

    // Helper function to get Rotten Tomatoes score
    function getRottenTomatoesScore(title) {
        const url = `https://www.rottentomatoes.com/search?search=${encodeURIComponent(title)}`;
        console.log(`Fetching Rotten Tomatoes score for "${title}" from ${url}`);
        
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: "GET",
                url: url,
                onload: function(response) {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(response.responseText, "text/html");
                    
                    // First find the movie result
                    const movieResults = doc.querySelectorAll('search-page-media-row');
                    console.log(`Found ${movieResults.length} movie results for "${title}"`);
                    
                    if (movieResults.length > 0) {
                        // For each movie result, try to find the score
                        for (const result of movieResults) {
                            // Find score element within this result
                            const scoreElements = [
                                result.querySelector('score-icon-critic'),
                                result.querySelector('[data-qa="tomatometer"]'),
                                result.querySelector('.percentage'),
                                result.querySelector('[data-qa="score-marker"]')
                            ].filter(Boolean);
                            
                            // Check if any score elements were found
                            if (scoreElements.length > 0) {
                                for (const scoreEl of scoreElements) {
                                    // Check for attributes that might contain the score
                                    if (scoreEl.hasAttribute('percentage')) {
                                        const score = scoreEl.getAttribute('percentage');
                                        console.log(`Found RT score via percentage attribute: ${score}%`);
                                        resolve(score + '%');
                                        return;
                                    }
                                    
                                    // Check for text content with percentage
                                    const fullText = scoreEl.textContent.trim();
                                    const percentMatch = fullText.match(/(\d+)%/);
                                    if (percentMatch) {
                                        console.log(`Found RT score via text content: ${percentMatch[1]}%`);
                                        resolve(percentMatch[1] + '%');
                                        return;
                                    }
                                }
                            }
                        }
                        
                        // If we get here, we didn't find a score in any of the results
                        console.log(`No score found in movie results for "${title}"`);
                        resolve('N/A');
                    } else {
                        // Try alternate selectors on the whole page in case the structure has changed
                        const altSelectors = [
                            '.tomatometer-container .percentage',
                            '.scores-container [data-qa="tomatometer"]',
                            'score-board',
                            '.critic-score',
                            '.tomatometer-fresh',
                            '.tomatometer-rotten'
                        ];
                        
                        for (const selector of altSelectors) {
                            const elements = doc.querySelectorAll(selector);
                            if (elements.length > 0) {
                                for (const el of elements) {
                                    // Check for percentage attribute
                                    if (el.hasAttribute && el.hasAttribute('percentage')) {
                                        const score = el.getAttribute('percentage');
                                        console.log(`Found RT score via alt selector: ${score}%`);
                                        resolve(score + '%');
                                        return;
                                    }
                                    
                                    // Check for text content
                                    const text = el.textContent.trim();
                                    const match = text.match(/(\d+)%/);
                                    if (match) {
                                        console.log(`Found RT score via alt text: ${match[1]}%`);
                                        resolve(match[1] + '%');
                                        return;
                                    }
                                }
                            }
                        }
                        
                        console.log(`No RT score found for "${title}"`);
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
        // New IMDB uses React and has different class structure
        const movieElements = document.querySelectorAll('.ipc-metadata-list-summary-item');
        
        if (movieElements.length === 0) {
            console.log('No movie elements found on the page. Retrying in 2 seconds...');
            // The page might be loading dynamically with React, so wait and retry
            setTimeout(addScoresAndSearchLinks, 2000);
            return;
        }

        console.log(`Found ${movieElements.length} movie elements on the page.`);

        for (const movieElement of movieElements) {
            // Avoid adding scores multiple times to the same element
            if (movieElement.querySelector('.ratings-container')) {
                continue;
            }

            // Find the title element and link with the IMDB ID
            const titleElement = movieElement.querySelector('.ipc-title-link-wrapper');
            if (!titleElement) {
                console.log('Title element not found for a movie item');
                continue;
            }
            
            const titleLink = titleElement.getAttribute('href');
            const imdbIdMatch = titleLink ? titleLink.match(/\/title\/(tt\d+)/) : null;
            
            if (!imdbIdMatch) {
                console.log('IMDB ID not found for:', titleElement.textContent);
                continue;
            }
            
            const imdbId = imdbIdMatch[1];
            const title = titleElement.textContent.trim();

            console.log(`Processing movie: ${title} (${imdbId})`);

            const scoresContainer = document.createElement('div');
            scoresContainer.className = 'ratings-container';

            // Only fetch Rotten Tomatoes score since IMDb already shows Metacritic
            const rottenTomatoesScore = await getRottenTomatoesScore(title);

            // Add the Rotten Tomatoes score
            const rottenTomatoesSpan = document.createElement('span');
            rottenTomatoesSpan.className = 'score rotten-tomatoes-score';
            rottenTomatoesSpan.textContent = `Rotten Tomatoes: ${rottenTomatoesScore}`;
            scoresContainer.appendChild(rottenTomatoesSpan);

            // Add the external search link
            const externalLink = document.createElement('a');
            externalLink.className = 'external-link';
            externalLink.href = EXTERNAL_SEARCH_URL.replace('__IMDB_ID__', imdbId);
            externalLink.textContent = `Search on External Site`;
            externalLink.target = '_blank'; // Open in a new tab
            scoresContainer.appendChild(externalLink);

            // Add the container to the movie element in an appropriate location
            // Find the metadata section where we should append our ratings
            const metadataSection = movieElement.querySelector('.ipc-metadata-list-summary-item__tc');
            if (metadataSection) {
                metadataSection.appendChild(scoresContainer);
            } else {
                // Fallback to appending to the movie element itself
                movieElement.appendChild(scoresContainer);
            }
        }
    }

    // Run the script after the page has loaded, and handle React's dynamic loading
    window.addEventListener('load', function() {
        // Initial attempt
        setTimeout(addScoresAndSearchLinks, 1000);
        
        // Set up a MutationObserver to detect when React adds new content
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                    // Check if any of the added nodes are movie elements or contain movie elements
                    for (let i = 0; i < mutation.addedNodes.length; i++) {
                        const node = mutation.addedNodes[i];
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            // If this is a movie element or contains movie elements, run our function
                            if (node.classList && node.classList.contains('ipc-metadata-list-summary-item') || 
                                node.querySelector && node.querySelector('.ipc-metadata-list-summary-item')) {
                                console.log('Detected new movie elements added to the page');
                                addScoresAndSearchLinks();
                                break;
                            }
                        }
                    }
                }
            });
        });
        
        // Start observing the document with the configured parameters
        observer.observe(document.body, { childList: true, subtree: true });
    });
})();
