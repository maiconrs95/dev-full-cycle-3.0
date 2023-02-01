FROM nginx:1.15.0-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d

RUN rm /usr/share/nginx/html/index.html
COPY index.html /usr/share/nginx/html

# COPY nginx.conf /etc/nginx/conf.d

