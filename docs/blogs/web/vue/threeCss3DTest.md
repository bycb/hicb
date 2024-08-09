---
tags:
  - vue
  - three.js
categories:
  - 前端
permalink: /vue/p7vjerxow3
date: 2021-11-28 10:37:35
---

# 初学 three.js 之 css3D

初学 three.js，看见 css3d_panorama 例子感觉挺好，想要放到我的 vue 项目中。虽然例子移植完成，真心没学会。先记录下吧。

### 引入

```
npm install three
```

### Vue 文件

```
<template>
  <el-container>
    <el-main>
      <div id="container" class="container"></div>
    </el-main>
  </el-container>
</template>
<script>
  import { THREE, CSS3DObject, CSS3DRenderer } from '@/utils/3d/css3D'
  export default {
    name: 'Css3DDemo',
    data() {
      return {
        renderer: '',
        scene: '',
        camera: '',
        container: '',
        target: '',
        lon: 90,
        lat: 0,
        phi: 0,
        theta: 0,
        sides: [
          {
            url: require('@/assets/demo_images/posx.jpg'),
            position: [-256, 0, 0],
            rotation: [0, Math.PI / 2, 0],
          },
          {
            url: require('@/assets/demo_images/negx.jpg'),
            position: [256, 0, 0],
            rotation: [0, -Math.PI / 2, 0],
          },
          {
            url: require('@/assets/demo_images/posy.jpg'),
            position: [0, 256, 0],
            rotation: [Math.PI / 2, 0, Math.PI],
          },
          {
            url: require('@/assets/demo_images/negy.jpg'),
            position: [0, -256, 0],
            rotation: [-Math.PI / 2, 0, Math.PI],
          },
          {
            url: require('@/assets/demo_images/posz.jpg'),
            position: [0, 0, 256],
            rotation: [0, Math.PI, 0],
          },
          {
            url: require('@/assets/demo_images/negz.jpg'),
            position: [0, 0, -256],
            rotation: [0, 0, 0],
          },
        ],
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
    mounted() {
      this.$nextTick(() => {
        this.createTarget()
        this.init()
        this.animate()
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
		//创建3D对象
        this.createCSS3DObject()
		//注册监听事件
        document.addEventListener('mousedown', this.onDocumentMouseDown, false)
        document.addEventListener('wheel', this.onDocumentMouseWheel, false)

        document.addEventListener(
          'touchstart',
          this.onDocumentTouchStart,
          false
        )
        document.addEventListener('touchmove', this.onDocumentTouchMove, false)
      },
      beforeMount() {
        window.addEventListener('resize', this.onWindowResize())
      },
      beforeDestroy() {
        window.removeEventListener('resize', this.onWindowResize())
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
      },
      createCamera() {
        let k = this.width / this.height //窗口宽高比
        this.camera = new THREE.PerspectiveCamera(75, k, 1, 1000)
      },
      createRenderer() {
        this.renderer = new CSS3DRenderer()
        this.renderer.setSize(this.width, this.height)
        this.container.appendChild(this.renderer.domElement)
      },
      createCSS3DObject() {
        for (var i = 0; i < this.sides.length; i++) {
          var side = this.sides[i]

          var element = document.createElement('img')
          element.width = 514 // 2 pixels extra to close the gap.
          element.src = side.url

          var object = new CSS3DObject(element)
          object.position.fromArray(side.position)
          object.rotation.fromArray(side.rotation)
          this.scene.add(object)
        }
      },
      createTarget() {
        this.target = new THREE.Vector3()
      },
      animate() {
        requestAnimationFrame(this.animate)

        this.lon += 0.1
        this.lat = Math.max(-85, Math.min(85, this.lat))
        this.phi = THREE.Math.degToRad(90 - this.lat)
        this.theta = THREE.Math.degToRad(this.lon)

        this.target.x = Math.sin(this.phi) * Math.cos(this.theta)
        this.target.y = Math.cos(this.phi)
        this.target.z = Math.sin(this.phi) * Math.sin(this.theta)

        this.camera.lookAt(this.target)

        this.renderer.render(this.scene, this.camera)
      },
      onWindowResize() {
        this.camera.aspect = this.width / this.height
        this.camera.updateProjectionMatrix()

        this.renderer.setSize(this.width, this.height)
      },
      onDocumentMouseDown(event) {
        event.preventDefault()

        document.addEventListener('mousemove', this.onDocumentMouseMove, false)
        document.addEventListener('mouseup', this.onDocumentMouseUp, false)
      },
      onDocumentMouseMove(event) {
        let movementX =
          event.movementX || event.mozMovementX || event.webkitMovementX || 0
        let movementY =
          event.movementY || event.mozMovementY || event.webkitMovementY || 0

        this.lon -= movementX * 0.1
        this.lat += movementY * 0.1
      },
      onDocumentMouseUp() {
        document.removeEventListener('mousemove', this.onDocumentMouseMove)
        document.removeEventListener('mouseup', this.onDocumentMouseUp)
      },
      onDocumentMouseWheel(event) {
        let fov = this.camera.fov + event.deltaY * 0.05

        this.camera.fov = THREE.Math.clamp(fov, 10, 75)

        this.camera.updateProjectionMatrix()
      },
      onDocumentTouchStart(event) {
        event.preventDefault()

        let touch = event.touches[0]

        this.touchX = touch.screenX
        this.touchY = touch.screenY
      },
      onDocumentTouchMove(event) {
        event.preventDefault()

        let touch = event.touches[0]

        this.lon -= (touch.screenX - this.touchX) * 0.1
        this.lat += (touch.screenY - this.touchY) * 0.1

        this.touchX = touch.screenX
        this.touchY = touch.screenY
      },
    },
  }
</script>
<style scoped>
  .container {
    height: 100%;
  }
</style>

```

