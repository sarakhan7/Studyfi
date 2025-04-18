from django.shortcuts import render
from django.http import JsonResponse

def index(request):
    return render(request, 'app/index.html')

def api_response(request):
    if request.method == 'POST':
        user_input = request.POST.get('userInput', '')
        # Here you would call the geminiCompletion function and return the response
        # For now, we will return a placeholder response
        response = "This is a placeholder response."
        return JsonResponse({'response': response})
    return JsonResponse({'error': 'Invalid request'}, status=400)