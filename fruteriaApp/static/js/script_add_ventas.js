$(document).ready(function () {
    $('#submit').on('click', function () {
        $frutas = $('#fruta').val();
        $fruta = $frutas.split("|");
        $cantidad = $('#cantidad').val();
        $total = $('#total').val();
        $total_m = $('#total_m').val();
        $id_usuario = $('#id_usuario').val();

        if ($fruta[0] == "" || $cantidad == "" || $total == "" || $total_m == "" || $id_usuario == "") {

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
                url: "insert_venta",
                data: {
                    total: $total,
                    cantidad: $cantidad,
                    id_usuario: $id_usuario,
                    id_fruta: $fruta[0],
                    cantidad_f: $fruta[2] - $cantidad,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                },
                success: function () {

                    $('#total').val('');
                    $('#cantidad').val('');
                    $('#id_usuario').val('');
                    $('#fruta').val('');

                    swal({
                        title: "Operación exitosa!",
                        text: "Venta agregada!",
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