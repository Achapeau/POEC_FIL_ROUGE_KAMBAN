package com.ran.trello.Model.Entity;

public enum TaskStatus {
    TODO("à faire"),
    IN_PROGRESS("en cours"),
    DONE("terminé");

    private final String status;

    TaskStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }
}

