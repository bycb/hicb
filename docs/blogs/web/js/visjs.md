---
title: vis.js Network样式更改
tags:
  - visjs
categories:
  - 前端
permalink: /js/n1i9tuaru8
date: 2020-10-12 10:37:35
---

# vis.js Network 样式更改

### 官网

https://visjs.github.io/vis-network/docs/network/

### 需求

要实现点击连接线将其变红，并且起始点也变红，点击其他线则点击线变红其他恢复原状。

### 实现

```

 //设置链接线属性
    window.setEdgeOptions = function(edgeId, options, callback) {
        var edg = network.body.data.edges;
        var clickedEdges = edg.get(edgeId);
        $.each(options, function(key, value) {
            clickedEdges[key] = value;
        })
        if (typeof callback != "undefined" && $.isFunction(callback)) {
            callback(clickedEdges);
        }
        edg.update(clickedEdges);
    }

    //设置点属性
    window.setNodeOptions = function(nodeId, options, callback) {
        var nodeArr = network.body.data.nodes;
        var clickedNode = nodeArr.get(nodeId);
        $.each(options, function(key, value) {
            clickedNode[key] = value;
        })
        if (typeof callback != "undefined" && $.isFunction(callback)) {
            callback(clickedNode);
        }
        nodeArr.update(clickedNode);
    }
 //管段id
    var checkPipesId = "";
    var pipOption = {
        color: {}
    };
    var nodeOption = {
        color: {}
    };
    //根据管段id修改其样式
    function clickPipHandle(pipId) {
        if (!comm.isEmpty(checkPipesId)) { //切换后恢复默认
            pipOption.color.color = "#2B7CE9";
            window.setEdgeOptions(checkPipesId, pipOption, function(pip) {
                nodeOption.color.background = "#97C2FC";
                window.setNodeOptions(pip.from, nodeOption);
                window.setNodeOptions(pip.to, nodeOption);
            });
        }
        // if (pipId != checkPipesId) {
        pipOption.color.color = "red";
        window.setEdgeOptions(pipId, pipOption, function(pip) {
            nodeOption.color.background = "red";
            window.setNodeOptions(pip.from, nodeOption);
            window.setNodeOptions(pip.to, nodeOption);
        });
        checkPipesId = pipId;
        // }
    }
```
