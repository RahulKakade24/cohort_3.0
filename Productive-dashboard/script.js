"use strict";

// --- Core Utilities ---
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

const store = {
    get: (key, fallback) => JSON.parse(localStorage.getItem(key)) ?? fallback,
    set: (key, val) => localStorage.setItem(key, JSON.stringify(val))
};

const toast = (msg, type = 'info') => {
    const el = document.createElement('div');
    const colors = {
        info: 'border-indigo-500 bg-slate-900',
        success: 'border-emerald-500 bg-slate-900',
        error: 'border-rose-500 bg-slate-900'
    };
    el.className = `pointer-events-auto border-l-4 p-4 rounded-xl shadow-xl transition-all transform translate-x-full ${colors[type]}`;
    el.innerHTML = `<p class="text-sm font-bold text-white">${msg}</p>`;
    $('#toast-container').appendChild(el);
    setTimeout(() => el.classList.remove('translate-x-full'), 10);
    setTimeout(() => {
        el.classList.add('opacity-0', 'translate-y-[-20px]');
        setTimeout(() => el.remove(), 500);
    }, 3000);
};

const confirmModal = (options) => {
    return new Promise((resolve) => {
        const backdrop = $('#modal-backdrop');
        $('#modal-title').textContent = options.title || 'Are you sure?';
        $('#modal-desc').textContent = options.desc || 'Proceed with caution.';
        $('#modal-confirm').textContent = options.confirmText || 'Confirm';
        
        backdrop.classList.replace('hidden', 'flex');

        const cleanUp = (res) => {
            backdrop.classList.replace('flex', 'hidden');
            resolve(res);
        };

        $('#modal-confirm').onclick = () => cleanUp(true);
        $('#modal-cancel').onclick = () => cleanUp(false);
    });
};

// --- Navigation Controller ---
const initNavigation = () => {
    const navLinks = $$('.nav-link');
    const panels = $$('.view-panel');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const target = link.dataset.target;
            
            navLinks.forEach(l => l.classList.remove('active', 'text-white'));
            panels.forEach(p => p.classList.remove('active'));

            $$(`.nav-link[data-target="${target}"]`).forEach(l => l.classList.add('active', 'text-white'));
            $(`#${target}`).classList.add('active');
        });
    });
};

// --- Theme Controller ---
const initTheme = () => {
    const btn = $('#theme-toggle');
    const icon = $('#theme-icon');
    const text = $('#theme-text');
    const root = document.documentElement;

    const apply = (theme) => {
        root.setAttribute('data-theme', theme);
        const isDark = theme === 'dark';
        icon.className = isDark ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
        text.textContent = isDark ? 'Dark Mode' : 'Light Mode';
        store.set('ph_theme', theme);
        updateChartTheme();
    };

    apply(store.get('ph_theme', 'dark'));
    btn.onclick = () => apply(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
};

// --- Productivity Chart ---
let pChart;
const initChart = () => {
    const ctx = $('#productivityChart').getContext('2d');
    pChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Tasks', 'Goals', 'Focus'],
            datasets: [{
                label: 'Completion %',
                data: [0, 0, 0],
                backgroundColor: '#6366f1',
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { 
                    beginAtZero: true, 
                    max: 100, 
                    grid: { color: 'rgba(255,255,255,0.05)' },
                    ticks: { color: '#64748b' }
                },
                x: { 
                    grid: { display: false },
                    ticks: { color: '#64748b' }
                }
            }
        }
    });
};

const updateChartTheme = () => {
    if (!pChart) return;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const color = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
    const tickColor = isDark ? '#64748b' : '#94a3b8';
    
    pChart.options.scales.y.grid.color = color;
    pChart.options.scales.y.ticks.color = tickColor;
    pChart.options.scales.x.ticks.color = tickColor;
    pChart.update();
};

const refreshStats = () => {
    const tasks = store.get('ph_tasks', []);
    const goals = store.get('ph_goals', []);
    
    const taskRate = tasks.length ? (tasks.filter(t => t.completed).length / tasks.length) * 100 : 0;
    const goalRate = goals.length ? (goals.filter(g => g.completed).length / goals.length) * 100 : 0;
    const sessions = store.get('ph_focus_count', 0);
    const focusRate = Math.min((sessions / 8) * 100, 100);

    pChart.data.datasets[0].data = [taskRate, goalRate, focusRate];
    pChart.update();
};

