---
tags:
  - vue
  - element-ui
categories:
  - 前端
permalink: /vue/czqvu8v3uy
date: 2021-08-14 10:37:35
---

# el-cascader 设置默认值

### 数据结构如下

将"设计原则"设置为默认值

![](https://cdn.jsdelivr.net/gh/xxmys/image/img/202408090917719.png)

```
  <el-cascader v-model="selectedOptions"/>

   data() {
      return {
          //其中1是指南的ID,1.1是设计原则的ID
        selectedOptions: ["1","1.1"],
      }
    },
```
