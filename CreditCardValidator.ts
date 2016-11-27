import {Control} from 'angular2/common'

export class CreditCardValidator {
    static isLegalNumber(control: Control) {
        var valid = false;
        var cardNumber = control.value.toString().replace(/ +/g, '').replace(/-+/g, '');
        var numDigits = control.value.toString().length;

        if (cardNumber == "")
            return;
        // the card is Visa, validatation with visa algorithm
        if (numDigits >= 14 && numDigits <= 16) {
            var sum = 0, i = numDigits - 1, pos = 1, digit, luhn = new String();
            do {
                digit = parseInt(cardNumber.charAt(i));
                luhn += (pos++ % 2 == 0) ? digit * 2 : digit;
            } while (--i >= 0)

            for (i = 0; i < luhn.length; i++) {
                sum += parseInt(luhn.charAt(i));
            }
            valid = sum % 10 == 0;
            
        // the card is Isracard, validatation with Isracard algorithm
        } else if (numDigits >= 8 && numDigits <= 9) {
            var sum = 0;

            for (var i = numDigits - 1, j = 1; i >= 0; i-- , j++) {
                sum += ((cardNumber.charAt(i)) * j);
            }
            valid = sum % 11 == 0;
        }

        if (!valid) 
            return { isLegalNumber: true };
        return null;
    }
}
