package com.ran.trello.Model.Entity;

public enum PriorityStatus {
    LOW("Basse"),
    MEDIUM("Moyenne"),
    HIGH("Elevée");

    private final String status;

    PriorityStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }
}

