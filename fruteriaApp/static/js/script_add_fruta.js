$(document).ready(function () {
    $('#submit').on('click', function () {
        $nombre = $('#nombre').val();
        $cantidad = $('#cantidad').val();
        $precio_v = $('#precio_v').val();
        $precio_c = $('#precio_c').val();

        if ($nombre == "" || $cantidad == "" || $precio_v == "" || $precio_c == "") {

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
        } else if ($cantidad <= 0 || $precio_v <= 0 || $precio_c <= 0) {
            const toast = swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000
            });

            toast({
                type: 'error',
                html: '<strong>Todos los datos númericos deben ser mayor o igual a 1</strong>'
            })
        } else {
            $.ajax({
                type: "POST",
                url: "insert",
                data: {
                    nombre: $nombre,
                    cantidad: $cantidad,
                    precio_v: $precio_v,
                    precio_c: $precio_c,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                },
                success: function () {

                    $('#nombre').val('');
                    $('#cantidad').val('');
                    $('#precio_v').val('');
                    $('#precio_c').val('');

                    swal({
                        title: "Operación exitosa!",
                        text: "Fruta agregada!",
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
        }
    });
});