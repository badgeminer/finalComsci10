{ pkgs }: {
  deps = [
    pkgs.wget
    pkgs.python310
    pkgs.nodePackages.vscode-langservers-extracted
    pkgs.nodePackages.typescript-language-server  
  ];
}