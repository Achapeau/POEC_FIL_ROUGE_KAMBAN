package com.ran.trello.Model.Entity;

public enum PriorityStatus {
    LOW("basse"),
    MEDIUM("moyenne"),
    HIGH("élevée");

    private final String status;

    PriorityStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }
}

