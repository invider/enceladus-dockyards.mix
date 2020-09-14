function hideCursor() {
    document.body.style.cursor = "none"
}

function downloadJSON(json) {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json))
    const link = document.createElement('a')
    link.setAttribute('href', dataStr)
    link.setAttribute('download', json.name + '.json')
    link.click()
}

function loadFile(file) {
    lab.layout.control.lock()
	let input = file.target

	let reader = new FileReader()
	reader.onload = function(){
        const json = JSON.parse(reader.result)
        trap('upload', json)
	};
	reader.readAsText(input.files[0]);
}

function uploadJSON() {
    lab.control.player.stopAll()
    let input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'text/bas')
    input.setAttribute('onchange', "$.mod['boy-buf'].lib.util.loadFile(event)")
    input.click()
}

function clearCache() {
    if (typeof(Storage) === 'undefined') return
    try {
        window.localStorage.removeItem(env.cfg.storage)
    } catch(e) {
        log.error(e)
    }
}

function loadCache() {
    if (typeof(Storage) === 'undefined') return {}
    try {
        const cache = window.localStorage.getItem(env.cfg.storage)
        return JSON.parse(cache)

    } catch (e) {
        log.error(e)
    }
}

function saveCache(cache) {
    if (typeof(Storage) === 'undefined') return
    try {
        window.setItem(env.cfg.storage, JSON.stringify(cache))

    } catch (e) {
        log.error(e)
    }
}

function saveDesign(blueprint) {
}
