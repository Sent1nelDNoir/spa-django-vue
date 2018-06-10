from django.shortcuts import render_to_response


# Create your views here.

def index(request, path=''):
    """
    Рендеринг запросов для Vue
    :param request: запрос
    :param path: путь
    :return: формочка
    """
    return render_to_response('base.html')
