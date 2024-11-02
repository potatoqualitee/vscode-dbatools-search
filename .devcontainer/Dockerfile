FROM mcr.microsoft.com/vscode/devcontainers/javascript-node

# Install additional tools
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends git

# [Optional] Uncomment if you want to install more global node packages
# RUN su node -c "npm install -g <your-package-here>"
