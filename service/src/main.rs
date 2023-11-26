use std::time::{SystemTime, UNIX_EPOCH};

use poem::{listener::TcpListener, Server};
use poem_grpc::{Request, Response, RouteGrpc, Status};

poem_grpc::include_proto!("todo");

struct TaskHandler;

#[poem::async_trait]
impl TaskService for TaskHandler {
    async fn get_tasks(
        &self,
        _request: Request<GetTasksRequest>,
    ) -> Result<Response<GetTasksResponse>, Status> {
            let task= Task {
            id: "id".to_string(),
            title: "title".to_string(),
            description: "description".to_string(),
            is_completed: false,
            due_date: match SystemTime::now().duration_since(UNIX_EPOCH) {
                Ok(now) => now.as_secs().try_into().unwrap(),
                Err(_) => panic!(),
            },
        };
        let reply = GetTasksResponse { tasks: vec![task] };
        Ok(Response::new(reply))
    }
}

#[tokio::main]
async fn main() -> Result<(), std::io::Error> {
    let route = RouteGrpc::new().add_service(TaskServiceServer::new(TaskHandler));
    Server::new(TcpListener::bind("0.0.0.0:3000"))
        .run(route)
        .await
}
