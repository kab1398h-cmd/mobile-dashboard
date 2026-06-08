// Modal titles
var modalTitles = {jadawel: '📋 الجداول', tawqeet: '⏰ التوقيت', monaoba: '👤 المناوبة', ishrraf: '🛡️ الإشراف', ithaaah: '🎤 الإذاعة', tullaab: '🎓 الطلاب'};

function openModal(id) {
var m = document.getElementById('app-modal');
var title = document.getElementById('modal-title');
var body = document.getElementById('modal-body');
var subhdr = document.getElementById('modal-subheader');
if(subhdr){subhdr.style.display='none';subhdr.innerHTML='';}
title.textContent = modalTitles[id] || id;
body.innerHTML = '';
if (id === 'jadawel') {
body.style.padding = '0';
body.innerHTML = '<div style="text-align:center;color:#aaa;font-family:Cairo,sans-serif;padding:40px;">📚 جاري تحميل الجداول...</div>';
} else if (id === 'tawqeet') {
body.style.padding = '16px';
body.innerHTML = '<div style="max-width:600px;margin:0 auto;text-align:center;color:#aaa;font-family:Cairo,sans-serif;padding:40px;">⏰ جاري تحميل التوقيتات...</div>';
} else if (id === 'monaoba') {
body.style.padding = '16px';
body.innerHTML = '<div style="max-width:700px;margin:0 auto;text-align:center;color:#aaa;font-family:Cairo,sans-serif;padding:40px;">👤 جاري تحميل بيانات المناوبة...</div>';
} else if (id === 'ishrraf') {
body.style.padding = '16px';
body.innerHTML = '<div style="max-width:700px;margin:0 auto;text-align:center;color:#aaa;font-family:Cairo,sans-serif;padding:40px;">🛡️ جاري تحميل الإشراف...</div>';
} else if (id === 'ithaaah') {
body.style.padding = '0';
body.innerHTML = '<div style="background:#f8fafc;min-height:300px;text-align:center;color:#aaa;font-family:Cairo,sans-serif;padding:40px;">🎤 جاري تحميل الإذاعة...</div>';
} else if (id === 'tullaab') {
body.style.padding = '0';
body.innerHTML = '<div style="display:flex;flex-direction:column;height:100%;font-family:Cairo,sans-serif;direction:rtl;justify-content:center;align-items:center;color:#aaa;padding:40px;">🎓 جاري تحميل بيانات الطلاب...</div>';
} else {
body.style.padding = '32px';
body.innerHTML = '<div style="text-align:center;color:#aaa;font-family:Cairo,sans-serif;font-size:1.1rem;padding:40px;">🚧 سيتم إضافة محتوى هذه النافذة قريباً</div>';
}
m.style.display = 'flex';
document.body.style.overflow = 'hidden';
}

function closeModal() {
document.getElementById('app-modal').style.display = 'none';
document.body.style.overflow = '';
}

document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeModal(); });

// Fix mobile layout
function fixMobileLayout(){
if(window.innerWidth <= 699){
var r = document.getElementById('top-row2');
if(r) r.style.gridTemplateColumns = '1fr';
} else {
var r = document.getElementById('top-row2');
if(r) r.style.gridTemplateColumns = '1fr 1fr 1fr';
}
}
fixMobileLayout();
window.addEventListener('resize', fixMobileLayout);

// Update Manaob
function updateManaob() {
var amEl  = document.getElementById('manaob-am-name');
var samEl = document.getElementById('manaob-sam-name');
if (!amEl || !samEl) return;

var todayKey = getTodayHijriKey();
var amName = '', samName = '';

var allWeeks = Object.keys(manaobData['am']);
for (var wi=0; wi<allWeeks.length; wi++) {
var rows = manaobData['am'][allWeeks[wi]] || [];
for (var i=0; i<rows.length; i++) {
if (rows[i][1] === todayKey) {
amName = rows[i][2]; break;
}
}
if (amName !== '') break;
}

var allWeeks2 = Object.keys(manaobData['sam']);
for (var wi2=0; wi2<allWeeks2.length; wi2++) {
var rows2 = manaobData['sam'][allWeeks2[wi2]] || [];
for (var j=0; j<rows2.length; j++) {
if (rows2[j][1] === todayKey) {
samName = rows2[j][2]; break;
}
}
if (samName !== '') break;
}

if (!amName) {
var lastAm = '';
var allW = Object.keys(manaobData['am']);
for (var a=0; a<allW.length; a++) {
var rr = manaobData['am'][allW[a]] || [];
for (var aa=0; aa<rr.length; aa++) {
if (rr[aa][2]) lastAm = rr[aa][2];
}
}
amName = lastAm;
}
if (!samName) {
var lastSam = '';
var allW2 = Object.keys(manaobData['sam']);
for (var b=0; b<allW2.length; b++) {
var rr2 = manaobData['sam'][allW2[b]] || [];
for (var bb=0; bb<rr2.length; bb++) {
if (rr2[bb][2]) lastSam = rr2[bb][2];
}
}
samName = lastSam;
}

amEl.textContent  = amName  || '--';
samEl.textContent = samName || '--';
amEl.style.color  = '';
samEl.style.color = '#0f3d6e';
}

