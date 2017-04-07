/**
 * Created by baymax on 17/3/2.
 */
app.service('infoServer', infoServer);
app.service('searchServer', searchServer);
app.service('manageServer', manageServer);

infoServer.$injector = ['$http'];
searchServer.$injector = ['$http'];
manageServer.$injector = ['$http', 'Upload'];

// var baseUrl = 'http://118.89.146.26:8082';
var baseUrl = 'http://localhost:8080';

//介绍页面服务
function infoServer($http) {
    var getAllInfo = function(){
        return(
            $http.get(baseUrl + '/getAllInfo')
        )
    };
    var getAllNodes = function(){
        return(
            $http.get(baseUrl + '/getAllNodes')
        )
    };
    var getAllRelations = function () {
        return(
            $http.get(baseUrl + '/getAllRelations')
        )
    };
    return {
        getAllInfo: getAllInfo,
        getAllNodes: getAllNodes,
        getAllRelations: getAllRelations
    }
}

//应用页面服务
function searchServer($http) {
    var getSearchKey = function(key){
        return(
            $http.get(baseUrl + '/getSearchKey?key=' + key)
        )
    };
    var uploadToCUT = function (senStr) {
        return(
            $http.post(baseUrl + '/uploadToCUT', {senStr: senStr})
        )
    };
    var uploadToNER = function (senStr) {
        return(
            $http.post(baseUrl + '/uploadToNER', {senStr: senStr})
        )
    };
    var uploadToRE = function (senStr) {
        return(
            $http.post(baseUrl + '/uploadToRE', {senStr: senStr})
        )
    };
    return{
        getSearchKey: getSearchKey,
        uploadToCUT: uploadToCUT,
        uploadToNER: uploadToNER,
        uploadToRE: uploadToRE
    }
}

//管理页面服务
function manageServer($http, Upload) {
    var uploadFile = function(file){
        return(
            Upload.upload({
                url: 'http://localhost:8080/uploadFile',
                data: {file: file}
            })
        )
    };
    return{
      uploadFile: uploadFile
    }
}