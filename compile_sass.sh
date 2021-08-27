#!/bin/bash

echo "Now compiling sass files"

echo $1

d=$(pwd)
for i in $d/src/*.scss; do
	[ -f "$i" ] || break
	echo $i
	filename="${i%%.*}"
	sass $i $filename.css
done
