var bool_borrar = true; 
$(function() {
    $('#botonValidar').click(function() {
        //valor introducido por teclado
        var valorCampo = $('#IP').val();
        
        // validar que la logitud sea entre 7 y 15 digitos
        if (valorCampo.length >= 7  && valorCampo.length < 15) {
            alert("tu ip es: "+valorCampo)
        } else {
            alert('El campo debe tener más de 7 caracteres y menos de 15.');
        }

    });

    $('#IP').on('paste', function(event) {
        event.preventDefault(); // Evitar la acción de pegar contenido
        alert("No se permite pegar contenido en este campo de entrada.");
    });


    var npuntos=0; //variable para contar que no hay más de 3 puntos
    var grupon=0; //variable para garantizar que cada grupo tenga 3 números
    var grupo_de3 = [];//variable que guarda el número del grupo
  

    $('#IP').on('keydown', function(event) {  //key up, key down y key press. key down cuando se baja la tecla, key up cuando se suelta la tecla y key press ambos
        var keyCode = event.which ? event.which : event.keyCode; // Obtener el código de la tecla
        
        //verificar si se borra algo
        if (event.which == 8 || event.which == 46) {
            bool_borrar = false;    
        }
        else{
            bool_borrar = true;
           
        }
        
        // Permitir teclas de control como Enter, Flecha izquierda, Flecha derecha, Borrar, etc.
        if (keyCode == 8 || keyCode == 9 || keyCode == 13 || keyCode == 37 || keyCode == 39 || keyCode == 46 || keyCode ==110 || keyCode ==190) {
            return true;
        }
        

        // Verificar si la tecla presionada es un número
        if (keyCode < 48 || keyCode > 57) {
            event.preventDefault(); // Cancelar la acción si la tecla presionada no es un número
        }
    });

    var aux=1;
    
    $('#IP').on('input', function() {
        // Obtener el valor del campo de entrada
        var valorCampo = $(this).val();
        var ultimoCaracter = valorCampo[valorCampo.length-1]; 
        var penultimoCaracter = valorCampo[valorCampo.length-2];
        
 
      

        // Validar si el primer carácter es un punto
        if (valorCampo.charAt(0) === '.') {
            alert('El primer carácter no puede ser un punto');
            $(this).val('');
            npuntos=0;
        }

        //validar que no haya puntos seguidos
        if(ultimoCaracter === '.' && ultimoCaracter ==  penultimoCaracter){
            $(this).val('');
            alert("no puedes tener mas de un punto seguido") 

        }

        //contador de puntos
        if(ultimoCaracter == '.' && bool_borrar){
            npuntos++;
        }

        //si hay más de 3 puntos no admite la ip
        if(npuntos>3){
            $(this).val('');
            alert("Solo puede tener 3 puntos")
            npuntos=0;  
            aux=0;
        }
        
        //contar que haya 3 números por grupo
        if(aux== 1 && Number(ultimoCaracter) && bool_borrar){
            grupon++;
            grupo_de3 = grupo_de3+ultimoCaracter
        }else{
            grupon--;
        }


          //el número del grupo de 3 números no puede ser mayor a 255 ni menor a 0
          if(grupo_de3 >255){
            alert("solo numeros del 0 al 255")
            $(this).val('');
            grupon=0;
            grupo_de3=0;
        }

        
        //si se ponen 3 numeros, el siguiente carácter se autocomppleta con .
       if(grupon == 3){
          valor = valorCampo.slice(0, valorCampo.length) + '.' + valorCampo.slice(valorCampo.length);
          $(this).val(valor)
          ultimoCaracter = '.';
          npuntos++;
          grupon=0;
          grupo_de3=0;

        }   

      
        aux=1;
    });
});