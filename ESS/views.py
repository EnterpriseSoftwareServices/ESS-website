# -*- coding: UTF-8 -*-import sys
import sys
reload(sys)
sys.setdefaultencoding('utf8')

from django.http import HttpResponse
from django.template import RequestContext
from django.shortcuts import render

import django
import settings

import utilEmail

BASE_URL = settings.BASE_URL

# Will normalize any url ending with a slash to one without a slash. 
# For consistency in links.
def redirectWithoutSlash(request, urlendpoint=None):
    print urlendpoint
    if urlendpoint == None:
        return django.shortcuts.redirect(BASE_URL)
    urlendpoint = urlendpoint.strip(BASE_URL)
    return django.shortcuts.redirect(BASE_URL + urlendpoint)

def index(request):
    template = django.template.loader.get_template("index.html")
    ctxt = {}
    context = RequestContext(request, ctxt)
    html = template.render(context)
    return HttpResponse(html)

def servePage(request, pageName):
    try:
        template = django.template.loader.get_template(pageName+".html")
    except:
        return redirectToIndex(request)
    ctxt = {}
    context = RequestContext(request, ctxt)
    html = template.render(context)
    return HttpResponse(html)

def submitContact(request):
    if ("title" not in request.POST or
        "body" not in request.POST or
        "email" not in request.POST):
        return HttpResponse("Missing fields", status=400)

    subject = request.POST["title"]
    body = request.POST["body"]
    fro = request.POST["email"]

    sendMail(fro, subject, body)

def redirectToIndex(request):
    return django.shortcuts.redirect(BASE_URL)




