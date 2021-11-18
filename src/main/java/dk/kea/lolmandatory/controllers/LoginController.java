package dk.kea.lolmandatory.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {

    @GetMapping("/")
    public String login() {
        return "/";
    }

    @GetMapping("/champions")
    public String champions() {
        return "champions/champions.html";
    }

    @GetMapping("/dashboard")
    public String dashboard() {
        return "dashboard/dashboard.html";
    }

    @GetMapping("/matches")
    public String matches() {
        return "matches/matches";
    }
}
