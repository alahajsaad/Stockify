package com.alabenhajsaad.api.business.code_generator;



import java.time.LocalDate;


public class CodeGeneratorService {

    private static final int MAX_NUMBER = 999;
    private static final String INITIAL_CALL_NUMBER = "A001";



    public static String generateNew(String lastGeneratedCode, String prefix) {

        String currentYear = getCurrentYear();

        if (lastGeneratedCode == null || !isSameYear(lastGeneratedCode, currentYear)) {
            return prefix + "_" + currentYear + INITIAL_CALL_NUMBER;
        }

        int underscoreIndex = lastGeneratedCode.indexOf("_");
        String year = lastGeneratedCode.substring(underscoreIndex + 1, underscoreIndex + 3);
        char letter = lastGeneratedCode.charAt(underscoreIndex + 3);
        int number = Integer.parseInt(lastGeneratedCode.substring(underscoreIndex + 4));

        if (number == MAX_NUMBER) {
            letter++;
            number = 1;
        } else {
            number++;
        }

        return prefix + "_" + year + letter + String.format("%03d", number);
    }



    private static String getCurrentYear() {
        return String.valueOf(LocalDate.now().getYear()).substring(2);
    }


    private static boolean isSameYear(String lastCallNumber, String currentYear) {
        return lastCallNumber.startsWith(currentYear);
    }

}
