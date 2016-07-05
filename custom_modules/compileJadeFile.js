module.exports = (function(){
    var jade = require('jade');
    compileWithObject = function(jadeFile, compileData){
        var html =  jade.renderFile(jadeFile, compileData);
        return html
    };
    compileWithArray = function(jadeFile, compileArray){
        var html =  jade.renderFile(jadeFile, compileArray);
        return html

    };
    return {
        withObject : compileWithObject,
        withArray : compileWithArray
    }
})();