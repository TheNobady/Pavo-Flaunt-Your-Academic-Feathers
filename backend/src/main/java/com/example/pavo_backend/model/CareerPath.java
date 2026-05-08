package com.example.pavo_backend.model;

import java.util.List;

public class CareerPath {
    private String id;
    private String title;
    private String category;
    private String description;
    private String duration;
    private String averageSalary;
    private String demandLevel;
    private List<String> requiredEducation;
    private List<String> keySkills;
    private List<CareerProgression> careerProgression;
    private List<String> relatedCareers;

    public CareerPath() {}

    public CareerPath(String id, String title, String category, String description, String duration, String averageSalary, String demandLevel, List<String> requiredEducation, List<String> keySkills, List<CareerProgression> careerProgression, List<String> relatedCareers) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.description = description;
        this.duration = duration;
        this.averageSalary = averageSalary;
        this.demandLevel = demandLevel;
        this.requiredEducation = requiredEducation;
        this.keySkills = keySkills;
        this.careerProgression = careerProgression;
        this.relatedCareers = relatedCareers;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }
    public String getAverageSalary() { return averageSalary; }
    public void setAverageSalary(String averageSalary) { this.averageSalary = averageSalary; }
    public String getDemandLevel() { return demandLevel; }
    public void setDemandLevel(String demandLevel) { this.demandLevel = demandLevel; }
    public List<String> getRequiredEducation() { return requiredEducation; }
    public void setRequiredEducation(List<String> requiredEducation) { this.requiredEducation = requiredEducation; }
    public List<String> getKeySkills() { return keySkills; }
    public void setKeySkills(List<String> keySkills) { this.keySkills = keySkills; }
    public List<CareerProgression> getCareerProgression() { return careerProgression; }
    public void setCareerProgression(List<CareerProgression> careerProgression) { this.careerProgression = careerProgression; }
    public List<String> getRelatedCareers() { return relatedCareers; }
    public void setRelatedCareers(List<String> relatedCareers) { this.relatedCareers = relatedCareers; }

    public static class CareerProgression {
        private String level;
        private String title;
        private String experience;
        private String salary;

        public CareerProgression() {}

        public CareerProgression(String level, String title, String experience, String salary) {
            this.level = level;
            this.title = title;
            this.experience = experience;
            this.salary = salary;
        }

        public String getLevel() { return level; }
        public void setLevel(String level) { this.level = level; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getExperience() { return experience; }
        public void setExperience(String experience) { this.experience = experience; }
        public String getSalary() { return salary; }
        public void setSalary(String salary) { this.salary = salary; }
    }
}
