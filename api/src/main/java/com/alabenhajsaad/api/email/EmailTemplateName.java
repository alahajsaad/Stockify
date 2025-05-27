package com.alabenhajsaad.api.email;

import lombok.Getter;

@Getter
public enum EmailTemplateName {

    ACTIVATE_ACCOUNT("activate_account"),
    RESET_PASSWORD("reset_password"),
    NEW_EMPLOYEE_ACCOUNT("new_employee_account"),;

    private final String name;
    EmailTemplateName(String name) {
        this.name = name;
    }
}
