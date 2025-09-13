FROM gitpod/workspace-full

# install dependencies
RUN sudo apt-get update && sudo apt-get install -y git curl unzip xz-utils zip

# install Flutter (stable)
RUN git clone https://github.com/flutter/flutter.git -b stable /home/gitpod/flutter
ENV PATH="/home/gitpod/flutter/bin:${PATH}"

# accept licenses if needed (non-interactive)
RUN yes | /home/gitpod/flutter/bin/flutter doctor --android-licenses || true
RUN /home/gitpod/flutter/bin/flutter doctor || true
