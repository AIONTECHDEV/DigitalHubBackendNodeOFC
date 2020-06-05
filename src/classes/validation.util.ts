export class TypeValidationUtil {

    static checkNumber = (d: any, nullable: boolean, field: string) : boolean => {
        let isValid : boolean = true;

        if( typeof(d) !== 'number' && (!nullable || (nullable && d !== null && d !== undefined))) {
            isValid = false;
        }


        return isValid;
    }

}