#!/usr/bin/env bash

cd "`dirname \"$0\"`"
PWD=$(pwd)
java -Xmx512m -Duser.timezone="US/Eastern" -jar "$PWD/../lib/rhino/js.jar" "$PWD/../lib/envjasmine.js" "UNIX" "$PWD/.."
