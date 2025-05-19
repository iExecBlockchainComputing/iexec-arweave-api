# .devcontainer/Dockerfile

FROM mcr.microsoft.com/vscode/devcontainers/base:0-ubuntu-22.04

RUN apt-get update \
    && export DEBIAN_FRONTEND=noninteractive \
    && apt-get install -y --no-install-recommends docker-compose git nodejs npm curl \
    && rm -rf /var/lib/apt/lists/*

RUN curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash

RUN npm install -g \
    prettier \
    eslint \
    @commitlint/cli \
    @commitlint/config-conventional

