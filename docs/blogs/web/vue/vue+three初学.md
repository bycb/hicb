---
tags:
  - vue
  - three.js
categories:
  - 前端
permalink: /vue/8aatazcpvb
date: 2021-11-14 10:37:35
---

# 初学 three.js 画个球

### 下载

github 链接：https://github.com/mrdoob/three.js

Three.js 官网：https://threejs.org/

中文文档：http://www.yanhuangxueyuan.com/threejs/docs/index.html

### 安装

```
npm install three
```

### vue 中引用

根据教程画个球

```
<template>
  <div id="container" class="container"></div>
</template>
<script>
  import * as THREE from 'three'
  export default {
    name: 'Create',
    data() {
      return {
        renderer: '',
        scene: '',
        camera: '',
        container: '',
      }
    },
    computed: {
      width() {
        return this.container.clientWidth
      },
      height() {
        return this.container.clientHeight
      },
    },
    created() {
      this.$nextTick(() => {
        this.init()
      })
    },
    methods: {
      init() {
        this.container = document.getElementById('container')
        // 1、创建场景和摄像机
        this.createScene()
        this.createCamera()
        //2、创建ThreeJs 渲染器
        this.createRenderer()
        //3。创建光源
        this.createLight()

        let geometry2 = new THREE.SphereGeometry(60, 40, 40)
        let material2 = new THREE.MeshLambertMaterial({
          color: 0xff00ff,
        })
        let mesh2 = new THREE.Mesh(geometry2, material2) //网格模型对象Mesh
        mesh2.translateY(120) //球体网格模型沿Y轴正方向平移120
        this.scene.add(mesh2)
        this.render()
      },
      createLight() {
        //点光源
        let point = new THREE.PointLight(0xffffff)
        point.position.set(400, 200, 300) //点光源位置
        this.scene.add(point) //点光源添加到场景中
        //环境光
        let ambient = new THREE.AmbientLight(0x444444)
        this.scene.add(ambient)
      },
      createScene() {
        this.scene = new THREE.Scene()
        // 在场景中添加雾的效果，Fog参数分别代表‘雾的颜色’、‘开始雾化的视线距离’、刚好雾化至看不见的视线距离’
        this.scene.fog = new THREE.Fog(0x000000, 0, 10000)
      },
      createCamera() {
        let k = this.width / this.height //窗口宽高比
        let s = 200 //三维场景显示范围控制系数，系数越大，显示的范围越大
        //创建相机对象
        this.camera = new THREE.OrthographicCamera(
          -s * k,
          s * k,
          s,
          -s,
          1,
          1000
        )
        this.camera.position.set(200, 300, 200) //设置相机位置
        this.camera.lookAt(this.scene.position) //设置相机方向(指向的场景对象)
      },
      createRenderer() {
        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setSize(this.width, this.height) //设置渲染区域尺寸
        this.renderer.setClearColor(0xb9d3ff, 1) //设置背景颜色
        this.container.appendChild(this.renderer.domElement) //body元素中插入canvas对象
      },
      render() {
        this.renderer.render(this.scene, this.camera) //执行渲染操作
      },
    },
  }
</script>
<style scoped>
  .container {
    height: 800px;
  }
</style>

```

### 效果

![](https://cdn.jsdelivr.net/gh/xxmys/image/img/202408090918441.jpg)
