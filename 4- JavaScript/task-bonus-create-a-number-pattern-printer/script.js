const numberPattern = (num) => {
    let result = "";
    
    for(let i=num; i > 0; i--){
        for(let j=i; j > 0; j--){
            result = result + j;
        }
        console.log(result);
        result = "";
    }
}

numberPattern(5);
numberPattern(7);