package com.example.pavo_backend.store;

import com.example.pavo_backend.model.CareerPath;
import com.example.pavo_backend.model.College;
import com.example.pavo_backend.model.Scholarship;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Component
public class DataStore {

    private List<College> colleges = new ArrayList<>();
    private List<CareerPath> careerPaths = new ArrayList<>();
    private List<Scholarship> scholarships = new ArrayList<>();

    @PostConstruct
    public void init() {
        ObjectMapper mapper = new ObjectMapper();
        try {
            InputStream collegeStream = getClass().getResourceAsStream("/data/colleges.json");
            if (collegeStream != null) {
                colleges = mapper.readValue(collegeStream, new TypeReference<List<College>>(){});
            }

            InputStream careerPathStream = getClass().getResourceAsStream("/data/career-paths.json");
            if (careerPathStream != null) {
                careerPaths = mapper.readValue(careerPathStream, new TypeReference<List<CareerPath>>(){});
            }

            InputStream scholarshipStream = getClass().getResourceAsStream("/data/scholarships.json");
            if (scholarshipStream != null) {
                scholarships = mapper.readValue(scholarshipStream, new TypeReference<List<Scholarship>>(){});
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public List<College> getColleges() {
        return colleges;
    }

    public List<CareerPath> getCareerPaths() {
        return careerPaths;
    }

    public List<Scholarship> getScholarships() {
        return scholarships;
    }
}
