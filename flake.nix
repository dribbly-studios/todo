{
  inputs.nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
  inputs.treefmt-nix.url = "github:numtide/treefmt-nix";

  outputs = inputs: with inputs;
    let
      pkgs = import nixpkgs { system = "x86_64-linux"; };
      cargoToml = builtins.fromTOML (builtins.readFile ./Cargo.toml);
      system = "x86_64-linux";

      eachSystem = f: nixpkgs.lib.genAttrs [ system ] (system: f nixpkgs.legacyPackages.${system});

      treefmtEval = eachSystem (pkgs: treefmt-nix.lib.evalModule pkgs {
        projectRootFile = "flake.nix";
        programs.rustfmt.enable = true;
        programs.nixpkgs-fmt.enable = true;
      });
    in
    {
      builds = {
        api = pkgs.rustPlatform.buildRustPackage {
          inherit (cargoToml.package) name version;
          src = ./.;
          cargoLock.lockFile = ./Cargo.lock;
        };

        app = null;
      };

      images = {
        api = pkgs.dockerTools.buildLayeredImage {
          name = cargoToml.package.name;
          tag = cargoToml.package.version;

          contents = [ packages.${system}.todoApi ];
          config = {
            Cmd = [ "${todoApi}/bin/${todoApi.pname}" ];
            ExposedPorts = {
              "3000/tcp" = { };
            };
          };
        };

        app = null;
      };

      formatter = eachSystem (pkgs: treefmtEval.${system}.config.build.wrapper);
      checks = eachSystem (pkgs: {
        formatting = treefmtEval.${system}.config.build.check self;
      });

      devShells.${system}.default = pkgs.mkShell {
        shellHook = ''
          export RUST_SRC_PATH=${pkgs.rustPlatform.rustLibSrc}
          just
        '';
        buildInputs = [ pkgs.libiconv pkgs.rustc pkgs.cargo pkgs.cargo-watch pkgs.just pkgs.rust-analyzer pkgs.rustPlatform.rustcSrc ];
        RUST_BACKTRACE = 1;
      };

      packages.${system} = rec {
        inherit (self.builds) api app;
        default = api;
      };
    };
}
