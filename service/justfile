srv_dir := justfile_directory() / "service/"

_:
    @just --list
fmt:
    nix fmt
check:
	nix flake check
run:
    cargo run --manifest-path {{srv_dir}}/Cargo.toml
watch:
    cargo watch -C {{srv_dir}} -x "run"

