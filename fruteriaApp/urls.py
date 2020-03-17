from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.login_p, name='login'),
    url(r'^cerrar$', views.cerrar, name='cerrar'),
    url(r'^index$', views.index, name='index'),
    url(r'^insert$', views.insert, name='insert'),
    url(r'^ventas$', views.ventas, name='ventas'),
    url(r'^insert_venta$', views.insert_venta, name='insert_venta'),
    url(r'^eliminar_fruta$', views.eliminar_fruta, name='eliminar_fruta'),
    url(r'^editar_fruta$', views.editar_fruta, name='editar_fruta'),
    url(r'^editar_venta$', views.editar_venta, name='editar_venta'),
    url(r'^eliminar_venta$', views.eliminar_venta, name='eliminar_venta'),
    url(r'^estadisticas$', views.estadisticas, name='estadisticas'),
]