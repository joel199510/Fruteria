from django.contrib import admin

from fruteriaApp.models import Frutas, Venta


class FrutasAdmin(admin.ModelAdmin):
    list_display = ("id_frutas", "nombre", "cantidad","precio_c", "precio_v",
                    "estado")
    search_fields = ("id_frutas", "nombre", "cantidad","precio_c", "precio_v",
                     "estado")
    list_filter = ("id_frutas", "nombre", "cantidad","precio_c", "precio_v",
                   "estado")


class VentaAdmin(admin.ModelAdmin):
    list_display = ("id_venta", "total", "cantidad", "fecha", "id_usuario",
                    "estado", "id_fruta")
    search_fields = ("id_venta", "total", "cantidad", "fecha", "id_usuario",
                     "estado", "id_fruta")
    list_filter = ("id_venta", "total", "cantidad", "fecha", "id_usuario",
                   "estado", "id_fruta")
    date_hierarchy = "fecha"


# Register your models here.
admin.site.register(Frutas, FrutasAdmin)
admin.site.register(Venta, VentaAdmin)
