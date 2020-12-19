# StoryClip UI
React로 만든 StoryClip UI

## Nginx 설정
참고: [https://zetawiki.com/wiki/시놀로지_Web_Station_Nginx_설정_변경](https://zetawiki.com/wiki/시놀로지_Web_Station_Nginx_설정_변경)

```
# for react
location / {
    try_files $uri /index.html;
}

# for php api router
location ~* \/api\/* {
    rewrite ^/(.*)$ /api/index.php?request=$1;
}
```
