/**
 * Created by baymax on 17/3/2.
 */
app.controller('navCtrl', navCtrl);
app.controller('introCtrl', introCtrl);
app.controller('manageCtrl', manageCtrl);
app.controller('apiCtrl', apiCtrl);

navCtrl.$injector = ['$scope'];
function navCtrl($scope) {
    console.log('navCtrl');
    var vm = this;
    vm.showSideBar = true;
    vm.toggle = function () {
        vm.showSideBar = !vm.showSideBar;
    }
}

introCtrl.$injector = ['$scope','$http', 'infoServer', 'searchServer'];
function introCtrl($scope, $http, infoServer, searchServer) {
    console.log('infoCtrl');
    var vm = this;

    //先设置一个大数组，然后根据 node 的 id，作为数组的索引，替换掉对应索引处的 node 的 name，关系直接从后台获取
    infoServer.getAllNodes().success(function (res) {
        vm.totalNodeNum = res.res.totalNum;
        vm.allNodeId = res.res.res.map(function (v, i, a) {
           return(v.id)
        });
        vm.allNodeData = res.res.res.map(function (v, i, a) {
            return({name: v.props.name, group: v.id})
        });
        infoServer.getAllInfo().success(function (res) {
            vm.totalRelNum = res.res.totalNum;
            vm.rels = res.res.res.map(function (v, i, a) {
                return({start: v.start.id, end: v.end.id})
            });
            vm.allRelations = vm.rels.map(function (v, i, a) {
                return({source: vm.allNodeId.indexOf(v.start), target: vm.allNodeId.indexOf(v.end), value: 1})
            });

            var color = d3.scale.category20();
            vm.options = {
                chart: {
                    type: 'forceDirectedGraph',
                    height: 500,
                    width: (function(){ return nv.utils.windowSize().width })(),
                    margin:{top: 20, right: 20, bottom: 20, left: 20},
                    color: function(d){
                        return color(d.group)
                    },
                    nodeExtras: function(node) {
                        node && node
                            .append("text")
                            .attr("dx", 10)
                            .attr("dy", ".50em")
                            .attr("stroke", function(d){color(d.group)})
                            .text(function(d) { return d.name })
                            .style({'font-size': '15px'});
                    },
                    tooltip:{
                        enabled: false
                    }
                },
                title: {
                    enable: true,
                    text: '图谱中部分实体及关系展示',
                    className: 'h4',
                    css: {
                        width: '990px',
                        textAlign: 'center'
                    }
                }
            };
            vm.data = {
                "nodes": vm.allNodeData,
                "links": vm.allRelations
            };
        });
    });
}

manageCtrl.$injector = ['$scope','$http', 'Upload', 'manageServer'];
function manageCtrl($scope, $http, Upload, manageServer) {
    var vm = this;
    vm.txtRegex = "(.txt)$";
    vm.owlRegex = "(.owl)$";
    vm.txtRe=new RegExp(vm.txtRegex);
    vm.owlRe=new RegExp(vm.owlRegex);
    vm.submitTxt = function() {
        console.log(vm.txtFile);
        if(vm.txtRe.test(vm.txtFile.name.toLowerCase())){
            console.log('canupload');
            vm.notTxt = false;
        }else {
            vm.notTxt = true;
            console.log("can not");
        }
        vm.upload(vm.txtFile)
    };
    vm.submitOwl = function() {
        console.log(vm.owlFile);
        if(vm.owlRe.test(vm.owlFile.name.toLowerCase())){
            console.log('canupload');
            vm.notOwl = false;
        }else {
            vm.notOwl = true;
            console.log("can not");
        }
        vm.upload(vm.owlFile)
    };
    vm.upload = function (file) {
        manageServer.uploadFile(file).success(function (res) {
            console.log(res)
        })
    };

}

apiCtrl.$injector = ['$scope','$http', 'nvd3'];
function apiCtrl() {
    var vm = this;
    vm.showCutAPI = false;
    vm.showDemoCut = function () {
        console.log('showDemo');
        vm.showCutAPI = true;
    }

}
