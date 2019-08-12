export default {
    main_alphabet: ["آ","ا","ب","پ","ت","ث","ج","چ","ح","خ","د","ذ","ر","ز","ژ","س","ش","ص","ض","ط","ظ","ع","غ","ف","ق","ک","گ","ل","م","ن","و","ه","ی"],
    generate_random_aplphabet:function (){
        let array = [];
        for ( let i=0; i < 25; i++) {
            array.push(this.main_alphabet[Math.floor(Math.random() * 33)])
        }
        return array;
    }
}