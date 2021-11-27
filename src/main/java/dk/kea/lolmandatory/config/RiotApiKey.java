package dk.kea.lolmandatory.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

public class RiotApiKey {

    private String API_KEY;

    @Autowired
    public void setApiKey(@Value("api-key") String apiKey) {
        API_KEY = apiKey;
    }
}
