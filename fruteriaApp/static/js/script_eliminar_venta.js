$(document).ready(function () {
    $('#enviar').on('click', function () {
        $estado = $('#estado').val();
        $id_venta = $('#id_venta').val();
        $cantidadelim = $('#cantidadelim').val();
        $cantidadf = $('#cantidadf').val();
        $id_fruta = $('#id_fruta').val();
        $cantidadt = 0;

        if ($estado == 1) {
            $estado = 0;
            $cantidadt = (parseInt($cantidadelim) + parseInt($cantidadf));
        } else {
            $estado = 1;
            $cantidadt = $cantidadf - $cantidadelim;
        }

        $.ajax({
            type: "POST",
            url: "eliminar_venta",
            data: {
                estado: $estado,
                id_venta: $id_venta,
                cantidadt: $cantidadt,
                id_fruta: $id_fruta,
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
            success: function () {

                $('#estado').val('');
                $('#id_venta').val('');

                swal({
                    title: "Operación exitosa!",
                    text: "Estado modificado!",
                    type: "success"
                }).then(function () {
                    window.location = "/fruteriaApp/ventas";
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