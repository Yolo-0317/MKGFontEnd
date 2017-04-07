/**
 * Created by baymax on 17/3/21.
 */
app.controller('searchCtrl', searchCtrl);

searchCtrl.$injector = ['$scope','searchServer'];

function searchCtrl($scope, searchServer) {
    console.log('searchCtrl');
    var vm = this;

    vm.showWarning = false;

    vm.searchKey = function (key) {
        if(key){
            searchServer.getSearchKey(key)
                .then(function (res) {
                    console.log(res)
                });
            vm.showWarning = false;
        }else{
            vm.showWarning = true;
        }
    };

    vm.cleanNRE = function () {
        vm.senStr = '';
        vm.nerRes.length = 0
    };
    //分词处理
    vm.uploadToCUT = function () {
        vm.cutRes = '';
        searchServer.uploadToCUT(vm.senStrCUT)
            .success(function (res) {
                // console.log(res)
                vm.cutRes = res.res
            })
    };
    //命名实体识别
    vm.uploadToNER = function () {
        console.log(vm.senStr);
        vm.nerRes = [];
        searchServer.uploadToNER(vm.senStrNER)
            .success(function (res) {
                // console.log(res.res)
                res.res.forEach(function (v, i, a) {
                    v.array.forEach(function (v1, i, a) {
                        if(v1){
                            vm.nerRes.push(v1)
                        }
                    })
                });
                console.log(vm.nerRes)
            })
    };
    //实体关系抽取
    vm.uploadToRE = function () {
        vm.reRes = [];
        searchServer.uploadToRE(vm.senStrRE)
            .success(function (res) {
                console.log(res.res)
            })
    }
}