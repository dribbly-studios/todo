use std::io::Result;

use poem_grpc_build::compile_protos;

fn main() -> Result<()> {
    compile_protos(&["./proto/task.proto"], &["./proto"])
}