// Audio unlock
(function() {
var unlocked = false;
function unlockAudio() {
if (unlocked) return;
unlocked = true;
try {
var silent = new Audio();
silent.play().catch(function(){});
} catch(e) {}
document.removeEventListener('touchstart', unlockAudio);
document.removeEventListener('click', unlockAudio);
}
document.addEventListener('touchstart', unlockAudio, {once: true});
document.addEventListener('click', unlockAudio, {once: true});
})();

// Date
var arDays = ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];

function updateDate() {
var now = new Date();
var dayEl    = document.getElementById('hdr-day');
var hijriEl  = document.getElementById('hdr-hijri');
var miladiEl = document.getElementById('hdr-miladi');
if (dayEl) dayEl.textContent = arDays[now.getDay()];
var mD = pad2(now.getDate()), mM = pad2(now.getMonth()+1), mY = now.getFullYear();
if (miladiEl) miladiEl.textContent = mY+'-'+mM+'-'+mD;
if (hijriEl) {
try {
var hFmt = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {year:'numeric',month:'2-digit',day:'2-digit'});
var parts = hFmt.formatToParts(now);
var hY='', hM='', hD='';
parts.forEach(function(p){
if(p.type==='year')  hY = p.value.replace(/[٠-٩]/g,function(d){return d.charCodeAt(0)-1632;});
if(p.type==='month') hM = pad2(parseInt(p.value.replace(/[٠-٩]/g,function(d){return d.charCodeAt(0)-1632;})));
if(p.type==='day')   hD = pad2(parseInt(p.value.replace(/[٠-٩]/g,function(d){return d.charCodeAt(0)-1632;})));
});
hijriEl.textContent = hY+'-'+hM+'-'+hD;
} catch(e) {
hijriEl.textContent = '--';
}
}
}

// Schedule
var allSchedSlots = {
saifi: [{name:'الطابور',  from:420, to:435,  label:'07:00'},{name:'الأولى',   from:435, to:480,  label:'07:15'},{name:'الثانية',  from:480, to:525,  label:'08:00'},{name:'الثالثة',  from:525, to:570,  label:'08:45'},{name:'الفسحة',  from:570, to:585,  label:'09:30'},{name:'الرابعة',  from:585, to:625,  label:'09:45'},{name:'الخامسة', from:625, to:665,  label:'10:25'},{name:'السادسة', from:665, to:705,  label:'11:05'},{name:'السابعة', from:705, to:735,  label:'11:45'}],
shatwi: [{name:'الطابور',  from:465, to:480,  label:'07:45'},{name:'الأولى',   from:480, to:525,  label:'08:00'},{name:'الثانية',  from:525, to:570,  label:'08:45'},{name:'الثالثة',  from:570, to:615,  label:'09:30'},{name:'الفسحة',  from:615, to:630,  label:'10:15'},{name:'الرابعة',  from:630, to:670,  label:'10:30'},{name:'الخامسة', from:670, to:710,  label:'11:10'},{name:'السادسة', from:710, to:750,  label:'11:50'},{name:'السابعة', from:750, to:780,  label:'12:30'}],
ramadan: [{name:'الأولى',   from:570, to:600,  label:'09:30'},{name:'الثانية',  from:600, to:630,  label:'10:00'},{name:'الثالثة',  from:630, to:660,  label:'10:30'},{name:'الرابعة',  from:660, to:690,  label:'11:00'},{name:'الفسحة',  from:690, to:700,  label:'11:30'},{name:'الخامسة', from:700, to:725,  label:'11:40'},{name:'السادسة', from:725, to:750,  label:'12:05'}]
};

var dismissTimes = {saifi:   { normal:'12:15', short:'11:45' }, shatwi:  { normal:'13:00', short:'12:30' }, ramadan: { normal:'12:30', short:'12:30' }};
var schedSlots = allSchedSlots['saifi'];
var activeTawqeet = 'saifi';

function switchTawqeet(t) {
activeTawqeet = t;
schedSlots = allSchedSlots[t];
lessonSchedule = allSchedSlots[t];
updateSchedRows();
var btns = document.querySelectorAll('[id^="tbtn-"]');
for (var i = 0; i < btns.length; i++) {
btns[i].style.background = 'transparent';
btns[i].style.border = '2px solid transparent';
}
var btn = document.getElementById('tbtn-'+t);
if (btn) {
btn.style.background = 'rgba(255,213,79,0.2)';
btn.style.border = '2px solid #fcd34d';
}
}

function updateSchedRows() {
var el = document.getElementById('sched-rows');
if (!el) return;
var now = new Date();
var total = now.getHours() * 60 + now.getMinutes();
var isLongDay = (now.getDay() === 0);
var html = '';
schedSlots.forEach(function(s) {
if (s.name === 'السابعة' && !isLongDay) return;
var state = total >= s.to ? 'done' : (total >= s.from ? 'active' : 'upcoming');
var nameLabel = state === 'active' ? s.name + ' ▶' : s.name;
var activeStyle = state === 'active' ? 'border:2px solid #fcd34d!important;border-radius:8px;' : '';
html += '<div class="prow ' + state + '" style="' + activeStyle + '"><span class="pn">' + nameLabel + '</span><span class="pt">' + s.label + '</span></div>';
});
el.innerHTML = html;
}

