from django.shortcuts import render, redirect
from .models import *
from django.db.models import Sum, Count, F
from django.core import serializers
from django.template import RequestContext
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
import datetime
from django.contrib.auth.decorators import login_required

# LOGIN
def login_p(request):

    if request.method == 'POST':
        username = request.POST.get('nombre_usuario')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)
        if username != "" and password != "":
            if user is not None:
                login(request, user)
                return redirect('index')
            else:
                messages.info(
                    request, "Nombre de usuario o contraseña son incorrectas")
        else:
            messages.info(request, "Todos los campos son obligatorios")

    context = {}
    return render(request, "login.html", {
        "context": context,
    })


# CERRAR SESIÓN
def cerrar(request):
    logout(request)
    return redirect('login')


# VISTA DE FRUTA
@login_required(login_url="login")
def index(request):
    frutas = Frutas.objects.all().order_by("cantidad", "nombre")
    return render(request, "index.html", {"frutas": frutas})


# INSERTAR FRUTA
@login_required(login_url="login")
def insert(request):
    member = Frutas(nombre=request.POST['nombre'],
                    cantidad=request.POST['cantidad'],
                    precio_c=request.POST['precio_c'],
                    precio_v=request.POST['precio_v'])

    member.save()
    return redirect('/')


# EDITAR FRUTA
@login_required(login_url="login")
def editar_fruta(request):
    instancia = Frutas.objects.get(pk=request.POST['id_frutas'])
    instancia.nombre = request.POST['nombre']
    instancia.cantidad = request.POST['cantidad']
    instancia.precio_c = request.POST['precio_c']
    instancia.precio_v = request.POST['precio_v']
    instancia.save()

    return redirect('/')


# ELIMINAR FRUTA
@login_required(login_url="login")
def eliminar_fruta(request):
    instancia = Frutas.objects.get(pk=request.POST['id_frutas'])
    instancia.estado = request.POST['estado']
    instancia.save()

    return redirect('/')


# VISTA DE VENTAS
@login_required(login_url="login")
def ventas(request):

    ventas = Venta.objects.all().order_by("-estado", "fecha")
    frutas = Frutas.objects.filter(estado=1,
                                   cantidad__gte=1).order_by("precio_v")

    return render(request, "ventas.html", {"ventas": ventas, "frutas": frutas})


# INSERTAR VENTA
@login_required(login_url="login")
def insert_venta(request):
    fecha = datetime.datetime.now()

    ventas = Venta(total=request.POST['total'],
                   fecha=fecha,
                   cantidad=request.POST['cantidad'],
                   id_usuario_id=request.POST['id_usuario'],
                   id_fruta_id=request.POST['id_fruta'])
    ventas.save()

    instancia = Frutas.objects.get(pk=request.POST['id_fruta'])
    instancia.cantidad = request.POST['cantidad_f']
    instancia.save()

    return redirect('/')


# EDITAR VENTA
@login_required(login_url="login")
def editar_venta(request):
    fecha = datetime.datetime.now()

    instancia = Venta.objects.get(pk=request.POST['idventa'])
    instancia.total = request.POST['total']
    instancia.fecha = fecha
    instancia.cantidad = request.POST['cantidad']
    instancia.id_usuario_id = request.POST['id_usuario']
    instancia.id_fruta_id = request.POST['id_fruta']
    instancia.save()

    instancia1 = Frutas.objects.get(pk=request.POST['id_fruta'])
    instancia1.cantidad = request.POST['cantidad_f']
    instancia1.save()
    return redirect('/')


# ELIMINAR VENTA
@login_required(login_url="login")
def eliminar_venta(request):
    instancia = Venta.objects.get(pk=request.POST['id_venta'])
    instancia.estado = request.POST['estado']
    instancia.save()

    instancia1 = Frutas.objects.get(pk=request.POST['id_fruta'])
    instancia1.cantidad = request.POST['cantidadt']
    instancia1.save()

    return redirect('/')



# VISTA ESTADISTICAS
@login_required(login_url="login")
def estadisticas(request):

    maximo = Venta.objects.values('id_fruta').annotate(
        sum=Sum('cantidad')).order_by('-sum').first()
    
    if maximo !=None:

        nombre_fruta_m = Frutas.objects.filter(pk=maximo['id_fruta']).first()

        minimo = Venta.objects.values('id_fruta').annotate(
        sum=Sum('cantidad')).order_by('sum').first()
        
        nombre_fruta_me = Frutas.objects.filter(pk=minimo['id_fruta']).first()

        total_v = Venta.objects.filter(estado=1).annotate(count=Count('id_venta'))

        total_re = Venta.objects.filter(estado=1).aggregate(Sum('total'))

        total_gas = Frutas.objects.filter(estado=1).aggregate(
        total=Sum(F('precio_c') * F('cantidad')))

        total_anul = Venta.objects.filter(estado=0).annotate(
        count=Count('id_venta'))

        total_anul_m = Venta.objects.filter(estado=0).aggregate(Sum('total'))

        ventas = Venta.objects.extra(select={
        'fecha': "to_char( fecha, 'DD-MM-YYYY')"
        }).values('fecha').annotate(total=Sum('total')).filter(
        estado=1).order_by('fecha')
    
    else:
        nombre_fruta_m= "",
        minimo= 0,
        nombre_fruta_me= "",
        total_v= 0,
        total_re= 0,
        total_gas= 0,
        total_anul= 0,
        total_anul_m= 0,
        ventas= "" 

    return render(
        request, "estadisticas.html", {
            "maximo": maximo,
            "nombre_fruta_m": nombre_fruta_m,
            "minimo": minimo,
            "nombre_fruta_me": nombre_fruta_me,
            "total_v": total_v,
            "total_re": total_re,
            "total_gas": total_gas,
            "total_anul": total_anul,
            "total_anul_m": total_anul_m,
            "ventas": ventas
        })
