package pl.rentcar.server.component;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import pl.rentcar.server.model.ModelError;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class ControllerGlobalError {

    Map<String, String> errors;

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> validation(MethodArgumentNotValidException validException){
        BindingResult br = validException.getBindingResult();
        if(br.hasErrors()){
            errors = new HashMap<>();
            for(FieldError e: br.getFieldErrors()){
                String field = e.getField();
                if(errors.containsKey(field)) {
                    String buffer = errors.get(field);
                    errors.remove(field);
                    errors.put(field, buffer + " " + e.getDefaultMessage());
                } else {
                    errors.put(field, e.getDefaultMessage());
                }
            }
        }
        return new ResponseEntity<>(errors, HttpStatus.NOT_ACCEPTABLE);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> globalExceptionHandler(Exception ex, WebRequest request) {
        ex.printStackTrace();
        ModelError modelError = new ModelError(new Date(), ex.getMessage(), "");
        return new ResponseEntity<>(modelError, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
