
const lang_selector = document.getElementById('language');
const exam_date_input = document.getElementById('exam_date');
const dl_span = document.getElementById('downloaded_videos');

lang_selector.addEventListener('change', (e) => {

});

exam_date_input.addEventListener('change', (e) => {

});

eel.expose(update_dl_span);
function update_dl_span(d, t) {
    dl_span.innerHTML = `${d}/${t}`;
}

