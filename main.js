const jsonForm = document.querySelector('#jsonform');
const cvsForm = document.querySelector('#cvsform');
const bConvert = document.querySelector('#bConvert');

bConvert.addEventListener('click', e => {
    convertJSONtoCSV();
});

function convertJSONtoCSV(){
    let json;
    let keys = [];
    let values = [];

    try{
        json = JSON.parse(jsonForm.value);
    }catch (error){
        console.log('Formato incorrecto JSON', error);
        alert("Formato incorresto JSON");
    }

    if(Array.isArray(json)){
        //algoritmo
        json.forEach(item => {
            const nkeys = Object.keys(item);

            if(keys.length === 0){
                keys = [...nkeys];
            }else{ //si ya tiene algo asignado
                if(nkeys.length !== keys.length){
                    throw new Error('Number of keys are different')
                }else{
                    console.log("Ok", nkeys);
                }
            }
            const row = keys.map(k => {
                return item[k];
            });
            values.push([...row]);
        });
        console.log(keys, values);
        values.unshift(keys);
        const text = values.map(v => v.join(',')).join('\n');
        cvsForm.value = text;
    }else{
        alert("No es un arreglo de objetos")
    }
}