// --- Task Controller ---
const TaskManager = (() => {
    let tasks = store.get('ph_tasks', []);
    let filter = 'all';

    const render = () => {
        const list = $('#todo-list');
        list.innerHTML = '';
        
        const filtered = tasks.filter(t => {
            if(filter === 'active') return !t.completed;
            if(filter === 'completed') return t.completed;
            return true;
        });

                if(!filtered.length) {
                    list.innerHTML = `<div class="py-10 text-center text-slate-500 font-medium">No tasks found.</div>`;
                    return;
                }

                filtered.forEach(task => {
                    const el = document.createElement('div');
                    el.className = `group flex items-center gap-4 bg-slate-800/40 p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all ${task.completed ? 'opacity-50' : ''}`;
                    el.innerHTML = `
                        <input type="checkbox" ${task.completed ? 'checked' : ''} class="w-6 h-6 rounded-lg bg-slate-900 border-slate-700 text-indigo-600 focus:ring-indigo-500 cursor-pointer">
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center gap-2">
                                <h4 class="text-sm font-bold text-white truncate ${task.completed ? 'line-through' : ''}">${task.title}</h4>
                                ${task.priority ? '<span class="bg-rose-500/10 text-rose-500 text-[9px] font-black uppercase px-2 py-0.5 rounded-md">Urgent</span>' : ''}
                            </div>
                            <p class="text-xs text-slate-500 truncate mt-0.5">${task.desc || 'No details provided'}</p>
                        </div>
                        <button class="delete-btn opacity-0 group-hover:opacity-100 p-2 text-slate-600 hover:text-rose-500 transition-all">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    `;

                    el.querySelector('input').onclick = () => toggle(task.id);
                    el.querySelector('.delete-btn').onclick = () => remove(task.id);
                    list.appendChild(el);
                });
                refreshStats();
            };

            const toggle = (id) => {
                tasks = tasks.map(t => t.id === id ? {...t, completed: !t.completed} : t);
                save();
            };

            const remove = async (id) => {
                if(await confirmModal({ title: 'Delete Task?', desc: 'This will remove the item permanently.' })) {
                    tasks = tasks.filter(t => t.id !== id);
                    save();
                    toast('Task removed', 'success');
                }
            };

            const save = () => {
                store.set('ph_tasks', tasks);
                render();
            };

            return {
                init: () => {
                    $('#todo-form').onsubmit = (e) => {
                        e.preventDefault();
                        const title = $('#todo-title').value.trim();
                        if(!title) return toast('Please enter a title', 'error');
                        
                        tasks.push({
                            id: crypto.randomUUID(),
                            title,
                            desc: $('#todo-desc').value.trim(),
                            priority: $('#todo-priority').checked,
                            completed: false,
                            date: new Date()
                        });
                        $('#todo-form').reset();
                        save();
                        toast('Task added', 'success');
                    };

                    $('#todo-filters').onclick = (e) => {
                        const btn = e.target.closest('button');
                        if(!btn) return;
                        filter = btn.dataset.filter;
                        $$('#todo-filters button').forEach(b => b.className = 'px-5 py-2 text-sm font-bold rounded-lg text-slate-400 hover:text-white transition-all');
                        btn.className = 'px-5 py-2 text-sm font-bold rounded-lg transition-all bg-indigo-600 text-white shadow-sm';
                        render();
                    };

                    $('#clear-completed').onclick = async () => {
                        if(await confirmModal({title: 'Clear Done Tasks?', desc: 'Remove all finished items from list?'})) {
                            tasks = tasks.filter(t => !t.completed);
                            save();
                        }
                    };

                    render();
                }
            };
        })();

        // --- Planner Controller ---
        const PlannerManager = (() => {
            let data = store.get('ph_planner', {});

            const render = () => {
                const grid = $('#planner-grid');
                grid.innerHTML = '';
                for(let h=6; h<=23; h++) {
                    const time = h > 12 ? `${h-12} PM` : h === 12 ? `12 PM` : `${h} AM`;
                    const row = document.createElement('div');
                    row.className = 'flex items-center group';
                    row.innerHTML = `
                        <div class="w-24 text-center py-5 text-[11px] font-bold text-slate-500 bg-slate-900/30 border-r border-slate-800 shrink-0 uppercase tracking-tighter">${time}</div>
                        <input type="text" value="${data[h] || ''}" placeholder="Focus objective..." class="flex-1 bg-transparent px-6 py-5 text-sm text-white outline-none focus:bg-indigo-600/5 transition-all">
                    `;
                    row.querySelector('input').onchange = (e) => {
                        data[h] = e.target.value.trim();
                        store.set('ph_planner', data);
                    };
                    grid.appendChild(row);
                }
            };

            return {
                init: () => {
                    $('#clear-planner').onclick = async () => {
                        if(await confirmModal({title: 'Reset Planner?', desc: 'Clear all entries for today?'})) {
                            data = {};
                            store.set('ph_planner', data);
                            render();
                            toast('Day reset', 'success');
                        }
                    };
                    render();
                }
            };
        })();

        // --- Timer Controller ---
        const TimerManager = (() => {
            let time = 1500;
            let timer = null;
            let currentMode = 'focus';

            const updateDisplay = () => {
                const m = Math.floor(time / 60).toString().padStart(2, '0');
                const s = (time % 60).toString().padStart(2, '0');
                $('#timer-display').textContent = `${m}:${s}`;
                document.title = timer ? `${m}:${s} - Working` : 'ProductiveHub';
            };

            const switchMode = (mode, mins) => {
                clearInterval(timer);
                timer = null;
                currentMode = mode;
                time = mins * 60;
                updateDisplay();
                
                $$('#timer-modes button').forEach(b => b.className = 'px-8 py-3 text-sm font-bold rounded-xl text-slate-400 transition-all');
                $(`#timer-modes button[data-mode="${mode}"]`).className = 'px-8 py-3 text-sm font-bold rounded-xl transition-all bg-indigo-600 text-white';
                
                $('#timer-start').hidden = false;
                $('#timer-pause').hidden = true;
            };

            const renderDots = () => {
                const count = store.get('ph_focus_count', 0) % 4;
                $('#timer-dots').innerHTML = '';
                for(let i=0; i<4; i++) {
                    const dot = document.createElement('div');
                    dot.className = `w-2.5 h-2.5 rounded-full ${i < count ? 'bg-indigo-500 shadow-lg shadow-indigo-500/50' : 'bg-slate-800'}`;
                    $('#timer-dots').appendChild(dot);
                }
            };

            return {
                init: () => {
                    $('#timer-start').onclick = () => {
                        $('#timer-start').hidden = true;
                        $('#timer-pause').hidden = false;
                        timer = setInterval(() => {
                            time--;
                            if(time <= 0) {
                                clearInterval(timer);
                                new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg').play();
                                if(currentMode === 'focus') {
                                    store.set('ph_focus_count', store.get('ph_focus_count', 0) + 1);
                                    renderDots();
                                    refreshStats();
                                    toast('Session Complete!', 'success');
                                }
                                switchMode('focus', 25);
                            }
                            updateDisplay();
                        }, 1000);
                    };

                    $('#timer-pause').onclick = () => {
                        clearInterval(timer);
                        timer = null;
                        $('#timer-start').hidden = false;
                        $('#timer-pause').hidden = true;
                    };

                    $('#timer-reset').onclick = () => switchMode(currentMode, time / 60);

                    $('#timer-modes').onclick = (e) => {
                        const b = e.target.closest('button');
                        if(b) switchMode(b.dataset.mode, parseInt(b.dataset.mins));
                    };

                    renderDots();
                    updateDisplay();
                }
            };
        })();

        // --- Goals Controller ---
        const GoalManager = (() => {
            let goals = store.get('ph_goals', []);

            const render = () => {
                const list = $('#goal-list');
                list.innerHTML = '';
                goals.forEach(goal => {
                    const el = document.createElement('div');
                    el.className = `p-6 rounded-3xl border transition-all ${goal.completed ? 'bg-emerald-900/10 border-emerald-500/30' : 'bg-slate-800 border-slate-700'}`;
                    el.innerHTML = `
                        <div class="flex justify-between items-start mb-4">
                            <h4 class="text-sm font-bold text-white ${goal.completed ? 'line-through text-emerald-500' : ''}">${goal.title}</h4>
                            <button class="goal-del text-slate-600 hover:text-rose-500"><i class="fa-solid fa-xmark"></i></button>
                        </div>
                        <p class="text-xs text-slate-500 mb-6">${goal.desc || 'Progressing...'}</p>
                        <button class="goal-toggle w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${goal.completed ? 'bg-emerald-500/20 text-emerald-500' : 'bg-slate-900 text-slate-400 hover:text-white'}">
                            ${goal.completed ? 'Achieved' : 'Mark Achieved'}
                        </button>
                    `;
                    el.querySelector('.goal-toggle').onclick = () => {
                        goal.completed = !goal.completed;
                        save();
                    };
                    el.querySelector('.goal-del').onclick = async () => {
                        if(await confirmModal({title: 'Discard Goal?', desc: 'Remove this milestone?'})) {
                            goals = goals.filter(g => g.id !== goal.id);
                            save();
                        }
                    };
                    list.appendChild(el);
                });
                refreshStats();
            };

            const save = () => {
                store.set('ph_goals', goals);
                render();
            };

            return {
                init: () => {
                    $('#goal-form').onsubmit = (e) => {
                        e.preventDefault();
                        const title = $('#goal-title').value.trim();
                        if(!title) return toast('Specify a goal', 'error');
                        goals.push({ id: crypto.randomUUID(), title, desc: $('#goal-desc').value.trim(), completed: false });
                        $('#goal-form').reset();
                        save();
                    };
                    render();
                }
            };
        })();

        // --- Weather & Clock Logic ---
        const initClock = () => {
            const update = () => {
                const now = new Date();
                const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                const heroTimeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
                const heroDateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

                if($('#live-time')) $('#live-time').textContent = timeStr;
                if($('#header-date')) $('#header-date').textContent = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                if($('#hero-clock')) $('#hero-clock').textContent = heroTimeStr;
                if($('#hero-date')) $('#hero-date').textContent = heroDateStr;
            };
            setInterval(update, 1000);
            update();
        };

        const initWeather = () => {
            const KEY = "cb50f804ace4abc1b1b8de9ed5da6602";
            const updateUI = (data) => {
                $('#w-location').textContent = `${data.name}, ${data.sys.country}`;
                $('#w-temp').textContent = `${Math.round(data.main.temp)}°`;
                $('#w-feels').textContent = `${Math.round(data.main.feels_like)}°`;
                $('#w-humidity').textContent = `${data.main.humidity}%`;
                $('#w-wind').textContent = `${Math.round(data.wind.speed * 3.6)}`;
                $('#w-condition').textContent = data.weather[0].main;
                $('#w-updated').textContent = `Sync: ${new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}`;
                $('#w-retry').hidden = true;
            };

            const fetchWeather = (lat, lon) => {
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${KEY}&units=metric`)
                    .then(r => r.json())
                    .then(updateUI)
                    .catch(() => $('#w-retry').hidden = false);
            };

            const locate = () => {
                navigator.geolocation.getCurrentPosition(
                    p => fetchWeather(p.coords.latitude, p.coords.longitude),
                    () => $('#w-location').textContent = "Location Denied"
                );
            };

            $('#w-retry').onclick = locate;
            locate();
        };

        // --- Quotes Logic ---
        const initQuotes = () => {
            const quotes = [
                
    { t: "Success is the sum of small efforts repeated day after day.", a: "Robert Collier" },
    { t: "Dream big. Start small. Act now.", a: "Robin Sharma" },
    { t: "Action is the foundational key to all success.", a: "Pablo Picasso" },
    { t: "Don't watch the clock; do what it does. Keep going.", a: "Sam Levenson" },
    { t: "The future depends on what you do today.", a: "Mahatma Gandhi" },
    { t: "Great things never come from comfort zones.", a: "Unknown" },
    { t: "Small progress is still progress.", a: "Unknown" },
    { t: "Push yourself because no one else is going to do it for you.", a: "Unknown" },
    { t: "Success begins with self-discipline.", a: "Unknown" },
    { t: "The secret of getting ahead is getting started.", a: "Mark Twain" },
    { t: "Your only limit is your mind.", a: "Unknown" },
    { t: "Stay focused and never give up.", a: "Unknown" },
    { t: "Consistency beats motivation.", a: "Unknown" },
    { t: "Done is better than perfect.", a: "Sheryl Sandberg" },
    { t: "Hard work beats talent when talent doesn't work hard.", a: "Tim Notke" },
    { t: "Success is earned, not given.", a: "Unknown" },
    { t: "Every accomplishment starts with the decision to try.", a: "John F. Kennedy" },
    { t: "You don't have to be great to start, but you have to start to be great.", a: "Zig Ziglar" },
    { t: "Believe you can and you're halfway there.", a: "Theodore Roosevelt" },
    { t: "The best way out is always through.", a: "Robert Frost" },
    { t: "Difficult roads often lead to beautiful destinations.", a: "Unknown" },
    { t: "Stay patient and trust your journey.", a: "Unknown" },
    { t: "Success is built one day at a time.", a: "Unknown" },
    { t: "Progress, not perfection.", a: "Unknown" },
    { t: "Be stronger than your excuses.", a: "Unknown" },
    { t: "Discipline creates freedom.", a: "Jocko Willink" },
    { t: "Work hard in silence. Let success make the noise.", a: "Frank Ocean" },
    { t: "If it matters to you, you'll find a way.", a: "Charlie Gilkey" },
    { t: "A little progress each day adds up to big results.", a: "Satya Nani" },
    { t: "Success is a journey, not a destination.", a: "Arthur Ashe" },
    { t: "The harder you work, the luckier you get.", a: "Gary Player" },
    { t: "Do something today your future self will thank you for.", a: "Unknown" },
    { t: "Stay hungry. Stay foolish.", a: "Steve Jobs" },
    { t: "Opportunities don't happen. You create them.", a: "Chris Grosser" },
    { t: "The expert in anything was once a beginner.", a: "Helen Hayes" },
    { t: "Your habits shape your future.", a: "Unknown" },
    { t: "Success comes to those who never stop learning.", a: "Unknown" },
    { t: "Every day is a chance to become better.", a: "Unknown" },
    { t: "One task at a time. One step at a time.", a: "Unknown" },
    { t: "Don't wait for opportunity. Create it.", a: "George Bernard Shaw" },
    { t: "Make today count.", a: "Unknown" },
    { t: "The key to success is consistency.", a: "Unknown" },
    { t: "Your future is created by what you do today.", a: "Robert Kiyosaki" },
    { t: "Stay committed to your goals.", a: "Unknown" },
    { t: "Productivity is never an accident.", a: "Paul J. Meyer" },
    { t: "Success is built on daily discipline.", a: "Unknown" },
    { t: "Be fearless in the pursuit of what sets your soul on fire.", a: "Jennifer Lee" },
    { t: "Keep moving forward, no matter how small the step.", a: "Unknown" },
    { t: "The only impossible journey is the one you never begin.", a: "Tony Robbins" },
    { t: "Today's effort is tomorrow's achievement.", a: "Unknown" }
];
            

            const refresh = () => {
                const q = quotes[Math.floor(Math.random() * quotes.length)];
                $('#quote-text').textContent = `"${q.t}"`;
                $('#quote-author').textContent = `— ${q.a}`;
            };

            $('#new-quote').onclick = refresh;
            $('#copy-quote').onclick = () => {
                navigator.clipboard.writeText(`${$('#quote-text').textContent} ${$('#quote-author').textContent}`);
                toast('Copied to clipboard', 'success');
            };
        };

   
        window.addEventListener('DOMContentLoaded', () => {
            initNavigation();
            initTheme();
            initClock();
            initChart();
            TaskManager.init();
            PlannerManager.init();
            TimerManager.init();
            GoalManager.init();
            initWeather();
            initQuotes();
        });
