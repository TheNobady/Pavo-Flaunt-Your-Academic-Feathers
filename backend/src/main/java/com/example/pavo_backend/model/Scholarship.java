package com.example.pavo_backend.model;

import java.util.List;

public class Scholarship {
    private String id;
    private String name;
    private String provider;
    private String amount;
    private String type;
    private List<String> eligibility;
    private String deadline;
    private String description;
    private String applicationLink;
    private List<String> category;
    private List<String> requirements;
    private List<String> benefits;
    private boolean isGovernment;

    public Scholarship() {}

    public Scholarship(String id, String name, String provider, String amount, String type, List<String> eligibility, String deadline, String description, String applicationLink, List<String> category, List<String> requirements, List<String> benefits, boolean isGovernment) {
        this.id = id;
        this.name = name;
        this.provider = provider;
        this.amount = amount;
        this.type = type;
        this.eligibility = eligibility;
        this.deadline = deadline;
        this.description = description;
        this.applicationLink = applicationLink;
        this.category = category;
        this.requirements = requirements;
        this.benefits = benefits;
        this.isGovernment = isGovernment;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getProvider() { return provider; }
    public void setProvider(String provider) { this.provider = provider; }
    public String getAmount() { return amount; }
    public void setAmount(String amount) { this.amount = amount; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public List<String> getEligibility() { return eligibility; }
    public void setEligibility(List<String> eligibility) { this.eligibility = eligibility; }
    public String getDeadline() { return deadline; }
    public void setDeadline(String deadline) { this.deadline = deadline; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getApplicationLink() { return applicationLink; }
    public void setApplicationLink(String applicationLink) { this.applicationLink = applicationLink; }
    public List<String> getCategory() { return category; }
    public void setCategory(List<String> category) { this.category = category; }
    public List<String> getRequirements() { return requirements; }
    public void setRequirements(List<String> requirements) { this.requirements = requirements; }
    public List<String> getBenefits() { return benefits; }
    public void setBenefits(List<String> benefits) { this.benefits = benefits; }
    public boolean isGovernment() { return isGovernment; }
    public void setGovernment(boolean isGovernment) { this.isGovernment = isGovernment; }
}
