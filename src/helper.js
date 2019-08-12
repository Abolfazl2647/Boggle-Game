export default {
    main_alphabet: ["آ","ا","ب","پ","ت","ث","ج","چ","ح","خ","د","ذ","ر","ز","ژ","س","ش","ص","ض","ط","ظ","ع","غ","ف","ق","ک","گ","ل","م","ن","و","ه","ی"],
    generate_random_aplphabet: function (){
        let array = [];
        for ( let i=0; i < 25; i++) {
            array.push({value:this.main_alphabet[Math.floor(Math.random() * 33)], id: this.uniqueid() })
        }
        return array;
    },
    uniqueid: function () {
        // always start with a letter (for DOM friendlyness)
        var idstr = String.fromCharCode(Math.floor(Math.random() * 25 + 65));
        do {
            // between numbers and characters (48 is 0 and 90 is Z (42-48 = 90)
            var ascicode = Math.floor(Math.random() * 42 + 48);
            if (ascicode < 58 || ascicode > 64) {
                // exclude all chars between : (58) and @ (64)
                idstr += String.fromCharCode(ascicode);
            }
        } while (idstr.length < 32);
    
        return idstr;
    }
}