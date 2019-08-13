import Trie from './Trie.js';
let visited = [[false,false,false,false,false],[false,false,false,false,false],[false,false,false,false,false],[false,false,false,false,false],[false,false,false,false,false]];
let iString = "";

export default {
    main_alphabet: ["ا","ب","پ","ت","ث","ج","چ","ح","خ","د","ذ","ر","ز","ژ","س","ش","ص","ض","ط","ظ","ع","غ","ف","ق","ک","گ","ل","م","ن","و","ه","ی"],
    generate_random_aplphabet: function (){
        let array = [];
        for ( let i=0; i < 25; i++) {
            array.push({value:this.main_alphabet[Math.floor(Math.random() * 32)], id: this.uniqueid() })
        }
        return array;
    },
    find_answer : function (array) {
        let row = 0;
        let col = 0;
        let final_answers = [];
    
        for ( let i=0; i < array.length ; i++  ) {
            backtrack(row,col);
            if ( row >= 4 ) {
                col++;
                row=0;
            } else {
                row++;
            }    
        }
    
    
        function backtrack(row,col){
    
            visited[row][col] = true;
            iString += array[((row*5) + col)].value;
    
            if ( Trie.find(iString).length > 1) {
                if ( Trie.contains(iString) ) {
                    final_answers.push(iString);
                }
    
                if ( row-1 >= 0  && !visited[row-1][col]) {
                    // left
                    backtrack(row-1,col);
                }
        
                if ( row+1 < 5 && !visited[row+1][col]) {
                    // right
                    backtrack(row+1,col);
                }
        
                if ( col-1 >= 0 && !visited[row][col-1]) {
                    // up
                    backtrack(row,col-1);
                }
        
                if ( col+1 > 5 && !visited[row][col+1]) {
                    // down
                    backtrack(row,col+1);
                }
            }
            // console.log(iString)
    
            iString = iString.slice(0, iString.length-1);
            visited[row][col] = false;
        }
    
        return final_answers;
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