# RADIORAMADHAN
RADIO ISLAMIC APP
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ramadhan World App</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body {
            font-family: 'Inter', sans-serif;
        }
        .card {
            background-color: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .prayer-time.active {
            background-color: rgba(6, 182, 212, 0.3);
            border-left-width: 4px;
            border-color: #06B6D4;
        }
        .nav-button.active {
            background-color: #06B6D4;
            color: white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        /* Qibla Marker styling for the main indicator */
        #qibla-marker {
            transition: transform 0.5s ease-out;
            transform-origin: center center; /* Rotate around its center */
        }
        .quran-surah:hover, .radio-station-item:hover {
            background-color: rgba(255, 255, 255, 0.15);
        }
        .radio-station-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem;
            border-radius: 0.5rem;
            cursor: pointer;
            transition: background-color 0.2s ease-in-out;
        }
        .radio-station-item.active {
            background-color: rgba(6, 182, 212, 0.2);
            border: 1px solid #06B6D4;
        }
        .radio-player-controls {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
            margin-top: 1rem;
        }
        .radio-player-controls button {
            background-color: #06B6D4;
            color: white;
            padding: 0.75rem 1rem;
            border-radius: 9999px; /* Full rounded for circular buttons */
            font-size: 1.25rem;
            transition: background-color 0.2s ease-in-out, transform 0.1s ease-in-out;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .radio-player-controls button:hover {
            background-color: #0891B2;
            transform: translateY(-2px);
        }
        .radio-player-controls button:active {
            transform: translateY(0);
        }
        .settings-saved-message {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #10B981; /* Green for success */
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            opacity: 0;
            transition: opacity 0.5s ease-in-out;
            z-index: 1000;
        }
        .settings-saved-message.show {
            opacity: 1;
        }
        /* Responsive YouTube iframe */
        .video-container {
            position: relative;
            width: 100%;
            padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
            height: 0;
            overflow: hidden;
            border-radius: 0.75rem; /* rounded-lg */
        }
        .video-container iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    </style>
</head>
<body class="bg-gray-900 text-white">

    <div id="loading-screen" class="fixed inset-0 bg-gray-900 bg-opacity-90 flex flex-col justify-center items-center z-50">
        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-500"></div>
        <p class="mt-4 text-lg">Finding your location and fetching data...</p>
    </div>

    <div id="main-content" class="min-h-screen container mx-auto p-4 sm:p-6 lg:p-8 opacity-0 transition-opacity duration-1000">
        <!-- Header Section -->
        <header class="text-center mb-6">
            <!-- Logo line removed as the provided file path was temporary and not persistent -->
            <h1 class="text-4xl sm:text-5xl font-extrabold text-cyan-400">Ramadhan World</h1>
            <p id="islamic-date" class="text-lg text-gray-300 mt-2">Loading Islamic Date...</p>
            <p id="location" class="text-md text-gray-400 mt-1">Fetching location...</p>
        </header>

        <!-- Navigation -->
        <nav class="flex justify-center gap-2 mb-6 flex-wrap">
            <button onclick="showView('home')" class="nav-button active px-4 py-2 rounded-lg bg-gray-700 hover:bg-cyan-500 transition">Home</button>
            <button onclick="showView('qibla')" class="nav-button px-4 py-2 rounded-lg bg-gray-700 hover:bg-cyan-500 transition">Qibla</button>
            <button onclick="showView('quran')" class="nav-button px-4 py-2 rounded-lg bg-gray-700 hover:bg-cyan-500 transition">Quran</button>
            <button onclick="showView('salah')" class="nav-button px-4 py-2 rounded-lg bg-gray-700 hover:bg-cyan-500 transition">Salah</button>
            <button onclick="showView('tv')" class="nav-button px-4 py-2 rounded-lg bg-gray-700 hover:bg-cyan-500 transition">TV</button>
            <button onclick="showView('settings')" class="nav-button px-4 py-2 rounded-lg bg-gray-700 hover:bg-cyan-500 transition">Settings</button>
        </nav>

        <!-- Main Views -->
        <main>
            <!-- Home View -->
            <div id="home-view">
                <section id="countdown-section" class="mb-8">
                    <div class="card rounded-2xl p-6 max-w-2xl mx-auto text-center">
                        <h2 class="text-2xl font-semibold mb-2">Time until <span id="next-prayer-name" class="text-cyan-300">...</span></h2>
                        <div id="countdown-timer" class="text-5xl font-extrabold text-cyan-300 tracking-wider">00:00:00</div>
                    </div>
                </section>

                <!-- Radio Player on Home View -->
                <section id="home-radio-section" class="mb-8">
                    <div class="card rounded-2xl p-6 max-w-2xl mx-auto text-center">
                        <h2 class="text-2xl font-semibold mb-4">Ramadhan World Radio</h2>
                        <button onclick="playRamadhanWorldRadio()" class="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transition transform hover:scale-105">
                            Play Ramadhan World Radio
                        </button>
                        <div id="home-radio-player" class="mt-6 text-center">
                            <h3 id="home-current-station-name" class="text-xl font-bold mb-2 text-cyan-300"></h3>
                            <div id="home-radio-loading-indicator" class="hidden">
                                <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-500 mx-auto"></div>
                                <p class="text-sm mt-2">Loading stream...</p>
                            </div>
                            <audio id="home-radio-audio-player" controls class="w-full rounded-lg" crossorigin="anonymous"></audio>
                        </div>
                    </div>
                </section>
            </div>

            <!-- Qibla View -->
            <div id="qibla-view" class="hidden text-center">
                <div class="card rounded-2xl p-6 max-w-sm mx-auto">
                    <h2 class="text-2xl font-semibold mb-4">Qibla Compass</h2>
                    <div id="compass" class="relative w-64 h-64 mx-auto bg-gray-800 rounded-full flex items-center justify-center border-4 border-gray-700 shadow-xl">
                        <!-- Compass markings (fixed) -->
                        <div class="absolute text-xl font-bold top-2 left-1/2 -translate-x-1/2 text-red-500">N</div>
                        <div class="absolute text-xl font-bold bottom-2 left-1/2 -translate-x-1/2">S</div>
                        <div class="absolute text-xl font-bold left-2 top-1/2 -translate-y-1/2">W</div>
                        <div class="absolute text-xl font-bold right-2 top-1/2 -translate-y-1/2">E</div>
                        
                        <!-- Qibla Marker (the main rotating indicator) -->
                        <div id="qibla-marker" class="absolute w-full h-full flex items-center justify-center">
                            <!-- Green triangle pointing upwards to signify Qibla -->
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="transform -translate-y-1/2">
                                <path d="M12 2L2 22H22L12 2Z" fill="#10B981"/> 
                            </svg>
                        </div>
                    </div>
                    <p id="qibla-direction" class="mt-4 text-lg text-gray-300">Rotate device to align with Qibla.</p>
                    <p class="text-sm text-gray-500 mt-2">Ensure device is flat for accurate reading.</p>
                </div>
            </div>

            <!-- Quran View -->
            <div id="quran-view" class="hidden">
                 <div class="card rounded-2xl p-6 max-w-4xl mx-auto">
                    <h2 class="text-2xl font-semibold mb-4 text-center">The Holy Quran</h2>
                    <div id="quran-surah-list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto pr-2">
                        <!-- Surahs will be populated here -->
                    </div>
                    <div id="quran-player" class="mt-6 text-center hidden">
                        <h3 id="current-surah-name" class="text-xl font-bold mb-2 text-cyan-300"></h3>
                        <audio id="quran-audio-player" controls class="w-full rounded-lg"></audio>
                    </div>
                </div>
            </div>

            <!-- Salah View (formerly Radio View) -->
            <div id="salah-view" class="hidden">
                 <div class="card rounded-2xl p-6 max-w-2xl mx-auto">
                    <h2 class="text-2xl font-semibold mb-4 text-center">Salah Times</h2>
                    <section id="salah-times-section">
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div id="salah-fajr" class="prayer-time card rounded-xl p-4 flex justify-between items-center"><span class="font-semibold text-lg">Fajr</span><span class="text-xl font-mono">--:--</span></div>
                            <div id="salah-sunrise" class="prayer-time card rounded-xl p-4 flex justify-between items-center"><span class="font-semibold text-lg">Sunrise</span><span class="text-xl font-mono">--:--</span></div>
                            <div id="salah-dhuhr" class="prayer-time card rounded-xl p-4 flex justify-between items-center"><span class="font-semibold text-lg">Dhuhr</span><span class="text-xl font-mono">--:--</span></div>
                            <div id="salah-asr" class="prayer-time card rounded-xl p-4 flex justify-between items-center"><span class="font-semibold text-lg">Asr</span><span class="text-xl font-mono">--:--</span></div>
                            <div id="salah-maghrib" class="prayer-time card rounded-xl p-4 flex justify-between items-center"><span class="font-semibold text-lg">Maghrib</span><span class="text-xl font-mono">--:--</span></div>
                            <div id="salah-isha" class="prayer-time card rounded-xl p-4 flex justify-between items-center"><span class="font-semibold text-lg">Isha</span><span class="text-xl font-mono">--:--</span></div>
                        </div>
                    </section>
                </div>
            </div>

            <!-- TV View -->
            <div id="tv-view" class="hidden">
                <!-- Removed max-w-4xl to allow it to take more space -->
                <div class="card rounded-2xl p-6 mx-auto text-center">
                    <h2 class="text-2xl font-semibold mb-4">Ramadhan World TV</h2>
                    <div class="video-container mb-4">
                        <div id="youtube-player"></div>
                    </div>
                    <div class="flex justify-center gap-4 flex-wrap">
                        <!-- Play button removed as per request -->
                        <button id="tv-pause-button" onclick="pauseVideo()" class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full text-lg shadow-lg transition transform hover:scale-105 hidden">
                            <i class="fas fa-pause mr-2"></i>Pause
                        </button>
                        <!-- Fullscreen button removed as per request -->
                    </div>
                </div>
            </div>

            <!-- Settings View -->
            <div id="settings-view" class="hidden">
                <div class="card rounded-2xl p-6 max-w-lg mx-auto">
                    <h2 class="text-2xl font-semibold mb-4">Azan Notifications</h2>
                    <div class="space-y-4">
                        <div>
                            <input type="radio" id="azan-full" name="azan-notification" value="full" class="mr-2" checked>
                            <label for="azan-full">Play full Azan automatically</label>
                        </div>
                        <div>
                            <input type="radio" id="azan-notification" name="azan-notification" value="notification" class="mr-2">
                            <label for="azan-notification">Send a notification only</label>
                        </div>
                        <div>
                            <input type="radio" id="azan-silent" name="azan-notification" value="silent" class="mr-2">
                            <label for="azan-silent">Do not notify (show time only)</label>
                        </div>
                    </div>
                    <button onclick="saveSettings()" class="mt-6 w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg transition">Save Settings</button>
                </div>
            </div>
        </main>

        <!-- Footer -->
        <footer class="text-center mt-12 text-gray-500 text-sm">
            <p>Prayer times by AlAdhan.com API | Quran by Quran.com API</p>
            <p>App developed with love</p>
        </footer>
    </div>
    
    <audio id="azan-audio" src="https://islamic-sound.com/wp-content/uploads/2022/10/azan-2.mp3" preload="auto"></audio>
    <div id="settings-saved-message" class="settings-saved-message hidden">Settings Saved!</div>
    <div id="azan-play-failed-message" class="settings-saved-message hidden bg-red-500">Azan audio blocked by browser. Please interact with the page.</div>

    <!-- YouTube IFrame Player API -->
    <script src="https://www.youtube.com/iframe_api"></script>

    <script>
        // --- DOM Elements & State ---
        const loadingScreen = document.getElementById('loading-screen');
        const mainContent = document.getElementById('main-content');
        const islamicDateEl = document.getElementById('islamic-date');
        const locationEl = document.getElementById('location');
        const nextPrayerNameEl = document.getElementById('next-prayer-name');
        const countdownTimerEl = document.getElementById('countdown-timer');
        
        // Prayer time elements for the Salah view
        const salahPrayerTimeElements = { 
            Fajr: document.querySelector('#salah-fajr span:last-child'), 
            Sunrise: document.querySelector('#salah-sunrise span:last-child'), 
            Dhuhr: document.querySelector('#salah-dhuhr span:last-child'), 
            Asr: document.querySelector('#salah-asr span:last-child'), 
            Maghrib: document.querySelector('#salah-maghrib span:last-child'), 
            Isha: document.querySelector('#salah-isha span:last-child') 
        };

        const views = { 
            home: document.getElementById('home-view'), 
            qibla: document.getElementById('qibla-view'), 
            quran: document.getElementById('quran-view'), 
            salah: document.getElementById('salah-view'), // Renamed from radio
            tv: document.getElementById('tv-view'), // New TV view
            settings: document.getElementById('settings-view') 
        };
        const qiblaDirectionEl = document.getElementById('qibla-direction');
        const qiblaMarker = document.getElementById('qibla-marker');
        const quranSurahList = document.getElementById('quran-surah-list');
        const quranPlayer = document.getElementById('quran-player');
        const quranAudioPlayer = document.getElementById('quran-audio-player');
        const currentSurahName = document.getElementById('current-surah-name');
        
        // Home page radio player elements
        const homeRadioPlayer = document.getElementById('home-radio-player');
        const homeCurrentStationName = document.getElementById('home-current-station-name');
        const homeRadioLoadingIndicator = document.getElementById('home-radio-loading-indicator');
        const homeRadioAudioPlayer = document.getElementById('home-radio-audio-player');

        const azanAudio = document.getElementById('azan-audio');
        const settingsSavedMessage = document.getElementById('settings-saved-message');
        const azanPlayFailedMessage = document.getElementById('azan-play-failed-message');

        // TV player buttons
        // Removed tvPlayButton as per request
        const tvPauseButton = document.getElementById('tv-pause-button');


        let countdownInterval;
        let userCoords = { latitude: 24.8607, longitude: 67.0011 }; // Default: Karachi
        let qiblaAngle = 0; // This will be updated from the API
        let settings = { azanNotification: 'full' };
        let currentPlayingQuranElement = null; // To track the currently playing surah element
        let youtubePlayer; // YouTube player object

        // Only the working radio station
        const radioStations = [
            { name: "Ramadhan World", url: "https://ramadhan786.radioca.st/;" }, 
        ];

        // --- Core Functions ---

        async function initializeApp() {
            loadSettings();
            await getUserLocation();
            populateQuranList();
            // Set initial text for the home radio player
            homeCurrentStationName.textContent = "Ready to play Ramadhan World Radio";
        }

        async function getPrayerTimes(city, country) {
            try {
                const date = new Date();
                const dateString = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
                const apiUrl = `https://api.aladhan.com/v1/timingsByCity/${dateString}?city=${city}&country=${country}&method=2`;

                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error(`API request failed with status ${response.status}`);
                const data = await response.json();

                if (data.code === 200) {
                    displayPrayerTimes(data.data);
                    updateCountdown(data.data.timings);
                    // Update Qibla angle and display it
                    if (data.data.meta && typeof data.data.meta.qibla !== 'undefined') {
                        qiblaAngle = data.data.meta.qibla;
                        qiblaDirectionEl.textContent = `Qibla is at ${qiblaAngle.toFixed(2)}° from North. Rotate your device until the green marker points towards Makkah.`;
                        // Initial Qibla marker rotation
                        // The marker will be rotated by the device orientation in handleOrientation
                    } else {
                        qiblaDirectionEl.textContent = 'Qibla direction not available for this location.';
                        console.warn("Qibla direction not found in API response.");
                    }
                } else {
                    throw new Error('Could not fetch prayer times from the API.');
                }
            } catch (error) {
                console.error("Error fetching prayer times:", error);
                locationEl.textContent = "Could not fetch prayer times. Please try again.";
            } finally {
                hideLoading();
            }
        }

        function getUserLocation() {
            return new Promise((resolve) => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(async (position) => {
                        userCoords = { latitude: position.coords.latitude, longitude: position.coords.longitude };
                        try {
                            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${userCoords.latitude}&lon=${userCoords.longitude}`);
                            const data = await response.json();
                            const city = data.address.city || data.address.town || data.address.village || 'Unknown City';
                            const country = data.address.country || 'Unknown Country';
                            locationEl.textContent = `${city}, ${country}`;
                            await getPrayerTimes(city, country);
                        } catch (error) {
                            locationEl.textContent = "Could not determine city. Using default.";
                            await getPrayerTimes("Karachi", "Pakistan");
                        }
                        resolve();
                    }, async () => {
                        locationEl.textContent = "Location denied. Showing times for Karachi, Pakistan.";
                        await getPrayerTimes("Karachi", "Pakistan");
                        resolve();
                    });
                } else {
                    locationEl.textContent = "Geolocation not supported. Showing times for Karachi, Pakistan.";
                    getPrayerTimes("Karachi", "Pakistan");
                    resolve();
                }
            });
        }
        
        function displayPrayerTimes(data) {
            const timings = data.timings;
            islamicDateEl.textContent = `${data.date.hijri.weekday.en}, ${data.date.hijri.day} ${data.date.hijri.month.en} ${data.date.hijri.year}`;
            
            // Update prayer times in the Salah view
            for (const prayer in salahPrayerTimeElements) {
                if (timings[prayer]) salahPrayerTimeElements[prayer].textContent = formatTime(timings[prayer]);
            }
        }

        function updateCountdown(timings) {
            if (countdownInterval) clearInterval(countdownInterval);
            countdownInterval = setInterval(() => {
                const now = new Date();
                const nextPrayer = findNextPrayer(now, timings);

                if (nextPrayer) {
                    nextPrayerNameEl.textContent = nextPrayer.name;
                    const prayerTime = new Date(now.toDateString() + ' ' + nextPrayer.time);
                    const diff = prayerTime.getTime() - now.getTime();
                    
                    if (diff > 0) {
                        const hours = Math.floor(diff / (1000 * 60 * 60));
                        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                        countdownTimerEl.textContent = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;

                        // Check if it's time for Azan
                        if (hours === 0 && minutes === 0 && seconds === 0) {
                            handleAzan(nextPrayer.name);
                        }
                    } else {
                        // If prayer time has passed, re-fetch times to get next day's timings if needed
                        setTimeout(getUserLocation, 2000); 
                    }
                } else {
                    // All prayers for today have passed, show Fajr for tomorrow
                    nextPrayerNameEl.textContent = 'Fajr (Tomorrow)';
                    const prayerTime = new Date(now.toDateString() + ' ' + timings['Fajr']);
                    prayerTime.setDate(prayerTime.getDate() + 1); // Set to tomorrow's Fajr
                    const diff = prayerTime.getTime() - now.getTime();
                    const hours = Math.floor(diff / (1000 * 60 * 60));
                    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                    countdownTimerEl.textContent = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
                }
            }, 1000);
        }

        function findNextPrayer(now, timings) {
            const prayerOrder = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
            for (const prayerName of prayerOrder) {
                // Ensure timings[prayerName] exists before using it
                if (timings[prayerName]) {
                    const prayerTime = new Date(now.toDateString() + ' ' + timings[prayerName]);
                    if (prayerTime > now) return { name: prayerName, time: timings[prayerName] };
                }
            }
            return null;
        }

        // --- UI & View Management ---

        function showView(viewName) {
            // Pause all media when switching views
            quranAudioPlayer.pause();
            homeRadioAudioPlayer.pause();
            if (youtubePlayer && typeof youtubePlayer.pauseVideo === 'function') {
                youtubePlayer.pauseVideo();
            }

            Object.values(views).forEach(view => view.classList.add('hidden'));
            views[viewName].classList.remove('hidden');
            document.querySelectorAll('.nav-button').forEach(btn => btn.classList.remove('active'));
            document.querySelector(`.nav-button[onclick="showView('${viewName}')"]`).classList.add('active');
            
            if (viewName === 'qibla') {
                startCompass();
            } else {
                stopCompass();
            }

            // If navigating to TV view, attempt to play video
            if (viewName === 'tv' && youtubePlayer) {
                playVideo(); // Attempt to play when TV view is shown
            }
        }

        function hideLoading() {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                mainContent.classList.remove('opacity-0');
            }, 500);
        }
        
        // --- Qibla Compass ---
        
        function startCompass() {
            if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission === 'function') {
                DeviceOrientationEvent.requestPermission()
                    .then(permissionState => {
                        if (permissionState === 'granted') {
                            window.addEventListener('deviceorientation', handleOrientation);
                            qiblaDirectionEl.textContent = `Qibla is at ${qiblaAngle.toFixed(2)}° from North. Rotate your device until the green marker points towards Makkah.`;
                        } else {
                             qiblaDirectionEl.textContent = "Permission for device orientation not granted. Cannot show Qibla direction.";
                        }
                    })
                    .catch(console.error);
            } else if ('ondeviceorientation' in window) {
                window.addEventListener('deviceorientation', handleOrientation);
                qiblaDirectionEl.textContent = `Qibla is at ${qiblaAngle.toFixed(2)}° from North. Rotate your device until the green marker points towards Makkah.`;
            } else {
                qiblaDirectionEl.textContent = "Device orientation not supported on this browser. Cannot show Qibla direction.";
            }
        }
        
        function stopCompass() {
            window.removeEventListener('deviceorientation', handleOrientation);
        }

        function handleOrientation(event) {
            let alpha;
            // Use webkitCompassHeading for iOS, otherwise event.alpha
            if (event.webkitCompassHeading) {
                alpha = event.webkitCompassHeading; // 0-360, true north
            } else if (event.alpha !== null) {
                alpha = event.alpha; // 0-360, relative to device's initial orientation
                // For simplicity and broader compatibility, we'll assume alpha is absolute if available.
            } else {
                qiblaDirectionEl.textContent = "Could not get device heading.";
                return;
            }

            // Rotate the Qibla marker to point towards Qibla relative to the device's current orientation.
            // The qiblaAngle is the Qibla direction relative to True North.
            // Alpha is the device's current heading relative to True North.
            // To make the marker point to Qibla, it needs to rotate by (Qibla Angle - Device Heading).
            qiblaMarker.style.transform = `rotate(${qiblaAngle - alpha}deg)`;

            qiblaDirectionEl.textContent = `Qibla: ${qiblaAngle.toFixed(2)}° from North. Your device is pointing ${alpha.toFixed(2)}° from North. Rotate until the green marker points towards Makkah.`;
        }


        // --- Quran Section ---
        
        async function populateQuranList() {
            try {
                const response = await fetch('https://api.quran.com/api/v4/chapters');
                const { chapters } = await response.json();
                quranSurahList.innerHTML = chapters.map(surah => `
                    <div class="quran-surah cursor-pointer p-3 rounded-lg flex justify-between items-center bg-gray-800 hover:bg-gray-700 transition"
                         onclick="playSurah(${surah.id}, '${surah.name_simple}', this)">
                        <div>
                            <p class="font-semibold">${surah.id}. ${surah.name_simple}</p>
                            <p class="text-sm text-gray-400">${surah.translated_name.name}</p>
                        </div>
                        <div>
                            <i class="fas fa-play text-cyan-400 play-icon"></i>
                            <i class="fas fa-pause text-cyan-400 pause-icon hidden"></i>
                        </div>
                    </div>
                `).join('');
            } catch (error) {
                quranSurahList.innerHTML = `<p class="text-center col-span-full text-red-400">Failed to load Surahs. Please check your internet connection.</p>`;
                console.error("Error fetching Surahs:", error);
            }
        }

        async function playSurah(surahId, surahName, element) {
            try {
                const response = await fetch(`https://api.quran.com/api/v4/chapter_recitations/7/${surahId}`);
                const { audio_file } = await response.json();

                if (!audio_file) {
                    console.error(`No audio file found for Surah ID: ${surahId}`);
                    showTemporaryMessage('Could not find audio for this Surah.'); 
                    return;
                }

                const audioUrl = audio_file.audio_url;

                if (quranAudioPlayer.src === audioUrl && !quranAudioPlayer.paused) {
                    quranAudioPlayer.pause();
                    element.querySelector('.play-icon').classList.remove('hidden');
                    element.querySelector('.pause-icon').classList.add('hidden');
                    currentPlayingQuranElement = null;
                    currentSurahName.textContent = `Paused: ${surahName}`;
                } else {
                    if (currentPlayingQuranElement && currentPlayingQuranElement !== element) {
                        currentPlayingQuranElement.querySelector('.play-icon').classList.remove('hidden');
                        currentPlayingQuranElement.querySelector('.pause-icon').classList.add('hidden');
                    }

                    quranAudioPlayer.src = audioUrl;
                    quranAudioPlayer.load(); 
                    currentSurahName.textContent = `Loading: ${surahName}...`;
                    quranPlayer.classList.remove('hidden');

                    quranAudioPlayer.play().then(() => {
                        currentSurahName.textContent = surahName;
                        element.querySelector('.play-icon').classList.add('hidden');
                        element.querySelector('.pause-icon').classList.remove('hidden');
                        currentPlayingQuranElement = element;
                    }).catch(e => {
                        console.error("Quran audio play failed:", e);
                        showTemporaryMessage('Failed to play Surah. Please try again.');
                        currentSurahName.textContent = `Error playing: ${surahName}`;
                        element.querySelector('.play-icon').classList.remove('hidden');
                        element.querySelector('.pause-icon').classList.add('hidden');
                        currentPlayingQuranElement = null;
                    });
                }
            } catch (error) {
                console.error("Error fetching Surah audio:", error);
                showTemporaryMessage('Failed to play Surah. Please try again.'); 
            }
        }

        quranAudioPlayer.onended = function() {
            if (currentPlayingQuranElement) {
                currentPlayingQuranElement.querySelector('.play-icon').classList.remove('hidden');
                currentPlayingQuranElement.querySelector('.pause-icon').classList.add('hidden');
                currentPlayingQuranElement = null;
                currentSurahName.textContent = "Select a surah";
            }
        };


        // --- Radio Section (now integrated into Home for direct play) ---

        function playRamadhanWorldRadio() {
            const station = radioStations[0]; 
            if (!station) {
                homeCurrentStationName.textContent = "No radio station configured.";
                return;
            }

            homeRadioAudioPlayer.pause();
            homeRadioAudioPlayer.currentTime = 0;

            homeCurrentStationName.textContent = `Loading: ${station.name}...`;
            homeRadioLoadingIndicator.classList.remove('hidden'); 
            homeRadioAudioPlayer.classList.add('hidden'); 

            homeRadioAudioPlayer.src = station.url;
            homeRadioAudioPlayer.load(); 

            homeRadioAudioPlayer.onerror = null; 

            homeRadioAudioPlayer.play().then(() => {
                homeRadioLoadingIndicator.classList.add('hidden'); 
                homeRadioAudioPlayer.classList.remove('hidden'); 
                homeCurrentStationName.textContent = `${station.name} (Playing)`; 
            }).catch(e => {
                console.error("Radio audio play failed (playback error):", e);
                homeRadioLoadingIndicator.classList.add('hidden'); 
                homeRadioAudioPlayer.classList.remove('hidden'); 
                homeCurrentStationName.textContent = `Error playing: ${station.name}. Stream might be down or unsupported.`;
            });

            homeRadioAudioPlayer.onerror = function() {
                console.error("Error loading radio stream (source error):", homeRadioAudioPlayer.error);
                homeRadioLoadingIndicator.classList.add('hidden'); 
                homeRadioAudioPlayer.classList.remove('hidden'); 
                homeCurrentStationName.textContent = `Error: Could not load ${station.name}. Stream might be down or unsupported.`;
            };
        }

        function populateRadioList() {
            // This function is now empty as radio stations are directly handled by playRamadhanWorldRadio
        }

        // --- YouTube TV Section ---
        function onYouTubeIframeAPIReady() {
            youtubePlayer = new YT.Player('youtube-player', {
                height: '360',
                width: '640',
                videoId: 'mU72MeSW5Zs', // Specific video ID
                playerVars: {
                    'playsinline': 1,
                    'autoplay': 0, // No autoplay on load, we'll try to play on view change
                    'controls': 0, // Hide YouTube's controls
                    'rel': 0, // Do not show related videos
                    'showinfo': 0, // Hide video title and uploader info
                    'modestbranding': 1, // Show a modest YouTube logo
                    'listType': 'playlist',
                    'list': 'PL6b_3Yr67_wFpDJfaZLlMEUP6h5EroJi2' // Playlist ID
                },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        }

        function onPlayerReady(event) {
            console.log('YouTube Player is ready.');
            // No initial button state change here, as play button is removed.
            // The pause button visibility is handled by onPlayerStateChange.
        }

        function onPlayerStateChange(event) {
            // Update button visibility based on player state
            if (event.data === YT.PlayerState.PLAYING) {
                // tvPlayButton.classList.add('hidden'); // Play button is removed
                tvPauseButton.classList.remove('hidden');
            } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
                // tvPlayButton.classList.remove('hidden'); // Play button is removed
                tvPauseButton.classList.add('hidden');
            }
        }

        function playVideo() {
            if (youtubePlayer && typeof youtubePlayer.playVideo === 'function') {
                youtubePlayer.playVideo().catch(e => {
                    console.error("YouTube video play failed:", e);
                    showTemporaryMessage('Video playback blocked by browser. Please click the video directly or try again.', true);
                });
            } else {
                console.warn("YouTube player not ready or playVideo function not available.");
            }
        }

        function pauseVideo() {
            if (youtubePlayer && typeof youtubePlayer.pauseVideo === 'function') {
                youtubePlayer.pauseVideo();
            }
        }

        // Fullscreen function removed as per request
        // function toggleFullscreen() { ... }


        // --- Settings & Notifications ---
        
        function saveSettings() {
            settings.azanNotification = document.querySelector('input[name="azan-notification"]:checked').value;
            localStorage.setItem('ramadanAppSettings', JSON.stringify(settings));
            showTemporaryMessage('Settings Saved!');
        }

        function loadSettings() {
            const savedSettings = localStorage.getItem('ramadanAppSettings');
            if (savedSettings) {
                settings = JSON.parse(savedSettings);
                const radioInput = document.querySelector(`input[name="azan-notification"][value="${settings.azanNotification}"]`);
                if (radioInput) {
                    radioInput.checked = true;
                }
            }
        }

        function handleAzan(prayerName) {
            if (settings.azanNotification === 'silent') return;

            if (settings.azanNotification === 'full') {
                azanAudio.play().catch(e => {
                    console.error("Azan audio play failed:", e);
                    showTemporaryMessage('Azan audio blocked by browser. Please interact with the page.', true);
                });
            }

            if (Notification.permission === "granted") {
                new Notification(`It's time for ${prayerName} prayer!`);
            } else if (Notification.permission !== "denied") {
                Notification.requestPermission().then(permission => {
                    if (permission === "granted") {
                        new Notification(`It's time for ${prayerName} prayer!`);
                    }
                });
            }
        }

        function showTemporaryMessage(message, isError = false) {
            settingsSavedMessage.textContent = message;
            if (isError) {
                settingsSavedMessage.classList.add('bg-red-500');
                settingsSavedMessage.classList.remove('bg-green-500');
            } else {
                settingsSavedMessage.classList.remove('bg-red-500');
                settingsSavedMessage.classList.add('bg-green-500');
            }
            settingsSavedMessage.classList.remove('hidden');
            settingsSavedMessage.classList.add('show');
            setTimeout(() => {
                settingsSavedMessage.classList.remove('show');
                settingsSavedMessage.classList.add('hidden');
            }, 5000); 
        }
        
        // --- Utility Functions ---

        function formatTime(time24) {
            const [hour, minute] = time24.split(':');
            const h = parseInt(hour, 10);
            const ampm = h >= 12 ? 'PM' : 'AM';
            const h12 = h % 12 || 12;
            return `${padZero(h12)}:${minute} ${ampm}`;
        }

        function padZero(num) {
            return num < 10 ? '0' + num : num;
        }

        // --- Initial Load ---
        window.addEventListener('load', initializeApp);

    </script>
</body>
</html>