function tick() {
const n = new Date();
let h = n.getHours(), m = n.getMinutes();
const ap = h < 12 ? 'صباحاً' : 'مساءً';
if (h === 0) h = 12; else if (h > 12) h -= 12;
const s = String(h).padStart(2,'0')+':'+String(m).padStart(2,'0');
const el = document.getElementById('clock');
const apEl = document.getElementById('clock-ampm');
if (el) el.textContent = s;
if (apEl) apEl.textContent = ap;
}

var lessonSchedule = allSchedSlots['saifi'];

function getCurrentLesson() {
var now = new Date();
var total = now.getHours() * 60 + now.getMinutes();
var sec = now.getSeconds();
for (var i = 0; i < lessonSchedule.length; i++) {
var s = lessonSchedule[i];
if (total >= s.from && total < s.to) {
var remSec = (s.to - total) * 60 - sec;
var dur = (s.to - s.from) * 60;
var elapsed = dur - remSec;
var pct = Math.min(100, Math.round((elapsed / dur) * 100));
return {lesson: s.name, remSec: remSec, pct: pct};
}
}
if (total < 420) return {lesson:'قبل الدوام', remSec:0, pct:0};
return {lesson:'انتهى الدوام', remSec:0, pct:100};
}

function updateCurrentLesson() {
var r = getCurrentLesson();
var isFree = r.lesson === 'الفسحة';
var isOff  = r.lesson === 'قبل الدوام' || r.lesson === 'انتهى الدوام';

var nameEl = document.getElementById('lesson-name');
if (nameEl) {
var icon = isFree ? '🏃 ' : (r.lesson === 'الطابور' ? '📢 ' : '');
nameEl.textContent = (isOff ? '' : icon) + r.lesson;
}

var minEl = document.getElementById('lesson-min');
var secEl = document.getElementById('lesson-sec');
if (minEl && secEl) {
if (r.remSec > 0) {
var mm = Math.floor(r.remSec / 60);
var ss = String(r.remSec % 60).padStart(2,'0');
var col = r.remSec <= 120 ? '#e74c3c' : (isFree ? '#e07b2a' : '#fcd34d');
minEl.textContent = mm;
minEl.style.color = col;
secEl.textContent = ss;
secEl.style.color = col;
} else {
minEl.textContent = '--';
secEl.textContent = '--';
minEl.style.color = 'rgba(255,255,255,0.5)';
secEl.style.color = 'rgba(255,255,255,0.5)';
}
}

var bar = document.getElementById('prog-bar');
var dot = document.getElementById('prog-dot');
if (bar) bar.style.width = r.pct + '%';
if (dot) dot.style.left = r.pct + '%';
}

tick();
updateCurrentLesson();
updateSchedRows();
updateDate();
updateManaob();

// Sound system
var bellSounds = {'الطابور': '', 'الأولى': '', 'الثانية': '', 'الثالثة': '', 'الفسحة': '', 'الرابعة': '', 'الخامسة': '', 'السادسة': '', 'السابعة': '', 'نهاية_الدوام': ''};
var _currentAudio = null;
var _soundEnabled = true;
var _lastLesson = '';

function playBell(lessonName) {
if (!_soundEnabled) return;
try {
var src = bellSounds[lessonName];
if (!src) return;
if (_currentAudio) { _currentAudio.pause(); _currentAudio.currentTime = 0; }
_currentAudio = new Audio(src);
_currentAudio.play();
} catch(e) { console.log('Audio error:', e); }
}

function toggleSound() {
_soundEnabled = !_soundEnabled;
var btn = document.getElementById('sound-btn');
if (btn) {
btn.textContent = _soundEnabled ? '🔔' : '🔕';
btn.title = _soundEnabled ? 'إيقاف الجرس' : 'تفعيل الجرس';
btn.style.background = 'transparent';
}
if (_soundEnabled) {
try {
var testAudio = new Audio();
testAudio.play().catch(function(){});
} catch(e) {}
playBell('الطابور');
}
}

function checkBellAlert() {
var r = getCurrentLesson();
if (r.lesson !== _lastLesson) {
if (_soundEnabled && _lastLesson !== '' && r.lesson !== 'قبل الدوام') {
if (r.lesson === 'انتهى الدوام') {
var day = new Date().getDay();
if ((day === 0 && _lastLesson === 'السابعة') || (day !== 0 && _lastLesson === 'السادسة')) {
playBell('نهاية_الدوام');
}
} else {
playBell(r.lesson);
}
}
_lastLesson = r.lesson;
}
}

setInterval(function(){ tick(); updateCurrentLesson(); updateSchedRows(); updateDate(); updateManaob(); checkBellAlert(); }, 1000);

// Placeholder functions
function openGradeSheet() { openModal('tullaab'); }
function showTeachersForPeriod(period) { alert('فترة: ' + period); }