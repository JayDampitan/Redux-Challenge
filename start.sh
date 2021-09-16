#!/usr/bin/env bash

unameOut="$(uname -s)"
case "${unameOut}" in
    Linux*)     machine=Linux;;
    Darwin*)    machine=Mac;;
    CYGWIN*)    machine=Cygwin;;
    MINGW*)     machine=MinGw;;
    *)          machine="UNKNOWN:${unameOut}"
esac
echo ${machine}

case ${machine} in
    Mac)
        echo "Running Mac Startup"
        docker compose up
        ;;
    Cygwin)
        echo "Running Windows Startup"
        docker compose -f "./docker-compose.yml" -f "./docker-compose.windows.yml" up
        ;;
    MinGw)
        echo "Running Windows Startup"
        docker compose -f "./docker-compose.yml" -f "./docker-compose.windows.yml" up
        ;;
esac