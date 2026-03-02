{pkgs}: {
  channel = "unstable";
  packages = [
    pkgs.nodejs_24       # Instala o runtime do Node.js 24
    pkgs.firebase-tools  # Garante que a CLI do Firebase está presente
  ];
  idx.extensions = [
    "angular.ng-template"
  ];
  idx.previews = {
    previews = {
      web = {
        command = [
          "npm"
          "run"
          "start"
          "--"
          "--port"
          "$PORT"
          "--host"
          "0.0.0.0"
          "--disable-host-check"
        ];
        manager = "web";
      };
    };
  };
}