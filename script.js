<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ramadan World App</title>
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
        }
        .prayer-time.active {
            background-color: rgba(6, 182, 212, 0.3);
            border-left-width: 4px;
            border-color: #06B6D4;
        }
        .nav-button.active {
            background-color: #06B6D4;
            color: white;
        }
        #compass-needle {
            transition: transform 0.5s ease-out;
        }
        .quran-surah:hover {
            background-color: rgba(255, 255, 255, 0.15);
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
            <h1 class="text-4xl sm:text-5xl font-bold text-cyan-400">Ramadan World</h1>
            <p id="islamic-date" class="text-lg text-gray-300 mt-2">Loading Islamic Date...</p>
            <p id="location" class="text-md text-gray-400 mt-1">Fetching location...</p>
        </header>

        <!-- Navigation -->
        <nav class="flex justify-center gap-2 mb-6">
            <button onclick="showView('home')" class="nav-button active px-4 py-2 rounded-lg bg-gray-700 hover:bg-cyan-500 transition">Home</button>
            <button onclick="showView('qibla')" class="nav-button px-4 py-2 rounded-lg bg-gray-700 hover:bg-cyan-500 transition">Qibla</button>
            <button onclick="showView('quran')" class="nav-button px-4 py-2 rounded-lg bg-gray-700 hover:bg-cyan-500 transition">Quran</button>
            <button onclick="showView('radio')" class="nav-button px-4 py-2 rounded-lg bg-gray-700 hover:bg-cyan-500 transition">Radio</button>
            <button onclick="showView('settings')" class="nav-button px-4 py-2 rounded-lg bg-gray-700 hover:bg-cyan-500 transition">Settings</button>
        </nav>

        <!-- Main Views -->
        <main>
            <!-- Home View -->
            <div id="home-view">
                <section id="countdown-section" class="mb-8">
                    <div class="card rounded-2xl p-6 max-w-2xl mx-auto text-center">
                        <h2 class="text-2xl font-semibold mb-2">Time until <span id="next-prayer-name">...</span></h2>
                        <div id="countdown-timer" class="text-5xl font-bold text-cyan-300 tracking-wider">00:00:00</div>
                    </div>
                </section>
                <section id="prayer-times-section">
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div id="fajr" class="prayer-time card rounded-xl p-4 flex justify-between items-center"><span class="font-semibold text-lg">Fajr</span><span class="text-xl font-mono">--:--</span></div>
                        <div id="sunrise" class="prayer-time card rounded-xl p-4 flex justify-between items-center"><span class="font-semibold text-lg">Sunrise</span><span class="text-xl font-mono">--:--</span></div>
                        <div id="dhuhr" class="prayer-time card rounded-xl p-4 flex justify-between items-center"><span class="font-semibold text-lg">Dhuhr</span><span class="text-xl font-mono">--:--</span></div>
                        <div id="asr" class="prayer-time card rounded-xl p-4 flex justify-between items-center"><span class="font-semibold text-lg">Asr</span><span class="text-xl font-mono">--:--</span></div>
                        <div id="maghrib" class="prayer-time card rounded-xl p-4 flex justify-between items-center"><span class="font-semibold text-lg">Maghrib</span><span class="text-xl font-mono">--:--</span></div>
                        <div id="isha" class="prayer-time card rounded-xl p-4 flex justify-between items-center"><span class="font-semibold text-lg">Isha</span><span class="text-xl font-mono">--:--</span></div>
                    </div>
                </section>
            </div>

            <!-- Qibla View -->
            <div id="qibla-view" class="hidden text-center">
                <div class="card rounded-2xl p-6 max-w-sm mx-auto">
                    <h2 class="text-2xl font-semibold mb-4">Qibla Compass</h2>
                    <div id="compass" class="relative w-48 h-48 mx-auto bg-gray-800 rounded-full flex items-center justify-center">
                        <div id="compass-needle" class="w-2 h-24 bg-cyan-400 rounded-full absolute top-1/2 left-1/2 -mt-12 -ml-1 transform origin-bottom"></div>
                        <div class="absolute text-xl font-bold top-0 left-1/2 -translate-x-1/2">N</div>
                        <div class="absolute text-xl font-bold bottom-0 left-1/2 -translate-x-1/2">S</div>
                        <div class="absolute text-xl font-bold left-0 top-1/2 -translate-y-1/2">W</div>
                        <div class="absolute text-xl font-bold right-0 top-1/2 -translate-y-1/2">E</div>
                    </div>
                    <p id="qibla-direction" class="mt-4 text-lg">Point device North to calibrate.</p>
                </div>
            </div>

            <!-- Quran View -->
            <div id="quran-view" class="hidden">
                 <div class="card rounded-2xl p-6 max-w-4xl mx-auto">
                    <h2 class="text-2xl font-semibold mb-4 text-center">The Holy Quran</h2>
                    <div id="quran-surah-list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto">
                        <!-- Surahs will be populated here -->
                    </div>
                    <div id="quran-player" class="mt-6 text-center hidden">
                        <h3 id="current-surah-name" class="text-xl font-bold mb-2"></h3>
                        <audio id="quran-audio-player" controls class="w-full"></audio>
                    </div>
                </div>
            </div>

            <!-- Radio View -->
            <div id="radio-view" class="hidden">
                 <div class="card rounded-2xl p-6 max-w-2xl mx-auto">
                    <h2 class="text-2xl font-semibold mb-4 text-center">Islamic Radio</h2>
                    <div id="radio-station-list" class="space-y-3">
                        <!-- Radio stations will be populated here -->
                    </div>
                     <div id="radio-player" class="mt-6 text-center">
                        <h3 id="current-station-name" class="text-xl font-bold mb-2">Select a station</h3>
                        <audio id="radio-audio-player" controls class="w-full"></audio>
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

    <script>
        // --- DOM Elements & State ---
        const loadingScreen = document.getElementById('loading-screen');
        const mainContent = document.getElementById('main-content');
        const islamicDateEl = document.getElementById('islamic-date');
        const locationEl = document.getElementById('location');
        const nextPrayerNameEl = document.getElementById('next-prayer-name');
        const countdownTimerEl = document.getElementById('countdown-timer');
        const prayerTimeElements = { Fajr: document.querySelector('#fajr span:last-child'), Sunrise: document.querySelector('#sunrise span:last-child'), Dhuhr: document.querySelector('#dhuhr span:last-child'), Asr: document.querySelector('#asr span:last-child'), Maghrib: document.querySelector('#maghrib span:last-child'), Isha: document.querySelector('#isha span:last-child') };
        const views = { home: document.getElementById('home-view'), qibla: document.getElementById('qibla-view'), quran: document.getElementById('quran-view'), radio: document.getElementById('radio-view'), settings: document.getElementById('settings-view') };
        const compassNeedle = document.getElementById('compass-needle');
        const qiblaDirectionEl = document.getElementById('qibla-direction');
        const quranSurahList = document.getElementById('quran-surah-list');
        const quranPlayer = document.getElementById('quran-player');
        const quranAudioPlayer = document.getElementById('quran-audio-player');
        const currentSurahName = document.getElementById('current-surah-name');
        const radioStationList = document.getElementById('radio-station-list');
        const radioPlayer = document.getElementById('radio-player');
        const currentStationName = document.getElementById('current-station-name');
        const radioAudioPlayer = document.getElementById('radio-audio-player');
        const azanAudio = document.getElementById('azan-audio');
        
        let countdownInterval;
        let userCoords = { latitude: 24.8607, longitude: 67.0011 }; // Default: Karachi
        let qiblaAngle = 0;
        let settings = { azanNotification: 'full' };

        const radioStations = [
            { name: "Quran Radio - Makkah", url: "https://Qurango.net/radio/tarateel" },
            { name: "Radio Saut-Ul-Quran", url: "https://radiosautulquran.net/live" },
            { name: "Mishary Rashid Alafasy", url: "https://Qurango.net/radio/mishary" },
            { name: "Live Islamic Stream", url: "http://hydra.shoutca.st:8550/;" },
        ];

        // --- Core Functions ---

        async function initializeApp() {
            loadSettings();
            await getUserLocation();
            populateQuranList();
            populateRadioList();
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
                    // FIX: Add a check to ensure qibla data exists before using it
                    if (data.data.meta && typeof data.data.meta.qibla !== 'undefined') {
                        qiblaAngle = data.data.meta.qibla;
                        qiblaDirectionEl.textContent = `Qibla is at ${qiblaAngle.toFixed(2)}° from North.`;
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
            for (const prayer in prayerTimeElements) {
                if (timings[prayer]) prayerTimeElements[prayer].textContent = formatTime(timings[prayer]);
            }
        }

        function updateCountdown(timings) {
            if (countdownInterval) clearInterval(countdownInterval);
            countdownInterval = setInterval(() => {
                const now = new Date();
                const nextPrayer = findNextPrayer(now, timings);

                if (nextPrayer) {
                    nextPrayerNameEl.textContent = nextPrayer.name;
                    highlightNextPrayer(nextPrayer.name);
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
                        setTimeout(getUserLocation, 2000);
                    }
                } else {
                    nextPrayerNameEl.textContent = 'Fajr (Tomorrow)';
                    const prayerTime = new Date(now.toDateString() + ' ' + timings['Fajr']);
                    prayerTime.setDate(prayerTime.getDate() + 1);
                    const diff = prayerTime.getTime() - now.getTime();
                    const hours = Math.floor(diff / (1000 * 60 * 60));
                    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                    countdownTimerEl.textContent = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
                    highlightNextPrayer('Fajr');
                }
            }, 1000);
        }

        function findNextPrayer(now, timings) {
            const prayerOrder = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
            for (const prayerName of prayerOrder) {
                const prayerTime = new Date(now.toDateString() + ' ' + timings[prayerName]);
                if (prayerTime > now) return { name: prayerName, time: timings[prayerName] };
            }
            return null;
        }

        // --- UI & View Management ---

        function showView(viewName) {
            Object.values(views).forEach(view => view.classList.add('hidden'));
            views[viewName].classList.remove('hidden');
            document.querySelectorAll('.nav-button').forEach(btn => btn.classList.remove('active'));
            document.querySelector(`.nav-button[onclick="showView('${viewName}')"]`).classList.add('active');
            
            if (viewName === 'qibla') {
                startCompass();
            } else {
                stopCompass();
            }
        }

        function hideLoading() {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                mainContent.classList.remove('opacity-0');
            }, 500);
        }
        
        function highlightNextPrayer(prayerName) {
            document.querySelectorAll('.prayer-time').forEach(el => el.classList.remove('active'));
            const nextPrayerEl = document.getElementById(prayerName.toLowerCase());
            if (nextPrayerEl) nextPrayerEl.classList.add('active');
        }

        // --- Qibla Compass ---
        
        function startCompass() {
            if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission === 'function') {
                DeviceOrientationEvent.requestPermission()
                    .then(permissionState => {
                        if (permissionState === 'granted') {
                            window.addEventListener('deviceorientation', handleOrientation);
                        } else {
                             qiblaDirectionEl.textContent = "Permission for device orientation not granted.";
                        }
                    })
                    .catch(console.error);
            } else if ('ondeviceorientation' in window) {
                window.addEventListener('deviceorientation', handleOrientation);
            } else {
                qiblaDirectionEl.textContent = "Device orientation not supported on this browser.";
            }
        }
        
        function stopCompass() {
            window.removeEventListener('deviceorientation', handleOrientation);
        }

        function handleOrientation(event) {
            let alpha = event.webkitCompassHeading || event.alpha; // 0-360
            if (alpha === null) {
                qiblaDirectionEl.textContent = "Could not get device heading.";
                return;
            }
            // Rotate the compass needle to point to Qibla
            compassNeedle.style.transform = `rotate(${qiblaAngle - alpha}deg)`;
        }

        // --- Quran Section ---
        
        async function populateQuranList() {
            try {
                const response = await fetch('https://api.quran.com/api/v4/chapters');
                const { chapters } = await response.json();
                quranSurahList.innerHTML = chapters.map(surah => `
                    <div class="quran-surah cursor-pointer p-3 rounded-lg flex justify-between items-center" onclick="playSurah(${surah.id}, '${surah.name_simple}')">
                        <div>
                            <p class="font-semibold">${surah.id}. ${surah.name_simple}</p>
                            <p class="text-sm text-gray-400">${surah.translated_name.name}</p>
                        </div>
                        <i class="fas fa-play text-cyan-400"></i>
                    </div>
                `).join('');
            } catch (error) {
                quranSurahList.innerHTML = `<p class="text-center col-span-full">Failed to load Surahs.</p>`;
                console.error("Error fetching Surahs:", error);
            }
        }

        async function playSurah(surahId, surahName) {
            try {
                const response = await fetch(`https://api.quran.com/api/v4/chapter_recitations/7/${surahId}`);
                const { audio_file } = await response.json();
                if (audio_file) {
                    currentSurahName.textContent = surahName;
                    quranAudioPlayer.src = audio_file.audio_url;
                    quranAudioPlayer.play();
                    quranPlayer.classList.remove('hidden');
                }
            } catch (error) {
                console.error("Error fetching Surah audio:", error);
            }
        }

        // --- Radio Section ---

        function populateRadioList() {
            radioStationList.innerHTML = radioStations.map(station => `
                <div class="quran-surah cursor-pointer p-3 rounded-lg flex justify-between items-center" onclick="playRadio('${station.name}', '${station.url}')">
                    <p class="font-semibold">${station.name}</p>
                    <i class="fas fa-play text-cyan-400"></i>
                </div>
            `).join('');
        }

        function playRadio(name, url) {
            currentStationName.textContent = name;
            radioAudioPlayer.src = url;
            radioAudioPlayer.play();
        }

        // --- Settings & Notifications ---
        
        function saveSettings() {
            settings.azanNotification = document.querySelector('input[name="azan-notification"]:checked').value;
            localStorage.setItem('ramadanAppSettings', JSON.stringify(settings));
            alert('Settings saved!');
        }

        function loadSettings() {
            const savedSettings = localStorage.getItem('ramadanAppSettings');
            if (savedSettings) {
                settings = JSON.parse(savedSettings);
                document.querySelector(`input[name="azan-notification"][value="${settings.azanNotification}"]`).checked = true;
            }
        }

        function handleAzan(prayerName) {
            if (settings.azanNotification === 'silent') return;

            if (settings.azanNotification === 'full') {
                azanAudio.play().catch(e => console.error("Audio play failed:", e));
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
