from django.test import TestCase
from django.urls import reverse

class YourAppTests(TestCase):
    def test_index_view(self):
        response = self.client.get(reverse('index'))  # Adjust 'index' to your actual view name
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'app/index.html')

    def test_gemini_completion(self):
        # This is a placeholder for testing the geminiCompletion function
        # You would typically mock the API call here and test the response handling
        self.assertTrue(True)  # Replace with actual test logic as needed