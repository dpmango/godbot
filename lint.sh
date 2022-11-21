#!/bin/bash
DANGER=$(tput setaf 1)
NORMAL=$(tput sgr0)
BOLD=$(tput bold)

EXIT_CODE=0

printf "${BOLD}RUNING LINTERS...${NORMAL}\n"

function run {
    "$@"
    if [ $? -ne 0 ]; then
        EXIT_CODE=1
    fi
}

run eslint ./src/**/*.{ts,tsx}
run stylelint ./src/**/*.{css,scss}

if [ $EXIT_CODE -ne 0 ]; then
printf "\n\
${BOLD}----------------------------------------------------\n\
 Some ${DANGER}errors${NORMAL}${BOLD} popped up\n\
----------------------------------------------------${NORMAL}\n"
else
printf "\n\
${BOLD}------------------------\n\
 No linting errors, move on!\n\
------------------------${NORMAL}\n"
fi

exit 0;
