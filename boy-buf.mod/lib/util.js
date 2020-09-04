function downloadJSON(json) {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json))
    const link = document.createElement('a')
    link.setAttribute('href', dataStr)
    link.setAttribute('download', json.name + '.json')
    link.click()
}
