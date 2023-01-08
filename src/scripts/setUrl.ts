function setUrl(param : string, val:  string): void{
    let url = new URL(window.location.href.replace("#", ""));
    let params = new URLSearchParams(url.search);
    params.set(param, val.replaceAll(" ",""));
    window.location.href = window.location.href.replace(window.location.hash, "") +  "#?" + params.toString()
}

function getParam(val: string): string {
    const urlParams = new URLSearchParams(window.location.href.split("#")[1]);
    return urlParams.get(val) + "".replaceAll("+", " ")
}

export {setUrl, getParam}