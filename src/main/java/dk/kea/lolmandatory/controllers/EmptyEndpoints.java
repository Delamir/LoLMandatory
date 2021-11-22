package dk.kea.lolmandatory.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class EmptyEndpoints {

    @GetMapping("/")
    public String endPoint() {
        System.out.println("HEJ");
        return "html/dashboard.html";
    }
}
