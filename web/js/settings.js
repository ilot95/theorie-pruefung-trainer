
const lang_selector = document.getElementById('language');
const exam_date_input = document.getElementById('exam_date');
const dl_span = document.getElementById('downloaded_videos');
const dl_button = document.getElementById('dl_button');
var cancelled = false;

lang_selector.addEventListener('change', (e) => {
    eel.update_lang(lang_selector.value)();
});

exam_date_input.addEventListener('change', (e) => {
    eel.update_exam_date(exam_date_input.value)();
});

eel.expose(update_dl_span);
function update_dl_span(s) {
    dl_span.innerHTML = s;
}

function init_page() {
    eel.get_dl_videos()().then((s) => {
        update_dl_span(s);
    });

    eel.get_exam_date()().then((s) => {
        exam_date_input.value = s
    });

    eel.get_supported_langs()().then((d) => {
        for (const [key, value] of Object.entries(d)) {
            const option = document.createElement('option');
            option.value = key;
            option.innerHTML = value;
            lang_selector.appendChild(option);
        }    
        
        eel.get_selected_lang()().then((s) => {
            lang_selector.value = s;
        });
    });

}

function dl_rm(){
    r = confirm("This will remove all downloaded videos. Are you sure?");
    if (!r) return;
    eel.rm_dl_videos()().then((s) => {
        update_dl_span(s);
    });
}

function dl_all(){
    dl_button.innerHTML = "Cancel";
    dl_button.onclick = cancel_button;
    eel.dl_all_videos()();
}

function cancel_button(){
    set_cancelled(false);
    dl_button.innerHTML = "Cancelling...";
    dl_button.onclick = dl_all;
}

eel.expose(cancel_success);
function cancel_success(){
    dl_button.innerHTML = "Download All";
}

eel.expose(set_cancelled);
function set_cancelled(s){
    cancelled = s;
}

eel.expose(get_cancelled);
function get_cancelled(){
    return dl_button.innerHTML == "Cancelling...";
}

function update_db(){
    eel.update_db()();
}

function reset_progress(){
    r = confirm("This will reset all progress. Are you sure?");
    if (!r) return;
    eel.reset_progress()();
}

document.addEventListener('DOMContentLoaded', function() {
    init_page();
});
