use poem::{listener::TcpListener, Route, Server};
use poem_openapi::{payload::PlainText, OpenApi, OpenApiService};

struct Api;

#[OpenApi]
impl Api {
    #[oai(path = "/ping", method = "get")]
    async fn index(&self) -> PlainText<String> {
        PlainText("pong".to_string())
    }
}

#[tokio::main]
async fn main() -> Result<(), std::io::Error> {
    Server::new(TcpListener::bind("0.0.0.0:3000"))
        .run(
            Route::new()
                .nest(
                    "/api",
                    OpenApiService::new(Api, "Ping", "1.0").server("http://localhost:3000/api"),
                )
                .nest(
                    "/",
                    OpenApiService::new(Api, "Ping", "1.0")
                        .server("http://localhost:3000/api")
                        .swagger_ui(),
                ),
        )
        .await
}
