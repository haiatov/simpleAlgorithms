function Sort() {}

Sort.select = function(array){
    let sourceArray = [...array];
    let resultArray = [];

    while(sourceArray[0]){
        let minI = 0;
        let minV = array[minI];
        for(let i = 1; i <= array.length; i++){
            if(sourceArray[i] < minV){
                minI = i;
                minV = sourceArray[i];
            }
        }
        resultArray.push(minV);
        sourceArray.splice(minI, 1);
    }

    return resultArray;
}

Sort.quick = function(array){
    if(array.length < 2) {
        return array;
    }

    let supportI = Math.floor((array.length / 2));
    let supportV = array[supportI];
    
    let left = array.filter(item => item < supportV);
    let right = array.filter(item => item > supportV);

    return [].concat(this.quick(left), supportV, this.quick(right));
}

