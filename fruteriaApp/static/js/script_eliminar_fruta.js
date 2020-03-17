$(document).ready(function () {
    $('#enviar').on('click', function () {
        $estado = $('#estado').val();
        $id_frutas = $('#id_frutas').val();

        if($estado == 1){
            $estado = 0;
        }else{
            $estado = 1;
        }

            $.ajax({
                type: "POST",
                url: "eliminar_fruta",
                data: {
                    estado: $estado,
                    id_frutas: $id_frutas,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                },
                success: function () {

                    $('#estado').val('');
                    $('#id_frutas').val('');

                    swal({
                        title: "Operación exitosa!",
                        text: "Estado modificado!",
                        type: "success"
                    }).then(function () {
                        window.location = "/fruteriaApp/index";
                    });
                },
                error: function (jqXhr, textStatus, errorMessage) { // error callback 
                    const toast = swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 5000
                    });

                    toast({
                        type: 'error',
                        html: '<strong>Error. Intentelo nuevamente</strong>'
                    })
                }
            });
        
    });
});