$(document).ready(function () {
    $('#submitedit').on('click', function () {
        $fruta = $('#id_fruta_edit').val();
        $cantidad = $('#cantidad_edit').val();
        $total = $('#total_edit').val();
        $idventa = $('#id_ventaedit').val();
        $id_usuario = $('#id_usuario').val();
        $cantidadedit = $('#cantidadedit').val();
        $cantidadfedit = $('#cantidadfedit').val();

        $cantidadt = (parseInt($cantidadfedit) + parseInt($cantidadedit));

        if ($fruta == "" || $cantidad == "" || $total == "" || $idventa == "" || $id_usuario == "") {

            const toast = swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000
            });

            toast({
                type: 'error',
                html: '<strong>Todos los campos son obligatorios</strong>'
            })
        } else if ($cantidad <= 0) {
            const toast = swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000
            });

            toast({
                type: 'error',
                html: '<strong>La cantidad debe ser mayor 0</strong>'
            })
        } else {
            $.ajax({
                type: "POST",
                url: "editar_venta",
                data: {
                    total: $total,
                    cantidad: $cantidad,
                    id_usuario: $id_usuario,
                    id_fruta: $fruta,
                    cantidad_f: $cantidadt - $cantidad,
                    idventa: $idventa,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                },
                success: function () {
                    $('#id_fruta_edit').val('');
                    $('#cantidad_edit').val('');
                    $('#total_edit').val('');
                    $('#id_venta_edit').val('');
                    $('#id_usuario').val('');
                    $('#cantidadedit').val('');
                    $('#cantidadfedit').val('');

                    swal({
                        title: "Operación exitosa!",
                        text: "Venta modificada!",
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
        }
    });
});