window.onload = function()
{
    //Configuración de listas.
        //LLenará la lista desplegable 'Hijos' donde aparecerá valores entre 0 y 20.
        for (var intI = 0 ; intI <= 20; intI++)
        {
            document.getElementById("lstHijos").add(new Option(intI.toString()));
        }

        //Array con los datos de las provincias y localidades con los que llenaremos las listas desplegables.
        var aDatos = [{nombre:"Ávila", localidades:["Arévalo","Ávila","Arenas De San Pedro","Madrigal de las Altas Torres"]},
                      {nombre:"Burgos", localidades:["Aranda de Duero","Briviesca","Burgos","Lerma"]},
                      {nombre:"León", localidades:["Astorga","La Bañeza","León","Ponferrada","Valencia de Don Juan"]},
                      {nombre:"Palencia", localidades:["Aguilar de Campoo","Palencia","Herrera de Pisuerga"]},
                      {nombre:"Salamanca", localidades:["Alba de Tormes","Béjar","Ciudad Rodrigo","Ledesma","Peñaranda de Bracamonte","Salamanca","Tamames"]},
                      {nombre:"Segovia", localidades:["Segovia"]},
                      {nombre:"Soria", localidades:["Almazán","Soria"]},
                      {nombre:"Valladolid", localidades:["Medina del Campo","Olmedo","Peñafiel","Simancas","Valladolid"]},
                      {nombre:"Zamora", localidades:["Zamora"]}];

        //Llena la lista de las provincias y le asigna al atributo 'value' un número identificativo, que será el dato que se enviará en el formulario. 			  
        for (var intI = 0; intI < aDatos.length; intI++)
        {
            document.getElementById("lstProvincias").add(new Option(aDatos[intI].nombre));
            document.getElementById("lstProvincias").options[intI].setAttribute("value", intI);          	    
        } 

        //Enlazamos las listas para que cuando haya un cambio  en las provincias cambie la lista de localidades y se llene con los datos de la provincia correspondiente.
        //También le asigna un número identificativo a cada opción en el atributo 'value'
        document.getElementById("lstProvincias").onchange = function()
        {
            document.getElementById("lstLocalidades").length = 0;        
            for (var intI = 0; intI < aDatos[document.getElementById("lstProvincias").selectedIndex].localidades.length; intI++)
            {
                document.getElementById("lstLocalidades").add(new Option(aDatos[document.getElementById("lstProvincias").selectedIndex].localidades[intI]));
                document.getElementById("lstLocalidades").options[intI].setAttribute("value", intI);		      
            }	      
        };

        //Seleccionamos la provincia de Salamanca, provocamos el evento onchange() para cargar la lista de localidades y seleccionamos  tambien 'Salamanca' en la lista de localidades.
        //De esta manera al cargar la página serán las opciones marcadas por defecto.
        document.getElementById("lstProvincias")[4].selected=true;
        document.getElementById("lstProvincias").onchange();
        document.getElementById("lstLocalidades")[5].selected = true;
    //Fin configuración de listas.	
    			  
    //Ponemos la fecha tanto en el div que aparece debajo de los encabezados como en el campo de texto 'fecha de alta'.
    var datHoy = new Date();
    document.getElementById("fecha").innerHTML = datHoy.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });
    document.getElementById("fechaAlta").value = datHoy.getFullYear()+"/"+(datHoy.getMonth()+1)+"/"+datHoy.getDate();

    //Eventos 'keypress'.Lanzados cada vez que se pulsa una tecla en el campo correspondiente. Utilizados para el filtrado a nivel de caracter.
        //Permite solo caracteres numéricos y letras mayúsculas válidas en el campo 'nif'.
        document.querySelector("input[name=nif]").addEventListener("keypress",function(evento)
        {
            if(evento.keyCode == 0 && !/[0-9 TRWAGMYFPDXBNJZSQVHLCKET]/.test(String.fromCharCode(evento.charCode)))
            {
                evento.preventDefault();
            };
        });

        //Impide carcateres alfabéticos en el campo 'nombre'.
        document.querySelector("input[name=nombre]").addEventListener("keypress",function(evento)
        {
            if(evento.keyCode == 0 && !/[a-zA-z]/.test(String.fromCharCode(evento.charCode)))
            {
                evento.preventDefault();
            };
        });

        //Impide carcateres no alfabéticos en el campo 'apellidos'.
        document.querySelector("input[name=apellidos]").addEventListener("keypress",function(evento)
        {
            if(evento.keyCode == 0 && !/[a-zA-z]/.test(String.fromCharCode(evento.charCode)))
            {
                evento.preventDefault();
            };
        });


        //Impide carcateres no numéricos en el campo 'teléfono'.
        document.querySelector("input[name=telefono]").addEventListener("keypress",function(evento)
        {
            if(evento.keyCode == 0 && !/[0-9]/.test(String.fromCharCode(evento.charCode)))
            {
                evento.preventDefault();
            };
        });
    //Fin de eventos 'keypress'.
            
    //Eventos onchange.Lanzados cada vez que hay un cambio en el elemento correspondiente.Filtrado a nivel de campo.
        //Comprueba que el campo nif tiene un formato correcto(indicado por el atributo pattern),que es válido(usando una función externa) y que el campo está completado.
        document.querySelector("input[name=nif]").onchange = function()
        {   
            if(this.validity.patternMismatch){
                this.setCustomValidity("7 u 8 digitos seguido de una letra mayuscula");
            }else{
                if(this.validity.valueMissing)
                    this.setCustomValidity("Es un campo requerido");            
                else
                {
                    this.setCustomValidity(document.querySelector("input[name=nif]").value.isNif()?"":"El nif introducido es inválido");
                }    
            }
        };   
	  
	  	//Comprueba que el campo nombre cumpla el pattern indicado por html y que está rellenado.  	   
        document.querySelector("input[name=nombre]").onchange = function()
        {   	    	       
            this.setCustomValidity(this.validity.patternMismatch?"Solo letras del alfabeto español":this.validity.valueMissing?"Es un campo requerido":"");           
        }; 

		//Comprueba que el campo apellidos cumpla el pattern indicado por html y que está rellenado.
        document.querySelector("input[name=apellidos]").onchange = function()
        {   	              
            this.setCustomValidity(this.validity.patternMismatch?"Solo letras del alfabeto español":this.validity.valueMissing?"Es un campo requerido":"");         
        };   
	    	    
        //Comprueba que en el campo teléfono haya nueva dígitos, si no, muestra un mensaje de error.
        document.querySelector("input[name=telefono]").onchange = function()
        {   	    	    
            this.setCustomValidity(this.validity.patternMismatch?"Introducir 9 digitos":"");        
        }; 

        //Comprueba que en el campo código postal haya nueva cinco, si no, muestra un mensaje de error.
        document.querySelector("input[name=CodigoPostal]").onchange = function()
        {   	    	    
            this.setCustomValidity(this.validity.patternMismatch?"Introducir 5 digitos":"");        
        }; 

        //Comprueba que el campo fecha de alta tenga contenido y que el fomato de fecha introducido sea el correcto.  
        document.querySelector("input[name=fechaAlta]").onchange = function()
        {   	    
            this.setCustomValidity(this.validity.patternMismatch?"Formato permitido: aaaa/mm/dd":this.validity.valueMissing?"Es un campo requerido":"");	    
        };
	    
        //Comprueba que el email tenga un formato válido.
        document.querySelector("input[name=email]").onchange = function()
        {   	    	    
            this.setCustomValidity(this.validity.patternMismatch?"Introducir email con formato correcto(ejemplo@ejemplo.com)":"");        
        };

        //Comprueba que el número de cuenta tenga un formato determinado y además que sea un número de cuenta válido.
        document.querySelector("input[name=numeroCuenta]").onchange = function()
        {   
            if(this.validity.patternMismatch){
                this.setCustomValidity("El formato requerido es xxxx-xxxx-xx-xxxxxxxxxx");
            }else{
                this.setCustomValidity(this.validity.valueMissing?"Es un campo requerido":document.querySelector("input[name=numeroCuenta]").value.isCC()?"":"El numero de cuenta introducido es inválido");              
            }
        };
    //Fin eventos onchange.
    
    //Bucle que recorre todos los elementos 'input' y le añade un listener para que se seleccione el texto cada vez que gane el foco.  
    for (var intI = 0; intI < document.getElementsByTagName("input").length; intI++)
    {
	document.getElementsByTagName("input")[intI].onchange(); 
        document.getElementsByTagName("input")[intI].addEventListener("focus", function()
        {
            this.select(); 	
              
    	});
    };	
};
