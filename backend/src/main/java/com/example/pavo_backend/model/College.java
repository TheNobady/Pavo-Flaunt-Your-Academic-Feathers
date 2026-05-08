package com.example.pavo_backend.model;

import java.util.List;

public class College {
    private String id;
    private String name;
    private String location;
    private String state;
    private String type;
    private int established;
    private int ranking;
    private double rating;
    private List<String> courses;
    private Fees fees;
    private List<String> facilities;
    private String admissionProcess;
    private Cutoff cutoff;
    private Placement placement;
    private Integer distance;

    public College() {}

    public College(String id, String name, String location, String state, String type, int established, int ranking, double rating, List<String> courses, Fees fees, List<String> facilities, String admissionProcess, Cutoff cutoff, Placement placement) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.state = state;
        this.type = type;
        this.established = established;
        this.ranking = ranking;
        this.rating = rating;
        this.courses = courses;
        this.fees = fees;
        this.facilities = facilities;
        this.admissionProcess = admissionProcess;
        this.cutoff = cutoff;
        this.placement = placement;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getState() { return state; }
    public void setState(String state) { this.state = state; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public int getEstablished() { return established; }
    public void setEstablished(int established) { this.established = established; }
    public int getRanking() { return ranking; }
    public void setRanking(int ranking) { this.ranking = ranking; }
    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }
    public List<String> getCourses() { return courses; }
    public void setCourses(List<String> courses) { this.courses = courses; }
    public Fees getFees() { return fees; }
    public void setFees(Fees fees) { this.fees = fees; }
    public List<String> getFacilities() { return facilities; }
    public void setFacilities(List<String> facilities) { this.facilities = facilities; }
    public String getAdmissionProcess() { return admissionProcess; }
    public void setAdmissionProcess(String admissionProcess) { this.admissionProcess = admissionProcess; }
    public Cutoff getCutoff() { return cutoff; }
    public void setCutoff(Cutoff cutoff) { this.cutoff = cutoff; }
    public Placement getPlacement() { return placement; }
    public void setPlacement(Placement placement) { this.placement = placement; }
    public Integer getDistance() { return distance; }
    public void setDistance(Integer distance) { this.distance = distance; }

    public static class Fees {
        private String undergraduate;
        private String postgraduate;

        public Fees() {}
        public Fees(String undergraduate, String postgraduate) {
            this.undergraduate = undergraduate;
            this.postgraduate = postgraduate;
        }

        public String getUndergraduate() { return undergraduate; }
        public void setUndergraduate(String undergraduate) { this.undergraduate = undergraduate; }
        public String getPostgraduate() { return postgraduate; }
        public void setPostgraduate(String postgraduate) { this.postgraduate = postgraduate; }
    }

    public static class Cutoff {
        private int general;
        private int obc;
        private int sc;
        private int st;

        public Cutoff() {}
        public Cutoff(int general, int obc, int sc, int st) {
            this.general = general;
            this.obc = obc;
            this.sc = sc;
            this.st = st;
        }

        public int getGeneral() { return general; }
        public void setGeneral(int general) { this.general = general; }
        public int getObc() { return obc; }
        public void setObc(int obc) { this.obc = obc; }
        public int getSc() { return sc; }
        public void setSc(int sc) { this.sc = sc; }
        public int getSt() { return st; }
        public void setSt(int st) { this.st = st; }
    }

    public static class Placement {
        private String averagePackage;
        private List<String> topRecruiters;

        public Placement() {}
        public Placement(String averagePackage, List<String> topRecruiters) {
            this.averagePackage = averagePackage;
            this.topRecruiters = topRecruiters;
        }

        public String getAveragePackage() { return averagePackage; }
        public void setAveragePackage(String averagePackage) { this.averagePackage = averagePackage; }
        public List<String> getTopRecruiters() { return topRecruiters; }
        public void setTopRecruiters(List<String> topRecruiters) { this.topRecruiters = topRecruiters; }
    }
}
