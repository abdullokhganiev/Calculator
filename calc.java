//Абдуллох Ганиев

import java.util.Scanner;

public class calc {
	
	private static int getDecimalValue(String romanString) {
        switch (romanString) {
            case "I": 
            	return 1;
            case "II": 
            	return 2;
            case "III": 
            	return 3;
            case "IV": 
            	return 4;
            case "V": 
            	return 5;
            case "VI": 
            	return 6;
            case "VII": 
            	return 7;
            case "VIII": 
            	return 8;
            case "IX": 
            	return 9;
            case "X": 
            	return 10;
            default: return 0;
        }
    }
	
	public static String calc(String input) {
		String result = null;
		String got = new String(input);
		String[] operationAsString = got.split(" ");
		if(getDecimalValue(operationAsString[0])==0 && getDecimalValue(operationAsString[2])==0) {
			int firstInput = Integer.parseInt(operationAsString[0]);
			String operation = operationAsString[1];
			int secondInput = Integer.parseInt(operationAsString[2]);			
			if(firstInput < 1 || firstInput > 10 || secondInput < 1 || secondInput > 10) {
				return "throws Exception";
			}else if(operationAsString.length > 3) {
				return "throws Exception";
			}else{
				switch(operation) {
				case "+":
					return String.valueOf(firstInput + secondInput);
					
				case "-":
					return String.valueOf(firstInput - secondInput);
					
				case "*":
					return String.valueOf(firstInput*secondInput);
					
				case "/":
					return String.valueOf((float)firstInput/secondInput);	
				}
			}
		}else if((getDecimalValue(operationAsString[0])==0 && getDecimalValue(operationAsString[2])!=0)||
				(getDecimalValue(operationAsString[0])!=0 && getDecimalValue(operationAsString[2])==0)){
			return "throws Exception";
		}else {
			int firstInput = getDecimalValue(operationAsString[0]);
			int secondInput = getDecimalValue(operationAsString[2]);
			String operation = operationAsString[1];
			if(firstInput < 1 || firstInput > 10 || secondInput < 1 || secondInput > 10 || operationAsString.length > 3) {
				return "throws Exception";
			}else{
				switch(operation) {
				case "+":
					return String.valueOf(firstInput + secondInput);
				case "-":
					if(firstInput < secondInput) {
						return "throws Exception";
					}else {
						return String.valueOf(firstInput - secondInput);
					}
				case "*":
					return String.valueOf(firstInput*secondInput);	
				case "/":
					return String.valueOf((float)firstInput/secondInput);	
				}
			}
		}
		return result;
	}
	
	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);
		System.out.println("Please enter operation: ");
		System.out.println(calc(scanner.nextLine()));
		
	}

}
