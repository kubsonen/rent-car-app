package pl.rentcar.server.util;

public class AppError extends Throwable {
    public AppError() {
    }

    public AppError(String message) {
        super(message);
    }
}
