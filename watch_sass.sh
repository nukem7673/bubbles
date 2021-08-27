#!/bin/bash


pwd=$(pwd)


fswatch -v $pwd/src/*.scss | xargs -n1 -I{} $pwd/compile_sass.sh
