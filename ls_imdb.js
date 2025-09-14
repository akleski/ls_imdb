// ==UserScript==
// @name         IMDb Movie Score and Search Enhancer
// @namespace    http://tampermonkey.net/
// @version      1.9
// @description  Adds Rotten Tomatoes Tomatometer and Audience scores with icons, and custom search links to IMDb movie lists.
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
    const CURRENT_VERSION = '1.9';
    
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

    // Add CSS for the scores in the metadata section
    GM_addStyle(`
        /* Styles for external links section */
        .ipc-metadata-list-summary-item .ratings-container {
            min-width: 100px;
            margin-top: 8px;
            padding: 8px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
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
        
        /* Styles for the inline scores in metadata */
        .sc-15ac7568-7.dli-title-metadata-item.rt-score,
        .sc-15ac7568-7.dli-title-metadata-item.audience-score {
            display: inline-flex;
            align-items: center;
            font-weight: bold;
            padding: 0 4px;
        }
        .rt-score {
            color: #fa320a;
        }
        .audience-score {
            color: #18479c;
        }
        .score-icon {
            width: 16px;
            height: 16px;
            margin-right: 2px;
        }
    `);

    // Define the external site you want to search.
    // The `__IMDB_ID__` placeholder will be replaced with the movie's ID (e.g., tt1234567).
    const EXTERNAL_SEARCH_URL = 'https://thepiratebay.org/search.php?q=__IMDB_ID__';

    // Metacritic score is now provided natively by IMDb

    // Helper function to process Rotten Tomatoes detail page results
    function getRottenTomatoesDetailPage(title, releaseYear, movieResults, parser) {
        // Default result object with placeholders
        const result = {
            tomatoScore: 'N/A',
            audienceScore: 'N/A',
            tomatoImage: null,
            audienceImage: null,
            movieUrl: null
        };
        
        // Find the best matching movie (prioritize exact title match with year)
        let bestMatch = null;
        
        for (const movie of movieResults) {
            // Get movie title and year
            const titleElement = movie.querySelector('[slot="title"]') || 
                               movie.querySelector('.title') ||
                               movie.querySelector('a');
                               
            const yearElement = movie.querySelector('[data-qa="info-year"]') ||
                              movie.querySelector('.year');
            
            if (!titleElement) continue;
            
            const movieTitle = titleElement.textContent.trim();
            const movieYear = yearElement ? yearElement.textContent.trim().replace(/[()]/g, '') : '';
            
            console.log(`Found movie in results: "${movieTitle}" (${movieYear})`);
            
            // Check for exact match with year
            if (releaseYear && movieTitle.toLowerCase().includes(title.toLowerCase()) && 
                movieYear.includes(releaseYear)) {
                bestMatch = movie;
                break;
            } 
            // Check for exact match without year
            else if (movieTitle.toLowerCase() === title.toLowerCase()) {
                bestMatch = movie;
                break;
            }
            // Keep first as fallback
            else if (!bestMatch) {
                bestMatch = movie;
            }
        }
        
        if (!bestMatch) {
            bestMatch = movieResults[0]; // Use the first result as fallback
        }
        
        console.log('Best match selected:', bestMatch.outerHTML.substring(0, 200) + '...');
        
        // Get the direct URL to the movie page
        let movieUrl = null;
        
            // Try to find the URL - it might be in the title slot or another link
            const titleSlot = bestMatch.querySelector('[slot="title"]');
            if (titleSlot && titleSlot.tagName === 'A') {
                const href = titleSlot.getAttribute('href');
                console.log(`Found title slot with href: ${href}`);
                if (href) {
                    if (href.startsWith('/m/')) {
                        movieUrl = 'https://www.rottentomatoes.com' + href;
                        console.log(`Found relative movie URL in title slot: ${movieUrl}`);
                    } else if (href.includes('rottentomatoes.com/m/')) {
                        // It's a full URL, not just a path
                        movieUrl = href;
                        console.log(`Found full movie URL in title slot: ${movieUrl}`);
                    }
                }
            }        if (!movieUrl) {
            // Look through all links and find one that looks like a movie URL
            const allLinks = bestMatch.querySelectorAll('a');
            for (const link of allLinks) {
                const href = link.getAttribute('href');
                if (href) {
                    if (href.startsWith('/m/')) {
                        movieUrl = 'https://www.rottentomatoes.com' + href;
                        break;
                    } else if (href.includes('rottentomatoes.com/m/')) {
                        // It's a full URL, not just a path
                        movieUrl = href;
                        break;
                    }
                }
            }
        }
        
        if (movieUrl) {
            result.movieUrl = movieUrl;
            console.log(`Found movie URL: ${result.movieUrl}`);
            
            // Extract the Tomatometer score from the search result
            const criticScoreElement = bestMatch.querySelector('rt-text.critics-score') || 
                                      bestMatch.querySelector('[data-qa="critic-score"]');
            
            if (criticScoreElement) {
                const text = criticScoreElement.textContent.trim();
                const match = text.match(/(\d+)%/);
                if (match) {
                    result.tomatoScore = match[1] + '%';
                    console.log(`Found Tomatometer score: ${result.tomatoScore}`);
                }
                
                // Try to determine icon
                const iconElement = bestMatch.querySelector('score-icon-critics');
                if (iconElement) {
                    const sentiment = iconElement.getAttribute('sentiment') || '';
                    const certified = iconElement.hasAttribute('certified');
                    
                    if (parseInt(result.tomatoScore) >= 60 || sentiment === 'POSITIVE') {
                        result.tomatoImage = certified ? 
                            'https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/certified_fresh-notext.56a89734a59.svg' : 
                            'https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/tomatometer-fresh.149b5e8adc3.svg';
                    } else {
                        result.tomatoImage = 'https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/tomatometer-rotten.f1ef4f02ce3.svg';
                    }
                }
            }
            
            // Now get the audience score from the detail page
            return new Promise((resolve) => {
                GM_xmlhttpRequest({
                    method: "GET",
                    url: result.movieUrl,
                    onload: function(detailResponse) {
                        const detailDoc = parser.parseFromString(detailResponse.responseText, "text/html");
                        
                        // Process detail page to get audience score (same as existing code)
                        const scoreBoard = detailDoc.querySelector('score-board');
                        if (scoreBoard) {
                            console.log("Found score-board element");
                            
                            // If we didn't find tomatometer in search, get it from detail page
                            if (result.tomatoScore === 'N/A' && scoreBoard.hasAttribute('tomatometerscore')) {
                                result.tomatoScore = scoreBoard.getAttribute('tomatometerscore') + '%';
                                console.log(`Found Tomatometer score in detail page: ${result.tomatoScore}`);
                                
                                // Set appropriate icon
                                const tomatometerState = scoreBoard.getAttribute('tomatometerstate') || '';
                                if (tomatometerState.includes('certified')) {
                                    result.tomatoImage = 'https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/certified_fresh-notext.56a89734a59.svg';
                                } else if (tomatometerState.includes('fresh')) {
                                    result.tomatoImage = 'https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/tomatometer-fresh.149b5e8adc3.svg';
                                } else if (tomatometerState.includes('rotten')) {
                                    result.tomatoImage = 'https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/tomatometer-rotten.f1ef4f02ce3.svg';
                                }
                            }
                            
                            // Get audience score
                            if (scoreBoard.hasAttribute('audiencescore')) {
                                result.audienceScore = scoreBoard.getAttribute('audiencescore') + '%';
                                console.log(`Found Audience score: ${result.audienceScore}`);
                                
                                // Set appropriate icon
                                const audienceState = scoreBoard.getAttribute('audiencestate') || '';
                                if (audienceState.includes('upright')) {
                                    result.audienceImage = 'https://www.rottentomatoes.com/assets/pizza-pie/images/icons/audience/aud_score-fresh.6c24d79faaf.svg';
                                } else if (audienceState.includes('spilled')) {
                                    result.audienceImage = 'https://www.rottentomatoes.com/assets/pizza-pie/images/icons/audience/aud_score-rotten.f419e4046b7.svg';
                                }
                            }
                        }
                        
                        // Try to find audience score from other elements if not found yet
                        if (result.audienceScore === 'N/A') {
                            // Rest of audience score extraction logic (same as existing code)
                            const audienceTextElement = detailDoc.querySelector('rt-text.audience-score') ||
                                                     detailDoc.querySelector('[data-qa="audience-score"]');
                            
                            if (audienceTextElement) {
                                const text = audienceTextElement.textContent.trim();
                                const match = text.match(/(\d+)%/);
                                if (match) {
                                    result.audienceScore = match[1] + '%';
                                    console.log(`Found Audience score via text: ${result.audienceScore}`);
                                    
                                    // Determine icon based on score value
                                    if (parseInt(result.audienceScore) >= 60) {
                                        result.audienceImage = 'https://www.rottentomatoes.com/assets/pizza-pie/images/icons/audience/aud_score-fresh.6c24d79faaf.svg';
                                    } else {
                                        result.audienceImage = 'https://www.rottentomatoes.com/assets/pizza-pie/images/icons/audience/aud_score-rotten.f419e4046b7.svg';
                                    }
                                }
                            }
                            
                            // JSON-LD data check (same as existing code)
                            const jsonLdElements = detailDoc.querySelectorAll('script[type="application/ld+json"]');
                            jsonLdElements.forEach(script => {
                                try {
                                    const jsonData = JSON.parse(script.textContent);
                                    
                                    if (jsonData.aggregateRating && jsonData.aggregateRating.ratingValue && 
                                        jsonData.aggregateRating.name === "Popcornmeter") {
                                        result.audienceScore = jsonData.aggregateRating.ratingValue + '%';
                                        
                                        // Set icon based on score value
                                        if (parseInt(result.audienceScore) >= 60) {
                                            result.audienceImage = 'https://www.rottentomatoes.com/assets/pizza-pie/images/icons/audience/aud_score-fresh.6c24d79faaf.svg';
                                        } else {
                                            result.audienceImage = 'https://www.rottentomatoes.com/assets/pizza-pie/images/icons/audience/aud_score-rotten.f419e4046b7.svg';
                                        }
                                    }
                                } catch (e) {
                                    console.error('Error parsing JSON-LD:', e);
                                }
                            });
                        }
                        
                        resolve(result);
                    },
                    onerror: function(error) {
                        console.error('Error fetching movie detail page:', error);
                        resolve(result); // Resolve with what we have so far
                    }
                });
            });
        } else {
            console.log("No movie URL found in the alternative format");
            return Promise.resolve(result);
        }
    }
    
    // Helper function to get Rotten Tomatoes scores and images
    function getRottenTomatoesScore(title, releaseYear) {
        // Include release year in search if available to narrow down results
        const searchTerm = releaseYear ? `${title} ${releaseYear}` : title;
        const url = `https://www.rottentomatoes.com/search?search=${encodeURIComponent(searchTerm)}`;
        console.log(`Fetching Rotten Tomatoes score for "${searchTerm}" from ${url}`);
        
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: "GET",
                url: url,
                onload: function(response) {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(response.responseText, "text/html");
                    
                    // Find all movie results
                    const movieResults = doc.querySelectorAll('search-page-media-row');
                    console.log(`Found ${movieResults.length} movie results for "${title}"`);
                    
                    // If no results found using the primary selector, try alternative selectors
                    if (movieResults.length === 0) {
                        console.log('Trying alternative selectors for search results');
                        
                        // Try li.row elements (as seen in your HTML snippet)
                        const rowResults = doc.querySelectorAll('li.row[data-qa="data-row-element"]');
                        if (rowResults.length > 0) {
                            console.log(`Found ${rowResults.length} row results using li.row selector`);
                            
                            // Use these results instead
                            return getRottenTomatoesDetailPage(title, releaseYear, rowResults, parser);
                        }
                    }
                    
                    // Default result object with placeholders
                    const result = {
                        tomatoScore: 'N/A',
                        audienceScore: 'N/A',
                        tomatoImage: null,
                        audienceImage: null,
                        movieUrl: null
                    };
                    
                    // No results found
                    if (movieResults.length === 0) {
                        console.log(`No movie results found for "${title}"`);
                        resolve(result);
                        return;
                    }
                    
                    // Find the best matching movie (prioritize exact title match with year)
                    let bestMatch = null;
                    
                    for (const movie of movieResults) {
                        // Check if it's a movie (not TV show)
                        const mediaType = movie.querySelector('[slot="media-type"]');
                        if (mediaType && !mediaType.textContent.trim().toLowerCase().includes('movie')) {
                            continue;
                        }
                        
                        // Get movie title
                        const titleElement = movie.querySelector('[data-qa="media-row-title"]') || 
                                           movie.querySelector('.media-row__title') ||
                                           movie.querySelector('a[slot="title"]');
                        
                        if (!titleElement) continue;
                        
                        const movieTitle = titleElement.textContent.trim();
                        // Check for exact match with year
                        if (releaseYear && movieTitle.toLowerCase().includes(`${title.toLowerCase()}`) && 
                            movieTitle.includes(`(${releaseYear})`)) {
                            bestMatch = movie;
                            break;
                        } 
                        // Check for exact match without year
                        else if (movieTitle.toLowerCase() === title.toLowerCase()) {
                            bestMatch = movie;
                            break;
                        }
                        // Keep first as fallback
                        else if (!bestMatch) {
                            bestMatch = movie;
                        }
                    }
                    
                    if (!bestMatch) {
                        bestMatch = movieResults[0]; // Use the first result as fallback
                    }
                    
                    // Get the direct URL to the movie page
                    // Try multiple selector patterns to find the movie URL
                    let linkElement = bestMatch.querySelector('a[href^="/m/"]');
                    
                    // If not found directly, check parent/ancestor elements
                    if (!linkElement && bestMatch.closest) {
                        const rowElement = bestMatch.closest('.row') || bestMatch.closest('li.row');
                        if (rowElement) {
                            linkElement = rowElement.querySelector('a[href^="/m/"]');
                        }
                    }
                    
                    // Also try to find the link by looking at slot="title" elements
                    if (!linkElement) {
                        const titleSlot = bestMatch.querySelector('[slot="title"]');
                        if (titleSlot && titleSlot.tagName === 'A') {
                            const href = titleSlot.getAttribute('href');
                            if (href) {
                                if (href.startsWith('/m/')) {
                                    linkElement = titleSlot;
                                } else if (href.includes('rottentomatoes.com/m/')) {
                                    // It's a full URL, not just a path
                                    result.movieUrl = href;
                                    console.log(`Found full movie URL in title slot: ${result.movieUrl}`);
                                    linkElement = null; // Don't need linkElement anymore since we have the full URL
                                }
                            }
                        }
                    }

                    // If we have a direct movie URL, get scores from the detail page
                    if (result.movieUrl) {
                        GM_xmlhttpRequest({
                            method: "GET",
                            url: result.movieUrl,
                            onload: function(detailResponse) {
                                const detailDoc = parser.parseFromString(detailResponse.responseText, "text/html");
                                
                                // Check for score-board element
                                console.log("Checking for score-board element in detail page...");
                                const scoreBoard = detailDoc.querySelector('score-board');
                                if (scoreBoard) {
                                    // Try to get the audience score from score-board
                                    if (scoreBoard.hasAttribute('audiencescore')) {
                                        result.audienceScore = scoreBoard.getAttribute('audiencescore') + '%';
                                        console.log(`Found Audience score from score-board: ${result.audienceScore}`);
                                        
                                        // Set appropriate icon
                                        const audienceState = scoreBoard.getAttribute('audiencestate') || '';
                                        if (audienceState.includes('upright')) {
                                            result.audienceImage = 'https://www.rottentomatoes.com/assets/pizza-pie/images/icons/audience/aud_score-fresh.6c24d79faaf.svg';
                                        } else if (audienceState.includes('spilled')) {
                                            result.audienceImage = 'https://www.rottentomatoes.com/assets/pizza-pie/images/icons/audience/aud_score-rotten.f419e4046b7.svg';
                                        }
                                    }
                                }
                                
                                // Try the JSON-LD data for scores
                                console.log("Looking for scores in JSON-LD data...");
                                const jsonLdElements = detailDoc.querySelectorAll('script[type="application/ld+json"]');
                                console.log(`Found ${jsonLdElements.length} JSON-LD script elements`);
                                
                                jsonLdElements.forEach((script, index) => {
                                    try {
                                        console.log(`Parsing JSON-LD element ${index + 1}...`);
                                        const jsonData = JSON.parse(script.textContent);
                                        
                                        // Look for Tomatometer score in JSON-LD
                                        if (result.tomatoScore === 'N/A' && jsonData.aggregateRating) {
                                            console.log("Found aggregateRating in JSON-LD:", JSON.stringify(jsonData.aggregateRating));
                                            if (jsonData.aggregateRating.name === "Tomatometer" && jsonData.aggregateRating.ratingValue) {
                                                result.tomatoScore = jsonData.aggregateRating.ratingValue + '%';
                                                console.log(`Found Tomatometer score in JSON-LD: ${result.tomatoScore}`);
                                                
                                                // Set icon based on score value
                                                if (parseInt(result.tomatoScore) >= 60) {
                                                    result.tomatoImage = 'https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/tomatometer-fresh.149b5e8adc3.svg';
                                                } else {
                                                    result.tomatoImage = 'https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/tomatometer-rotten.f1ef4f02ce3.svg';
                                                }
                                            }
                                        }
                                        
                                        // Look for audience score in JSON-LD
                                        if (result.audienceScore === 'N/A' && jsonData.aggregateRating && 
                                            jsonData.aggregateRating.ratingValue && 
                                            jsonData.aggregateRating.name === "Popcornmeter") {
                                            result.audienceScore = jsonData.aggregateRating.ratingValue + '%';
                                            console.log(`Found Audience score in JSON-LD: ${result.audienceScore}`);
                                            
                                            // Set icon based on score value
                                            if (parseInt(result.audienceScore) >= 60) {
                                                result.audienceImage = 'https://www.rottentomatoes.com/assets/pizza-pie/images/icons/audience/aud_score-fresh.6c24d79faaf.svg';
                                            } else {
                                                result.audienceImage = 'https://www.rottentomatoes.com/assets/pizza-pie/images/icons/audience/aud_score-rotten.f419e4046b7.svg';
                                            }
                                        }
                                    } catch (e) {
                                        console.error('Error parsing JSON-LD:', e);
                                    }
                                });
                                
                                // Final attempt to find scores by scanning all elements
                                if (result.tomatoScore === 'N/A' || result.audienceScore === 'N/A') {
                                    console.log("Making a last attempt to find scores from other elements...");
                                    
                                    // Scan all elements for score data
                                    const allElements = detailDoc.querySelectorAll('*');
                                    console.log(`Scanning through ${allElements.length} elements for score data...`);
                                    
                                    for (const element of allElements) {
                                        const text = element.textContent?.trim();
                                        if (!text) continue;
                                        
                                        // Check for text that looks like "Tomatometer" near a percentage
                                        if (result.tomatoScore === 'N/A' && 
                                            (text.includes('Tomatometer') || text.includes('Critics') || text.includes('critic')) && 
                                            text.match(/\d+%/)) {
                                            const match = text.match(/(\d+)%/);
                                            if (match) {
                                                result.tomatoScore = match[1] + '%';
                                                console.log(`Found Tomatometer score from general element scan: ${result.tomatoScore} in element:`, element.outerHTML.substring(0, 100));
                                                
                                                // Set icon based on score value
                                                if (parseInt(result.tomatoScore) >= 60) {
                                                    result.tomatoImage = 'https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/tomatometer-fresh.149b5e8adc3.svg';
                                                } else {
                                                    result.tomatoImage = 'https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/tomatometer-rotten.f1ef4f02ce3.svg';
                                                }
                                            }
                                        }
                                        
                                        // Check for text that looks like "Audience" near a percentage
                                        if (result.audienceScore === 'N/A' && 
                                            (text.includes('Audience') || text.includes('audience')) && 
                                            text.match(/\d+%/)) {
                                            const match = text.match(/(\d+)%/);
                                            if (match) {
                                                result.audienceScore = match[1] + '%';
                                                console.log(`Found Audience score from general element scan: ${result.audienceScore} in element:`, element.outerHTML.substring(0, 100));
                                                
                                                // Set icon based on score value
                                                if (parseInt(result.audienceScore) >= 60) {
                                                    result.audienceImage = 'https://www.rottentomatoes.com/assets/pizza-pie/images/icons/audience/aud_score-fresh.6c24d79faaf.svg';
                                                } else {
                                                    result.audienceImage = 'https://www.rottentomatoes.com/assets/pizza-pie/images/icons/audience/aud_score-rotten.f419e4046b7.svg';
                                                }
                                            }
                                        }
                                    }
                                }
                                
                                console.log("Final results:", {
                                    tomatoScore: result.tomatoScore,
                                    audienceScore: result.audienceScore,
                                    movieUrl: result.movieUrl
                                });
                                
                                // Resolve with the complete result
                                resolve(result);
                            },
                            onerror: function(error) {
                                console.error('Error fetching movie detail page:', error);
                                resolve(result); // Resolve with what we have so far
                            }
                        });
                    } else {
                        // No movie URL found, resolve with default values
                        console.log("No movie URL found, resolving with default values");
                        resolve(result);
                    }
                },
                onerror: function(error) {
                    console.error('Error fetching Rotten Tomatoes search results:', error);
                    resolve({
                        tomatoScore: 'N/A',
                        audienceScore: 'N/A',
                        tomatoImage: null,
                        audienceImage: null,
                        movieUrl: null
                    });
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
            let title = titleElement.textContent.trim();
            // Remove list numbering (e.g., "1. ", "2. ", etc.) from the beginning of titles
            title = title.replace(/^\d+\.\s+/, '');
            
            // Extract release year from the movie item
            let releaseYear = '';
            const yearElements = movieElement.querySelectorAll('.dli-title-metadata-item');
            if (yearElements && yearElements.length > 0) {
                // IMDB usually puts the year as the first metadata item
                const yearText = yearElements[0].textContent.trim();
                const yearMatch = yearText.match(/(\d{4})/);
                if (yearMatch) {
                    releaseYear = yearMatch[1];
                    console.log(`Found release year: ${releaseYear} for ${title}`);
                }
            }

            console.log(`Processing movie: ${title} (${imdbId}) [${releaseYear}]`);
            
            // Container for external links (to be placed after metadata)
            const linksContainer = document.createElement('div');
            linksContainer.className = 'ratings-container';

            // Fetch Rotten Tomatoes scores and images
            const rtScores = await getRottenTomatoesScore(title, releaseYear);
            
            // Find the metadata section (dli-title-metadata) where we'll add our inline scores
            const metadataDiv = movieElement.querySelector('.dli-title-metadata');
            
            if (metadataDiv) {
                // Add the Tomatometer score with icon (inline)
                const tomatoMetadataItem = document.createElement('span');
                tomatoMetadataItem.className = 'sc-15ac7568-7 cCsint dli-title-metadata-item rt-score';
                
                if (rtScores.tomatoImage) {
                    const tomatoIcon = document.createElement('img');
                    tomatoIcon.className = 'score-icon';
                    tomatoIcon.src = rtScores.tomatoImage;
                    tomatoIcon.alt = 'RT';
                    tomatoMetadataItem.appendChild(tomatoIcon);
                }
                
                const tomatoScoreText = document.createTextNode(rtScores.tomatoScore);
                tomatoMetadataItem.appendChild(tomatoScoreText);
                
                // Add the Audience score with icon (inline)
                const audienceMetadataItem = document.createElement('span');
                audienceMetadataItem.className = 'sc-15ac7568-7 cCsint dli-title-metadata-item audience-score';
                
                if (rtScores.audienceImage) {
                    const audienceIcon = document.createElement('img');
                    audienceIcon.className = 'score-icon';
                    audienceIcon.src = rtScores.audienceImage;
                    audienceIcon.alt = 'Audience';
                    audienceMetadataItem.appendChild(audienceIcon);
                }
                
                const audienceScoreText = document.createTextNode(rtScores.audienceScore);
                audienceMetadataItem.appendChild(audienceScoreText);
                
                // Add the new score elements to the metadata section
                metadataDiv.appendChild(tomatoMetadataItem);
                metadataDiv.appendChild(audienceMetadataItem);
            }

            // Add the external search link to the separate container
            const externalLink = document.createElement('a');
            externalLink.className = 'external-link';
            externalLink.href = EXTERNAL_SEARCH_URL.replace('__IMDB_ID__', imdbId);
            externalLink.textContent = `Search on External Site`;
            externalLink.target = '_blank'; // Open in a new tab
            linksContainer.appendChild(externalLink);
            
            // Add direct link to Rotten Tomatoes page if we found one
            if (rtScores.movieUrl) {
                const rtLink = document.createElement('a');
                rtLink.className = 'external-link';
                rtLink.href = rtScores.movieUrl;
                rtLink.textContent = `View on Rotten Tomatoes`;
                rtLink.target = '_blank';
                linksContainer.appendChild(rtLink);
            }

            // Add the links container below the movie element
            const metadataSection = movieElement.querySelector('.ipc-metadata-list-summary-item__tc');
            if (metadataSection) {
                metadataSection.appendChild(linksContainer);
            } else {
                // Fallback to appending to the movie element itself
                movieElement.appendChild(linksContainer);
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
