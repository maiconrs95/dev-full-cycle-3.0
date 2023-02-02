# Golang challenge

In this challenge, I created a golang image that is less than 2MB size.

To do it, I used two images:

-   golang:alpine as builder, to compile go file;
-   scratch as main, just to run go binary file with the output message.

Running image:

```
docker run maiconrs95/fullcycle
# Output: Full Cycle Rocks!!
```
