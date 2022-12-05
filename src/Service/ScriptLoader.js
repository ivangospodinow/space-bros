class ScriptLoader {

    loadFromSrc = (src) => {
        var tag = document.createElement('script');
        tag.async = false;
        tag.src = src;
        document.body.appendChild(tag);
    }

    load = (list, callback) => {
        list.forEach(scriptUrl => {
            import('../Game/js/' + scriptUrl);
        });


    }


}


export default new ScriptLoader;