### css3D

```
import * as THREE from 'three'

let matrix = new THREE.Matrix4()
let isIE = /Trident/i.test(navigator.userAgent)
let cache = {
  camera: { fov: 0, style: '' },
  objects: {},
}

class CSS3DObject extends THREE.Object3D {
  constructor(element) {
    super()
    this.element = element
    this.element.style.position = 'absolute'
    this.addEventListener('removed', function () {
      if (this.element.parentNode !== null) {
        this.element.parentNode.removeChild(this.element)
      }
    })
  }
}
class CSS3DSprite extends CSS3DObject {
  constructor(element) {
    super(element)
  }
}

class CSS3DRenderer {
  constructor() {
    console.log('MyThree.CSS3DRenderer', THREE.REVISION)

    this.domElement = document.createElement('div')
    this.domElement.style.overflow = 'hidden'
    this.cameraElement = document.createElement('div')

    this.cameraElement.style.WebkitTransformStyle = 'preserve-3d'
    this.cameraElement.style.transformStyle = 'preserve-3d'
    this.domElement.appendChild(this.cameraElement)
  }
  getSize() {
    return {
      width: this._width,
      height: this._height,
    }
  }

  setSize(width, height) {
    this._width = width
    this._height = height
    this._widthHalf = this._width / 2
    this._heightHalf = this._height / 2

    this.domElement.style.width = width + 'px'
    this.domElement.style.height = height + 'px'

    this.cameraElement.style.width = width + 'px'
    this.cameraElement.style.height = height + 'px'
  }

  render(scene, camera) {
    let fov = camera.projectionMatrix.elements[5] * this._heightHalf

    if (cache.camera.fov !== fov) {
      if (camera.isPerspectiveCamera) {
        this.domElement.style.WebkitPerspective = fov + 'px'
        this.domElement.style.perspective = fov + 'px'
      }

      cache.camera.fov = fov
    }

    scene.updateMatrixWorld()

    if (camera.parent === null) camera.updateMatrixWorld()

    let cameraCSSMatrix = camera.isOrthographicCamera
      ? 'scale(' + fov + ')' + getCameraCSSMatrix(camera.matrixWorldInverse)
      : 'translateZ(' +
        fov +
        'px)' +
        getCameraCSSMatrix(camera.matrixWorldInverse)

    let style =
      cameraCSSMatrix +
      'translate(' +
      this._widthHalf +
      'px,' +
      this._heightHalf +
      'px)'

    if (cache.camera.style !== style && !isIE) {
      this.cameraElement.style.WebkitTransform = style
      this.cameraElement.style.transform = style

      cache.camera.style = style
    }

    this.renderObject(scene, camera, cameraCSSMatrix)

    if (isIE) {
      // IE10 and 11 does not support 'preserve-3d'.
      // Thus, z-order in 3D will not work.
      // We have to calc z-order manually and set CSS z-index for IE.
      // FYI: z-index can't handle object intersection
      zOrder(scene)
    }
  }

  renderObject(object, camera, cameraCSSMatrix) {
    if (object instanceof CSS3DObject) {
      let style

      if (object instanceof CSS3DSprite) {
        // http://swiftcoder.wordpress.com/2008/11/25/constructing-a-billboard-matrix/

        matrix.copy(camera.matrixWorldInverse)
        matrix.transpose()
        matrix.copyPosition(object.matrixWorld)
        matrix.scale(object.scale)

        matrix.elements[3] = 0
        matrix.elements[7] = 0
        matrix.elements[11] = 0
        matrix.elements[15] = 1

        style = getObjectCSSMatrix(matrix, cameraCSSMatrix)
      } else {
        style = getObjectCSSMatrix(object.matrixWorld, cameraCSSMatrix)
      }

      let element = object.element
      let cachedStyle =
        cache.objects[object.id] && cache.objects[object.id].style

      if (cachedStyle === undefined || cachedStyle !== style) {
        element.style.WebkitTransform = style
        element.style.transform = style

        cache.objects[object.id] = { style: style }

        if (isIE) {
          cache.objects[object.id].distanceToCameraSquared =
            getDistanceToSquared(camera, object)
        }
      }

      if (element.parentNode !== this.cameraElement) {
        this.cameraElement.appendChild(element)
      }
    }

    for (let i = 0, l = object.children.length; i < l; i++) {
      this.renderObject(object.children[i], camera, cameraCSSMatrix)
    }
  }
}

function zOrder(scene) {
  let order = Object.keys(cache.objects).sort(function (a, b) {
    return (
      cache.objects[a].distanceToCameraSquared -
      cache.objects[b].distanceToCameraSquared
    )
  })
  let zMax = order.length

  scene.traverse(function (object) {
    let index = order.indexOf(object.id + '')

    if (index !== -1) {
      object.element.style.zIndex = zMax - index
    }
  })
}

function epsilon(value) {
  return Math.abs(value) < 1e-10 ? 0 : value
}
function getCameraCSSMatrix(matrix) {
  let elements = matrix.elements

  return (
    'matrix3d(' +
    epsilon(elements[0]) +
    ',' +
    epsilon(-elements[1]) +
    ',' +
    epsilon(elements[2]) +
    ',' +
    epsilon(elements[3]) +
    ',' +
    epsilon(elements[4]) +
    ',' +
    epsilon(-elements[5]) +
    ',' +
    epsilon(elements[6]) +
    ',' +
    epsilon(elements[7]) +
    ',' +
    epsilon(elements[8]) +
    ',' +
    epsilon(-elements[9]) +
    ',' +
    epsilon(elements[10]) +
    ',' +
    epsilon(elements[11]) +
    ',' +
    epsilon(elements[12]) +
    ',' +
    epsilon(-elements[13]) +
    ',' +
    epsilon(elements[14]) +
    ',' +
    epsilon(elements[15]) +
    ')'
  )
}
function getObjectCSSMatrix(matrix, cameraCSSMatrix) {
  let elements = matrix.elements
  let matrix3d =
    'matrix3d(' +
    epsilon(elements[0]) +
    ',' +
    epsilon(elements[1]) +
    ',' +
    epsilon(elements[2]) +
    ',' +
    epsilon(elements[3]) +
    ',' +
    epsilon(-elements[4]) +
    ',' +
    epsilon(-elements[5]) +
    ',' +
    epsilon(-elements[6]) +
    ',' +
    epsilon(-elements[7]) +
    ',' +
    epsilon(elements[8]) +
    ',' +
    epsilon(elements[9]) +
    ',' +
    epsilon(elements[10]) +
    ',' +
    epsilon(elements[11]) +
    ',' +
    epsilon(elements[12]) +
    ',' +
    epsilon(elements[13]) +
    ',' +
    epsilon(elements[14]) +
    ',' +
    epsilon(elements[15]) +
    ')'

  if (isIE) {
    return (
      'translate(-50%,-50%)' +
      'translate(' +
      this._widthHalf +
      'px,' +
      this._heightHalf +
      'px)' +
      cameraCSSMatrix +
      matrix3d
    )
  }

  return 'translate(-50%,-50%)' + matrix3d
}

let getDistanceToSquared = (function () {
  let a = new THREE.Vector3()
  let b = new THREE.Vector3()

  return function (object1, object2) {
    a.setFromMatrixPosition(object1.matrixWorld)
    b.setFromMatrixPosition(object2.matrixWorld)

    return a.distanceToSquared(b)
  }
})()

export { THREE, CSS3DObject, CSS3DRenderer }

```

### 效果

![](https://cdn.jsdelivr.net/gh/xxmys/image/img/202408090917795.png)
