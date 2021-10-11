cleanId = (obj) => {
    if (Array.isArray(obj))
        obj.forEach(cleanId);
    else {
        if (obj) {
            delete obj['_id'];
            for (let key in obj)
                if (typeof obj[key] == 'object')
                    cleanId(obj[key]);
        }
    }
}
module.exports = {
    cleanId
}