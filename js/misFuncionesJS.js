
/* A pesar de que en Formulario.html se comprueba que se cumple el formato del nif y del nºcuenta con el atributo pattern y una expresión regular,
 * al ser este un documento independiente que podría ser utilizado en otro proyecto, he decidido comprobar de nuevo dentro de cada función
 * que la cadena que hace la llamada a estas funciones cumple con el formato correspondiente.
 * Se lanzará un error por consola en tiempo de ejecución en caso de que no sea así.
 */


//Añade a la clase String el método isNif que comprueba si la cadena es un NIF válido.
String.prototype.isNif =  function()
{   
    //Comprobamos que el formato del nif sea el correcto. 
    //Si no es correcto, lanzamos un mensaje de error en tiempo de ejecución.
    if(! /^([0-9]{7,8})([TRWAGMYFPDXBNJZSQVHLCKET])$/.test(this))
            throw new Error("El nif debe contener 7 u 8 dígitos y una letra.");

    return ("TRWAGMYFPDXBNJZSQVHLCKET"[parseInt(RegExp.$1)%23] == RegExp.$2);
};

//Añade a la clase String el método isCC que comprueba si la cadena es un número de cuenta válido.
String.prototype.isCC = function()
{
    //Comprobamos que el formato de la cuenta bancaria introducida sea el correcto, lanzamos un mensaje de error en caso de que no lo sea e indicamos el formato correcto.	
    if (!/^[0-9]{4}\-[0-9]{4}\-[0-9]{2}\-[0-9]{10}$/.test(this))
    throw new Error ("El formato de la cuenta bancaria no es correcto(xxxx-xxxx-xx-xxxxxxxxxx)");

    //Extraemos del valor introducido cada una de las partes de la cuenta corriente, teniendo en cuenta que ha sido introducida con guiones.	
    var strBanco = this.substring(0,4);
    var strSucursal = this.substring(5,9);
    var strDc = this.substring(10,12);
    var strCuenta=this.substring(13,23);
    
    var aValores = new Array(1, 2, 4, 8, 5, 10, 9, 7, 3, 6);
        control = 0;
        for (i=0; i<=9; i++)
        control += parseInt(strCuenta.charAt(i)) * aValores[i];
        control = 11 - (control % 11);
        if (control == 11) control = 0;
        else if (control == 10) control = 1;
        if(control!=parseInt(strDc.charAt(1))) {
            return false;
        }
        control=0;
        var strCadena="00"+strBanco+strSucursal;
        for (i=0; i<=9; i++)
            control += parseInt(strCadena.charAt(i)) * aValores[i];
        control = 11 - (control % 11);
        if (control == 11) control = 0;
            else if (control == 10) control = 1;
        if(control!=parseInt(strDc.charAt(0))) {
            return false;
        }
        return true;    
};  