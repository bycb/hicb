---
tags:
  - nginx配置
categories:
  - Nginx
permalink: /nginx/vjhdo8h643
date: 2021-12-11 10:37:35
---

# nginx 配置

### 负载均衡

```
	upstream iotserver {
        server 192.168.100.21:8081;
         server 192.168.100.22:8081;
    }
	server {
        listen       80;
        server_name  localhost;
		client_max_body_size 8M;

		#Web页面发布地址
        location / {
            root   /www/iotBuilder2;
            index  index.html;

        }
		#web页面对应后台接口
		location /web/{
			proxy_pass    http://iotserver/;
			proxy_set_header Host $http_host;
			proxy_set_header X-Real-IP $http_x_real_ip;
			proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
			proxy_set_header X-Forwarded-Proto $scheme;
		}
    }
```

### proxy_pass 地址末尾斜杠

请求地址：http://127.0.0.1/web/getData

1. 带斜杠，经代理后真实地址：http://127.0.0.1:8081/getData

```
location /web/{
		proxy_pass    http://127.0.0.1:8081/;
		proxy_set_header Host $http_host;
		proxy_set_header X-Real-IP $http_x_real_ip;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header X-Forwarded-Proto $scheme;
}
```

2. 不带斜杠，经代理后真实地址：http://127.0.0.1:8081/web/getData

```
location /web/{
		proxy_pass    http://127.0.0.1:8081;
		proxy_set_header Host $http_host;
		proxy_set_header X-Real-IP $http_x_real_ip;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header X-Forwarded-Proto $scheme;
}
```
